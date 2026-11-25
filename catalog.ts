export type CuratedDrugId =
  | 'Atorvastatin'
  | 'Tetracycline / Ciprofloxacin'
  | 'Warfarin'
  | 'Lisinopril / Losartan'
  | 'Levothyroxine'
  | 'Metformin'
  | 'Digoxin'
  | 'Ibuprofen / NSAIDs'
  | 'Iron Supplements'
  | 'MAO Inhibitors'
  | 'Paracetamol / Acetaminophen';

export type DrugId = CuratedDrugId | (string & {});

export type FoodId =
  | 'Grapefruit / Grapefruit Juice'
  | 'Milk / Dairy Products'
  | 'Spinach, Kale & Broccoli (Vitamin K Rich)'
  | 'Bananas & Salt Substitutes (High Potassium)'
  | 'Coffee / Black Tea'
  | 'Alcohol / Beer / Wine'
  | 'Black Licorice (Natural Glycyrrhizin)'
  | 'Aged Cheese & Fermented Foods (High Tyramine)'
  | 'Plain White Rice & Apples'
  | 'Oatmeal & Whole Wheat Toast';

export interface DrugInfo {
  id: DrugId;
  name: string;
  drugClass: string;
  genericNames: string[];
  molecularFormula: string;
  primaryPathway: string;
  clinicalUse: string;
}

export interface FoodInfo {
  id: FoodId;
  name: string;
  activeConstituents: string[];
  commonExamples: string[];
  metabolicTarget: string;
  dietaryCategory: string;
}

export interface DrugFoodInteractionRule {
  id: string;
  drug: CuratedDrugId;
  food: FoodId;
  isCritical: boolean;
  status: 'CRITICAL' | 'MODERATE' | 'PRECAUTION' | 'SAFE';
  category: 'Strictly Avoid' | 'Space Out' | 'Enjoy';
  severity: 'CRITICAL DANGER' | 'SEVERE INTERACTION' | 'HIGH DANGER' | 'MODERATE INTERACTION' | 'SAFE COMBINATION';
  /** Quantitative pharmacokinetic impact: negative = absorption/efficacy drop (%), positive = plasma/toxic concentration surge (%) */
  bioavailabilityImpactPercent: number;
  /** Human-readable quantitative pharmacokinetic percentage summary */
  bioavailabilityImpactSummary: string;
  /** Balanced / mechanistic chemical equation representing the molecular clash */
  chemicalEquation: string;
  /** Detailed molecular kinetics & enzymatic/receptor mechanism */
  reactionMechanism: string;
  headline: string;
  action: string;
  reason: string;
  mechanismTitle: string;
  mechanismExplanation: string;
  mechanismClass: string;
  affectedPathway: string;
  chemicalSummary: string;
  primaryActiveAgents: string[];
  molecularEvent: string;
  targetEnzymesOrReceptors: string;
  clinicalConsequences: string[];
  onsetTime: string;
  timingBuffer: {
    type: 'BUFFER_WINDOW' | 'COMPLETE_AVOIDANCE' | 'ONGOING_PRECAUTION' | 'STANDARD_SCHEDULE';
    badgeText: string;
    shortLabel: string;
    bufferHours?: string;
    recommendation?: string;
  };
  saferFoods: Array<{
    name: string;
    category: string;
    rationale: string;
    icon: string;
    nutritionNote?: string;
  }>;
  clinicalAlternatives: string[];
  dosageAndTimingRules: string;
  emergencySymptoms: string[];
  symptomWatch: string;
  firstAidSteps: string[];
  activeSaltChecked: string;
  biochemicalTarget: string;
  standardReference: string;
}

export interface DrugDrugInteractionRule {
  id: string;
  drugGroupA: string;
  drugGroupB: string;
  exampleBrandsA: string[];
  exampleBrandsB: string[];
  severity: 'CRITICAL' | 'MODERATE' | 'CAUTION';
  title: string;
  /** Quantitative pharmacokinetic impact (%) */
  bioavailabilityImpactPercent: number;
  bioavailabilityImpactSummary: string;
  chemicalEquation: string;
  reactionMechanism: string;
  plainExplanation: string;
  clinicalWhy: string;
  actionableFix: string;
}

export interface HomeRemedyEfficacyEntry {
  title: string;
  efficacyPercent: number;
  efficacyMechanismSummary: string;
  action: string;
  scienceRationale: string;
}

export interface SymptomReliefCatalogEntry {
  symptomId: string;
  symptomName: string;
  homeRemedies: HomeRemedyEfficacyEntry[];
}

export const DRUGS_CATALOG: Record<CuratedDrugId, DrugInfo> = {
  'Atorvastatin': {
    id: 'Atorvastatin',
    name: 'Atorvastatin (Cholesterol)',
    drugClass: 'HMG-CoA Reductase Inhibitor',
    genericNames: ['Lipitor', 'Torvast', 'Storvas', 'Atorva', 'Lipicure'],
    molecularFormula: 'C33H35FN2O5',
    primaryPathway: 'Substrate for Cytochrome P450 3A4 (CYP3A4) enterocyte and hepatic clearance',
    clinicalUse: 'Primary hypercholesterolemia and cardiovascular disease prophylaxis'
  },
  'Tetracycline / Ciprofloxacin': {
    id: 'Tetracycline / Ciprofloxacin',
    name: 'Tetracycline / Ciprofloxacin (Antibiotic)',
    drugClass: 'Broad-Spectrum Antibacterial Agents',
    genericNames: ['Tetracycline HCl', 'Ciprofloxacin HCl', 'Ciplox', 'Cifran', 'Cipro'],
    molecularFormula: 'C22H24N2O8 / C17H18FN3O3',
    primaryPathway: 'Bacterial 30S ribosomal inhibition & DNA gyrase/topoisomerase IV inhibition',
    clinicalUse: 'Treatment of systemic and localized bacterial infections'
  },
  'Warfarin': {
    id: 'Warfarin',
    name: 'Warfarin (Blood Thinner)',
    drugClass: 'Vitamin K Epoxide Reductase Antagonist',
    genericNames: ['Coumadin', 'Jantoven', 'Marevan', 'Warf'],
    molecularFormula: 'C19H16O4',
    primaryPathway: 'Hepatic VKORC1 enzyme complex inhibition preventing gamma-carboxylation',
    clinicalUse: 'Deep vein thrombosis (DVT), pulmonary embolism, and stroke prophylaxis in AFib'
  },
  'Lisinopril / Losartan': {
    id: 'Lisinopril / Losartan',
    name: 'Lisinopril / Losartan (Blood Pressure)',
    drugClass: 'ACE Inhibitor / Angiotensin Receptor Blocker (ARB)',
    genericNames: ['Prinivil', 'Zestril', 'Cozaar', 'Losar', 'Telma'],
    molecularFormula: 'C21H31N3O5 / C22H23ClN6O',
    primaryPathway: 'Renin-angiotensin-aldosterone system (RAAS) downregulation; renal potassium retention',
    clinicalUse: 'Essential hypertension, heart failure, and diabetic nephropathy'
  },
  'Levothyroxine': {
    id: 'Levothyroxine',
    name: 'Levothyroxine (Thyroid)',
    drugClass: 'Synthetic Thyroid Hormone (T4)',
    genericNames: ['Synthroid', 'Thyronorm', 'Eltroxin', 'Euthyrox'],
    molecularFormula: 'C15H11I4NO4',
    primaryPathway: 'Intestinal enterocyte passive diffusion; converted to active T3 in peripheral tissues',
    clinicalUse: 'Primary, secondary, and tertiary hypothyroidism'
  },
  'Metformin': {
    id: 'Metformin',
    name: 'Metformin (Diabetes)',
    drugClass: 'Biguanide Antihyperglycemic Agent',
    genericNames: ['Glucophage', 'Glycomet', 'Gluconorm', 'Fortamet'],
    molecularFormula: 'C4H11N5',
    primaryPathway: 'Hepatic mitochondrial respiratory complex I inhibition and AMPK activation',
    clinicalUse: 'Type 2 diabetes mellitus glycemic control'
  },
  'Digoxin': {
    id: 'Digoxin',
    name: 'Digoxin (Heart Rhythm)',
    drugClass: 'Cardiac Glycoside',
    genericNames: ['Lanoxin', 'Digox'],
    molecularFormula: 'C41H64O14',
    primaryPathway: 'Inhibition of myocardial membrane Na+/K+-ATPase pump',
    clinicalUse: 'Atrial fibrillation rate control and symptomatic heart failure'
  },
  'Ibuprofen / NSAIDs': {
    id: 'Ibuprofen / NSAIDs',
    name: 'Ibuprofen / NSAIDs (Pain Relief)',
    drugClass: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
    genericNames: ['Advil', 'Brufen', 'Combiflam', 'Voveran', 'Naproxen'],
    molecularFormula: 'C13H18O2',
    primaryPathway: 'Reversible non-selective inhibition of Cyclooxygenase (COX-1 and COX-2) enzymes',
    clinicalUse: 'Mild to moderate somatic pain, inflammatory conditions, and fever reduction'
  },
  'Iron Supplements': {
    id: 'Iron Supplements',
    name: 'Iron Supplements (Anemia)',
    drugClass: 'Hematinic Mineral Preparation',
    genericNames: ['Ferrous Sulfate', 'Ferrous Fumarate', 'DexOrange', 'Autrin'],
    molecularFormula: 'FeSO4',
    primaryPathway: 'Duodenal enterocyte uptake via Divalent Metal Transporter 1 (DMT1)',
    clinicalUse: 'Treatment and prevention of iron-deficiency anemia'
  },
  'MAO Inhibitors': {
    id: 'MAO Inhibitors',
    name: 'MAO Inhibitors (Antidepressant)',
    drugClass: 'Monoamine Oxidase Inhibitor',
    genericNames: ['Phenelzine (Nardil)', 'Tranylcypromine (Parnate)', 'Isocarboxazid', 'Selegiline'],
    molecularFormula: 'C8H12N2 (Phenelzine base)',
    primaryPathway: 'Irreversible inhibition of gut and brain MAO-A & MAO-B enzymes',
    clinicalUse: 'Treatment-resistant major depressive disorder'
  },
  'Paracetamol / Acetaminophen': {
    id: 'Paracetamol / Acetaminophen',
    name: 'Paracetamol / Acetaminophen (Mild Fever/Pain)',
    drugClass: 'Aniline Analgesic & Antipyretic',
    genericNames: ['Dolo 650', 'Crocin', 'Calpol', 'Tylenol', 'Panadol'],
    molecularFormula: 'C8H9NO2',
    primaryPathway: 'Central COX inhibition; metabolized by hepatic glucuronidation and CYP2E1 pathway',
    clinicalUse: 'Mild to moderate pain, headache, and fever reduction'
  }
};

