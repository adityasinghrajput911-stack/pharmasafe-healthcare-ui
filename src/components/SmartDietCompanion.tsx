import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  HeartHandshake, 
  Search, 
  Check, 
  Pill,
  ShoppingBag,
  Info,
  AlertCircle,
  ShieldCheck,
  X
} from 'lucide-react';
import { standardEaseOut, upwardDriftCard, chipTapPhysics } from '../utils/motion';
import type { DrugId, InteractionAnalysis } from '../types';
import { 
  getTrafficLightDietGuide, 
  type TrafficLightDietPlan 
} from '../data/trafficLightDietGuide';
import { 
  POPULAR_INDIAN_SHORTCUTS, 
  INDIAN_PHARMACY_DATABASE,
  type IndianMedicineEntry
} from '../data/indianPharmacyDatabase';
import { matchCuratedDrug } from '../data/brandDatabase';
import { DRUG_FOOD_INTERACTION_RULES } from '../../catalog';
import { InternetCrossCheck } from './InternetCrossCheck';

interface SmartDietCompanionProps {
  selectedDrug?: DrugId | null;
  selectedBrandName?: string;
  onSelectMedication?: (drugId: DrugId, brandName?: string) => void;
  standalone?: boolean;
  interaction?: InteractionAnalysis | null;
}

