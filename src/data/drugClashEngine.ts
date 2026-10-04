import type { 
  PillItem, 
  DrugClashAlert, 
  ScheduleSlot, 
  ScheduledPill, 
  MultiMedicineAnalysisResult 
} from '../types';

/**
 * Checks a list of selected Indian medicines for dangerous cross-interactions.
 */
export function checkMultiMedicineClashes(pills: PillItem[]): MultiMedicineAnalysisResult {
  const clashes: DrugClashAlert[] = [];
  const normalizedPills = pills.map(p => ({
    ...p,
    cleanBrand: p.brandName.toLowerCase(),
    cleanSalt: p.genericSalt.toLowerCase()
  }));

  // Helper matchers
  const isAspirin = (p: typeof normalizedPills[0]) => 
    p.cleanBrand.includes('ecosprin') || p.cleanSalt.includes('aspirin') || p.cleanSalt.includes('acetylsalicylic');

  const isNSAID = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('combiflam') || p.cleanBrand.includes('brufen') || 
    p.cleanBrand.includes('voveran') || p.cleanBrand.includes('zerodol') || 
    p.cleanSalt.includes('ibuprofen') || p.cleanSalt.includes('diclofenac') || p.cleanSalt.includes('aceclofenac');

  const isThyroid = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('thyronorm') || p.cleanBrand.includes('eltroxin') || 
    p.cleanBrand.includes('thyrox') || p.cleanSalt.includes('levothyroxine') || p.cleanSalt.includes('thyroxine');

  const isAntacidPPI = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('pan 40') || p.cleanBrand.includes('pan-d') || p.cleanBrand.includes('pantocid') || 
    p.cleanBrand.includes('gelusil') || p.cleanBrand.includes('digene') || p.cleanBrand.includes('omez') || 
    p.cleanBrand.includes('rantac') || p.cleanSalt.includes('pantoprazole') || p.cleanSalt.includes('omeprazole') || 
    p.cleanSalt.includes('aluminium') || p.cleanSalt.includes('magnesium');

  const isCalcium = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('shelcal') || p.cleanSalt.includes('calcium');

  const isWarfarin = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('marevan') || p.cleanBrand.includes('warf') || p.cleanSalt.includes('warfarin');

  const isBPMed = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('telma') || p.cleanBrand.includes('tazloc') || p.cleanBrand.includes('telmikind') || 
    p.cleanBrand.includes('losar') || p.cleanSalt.includes('telmisartan') || p.cleanSalt.includes('losartan');

  const isPureParacetamol = (p: typeof normalizedPills[0]) =>
    (p.cleanBrand.includes('dolo') || p.cleanBrand.includes('calpol') || p.cleanBrand.includes('crocin') || p.cleanBrand.includes('pacimol')) &&
    !p.cleanBrand.includes('cold') && !p.cleanBrand.includes('combiflam');

  const isColdParacetamolCombo = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('cheston cold') || p.cleanBrand.includes('sinarest') || p.cleanBrand.includes('sumo l') ||
    p.cleanBrand.includes('combiflam');

  const isFluoroquinolone = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('ciplox') || p.cleanBrand.includes('cifran') || p.cleanSalt.includes('ciprofloxacin');

  const isIron = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('dexorange') || p.cleanSalt.includes('iron') || p.cleanSalt.includes('ferric');

  const isMetformin = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('glycomet') || p.cleanBrand.includes('gluconorm') || p.cleanSalt.includes('metformin');

  const isDiureticBP = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('telma-h') || p.cleanSalt.includes('hydrochlorothiazide');

  const isDigoxin = (p: typeof normalizedPills[0]) =>
    p.cleanBrand.includes('lanoxin') || p.cleanSalt.includes('digoxin');

  // Pairwise clash check
  for (let i = 0; i < normalizedPills.length; i++) {
    for (let j = i + 1; j < normalizedPills.length; j++) {
      const p1 = normalizedPills[i];
      const p2 = normalizedPills[j];

      // Clash 1: Aspirin (Ecosprin) + NSAIDs (Combiflam, Brufen, Voveran, Zerodol)
      if ((isAspirin(p1) && isNSAID(p2)) || (isAspirin(p2) && isNSAID(p1))) {
        const asp = isAspirin(p1) ? p1 : p2;
        const nsaid = isAspirin(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${asp.id}-${nsaid.id}`,
          drugA: asp.brandName,
          drugB: nsaid.brandName,
          saltA: asp.genericSalt,
          saltB: nsaid.genericSalt,
          severity: 'CRITICAL',
          title: 'High Risk: Severe Stomach Bleeding & Heart Shield Block',
          plainExplanation: `Taking ${asp.brandName} (Aspirin) together with ${nsaid.brandName} drastically multiplies your danger of internal stomach bleeding and painful ulcers. Furthermore, pain medicines like ${nsaid.brandName} physically block ${asp.brandName} from protecting your heart.`,
          clinicalWhy: 'Concurrent dual inhibition of COX-1 enzymes abolishes cytoprotective gastric prostaglandins while competitive binding impedes aspirin-mediated irreversible platelet anti-aggregation.',
          actionableFix: 'Consult your doctor to switch to Paracetamol (Dolo 650) for general aches, or separate doses by at least 8 hours with full meals.'
        });
      }

      // Clash 2: Antacids/PPIs (Pan-D, Pan 40) + Thyroid (Thyronorm, Eltroxin)
      if ((isAntacidPPI(p1) && isThyroid(p2)) || (isAntacidPPI(p2) && isThyroid(p1))) {
        const antacid = isAntacidPPI(p1) ? p1 : p2;
        const thy = isAntacidPPI(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${antacid.id}-${thy.id}`,
          drugA: antacid.brandName,
          drugB: thy.brandName,
          saltA: antacid.genericSalt,
          saltB: thy.genericSalt,
          severity: 'CRITICAL',
          title: 'Absorption Failure: Thyroid Medicine Neutralized',
          plainExplanation: `${antacid.brandName} completely neutralizes the stomach acid needed to dissolve and absorb your thyroid tablet (${thy.brandName}). Taking them at the same time cuts your thyroid dose absorption by up to 50%, causing fatigue and sluggishness.`,
          clinicalWhy: 'Gastric acid suppression (elevated intragastric pH) severely impedes dissolution and proximal small-intestine enterocyte transport of Levothyroxine sodium.',
          actionableFix: `Take ${thy.brandName} immediately upon waking at 7:00 AM with plain water. Delay ${antacid.brandName} by at least 4 to 5 hours until lunchtime.`
        });
      }

      // Clash 3: Calcium (Shelcal) + Thyroid (Thyronorm, Eltroxin)
      if ((isCalcium(p1) && isThyroid(p2)) || (isCalcium(p2) && isThyroid(p1))) {
        const cal = isCalcium(p1) ? p1 : p2;
        const thy = isCalcium(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${cal.id}-${thy.id}`,
          drugA: cal.brandName,
          drugB: thy.brandName,
          saltA: cal.genericSalt,
          saltB: thy.genericSalt,
          severity: 'CRITICAL',
          title: 'Chemical Binding: Calcium Blocks Thyroid Absorption',
          plainExplanation: `The calcium in ${cal.brandName} acts like a magnet, binding directly to ${thy.brandName} in your stomach to form an unabsorbable compound. Your body cannot absorb the medicine, rendering your thyroid treatment ineffective.`,
          clinicalWhy: 'Divalent calcium cations (Ca²⁺) form insoluble chelation complexes with Levothyroxine in the intestinal lumen.',
          actionableFix: `Keep these pills at least 4 to 6 hours apart. Schedule ${thy.brandName} on an empty stomach in the morning and ${cal.brandName} with your afternoon lunch.`
        });
      }

      // Clash 4: Antibiotic (Ciplox) + Calcium (Shelcal) or Antacids
      if ((isFluoroquinolone(p1) && (isCalcium(p2) || isAntacidPPI(p2))) || 
          (isFluoroquinolone(p2) && (isCalcium(p1) || isAntacidPPI(p1)))) {
        const abx = isFluoroquinolone(p1) ? p1 : p2;
        const binder = isFluoroquinolone(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${abx.id}-${binder.id}`,
          drugA: abx.brandName,
          drugB: binder.brandName,
          saltA: abx.genericSalt,
          saltB: binder.genericSalt,
          severity: 'CRITICAL',
          title: 'Antibiotic Inactivation: Chelation Complex Formation',
          plainExplanation: `Minerals in ${binder.brandName} chemically bond with the antibiotic ${abx.brandName}, reducing antibiotic absorption into your blood by up to 85%. This can cause the infection to persist and develop antibiotic resistance.`,
          clinicalWhy: 'Multivalent cations form heavy insoluble chelates with the 4-keto and 3-carboxyl groups of fluoroquinolones.',
          actionableFix: `Take ${abx.brandName} 2 hours before or 4 hours after taking ${binder.brandName}.`
        });
      }

      // Clash 5: Aspirin (Ecosprin) + Warfarin (Marevan, Warf)
      if ((isAspirin(p1) && isWarfarin(p2)) || (isAspirin(p2) && isWarfarin(p1))) {
        const asp = isAspirin(p1) ? p1 : p2;
        const warf = isAspirin(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${asp.id}-${warf.id}`,
          drugA: asp.brandName,
          drugB: warf.brandName,
          saltA: asp.genericSalt,
          saltB: warf.genericSalt,
          severity: 'CRITICAL',
          title: 'High Danger: Extreme Internal Bleeding / Hemorrhage',
          plainExplanation: `Combining two potent blood thinners (${asp.brandName} + ${warf.brandName}) leaves your blood dangerously thin. Even minor bumps, cuts, or internal stomach irritation can lead to severe, uncontrollable bleeding.`,
          clinicalWhy: 'Concomitant inhibition of platelet aggregation (Aspirin) and vitamin K epoxide reductase coagulation factors (Warfarin) completely destroys hemostatic redundancy.',
          actionableFix: 'Requires strict medical oversight and regular Prothrombin Time / INR blood tests. Never adjust doses without your doctor.'
        });
      }

      // Clash 6: Blood Pressure (Telma, Tazloc) + Pain Meds (Combiflam, Brufen, Voveran)
      if ((isBPMed(p1) && isNSAID(p2)) || (isBPMed(p2) && isNSAID(p1))) {
        const bp = isBPMed(p1) ? p1 : p2;
        const nsaid = isBPMed(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${bp.id}-${nsaid.id}`,
          drugA: bp.brandName,
          drugB: nsaid.brandName,
          saltA: bp.genericSalt,
          saltB: nsaid.genericSalt,
          severity: 'MODERATE',
          title: 'Blood Pressure Spike & Kidney Stress',
          plainExplanation: `Pain relievers like ${nsaid.brandName} cause fluid retention and constrict blood vessels in your kidneys, blunting the blood-pressure lowering power of ${bp.brandName} and increasing strain on your heart and kidneys.`,
          clinicalWhy: 'NSAID-induced inhibition of renal vasodilating prostaglandins antagonizes the hemodynamic benefits of Angiotensin II Receptor Blockers.',
          actionableFix: `Use Paracetamol (Dolo 650) for routine aches. If ${nsaid.brandName} is mandatory, limit use to 2-3 days and monitor blood pressure.`
        });
      }

      // Clash 7: Double Paracetamol Overdose (Dolo 650 + Cheston Cold / Sinarest / Sumo L)
      if ((isPureParacetamol(p1) && isColdParacetamolCombo(p2)) || (isPureParacetamol(p2) && isColdParacetamolCombo(p1))) {
        const pure = isPureParacetamol(p1) ? p1 : p2;
        const combo = isPureParacetamol(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${pure.id}-${combo.id}`,
          drugA: pure.brandName,
          drugB: combo.brandName,
          saltA: pure.genericSalt,
          saltB: combo.genericSalt,
          severity: 'CRITICAL',
          title: 'Accidental Paracetamol Overdose: Liver Toxicity',
          plainExplanation: `Both ${pure.brandName} and ${combo.brandName} contain full doses of Paracetamol. Taking both together accidentally exceeds the safe daily limit (4,000 mg) and can trigger acute, dangerous liver failure.`,
          clinicalWhy: 'Excess acetaminophen overwhelms hepatic glucuronidation/sulfation, leading to toxic NAPQI metabolite buildup and liver cell death.',
          actionableFix: `Stop taking ${pure.brandName} while you are already using ${combo.brandName}. One Paracetamol source is sufficient.`
        });
      }

      // Clash 8: Thyroid (Thyronorm) + Iron (DexOrange)
      if ((isThyroid(p1) && isIron(p2)) || (isThyroid(p2) && isIron(p1))) {
        const thy = isThyroid(p1) ? p1 : p2;
        const iron = isThyroid(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${thy.id}-${iron.id}`,
          drugA: thy.brandName,
          drugB: iron.brandName,
          saltA: thy.genericSalt,
          saltB: iron.genericSalt,
          severity: 'CRITICAL',
          title: 'Iron Binding: Thyroid Dose Ineffective',
          plainExplanation: `The ferric iron in ${iron.brandName} forms a solid chemical precipitate with ${thy.brandName}, preventing it from being absorbed.`,
          clinicalWhy: 'Ferric ions form insoluble coordination chelates with Levothyroxine molecules.',
          actionableFix: `Take ${thy.brandName} at 7:00 AM on an empty stomach and take ${iron.brandName} in the afternoon after lunch.`
        });
      }

      // Clash 9: Metformin (Glycomet) + Diuretics (Telma-H)
      if ((isMetformin(p1) && isDiureticBP(p2)) || (isMetformin(p2) && isDiureticBP(p1))) {
        const met = isMetformin(p1) ? p1 : p2;
        const diu = isMetformin(p1) ? p2 : p1;
        clashes.push({
          id: `clash-${met.id}-${diu.id}`,
          drugA: met.brandName,
          drugB: diu.brandName,
          saltA: met.genericSalt,
          saltB: diu.genericSalt,
          severity: 'MODERATE',
          title: 'Hydration Watch: Diuretic Fluid Loss & Lactic Balance',
          plainExplanation: `The diuretic water pill in ${diu.brandName} increases kidney fluid loss. ${met.brandName} requires good hydration to safely process through your kidneys.`,
          clinicalWhy: 'Dehydration reduces glomerular filtration rate, diminishing metformin excretion.',
          actionableFix: 'Drink at least 8 to 10 glasses of water throughout the day. Take Glycomet with lunch/dinner meals.'
        });
      }
    }
  }

  // Determine overall status
  const hasCritical = clashes.some(c => c.severity === 'CRITICAL');
  const hasModerate = clashes.some(c => c.severity === 'MODERATE');
  const hasClashes = clashes.length > 0;

  const maxSeverity: 'CRITICAL' | 'MODERATE' | 'SAFE' = hasCritical 
    ? 'CRITICAL' 
    : hasModerate 
    ? 'MODERATE' 
    : 'SAFE';

  let overallHeadline = '';
  if (hasCritical) {
    overallHeadline = `Critical Drug Clash Detected (${clashes.length} Warning${clashes.length > 1 ? 's' : ''}): Urgent Spacing Required`;
  } else if (hasModerate) {
    overallHeadline = `Moderate Precaution Detected: Timing Adjustments Recommended`;
  } else {
    overallHeadline = `Safe Combination: No Critical Clashes Detected Among Your Selected Medicines`;
  }

  // Generate Smart Daily Schedule
  const schedule = generateSmartSchedule(pills, clashes);

  return {
    hasClashes,
    maxSeverity,
    totalClashes: clashes.length,
    clashes,
    schedule,
    overallHeadline,
    analyzedPills: pills
  };
}