export const FOODS_CATALOG: Record<FoodId, FoodInfo> = {
  'Grapefruit / Grapefruit Juice': {
    id: 'Grapefruit / Grapefruit Juice',
    name: 'Grapefruit / Grapefruit Juice',
    activeConstituents: ['Furanocoumarins (Bergamottin, 6\',7\'-dihydroxybergamottin)', 'Naringin'],
    commonExamples: ['Fresh grapefruit', 'Grapefruit juice concentrate', 'Pomelo', 'Seville oranges'],
    metabolicTarget: 'Irreversible suicide inhibition of intestinal Cytochrome P450 3A4 (CYP3A4)',
    dietaryCategory: 'Enzyme-Inhibiting Citrus'
  },
  'Milk / Dairy Products': {
    id: 'Milk / Dairy Products',
    name: 'Milk / Dairy Products',
    activeConstituents: ['Calcium cations (Ca2+)', 'Magnesium cations (Mg2+)', 'Casein proteins'],
    commonExamples: ['Whole milk', 'Yogurt / Curd (Dahi)', 'Paneer', 'Fresh cheese', 'Calcium shakes'],
    metabolicTarget: 'Multivalent chelation bonding in the gastrointestinal lumen',
    dietaryCategory: 'Cation-Rich Dairy'
  },
  'Spinach, Kale & Broccoli (Vitamin K Rich)': {
    id: 'Spinach, Kale & Broccoli (Vitamin K Rich)',
    name: 'Spinach, Kale & Broccoli (Vitamin K Rich)',
    activeConstituents: ['Phylloquinone (Vitamin K1)', 'Chlorophyll complexes'],
    commonExamples: ['Spinach (Palak)', 'Kale', 'Broccoli', 'Collard greens', 'Brussels sprouts'],
    metabolicTarget: 'Cofactor for gamma-glutamyl carboxylase in hepatic clotting factor synthesis',
    dietaryCategory: 'Phylloquinone-Dense Greens'
  },
  'Bananas & Salt Substitutes (High Potassium)': {
    id: 'Bananas & Salt Substitutes (High Potassium)',
    name: 'Bananas & Salt Substitutes (High Potassium)',
    activeConstituents: ['Potassium ions (K+)', 'Potassium Chloride (KCl)'],
    commonExamples: ['Bananas', 'Potassium salt substitutes (NoSalt, Low-Sodium Salt)', 'Dried apricots', 'Avocados'],
    metabolicTarget: 'Renal tubular excretion and myocardial action potential resting potential',
    dietaryCategory: 'Potassium-Dense Food & Seasoning'
  },
  'Coffee / Black Tea': {
    id: 'Coffee / Black Tea',
    name: 'Coffee / Black Tea',
    activeConstituents: ['Caffeine', 'Tannins (Gallotannins)', 'Polyphenols', 'Chlorogenic acid'],
    commonExamples: ['Drip coffee', 'Espresso', 'Black tea (Chai)', 'Green tea', 'Earl Grey'],
    metabolicTarget: 'Gastric transit acceleration and polyphenol metal/hormone adsorption',
    dietaryCategory: 'Caffeinated & Tannin Beverages'
  },
  'Alcohol / Beer / Wine': {
    id: 'Alcohol / Beer / Wine',
    name: 'Alcohol / Beer / Wine',
    activeConstituents: ['Ethanol (CH3CH2OH)', 'Acetaldehyde'],
    commonExamples: ['Beer', 'Red & white wine', 'Liquor / spirits', 'Cocktails'],
    metabolicTarget: 'Gastric mucosal barrier disruption, CYP2E1 induction, and hepatic lactate accumulation',
    dietaryCategory: 'Alcoholic Beverages'
  },
  'Black Licorice (Natural Glycyrrhizin)': {
    id: 'Black Licorice (Natural Glycyrrhizin)',
    name: 'Black Licorice (Natural Glycyrrhizin)',
    activeConstituents: ['Glycyrrhizin', 'Glycyrrhetinic acid'],
    commonExamples: ['Traditional black licorice candy', 'Mulethi / Licorice root teas', 'Dietary licorice extract'],
    metabolicTarget: 'Inhibition of renal 11beta-HSD2 enzyme inducing potassium wasting',
    dietaryCategory: 'Herbal Confectionery'
  },
  'Aged Cheese & Fermented Foods (High Tyramine)': {
    id: 'Aged Cheese & Fermented Foods (High Tyramine)',
    name: 'Aged Cheese & Fermented Foods (High Tyramine)',
    activeConstituents: ['Tyramine (monoamine)', 'Histamine', 'Phenylethylamine'],
    commonExamples: ['Aged Parmesan', 'Blue cheese', 'Mature Cheddar', 'Soy sauce', 'Tap beer'],
    metabolicTarget: 'Displacement of vesicular norepinephrine in sympathetic nerve endings',
    dietaryCategory: 'Tyramine-Rich Fermented Foods'
  },
  'Plain White Rice & Apples': {
    id: 'Plain White Rice & Apples',
    name: 'Plain White Rice & Apples',
    activeConstituents: ['Complex starch', 'Pectin', 'Simple dietary fiber'],
    commonExamples: ['Steamed white rice', 'Fresh apples', 'Rice porridge (Khichdi)'],
    metabolicTarget: 'Gentle gastrointestinal transit with zero enzymatic interference',
    dietaryCategory: 'Neutral Compatible Food'
  },
  'Oatmeal & Whole Wheat Toast': {
    id: 'Oatmeal & Whole Wheat Toast',
    name: 'Oatmeal & Whole Wheat Toast',
    activeConstituents: ['Beta-glucan soluble fiber', 'Complex carbohydrates'],
    commonExamples: ['Rolled oats porridge', 'Whole wheat toast', 'Plain roti / chapati'],
    metabolicTarget: 'Neutral dietary bulk supporting steady gastric transit',
    dietaryCategory: 'Neutral Grain Nutrition'
  }
};

/**
 * Complete quantitative drug-food pharmacokinetic interaction catalog.
 * Every rule carries bioavailabilityImpactPercent, chemicalEquation, and reactionMechanism.
 */
