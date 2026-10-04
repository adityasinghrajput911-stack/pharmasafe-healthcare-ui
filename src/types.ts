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

export interface PillItem {
  id: string;
  brandName: string;
  genericSalt: string;
  category: string;
  dosageForm?: string;
  popularDose?: string;
  mappedCuratedDrugId?: CuratedDrugId | null;
}

export interface DrugClashAlert {
  id: string;
  drugA: string;
  drugB: string;
  saltA: string;
  saltB: string;
  severity: 'CRITICAL' | 'MODERATE' | 'CAUTION';
  title: string;
  plainExplanation: string;
  clinicalWhy: string;
  actionableFix: string;
}

export interface ScheduledPill {
  pill: PillItem;
  timingNote: string;
  isSeparatedDueToClash?: boolean;
  separationReason?: string;
}

export interface ScheduleSlot {
  id: 'morning' | 'afternoon' | 'night';
  period: string;
  subtitle: string;
  timingWindow: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  pills: ScheduledPill[];
}

export interface MultiMedicineAnalysisResult {
  hasClashes: boolean;
  maxSeverity: 'CRITICAL' | 'MODERATE' | 'SAFE';
  totalClashes: number;
  clashes: DrugClashAlert[];
  schedule: ScheduleSlot[];
  overallHeadline: string;
  analyzedPills: PillItem[];
}

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

export interface SaferAlternativeFood {
  name: string;
  rationale: string;
  category: string;
  icon?: string;
  nutritionNote?: string;
}

export interface TimingBuffer {
  type: 'BUFFER_WINDOW' | 'COMPLETE_AVOIDANCE' | 'ONGOING_PRECAUTION' | 'STANDARD_SCHEDULE';
  badgeText: string;
  shortLabel: string;
  bufferHours?: string;
}

export interface EmergencyFirstAidInfo {
  universalSteps: string[];
  symptomWatch: string;
  primaryEmergencyNumber: string;
  poisonControlNumber: string;
  poisonControlLabel: string;
}

export interface MolecularChemistry {
  mechanismClass: string;
  affectedPathway: string;
  chemicalSummary: string;
  molecularFormulaDrug?: string;
  primaryActiveAgents?: string[];
}

export interface ClinicalEvidenceReference {
  activeSaltChecked: string;
  biochemicalTarget: string;
  standardReference: string;
  verificationStatus: string;
  databaseBuild: string;
  isDeterministicVerified: boolean;
  unverifiedNotice?: string;
}

export interface InteractionAnalysis {
  drug: DrugId;
  food: FoodId;
  isCritical: boolean;
  status?: 'SAFE' | 'CRITICAL' | 'PRECAUTION' | 'MODERATE' | 'UNVERIFIED' | string;
  category?: 'Enjoy' | 'Strictly Avoid' | 'Space Out' | string;
  action?: string;
  reason?: string;
  isUncuratedLiveDrug?: boolean;
  isIndianPharmacyVerified?: boolean;
  isUnverifiedCombination?: boolean;
  clinicalEvidence?: ClinicalEvidenceReference;
  severity:
    | 'CRITICAL DANGER'
    | 'SEVERE INTERACTION'
    | 'HIGH DANGER'
    | 'MODERATE INTERACTION'
    | 'SAFE COMBINATION'
    | 'UNVERIFIED COMBINATION'
    | string;
  headline: string;
  mechanismTitle: string;
  mechanismExplanation: string;
  timingBuffer: TimingBuffer;
  molecularChemistry: MolecularChemistry;
  biochemicalDetails: {
    molecularEvent: string;
    targetEnzymesOrReceptors: string;
    pharmacokineticImpact: string;
    clinicalConsequences: string[];
    onsetTime: string;
  };
  patientGuidance: {
    saferFoods: SaferAlternativeFood[];
    clinicalAlternatives: string[];
    dosageAndTimingRules: string;
    emergencySymptoms: string[];
    symptomWatch?: string;
  };
  emergencyFirstAid?: EmergencyFirstAidInfo;
  analyzedAt: string;
}

export interface SymptomOtcMedicine {
  name: string;
  brandExamples: string;
  badge: string;
  purpose: string;
  dosageAndTiming: string;
  linkedDrugId?: DrugId;
}

export interface SymptomHomeRemedy {
  title: string;
  action: string;
  scienceRationale: string;
}

export interface SymptomEntry {
  id: string;
  name: string;
  chipLabel: string;
  emoji: string;
  synonyms: string[];
  summary: string;
  quickAdvice: string;
  otcMedicines: SymptomOtcMedicine[];
  homeRemedies: SymptomHomeRemedy[];
  redFlags: string[];
  emergencyContactText?: string;
}
