import type { DrugId } from '../types';

export interface DosageGuideline {
  drugId: DrugId;
  drugName: string;
  emoji: string;
  bestTimeOfDay: 'Morning' | 'Evening' | 'With Meals' | 'Empty Stomach' | 'As Needed';
  idealTime: string;
  administrationRule: string;
  foodGuideline: string;
  clinicalRationale: string;
  cautionNotice: string;
}

export interface SavedDosageReminder {
  drugId: DrugId;
  savedAt: string;
  customReminderTime: string; // e.g. "08:00"
  notes?: string;
}

export const DOSAGE_GUIDELINES: Record<DrugId, DosageGuideline> = {
  'Atorvastatin': {
    drugId: 'Atorvastatin',
    drugName: 'Atorvastatin (Cholesterol)',
    emoji: '🩺',
    bestTimeOfDay: 'Evening',
    idealTime: '20:30',
    administrationRule: 'Take once daily at bedtime or after dinner with water.',
    foodGuideline: 'With or without food. Avoid grapefruit and grapefruit juice completely.',
    clinicalRationale: 'Hepatic HMG-CoA reductase activity and cholesterol synthesis peak during the nighttime, making evening administration most potent.',
    cautionNotice: 'Never drink grapefruit juice as it destroys the CYP3A4 clearance enzyme.'
  },
  'Tetracycline / Ciprofloxacin': {
    drugId: 'Tetracycline / Ciprofloxacin',
    drugName: 'Tetracycline / Ciprofloxacin (Antibiotic)',
    emoji: '💊',
    bestTimeOfDay: 'Empty Stomach',
    idealTime: '08:00',
    administrationRule: 'Take with a full 8 oz glass of pure water. Stay upright for 30 minutes.',
    foodGuideline: 'Empty stomach (1 hr before or 2 hrs after meals). Avoid dairy, yogurt, or calcium for 2-4 hours.',
    clinicalRationale: 'Calcium, magnesium, and iron bind the antibiotic into an insoluble lump that your gut cannot absorb.',
    cautionNotice: 'Do not lie down immediately to prevent pill-induced esophageal ulceration.'
  },
  'Warfarin': {
    drugId: 'Warfarin',
    drugName: 'Warfarin (Blood Thinner)',
    emoji: '🩸',
    bestTimeOfDay: 'Evening',
    idealTime: '18:00',
    administrationRule: 'Take once daily in the evening at the exact same hour.',
    foodGuideline: 'Consistent green vegetable intake. Avoid sudden feasts or starvation of spinach/kale.',
    clinicalRationale: 'Evening dosing allows attending clinics to titrate dose changes on the same day morning INR results arrive.',
    cautionNotice: 'Keep daily Vitamin K intake consistent to avoid clotting reversal.'
  },
  'Lisinopril / Losartan': {
    drugId: 'Lisinopril / Losartan',
    drugName: 'Lisinopril / Losartan (Blood Pressure)',
    emoji: '🫀',
    bestTimeOfDay: 'Morning',
    idealTime: '08:30',
    administrationRule: 'Take once daily in the morning with a glass of water.',
    foodGuideline: 'Avoid potassium salt substitutes (NoSalt) and high-potassium excess.',
    clinicalRationale: 'Counters the natural early morning circadian blood pressure surge to protect against cardiovascular events.',
    cautionNotice: 'Watch for lightheadedness when standing up quickly.'
  },
  'Levothyroxine': {
    drugId: 'Levothyroxine',
    drugName: 'Levothyroxine (Thyroid)',
    emoji: '🦋',
    bestTimeOfDay: 'Empty Stomach',
    idealTime: '06:30',
    administrationRule: 'Take immediately upon waking with a full glass of plain water.',
    foodGuideline: 'Wait at least 60 minutes before having coffee, espresso, black tea, or breakfast.',
    clinicalRationale: 'Gastric acid and an empty intestine are crucial for T4 absorption; coffee and breakfast bind T4 molecules.',
    cautionNotice: 'Do not take calcium or iron supplements within 4 hours of your thyroid pill.'
  },
  'Metformin': {
    drugId: 'Metformin',
    drugName: 'Metformin (Diabetes)',
    emoji: '📉',
    bestTimeOfDay: 'With Meals',
    idealTime: '08:30',
    administrationRule: 'Take with or immediately following your morning/evening meal.',
    foodGuideline: 'Always take with food containing carbohydrates. Strictly avoid alcohol.',
    clinicalRationale: 'Food substantially buffers the stomach and minimizes nausea, abdominal cramps, and diarrhea.',
    cautionNotice: 'Never consume alcohol or binge drink with Metformin (lactic acidosis danger).'
  },
  'Digoxin': {
    drugId: 'Digoxin',
    drugName: 'Digoxin (Heart Rhythm)',
    emoji: '💓',
    bestTimeOfDay: 'Morning',
    idealTime: '09:00',
    administrationRule: 'Take once daily at the same time each day.',
    foodGuideline: 'Avoid natural black licorice candy or licorice root extracts.',
    clinicalRationale: 'Narrow therapeutic window requires steady 24-hour plasma concentration.',
    cautionNotice: 'Check your pulse regularly and report unusually slow heartbeats or halo vision.'
  },
  'Ibuprofen / NSAIDs': {
    drugId: 'Ibuprofen / NSAIDs',
    drugName: 'Ibuprofen / NSAIDs (Pain Relief)',
    emoji: '⚡',
    bestTimeOfDay: 'With Meals',
    idealTime: '12:30',
    administrationRule: 'Take only as needed with a meal, snack, or glass of milk.',
    foodGuideline: 'Never take on an empty stomach. Zero alcohol co-consumption.',
    clinicalRationale: 'Food creates a physical barrier protecting the delicate gastric mucosa from direct acid erosion.',
    cautionNotice: 'Do not exceed recommended daily limits or combine with aspirin or alcohol.'
  },
  'Iron Supplements': {
    drugId: 'Iron Supplements',
    drugName: 'Iron Supplements (Anemia)',
    emoji: '🩸',
    bestTimeOfDay: 'Empty Stomach',
    idealTime: '07:30',
    administrationRule: 'Take on an empty stomach with a glass of orange juice or water.',
    foodGuideline: 'Wait 2 hours before drinking coffee, tea, or milk.',
    clinicalRationale: 'Vitamin C (ascorbic acid) keeps iron in its soluble ferrous form; tannins in tea and coffee block absorption.',
    cautionNotice: 'If severe nausea occurs, take with a light low-calcium snack.'
  },
  'MAO Inhibitors': {
    drugId: 'MAO Inhibitors',
    drugName: 'MAO Inhibitors (Antidepressant)',
    emoji: '🧠',
    bestTimeOfDay: 'Morning',
    idealTime: '08:00',
    administrationRule: 'Take early in the day as directed by your physician.',
    foodGuideline: 'Strictly adhere to a zero-tyramine diet (no aged cheeses, draft beer, cured meats).',
    clinicalRationale: 'Prevents daytime somnolence and avoids nocturnal sleep disturbances from catecholamine stimulation.',
    cautionNotice: 'Dietary tyramine restrictions must continue for 14 days after discontinuation.'
  },
  'Paracetamol / Acetaminophen': {
    drugId: 'Paracetamol / Acetaminophen',
    drugName: 'Paracetamol / Acetaminophen (Fever/Pain)',
    emoji: '🌡️',
    bestTimeOfDay: 'As Needed',
    idealTime: '10:00',
    administrationRule: 'Take with water every 4 to 6 hours as needed for symptoms.',
    foodGuideline: 'Can be taken with or without food. Avoid alcoholic drinks.',
    clinicalRationale: 'Provides prompt relief without gastric ulceration when taken in standard non-toxic quantities.',
    cautionNotice: 'Never exceed 3,000–4,000 mg in 24 hours to prevent acute liver toxicity.'
  }
};

