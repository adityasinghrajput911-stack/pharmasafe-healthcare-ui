import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DRUGS_CATALOG,
  FOODS_CATALOG,
  DRUG_FOOD_INTERACTION_RULES,
  DRUG_DRUG_INTERACTION_RULES,
  HOME_REMEDY_EFFICACY_CATALOG,
  type CuratedDrugId,
  type DrugId,
  type FoodId,
  type DrugInfo,
  type FoodInfo
} from './catalog.ts';
import {
  normalizeFoodId,
  analyzeInteraction,
  analyzeDrugDrugPair,
  analyzeSymptomRelief,
  generateClinicalAiFallback
} from './engine.ts';

export {
  DRUGS_CATALOG,
  FOODS_CATALOG,
  DRUG_FOOD_INTERACTION_RULES,
  DRUG_DRUG_INTERACTION_RULES,
  HOME_REMEDY_EFFICACY_CATALOG,
  normalizeFoodId,
  analyzeInteraction,
  analyzeDrugDrugPair,
  analyzeSymptomRelief
};
export type { CuratedDrugId, DrugId, FoodId, DrugInfo, FoodInfo };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getArg(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && idx + 1 < process.argv.length) {
    return process.argv[idx + 1];
  }
  return undefined;
}

async function startServer() {
  const app = express();

  // Dev server is invoked with `tsx server.ts --port 3000 --host 0.0.0.0`.
  // Priority: CLI argument > process.env.PORT (in production) > default 3000.
  const cliPort = getArg('--port') || getArg('-p');
  const cliHost = getArg('--host') || getArg('-h');
  const PORT = cliPort
    ? Number(cliPort)
    : (process.env.NODE_ENV === 'production' && process.env.PORT ? Number(process.env.PORT) : 3000);
  const HOST = cliHost || '0.0.0.0';

  app.use(express.json());

  // API Endpoints
  app.get('/api/drugs', (_req: Request, res: Response) => {
    res.json(Object.values(DRUGS_CATALOG));
  });

  app.get('/api/foods', (_req: Request, res: Response) => {
    res.json(Object.values(FOODS_CATALOG));
  });

  app.get('/api/matrix', (_req: Request, res: Response) => {
    const drugs = Object.keys(DRUGS_CATALOG) as DrugId[];
    const foods = Object.keys(FOODS_CATALOG) as FoodId[];
    const matrix: Array<{
      drug: DrugId;
      food: FoodId;
      isCritical: boolean;
      severity: string;
      headline: string;
      bioavailabilityImpactPercent: number;
      bioavailabilityImpactSummary: string;
      chemicalEquation: string;
      reactionMechanism: string;
    }> = [];

    for (const d of drugs) {
      for (const f of foods) {
        const analysis = analyzeInteraction(d, f);
        matrix.push({
          drug: d,
          food: f,
          isCritical: analysis.isCritical,
          severity: analysis.severity,
          headline: analysis.headline,
          bioavailabilityImpactPercent: analysis.bioavailabilityImpactPercent,
          bioavailabilityImpactSummary: analysis.bioavailabilityImpactSummary,
          chemicalEquation: analysis.chemicalEquation,
          reactionMechanism: analysis.reactionMechanism
        });
      }
    }

    res.json(matrix);
  });

  app.post('/api/analyze', (req: Request, res: Response) => {
    try {
      const { drug, food } = req.body;
      const safeFood = normalizeFoodId(food);
      const safeDrug = (drug as DrugId) || 'Atorvastatin';

      const analysis = analyzeInteraction(safeDrug, safeFood);
      return res.json(analysis);
    } catch (error) {
      console.error('[PharmaSafe Server] Error in /api/analyze, returning safe fallback:', error);
      const safeAnalysis = analyzeInteraction('Atorvastatin' as DrugId, 'Plain White Rice & Apples' as FoodId);
      return res.json(safeAnalysis);
    }
  });

  // Quantitative Drug-Drug Interaction Endpoints
  app.get('/api/drug-drug', (_req: Request, res: Response) => {
    res.json(DRUG_DRUG_INTERACTION_RULES);
  });

  app.post('/api/drug-drug', (req: Request, res: Response) => {
    try {
      const { drugA, drugB } = req.body || {};
      if (!drugA || !drugB) {
        return res.status(400).json({ error: 'Both drugA and drugB are required.' });
      }
      const result = analyzeDrugDrugPair(String(drugA), String(drugB));
      return res.json(result);
    } catch (error) {
      console.error('[PharmaSafe Server] Error in /api/drug-drug:', error);
      return res.status(500).json({ error: 'Unable to evaluate drug-drug pair.' });
    }
  });

  // Quantitative Home Remedy / Symptom Relief Efficacy Endpoint
  app.get('/api/symptoms', (req: Request, res: Response) => {
    const symptomId = typeof req.query.id === 'string' ? req.query.id : undefined;
    res.json(analyzeSymptomRelief(symptomId));
  });

  // Clinical AI Copilot Endpoint (Grounded in Indian Pharmacopoeia & Local Database)
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { messages, context } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      const lastUserMessage = messages[messages.length - 1]?.content || '';

      // Rule 2 Enforcement (Local Pre-Check Guardrail):
      const diagnosisKeywords = /\b(diagnose|diagnosis|what disease|do i have cancer|prescribe me|write a prescription|prescribe antibiotics|what illness do i have|what infection do i have)\b/i;
      if (diagnosisKeywords.test(lastUserMessage)) {
        return res.json({
          reply: 'I am an AI, not a doctor. I cannot diagnose or prescribe medication. Please consult a physician.',
          grounded: true
        });
      }

      // Context Grounding string
      const contextSummary = context ? `
CURRENT USER CLINICAL CONTEXT IN PHARMASAFE:
- Active Prescription / Brand: ${context.brandName || context.drug || 'None selected'}
- Active Generic Salt: ${context.genericSalt || 'Standard IP formulation'}
- Selected Dietary Item: ${context.food || 'None selected'}
${context.analysis ? `- Current Interaction Severity: ${context.analysis.severity || 'N/A'}
- Current Interaction Headline: ${context.analysis.headline || 'N/A'}
- Quantitative Impact: ${context.analysis.bioavailabilityImpactSummary || 'N/A'}
- Chemical Equation: ${context.analysis.chemicalEquation || 'N/A'}
- Pharmacological Mechanism: ${context.analysis.mechanismExplanation || 'N/A'}
- Safe Timing Buffer Rule: ${context.analysis.timingBuffer || 'N/A'}` : ''}
`.trim() : '';

      const systemInstruction = `
You are the PharmaSafe Clinical AI Copilot. You explain pharmacological interactions and medication-diet safety in simple, empathetic, and clear language.

STRICT SAFETY GUARDRAILS (MANDATORY):
- Rule 1: You explain pharmacological interactions in simple, empathetic language.
- Rule 2: If a user asks for a diagnosis or prescription for a serious condition, you MUST reply:
"I am an AI, not a doctor. I cannot diagnose or prescribe medication. Please consult a physician."
- Rule 3: Always base your answers on the standard Indian Pharmacopoeia (IP) and the local Indian drug database (e.g., Dolo 650 = Paracetamol IP 650mg, Pan 40 = Pantoprazole IP 40mg, Glycomet = Metformin IP, Telma = Telmisartan IP, Storvas = Atorvastatin IP, Ecosprin = Aspirin IP, Augmentin = Amoxicillin/Clavulanate IP, etc.).
- Never invent ungrounded drug-food conflicts. If a combination is safe (like Dolo 650 or Supradyn or Evion 400 with plain food), reassure the patient with calm, practical advice.
- When asked about missed doses: Explain standard clinical timing guidelines (take it when remembered unless it is nearly time for the next dose; never take a double dose) and advise checking their strip instructions or consulting their pharmacist.
- When asked about tea/coffee: Explain caffeine and tannin chelation rules (e.g. wait at least 2 hours for thyroid pills like Thyronorm, iron supplements like DexOrange, or fluoroquinolones like Ciplox).

${contextSummary}
`.trim();

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.2
          }
        });

        const reply = response.text || 'I am an AI, not a doctor. I cannot diagnose or prescribe medication. Please consult a physician.';
        return res.json({ reply, grounded: true });
      }

      // Grounded deterministic clinical fallback when API key is not present
      const fallbackReply = generateClinicalAiFallback(lastUserMessage, context);
      return res.json({ reply: fallbackReply, grounded: true });
    } catch (err: any) {
      console.error('[PharmaSafe AI Copilot] Gemini API error, falling back to local clinical logic:', err?.message);
      const lastUserMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
      const fallbackReply = generateClinicalAiFallback(lastUserMessage, req.body?.context);
      return res.json({ reply: fallbackReply, grounded: true, isFallback: true });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'operational',
      app: 'PharmaSafe',
      engine: 'Quantitative Pharmacokinetics & Drug-Food Interaction Engine v2.5',
      totalDrugs: Object.keys(DRUGS_CATALOG).length,
      totalFoods: Object.keys(FOODS_CATALOG).length,
      totalDrugFoodRules: DRUG_FOOD_INTERACTION_RULES.length,
      totalDrugDrugRules: DRUG_DRUG_INTERACTION_RULES.length,
      totalSymptomProtocols: HOME_REMEDY_EFFICACY_CATALOG.length
    });
  });

  // Frontend integration: Vite middleware in dev, static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`[PharmaSafe Engine] Server online at http://${HOST}:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[PharmaSafe Engine] Port ${PORT} already in use:`, err);
    } else {
      console.error('[PharmaSafe Engine] Server error:', err);
    }
  });
}

startServer().catch((err) => {
  console.error('[PharmaSafe Engine] Failed to start server:', err);
  process.exit(1);
});