export const SmartDietCompanion: React.FC<SmartDietCompanionProps> = ({
  selectedDrug = 'Atorvastatin',
  selectedBrandName,
  onSelectMedication,
  standalone = false,
  interaction = null,
}) => {
  const [activeMedicine, setActiveMedicine] = useState<DrugId>(selectedDrug || 'Atorvastatin');
  const [activeBrand, setActiveBrand] = useState<string | undefined>(selectedBrandName || 'Storvas');
  const [filterQuery, setFilterQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close options dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When props update, sync internal state
  useEffect(() => {
    if (selectedDrug) {
      setActiveMedicine(selectedDrug);
      setActiveBrand(selectedBrandName);
    }
  }, [selectedDrug, selectedBrandName]);

  const dietPlan: TrafficLightDietPlan | null = getTrafficLightDietGuide(activeMedicine, activeBrand);

  // Resolve primary quantitative pharmacokinetic rule for the active medication
  const primaryPkRule = useMemo(() => {
    const matched = matchCuratedDrug(activeBrand || String(activeMedicine));
    if (!matched) return null;
    return DRUG_FOOD_INTERACTION_RULES.find(r => r.drug === matched) || null;
  }, [activeMedicine, activeBrand]);

  const activeImpactPercent =
    typeof interaction?.bioavailabilityImpactPercent === 'number' && interaction.bioavailabilityImpactPercent !== 0
      ? interaction.bioavailabilityImpactPercent
      : primaryPkRule?.bioavailabilityImpactPercent ?? 0;

  const activeChemicalEquation =
    (interaction?.bioavailabilityImpactPercent && interaction.chemicalEquation)
      ? interaction.chemicalEquation
      : primaryPkRule?.chemicalEquation ??
        `${activeBrand || activeMedicine} + Balanced Diet -> Uncomplexed Solute -> Standard Enterocyte Uptake (0% ΔF)`;

  const activeReactionMechanism =
    (interaction?.bioavailabilityImpactPercent && interaction.reactionMechanism)
      ? interaction.reactionMechanism
      : primaryPkRule?.reactionMechanism ??
        'Zero documented covalent enzyme inactivation, divalent cation chelation, or competitive receptor antagonism with standard daily foods.';

  const activeImpactBadgeLabel =
    activeImpactPercent === 0
      ? '0% Bioavailability Shift'
      : activeImpactPercent < 0
      ? `${activeImpactPercent}% Bioavailability Drop`
      : `+${activeImpactPercent}% Concentration Surge`;

  const handleMedicineChange = (drugId: DrugId, brandName?: string) => {
    setActiveMedicine(drugId);
    setActiveBrand(brandName);
    if (onSelectMedication) {
      onSelectMedication(drugId, brandName);
    }
  };

  // Full Indian Pharmacy Database autocomplete search results
  const searchResults = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) {
      return INDIAN_PHARMACY_DATABASE.slice(0, 10);
    }
    return INDIAN_PHARMACY_DATABASE.filter(m =>
      m.brandName.toLowerCase().includes(q) ||
      m.genericSalt.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.aliases.some(a => a.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [filterQuery]);

  const filteredShortcuts = POPULAR_INDIAN_SHORTCUTS.filter(s =>
    !filterQuery.trim() ||
    s.brandName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.genericSalt.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Graceful fallback safeguard if data is ever missing
  if (!dietPlan && !interaction) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 sm:p-8 text-center shadow-sm space-y-3">
        <AlertCircle className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          Data Unavailable
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Dietary safety and nutritional guidelines are temporarily unavailable for this selection. Please choose an active medication from the list.
        </p>
      </div>
    );
  }

  const isCriticalInteraction = interaction?.status === 'CRITICAL' || interaction?.isCritical;
  const isSafeInteraction = interaction?.status === 'SAFE' || (!isCriticalInteraction && interaction?.status !== undefined);

  return (
    <div className="w-full space-y-5">
      {/* Companion Header Banner */}
      <motion.div 
        variants={upwardDriftCard}
        className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-300 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
      >
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>Smart Food Companion</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Your Safe Diet Guide
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A simple 3-tier traffic light breakdown of foods to avoid, foods to space apart, and daily foods that are completely safe to enjoy with your medicine.
          </p>

          {interaction && (
            <div className={`mt-2.5 p-3.5 rounded-lg border text-sm font-medium flex items-center gap-2.5 ${
              isCriticalInteraction
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-100'
                : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
            }`}>
              {isCriticalInteraction ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              <div>
                <span className="font-bold block">
                  {interaction?.status === 'CRITICAL' ? 'Critical Alert' : 'Active Safe Combination'}: {interaction?.drug ?? 'Medication'} + {interaction?.food ?? 'Food'}
                </span>
                <span className="text-xs opacity-90 block mt-0.5">
                  {interaction?.reason ?? interaction?.action ?? 'Standard diet guidelines apply.'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Active Pill Badge */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shrink-0 max-w-xs w-full space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>Currently Active Guide For:</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
            {activeBrand || activeMedicine}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
            {dietPlan?.genericSalt ?? 'Standard IP Formulation'}
          </div>
        </div>
      </motion.div>

      {/* Standalone Quick Medicine Switcher */}
      {standalone && (
        <motion.div 
          variants={upwardDriftCard}
          className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-300 dark:border-slate-800 shadow-sm space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-teal-600" />
              <span>Select Your Medication:</span>
            </span>

            <div ref={searchContainerRef} className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                role="combobox"
                aria-expanded={isDropdownOpen}
                aria-controls="diet-medicine-options"
                aria-autocomplete="list"
                value={filterQuery}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setFilterQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  } else if (e.key === 'Enter' && searchResults.length > 0) {
                    const first = searchResults[0];
                    handleMedicineChange(first.mappedCuratedDrugId || first.brandName, first.brandName);
                    setFilterQuery('');
                    setIsDropdownOpen(false);
                  }
                }}
                placeholder="Filter Indian brands (e.g. Pan-D, Dolo, Telma)..."
                className="w-full h-9 pl-9 pr-8 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:border-teal-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
              {filterQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setFilterQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                  aria-label="Clear medication search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Autocomplete Medication Options Dropdown Listbox */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    id="diet-medicine-options"
                    role="listbox"
                    initial={{ opacity: 0, y: 4, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.99 }}
                    transition={{ duration: 0.15, ease: standardEaseOut }}
                    className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xl max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800"
                  >
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                      <span>
                        {filterQuery ? `Matching Medications (${searchResults.length})` : 'Popular Indian Medicines'}
                      </span>
                      <span className="text-[11px] font-normal text-slate-500">Tap to load diet guide</span>
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="p-5 text-center text-slate-500 dark:text-slate-400">
                        <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-1.5" />
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          No matching medication found
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Try searching Indian brands like Pan-D, Dolo 650, Telma, Thyronorm, Shelcal.
                        </p>
                      </div>
                    ) : (
                      searchResults.map((item) => {
                        const isSelected = activeBrand?.toLowerCase() === item.brandName.toLowerCase();

                        return (
                          <motion.button
                            key={item.id}
                            whileTap={chipTapPhysics}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              handleMedicineChange(item.mappedCuratedDrugId || item.brandName, item.brandName);
                              setFilterQuery('');
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors ${
                              isSelected
                                ? 'bg-teal-50 dark:bg-teal-950/50'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                                  {item.brandName}
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-xs text-teal-700 dark:text-teal-400 font-medium truncate mt-0.5">
                                {item.genericSalt}
                              </p>
                            </div>

                            {isSelected ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-900/60 px-2 py-0.5 rounded-md shrink-0">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-teal-600 shrink-0">
                                View Guide →
                              </span>
                            )}
                          </motion.button>
                        );
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {filteredShortcuts.map((item) => {
              const isSelected = activeBrand === item.brandName || (!activeBrand && activeMedicine === item.mappedDrugId);
              return (
                <motion.button
                  key={item.label}
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => handleMedicineChange(item.mappedDrugId, item.brandName)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 ring-1 ring-teal-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-teal-400'
                  }`}
                >
                  <span>{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* The 3-Tier Vertical "Traffic Light" Card System */}
      <div className="space-y-4">

        {/* 🔴 Section 1: "Strictly Avoid" (Red Zone) */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: standardEaseOut }}
          className="rounded-xl p-5 sm:p-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 shadow-sm space-y-4"
          role="region"
          aria-label="Strictly Avoid Red Zone"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rose-200 dark:border-rose-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                  Red Zone • Safety Alert
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-rose-950 dark:text-rose-100 tracking-tight">
                  Strictly Avoid
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-md border shadow-2xs ${
                  activeImpactPercent === 0
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : activeImpactPercent < 0
                    ? 'bg-rose-600 text-white border-rose-700'
                    : 'bg-red-700 text-white border-red-800'
                }`}
              >
                {activeImpactBadgeLabel}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-950 dark:text-rose-100 border border-rose-300 dark:border-rose-800">
                {primaryPkRule ? primaryPkRule.severity : 'High Risk Conflict'}
              </span>
            </div>
          </div>

          {/* Clean Flat Tags with Emojis */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Hazardous Foods & Beverages:
            </div>
            <div className="flex flex-wrap gap-2">
              {(dietPlan?.redZone?.foods ?? []).map((food, idx) => (
                <div 
                  key={idx}
                  className="min-h-[40px] px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm sm:text-base font-semibold"
                >
                  <span className="text-lg" aria-hidden="true">{food?.emoji ?? '⚠️'}</span>
                  <span>{food?.name ?? 'Item'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brief Reason Why */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Why It Happens (Biological Mechanism):</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-rose-950 dark:text-rose-100 leading-relaxed">
              {dietPlan?.redZone?.reasonWhy ?? 'Follow standard prescription precautions.'}
            </p>
          </div>

          {/* Dedicated Code-Style Box: Molecular & Chemical Reaction Equation */}
          <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
            <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-400">
                Molecular &amp; Chemical Reaction Equation
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {primaryPkRule ? primaryPkRule.mechanismClass : 'Stoichiometry / Kinetics'}
              </span>
            </div>
            <pre className="p-3.5 text-xs sm:text-sm font-mono text-emerald-300 whitespace-pre-wrap break-words leading-relaxed">
              <code>{activeChemicalEquation}</code>
            </pre>
            <div className="px-3.5 py-2.5 bg-slate-900/70 border-t border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 leading-relaxed">
              <span className="text-amber-300 font-bold">// Molecular Kinetics: </span>
              {activeReactionMechanism}
            </div>
          </div>
        </motion.div>

        {/* 🟡 Section 2: "Space Out" (Amber Zone / Time Gap) */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: standardEaseOut }}
          className="rounded-xl p-5 sm:p-6 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900 shadow-sm space-y-4"
          role="region"
          aria-label="Space Out Amber Zone"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200 dark:border-amber-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  Amber Zone • Time Buffer Required
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-100 tracking-tight">
                  Space Out
                </h3>
              </div>
            </div>

            <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-md bg-amber-600 text-white tracking-wide">
              {dietPlan?.amberZone?.timeBadge ?? 'Wait at least 2 hours'}
            </span>
          </div>

          {/* Clean Flat Tags with Emojis */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Foods To Keep At A Distance:
            </div>
            <div className="flex flex-wrap gap-2">
              {(dietPlan?.amberZone?.foods ?? []).map((food, idx) => (
                <div 
                  key={idx}
                  className="min-h-[40px] px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm sm:text-base font-semibold"
                >
                  <span className="text-lg" aria-hidden="true">{food?.emoji ?? '⏱️'}</span>
                  <span>{food?.name ?? 'Item'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brief Reason Why */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Safe Timing Rule:</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-100 leading-relaxed">
              {dietPlan?.amberZone?.reasonWhy ?? 'Space medication apart from food as directed.'}
            </p>
          </div>
        </motion.div>

        {/* 🟢 Section 3: "Safe to Enjoy" (Green Zone / Safe Swaps) */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: standardEaseOut }}
          className={`rounded-xl p-5 sm:p-6 border shadow-sm space-y-4 transition-colors ${
            isSafeInteraction
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700'
              : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
          }`}
          role="region"
          aria-label="Safe to Enjoy Green Zone"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  Green Zone • 100% Compatible
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-100 tracking-tight">
                  Safe to Enjoy
                </h3>
              </div>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700">
              Recommended Everyday Staples
            </span>
          </div>

          {/* Clean Flat Tags with Emojis */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Recommended Daily Foods (Zero Drug Clash):
            </div>
            <div className="flex flex-wrap gap-2">
              {(dietPlan?.greenZone?.foods ?? []).map((food, idx) => (
                <div 
                  key={idx}
                  className="min-h-[40px] px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm sm:text-base font-semibold"
                >
                  <span className="text-lg" aria-hidden="true">{food?.emoji ?? '🥗'}</span>
                  <span>{food?.name ?? 'Staple'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brief Reason Why */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nutritionist Note:</span>
            </span>
            <p className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100 leading-relaxed">
              {dietPlan?.greenZone?.reasonWhy ?? 'No critical chemical conflict detected. Enjoy wholesome meals safely.'}
            </p>
          </div>
        </motion.div>

        {/* Live Internet Cross-Check */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: standardEaseOut }}
          className="pt-2"
        >
          <InternetCrossCheck 
            medicineNames={[activeBrand || String(activeMedicine)]} 
          />
        </motion.div>

      </div>
    </div>
  );
};
