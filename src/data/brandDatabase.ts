import type { DrugId, CuratedDrugId } from '../types';

export interface BrandEntry {
  brandName: string;
  genericId: DrugId;
  genericDisplayName: string;
  category: string;
  commonDose?: string;
  countryOrRegion?: string;
}

export interface GenericDrugMeta {
  id: DrugId;
  name: string;
  category: string;
  badge: string;
  clinicalClass: string;
  aliases: string[];
  popularBrands: string[];
}

export const GENERIC_DRUGS_META: Record<DrugId, GenericDrugMeta> = {
  'Atorvastatin': {
    id: 'Atorvastatin',
    name: 'Atorvastatin',
    category: 'Cardiovascular / Cholesterol',
    badge: 'HMG-CoA Reductase Inhibitor',
    clinicalClass: 'Statin',
    aliases: ['Lipid Lowering', 'HMG-CoA Reductase Inhibitor', 'Atorva', 'Cholesterol'],
    popularBrands: ['Lipitor', 'Atorva', 'Storvas', 'Lipicure']
  },
  'Tetracycline / Ciprofloxacin': {
    id: 'Tetracycline / Ciprofloxacin',
    name: 'Tetracycline / Ciprofloxacin',
    category: 'Anti-Infective / Antibiotic',
    badge: 'Bacterial Infection Therapy',
    clinicalClass: 'Broad-Spectrum Antibiotic',
    aliases: ['Antibiotic', 'Cipro', 'Fluoroquinolone', 'Tetracycline HCl', 'Ciprofloxacin'],
    popularBrands: ['Sumycin', 'Cipro', 'Ciplox', 'Cifran']
  },
  'Warfarin': {
    id: 'Warfarin',
    name: 'Warfarin',
    category: 'Hematology / Anticoagulant',
    badge: 'Vitamin K Antagonist',
    clinicalClass: 'Blood Thinner',
    aliases: ['Blood Thinner', 'Anticoagulant', 'VKORC1 Antagonist', 'Coumarin'],
    popularBrands: ['Coumadin', 'Jantoven', 'Marevan']
  },
  'Lisinopril / Losartan': {
    id: 'Lisinopril / Losartan',
    name: 'Lisinopril / Losartan',
    category: 'Cardiovascular / Blood Pressure',
    badge: 'RAAS Pathway Blocker',
    clinicalClass: 'ACE Inhibitor / ARB',
    aliases: ['ACE Inhibitor', 'ARB', 'Hypertension', 'Lisinopril', 'Losartan Potassium'],
    popularBrands: ['Zestril', 'Prinivil', 'Cozaar', 'Losar']
  },
  'Levothyroxine': {
    id: 'Levothyroxine',
    name: 'Levothyroxine',
    category: 'Endocrinology / Thyroid Hormone',
    badge: 'Thyroid Hormone Replacement',
    clinicalClass: 'Synthetic T4 Hormone',
    aliases: ['Thyroid', 'T4', 'Hypothyroidism', 'Thyroxine'],
    popularBrands: ['Synthroid', 'Eltroxin', 'Thyronorm', 'Levoxyl']
  },
  'Metformin': {
    id: 'Metformin',
    name: 'Metformin',
    category: 'Endocrinology / Glycemic Control',
    badge: 'Biguanide Antidiabetic',
    clinicalClass: 'Oral Antidiabetic',
    aliases: ['Diabetes', 'Biguanide', 'Blood Sugar', 'Metformin HCl'],
    popularBrands: ['Glucophage', 'Glycomet', 'Fortamet']
  },
  'Digoxin': {
    id: 'Digoxin',
    name: 'Digoxin',
    category: 'Cardiology / Antiarrhythmic',
    badge: 'Cardiac Glycoside',
    clinicalClass: 'Inotropic Agent',
    aliases: ['Digitalis', 'Cardiac Glycoside', 'Atrial Fibrillation', 'Heart Failure'],
    popularBrands: ['Lanoxin', 'Digitek']
  },
  'Ibuprofen / NSAIDs': {
    id: 'Ibuprofen / NSAIDs',
    name: 'Ibuprofen / NSAIDs',
    category: 'Analgesia / Anti-Inflammatory',
    badge: 'Non-Steroidal Anti-Inflammatory',
    clinicalClass: 'NSAID',
    aliases: ['NSAID', 'Painkiller', 'Anti-Inflammatory', 'Ibuprofen', 'Naproxen'],
    popularBrands: ['Advil', 'Motrin', 'Brufen', 'Nurofen']
  },
  'Iron Supplements': {
    id: 'Iron Supplements',
    name: 'Iron Supplements',
    category: 'Hematology / Mineral Therapy',
    badge: 'Hematinic Mineral',
    clinicalClass: 'Iron Salt / Supplement',
    aliases: ['Ferrous Sulfate', 'Ferrous Fumarate', 'Iron', 'Hematinic', 'Anemia'],
    popularBrands: ['Fefol', 'Fer-In-Sol', 'DexOrange']
  },
  'MAO Inhibitors': {
    id: 'MAO Inhibitors',
    name: 'MAO Inhibitors',
    category: 'Psychiatry / Neurological',
    badge: 'Monoamine Oxidase Inhibitor',
    clinicalClass: 'MAOI Antidepressant',
    aliases: ['MAOI', 'Monoamine Oxidase Inhibitor', 'Antidepressant', 'Phenelzine', 'Tranylcypromine'],
    popularBrands: ['Nardil', 'Parnate', 'Marplan']
  },
  'Paracetamol / Acetaminophen': {
    id: 'Paracetamol / Acetaminophen',
    name: 'Paracetamol / Acetaminophen',
    category: 'Analgesia / Antipyretic',
    badge: 'Central Analgesic & Antipyretic',
    clinicalClass: 'Analgesic',
    aliases: ['Paracetamol', 'Acetaminophen', 'APAP', 'Fever', 'Pain Reliever'],
    popularBrands: ['Tylenol', 'Panadol', 'Calpol', 'Dolo 650', 'Crocin']
  }
};