/**
 * Builds the 3-part Smart Daily Schedule (Morning, Afternoon, Night)
 * with automatic separation for clashing medications.
 */
export function generateSmartSchedule(pills: PillItem[], clashes: DrugClashAlert[]): ScheduleSlot[] {
  const morningPills: ScheduledPill[] = [];
  const afternoonPills: ScheduledPill[] = [];
  const nightPills: ScheduledPill[] = [];

  // Check if specific clashes are active to enforce smart separation
  const hasThyroidAntacidClash = clashes.some(c => 
    (c.drugA.toLowerCase().includes('pan') && c.drugB.toLowerCase().includes('thyro')) ||
    (c.drugB.toLowerCase().includes('pan') && c.drugA.toLowerCase().includes('thyro')) ||
    (c.saltA.toLowerCase().includes('pantoprazole') && c.saltB.toLowerCase().includes('levothyroxine')) ||
    (c.saltB.toLowerCase().includes('pantoprazole') && c.saltA.toLowerCase().includes('levothyroxine'))
  );

  const hasThyroidCalciumClash = clashes.some(c => 
    (c.drugA.toLowerCase().includes('shelcal') && c.drugB.toLowerCase().includes('thyro')) ||
    (c.drugB.toLowerCase().includes('shelcal') && c.drugA.toLowerCase().includes('thyro')) ||
    (c.saltA.toLowerCase().includes('calcium') && c.saltB.toLowerCase().includes('levothyroxine')) ||
    (c.saltB.toLowerCase().includes('calcium') && c.saltA.toLowerCase().includes('levothyroxine'))
  );

  const hasAspirinNSAIDClash = clashes.some(c => 
    (c.saltA.toLowerCase().includes('aspirin') && (c.saltB.toLowerCase().includes('ibuprofen') || c.saltB.toLowerCase().includes('diclofenac'))) ||
    (c.saltB.toLowerCase().includes('aspirin') && (c.saltA.toLowerCase().includes('ibuprofen') || c.saltA.toLowerCase().includes('diclofenac')))
  );

  const hasAntibioticCalciumClash = clashes.some(c =>
    (c.saltA.toLowerCase().includes('cipro') && c.saltB.toLowerCase().includes('calcium')) ||
    (c.saltB.toLowerCase().includes('cipro') && c.saltA.toLowerCase().includes('calcium'))
  );

  for (const pill of pills) {
    const brand = pill.brandName.toLowerCase();
    const salt = pill.genericSalt.toLowerCase();

    // 1. Thyroid medication: Always Morning Empty Stomach (First thing at 7:00 AM)
    if (brand.includes('thyro') || salt.includes('levothyroxine') || salt.includes('thyroxine')) {
      morningPills.push({
        pill,
        timingNote: 'Take 45 minutes before breakfast with a full glass of plain water.',
        isSeparatedDueToClash: hasThyroidAntacidClash || hasThyroidCalciumClash,
        separationReason: hasThyroidAntacidClash 
          ? 'Scheduled first thing in the morning; antacids buffered by 5+ hours.'
          : hasThyroidCalciumClash 
          ? 'Scheduled in morning; calcium supplements moved to afternoon.'
          : undefined
      });
      continue;
    }

    // 2. Antacids / PPIs (Pan 40, Pan-D, Pantocid, Omez)
    if (brand.includes('pan') || brand.includes('omez') || salt.includes('pantoprazole') || salt.includes('omeprazole')) {
      if (hasThyroidAntacidClash) {
        // Automatically separate to Afternoon (30 mins before lunch) to protect thyroid absorption!
        afternoonPills.push({
          pill,
          timingNote: 'Take 30 minutes before lunch on an empty stomach.',
          isSeparatedDueToClash: true,
          separationReason: 'Separated to afternoon (5+ hours after Thyronorm) to prevent chemical absorption block.'
        });
      } else {
        morningPills.push({
          pill,
          timingNote: 'Take 30 minutes before breakfast with water.',
          isSeparatedDueToClash: false
        });
      }
      continue;
    }

    // 3. Cholesterol Meds / Statins (Storvas, Lipicure, Atorva, Tonact, Rozavel) -> Always Night
    if (brand.includes('storvas') || brand.includes('lipicure') || brand.includes('atorva') || brand.includes('tonact') || brand.includes('rozavel') || salt.includes('atorvastatin') || salt.includes('rosuvastatin')) {
      nightPills.push({
        pill,
        timingNote: 'Take at bedtime (liver cholesterol synthesis peaks between midnight and 4:00 AM).',
        isSeparatedDueToClash: false
      });
      continue;
    }

    // 4. Blood Pressure Meds (Telma, Tazloc, Telmikind, Losar, Amlong) -> Night
    if (brand.includes('telma') || brand.includes('tazloc') || brand.includes('telmikind') || brand.includes('losar') || brand.includes('amlong') || salt.includes('telmisartan') || salt.includes('losartan') || salt.includes('amlodipine')) {
      nightPills.push({
        pill,
        timingNote: 'Take at night after dinner (prevents morning blood pressure spikes).',
        isSeparatedDueToClash: false
      });
      continue;
    }

    // 5. Aspirin / Antiplatelets (Ecosprin, Clavix) -> Night (or Morning if clashing)
    if (brand.includes('ecosprin') || brand.includes('clavix') || salt.includes('aspirin') || salt.includes('clopidogrel')) {
      if (hasAspirinNSAIDClash) {
        nightPills.push({
          pill,
          timingNote: 'Take before sleep with a small glass of water or milk.',
          isSeparatedDueToClash: true,
          separationReason: 'Separated by 8 hours from afternoon pain relievers to minimize stomach lining damage.'
        });
      } else {
        nightPills.push({
          pill,
          timingNote: 'Take at bedtime with water (offers optimal morning cardiac protection).',
          isSeparatedDueToClash: false
        });
      }
      continue;
    }

    // 6. Pain Relievers / NSAIDs (Combiflam, Brufen, Voveran, Zerodol, Dolo, Calpol) -> Afternoon With Food
    if (brand.includes('combiflam') || brand.includes('brufen') || brand.includes('voveran') || brand.includes('zerodol') || brand.includes('dolo') || brand.includes('calpol') || brand.includes('crocin') || salt.includes('ibuprofen') || salt.includes('paracetamol')) {
      afternoonPills.push({
        pill,
        timingNote: 'Take immediately after a full meal to protect stomach lining.',
        isSeparatedDueToClash: hasAspirinNSAIDClash,
        separationReason: hasAspirinNSAIDClash 
          ? 'Separated to afternoon with a heavy meal to shield gastric mucosa.' 
          : undefined
      });
      continue;
    }

    // 7. Calcium / Shelcal -> Afternoon With Food
    if (brand.includes('shelcal') || salt.includes('calcium')) {
      afternoonPills.push({
        pill,
        timingNote: 'Take with or immediately after lunch for optimal mineral absorption.',
        isSeparatedDueToClash: hasThyroidCalciumClash || hasAntibioticCalciumClash,
        separationReason: hasThyroidCalciumClash
          ? 'Separated by 6 hours from morning thyroid tablet to eliminate binding chelation.'
          : hasAntibioticCalciumClash
          ? 'Separated by 5 hours from antibiotic dose.'
          : undefined
      });
      continue;
    }

    // 8. Diabetes / Metformin (Glycomet, Gluconorm) -> Afternoon With Food
    if (brand.includes('glycomet') || brand.includes('gluconorm') || salt.includes('metformin')) {
      afternoonPills.push({
        pill,
        timingNote: 'Take with lunch or dinner to avoid stomach upset.',
        isSeparatedDueToClash: false
      });
      continue;
    }

    // 9. Antibiotics (Ciplox, Augmentin, Azithral, Taxim-O)
    if (brand.includes('ciplox') || brand.includes('cifran') || brand.includes('augmentin') || brand.includes('azithral') || brand.includes('taxim')) {
      if (hasAntibioticCalciumClash && (brand.includes('ciplox') || brand.includes('cifran'))) {
        morningPills.push({
          pill,
          timingNote: 'Take 2 hours before any dairy or calcium pills with full glass of water.',
          isSeparatedDueToClash: true,
          separationReason: 'Separated to morning to avoid calcium chelation from afternoon meals.'
        });
      } else {
        afternoonPills.push({
          pill,
          timingNote: 'Take after food with plenty of water. Complete full prescribed course.',
          isSeparatedDueToClash: false
        });
      }
      continue;
    }

    // 10. Allergy / Antihistamines (Allegra, Okacet, Montair LC, Sinarest) -> Night
    if (brand.includes('allegra') || brand.includes('okacet') || brand.includes('montair') || brand.includes('sinarest') || brand.includes('cheston') || salt.includes('cetirizine') || salt.includes('fexofenadine') || salt.includes('montelukast')) {
      nightPills.push({
        pill,
        timingNote: 'Take at night before bed to prevent daytime sleepiness.',
        isSeparatedDueToClash: false
      });
      continue;
    }

    // 11. General Vitamins / Supplements (Supradyn, DexOrange, Evion 400, Becosules, Neurobion, Limcee) -> Afternoon
    if (brand.includes('supradyn') || brand.includes('dexorange') || brand.includes('evion') || brand.includes('becosules') || brand.includes('neurobion') || brand.includes('limcee') || salt.includes('vitamin') || salt.includes('iron')) {
      afternoonPills.push({
        pill,
        timingNote: 'Take after lunch with water for smooth digestion.',
        isSeparatedDueToClash: false
      });
      continue;
    }

    // Default fallback: place in afternoon with food
    afternoonPills.push({
      pill,
      timingNote: 'Take with food as directed by your physician.',
      isSeparatedDueToClash: false
    });
  }

  // Construct the 3 visual time slots
  return [
    {
      id: 'morning',
      period: '🌅 Morning',
      subtitle: 'Empty Stomach (First thing upon waking)',
      timingWindow: '7:00 AM – 8:00 AM',
      icon: 'Sun',
      bgColor: 'bg-amber-50/70 dark:bg-amber-950/20',
      borderColor: 'border-amber-200 dark:border-amber-900/60',
      accentColor: 'text-amber-800 dark:text-amber-300',
      pills: morningPills
    },
    {
      id: 'afternoon',
      period: '☀️ Afternoon',
      subtitle: 'With / Immediately After Lunch',
      timingWindow: '1:00 PM – 2:00 PM',
      icon: 'Utensils',
      bgColor: 'bg-teal-50/70 dark:bg-teal-950/20',
      borderColor: 'border-teal-200 dark:border-teal-900/60',
      accentColor: 'text-teal-800 dark:text-teal-300',
      pills: afternoonPills
    },
    {
      id: 'night',
      period: '🌙 Night',
      subtitle: 'After Dinner / 30 mins Before Bed',
      timingWindow: '9:00 PM – 10:00 PM',
      icon: 'Moon',
      bgColor: 'bg-indigo-50/70 dark:bg-indigo-950/20',
      borderColor: 'border-indigo-200 dark:border-indigo-900/60',
      accentColor: 'text-indigo-800 dark:text-indigo-300',
      pills: nightPills
    }
  ];
}
