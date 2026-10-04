import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Activity, Layers, FileText } from 'lucide-react';
import type { InteractionAnalysis } from '../types';

interface ChemistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: InteractionAnalysis | null;
}

export const ChemistryModal: React.FC<ChemistryModalProps> = ({
  isOpen,
  onClose,
  analysis
}) => {
  if (!analysis) return null;

  const chem = analysis.molecularChemistry;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Solid Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60"
          />

          {/* Clean Clinical Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm p-6 z-10 my-8 overflow-hidden"
            role="dialog"
            aria-labelledby="chem-modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-teal-700 dark:text-teal-400" aria-hidden="true" />
                  <h3 id="chem-modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    Biochemical & Molecular Mechanism
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Pharmacological reference: <strong>{analysis?.drug ?? 'Medication'}</strong> with <strong>{analysis?.food ?? 'Food'}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                aria-label="Close mechanism dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-4 space-y-3 text-left">
              {/* Mechanism Class */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 mb-1 text-slate-700 dark:text-slate-300">
                  <Atom className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Mechanism Classification
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  {chem?.mechanismClass || analysis?.mechanismTitle || 'Standard Physiological Pathway'}
                </div>
              </div>

              {/* Affected Pathway */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 mb-1 text-slate-700 dark:text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Affected Physiological Pathway
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {chem?.affectedPathway || analysis?.biochemicalDetails?.targetEnzymesOrReceptors || 'Independent physiological absorption & standard organ clearance'}
                </div>
              </div>

              {/* Clinical Summary */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 mb-1 text-slate-700 dark:text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Clinical Chemical Summary
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {chem?.chemicalSummary || analysis?.mechanismExplanation || 'No critical biochemical conflict detected.'}
                </p>
              </div>

              {/* Active Compounds & Formulas */}
              {chem?.primaryActiveAgents && chem.primaryActiveAgents.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Active Compounds:
                  </span>
                  {chem.primaryActiveAgents.map((agent, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
                    >
                      {agent}
                    </span>
                  ))}
                  {chem.molecularFormulaDrug && (
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs font-mono font-medium">
                      Formula: {chem.molecularFormulaDrug}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
              >
                Close Reference
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
