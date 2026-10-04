import type { CuratedDrugId, DrugId } from '../types';

export interface IndianMedicineEntry {
  id: string;
  brandName: string;
  genericSalt: string;
  blisterFoilSalt?: string;
  category: string;
  badge: string;
  dosageForm: string;
  popularDose: string;
  mappedCuratedDrugId: CuratedDrugId | null;
  aliases: string[];
  manufacturer?: string;
  isSafeNeutral?: boolean;
}

/**
 * Curated database of the most common Indian pharmacy medications,
 * mapped to their generic chemical salts and PharmaSafe interaction monographs.
 */
export const INDIAN_PHARMACY_DATABASE: IndianMedicineEntry[] = [
  // 1. Paracetamol / Antipyretic & Analgesic
  {
    id: 'dolo-650',
    brandName: 'Dolo 650',
    genericSalt: 'Paracetamol / Acetaminophen (650mg)',
    category: 'Fever & Pain Relief',
    badge: 'Antipyretic',
    dosageForm: 'Oral Tablet',
    popularDose: '650 mg',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Dolo', 'Dolo 650mg', 'Paracetamol 650', 'Fever tablet'],
    manufacturer: 'Micro Labs Ltd'
  },
  {
    id: 'calpol',
    brandName: 'Calpol',
    genericSalt: 'Paracetamol (500mg / 650mg)',
    category: 'Fever & Mild Pain',
    badge: 'Antipyretic',
    dosageForm: 'Oral Tablet / Suspension',
    popularDose: '500 mg / 650 mg',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Calpol 500', 'Calpol 650', 'Calpol T', 'Paediatric Calpol'],
    manufacturer: 'GlaxoSmithKline Pharmaceuticals'
  },
  {
    id: 'crocin',
    brandName: 'Crocin',
    genericSalt: 'Paracetamol (500mg / 650mg)',
    category: 'Fever & Headache',
    badge: 'Antipyretic',
    dosageForm: 'Oral Tablet',
    popularDose: '650 mg Advance',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Crocin Advance', 'Crocin 650', 'Crocin Pain Relief'],
    manufacturer: 'GlaxoSmithKline'
  },
  {
    id: 'sumo-l',
    brandName: 'Sumo L',
    genericSalt: 'Paracetamol (650mg)',
    category: 'Fever & Body Pain',
    badge: 'Antipyretic',
    dosageForm: 'Oral Tablet',
    popularDose: '650 mg',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Sumo L 650', 'Sumo Paracetamol'],
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'pacimol',
    brandName: 'Pacimol',
    genericSalt: 'Paracetamol (650mg)',
    category: 'Fever & Analgesic',
    badge: 'Antipyretic',
    dosageForm: 'Oral Tablet',
    popularDose: '650 mg',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Pacimol 650'],
    manufacturer: 'Ipca Laboratories'
  },

  // 2. Pantoprazole & Antacids (Safe / Neutral Gastro-protective)
  {
    id: 'pan-40',
    brandName: 'Pan 40',
    genericSalt: 'Pantoprazole Sodium (40mg)',
    category: 'Antacid / Acidity & GERD',
    badge: 'Proton Pump Inhibitor (PPI)',
    dosageForm: 'Enteric Coated Tablet',
    popularDose: '40 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Pan', 'Pan 40mg', 'Pantoprazole 40', 'Acidity'],
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'pan-d',
    brandName: 'Pan-D',
    genericSalt: 'Pantoprazole (40mg) + Domperidone (30mg SR)',
    category: 'Acidity, Gas & Nausea',
    badge: 'PPI + Antiemetic',
    dosageForm: 'Capsule',
    popularDose: '40 mg / 30 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Pan D', 'Pan DSR', 'Pantoprazole Domperidone'],
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'pantocid',
    brandName: 'Pantocid',
    genericSalt: 'Pantoprazole (40mg)',
    category: 'Acid Reflux & Gastritis',
    badge: 'Proton Pump Inhibitor',
    dosageForm: 'Tablet',
    popularDose: '40 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Pantocid 40', 'Pantocid DSR', 'Pantocid HP'],
    manufacturer: 'Sun Pharmaceutical'
  },
  {
    id: 'gelusil',
    brandName: 'Gelusil',
    genericSalt: 'Aluminium Hydroxide + Magnesium Hydroxide + Dimethicone',
    category: 'Instant Heartburn Relief',
    badge: 'Antacid Liquid/Chewable',
    dosageForm: 'Oral Liquid / Chewable Tablet',
    popularDose: 'Liquid MPS',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Gelusil MPS', 'Gelusil Syrup', 'Gelusil Antacid'],
    manufacturer: 'Pfizer Ltd'
  },
  {
    id: 'digene',
    brandName: 'Digene',
    genericSalt: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    category: 'Acidity, Gas & Bloating',
    badge: 'Antacid Suspension',
    dosageForm: 'Oral Gel / Chewable Tablet',
    popularDose: 'Mint Gel',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Digene Gel', 'Digene Tablet', 'Digene Mint', 'Digene Orange'],
    manufacturer: 'Abbott Healthcare'
  },
  {
    id: 'omez',
    brandName: 'Omez',
    genericSalt: 'Omeprazole (20mg)',
    category: 'Gastric Acid Reduction',
    badge: 'Proton Pump Inhibitor',
    dosageForm: 'Capsule',
    popularDose: '20 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Omez 20', 'Omez D', 'Omeprazole'],
    manufacturer: "Dr. Reddy's Laboratories"
  },
  {
    id: 'rantac',
    brandName: 'Rantac',
    genericSalt: 'Ranitidine (150mg)',
    category: 'H2 Blocker / Acidity',
    badge: 'H2 Antagonist',
    dosageForm: 'Tablet',
    popularDose: '150 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Rantac 150', 'Rantac OD'],
    manufacturer: 'J.B. Chemicals & Pharmaceuticals'
  },

  // 3. Metformin (Diabetes / Glycemic Control) -> Curated Metformin
  {
    id: 'glycomet',
    brandName: 'Glycomet',
    genericSalt: 'Metformin Hydrochloride (500mg / 850mg / 1000mg)',
    category: 'Type 2 Diabetes Mellitus',
    badge: 'Biguanide Antidiabetic',
    dosageForm: 'Extended Release Tablet',
    popularDose: '500 mg SR',
    mappedCuratedDrugId: 'Metformin',
    aliases: ['Glycomet 500', 'Glycomet 500 SR', 'Glycomet 850', 'Glycomet 1g'],
    manufacturer: 'USV Private Ltd'
  },
  {
    id: 'glycomet-gp',
    brandName: 'Glycomet-GP',
    genericSalt: 'Metformin (500mg) + Glimepiride (1mg / 2mg)',
    category: 'Dual Oral Antidiabetic',
    badge: 'Metformin + Sulfonylurea',
    dosageForm: 'Forte Tablet',
    popularDose: 'GP 1 / GP 2',
    mappedCuratedDrugId: 'Metformin',
    aliases: ['Glycomet GP 1', 'Glycomet GP 2', 'Glycomet GP 0.5'],
    manufacturer: 'USV Ltd'
  },
  {
    id: 'gluconorm',
    brandName: 'Gluconorm',
    genericSalt: 'Metformin Hydrochloride (500mg SR)',
    category: 'Blood Sugar Regulation',
    badge: 'Oral Antidiabetic',
    dosageForm: 'Sustained Release Tablet',
    popularDose: '500 mg / 1000 mg',
    mappedCuratedDrugId: 'Metformin',
    aliases: ['Gluconorm G', 'Gluconorm SR', 'Gluconorm 500'],
    manufacturer: 'Lupin Ltd'
  },

  // 4. Telmisartan / Blood Pressure -> Mapped to 'Lisinopril / Losartan' (RAAS / ARB Pathway with Potassium Caution)
  {
    id: 'telma',
    brandName: 'Telma',
    genericSalt: 'Telmisartan (40mg / 80mg)',
    category: 'Cardiovascular / Blood Pressure',
    badge: 'Angiotensin II Receptor Blocker (ARB)',
    dosageForm: 'Oral Tablet',
    popularDose: '40 mg',
    mappedCuratedDrugId: 'Lisinopril / Losartan',
    aliases: ['Telma 40', 'Telma 20', 'Telma 80', 'Telmisartan'],
    manufacturer: 'Glenmark Pharmaceuticals'
  },
  {
    id: 'telma-h',
    brandName: 'Telma-H',
    genericSalt: 'Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)',
    category: 'Hypertension Combination',
    badge: 'ARB + Thiazide Diuretic',
    dosageForm: 'Tablet',
    popularDose: '40 / 12.5 mg',
    mappedCuratedDrugId: 'Lisinopril / Losartan',
    aliases: ['Telma H 40', 'Telma H', 'Telmisartan HCTZ'],
    manufacturer: 'Glenmark Pharmaceuticals'
  },
  {
    id: 'tazloc',
    brandName: 'Tazloc',
    genericSalt: 'Telmisartan (40mg)',
    category: 'Hypertension Management',
    badge: 'Angiotensin Receptor Blocker',
    dosageForm: 'Tablet',
    popularDose: '40 mg / 80 mg',
    mappedCuratedDrugId: 'Lisinopril / Losartan',
    aliases: ['Tazloc 40', 'Tazloc-H', 'Tazloc AM'],
    manufacturer: 'USV Ltd'
  },
  {
    id: 'telmikind',
    brandName: 'Telmikind',
    genericSalt: 'Telmisartan (40mg)',
    category: 'High Blood Pressure',
    badge: 'ARB Antihypertensive',
    dosageForm: 'Tablet',
    popularDose: '40 mg',
    mappedCuratedDrugId: 'Lisinopril / Losartan',
    aliases: ['Telmikind 40', 'Telmikind-H', 'Telmikind AM'],
    manufacturer: 'Mankind Pharma'
  },
  {
    id: 'losar',
    brandName: 'Losar',
    genericSalt: 'Losartan Potassium (25mg / 50mg)',
    category: 'Blood Pressure & Heart Failure',
    badge: 'Angiotensin Receptor Blocker',
    dosageForm: 'Tablet',
    popularDose: '50 mg',
    mappedCuratedDrugId: 'Lisinopril / Losartan',
    aliases: ['Losar 50', 'Losar-H', 'Losartan 50mg'],
    manufacturer: 'Unichem Laboratories'
  },

  // 5. Atorvastatin (Cholesterol) -> Curated Atorvastatin (Grapefruit Danger)
  {
    id: 'storvas',
    brandName: 'Storvas',
    genericSalt: 'Atorvastatin Calcium (10mg / 20mg / 40mg)',
    category: 'Lipid Lowering / Cholesterol',
    badge: 'HMG-CoA Reductase Inhibitor',
    dosageForm: 'Oral Film-Coated Tablet',
    popularDose: '10 mg / 20 mg',
    mappedCuratedDrugId: 'Atorvastatin',
    aliases: ['Storvas 10', 'Storvas 20', 'Storvas 40', 'Storvas CV'],
    manufacturer: 'Sun Pharmaceutical'
  },
  {
    id: 'lipicure',
    brandName: 'Lipicure',
    genericSalt: 'Atorvastatin (10mg / 20mg)',
    category: 'Cardiovascular Prophylaxis',
    badge: 'Statin Therapy',
    dosageForm: 'Tablet',
    popularDose: '10 mg / 20 mg',
    mappedCuratedDrugId: 'Atorvastatin',
    aliases: ['Lipicure 10', 'Lipicure 20', 'Lipicure 40'],
    manufacturer: 'Intas Pharmaceuticals'
  },
  {
    id: 'atorva',
    brandName: 'Atorva',
    genericSalt: 'Atorvastatin (10mg / 20mg)',
    category: 'Dyslipidemia / Cholesterol',
    badge: 'HMG-CoA Statin',
    dosageForm: 'Tablet',
    popularDose: '10 mg / 20 mg',
    mappedCuratedDrugId: 'Atorvastatin',
    aliases: ['Atorva 10', 'Atorva 20', 'Atorva TG'],
    manufacturer: 'Zydus Cadila'
  },
  {
    id: 'tonact',
    brandName: 'Tonact',
    genericSalt: 'Atorvastatin (10mg / 20mg / 40mg)',
    category: 'Cholesterol & Triglyceride Reduction',
    badge: 'Statin',
    dosageForm: 'Tablet',
    popularDose: '10 mg',
    mappedCuratedDrugId: 'Atorvastatin',
    aliases: ['Tonact 10', 'Tonact 20', 'Tonact TG'],
    manufacturer: 'Lupin Ltd'
  },
  {
    id: 'rozavel',
    brandName: 'Rozavel',
    genericSalt: 'Rosuvastatin (10mg / 20mg)',
    category: 'Cardiovascular Lipid Statin',
    badge: 'Potent Statin',
    dosageForm: 'Tablet',
    popularDose: '10 mg',
    mappedCuratedDrugId: 'Atorvastatin',
    aliases: ['Rozavel 10', 'Rozavel 20', 'Rosuvastatin'],
    manufacturer: 'Sun Pharmaceutical'
  },

  // 6. Aspirin & Blood Thinners
  {
    id: 'ecosprin',
    brandName: 'Ecosprin',
    genericSalt: 'Aspirin / Acetylsalicylic Acid (75mg / 150mg)',
    category: 'Cardiac Antiplatelet / Blood Thinner',
    badge: 'Antiplatelet NSAID',
    dosageForm: 'Enteric Coated Tablet',
    popularDose: '75 mg / 150 mg',
    mappedCuratedDrugId: 'Ibuprofen / NSAIDs',
    aliases: ['Ecosprin 75', 'Ecosprin 150', 'Ecosprin AV', 'Aspirin'],
    manufacturer: 'USV Ltd'
  },
  {
    id: 'clavix',
    brandName: 'Clavix',
    genericSalt: 'Clopidogrel (75mg)',
    category: 'Antiplatelet Therapy',
    badge: 'P2Y12 Inhibitor',
    dosageForm: 'Film-Coated Tablet',
    popularDose: '75 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Clavix 75', 'Clavix AS', 'Clopidogrel'],
    manufacturer: 'Intas Pharmaceuticals'
  },
  {
    id: 'marevan',
    brandName: 'Marevan',
    genericSalt: 'Warfarin Sodium (1mg / 2mg / 5mg)',
    category: 'Anticoagulant / Blood Thinner',
    badge: 'Vitamin K Antagonist',
    dosageForm: 'Tablet',
    popularDose: '5 mg',
    mappedCuratedDrugId: 'Warfarin',
    aliases: ['Marevan 5', 'Marevan 2', 'Warfarin'],
    manufacturer: 'GlaxoSmithKline'
  },
  {
    id: 'warf',
    brandName: 'Warf',
    genericSalt: 'Warfarin (1mg / 2mg / 5mg)',
    category: 'Thrombosis Prophylaxis',
    badge: 'Coumarin Anticoagulant',
    dosageForm: 'Tablet',
    popularDose: '5 mg',
    mappedCuratedDrugId: 'Warfarin',
    aliases: ['Warf 5', 'Warf 2', 'Warfarin India'],
    manufacturer: 'Cipla Ltd'
  },

  // 7. Levothyroxine (Thyroid Hormone) -> Curated Levothyroxine
  {
    id: 'thyronorm',
    brandName: 'Thyronorm',
    genericSalt: 'Levothyroxine Sodium (25mcg / 50mcg / 100mcg / 125mcg)',
    category: 'Endocrinology / Thyroid Hormone',
    badge: 'Synthetic T4 Hormone',
    dosageForm: 'Morning Fasting Tablet',
    popularDose: '50 mcg / 100 mcg',
    mappedCuratedDrugId: 'Levothyroxine',
    aliases: ['Thyronorm 25', 'Thyronorm 50', 'Thyronorm 75', 'Thyronorm 100', 'Thyronorm 125'],
    manufacturer: 'Abbott India'
  },
  {
    id: 'eltroxin',
    brandName: 'Eltroxin',
    genericSalt: 'Levothyroxine Sodium (50mcg / 100mcg)',
    category: 'Hypothyroidism Therapy',
    badge: 'Thyroxine Replacement',
    dosageForm: 'Tablet',
    popularDose: '50 mcg / 100 mcg',
    mappedCuratedDrugId: 'Levothyroxine',
    aliases: ['Eltroxin 50', 'Eltroxin 100', 'Thyroxine'],
    manufacturer: 'GlaxoSmithKline'
  },
  {
    id: 'thyrox',
    brandName: 'Thyrox',
    genericSalt: 'Levothyroxine (50mcg / 75mcg / 100mcg)',
    category: 'Thyroid Supplementation',
    badge: 'Thyroxine T4',
    dosageForm: 'Tablet',
    popularDose: '50 mcg / 100 mcg',
    mappedCuratedDrugId: 'Levothyroxine',
    aliases: ['Thyrox 50', 'Thyrox 100'],
    manufacturer: 'Macloeds Pharmaceuticals'
  },

  // 8. Antibiotics (Indian Staples)
  {
    id: 'augmentin',
    brandName: 'Augmentin',
    genericSalt: 'Amoxicillin (500mg) + Potassium Clavulanate (125mg)',
    category: 'Broad-Spectrum Antibiotic',
    badge: 'Penicillin + Beta-Lactamase Inhibitor',
    dosageForm: 'Film-Coated Tablet',
    popularDose: '625 Duo',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Augmentin 625', 'Augmentin 625 Duo', 'Amoxyclav', 'Moxikind CV'],
    manufacturer: 'GlaxoSmithKline'
  },
  {
    id: 'azithral',
    brandName: 'Azithral',
    genericSalt: 'Azithromycin (500mg)',
    category: 'Respiratory & Throat Infection',
    badge: 'Macrolide Antibiotic',
    dosageForm: 'Tablet',
    popularDose: '500 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Azithral 500', 'Azithral 250', 'Azithromycin 500', 'Azee 500'],
    manufacturer: 'Alembic Pharmaceuticals'
  },
  {
    id: 'monocef',
    brandName: 'Monocef',
    genericSalt: 'Ceftriaxone Sodium (1g / 2g / 500mg)',
    category: 'Injectable Antibiotic',
    badge: '3rd Gen Cephalosporin',
    dosageForm: 'IV / IM Injection',
    popularDose: '1 g',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Monocef 1g', 'Monocef 500', 'Ceftriaxone'],
    manufacturer: 'Aristo Pharmaceuticals'
  },
  {
    id: 'taxim-o',
    brandName: 'Taxim-O',
    genericSalt: 'Cefixime (200mg)',
    category: 'Oral Antibiotic',
    badge: '3rd Gen Oral Cephalosporin',
    dosageForm: 'Tablet / Dry Syrup',
    popularDose: '200 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Taxim O 200', 'Taxim O', 'Cefixime 200', 'Zifi 200'],
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'ciplox',
    brandName: 'Ciplox',
    genericSalt: 'Ciprofloxacin (500mg)',
    category: 'Urinary & Systemic Infection',
    badge: 'Fluoroquinolone Antibiotic',
    dosageForm: 'Oral Tablet / Eye Drops',
    popularDose: '500 mg',
    mappedCuratedDrugId: 'Tetracycline / Ciprofloxacin',
    aliases: ['Ciplox 500', 'Ciplox 250', 'Cipro', 'Cifran'],
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'cifran',
    brandName: 'Cifran',
    genericSalt: 'Ciprofloxacin (500mg)',
    category: 'Bacterial Infection Therapy',
    badge: 'Fluoroquinolone',
    dosageForm: 'Tablet',
    popularDose: '500 mg',
    mappedCuratedDrugId: 'Tetracycline / Ciprofloxacin',
    aliases: ['Cifran 500', 'Cifran CT'],
    manufacturer: 'Sun Pharmaceutical'
  },

  // 9. Antihistamines & Cold Medications
  {
    id: 'allegra',
    brandName: 'Allegra',
    genericSalt: 'Fexofenadine Hydrochloride (120mg / 180mg)',
    category: 'Allergy & Hay Fever Relief',
    badge: 'Non-Drowsy Antihistamine',
    dosageForm: 'Oral Tablet',
    popularDose: '120 mg / 180 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Allegra 120', 'Allegra 180', 'Allegra M', 'Fexofenadine'],
    manufacturer: 'Sanofi India'
  },
  {
    id: 'cheston-cold',
    brandName: 'Cheston Cold',
    genericSalt: 'Cetirizine (5mg) + Paracetamol (325mg) + Phenylephrine (10mg)',
    category: 'Common Cold, Congestion & Fever',
    badge: 'Multi-Action Cold Relief',
    dosageForm: 'Tablet',
    popularDose: 'Triple Action',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Cheston Cold Tablet', 'Cheston Cold Total'],
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'okacet',
    brandName: 'Okacet',
    genericSalt: 'Cetirizine Hydrochloride (10mg)',
    category: 'Allergic Rhinitis & Itching',
    badge: '2nd Gen Antihistamine',
    dosageForm: 'Oral Tablet',
    popularDose: '10 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Okacet 10', 'Okacet Cold', 'Cetirizine 10mg', 'Cetzine'],
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'montair-lc',
    brandName: 'Montair LC',
    genericSalt: 'Montelukast (10mg) + Levocetirizine (5mg)',
    category: 'Asthma & Allergic Rhinitis',
    badge: 'Leukotriene Receptor + Antihistamine',
    dosageForm: 'Film-Coated Tablet',
    popularDose: '10 mg / 5 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Montair LC Kid', 'Monticope', 'Montair 10'],
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'sinarest',
    brandName: 'Sinarest',
    genericSalt: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    category: 'Cold, Sinus & Headache',
    badge: 'Decongestant + Analgesic',
    dosageForm: 'Tablet',
    popularDose: 'Standard Tablet',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen',
    aliases: ['Sinarest LP', 'Sinarest New'],
    manufacturer: 'Centaur Pharmaceuticals'
  },

  // 10. Vitamins & Nutritional Supplements
  {
    id: 'shelcal',
    brandName: 'Shelcal',
    genericSalt: 'Calcium Carbonate (500mg) + Vitamin D3 (250 IU)',
    category: 'Bone Health & Calcium Deficiency',
    badge: 'Mineral & Vitamin D3',
    dosageForm: 'Oral Tablet',
    popularDose: 'Shelcal 500',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Shelcal 500', 'Shelcal HD', 'Shelcal XT', 'Calcium 500'],
    manufacturer: 'Torrent Pharmaceuticals'
  },
  {
    id: 'supradyn',
    brandName: 'Supradyn',
    genericSalt: 'Daily Multivitamins (11 Vitamins) + Minerals (5 Minerals) + Trace Elements',
    category: 'Energy, Immunity & Vitality',
    badge: 'Comprehensive Multivitamin',
    dosageForm: 'Tablet with Zinc',
    popularDose: 'Daily Tablet',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Supradyn Daily', 'Supradyn Tablet', 'Multivitamin'],
    manufacturer: 'Bayer Consumer Health'
  },
  {
    id: 'dexorange',
    brandName: 'DexOrange',
    genericSalt: 'Ferric Ammonium Citrate (Iron) + Vitamin B12 + Folic Acid',
    category: 'Anemia & Hematinic Tonic',
    badge: 'Iron & RBC Booster',
    dosageForm: 'Syrup / Capsule',
    popularDose: 'Syrup 200ml',
    mappedCuratedDrugId: 'Iron Supplements',
    aliases: ['DexOrange Syrup', 'DexOrange Capsule', 'Iron Tonic'],
    manufacturer: 'Franco-Indian Pharmaceuticals'
  },
  {
    id: 'evion-400',
    brandName: 'Evion 400',
    genericSalt: 'Tocopheryl Acetate / Vitamin E (400mg)',
    category: 'Antioxidant, Skin & Muscle Health',
    badge: 'Pure Vitamin E',
    dosageForm: 'Soft Gelatin Green Capsule',
    popularDose: '400 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Evion', 'Evion 400mg', 'Evion 600', 'Vitamin E Capsule'],
    manufacturer: 'Merck / Procter & Gamble Health'
  },
  {
    id: 'becosules',
    brandName: 'Becosules',
    genericSalt: 'Vitamin B-Complex (B1, B2, B3, B6, B12, Folic Acid) + Vitamin C',
    category: 'Mouth Ulcers & Vitamin B Deficiency',
    badge: 'B-Complex + Zinc',
    dosageForm: 'Capsule',
    popularDose: 'Becosules Z',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Becosules Z', 'B-Complex', 'Becosule'],
    manufacturer: 'Pfizer Ltd'
  },
  {
    id: 'neurobion-forte',
    brandName: 'Neurobion Forte',
    genericSalt: 'Vitamin B1 + B6 + B12 (Neurotropic B-Vitamins)',
    category: 'Nerve Health, Tingling & Neuropathy',
    badge: 'Neurotropic Vitamin Formula',
    dosageForm: 'Oral Tablet / Injection',
    popularDose: 'Forte Tablet',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Neurobion', 'Neurobion Forte Tablet', 'B12 Tablet'],
    manufacturer: 'Procter & Gamble Health'
  },
  {
    id: 'limcee',
    brandName: 'Limcee',
    genericSalt: 'Vitamin C / Ascorbic Acid (500mg)',
    category: 'Immunity & Skin Antioxidant',
    badge: 'Chewable Vitamin C',
    dosageForm: 'Chewable Orange Tablet',
    popularDose: '500 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Limcee 500', 'Vitamin C Orange', 'Celin 500'],
    manufacturer: 'Abbott Healthcare'
  },

  // 11. Pain Relief & NSAIDs
  {
    id: 'combiflam',
    brandName: 'Combiflam',
    genericSalt: 'Ibuprofen (400mg) + Paracetamol (325mg)',
    category: 'Pain, Dental Ache & Musculoskeletal Inflammation',
    badge: 'NSAID + Analgesic Dual Combination',
    dosageForm: 'Oral Tablet',
    popularDose: '400 / 325 mg',
    mappedCuratedDrugId: 'Ibuprofen / NSAIDs',
    aliases: ['Combiflam Plus', 'Ibuprofen Paracetamol', 'Bodyache tablet'],
    manufacturer: 'Sanofi India'
  },
  {
    id: 'brufen',
    brandName: 'Brufen',
    genericSalt: 'Ibuprofen (200mg / 400mg / 600mg)',
    category: 'Anti-Inflammatory & Arthritis Pain',
    badge: 'Pure NSAID',
    dosageForm: 'Sugar Coated Tablet',
    popularDose: '400 mg',
    mappedCuratedDrugId: 'Ibuprofen / NSAIDs',
    aliases: ['Brufen 400', 'Brufen 200', 'Brufen 600'],
    manufacturer: 'Abbott India'
  },
  {
    id: 'voveran',
    brandName: 'Voveran',
    genericSalt: 'Diclofenac Sodium (50mg)',
    category: 'Joint, Back & Sprain Pain',
    badge: 'Potent NSAID',
    dosageForm: 'SR Tablet / Emulgel',
    popularDose: '50 mg / SR 75',
    mappedCuratedDrugId: 'Ibuprofen / NSAIDs',
    aliases: ['Voveran 50', 'Voveran SR 75', 'Voveran SR 100', 'Diclofenac'],
    manufacturer: 'Novartis India'
  },
  {
    id: 'zerodol',
    brandName: 'Zerodol',
    genericSalt: 'Aceclofenac (100mg)',
    category: 'Bone, Joint & Post-Operative Pain',
    badge: 'COX-2 Preferential NSAID',
    dosageForm: 'Film-Coated Tablet',
    popularDose: 'Zerodol-P',
    mappedCuratedDrugId: 'Ibuprofen / NSAIDs',
    aliases: ['Zerodol P', 'Zerodol SP', 'Zerodol TH', 'Aceclofenac'],
    manufacturer: 'Ipca Laboratories'
  },

  // 12. Cardiac & Hypertension
  {
    id: 'amlong',
    brandName: 'Amlong',
    genericSalt: 'Amlodipine Besylate (5mg / 10mg)',
    category: 'Calcium Channel Blocker / Blood Pressure',
    badge: 'Dihydropyridine CCB',
    dosageForm: 'Tablet',
    popularDose: '5 mg',
    mappedCuratedDrugId: null,
    isSafeNeutral: true,
    aliases: ['Amlong 5', 'Amlong 10', 'Amlodipine 5mg', 'Amlopres'],
    manufacturer: 'Micro Labs'
  },
  {
    id: 'lanoxin',
    brandName: 'Lanoxin',
    genericSalt: 'Digoxin (0.25mg)',
    category: 'Heart Failure & Atrial Fibrillation',
    badge: 'Cardiac Glycoside',
    dosageForm: 'Tablet',
    popularDose: '0.25 mg',
    mappedCuratedDrugId: 'Digoxin',
    aliases: ['Lanoxin 0.25', 'Digoxin India'],
    manufacturer: 'GlaxoSmithKline'
  }
];