export const DRUG_FOOD_INTERACTION_RULES: DrugFoodInteractionRule[] = [
  {
    id: 'atorvastatin-grapefruit',
    drug: 'Atorvastatin',
    food: 'Grapefruit / Grapefruit Juice',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'CRITICAL DANGER',
    bioavailabilityImpactPercent: 330,
    bioavailabilityImpactSummary: 'Plasma concentration (AUC/Cmax) increased by up to +330%',
    chemicalEquation: 'C33H35FN2O5 + C21H22O4 (Bergamottin) + CYP3A4(Fe3+-Heme) -> [CYP3A4-Epoxide] (Inactive) + C33H35FN2O5(plasma ↑330%)',
    reactionMechanism: 'Irreversible mechanism-based suicide inactivation via covalent binding of reactive furanocoumarin epoxide intermediates to the heme iron apoprotein within the enterocyte CYP3A4 active site, halting presystemic hydroxylation for 24-72 hours until de novo enzyme synthesis occurs.',
    headline: 'CRITICAL DANGER: Massive Statin Accumulation (+330% Plasma Surge) & Rhabdomyolysis Risk',
    action: 'Avoid grapefruit completely while on statin therapy.',
    reason: 'Furanocoumarins irreversibly destroy intestinal CYP3A4 enzymes, surging blood statin levels by up to +330%.',
    mechanismTitle: 'Intestinal CYP3A4 Irreversible Mechanism-Based Inhibition',
    mechanismExplanation: 'Grapefruit furanocoumarins irreversibly destroy intestinal CYP3A4 enzymes, increasing plasma concentrations of Atorvastatin by up to 330% and triggering acute muscle breakdown and kidney injury.',
    mechanismClass: 'CYP3A4 Suicide Inhibition & First-Pass Blockade',
    affectedPathway: 'Intestinal Enterocyte & Hepatic CYP3A4 Clearance',
    chemicalSummary: 'Bergamottin and 6\',7\'-dihydroxybergamottin irreversibly alkylate the heme catalytic pocket of intestinal CYP3A4, abolishing first-pass extraction and elevating systemic Atorvastatin bioavailability by up to +330%.',
    primaryActiveAgents: ['Bergamottin (C21H22O4)', '6\',7\'-dihydroxybergamottin', 'Intestinal CYP3A4'],
    molecularEvent: 'Suicide inactivation of enterocyte Cytochrome P450 3A4 by furanocoumarin epoxide intermediates.',
    targetEnzymesOrReceptors: 'Intestinal CYP3A4 and hepatic OATP1B1 uptake transporters',
    clinicalConsequences: [
      'Acute rhabdomyolysis (extensive skeletal muscle breakdown with severe pain)',
      'Myoglobinuria and potential acute kidney injury',
      'Elevated hepatic transaminases (ALT/AST) and hepatotoxicity'
    ],
    onsetTime: 'Within 4 hours of ingestion; enzyme impairment persists for 24 to 72 hours',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Avoid grapefruit entirely; CYP3A4 inactivation lasts up to 72 hours.',
      shortLabel: 'Strictly Prohibited',
      bufferHours: '72+ Hours (Permanent Suicide Block)',
      recommendation: 'Do not consume grapefruit, pomelo, or Seville oranges while taking Atorvastatin.'
    },
    saferFoods: [
      {
        name: 'Sweet Navel or Valencia Oranges',
        category: 'Citrus Alternative',
        rationale: 'Lack furanocoumarins; zero CYP3A4 enzyme inhibition (0% plasma surge).',
        icon: '🍊',
        nutritionNote: 'High Vitamin C & citrus pectin'
      },
      {
        name: 'Crisp Apples & Pears',
        category: 'Fruits',
        rationale: 'Soluble pectin fiber supports LDL reduction with zero cytochrome interference.',
        icon: '🍎',
        nutritionNote: 'Heart-healthy soluble fiber'
      }
    ],
    clinicalAlternatives: [
      'Discuss non-CYP3A4 statins (Rosuvastatin or Pravastatin) with your physician if you regularly consume citrus.',
      'Eliminate grapefruit and Seville oranges completely during Atorvastatin therapy.'
    ],
    dosageAndTimingRules: 'Spacing hours apart does NOT protect against this interaction because intestinal CYP3A4 enzymes are permanently destroyed and require 24-72 hours to regenerate.',
    emergencySymptoms: ['Severe unexplained muscle pain or weakness', 'Dark tea- or cola-colored urine', 'Extreme fatigue'],
    symptomWatch: 'Severe unexplained muscle pain, tenderness, or weakness (especially thighs and shoulders), or dark tea-colored urine.',
    firstAidSteps: [
      '1. Stop consuming the citrus food immediately.',
      '2. Drink ample plain room-temperature water to support kidney filtration.',
      '3. Monitor closely for muscle tenderness, weakness, or dark urine.',
      '4. Contact your physician or pharmacist to evaluate your statin dosing.'
    ],
    activeSaltChecked: 'Atorvastatin Calcium IP 10mg / 20mg',
    biochemicalTarget: 'Intestinal Cytochrome P450 3A4 (CYP3A4) Enzyme Pathway',
    standardReference: 'National Formulary of India (NFI) & Clinical Pharmacology CYP3A4 Monographs'
  },
  {
    id: 'antibiotic-milk',
    drug: 'Tetracycline / Ciprofloxacin',
    food: 'Milk / Dairy Products',
    isCritical: true,
    status: 'MODERATE',
    category: 'Space Out',
    severity: 'SEVERE INTERACTION',
    bioavailabilityImpactPercent: -85,
    bioavailabilityImpactSummary: 'Absorption reduced by 50% to 85% (bioavailability drop: -85%)',
    chemicalEquation: 'Ca2+ + C22H24N2O8 (Tetracycline) -> [Ca(C22H24N2O8)]↓ (Insoluble Chelate); Ca2+ + 2 C17H18FN3O3 -> [Ca(Cipro)2]↓',
    reactionMechanism: 'Rapid coordinate-covalent chelation of divalent cations (Ca2+, Mg2+) to the 4-keto and 3-carboxyl/beta-diketone oxygen donor atoms of the antibiotic ring, forming hydrophilic, high-molecular-weight insoluble precipitates that cannot cross enterocyte lipid bilayers.',
    headline: 'SEVERE INTERACTION: Calcium Chelation (-50% to -85% Absorption Drop)',
    action: 'Take antibiotic 2 hours before or 4 hours after consuming dairy.',
    reason: 'Calcium ions chelate antibiotic molecules into insoluble complexes, slashing absorption by 50% to 85%.',
    mechanismTitle: 'Multivalent Metal Cation Insoluble Chelate Formation',
    mechanismExplanation: 'Calcium in dairy binds directly to the antibiotic molecule (chelation), creating an insoluble precipitate. Your gut cannot absorb the medicine, reducing bioavailability by 50% to 85% and risking infection failure.',
    mechanismClass: 'Multivalent Cation Chelation Complexation',
    affectedPathway: 'Gastrointestinal Enterocyte Passive Diffusion Barrier',
    chemicalSummary: 'Divalent Ca2+ and Mg2+ cations form stable coordinate chelates with phenolic and beta-diketone oxygens on Tetracycline/Ciprofloxacin, precipitating unabsorbable aggregates and dropping oral bioavailability by 50% to 85%.',
    primaryActiveAgents: ['Calcium cations (Ca2+)', 'Magnesium cations (Mg2+)', 'Beta-diketone / 4-keto-3-carboxyl ligand'],
    molecularEvent: 'Coordinate chelation complex precipitation in the proximal gastrointestinal lumen.',
    targetEnzymesOrReceptors: 'Gastrointestinal Enterocyte Mucosal Absorption Barrier / Bacterial DNA Gyrase',
    clinicalConsequences: [
      'Sub-therapeutic plasma levels falling below Minimum Inhibitory Concentration (MIC)',
      'Treatment failure and persistence or worsening of bacterial infection',
      'Selection of antibiotic-resistant bacterial strains'
    ],
    onsetTime: 'Immediate (within 15-45 minutes in the gastric lumen)',
    timingBuffer: {
      type: 'BUFFER_WINDOW',
      badgeText: '🕒 Buffer Window: Take antibiotic 2 hours before or 4 hours after dairy.',
      shortLabel: '2h Before / 4h After',
      bufferHours: '2h prior or 4h post'
    },
    saferFoods: [
      {
        name: 'Plain White Rice & Apples',
        category: 'Daily Diet',
        rationale: 'Zero divalent calcium chelation; preserves 100% antibiotic bioavailability.',
        icon: '🍚',
        nutritionNote: 'Zero mineral chelation'
      },
      {
        name: 'Pure Water & Unfortified Plant Milk',
        category: 'Hydration',
        rationale: 'Optimizes tablet dissolution without trapping antibiotic molecules.',
        icon: '💧',
        nutritionNote: '100% clean transit'
      }
    ],
    clinicalAlternatives: [
      'Take antibiotic with a full 250mL glass of plain water.',
      'Space milk, dahi (curd), paneer, and calcium tablets at least 2 hours before or 4 hours after dosing.'
    ],
    dosageAndTimingRules: 'Separate dairy consumption (milk, yogurt, paneer, cheese) from antibiotic intake by 2 hours before or 4 hours after.',
    emergencySymptoms: ['Persistent or worsening infection fever after 48 hours', 'Spreading rash or chills'],
    symptomWatch: 'Persistent fever, worsening infection symptoms after 48 hours, or esophageal irritation.',
    firstAidSteps: [
      '1. Drink a full glass of plain water.',
      '2. Do not double your next dose; schedule future doses 2h before or 4h after dairy.',
      '3. Consult your doctor if infection symptoms fail to improve.'
    ],
    activeSaltChecked: 'Ciprofloxacin Hydrochloride IP / Tetracycline HCl IP',
    biochemicalTarget: 'Intestinal Enterocyte Passive Diffusion & Bacterial DNA Gyrase',
    standardReference: 'Indian Pharmacopoeia (IP) & National Formulary of India (NFI)'
  },
  {
    id: 'warfarin-vitamink',
    drug: 'Warfarin',
    food: 'Spinach, Kale & Broccoli (Vitamin K Rich)',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'SEVERE INTERACTION',
    bioavailabilityImpactPercent: -65,
    bioavailabilityImpactSummary: 'Anticoagulant pharmacodynamic efficacy reduced by 45% to 65% (INR drop)',
    chemicalEquation: 'C19H16O4 (Warfarin -| VKORC1) + C31H46O2 (Vitamin K1, Excess) --(DT-Diaphorase Bypass)--> KH2 -> γ-Carboxylated Factors II, VII, IX, X',
    reactionMechanism: 'Competitive pharmacodynamic bypass: excess exogenous dietary phylloquinone (Vitamin K1) is reduced directly to active Vitamin K hydroquinone (KH2) via Warfarin-insensitive NAD(P)H quinone oxidoreductase (DT-diaphorase), overriding hepatic VKORC1 blockade and restoring clotting factor synthesis.',
    headline: 'SEVERE INTERACTION: Anticoagulation Reversal (-45% to -65% Efficacy Drop) & Clot Risk',
    action: 'Keep Vitamin K dietary intake strictly consistent. Do not suddenly binge on leafy greens.',
    reason: 'Excess Vitamin K1 bypasses VKORC1 inhibition, reducing Warfarin anticoagulant efficacy by 45% to 65% and dropping INR.',
    mechanismTitle: 'Competitive Pharmacodynamic Bypass of VKORC1 Inhibition',
    mechanismExplanation: 'Warfarin inhibits VKORC1 to prevent Vitamin K recycling. Sudden high intakes of spinach or kale supply fresh Vitamin K1 that bypasses this block via hepatic quinone reductases, cutting anticoagulant effect by up to 65% and raising stroke/clot risk.',
    mechanismClass: 'Competitive Antagonism & VKORC1 Enzymatic Bypass',
    affectedPathway: 'Hepatic Vitamin K-Dependent Clotting Factor Synthesis (II, VII, IX, X)',
    chemicalSummary: 'Dietary phylloquinone (C31H46O2) overrides Warfarin inhibition of VKORC1 via alternative reductase pathways, driving a 45%-65% loss in anticoagulant potency and a sub-therapeutic INR drop.',
    primaryActiveAgents: ['Phylloquinone / Vitamin K1 (C31H46O2)', 'VKORC1 Enzyme Complex', 'Clotting Factors II, VII, IX, X'],
    molecularEvent: 'Direct reduction of dietary Vitamin K1 to KH2 restores gamma-carboxylation of prothrombin despite Warfarin.',
    targetEnzymesOrReceptors: 'Vitamin K Epoxide Reductase Complex Subunit 1 (VKORC1)',
    clinicalConsequences: [
      'Sub-therapeutic INR (<2.0) within 24-48 hours',
      'Elevated risk of Deep Vein Thrombosis (DVT) and Pulmonary Embolism (PE)',
      'Cardioembolic stroke or mechanical heart valve thrombosis'
    ],
    onsetTime: 'INR drop develops within 24 to 72 hours of high Vitamin K intake',
    timingBuffer: {
      type: 'ONGOING_PRECAUTION',
      badgeText: '⚠️ Strict Dietary Consistency: Maintain identical weekly greens intake; avoid large spikes.',
      shortLabel: 'Maintain Consistency',
      bufferHours: 'Ongoing Daily Consistency'
    },
    saferFoods: [
      {
        name: 'Cucumbers, Carrots & Bell Peppers',
        category: 'Low-Vitamin K Produce',
        rationale: 'Negligible Vitamin K1 content; maintains stable INR values.',
        icon: '🥒',
        nutritionNote: 'Zero clotting interference'
      },
      {
        name: 'Apples & Steamed Rice',
        category: 'Daily Diet',
        rationale: 'Predictable nutrition with 0% antagonism of Warfarin.',
        icon: '🍎',
        nutritionNote: 'INR-neutral staples'
      }
    ],
    clinicalAlternatives: [
      'Keep weekly portions of palak/spinach/broccoli strictly uniform rather than bingeing.',
      'Consult your physician about Direct Oral Anticoagulants (DOACs like Apixaban) which are unaffected by Vitamin K.'
    ],
    dosageAndTimingRules: 'Never alter your Warfarin dose yourself. Keep green leafy vegetable portions consistent week-to-week and check PT/INR regularly.',
    emergencySymptoms: ['Calf swelling, warmth, or redness', 'Sudden shortness of breath or chest pain', 'Facial drooping or slurred speech'],
    symptomWatch: 'Sudden unilateral calf pain/swelling, acute shortness of breath, or neurological stroke warning signs.',
    firstAidSteps: [
      '1. Do not change your Warfarin tablet dose on your own.',
      '2. Record the approximate quantity of leafy greens consumed.',
      '3. Contact your anticoagulation clinic for a follow-up PT/INR check.'
    ],
    activeSaltChecked: 'Warfarin Sodium IP',
    biochemicalTarget: 'VKORC1 Enzyme Complex & Hepatic Clotting Factors',
    standardReference: 'Indian Pharmacopoeia (IP) & WHO Anticoagulation Safety Standards'
  },
  {
    id: 'ace-arb-potassium',
    drug: 'Lisinopril / Losartan',
    food: 'Bananas & Salt Substitutes (High Potassium)',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'HIGH DANGER',
    bioavailabilityImpactPercent: 45,
    bioavailabilityImpactSummary: 'Serum potassium retention elevated by +25% to +45% (Hyperkalemia >5.5 mEq/L)',
    chemicalEquation: 'ACE/AT1-R Blockade -> ↓Angiotensin II -> ↓Aldosterone -> ↓Renal ROMK/ENaC K+ Secretion + Exogenous KCl -> [K+]serum ↑25-45%',
    reactionMechanism: 'RAAS blockade suppresses adrenal zona glomerulosa aldosterone release, downregulating principal cell Na+/K+-ATPase and ROMK channels in the renal cortical collecting duct; combined with exogenous KCl load, extracellular K+ surges and depolarizes myocardial resting membrane potential.',
    headline: 'HIGH DANGER: Hyperkalemia (+25% to +45% Serum K+ Surge) & Cardiac Arrhythmia Alert',
    action: 'Avoid potassium chloride (KCl) salt substitutes and excessive bananas while on ACE/ARB blood pressure drugs.',
    reason: 'Aldosterone suppression blocks renal K+ excretion, elevating serum potassium by +25% to +45% into arrhythmogenic ranges.',
    mechanismTitle: 'Renal Aldosterone-Mediated Potassium Excretion Blockade',
    mechanismExplanation: 'ACE inhibitors and ARBs lower aldosterone, causing the kidneys to retain potassium. Adding potassium salt substitutes or large banana servings spikes serum potassium by up to 45%, risking dangerous cardiac arrhythmias.',
    mechanismClass: 'RAAS-Induced Renal Potassium Retention',
    affectedPathway: 'Renal Distal Tubule & Cortical Collecting Duct Na+/K+ Exchange',
    chemicalSummary: 'Reduced aldosterone signaling impairs distal nephron K+ excretion; co-ingestion of KCl salt substitutes elevates serum K+ above 5.5 mEq/L, narrowing the cardiac action potential threshold.',
    primaryActiveAgents: ['Potassium ions (K+)', 'Potassium Chloride (KCl)', 'Aldosterone / ROMK Channels'],
    molecularEvent: 'Downregulation of renal tubular potassium secretion paired with high exogenous K+ intake.',
    targetEnzymesOrReceptors: 'Renal Distal Tubule Aldosterone-Sensitive ENaC & ROMK Channels',
    clinicalConsequences: [
      'Hyperkalemia ([K+] > 5.5 mEq/L) causing peaked T-waves and QRS widening',
      'Bradycardia, ventricular fibrillation, and potential cardiac arrest',
      'Neuromuscular paresthesia (tingling) and ascending muscle weakness'
    ],
    onsetTime: 'Gradual to acute over hours to days of repeated high potassium intake',
    timingBuffer: {
      type: 'ONGOING_PRECAUTION',
      badgeText: '⚠️ Ongoing Precaution: Avoid KCl salt substitutes and high-potassium binges.',
      shortLabel: 'Dietary Precaution',
      bufferHours: 'Daily Precaution'
    },
    saferFoods: [
      {
        name: 'Crisp Apples & Berries',
        category: 'Low-Potassium Fruits',
        rationale: 'Naturally low in potassium and cardioprotective for hypertension diets.',
        icon: '🍎',
        nutritionNote: 'Minimal renal K+ load'
      },
      {
        name: 'Garlic, Lemon & Fresh Herbs',
        category: 'Seasoning',
        rationale: 'Flavorful salt-free alternatives without potassium chloride (KCl).',
        icon: '🌿',
        nutritionNote: '0% chemical potassium chloride'
      }
    ],
    clinicalAlternatives: [
      'Avoid "Low-Sodium" or "Diet" salts containing Potassium Chloride (KCl).',
      'Monitor serum potassium (K+) and creatinine periodically with your physician.'
    ],
    dosageAndTimingRules: 'Strictly avoid KCl salt substitutes and potassium supplements. Keep high-potassium fruits moderate and evenly spaced.',
    emergencySymptoms: ['Irregular or unusually slow heartbeat', 'Tingling or numbness in lips/fingers', 'Sudden heavy leg weakness'],
    symptomWatch: 'Fluttering or slow pulse, lip/finger tingling, or sudden heavy weakness in arms and legs.',
    firstAidSteps: [
      '1. Stop consuming potassium salt substitutes or high-K+ foods immediately.',
      '2. Sit calmly and check your pulse rate and rhythm.',
      '3. Seek urgent medical evaluation (ECG & serum K+ test) if experiencing palpitations or weakness.'
    ],
    activeSaltChecked: 'Telmisartan / Losartan Potassium / Lisinopril IP',
    biochemicalTarget: 'Renin-Angiotensin-Aldosterone System (RAAS) & Distal Tubule K+ Channels',
    standardReference: 'National Formulary of India (NFI) & British Pharmacopoeia (BP)'
  },
  {
    id: 'levothyroxine-coffee',
    drug: 'Levothyroxine',
    food: 'Coffee / Black Tea',
    isCritical: true,
    status: 'PRECAUTION',
    category: 'Space Out',
    severity: 'MODERATE INTERACTION',
    bioavailabilityImpactPercent: -55,
    bioavailabilityImpactSummary: 'Absorption reduced by 30% to 55% (T4 bioavailability drop: -55%)',
    chemicalEquation: 'C15H11I4NO4 (Levothyroxine T4) + C16H18O9 (Chlorogenic Acid / Tannins) -> [T4·Polyphenol] (Adsorbed Complex, Unabsorbed)',
    reactionMechanism: 'Non-covalent surface adsorption and hydrogen-bonding sequestration of lipophilic Levothyroxine sodium by coffee chlorogenic acids and tea tannins in the acidic gastric lumen, compounded by caffeine-stimulated jejunal peristalsis that shortens mucosal residence time.',
    headline: 'MODERATE INTERACTION: Slashed Thyroid Hormone Absorption (-30% to -55%)',
    action: 'Take thyroid medicine on an empty stomach and wait at least 60 minutes before morning coffee or tea.',
    reason: 'Coffee chlorogenic acids and tea tannins sequester Levothyroxine, cutting absorption by 30% to 55%.',
    mechanismTitle: 'Polyphenol Surface Adsorption & Caffeine-Accelerated Transit of T4',
    mechanismExplanation: 'Coffee and black tea physically bind thyroid hormone molecules in the stomach and speed up intestinal transit, reducing Levothyroxine absorption by 30% to 55%. Always wait 60 minutes after taking your pill.',
    mechanismClass: 'Intestinal Surface Adsorption & Motility Surge',
    affectedPathway: 'Jejunal & Ileal Mucosal Passive Diffusion Barrier',
    chemicalSummary: 'Chlorogenic acid and tea polyphenols adsorb Levothyroxine sodium (C15H11I4NO4) in the upper GI tract while caffeine accelerates gastric emptying, dropping T4 absorption by 30% to 55%.',
    primaryActiveAgents: ['Chlorogenic acid (C16H18O9)', 'Tea Tannins', 'Caffeine', 'Levothyroxine (C15H11I4NO4)'],
    molecularEvent: 'Physical sequestration of Levothyroxine onto soluble coffee/tea polyphenols in the gastric lumen.',
    targetEnzymesOrReceptors: 'Jejunal and Ileal Mucosal Enterocytes / OATP2B1',
    clinicalConsequences: [
      'Uncontrolled hypothyroid symptoms (fatigue, brain fog, cold intolerance, weight gain)',
      'Erratic and persistently elevated TSH lab values despite daily adherence'
    ],
    onsetTime: 'Immediate with each closely spaced morning coffee or chai intake',
    timingBuffer: {
      type: 'BUFFER_WINDOW',
      badgeText: '🕒 Buffer Window: Wait at least 60 minutes after thyroid dose before coffee or tea.',
      shortLabel: 'Wait 60 Minutes',
      bufferHours: '60 minutes minimum'
    },
    saferFoods: [
      {
        name: 'Plain Filtered Water (Empty Stomach)',
        category: 'Hydration',
        rationale: 'Preserves full 100% tablet dissolution and jejunal T4 absorption.',
        icon: '💧',
        nutritionNote: 'Optimal T4 dissolution'
      },
      {
        name: 'Coffee / Chai (Timed 60 Mins Later)',
        category: 'Timed Beverage',
        rationale: 'Allows complete proximal small-intestine absorption before caffeine arrives.',
        icon: '☕',
        nutritionNote: 'Zero T4 loss after 60m gap'
      }
    ],
    clinicalAlternatives: [
      'Take Thyronorm/Levothyroxine at bedtime (3+ hours after dinner) if early-morning chai/coffee cannot wait.',
      'Maintain a strict 60-minute gap every morning before breakfast or tea.'
    ],
    dosageAndTimingRules: 'Take Levothyroxine immediately upon waking with plain water. Wait at least 60 minutes before coffee, tea, milk, or breakfast.',
    emergencySymptoms: ['Severe persistent lethargy', 'Unexplained weight gain and elevated TSH labs'],
    symptomWatch: 'Persistent daytime exhaustion, brain fog, feeling constantly cold, or rising TSH on blood tests.',
    firstAidSteps: [
      '1. Do not take an extra thyroid pill today.',
      '2. Resume a strict 60-minute water-only gap starting tomorrow morning.',
      '3. Inform your endocrinologist if recent TSH levels are fluctuating.'
    ],
    activeSaltChecked: 'Levothyroxine Sodium IP',
    biochemicalTarget: 'Jejunal Enterocyte Absorption & Polyphenol Adsorption',
    standardReference: 'Indian Pharmacopoeia (IP) & Endocrine Society Clinical Guidelines'
  },
  {
    id: 'metformin-alcohol',
    drug: 'Metformin',
    food: 'Alcohol / Beer / Wine',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'CRITICAL DANGER',
    bioavailabilityImpactPercent: 240,
    bioavailabilityImpactSummary: 'Systemic lactate accumulation elevated by +150% to +240% (Lactic Acidosis Risk)',
    chemicalEquation: 'CH3CH2OH + NAD+ -> CH3CHO + NADH; Pyruvate + NADH -> Lactate(↑240%) + [C4H11N5 -| Mitochondrial Complex I] -> Metabolic Acidosis',
    reactionMechanism: 'Ethanol oxidation via hepatic alcohol dehydrogenase drives an excessive NADH/NAD+ redox shift that converts pyruvate to lactate and blocks hepatic gluconeogenesis, synergizing with Metformin inhibition of mitochondrial respiratory Complex I to spike plasma lactate by up to +240%.',
    headline: 'CRITICAL DANGER: Lactic Acidosis Risk (+150% to +240% Lactate Surge)',
    action: 'Avoid alcohol completely while taking Metformin.',
    reason: 'Alcohol blocks hepatic lactate clearance while Metformin inhibits mitochondrial Complex I, spiking lactate by up to +240%.',
    mechanismTitle: 'Dual Hepatic Gluconeogenesis & Mitochondrial Complex I Blockade',
    mechanismExplanation: 'Ethanol metabolism floods liver cells with NADH, halting lactic acid clearance while Metformin inhibits mitochondrial Complex I. Together they can spike blood lactate by up to 240%, triggering life-threatening lactic acidosis.',
    mechanismClass: 'Dual Mitochondrial Lactate Clearance Blockade',
    affectedPathway: 'Hepatic Gluconeogenesis & Mitochondrial Respiratory Complex I',
    chemicalSummary: 'Excess hepatic NADH from ethanol oxidation combines with Metformin-mediated Complex I inhibition, paralyzing Cori cycle lactate clearance and precipitating acute lactic acidosis.',
    primaryActiveAgents: ['Ethanol (CH3CH2OH)', 'NADH/NAD+ Redox Shift', 'Metformin (C4H11N5)', 'Mitochondrial Complex I'],
    molecularEvent: 'Synergistic suppression of hepatic lactate uptake and gluconeogenesis.',
    targetEnzymesOrReceptors: 'Mitochondrial Complex I & Hepatic Lactate Dehydrogenase Equilibrium',
    clinicalConsequences: [
      'Metformin-Associated Lactic Acidosis (MALA): blood pH < 7.35, lactate > 5 mmol/L',
      'Profound hypothermia, Kussmaul hyperventilation, and hemodynamic collapse',
      'Masked severe hypoglycemia'
    ],
    onsetTime: 'Within hours of heavy drinking or alcohol intake on an empty stomach',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Avoid alcohol and binge drinking while on Metformin.',
      shortLabel: 'Strict Avoidance',
      bufferHours: 'Zero alcohol during therapy'
    },
    saferFoods: [
      {
        name: 'Sparkling Lemon Mint Water',
        category: 'Beverages',
        rationale: 'Hydrates kidneys to support safe Metformin clearance with 0% hepatic lactate stress.',
        icon: '🍹',
        nutritionNote: 'Zero ethanol redox disruption'
      },
      {
        name: 'Complex Whole Grains',
        category: 'Meals',
        rationale: 'Stabilizes post-meal glucose alongside Metformin.',
        icon: '🥣',
        nutritionNote: 'Balanced glycemic support'
      }
    ],
    clinicalAlternatives: [
      'Avoid binge drinking completely and never consume alcohol on an empty stomach.',
      'Stay well hydrated with plain water to support renal Metformin excretion.'
    ],
    dosageAndTimingRules: 'Take Metformin with lunch or dinner and avoid alcoholic beverages.',
    emergencySymptoms: ['Rapid shallow panting (Kussmaul breathing)', 'Extreme coldness or muscle cramps', 'Severe dizziness or confusion'],
    symptomWatch: 'Rapid deep breathing, severe stomach cramping, unusual coldness, or extreme confusion.',
    firstAidSteps: [
      '1. Stop alcohol consumption immediately and drink plain water.',
      '2. Eat a light carbohydrate snack if blood sugar feels low.',
      '3. Call 112 / 108 immediately if rapid breathing, cold skin, or confusion develops.'
    ],
    activeSaltChecked: 'Metformin Hydrochloride IP 500mg / 850mg',
    biochemicalTarget: 'Hepatic Mitochondrial Complex I & Lactate Clearance Pathway',
    standardReference: 'Indian Pharmacopoeia (IP) & CDSCO Oral Antidiabetic Monographs'
  },
  {
    id: 'digoxin-licorice',
    drug: 'Digoxin',
    food: 'Black Licorice (Natural Glycyrrhizin)',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'CRITICAL DANGER',
    bioavailabilityImpactPercent: 120,
    bioavailabilityImpactSummary: 'Myocardial Digoxin receptor binding & toxicity sensitivity elevated by +80% to +120%',
    chemicalEquation: 'Glycyrrhizin (C42H62O16) -| 11β-HSD2 -> Cortisol·MR -> ↑Renal K+ Wasting -> ↓[K+]serum -> ↑Digoxin(C41H64O14)·Na+/K+-ATPase Binding (+120%)',
    reactionMechanism: 'Glycyrrhetinic acid inhibits renal 11beta-hydroxysteroid dehydrogenase type 2 (11beta-HSD2), causing cortisol-driven pseudohyperaldosteronism and hypokalemia. Because K+ competes with Digoxin at the myocardial Na+/K+-ATPase alpha-subunit, low K+ surges Digoxin binding affinity by up to +120%.',
    headline: 'CRITICAL DANGER: Hypokalemia-Induced Digoxin Toxicity (+120% Binding Surge)',
    action: 'Avoid real black licorice (Mulethi) and glycyrrhizin herbal extracts completely.',
    reason: 'Glycyrrhizin depletes potassium, surging Digoxin binding to heart cells by +80% to +120% and risking fatal arrhythmias.',
    mechanismTitle: 'Renal 11β-HSD2 Inhibition & Hypokalemic Digoxin Sensitization',
    mechanismExplanation: 'Natural licorice contains glycyrrhizin, which wastes body potassium through the kidneys. Because potassium protects the heart from excess Digoxin binding, low potassium amplifies Digoxin toxicity by up to 120%, risking fatal arrhythmias.',
    mechanismClass: '11β-HSD2 Inhibition & Myocardial Receptor Hypersensitization',
    affectedPathway: 'Renal Mineralocorticoid Receptors & Myocardial Na+/K+-ATPase',
    chemicalSummary: 'Glycyrrhizin-induced hypokalemia removes competitive extracellular K+ protection from myocardial Na+/K+-ATPase, amplifying Digoxin binding affinity by +80% to +120%.',
    primaryActiveAgents: ['Glycyrrhizin (C42H62O16)', '11β-HSD2 Enzyme', 'Myocardial Na+/K+-ATPase'],
    molecularEvent: 'Cortisol-mediated urinary potassium wasting enhances Digoxin occupancy of cardiac Na+/K+-ATPase.',
    targetEnzymesOrReceptors: '11β-HSD2 Enzyme & Myocardial Sarcolemmal Na+/K+-ATPase Pump',
    clinicalConsequences: [
      'Fatal ventricular arrhythmias, PVCs, and complete heart block',
      'Digoxin toxicity even at normal therapeutic serum concentrations',
      'Xanthopsia (yellow-green visual halos), severe nausea, and confusion'
    ],
    onsetTime: 'Develops within days of regular black licorice or mulethi tea intake',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Strictly avoid natural black licorice & mulethi extracts.',
      shortLabel: 'Strict Avoidance',
      bufferHours: 'Complete avoidance'
    },
    saferFoods: [
      {
        name: 'Deglycyrrhizinated Licorice (DGL)',
        category: 'Safe Herbal Alternative',
        rationale: 'Glycyrrhizin removed; zero renal potassium wasting.',
        icon: '🌿',
        nutritionNote: '0% 11β-HSD2 inhibition'
      },
      {
        name: 'Fresh Apples & Pears',
        category: 'Fruits',
        rationale: 'Heart-rhythm neutral nutrition.',
        icon: '🍎',
        nutritionNote: 'Safe cardiac profile'
      }
    ],
    clinicalAlternatives: [
      'Avoid all real black licorice candies, mulethi throat lozenges, and herbal teas containing glycyrrhizin.',
      'Monitor serum potassium and digoxin levels regularly.'
    ],
    dosageAndTimingRules: 'Never combine natural black licorice or glycyrrhizin-containing herbal remedies with Digoxin.',
    emergencySymptoms: ['Skipped heartbeats or palpitations', 'Yellow-green halos around lights', 'Sudden nausea or confusion'],
    symptomWatch: 'Palpitations, unusually slow pulse, yellow-green visual halos, or sudden nausea/vomiting.',
    firstAidSteps: [
      '1. Stop all licorice/mulethi products immediately.',
      '2. Check your pulse for irregular or slow beats (<60 bpm).',
      '3. Contact your cardiologist or emergency services urgently if visual halos or palpitations occur.'
    ],
    activeSaltChecked: 'Digoxin IP 0.25mg',
    biochemicalTarget: 'Myocardial Na+/K+-ATPase Pump & Renal 11β-HSD2',
    standardReference: 'Indian Pharmacopoeia (IP) & British Pharmacopoeia (BP)'
  },
  {
    id: 'nsaid-alcohol',
    drug: 'Ibuprofen / NSAIDs',
    food: 'Alcohol / Beer / Wine',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'SEVERE INTERACTION',
    bioavailabilityImpactPercent: 280,
    bioavailabilityImpactSummary: 'Upper GI mucosal hemorrhage & ulceration risk elevated by +200% to +280%',
    chemicalEquation: 'C13H18O2 (-| COX-1 -> ↓PGE2/PGI2 Mucus) + CH3CH2OH (Phospholipid Lysis) + HCl(gastric) -> Sub-Epithelial Capillary Erosion (+280% Bleed Risk)',
    reactionMechanism: 'Synergistic dual mucosal insult: NSAIDs inhibit constitutive gastric COX-1, halting cytoprotective prostaglandin E2/I2 bicarbonate and mucus secretion, while ethanol directly solubilizes the hydrophobic mucosal phospholipid barrier, multiplying upper GI hemorrhage risk by +200% to +280%.',
    headline: 'SEVERE INTERACTION: Stomach Bleeding & Ulcer Risk Surge (+200% to +280%)',
    action: 'Do not combine alcohol with NSAID pain relievers. Always take NSAIDs after food.',
    reason: 'Dual COX-1 prostaglandin blockade and ethanol mucosal lysis multiply stomach bleeding risk by +200% to +280%.',
    mechanismTitle: 'Dual Gastric Mucosal Barrier Disruption & COX-1 Prostaglandin Inhibition',
    mechanismExplanation: 'NSAIDs shut down protective gastric prostaglandins (COX-1) while alcohol strips away the stomach mucus barrier. Combined, they raise acute stomach ulcer and internal bleeding risk by up to 280%.',
    mechanismClass: 'Dual Mucosal Cytotoxicity & COX-1 Prostaglandin Inhibition',
    affectedPathway: 'Gastric Mucosal Epithelial Cytoprotection & Platelet Thromboxane A2',
    chemicalSummary: 'Ethanol strips gastric surface phospholipids while Ibuprofen blocks COX-1 mediated PGE2 synthesis, elevating erosive gastritis and GI bleeding incidence by +200% to +280%.',
    primaryActiveAgents: ['Ibuprofen (C13H18O2)', 'Ethanol (CH3CH2OH)', 'Cyclooxygenase-1 (COX-1)'],
    molecularEvent: 'Simultaneous loss of mucosal bicarbonate barrier and impaired platelet hemostasis.',
    targetEnzymesOrReceptors: 'Cyclooxygenase-1 (COX-1), Gastric Mucosa & Platelet Thromboxane A2',
    clinicalConsequences: [
      'Acute upper gastrointestinal hemorrhage (melena, hematemesis)',
      'Erosive gastritis and perforated peptic ulcer',
      'Compounded renal afferent arteriole vasoconstriction'
    ],
    onsetTime: 'Immediate mucosal irritation; acute bleeding possible after single co-ingestion',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Never take NSAIDs with alcohol; take with meals.',
      shortLabel: 'Avoid Alcohol with NSAIDs',
      bufferHours: 'Zero alcohol co-consumption'
    },
    saferFoods: [
      {
        name: 'Warm Oatmeal or Cold Milk',
        category: 'Gastric Buffer',
        rationale: 'Forms a gentle lipid/starch cushion over the stomach lining when taking NSAIDs.',
        icon: '🥛',
        nutritionNote: 'Physical mucosal cushion'
      },
      {
        name: 'Chamomile Herbal Tea',
        category: 'Beverages',
        rationale: 'Alcohol-free, soothing botanical beverage.',
        icon: '🍵',
        nutritionNote: 'Zero mucosal erosion'
      }
    ],
    clinicalAlternatives: [
      'Never use Ibuprofen, Diclofenac, or Aspirin for alcohol hangovers.',
      'Ask your doctor about topical pain gels for localized aches.'
    ],
    dosageAndTimingRules: 'Always take NSAID tablets immediately after a full meal with water and strictly avoid alcohol.',
    emergencySymptoms: ['Black tarry stools (melena)', 'Vomiting blood or coffee-ground material', 'Sharp burning upper abdominal pain'],
    symptomWatch: 'Sharp epigastric pain, black tarry stools, or vomiting dark coffee-ground material.',
    firstAidSteps: [
      '1. Stop both alcohol and NSAID intake immediately.',
      '2. Drink cold water or milk to buffer gastric acid.',
      '3. Seek emergency medical care immediately if black stools or blood in vomit appears.'
    ],
    activeSaltChecked: 'Ibuprofen IP / Diclofenac / Aceclofenac IP',
    biochemicalTarget: 'Cyclooxygenase-1 (COX-1) & Gastric Mucosal Prostaglandins',
    standardReference: 'Indian Pharmacopoeia (IP) & CDSCO Gastrointestinal Safety Monograph'
  },
  {
    id: 'iron-tea-coffee',
    drug: 'Iron Supplements',
    food: 'Coffee / Black Tea',
    isCritical: true,
    status: 'PRECAUTION',
    category: 'Space Out',
    severity: 'MODERATE INTERACTION',
    bioavailabilityImpactPercent: -70,
    bioavailabilityImpactSummary: 'Non-heme iron absorption reduced by 60% to 75% (average drop: -70%)',
    chemicalEquation: 'Fe2+/Fe3+ (FeSO4) + C76H52O46 (Tannic Acid / Polyphenols) -> [Fe(Tannate)n]↓ (Insoluble Polyphenol-Iron Chelate)',
    reactionMechanism: 'Galloyl and catechol phenolic hydroxyl groups in tea tannins and coffee chlorogenic acid act as multidentate ligands, coordinating Fe2+/Fe3+ into insoluble ferric-tannate precipitates that cannot bind duodenal Divalent Metal Transporter 1 (DMT1), reducing fractional absorption by 60% to 75%.',
    headline: 'MODERATE INTERACTION: Slashed Iron Absorption by Tannins (-60% to -75%)',
    action: 'Take iron supplement 2 hours before or after drinking coffee or tea.',
    reason: 'Tea tannins and coffee polyphenols chelate non-heme iron into insoluble complexes, cutting absorption by 60% to 75%.',
    mechanismTitle: 'Polyphenol & Tannin Chelate Precipitation of Non-Heme Iron',
    mechanismExplanation: 'Tannins and chlorogenic acid in tea and coffee tightly bind ferrous and ferric iron ions in the duodenum, cutting iron absorption by 60% to 75% so the supplement passes unabsorbed.',
    mechanismClass: 'Polyphenolic Metal Coordination Chelation',
    affectedPathway: 'Duodenal Divalent Metal Transporter 1 (DMT1) Uptake',
    chemicalSummary: 'Phenolic hydroxyl ligands on tea tannins precipitate Fe2+/Fe3+ as insoluble iron-tannate complexes, slashing duodenal DMT1 bioavailability by 60% to 75%.',
    primaryActiveAgents: ['Tannic Acid (C76H52O46)', 'Chlorogenic Acid', 'Ferrous Sulfate (FeSO4)'],
    molecularEvent: 'Formation of insoluble iron-tannate coordination complexes in the duodenum.',
    targetEnzymesOrReceptors: 'Duodenal Divalent Metal Transporter 1 (DMT1) & Enterocyte Ferroxidase',
    clinicalConsequences: [
      'Persistent iron-deficiency anemia despite daily iron supplementation',
      'Ongoing fatigue, pale skin, shortness of breath, and stagnant ferritin/hemoglobin labs'
    ],
    onsetTime: 'Immediate with each co-administered cup of tea, chai, or coffee',
    timingBuffer: {
      type: 'BUFFER_WINDOW',
      badgeText: '🕒 Buffer Window: Separate iron pills from tea, coffee, and milk by at least 2 hours.',
      shortLabel: 'Separate by 2 Hours',
      bufferHours: '2 hours separation'
    },
    saferFoods: [
      {
        name: 'Fresh Orange Juice / Amla (Vitamin C)',
        category: 'Iron Enhancer',
        rationale: 'Ascorbic acid reduces Fe3+ to soluble Fe2+, boosting duodenal iron uptake by +150% to +200%.',
        icon: '🍊',
        nutritionNote: 'Actively boosts iron bioavailability'
      },
      {
        name: 'Plain Water (Chai 2 Hours Later)',
        category: 'Hydration',
        rationale: 'Eliminates duodenal tannin binding completely.',
        icon: '💧',
        nutritionNote: '0% tannin chelation'
      }
    ],
    clinicalAlternatives: [
      'Pair iron tablets with lemon water, orange juice, or Vitamin C to maximize absorption.',
      'Wait at least 2 hours after taking iron before enjoying chai or coffee.'
    ],
    dosageAndTimingRules: 'Take iron with plain water or Vitamin C juice; separate from tea, coffee, and dairy by 2 full hours.',
    emergencySymptoms: ['Persistent severe dizziness on standing', 'Unchanged or dropping hemoglobin levels'],
    symptomWatch: 'Persistent exhaustion, pale inner eyelids, lightheadedness, or pounding heartbeat on exertion.',
    firstAidSteps: [
      '1. No emergency intervention needed for a single missed gap.',
      '2. Adjust your routine to keep a 2-hour buffer between iron and tea/coffee.',
      '3. Pair future iron doses with Vitamin C-rich juice or water.'
    ],
    activeSaltChecked: 'Ferrous Sulfate / Ferric Ammonium Citrate IP',
    biochemicalTarget: 'Duodenal Divalent Metal Transporter 1 (DMT1)',
    standardReference: 'Indian Pharmacopoeia (IP) & National Nutritional Anemia Guidelines'
  },
  {
    id: 'maoi-tyramine',
    drug: 'MAO Inhibitors',
    food: 'Aged Cheese & Fermented Foods (High Tyramine)',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'CRITICAL DANGER',
    bioavailabilityImpactPercent: 350,
    bioavailabilityImpactSummary: 'Systemic tyramine & synaptic norepinephrine surge elevated by +300% to +350%',
    chemicalEquation: 'C8H11NO (Tyramine) + [C8H12N2 -| MAO-A] -> NET Sympathetic Uptake -> Vesicular Norepinephrine (C8H11NO3 ↑350%) -> α1 Vasoconstriction',
    reactionMechanism: 'Irreversible inactivation of intestinal and hepatic MAO-A prevents first-pass oxidative deamination of dietary tyramine; intact tyramine enters adrenergic terminals via NET and displaces vesicular norepinephrine stores by +300% to +350%, driving acute alpha-1 arteriolar vasoconstriction.',
    headline: 'CRITICAL DANGER: Hypertensive Crisis ("Cheese Reaction", +350% Norepinephrine Surge)',
    action: 'Strictly avoid aged cheeses, cured meats, and fermented foods during MAOI therapy and 14 days after.',
    reason: 'Blocked MAO-A lets dietary tyramine trigger a +300% to +350% synaptic norepinephrine storm and hypertensive emergency.',
    mechanismTitle: 'Massive Norepinephrine Exocytosis Triggered by Unmetabolized Tyramine',
    mechanismExplanation: 'MAO inhibitors block gut MAO-A enzymes that normally destroy tyramine. Intact tyramine floods sympathetic nerve endings, surging norepinephrine release by up to 350% and spiking blood pressure to life-threatening levels (>220/120 mmHg).',
    mechanismClass: 'Indirect Sympathomimetic Displacement & Hypertensive Storm',
    affectedPathway: 'Intestinal MAO-A & Sympathetic Vesicular Norepinephrine Release',
    chemicalSummary: 'Unmetabolized tyramine (C8H11NO) bypasses inhibited gut MAO-A and displaces vesicular norepinephrine (C8H11NO3) into vascular alpha-1 synapses, causing malignant hypertension.',
    primaryActiveAgents: ['Tyramine (C8H11NO)', 'MAO-A Enzyme', 'Norepinephrine (C8H11NO3)'],
    molecularEvent: 'Intact tyramine absorption drives NET uptake and explosive vesicular norepinephrine exocytosis.',
    targetEnzymesOrReceptors: 'Intestinal/Hepatic Monoamine Oxidase-A (MAO-A) & Vascular α1 Adrenergic Receptors',
    clinicalConsequences: [
      'Malignant hypertensive crisis (BP > 220/120 mmHg)',
      'Intracranial hemorrhage, hemorrhagic stroke, or myocardial infarction',
      'Explosive occipital headache, hyperthermia, and pulmonary edema'
    ],
    onsetTime: 'Ultra-rapid: 20 minutes to 2 hours after meal ingestion',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Strict zero-tyramine diet during therapy + 14 days post-treatment.',
      shortLabel: 'Strict Tyramine Avoidance',
      bufferHours: 'During therapy + 14 days post'
    },
    saferFoods: [
      {
        name: 'Fresh Paneer / Cottage Cheese',
        category: 'Safe Unaged Dairy',
        rationale: 'Fresh, unfermented dairy contains near-zero tyramine (0% pressor risk).',
        icon: '🧀',
        nutritionNote: 'Zero microbial tyramine'
      },
      {
        name: 'Freshly Cooked Meals & Eggs',
        category: 'Proteins',
        rationale: 'Freshly prepared proteins lack microbial decarboxylation of tyrosine.',
        icon: '🍳',
        nutritionNote: 'Biogenic-amine free'
      }
    ],
    clinicalAlternatives: [
      'Eliminate aged cheddar, parmesan, blue cheese, soy sauce, tap beer, and cured meats completely.',
      'Maintain low-tyramine precautions for 14 full days after stopping an irreversible MAOI.'
    ],
    dosageAndTimingRules: 'Strictly avoid all aged, fermented, pickled, or cured foods while on MAOIs and for 2 weeks afterward.',
    emergencySymptoms: ['Explosive throbbing headache at back of head', 'Neck stiffness, chest pain, racing pulse', 'Profuse sweating and dilated pupils'],
    symptomWatch: 'Explosive occipital headache, pounding heart, neck stiffness, chest pain, or extreme sweating.',
    firstAidSteps: [
      '1. Stop eating immediately and sit upright (do not lie flat, which worsens cranial pressure).',
      '2. Check blood pressure immediately if a monitor is available.',
      '3. Call 112 / 108 emergency services immediately for urgent IV vasodilator care if severe headache or high BP occurs.'
    ],
    activeSaltChecked: 'Phenelzine Sulfate / Tranylcypromine IP',
    biochemicalTarget: 'Mitochondrial Monoamine Oxidase-A (MAO-A) Enzyme',
    standardReference: 'Standard Clinical Pharmacology Reference & Indian Pharmacopoeia'
  },
  {
    id: 'paracetamol-alcohol',
    drug: 'Paracetamol / Acetaminophen',
    food: 'Alcohol / Beer / Wine',
    isCritical: true,
    status: 'CRITICAL',
    category: 'Strictly Avoid',
    severity: 'HIGH DANGER',
    bioavailabilityImpactPercent: 210,
    bioavailabilityImpactSummary: 'Toxic NAPQI hepatic metabolite formation increased by +150% to +210%',
    chemicalEquation: 'C8H9NO2 (Paracetamol) + O2 --(Ethanol-Induced CYP2E1)--> C8H7NO2 (NAPQI ↑210%) + ↓GSH -> [NAPQI-Hepatic Protein Adducts]',
    reactionMechanism: 'Ethanol stabilizes and induces hepatic Cytochrome P450 2E1 (CYP2E1), shunting a 2-to-3 fold higher fraction (+150% to +210%) of Paracetamol into the reactive electrophilic quinoneimine NAPQI while depleting hepatocyte glutathione (GSH), causing covalent mitochondrial protein arylation and centrilobular necrosis.',
    headline: 'HIGH DANGER: Toxic Liver Metabolite Surge (+150% to +210% NAPQI)',
    action: 'Avoid alcohol completely when taking Paracetamol / Acetaminophen (Dolo 650 / Crocin).',
    reason: 'Alcohol induces CYP2E1, surging toxic NAPQI formation by +150% to +210% while exhausting liver glutathione.',
    mechanismTitle: 'CYP2E1 Enzyme Induction & Hepatic Glutathione Exhaustion',
    mechanismExplanation: 'Alcohol induces hepatic CYP2E1, diverting up to 210% more Paracetamol into the toxic metabolite NAPQI while depleting protective liver glutathione, sharply raising the risk of acute centrilobular liver necrosis.',
    mechanismClass: 'CYP2E1 Induction & Glutathione Exhaustion',
    affectedPathway: 'Hepatic Cytochrome P450 2E1 Detoxification Pathway',
    chemicalSummary: 'Accelerated CYP2E1 oxidation converts C8H9NO2 into electrophilic NAPQI (C8H7NO2) faster than depleted hepatic glutathione can detoxify it, triggering acute liver injury.',
    primaryActiveAgents: ['Paracetamol (C8H9NO2)', 'Ethanol (CH3CH2OH)', 'CYP2E1 Enzyme', 'NAPQI (C8H7NO2)'],
    molecularEvent: 'Electrophilic NAPQI binds covalently to hepatic mitochondrial sulfhydryl proteins.',
    targetEnzymesOrReceptors: 'Cytochrome P450 2E1 & Hepatic Glutathione (GSH) Pool',
    clinicalConsequences: [
      'Acute centrilobular hepatic necrosis and severe ALT/AST elevation (>1000 U/L)',
      'Jaundice, coagulopathy, and risk of acute liver failure'
    ],
    onsetTime: 'Develops over 24 to 72 hours after combining alcohol with Paracetamol',
    timingBuffer: {
      type: 'COMPLETE_AVOIDANCE',
      badgeText: '🚫 Complete Avoidance: Avoid combining alcohol with Paracetamol (Dolo 650 / Crocin).',
      shortLabel: 'Strict Alcohol Avoidance',
      bufferHours: 'Avoid co-consumption'
    },
    saferFoods: [
      {
        name: 'Electrolyte Mineral Water & Clear Broth',
        category: 'Hydration',
        rationale: 'Supports fever recovery and hepatic detoxification with 0% CYP2E1 induction.',
        icon: '💧',
        nutritionNote: 'Zero hepatic enzyme stress'
      },
      {
        name: 'Steamed Rice & Watermelon',
        category: 'Gentle Meals',
        rationale: 'Easy digestion and hydration while Paracetamol works safely.',
        icon: '🍉',
        nutritionNote: 'Liver-friendly recovery nutrition'
      }
    ],
    clinicalAlternatives: [
      'Never consume alcohol when using fever or pain relievers containing Paracetamol.',
      'Keep adult Paracetamol below 2,000-3,000 mg/day and avoid completely with regular drinking.'
    ],
    dosageAndTimingRules: 'Do not exceed 650mg per dose or 3,000mg per 24h, and eliminate alcohol during treatment.',
    emergencySymptoms: ['Yellowing of eyes or skin (jaundice)', 'Upper right abdominal pain', 'Dark urine and persistent vomiting'],
    symptomWatch: 'Upper right abdominal tenderness, persistent nausea/vomiting, dark urine, or yellowing eyes.',
    firstAidSteps: [
      '1. Stop alcohol and any additional Paracetamol doses immediately.',
      '2. Drink plain water to stay hydrated.',
      '3. Seek immediate hospital care (for N-acetylcysteine antidote evaluation) if high doses were combined with alcohol.'
    ],
    activeSaltChecked: 'Paracetamol IP 500mg / 650mg',
    biochemicalTarget: 'Hepatic CYP2E1 & Glutathione Detoxification Pathway',
    standardReference: 'Indian Pharmacopoeia (IP) & National Formulary of India (NFI)'
  }
];