export const BRAND_DATABASE: BrandEntry[] = [
  // 1. Atorvastatin
  { brandName: 'Lipitor', genericId: 'Atorvastatin', genericDisplayName: 'Atorvastatin', category: 'Cardiovascular / Cholesterol' },
  { brandName: 'Atorva', genericId: 'Atorvastatin', genericDisplayName: 'Atorvastatin', category: 'Cardiovascular / Cholesterol' },
  { brandName: 'Storvas', genericId: 'Atorvastatin', genericDisplayName: 'Atorvastatin', category: 'Cardiovascular / Cholesterol' },
  { brandName: 'Lipicure', genericId: 'Atorvastatin', genericDisplayName: 'Atorvastatin', category: 'Cardiovascular / Cholesterol' },

  // 2. Ibuprofen / NSAIDs
  { brandName: 'Advil', genericId: 'Ibuprofen / NSAIDs', genericDisplayName: 'Ibuprofen / NSAIDs', category: 'Analgesia / Anti-Inflammatory' },
  { brandName: 'Motrin', genericId: 'Ibuprofen / NSAIDs', genericDisplayName: 'Ibuprofen / NSAIDs', category: 'Analgesia / Anti-Inflammatory' },
  { brandName: 'Brufen', genericId: 'Ibuprofen / NSAIDs', genericDisplayName: 'Ibuprofen / NSAIDs', category: 'Analgesia / Anti-Inflammatory' },
  { brandName: 'Nurofen', genericId: 'Ibuprofen / NSAIDs', genericDisplayName: 'Ibuprofen / NSAIDs', category: 'Analgesia / Anti-Inflammatory' },

  // 3. Paracetamol / Acetaminophen
  { brandName: 'Tylenol', genericId: 'Paracetamol / Acetaminophen', genericDisplayName: 'Paracetamol / Acetaminophen', category: 'Analgesia / Antipyretic' },
  { brandName: 'Panadol', genericId: 'Paracetamol / Acetaminophen', genericDisplayName: 'Paracetamol / Acetaminophen', category: 'Analgesia / Antipyretic' },
  { brandName: 'Calpol', genericId: 'Paracetamol / Acetaminophen', genericDisplayName: 'Paracetamol / Acetaminophen', category: 'Analgesia / Antipyretic' },
  { brandName: 'Dolo 650', genericId: 'Paracetamol / Acetaminophen', genericDisplayName: 'Paracetamol / Acetaminophen', category: 'Analgesia / Antipyretic' },
  { brandName: 'Crocin', genericId: 'Paracetamol / Acetaminophen', genericDisplayName: 'Paracetamol / Acetaminophen', category: 'Analgesia / Antipyretic' },

  // 4. Levothyroxine
  { brandName: 'Synthroid', genericId: 'Levothyroxine', genericDisplayName: 'Levothyroxine', category: 'Endocrinology / Thyroid Hormone' },
  { brandName: 'Eltroxin', genericId: 'Levothyroxine', genericDisplayName: 'Levothyroxine', category: 'Endocrinology / Thyroid Hormone' },
  { brandName: 'Thyronorm', genericId: 'Levothyroxine', genericDisplayName: 'Levothyroxine', category: 'Endocrinology / Thyroid Hormone' },
  { brandName: 'Levoxyl', genericId: 'Levothyroxine', genericDisplayName: 'Levothyroxine', category: 'Endocrinology / Thyroid Hormone' },

  // 5. Metformin
  { brandName: 'Glucophage', genericId: 'Metformin', genericDisplayName: 'Metformin', category: 'Endocrinology / Glycemic Control' },
  { brandName: 'Glycomet', genericId: 'Metformin', genericDisplayName: 'Metformin', category: 'Endocrinology / Glycemic Control' },
  { brandName: 'Fortamet', genericId: 'Metformin', genericDisplayName: 'Metformin', category: 'Endocrinology / Glycemic Control' },

  // 6. Warfarin
  { brandName: 'Coumadin', genericId: 'Warfarin', genericDisplayName: 'Warfarin', category: 'Hematology / Anticoagulant' },
  { brandName: 'Jantoven', genericId: 'Warfarin', genericDisplayName: 'Warfarin', category: 'Hematology / Anticoagulant' },
  { brandName: 'Marevan', genericId: 'Warfarin', genericDisplayName: 'Warfarin', category: 'Hematology / Anticoagulant' },

  // 7. Lisinopril / Losartan
  { brandName: 'Zestril', genericId: 'Lisinopril / Losartan', genericDisplayName: 'Lisinopril / Losartan', category: 'Cardiovascular / Blood Pressure' },
  { brandName: 'Prinivil', genericId: 'Lisinopril / Losartan', genericDisplayName: 'Lisinopril / Losartan', category: 'Cardiovascular / Blood Pressure' },
  { brandName: 'Cozaar', genericId: 'Lisinopril / Losartan', genericDisplayName: 'Lisinopril / Losartan', category: 'Cardiovascular / Blood Pressure' },
  { brandName: 'Losar', genericId: 'Lisinopril / Losartan', genericDisplayName: 'Lisinopril / Losartan', category: 'Cardiovascular / Blood Pressure' },

  // 8. Tetracycline / Ciprofloxacin
  { brandName: 'Sumycin', genericId: 'Tetracycline / Ciprofloxacin', genericDisplayName: 'Tetracycline / Ciprofloxacin', category: 'Anti-Infective / Antibiotic' },
  { brandName: 'Cipro', genericId: 'Tetracycline / Ciprofloxacin', genericDisplayName: 'Tetracycline / Ciprofloxacin', category: 'Anti-Infective / Antibiotic' },
  { brandName: 'Ciplox', genericId: 'Tetracycline / Ciprofloxacin', genericDisplayName: 'Tetracycline / Ciprofloxacin', category: 'Anti-Infective / Antibiotic' },
  { brandName: 'Cifran', genericId: 'Tetracycline / Ciprofloxacin', genericDisplayName: 'Tetracycline / Ciprofloxacin', category: 'Anti-Infective / Antibiotic' },

  // 9. Digoxin
  { brandName: 'Lanoxin', genericId: 'Digoxin', genericDisplayName: 'Digoxin', category: 'Cardiology / Antiarrhythmic' },
  { brandName: 'Digitek', genericId: 'Digoxin', genericDisplayName: 'Digoxin', category: 'Cardiology / Antiarrhythmic' },

  // 10. MAO Inhibitors
  { brandName: 'Nardil', genericId: 'MAO Inhibitors', genericDisplayName: 'MAO Inhibitors', category: 'Psychiatry / Neurological' },
  { brandName: 'Parnate', genericId: 'MAO Inhibitors', genericDisplayName: 'MAO Inhibitors', category: 'Psychiatry / Neurological' },
  { brandName: 'Marplan', genericId: 'MAO Inhibitors', genericDisplayName: 'MAO Inhibitors', category: 'Psychiatry / Neurological' },

  // 11. Iron Supplements
  { brandName: 'Fefol', genericId: 'Iron Supplements', genericDisplayName: 'Iron Supplements', category: 'Hematology / Mineral Therapy' },
  { brandName: 'Fer-In-Sol', genericId: 'Iron Supplements', genericDisplayName: 'Iron Supplements', category: 'Hematology / Mineral Therapy' },
  { brandName: 'DexOrange', genericId: 'Iron Supplements', genericDisplayName: 'Iron Supplements', category: 'Hematology / Mineral Therapy' }
];