/**
 * Quick-tap popular medications on the Indian pharmacy counter
 */
export const POPULAR_INDIAN_SHORTCUTS: Array<{
  label: string;
  brandName: string;
  genericSalt: string;
  mappedDrugId: DrugId;
}> = [
  { label: 'Dolo 650', brandName: 'Dolo 650', genericSalt: 'Paracetamol', mappedDrugId: 'Paracetamol / Acetaminophen' },
  { label: 'Pan 40', brandName: 'Pan 40', genericSalt: 'Pantoprazole', mappedDrugId: 'Pan 40 (Pantoprazole)' },
  { label: 'Glycomet', brandName: 'Glycomet', genericSalt: 'Metformin', mappedDrugId: 'Metformin' },
  { label: 'Telma', brandName: 'Telma', genericSalt: 'Telmisartan', mappedDrugId: 'Lisinopril / Losartan' },
  { label: 'Storvas', brandName: 'Storvas', genericSalt: 'Atorvastatin', mappedDrugId: 'Atorvastatin' },
  { label: 'Shelcal 500', brandName: 'Shelcal', genericSalt: 'Calcium + Vit D3', mappedDrugId: 'Shelcal 500 (Calcium + Vit D3)' },
  { label: 'Augmentin', brandName: 'Augmentin', genericSalt: 'Amoxicillin + Clavulanate', mappedDrugId: 'Augmentin 625 Duo' },
  { label: 'Evion 400', brandName: 'Evion 400', genericSalt: 'Vitamin E', mappedDrugId: 'Evion 400 (Vitamin E)' }
];

