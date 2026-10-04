import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Sparkles, 
  AlertTriangle, 
  Pill, 
  ShieldAlert, 
  PhoneCall, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Info,
  HeartPulse
} from 'lucide-react';
import { 
  standardEaseOut, 
  upwardDriftCard, 
  editorialRevealContainer, 
  editorialItem,
  tactileTapPhysics,
  chipTapPhysics
} from '../utils/motion';
import { SYMPTOM_DATABASE } from '../data/symptomDatabase';
import type { SymptomEntry, DrugId } from '../types';

interface SymptomReliefModuleProps {
  onCheckDrugInteraction?: (drugId: DrugId) => void;
}

export const SymptomReliefModule: React.FC<SymptomReliefModuleProps> = ({
  onCheckDrugInteraction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedSymptom: SymptomEntry | null = selectedSymptomId
    ? (SYMPTOM_DATABASE.find(s => s.id === selectedSymptomId) || null)
    : null;

  // Filtered symptoms based on search query
  const filteredSymptoms = SYMPTOM_DATABASE.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.chipLabel.toLowerCase().includes(q) ||
      s.synonyms.some(syn => syn.toLowerCase().includes(q))
    );
  });

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSymptom = (symptomId: string) => {
    if (selectedSymptomId === symptomId) {
      setSelectedSymptomId(null);
    } else {
      setSelectedSymptomId(symptomId);
    }
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro Overview Card */}
      <motion.div 
        variants={upwardDriftCard}
        className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-300 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
      >
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Symptom Relief & Home Care Protocol</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How are you feeling today?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Instant evidence-based OTC medicines, verified home remedies, and clinical red-flag warnings for common everyday symptoms.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1 shrink-0 max-w-xs">
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Dual Care Approach:</span>
          </div>
          <p>• <strong className="text-slate-900 dark:text-slate-100">Safe OTC Meds:</strong> Standard universal doses.</p>
          <p>• <strong className="text-slate-900 dark:text-slate-100">Instant Home Care:</strong> When no meds are near.</p>
          <p>• <strong className="text-slate-900 dark:text-slate-100">Red Flags:</strong> When to rush to a doctor.</p>
        </div>
      </motion.div>

      {/* 1. The Symptom Search Interface */}
      <motion.section 
        variants={upwardDriftCard}
        ref={containerRef}
        aria-label="Symptom Selection"
        className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-300 dark:border-slate-800 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <label 
            htmlFor="symptom-search-input" 
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-teal-700 text-white text-xs font-bold">
              1
            </span>
            <span>Step 1: How are you feeling right now?</span>
          </label>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            Step 1 of 1
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative w-full rounded-lg">
          <Search 
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
            aria-hidden="true" 
          />

          <input
            id="symptom-search-input"
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isDropdownOpen}
            aria-controls="symptom-suggestions-list"
            aria-autocomplete="list"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isDropdownOpen) setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="What are you feeling? (e.g., Fever, Acidity, Headache, Cough)"
            className="w-full h-11 pl-10 pr-10 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:border-teal-600 focus:outline-none transition-colors shadow-sm placeholder:text-slate-400 placeholder:font-normal"
          />

          {searchQuery && (
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md z-10"
              aria-label="Clear symptom search"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                id="symptom-suggestions-list"
                role="listbox"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: standardEaseOut }}
                className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm max-h-80 overflow-y-auto"
              >
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  <span>Common Medical Symptoms ({filteredSymptoms.length})</span>
                  <span className="text-[11px] font-normal text-slate-500">Tap to load care plan</span>
                </div>

                {filteredSymptoms.length === 0 ? (
                  <div className="p-5 text-center text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-900 dark:text-slate-100">No matching symptom found</p>
                    <p className="text-xs mt-1">Try tapping one of the quick chips below for instant care plans.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredSymptoms.map((symptom) => {
                      const isSelected = symptom.id === selectedSymptomId;
                      return (
                        <motion.button
                          key={symptom.id}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectSymptom(symptom.id)}
                          className={`w-full p-3 text-left flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/60'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{symptom.emoji}</span>
                            <div>
                              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                {symptom.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {symptom.summary}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-teal-700 stroke-[3]" />}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick-Tap Chips */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
            <span>Popular Symptoms:</span>
            <span className="text-[11px] font-normal text-slate-400">Instant Care Guide</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_DATABASE.map((symptom) => {
              const isSelected = symptom.id === selectedSymptomId;
              return (
                <motion.button
                  key={symptom.id}
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => handleSelectSymptom(symptom.id)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md border transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 ring-1 ring-teal-600'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-teal-400'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{symptom.chipLabel}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Symptom Status Card */}
        {selectedSymptom && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg flex items-start justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-teal-700 text-white rounded-md text-lg shrink-0 mt-0.5">
                {selectedSymptom.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Selected Clinical Condition:
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-md">
                    Verified Self-Care
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedSymptom.name}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {selectedSymptom.summary}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSymptomId(null)}
              className="px-2.5 py-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors shrink-0"
            >
              Change
            </button>
          </div>
        )}
      </motion.section>

      {/* 2. The Relief Results Card */}
      <AnimatePresence mode="wait">
        {selectedSymptom && (
          <motion.div
            key={selectedSymptom.id}
            layout
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            transition={{ duration: 0.18, ease: standardEaseOut }}
            className="overflow-hidden"
          >
            <motion.article 
              variants={editorialRevealContainer}
              initial="hidden"
              animate="show"
              className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm overflow-hidden space-y-6 p-5 sm:p-6"
              aria-labelledby="relief-plan-title"
            >
            {/* Main Plan Title Header */}
            <motion.div variants={editorialItem} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-0.5">
                  <span>Verified Home & Pharmacy Relief Protocol</span>
                </div>
                <h3 id="relief-plan-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Care Plan for {selectedSymptom.name}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold shrink-0 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>3-Step Safe Recovery</span>
              </div>
            </motion.div>

            {/* SECTION A: Safe OTC Medicines */}
            <motion.section variants={editorialItem} aria-labelledby="section-a-heading" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <h4 id="section-a-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    Safe Over-The-Counter Options
                  </h4>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                  Universal Generic Medications
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Standard, widely available pharmacy treatments. Always read packaging labels and check for active drug-nutrient interactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {selectedSymptom.otcMedicines.map((med, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-700 text-teal-800 dark:text-teal-300 text-xs font-semibold rounded-md">
                          {med.badge}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          e.g., {med.brandExamples}
                        </span>
                      </div>

                      {/* Pill name */}
                      <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                        <span>{med.name}</span>
                      </div>

                      <p className="text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
                        {med.purpose}
                      </p>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
                        <strong className="text-teal-700 dark:text-teal-400 font-semibold">Dosage & Safety Rule: </strong>
                        {med.dosageAndTiming}
                      </div>
                    </div>

                    {/* Option to check food interaction in PharmaSafe if medication matches database */}
                    {med.linkedDrugId && onCheckDrugInteraction && (
                      <motion.button
                        whileTap={tactileTapPhysics}
                        type="button"
                        onClick={() => onCheckDrugInteraction(med.linkedDrugId!)}
                        className="w-full min-h-[38px] px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-teal-800 dark:text-teal-300 font-semibold text-xs rounded-md border border-teal-300 dark:border-teal-700 flex items-center justify-center gap-1.5 transition-colors mt-1"
                      >
                        <span>Check Food Interactions for {med.linkedDrugId.split('/')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SECTION B: Home & Natural Remedies */}
            <motion.section variants={editorialItem} aria-labelledby="section-b-heading" className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <h4 id="section-b-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  No medicines available? Try this instantly:
                </h4>
              </div>

              <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Scientifically Backed Home & Natural Care</span>
                </div>

                <div className="space-y-2.5">
                  {selectedSymptom.homeRemedies.map((remedy, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/80 space-y-1"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                        <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{remedy.title}</span>
                      </div>

                      <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed pl-7">
                        {remedy.action}
                      </p>

                      <div className="pl-7 text-xs text-emerald-800 dark:text-emerald-400 font-semibold pt-0.5">
                        Biochemical Rationale: {remedy.scienceRationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* SECTION C: The "Red Flag" Warning */}
            <motion.section variants={editorialItem} aria-labelledby="section-c-heading" className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  C
                </div>
                <h4 id="section-c-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  When to see a doctor immediately:
                </h4>
              </div>

              <div className="p-5 bg-rose-50 dark:bg-rose-950/50 rounded-lg border border-rose-300 dark:border-rose-900 text-slate-900 dark:text-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-900 dark:text-red-300">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Medical Safety Warning & Emergency Red Flags</span>
                </div>

                <ul className="space-y-2">
                  {selectedSymptom.redFlags.map((flag, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start gap-2.5 bg-white dark:bg-slate-900 p-3 rounded-lg border border-rose-200 dark:border-slate-800"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                      <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        {flag}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Emergency Action Strip */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-rose-200 dark:border-rose-900">
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {selectedSymptom.emergencyContactText || 'If any red flags occur, seek hospital emergency care without delay.'}
                  </p>
                  
                  <motion.a
                    whileTap={tactileTapPhysics}
                    href="tel:112"
                    className="min-h-[42px] px-5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Emergency (112 / 911)</span>
                  </motion.a>
                </div>
              </div>
            </motion.section>

          </motion.article>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