/**
 * Quantitative Drug-Drug Interaction Catalog for Multi-Medicine Pillbox Analysis.
 */
export const DRUG_DRUG_INTERACTION_RULES: DrugDrugInteractionRule[] = [
  {
    id: 'aspirin-nsaid',
    drugGroupA: 'Aspirin (Antiplatelet)',
    drugGroupB: 'NSAIDs (Ibuprofen / Diclofenac / Aceclofenac)',
    exampleBrandsA: ['Ecosprin 75', 'Ecosprin 150'],
    exampleBrandsB: ['Combiflam', 'Brufen', 'Voveran', 'Zerodol'],
    severity: 'CRITICAL',
    title: 'High Risk: Severe Stomach Bleeding & Cardiac Shield Block',
    bioavailabilityImpactPercent: -80,
    bioavailabilityImpactSummary: 'Aspirin antiplatelet efficacy reduced by up to -80%; GI bleed risk surged +300%',
    chemicalEquation: 'Ibuprofen (C13H18O2) + COX-1(Ser530) <=> [COX-1·Ibuprofen] (Steric Block) -| Aspirin(C9H8O4) Acetylation + ↓Gastric PGE2',
    reactionMechanism: 'Reversible NSAID binding sterically occupies the narrow hydrophobic channel leading to Ser530 of platelet COX-1, blocking irreversible Aspirin acetylation (-80% cardioprotection) while dual mucosal COX-1 suppression eliminates gastric PGE2.',
    plainExplanation: 'Taking Aspirin together with NSAID painkillers multiplies internal stomach bleeding risk and physically blocks Aspirin from protecting your heart.',
    clinicalWhy: 'Concurrent dual COX-1 inhibition abolishes gastric prostaglandins while steric competition prevents irreversible Ser530 platelet acetylation.',
    actionableFix: 'Consult your doctor to switch to Paracetamol (Dolo 650) for aches, or separate doses by at least 8 hours with meals.'
  },
  {
    id: 'ppi-thyroid',
    drugGroupA: 'Antacids / PPIs (Pantoprazole / Omeprazole)',
    drugGroupB: 'Levothyroxine (Thyroid Hormone)',
    exampleBrandsA: ['Pan 40', 'Pan-D', 'Pantocid', 'Omez', 'Gelusil', 'Digene'],
    exampleBrandsB: ['Thyronorm', 'Eltroxin', 'Thyrox'],
    severity: 'CRITICAL',
    title: 'Absorption Failure: Thyroid Medicine Neutralized',
    bioavailabilityImpactPercent: -50,
    bioavailabilityImpactSummary: 'Levothyroxine oral absorption reduced by 35% to 50% (bioavailability drop: -50%)',
    chemicalEquation: 'PPI -| H+/K+-ATPase -> Gastric pH ↑(1.5 -> 5.0) -> C15H11I4NO4(solid) Dissolution ↓50% + Al3+/Mg2+ Chelation',
    reactionMechanism: 'Proton pump inhibition raises intragastric pH from ~1.5 to >4.5, sharply decreasing ionization-dependent dissolution of Levothyroxine sodium tablets and reducing proximal small-intestine absorption by 35% to 50%.',
    plainExplanation: 'Acidity pills neutralize the stomach acid needed to dissolve your thyroid tablet, cutting thyroid absorption by up to 50%.',
    clinicalWhy: 'Elevated intragastric pH severely impedes tablet dissolution and proximal enterocyte transport of Levothyroxine sodium.',
    actionableFix: 'Take Thyroid pill immediately upon waking at 7:00 AM with water; delay Pan-D/Antacids by 4 to 5 hours.'
  },
  {
    id: 'calcium-thyroid',
    drugGroupA: 'Calcium Supplements',
    drugGroupB: 'Levothyroxine (Thyroid Hormone)',
    exampleBrandsA: ['Shelcal 500', 'Shelcal HD', 'Gemcal'],
    exampleBrandsB: ['Thyronorm', 'Eltroxin', 'Thyrox'],
    severity: 'CRITICAL',
    title: 'Chemical Binding: Calcium Blocks Thyroid Absorption',
    bioavailabilityImpactPercent: -45,
    bioavailabilityImpactSummary: 'Levothyroxine bioavailability reduced by 30% to 45% (drop: -45%)',
    chemicalEquation: 'Ca2+ (CaCO3) + C15H11I4NO4 (Levothyroxine) -> [Ca(C15H10I4NO4)]↓ (Insoluble Adsorbed Complex)',
    reactionMechanism: 'Divalent calcium cations (Ca2+) from calcium carbonate form insoluble coordination/adsorption complexes with Levothyroxine in the acidic upper GI tract, lowering systemic T4 AUC by 30% to 45%.',
    plainExplanation: 'Calcium acts like a magnet, binding directly to your thyroid pill in the stomach to form an unabsorbable compound.',
    clinicalWhy: 'Divalent calcium cations (Ca2+) form insoluble chelation complexes with Levothyroxine in the intestinal lumen.',
    actionableFix: 'Keep pills 4 to 6 hours apart: Thyroid at 7:00 AM empty stomach and Calcium after afternoon lunch.'
  },
  {
    id: 'fluoroquinolone-calcium',
    drugGroupA: 'Fluoroquinolone Antibiotics (Ciprofloxacin)',
    drugGroupB: 'Calcium / Antacid Minerals',
    exampleBrandsA: ['Ciplox 500', 'Cifran 500'],
    exampleBrandsB: ['Shelcal 500', 'Gelusil', 'Digene'],
    severity: 'CRITICAL',
    title: 'Antibiotic Inactivation: Chelation Complex Formation',
    bioavailabilityImpactPercent: -85,
    bioavailabilityImpactSummary: 'Ciprofloxacin absorption reduced by 50% to 85% (bioavailability drop: -85%)',
    chemicalEquation: 'M2+/3+ (Ca2+, Mg2+, Al3+) + 2 C17H18FN3O3 (Ciprofloxacin) -> [M(C17H17FN3O3)2]↓ (Insoluble Chelate)',
    reactionMechanism: 'Multivalent metal cations (Ca2+, Mg2+, Al3+) form stable 1:2 coordinate chelates with the 4-oxo and 3-carboxylic acid moieties of Ciprofloxacin, preventing passive intestinal diffusion and slashing bioavailability by up to -85%.',
    plainExplanation: 'Minerals chemically bond with Ciprofloxacin, dropping antibiotic absorption into your blood by up to 85% and risking infection relapse.',
    clinicalWhy: 'Multivalent cations form heavy insoluble chelates with the 4-keto and 3-carboxyl groups of fluoroquinolones.',
    actionableFix: 'Take antibiotic 2 hours before or 4 hours after taking calcium or antacids.'
  },
  {
    id: 'aspirin-warfarin',
    drugGroupA: 'Aspirin (Antiplatelet)',
    drugGroupB: 'Warfarin (Anticoagulant)',
    exampleBrandsA: ['Ecosprin 75', 'Ecosprin 150'],
    exampleBrandsB: ['Marevan', 'Warf 5'],
    severity: 'CRITICAL',
    title: 'High Danger: Extreme Internal Bleeding / Hemorrhage',
    bioavailabilityImpactPercent: 250,
    bioavailabilityImpactSummary: 'Major bleeding & hemorrhage hazard elevated by +200% to +250%',
    chemicalEquation: 'Aspirin (C9H8O4 -| Platelet TXA2) + Warfarin (C19H16O4 -| Factors II, VII, IX, X) -> Dual Hemostasis Blockade (+250% Bleed Risk)',
    reactionMechanism: 'Simultaneous irreversible blockade of primary platelet aggregation (TXA2) and secondary fibrin cascade synthesis (VKORC1), plus Aspirin displacement of plasma protein-bound Warfarin, amplifying severe bleeding risk by +200% to +250%.',
    plainExplanation: 'Combining two potent blood thinners removes both backup clotting systems, risking severe internal hemorrhage.',
    clinicalWhy: 'Concomitant inhibition of platelet aggregation and vitamin K coagulation factors abolishes hemostatic redundancy.',
    actionableFix: 'Requires strict cardiologist supervision and frequent INR blood monitoring.'
  },
  {
    id: 'bp-nsaid',
    drugGroupA: 'Blood Pressure ARBs/ACEis (Telmisartan / Losartan)',
    drugGroupB: 'NSAIDs (Ibuprofen / Diclofenac / Aceclofenac)',
    exampleBrandsA: ['Telma 40', 'Tazloc', 'Losar 50'],
    exampleBrandsB: ['Combiflam', 'Brufen', 'Voveran', 'Zerodol'],
    severity: 'MODERATE',
    title: 'Blood Pressure Spike & Renal Perfusion Stress',
    bioavailabilityImpactPercent: -35,
    bioavailabilityImpactSummary: 'Antihypertensive efficacy blunted by -25% to -35% (+5-10 mmHg systolic rise)',
    chemicalEquation: 'NSAID (-| Renal COX-2 -> ↓PGI2/PGE2) -> Afferent Arteriole Constriction + ARB (Efferent Dilation) -> ↓GFR & ↓BP Control (-35%)',
    reactionMechanism: 'NSAID suppression of renal vasodilatory prostaglandins constricts the afferent glomerular arteriole while ARBs dilate the efferent arteriole, dropping glomerular filtration pressure and blunting antihypertensive efficacy by -25% to -35%.',
    plainExplanation: 'NSAID painkillers cause sodium/fluid retention and constrict kidney vessels, blunting blood pressure control and stressing kidneys.',
    clinicalWhy: 'NSAID-induced inhibition of renal vasodilating prostaglandins antagonizes ARB hemodynamic efficacy.',
    actionableFix: 'Prefer Paracetamol (Dolo 650) for routine aches, or limit NSAID use to 2-3 days with BP checks.'
  },
  {
    id: 'double-paracetamol',
    drugGroupA: 'Pure Paracetamol',
    drugGroupB: 'Cold / Pain Paracetamol Combination',
    exampleBrandsA: ['Dolo 650', 'Calpol', 'Crocin'],
    exampleBrandsB: ['Cheston Cold', 'Sinarest', 'Sumo L', 'Combiflam'],
    severity: 'CRITICAL',
    title: 'Accidental Paracetamol Overdose: Liver Toxicity',
    bioavailabilityImpactPercent: 200,
    bioavailabilityImpactSummary: 'Cumulative acetaminophen hepatic load doubled (+100% to +200% overdose surge)',
    chemicalEquation: '2x C8H9NO2 (Excess >4g/day) -> Glucuronidation Saturated -> CYP2E1 -> C8H7NO2 (NAPQI ↑200%) -> GSH Depletion -> Hepatotoxicity',
    reactionMechanism: 'Duplicate Paracetamol ingestion saturates Phase II UGT glucuronidation and sulfation pathways, forcing a >200% flux surge through CYP2E1 into hepatotoxic NAPQI that depletes cellular glutathione.',
    plainExplanation: 'Both tablets contain Paracetamol; combining them accidentally pushes daily intake past the 4,000mg liver safety ceiling.',
    clinicalWhy: 'Excess acetaminophen overwhelms hepatic glucuronidation/sulfation, causing toxic NAPQI buildup.',
    actionableFix: 'Stop the standalone Paracetamol while taking a cold/pain combo tablet that already contains Paracetamol.'
  },
  {
    id: 'thyroid-iron',
    drugGroupA: 'Levothyroxine (Thyroid Hormone)',
    drugGroupB: 'Iron Supplements (Ferrous / Ferric Salts)',
    exampleBrandsA: ['Thyronorm', 'Eltroxin'],
    exampleBrandsB: ['DexOrange', 'Ferrous Sulfate', 'Autrin'],
    severity: 'CRITICAL',
    title: 'Iron Binding: Thyroid Dose Ineffective',
    bioavailabilityImpactPercent: -60,
    bioavailabilityImpactSummary: 'Levothyroxine absorption reduced by 40% to 60% (drop: -60%)',
    chemicalEquation: 'Fe2+/Fe3+ + 3 C15H11I4NO4 (Levothyroxine) -> [Fe(Levothyroxine)3]↓ (Insoluble Ferric-T4 Chelate)',
    reactionMechanism: 'Ferrous/ferric ions form tight insoluble 1:3 coordination chelates with the phenolic and amino-acid functional groups of Levothyroxine, reducing jejunal T4 absorption by 40% to 60%.',
    plainExplanation: 'Iron supplements chemically bind thyroid pills into an insoluble precipitate so your body cannot absorb the hormone.',
    clinicalWhy: 'Ferric ions form insoluble coordination chelates with Levothyroxine molecules in the gut lumen.',
    actionableFix: 'Take Thyroid at 7:00 AM on an empty stomach and Iron after afternoon lunch (4+ hours apart).'
  },
  {
    id: 'metformin-diuretic',
    drugGroupA: 'Metformin (Diabetes)',
    drugGroupB: 'Thiazide Diuretic BP Combo',
    exampleBrandsA: ['Glycomet', 'Gluconorm'],
    exampleBrandsB: ['Telma-H', 'Losar-H'],
    severity: 'MODERATE',
    title: 'Hydration Watch: Diuretic Fluid Loss & Renal Clearance',
    bioavailabilityImpactPercent: 30,
    bioavailabilityImpactSummary: 'Plasma Metformin retention elevated by +20% to +30% during dehydration',
    chemicalEquation: 'Hydrochlorothiazide (-| NCC) -> ↓Intravascular Volume -> ↓Renal GFR -> ↓OCT2/MATE1 Metformin Excretion (↑30%)',
    reactionMechanism: 'Diuretic-induced volume depletion lowers glomerular filtration rate (GFR) and renal tubular OCT2/MATE1 clearance of unchanged Metformin, modestly raising plasma Metformin exposure by +20% to +30% if hydration is poor.',
    plainExplanation: 'Water pills increase fluid loss; Metformin relies on well-hydrated kidneys to clear safely from the bloodstream.',
    clinicalWhy: 'Dehydration reduces glomerular filtration rate, diminishing renal Metformin clearance.',
    actionableFix: 'Drink 8 to 10 glasses of water daily and take Metformin with lunch or dinner.'
  }
];

