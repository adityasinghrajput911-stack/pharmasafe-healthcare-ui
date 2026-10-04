import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-4 print:hidden">
      {/* Relocated Clinical Trust Badges (Preserving medical authority without crowding mobile viewport) */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-teal-700 text-white shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100 block sm:inline">
              Verified Clinical Pharmacology Guidelines
            </span>
            <span className="hidden sm:inline text-slate-400 mx-2">|</span>
            <span className="text-slate-600 dark:text-slate-400 block sm:inline text-[11px] sm:text-xs">
              Indian Pharmacopoeia (IP) & CDSCO Clinical Safety Guidelines
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>Safety Assessment Engine</span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 font-medium text-slate-700 dark:text-slate-300">
        <div>
          PharmaSafe Clinical Pharmacology & Healthcare Decision Support
        </div>
        <div>
          Compliant with WCAG 2.1 AA Accessibility Guidelines
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Medical Disclaimer: PharmaSafe provides pharmacology reference information synthesized from standard clinical pharmacology guidelines for patient and caregiver education. It is not a replacement for professional medical advice, clinical diagnosis, or personalized treatment. Always consult your prescribing physician or licensed pharmacist before discontinuing or altering any medication schedule.
      </p>
    </footer>
  );
};