export interface SearchResultItem {
  id: string;
  type: 'brand' | 'generic';
  primaryName: string;
  subText: string;
  genericId: DrugId;
  genericDisplayName: string;
  badge: string;
  category: string;
}

export function searchDrugsAndBrands(query: string): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    const defaultGenerics: SearchResultItem[] = Object.values(GENERIC_DRUGS_META).map((gen) => ({
      id: `generic-${gen.id}`,
      type: 'generic',
      primaryName: gen.name,
      subText: `Generic Active Ingredient • Brands: ${gen.popularBrands.join(', ')}`,
      genericId: gen.id,
      genericDisplayName: gen.name,
      badge: 'Generic Ingredient',
      category: gen.category
    }));
    return defaultGenerics;
  }

  const results: SearchResultItem[] = [];
  const seenIds = new Set<string>();

  // 1. Direct brand matches first
  for (const brand of BRAND_DATABASE) {
    if (brand.brandName.toLowerCase().includes(cleanQuery)) {
      const key = `brand-${brand.brandName}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        results.push({
          id: key,
          type: 'brand',
          primaryName: brand.brandName,
          subText: `Prescription Brand for ${brand.genericDisplayName}`,
          genericId: brand.genericId,
          genericDisplayName: brand.genericDisplayName,
          badge: 'Brand Name',
          category: brand.category
        });
      }
    }
  }

  // 2. Generic matches (name or aliases)
  for (const gen of Object.values(GENERIC_DRUGS_META)) {
    const nameMatches = gen.name.toLowerCase().includes(cleanQuery);
    const aliasMatches = gen.aliases.some((a) => a.toLowerCase().includes(cleanQuery));

    if (nameMatches || aliasMatches) {
      const key = `generic-${gen.id}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        results.push({
          id: key,
          type: 'generic',
          primaryName: gen.name,
          subText: `Generic Compound • Brands: ${gen.popularBrands.slice(0, 3).join(', ')}`,
          genericId: gen.id,
          genericDisplayName: gen.name,
          badge: 'Generic Compound',
          category: gen.category
        });
      }
    }
  }

  // 3. Brands where generic matches query if not already added
  for (const brand of BRAND_DATABASE) {
    if (brand.genericDisplayName.toLowerCase().includes(cleanQuery)) {
      const key = `brand-${brand.brandName}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        results.push({
          id: key,
          type: 'brand',
          primaryName: brand.brandName,
          subText: `Prescription Brand for ${brand.genericDisplayName}`,
          genericId: brand.genericId,
          genericDisplayName: brand.genericDisplayName,
          badge: 'Brand Name',
          category: brand.category
        });
      }
    }
  }

  return results;
}

/**
 * Matches a drug name or chemical query against the 11 curated critical drug monographs
 */
export function matchCuratedDrug(text: string): CuratedDrugId | null {
  const clean = text.toLowerCase().trim();
  if (!clean) return null;

  // Direct matches in curated generics
  for (const [id, meta] of Object.entries(GENERIC_DRUGS_META)) {
    if (meta.name.toLowerCase() === clean || id.toLowerCase() === clean) {
      return id as CuratedDrugId;
    }
    if (clean.includes(meta.name.toLowerCase()) || meta.name.toLowerCase().includes(clean)) {
      return id as CuratedDrugId;
    }
    if (meta.aliases.some((a) => clean.includes(a.toLowerCase()) || a.toLowerCase().includes(clean))) {
      return id as CuratedDrugId;
    }
  }

  // Check brands
  for (const brand of BRAND_DATABASE) {
    if (brand.brandName.toLowerCase() === clean || clean.includes(brand.brandName.toLowerCase())) {
      return brand.genericId as CuratedDrugId;
    }
  }

  // Common pharmacologic & Indian pharmaceutical trade names
  if (/atorva|lipitor|storvas|lipicure|tonact|rozavel/i.test(clean)) return 'Atorvastatin';
  if (/tetra|cipro|ciplox|cifran|fluoroquinolone/i.test(clean)) return 'Tetracycline / Ciprofloxacin';
  if (/warfarin|coumadin|jantoven|marevan|warf/i.test(clean)) return 'Warfarin';
  if (/lisinopril|losartan|telmisartan|telma|tazloc|telmikind|telpres|cozaar|zestril|prinivil|losar/i.test(clean)) return 'Lisinopril / Losartan';
  if (/levothyrox|synthroid|thyroxine|eltroxin|thyronorm|thyrox/i.test(clean)) return 'Levothyroxine';
  if (/metformin|glucophage|glycomet|gluconorm/i.test(clean)) return 'Metformin';
  if (/digoxin|lanoxin/i.test(clean)) return 'Digoxin';
  if (/ibuprofen|advil|motrin|naproxen|aleve|combiflam|brufen|voveran|zerodol|ecosprin|aspirin/i.test(clean)) return 'Ibuprofen / NSAIDs';
  if (/ferrous|iron supplement|dexorange|feronia/i.test(clean)) return 'Iron Supplements';
  if (/phenelzine|tranylcypromine|isocarboxazid|selegiline|mao inhibitor/i.test(clean)) return 'MAO Inhibitors';
  if (/paracetamol|acetaminophen|tylenol|dolo|panadol|calpol|crocin|sumo l|pacimol/i.test(clean)) return 'Paracetamol / Acetaminophen';

  return null;
}