/**
 * Quantitative Home Remedy / Symptom Relief Efficacy & Mechanism Catalog.
 */
export const HOME_REMEDY_EFFICACY_CATALOG: SymptomReliefCatalogEntry[] = [
  {
    symptomId: 'fever',
    symptomName: 'Fever & High Body Temperature',
    homeRemedies: [
      {
        title: 'Cold Damp Compress',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% surface temperature relief via evaporative convective heat transfer',
        action: 'Apply a cool, damp cloth to the forehead, nape of the neck, and wrists.',
        scienceRationale: 'Evaporative cooling directly conducts excess surface thermal energy away from superficial carotid and radial vasculature.'
      },
      {
        title: 'Electrolyte Hydration Therapy (ORS)',
        efficacyPercent: 55,
        efficacyMechanismSummary: '~55% recovery support via SGLT1 sodium-glucose cotransport rehydration',
        action: 'Drink electrolyte water, oral rehydration solutions (ORS), or clear broths regularly.',
        scienceRationale: 'Replenishes sweat-depleted Na+/K+ ions via intestinal SGLT1 cotransporters, stabilizing plasma volume and reducing febrile tachycardia.'
      },
      {
        title: 'Cool Rest Environment',
        efficacyPercent: 25,
        efficacyMechanismSummary: '~25% thermal comfort gain via ambient radiant heat dissipation',
        action: 'Rest in a well-ventilated room (20°C-22°C) wearing loose cotton clothing.',
        scienceRationale: 'Prevents thermal re-insulation so excess core heat dissipates naturally via cutaneous vasodilation.'
      }
    ]
  },
  {
    symptomId: 'acidity',
    symptomName: 'Acidity, Acid Reflux & Heartburn',
    homeRemedies: [
      {
        title: 'Chilled Water or Low-Fat Cold Milk',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% rapid soothing relief via esophageal acid dilution & casein pH buffering',
        action: 'Drink a glass of chilled low-fat milk or cold water slowly in small sips.',
        scienceRationale: 'Cold liquids mechanically clear refluxed HCl back into the stomach while milk casein proteins transiently buffer mucosal pH.'
      },
      {
        title: 'Strict Upright Posture / 6-Inch Elevation',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% reflux episode reduction via gravitational hydrostatic barrier at the LES',
        action: 'Sit upright for 2+ hours post-meal and elevate the head of your bed by 6 inches.',
        scienceRationale: 'Gravitational clearance prevents acidic gastric contents from pooling against the lower esophageal sphincter (LES).'
      },
      {
        title: 'Non-Mint Chewing Gum',
        efficacyPercent: 38,
        efficacyMechanismSummary: '~38% esophageal acid clearance via bicarbonate-rich salivary buffering (HCO3-)',
        action: 'Chew a piece of sugar-free non-mint gum for 15 to 20 minutes after meals.',
        scienceRationale: 'Stimulates alkaline salivary HCO3- secretion that neutralizes residual esophageal HCl (H+ + HCO3- -> H2O + CO2).'
      }
    ]
  },
  {
    symptomId: 'headache',
    symptomName: 'Tension Headache & Migraine',
    homeRemedies: [
      {
        title: 'Immediate Rehydration (500mL Water)',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% dehydration-headache relief via osmotic restoration of meningeal volume',
        action: 'Drink 1 to 2 large glasses of room-temperature water or coconut water immediately.',
        scienceRationale: 'Reversing mild hypovolemia restores cerebral intravascular and dural volume, quieting traction-sensitive meningeal nociceptors.'
      },
      {
        title: 'Dark Room & Cold Forehead Compress',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% throbbing pain reduction via TRPM8 cold-induced cranial vasoconstriction',
        action: 'Rest in a silent dark room with a cold compress over the forehead and temples.',
        scienceRationale: 'Activates cold TRPM8 receptors and constricts dilated extracranial arteries while reducing trigeminal photophobia signaling.'
      },
      {
        title: 'Neck & LI4 Temple Acupressure',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% tension relief via gate-control A-beta fiber modulation & trigger-point release',
        action: 'Firmly massage suboccipital base muscles and the LI4 hand web point for 2 minutes.',
        scienceRationale: 'Stimulates large-diameter A-beta mechanoreceptors that inhibit dorsal-horn nociceptive transmission and relax myofascial tension.'
      }
    ]
  },
  {
    symptomId: 'nausea',
    symptomName: 'Nausea & Motion / Stomach Upset',
    homeRemedies: [
      {
        title: 'Fresh Ginger Root Infusion',
        efficacyPercent: 65,
        efficacyMechanismSummary: '~65% nausea relief via peripheral 5-HT3 serotonin receptor antagonism',
        action: 'Sip warm water steeped with fresh sliced ginger or chew crystallized ginger.',
        scienceRationale: 'Active 6-gingerol and 6-shogaol competitively antagonize peripheral 5-HT3 serotonin and M3 cholinergic receptors in the GI tract, halting emetic vagal firing.'
      },
      {
        title: 'Slow Chilled Sips',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% emetic calm via gastric mechanoreceptor stretch avoidance',
        action: 'Sip small spoonfuls of chilled water or clear apple juice slowly.',
        scienceRationale: 'Avoids abrupt gastric fundus distension that triggers vagal mechanoreceptors routed to the brainstem vomiting center.'
      },
      {
        title: 'P6 (Neiguan) Wrist Acupressure',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% motion-nausea reduction via median-nerve autonomic vagal modulation',
        action: 'Press two fingers firmly three finger-widths below the inner wrist crease between the tendons.',
        scienceRationale: 'Somatosensory median-nerve stimulation attenuates gastric tachyarrhythmias and area postrema emetic output.'
      }
    ]
  },
  {
    symptomId: 'cough',
    symptomName: 'Cough, Sore Throat & Common Cold',
    homeRemedies: [
      {
        title: 'Warm Honey & Lemon Water',
        efficacyPercent: 40,
        efficacyMechanismSummary: '~40% soothing cough relief via viscous pharyngeal demulcent mucosal coating',
        action: 'Mix 1 tablespoon of pure honey with warm water and lemon juice (adults & children >1 yr).',
        scienceRationale: 'High-viscosity honey coats exposed pharyngeal C-fiber cough receptors while natural flavonoids and citric acid stimulate soothing reflex salivation.'
      },
      {
        title: 'Warm Salt Water Gargle',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% throat pain reduction via hypertonic osmotic edema drainage',
        action: 'Dissolve 1/2 teaspoon salt in warm water; gargle thoroughly for 30 seconds and spit out.',
        scienceRationale: 'Hypertonic NaCl creates an osmotic gradient that draws inflammatory fluid out of swollen pharyngeal mucosa and loosens viral mucus.'
      },
      {
        title: 'Warm Steam Inhalation',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% congestion relief via mucociliary hydration & mucus viscosity reduction',
        action: 'Inhale gentle warm steam for 5-10 minutes under a towel.',
        scienceRationale: 'Hydrates desiccated bronchial epithelium, decreasing mucin cross-linking viscosity and accelerating mucociliary clearance.'
      }
    ]
  },
  {
    symptomId: 'muscle-pain',
    symptomName: 'Muscle Spasms & Body Aches',
    homeRemedies: [
      {
        title: 'Contrast Thermal Therapy (Ice -> Heat)',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% ache reduction via initial vasoconstrictive edema control & reactive vasodilation',
        action: 'Apply cold packs for the first 24-48 hours, then transition to warm compresses.',
        scienceRationale: 'Acute cryotherapy blunts bradykinin/prostaglandin edema and slows C-fiber conduction; delayed heat dilates capillaries to clear metabolic lactate.'
      },
      {
        title: 'Warm Epsom Salt Soak',
        efficacyPercent: 40,
        efficacyMechanismSummary: '~40% spasm relaxation via thermal actin-myosin cross-bridge release',
        action: 'Soak in a warm bath with 1-2 cups of magnesium sulfate (Epsom salt) for 20 minutes.',
        scienceRationale: 'Hydrostatic warmth reduces gamma-motor neuron spindle firing and relaxes contracted sarcomere filaments.'
      },
      {
        title: 'Gentle Low-Load Static Stretching',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% stiffness relief via Golgi tendon organ autogenic inhibition',
        action: 'Hold gentle static stretches for 20 to 30 seconds without bouncing.',
        scienceRationale: 'Sustained low tension activates Golgi tendon Ib afferents, triggering spinal reciprocal relaxation of hypertonic muscle fibers.'
      }
    ]
  }
];
