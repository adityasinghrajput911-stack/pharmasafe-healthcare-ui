import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertOctagon, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { chipTapPhysics } from '../utils/motion';
import type { DrugId, FoodId } from '../types';

interface FriendlyGuideProps {
  onSelect: (drug: DrugId, food: FoodId) => void;
}

interface GuideItem {
  drug: DrugId;
  food: FoodId;
  title: string;
  tag: string;
  status: 'CRITICAL' | 'PRECAUTION';
  statusText: string;
  mechanism: string;
  recommendation: string;
}

const GUIDES: GuideItem[] = [
  {
    drug: 'Atorvastatin',
    food: 'Grapefruit / Grapefruit Juice',
    title: 'Atorvastatin & Grapefruit / Seville Oranges',
    tag: 'CYP3A4 Enzyme Inactivation',
    status: 'CRITICAL',
    statusText: 'CRITICAL RISK: AVOID COMBINATION',
    mechanism: 'Furanocoumarins in grapefruit irreversibly block intestinal enterocyte CYP3A4 enzymes. This stops first-pass metabolic breakdown, causing medication plasma concentrations to surge up to 330%, significantly elevating the risk of severe muscle breakdown (rhabdomyolysis) and acute renal injury.',
    recommendation: 'Completely eliminate grapefruit, grapefruit juice, and Seville oranges while on Atorvastatin. Safe citrus alternatives include standard sweet Navel or Valencia oranges.'
  },
  {
    drug: 'Tetracycline / Ciprofloxacin',
    food: 'Milk / Dairy Products',
    title: 'Tetracycline / Ciprofloxacin & Dairy Products',
    tag: 'Multivalent Cation Chelation',
    status: 'PRECAUTION',
    statusText: 'PRECAUTION: TIME BUFFER REQUIRED',
    mechanism: 'Calcium (Ca²⁺) and magnesium cations present in milk, yogurt, and cheese bind tightly to the antibiotic molecule in the stomach lumen. This forms an insoluble chelate complex that intestinal enterocytes cannot absorb, reducing drug bioavailability by up to 85% and causing treatment failure.',
    recommendation: 'Take the antibiotic dose with water at least 2 hours before or 4 to 6 hours after consuming milk, dairy, calcium-fortified plant milks, or antacid tablets.'
  },
  {
    drug: 'Warfarin',
    food: 'Spinach, Kale & Broccoli (Vitamin K Rich)',
    title: 'Warfarin & Dark Leafy Greens (Vitamin K)',
    tag: 'VKORC1 Anticoagulation Reversal',
    status: 'PRECAUTION',
    statusText: 'PRECAUTION: TIME BUFFER REQUIRED',
    mechanism: 'Warfarin produces anticoagulation by blocking the VKORC1 enzyme to deplete active Vitamin K. Consuming sudden high amounts of dietary phylloquinone (Vitamin K1) bypasses the block, rapidly restoring clotting factors and precipitating a dangerous drop in INR that increases blood clot and stroke risk.',
    recommendation: 'Maintain a consistent daily intake of greens rather than making sudden spikes or reductions. Low Vitamin K produce includes cucumbers, zucchini, and carrots.'
  },
  {
    drug: 'Lisinopril / Losartan',
    food: 'Bananas & Salt Substitutes (High Potassium)',
    title: 'Lisinopril / Losartan & High Potassium Foods',
    tag: 'Renal Potassium Excretion Reduction',
    status: 'PRECAUTION',
    statusText: 'PRECAUTION: TIME BUFFER REQUIRED',
    mechanism: 'ACE inhibitors and ARBs suppress the renin-angiotensin-aldosterone axis, reducing the kidneys\' ability to excrete excess potassium. Combining them with potassium chloride table salt substitutes (NoSalt) or excessive bananas can induce toxic hyperkalemia, triggering cardiac arrhythmias.',
    recommendation: 'Avoid potassium chloride (KCl) salt substitutes. Use lemon, garlic, and herbs for low-sodium seasoning. Enjoy bananas in steady moderation rather than daily multiples.'
  },
  {
    drug: 'Levothyroxine',
    food: 'Coffee / Black Tea',
    title: 'Levothyroxine & Morning Coffee or Tea',
    tag: 'Physical Adsorption & Rapid Transit',
    status: 'PRECAUTION',
    statusText: 'PRECAUTION: TIME BUFFER REQUIRED',
    mechanism: 'Chlorogenic acids and soluble compounds in coffee physically adsorb sodium levothyroxine molecules in the stomach, while caffeine accelerates gut transit. This sweeps unabsorbed thyroid hormone past the small intestine, cutting therapeutic absorption by 30% to 55%.',
    recommendation: 'Take Levothyroxine immediately upon waking with a full glass of plain water. Wait a minimum of 60 minutes before drinking espresso, coffee, black tea, or eating breakfast.'
  },
  {
    drug: 'Metformin',
    food: 'Alcohol / Beer / Wine',
    title: 'Metformin & Alcoholic Beverages',
    tag: 'Hepatic Lactate Clearance Blockade',
    status: 'CRITICAL',
    statusText: 'CRITICAL RISK: AVOID COMBINATION',
    mechanism: 'Ethanol oxidation in the liver shifts the NADH/NAD⁺ balance to suppress gluconeogenesis and lactate clearance. In combination with Metformin\'s inhibition of mitochondrial complex I, systemic lactic acid can accumulate rapidly, precipitating life-threatening metabolic lactic acidosis.',
    recommendation: 'Avoid binge drinking or consuming alcohol on an empty stomach while taking Metformin. Strictly limit social alcohol intake and always consume with a meal.'
  },
  {
    drug: 'Digoxin',
    food: 'Black Licorice (Natural Glycyrrhizin)',
    title: 'Digoxin & Traditional Black Licorice',
    tag: 'Glycyrrhizin-Induced Potassium Depletion',
    status: 'CRITICAL',
    statusText: 'CRITICAL RISK: AVOID COMBINATION',
    mechanism: 'Natural glycyrrhizic acid inactivates renal 11β-HSD2 enzymes, triggering profound urinary potassium loss. Hypokalemia increases myocardial sensitivity to Digoxin, drastically lowering the threshold for fatal cardiac ventricular arrhythmias.',
    recommendation: 'Strictly avoid traditional black licorice candy, teas, and herbal extracts containing natural glycyrrhizin. Deglycyrrhizinated licorice (DGL) or anise sweets are safe alternatives.'
  },
  {
    drug: 'Ibuprofen / NSAIDs',
    food: 'Alcohol / Beer / Wine',
    title: 'Ibuprofen / NSAIDs & Alcohol',
    tag: 'Gastric Mucosal Cytoprotection Breakdown',
    status: 'CRITICAL',
    statusText: 'CRITICAL RISK: AVOID COMBINATION',
    mechanism: 'NSAIDs block protective gastric prostaglandins, thinning the stomach mucus lining, while ethanol exerts direct topical cytotoxicity and accelerates acid diffusion. Co-administration significantly multiplies the risk of sudden gastrointestinal bleeding and peptic ulceration.',
    recommendation: 'Do not consume alcoholic drinks when taking oral NSAID pain relievers. Always take NSAID tablets with meals and water to provide a protective stomach buffer.'
  },
  {
    drug: 'Iron Supplements',
    food: 'Coffee / Black Tea',
    title: 'Iron Supplements & Tannins / Tea',
    tag: 'Polyphenol Insoluble Chelation',
    status: 'PRECAUTION',
    statusText: 'PRECAUTION: TIME BUFFER REQUIRED',
    mechanism: 'Tannins and chlorogenic polyphenols in tea, coffee, and cocoa form insoluble coordination bonds with ferrous and ferric ions, reducing intestinal iron transport by up to 70% and leaving anemia unresolved.',
    recommendation: 'Take iron on an empty stomach with plain water or Vitamin C-rich orange juice (which enhances absorption). Separate coffee and tea by at least 2 hours.'
  },
  {
    drug: 'MAO Inhibitors',
    food: 'Aged Cheese & Fermented Foods (High Tyramine)',
    title: 'MAO Inhibitors & Aged Cheese ("Cheese Effect")',
    tag: 'Sympathomimetic Hypertensive Crisis',
    status: 'CRITICAL',
    statusText: 'CRITICAL RISK: AVOID COMBINATION',
    mechanism: 'Inhibition of gut and hepatic MAO-A allows intact absorption of dietary tyramine from aged, fermented foods. Circulating tyramine displaces stored norepinephrine into synapses, causing severe vasoconstriction and life-threatening malignant hypertension.',
    recommendation: 'Strictly eliminate aged cheeses (cheddar, parmesan, gorgonzola), cured meats, and tap beer during MAOI treatment and for 14 days after cessation. Fresh cheeses (ricotta, cottage cheese) are safe.'
  }
];

export const FriendlyGuide: React.FC<FriendlyGuideProps> = ({ onSelect }) => {
  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-md bg-teal-700 text-white flex items-center justify-center font-bold shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Common Medication & Food Safety Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Clear clinical summaries explaining biological timing and practical prevention guidelines for common medication pairings.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {GUIDES.map((item, idx) => (
          <article
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden shadow-sm hover:border-teal-500 transition-colors"
          >
            {/* Card Header: Solid status banner */}
            <div className={`px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
              item.status === 'CRITICAL'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="flex items-center gap-2">
                {item.status === 'CRITICAL' ? (
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {item.statusText}
                </span>
              </div>

              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {item.tag}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-3.5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                    Biological Mechanism
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.mechanism}
                  </p>
                </div>

                <div className="p-4 bg-teal-50/50 dark:bg-slate-800/60 rounded-lg border border-teal-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 block mb-1">
                    Prevention & Dietary Advice
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.recommendation}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1 flex justify-end">
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => onSelect(item.drug, item.food)}
                  className="h-9 px-4 text-xs sm:text-sm font-semibold text-teal-800 dark:text-teal-200 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 border border-teal-300 dark:border-teal-700 rounded-md flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Check this pair in primary scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                </motion.button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