/**
 * Returns the exact Indian Pharmacopoeia (IP) salt imprint printed on the back of medicine blister foils
 */
export function getBlisterFoilSalt(drugId: DrugId | null, brandName?: string): string {
  const query = (brandName || (drugId ? String(drugId) : '')).trim().toLowerCase();
  if (!query) return 'Paracetamol IP 650mg';

  // Direct matches in Indian Pharmacy database
  const med = INDIAN_PHARMACY_DATABASE.find(m => 
    m.brandName.toLowerCase() === query || 
    m.id.toLowerCase() === query || 
    m.aliases.some(a => a.toLowerCase() === query)
  );

  if (med) {
    if (med.blisterFoilSalt) return med.blisterFoilSalt;
    // Format based on brand
    if (/dolo\s*650/i.test(med.brandName)) return 'Paracetamol IP 650mg';
    if (/calpol/i.test(med.brandName)) return 'Paracetamol IP 500mg / 650mg';
    if (/crocin/i.test(med.brandName)) return 'Paracetamol IP 650mg';
    if (/storvas/i.test(med.brandName)) return 'Atorvastatin Calcium IP 10mg / 20mg';
    if (/lipicure/i.test(med.brandName)) return 'Atorvastatin Tablets IP 10mg';
    if (/atorva/i.test(med.brandName)) return 'Atorvastatin Tablets IP 10mg';
    if (/tonact/i.test(med.brandName)) return 'Atorvastatin Tablets IP 10mg';
    if (/rozavel/i.test(med.brandName)) return 'Rosuvastatin Calcium IP 10mg';
    if (/pan\s*40/i.test(med.brandName)) return 'Pantoprazole Gastro-Resistant Tablets IP 40mg';
    if (/pan-d|pan\s*d/i.test(med.brandName)) return 'Pantoprazole Sodium & Domperidone SR Capsules IP';
    if (/pantocid/i.test(med.brandName)) return 'Pantoprazole Gastro-Resistant Tablets IP 40mg';
    if (/gelusil/i.test(med.brandName)) return 'Aluminium Hydroxide & Magnesium Hydroxide Antacid IP';
    if (/digene/i.test(med.brandName)) return 'Magnesium Hydroxide, Aluminium Hydroxide & Simethicone IP';
    if (/omez/i.test(med.brandName)) return 'Omeprazole Capsules IP 20mg';
    if (/rantac/i.test(med.brandName)) return 'Ranitidine Hydrochloride Tablets IP 150mg';
    if (/glycomet-gp/i.test(med.brandName)) return 'Metformin Hydrochloride (SR) & Glimepiride Tablets IP';
    if (/glycomet/i.test(med.brandName)) return 'Metformin Hydrochloride Prolonged-Release Tablets IP 500mg';
    if (/gluconorm/i.test(med.brandName)) return 'Metformin Hydrochloride Sustained-Release Tablets IP 500mg';
    if (/telma-h/i.test(med.brandName)) return 'Telmisartan & Hydrochlorothiazide Tablets IP 40mg/12.5mg';
    if (/telma|tazloc|telmikind/i.test(med.brandName)) return 'Telmisartan Tablets IP 40mg';
    if (/losar/i.test(med.brandName)) return 'Losartan Potassium Tablets IP 50mg';
    if (/ecosprin/i.test(med.brandName)) return 'Aspirin Gastro-Resistant Tablets IP 75mg / 150mg';
    if (/clavix/i.test(med.brandName)) return 'Clopidogrel Tablets IP 75mg';
    if (/marevan|warf/i.test(med.brandName)) return 'Warfarin Sodium Tablets IP 5mg';
    if (/thyronorm|eltroxin|thyrox/i.test(med.brandName)) return 'Levothyroxine Sodium Tablets IP 50mcg / 100mcg';
    if (/augmentin/i.test(med.brandName)) return 'Amoxicillin & Potassium Clavulanate Tablets IP 625 Duo';
    if (/azithral/i.test(med.brandName)) return 'Azithromycin Tablets IP 500mg';
    if (/monocef/i.test(med.brandName)) return 'Ceftriaxone Sodium Injection IP 1g';
    if (/taxim-o/i.test(med.brandName)) return 'Cefixime Tablets IP 200mg';
    if (/ciplox|cifran/i.test(med.brandName)) return 'Ciprofloxacin Hydrochloride Tablets IP 500mg';
    if (/allegra/i.test(med.brandName)) return 'Fexofenadine Hydrochloride Tablets IP 120mg';
    if (/cheston\s*cold/i.test(med.brandName)) return 'Cetirizine, Paracetamol & Phenylephrine Hydrochloride IP';
    if (/okacet/i.test(med.brandName)) return 'Cetirizine Hydrochloride Tablets IP 10mg';
    if (/montair\s*lc/i.test(med.brandName)) return 'Montelukast Sodium & Levocetirizine Dihydrochloride IP';
    if (/sinarest/i.test(med.brandName)) return 'Paracetamol, Phenylephrine & Chlorpheniramine Maleate IP';
    if (/shelcal/i.test(med.brandName)) return 'Calcium Carbonate & Vitamin D3 Tablets IP 500mg';
    if (/supradyn/i.test(med.brandName)) return 'Daily Multivitamins with Essential Minerals Tablets IP';
    if (/dexorange/i.test(med.brandName)) return 'Ferric Ammonium Citrate, Vitamin B12 & Folic Acid Syrup/Cap IP';
    if (/evion\s*400|evion/i.test(med.brandName)) return 'Tocopheryl Acetate Capsules IP 400mg (Vitamin E)';
    if (/becosules/i.test(med.brandName)) return 'Vitamin B-Complex with Vitamin C & Zinc Capsules IP';
    if (/neurobion/i.test(med.brandName)) return 'Vitamin B1, B6 & B12 (Neurotropic Vitamins) Tablets IP';
    if (/limcee/i.test(med.brandName)) return 'Ascorbic Acid (Vitamin C) Chewable Tablets IP 500mg';
    if (/combiflam/i.test(med.brandName)) return 'Ibuprofen & Paracetamol Tablets IP 400mg/325mg';
    if (/brufen/i.test(med.brandName)) return 'Ibuprofen Tablets IP 400mg';
    if (/voveran/i.test(med.brandName)) return 'Diclofenac Sodium Gastro-Resistant Tablets IP 50mg';
    if (/zerodol/i.test(med.brandName)) return 'Aceclofenac Tablets IP 100mg';
    if (/amlong/i.test(med.brandName)) return 'Amlodipine Besylate Tablets IP 5mg';
    if (/lanoxin/i.test(med.brandName)) return 'Digoxin Tablets IP 0.25mg';

    return `${med.genericSalt} IP`;
  }

  // Fallbacks for standard clinical generic names
  if (/atorvastatin/i.test(query)) return 'Atorvastatin Calcium IP 10mg / 20mg';
  if (/paracetamol|acetaminophen/i.test(query)) return 'Paracetamol IP 650mg';
  if (/metformin/i.test(query)) return 'Metformin Hydrochloride Prolonged-Release IP 500mg';
  if (/telmisartan|losartan|lisinopril/i.test(query)) return 'Telmisartan / Losartan Tablets IP 40mg';
  if (/warfarin/i.test(query)) return 'Warfarin Sodium Tablets IP 5mg';
  if (/levothyroxine/i.test(query)) return 'Levothyroxine Sodium Tablets IP 50mcg';
  if (/ciprofloxacin|tetracycline/i.test(query)) return 'Ciprofloxacin Hydrochloride Tablets IP 500mg';
  if (/ibuprofen/i.test(query)) return 'Ibuprofen Tablets IP 400mg';
  if (/iron/i.test(query)) return 'Ferrous Mineral & Folic Acid IP';
  if (/digoxin/i.test(query)) return 'Digoxin Tablets IP 0.25mg';

  return `${brandName || String(drugId)} (Salt IP Formulation)`;
}
