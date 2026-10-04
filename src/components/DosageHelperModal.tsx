import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Check, 
  Trash2, 
  Bookmark, 
  Sun, 
  Moon, 
  Utensils, 
  Info,
  Calendar,
  Pill
} from 'lucide-react';
import type { DrugId } from '../types';
import { 
  DOSAGE_GUIDELINES, 
  getSavedDosages, 
  saveDosageReminder, 
  removeSavedDosage, 
  type SavedDosageReminder 
} from '../utils/dosageGuidelines';
import { tactileTapPhysics, chipTapPhysics } from '../utils/motion';

interface DosageHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDrug?: DrugId | null;
  onSelectSavedDrug?: (drug: DrugId) => void;
}

export const DosageHelperModal: React.FC<DosageHelperModalProps> = ({
  isOpen,
  onClose,
  activeDrug,
  onSelectSavedDrug,
}) => {
  const [savedList, setSavedList] = useState<SavedDosageReminder[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('08:00');
  const [justSaved, setJustSaved] = useState<boolean>(false);

  const currentDrugId = activeDrug || 'Atorvastatin';
  const guideline = DOSAGE_GUIDELINES[currentDrugId] || DOSAGE_GUIDELINES['Atorvastatin'];

  useEffect(() => {
    if (isOpen) {
      const list = getSavedDosages();
      setSavedList(list);
      const existing = list.find((item) => item.drugId === activeDrug);
      if (existing) {
        setSelectedTime(existing.customReminderTime);
      } else {
        setSelectedTime(guideline.idealTime || '08:00');
      }
      setJustSaved(false);
    }
  }, [isOpen, activeDrug, guideline]);

  const isCurrentSaved = savedList.some((item) => item.drugId === currentDrugId);

  const handleSaveCurrent = () => {
    const updated = saveDosageReminder(currentDrugId, selectedTime);
    setSavedList(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2400);
  };

  const handleRemove = (drugId: DrugId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = removeSavedDosage(drugId);
    setSavedList(updated);
  };

  const getTimeIcon = (type: string) => {
    switch (type) {
      case 'Morning':
        return <Sun className="w-4 h-4 text-amber-600" />;
      case 'Evening':
        return <Moon className="w-4 h-4 text-blue-800" />;
      case 'With Meals':
        return <Utensils className="w-4 h-4 text-emerald-700" />;
      default:
        return <Clock className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm p-5 sm:p-6 z-10 my-8 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="dosage-modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-md bg-teal-700 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="dosage-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    Clinical Dosage Schedule & Reminders
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                    Recommended administration timing based on pharmacokinetic monographs.
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                aria-label="Close dosage schedule dialog"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Active Medication Guidance Card */}
            <div className="mt-4 space-y-3.5">
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Target Medication:
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                      {guideline.drugName}
                    </h4>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {getTimeIcon(guideline.bestTimeOfDay)}
                    <span>Optimal Time: {guideline.bestTimeOfDay}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5 font-bold">
                      Administration Instruction:
                    </strong>
                    <p className="text-slate-700 dark:text-slate-300">
                      {guideline.administrationRule}
                    </p>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-900 dark:text-slate-100 block mb-0.5 font-bold">
                      Food & Meal Coordination:
                    </strong>
                    <p className="text-slate-700 dark:text-slate-300">
                      {guideline.foodGuideline}
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 dark:bg-slate-800/70 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5 font-semibold">
                      Pharmacological Basis:
                    </strong>
                    <p>{guideline.clinicalRationale}</p>
                  </div>
                </div>

                {/* Save to Local Storage Controls */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <label htmlFor="reminder-time-input" className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Daily Time:
                    </label>
                    <input
                      id="reminder-time-input"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="h-9 px-2.5 text-xs sm:text-sm font-semibold rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-teal-600 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    whileTap={tactileTapPhysics}
                    type="button"
                    onClick={handleSaveCurrent}
                    className={`h-10 px-4 rounded-md font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
                      isCurrentSaved
                        ? 'bg-teal-800 text-white'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                  >
                    {isCurrentSaved ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{justSaved ? 'Schedule Updated!' : 'Saved in Daily Schedule'}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Save to My Daily List</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Saved Schedule List */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2 px-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    <span>My Saved Medications ({savedList.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Stored securely in your browser
                  </span>
                </div>

                {savedList.length === 0 ? (
                  <div className="p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm">
                    No medications saved yet. Tap "Save to My Daily List" above to track your daily dosing schedule.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedList.map((item) => {
                      const itemGuide = DOSAGE_GUIDELINES[item.drugId];
                      return (
                        <div
                          key={item.drugId}
                          onClick={() => onSelectSavedDrug && onSelectSavedDrug(item.drugId)}
                          className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-400 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
                              <Pill className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                                {itemGuide?.drugName || item.drugId}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                Reminder: <strong className="text-teal-700 dark:text-teal-400">{item.customReminderTime}</strong> • {itemGuide?.bestTimeOfDay || 'Daily'}
                              </div>
                            </div>
                          </div>

                          <motion.button
                            whileTap={chipTapPhysics}
                            type="button"
                            onClick={(e) => handleRemove(item.drugId, e)}
                            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label={`Remove ${itemGuide?.drugName || item.drugId} reminder`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                <p>
                  Dosage guidance is provided based on standard clinical pharmacology reference monographs. Always follow specific prescription dosing instructions from your personal physician or pharmacist.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