const STORAGE_KEY = 'pharmasafe_saved_dosages_v1';

export function getSavedDosages(): SavedDosageReminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved dosages from localStorage:', e);
    return [];
  }
}

export function saveDosageReminder(drugId: DrugId, customReminderTime?: string): SavedDosageReminder[] {
  try {
    const current = getSavedDosages();
    const existingIndex = current.findIndex(item => item.drugId === drugId);
    const guideline = DOSAGE_GUIDELINES[drugId];
    const reminderTime = customReminderTime || guideline?.idealTime || '08:00';

    if (existingIndex >= 0) {
      current[existingIndex].customReminderTime = reminderTime;
      current[existingIndex].savedAt = new Date().toISOString();
    } else {
      current.push({
        drugId,
        savedAt: new Date().toISOString(),
        customReminderTime: reminderTime
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Failed to save dosage reminder to localStorage:', e);
    return getSavedDosages();
  }
}

export function removeSavedDosage(drugId: DrugId): SavedDosageReminder[] {
  try {
    const current = getSavedDosages().filter(item => item.drugId !== drugId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Failed to remove saved dosage from localStorage:', e);
    return getSavedDosages();
  }
}

export function isDosageSaved(drugId: DrugId): boolean {
  const current = getSavedDosages();
  return current.some(item => item.drugId === drugId);
}
