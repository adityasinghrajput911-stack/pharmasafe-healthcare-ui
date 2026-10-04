import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Sun, 
  Utensils, 
  Moon, 
  Check, 
  Copy, 
  Printer, 
  Sparkles, 
  Pill, 
  ChevronDown, 
  HeartPulse, 
  Info,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { standardEaseOut, editorialRevealContainer, editorialItem, tactileTapPhysics } from '../utils/motion';
import type { MultiMedicineAnalysisResult } from '../types';
import { InternetCrossCheck } from './InternetCrossCheck';

interface ClashResultsAndScheduleProps {
  analysis: MultiMedicineAnalysisResult;
  onResetPillbox?: () => void;
  onNavigateToDietGuide?: () => void;
}

export const ClashResultsAndSchedule: React.FC<ClashResultsAndScheduleProps> = ({
  analysis,
  onResetPillbox,
  onNavigateToDietGuide
}) => {
  const [copied, setCopied] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);

  const isCritical = analysis.maxSeverity === 'CRITICAL';
  const isModerate = analysis.maxSeverity === 'MODERATE';
  const isSafe = analysis.maxSeverity === 'SAFE';

  const handleCopySchedule = () => {
    const lines = [
      'PharmaSafe Multi-Medicine Daily Timetable',
      `Status: ${analysis.overallHeadline}`,
      '',
      '=== YOUR SAFE DAILY SCHEDULE ===',
      ...analysis.schedule.map(slot => {
        const pillLines = slot.pills.length > 0 
          ? slot.pills.map(p => `  • ${p.pill.brandName} (${p.pill.genericSalt}) - ${p.timingNote}${p.isSeparatedDueToClash ? ` [NOTE: ${p.separationReason}]` : ''}`).join('\n')
          : '  (No medications scheduled)';
        return `[ ${slot.period} | ${slot.timingWindow} - ${slot.subtitle} ]\n${pillLines}\n`;
      })
    ];

    if (analysis.hasClashes) {
      lines.push('=== CRITICAL CLASH ALERTS ===');
      analysis.clashes.forEach((c, idx) => {
        lines.push(`${idx + 1}. ${c.drugA} + ${c.drugB}: ${c.title}`);
        lines.push(`   Warning: ${c.plainExplanation}`);
        lines.push(`   Fix: ${c.actionableFix}\n`);
      });
    }

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.article
      variants={editorialRevealContainer}
      initial="hidden"
      animate="show"
      className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm overflow-hidden print-area"
      aria-labelledby="clash-assessment-heading"
    >
      {/* 1. Status Banner (Red for Critical, Green for Safe, Amber for Moderate) */}
      <motion.div
        variants={editorialItem}
        className={`px-5 sm:px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isCritical
            ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-100'
            : isModerate
            ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
            : 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            isCritical
              ? 'bg-rose-600 text-white'
              : isModerate
              ? 'bg-amber-500 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {isCritical ? (
              <ShieldAlert className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            ) : isModerate ? (
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            ) : (
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            )}
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold opacity-85 block">
              Drug-to-Drug Interaction Cross-Reference
            </span>
            <h2 id="clash-assessment-heading" className="text-lg sm:text-xl font-bold tracking-tight">
              {isCritical && `CRITICAL DRUG CLASH DETECTED (${analysis.totalClashes} WARNING${analysis.totalClashes > 1 ? 'S' : ''})`}
              {isModerate && 'MODERATE PRECAUTION: TIMING ADJUSTMENT RECOMMENDED'}
              {isSafe && 'SAFE COMBINATION: NO MAJOR CLASHES DETECTED'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide border ${
            isCritical
              ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-900 dark:text-rose-100 dark:border-rose-800'
              : isModerate
              ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800'
              : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-700'
          }`}>
            {isCritical ? 'High Risk Interaction' : isModerate ? 'Moderate Spacing Needed' : 'Zero Critical Clashes'}
          </span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Top Summary Bar & Quick Actions */}
        <motion.div variants={editorialItem} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Evaluated {analysis.analyzedPills.length} Indian Pharmacy Medicines:
            </span>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              {analysis.analyzedPills.map(p => (
                <span 
                  key={p.id}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                >
                  {p.brandName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 no-print">
            <motion.button
              whileTap={tactileTapPhysics}
              type="button"
              onClick={handleCopySchedule}
              className="min-h-[44px] px-3.5 text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
              <span>{copied ? 'Copied Timetable!' : 'Copy Timetable'}</span>
            </motion.button>

            <motion.button
              whileTap={tactileTapPhysics}
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] px-3.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Schedule</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* SECTION A: CLASH ALERTS (The Warnings)                         */}
        {/* ============================================================== */}
        {analysis.hasClashes && (
          <motion.section variants={editorialItem} aria-label="Drug Clash Warnings" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Section A: Medicine Clash Alerts ({analysis.clashes.length})
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Chemical cross-reactions detected among your selected medicines.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {analysis.clashes.map((clash) => (
                <div
                  key={clash.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    clash.severity === 'CRITICAL'
                      ? 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/80'
                      : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/80'
                  }`}
                >
                  {/* Clashing Pill Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm">
                      {clash.drugA}
                    </span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm">⚡ CLASHES WITH ⚡</span>
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm">
                      {clash.drugB}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      clash.severity === 'CRITICAL'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {clash.severity}
                    </span>
                  </div>

                  {/* Clash Title */}
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    {clash.title}
                  </h4>

                  {/* Plain English explanation in high contrast text */}
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                    {clash.plainExplanation}
                  </p>

                  {/* Clinical Why & Actionable Fix */}
                  <div className="mt-3 pt-3 border-t border-rose-200/60 dark:border-rose-900/60 flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs sm:text-sm">
                    <div className="space-y-1 max-w-xl">
                      <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 text-[11px] block">
                        Pharmacological Mechanism:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-normal">
                        {clash.clinicalWhy}
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-900 text-slate-800 dark:text-slate-200 shrink-0 max-w-md">
                      <div className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-1 text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Actionable Safety Fix:</span>
                      </div>
                      <p className="font-semibold text-xs leading-relaxed">
                        {clash.actionableFix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Safe Combination notice if no clashes */}
        {!analysis.hasClashes && (
          <motion.div variants={editorialItem} className="p-5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-100">
                Safe Multi-Drug Compatibility
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-normal leading-relaxed">
                No acute pharmacokinetic clashes or competitive enzyme conflicts were found between your selected medications. Follow your personalized timetable below for optimal therapeutic absorption.
              </p>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* SECTION B: YOUR DAILY TIMETABLE                                */}
        {/* ============================================================== */}
        <motion.section variants={editorialItem} aria-label="Your Daily Timetable" className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Automated Conflict-Spacing Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Your Daily Timetable
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                PharmaSafe automatically maps your daily doses to the optimal physiological window, spacing clashing medicines apart.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                3 Structured Windows
              </span>
            </div>
          </div>

          {/* Vertical Timeline with Three Flat Blocks */}
          <div className="space-y-3.5">
            {analysis.schedule.map((slot) => {
              const hasPills = slot.pills.length > 0;

              return (
                <div
                  key={slot.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${slot.bgColor} ${slot.borderColor}`}
                >
                  {/* Time Slot Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-base">
                        {slot.id === 'morning' && <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        {slot.id === 'afternoon' && <Utensils className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                        {slot.id === 'night' && <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                          <span>{slot.period}</span>
                        </h4>
                        <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                          {slot.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{slot.timingWindow}</span>
                      </span>
                    </div>
                  </div>

                  {/* Pills Scheduled in this slot */}
                  {hasPills ? (
                    <div className="space-y-2.5">
                      {slot.pills.map((scheduled) => (
                        <div
                          key={scheduled.pill.id}
                          className="p-3.5 sm:p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Pill className="w-3.5 h-3.5" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                                  {scheduled.pill.brandName}
                                </span>
                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {scheduled.pill.popularDose || scheduled.pill.category}
                                </span>
                              </div>

                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {scheduled.pill.genericSalt}
                              </div>

                              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                                <span className="text-teal-600 dark:text-teal-400 font-bold">Directions:</span>
                                <span>{scheduled.timingNote}</span>
                              </div>
                            </div>
                          </div>

                          {/* Separation Notice Badge if spaced to resolve a clash */}
                          {scheduled.isSeparatedDueToClash && (
                            <div className="sm:self-center shrink-0">
                              <div className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Separated to prevent chemical overlap</span>
                              </div>
                              {scheduled.separationReason && (
                                <p className="text-[11px] font-medium text-amber-800 dark:text-amber-300 mt-1 sm:text-right max-w-xs">
                                  {scheduled.separationReason}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      No medicines scheduled in this window for your current pillbox.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Optional quick link to dedicated Diet Guide tab */}
        {onNavigateToDietGuide && (
          <motion.div variants={editorialItem} className="p-4 sm:p-5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  Looking for Food & Beverage Precautions?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Detailed food safety, timing intervals, and safe swaps are available in the dedicated Diet Guide section.
                </p>
              </div>
            </div>
            <motion.button
              whileTap={tactileTapPhysics}
              type="button"
              onClick={onNavigateToDietGuide}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-teal-300 dark:border-teal-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0"
            >
              <span>Open Diet Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* SECTION C: LIVE INTERNET CROSS-CHECK                           */}
        {/* ============================================================== */}
        <motion.div variants={editorialItem} className="pt-2">
          <InternetCrossCheck pills={analysis.analyzedPills} />
        </motion.div>

        {/* SOS Emergency / First-Aid Expandable at the bottom */}
        <motion.div variants={editorialItem} className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-3.5 no-print">
          <motion.button
            whileTap={tactileTapPhysics}
            type="button"
            onClick={() => setIsSosOpen(!isSosOpen)}
            className="w-full min-h-[48px] p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 flex items-center justify-between text-left font-bold transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-rose-600 text-white flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 block">
                  Experiencing Unexpected Symptoms or Medication Overlap?
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Tap for emergency poison guidelines and national Indian medical helplines
                </span>
              </div>
            </div>

            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isSosOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isSosOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18, ease: standardEaseOut }}
                className="overflow-hidden space-y-3 pt-1"
              >
                <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3">
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-rose-600" />
                    <span>Emergency Indian Healthcare Helplines:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-bold block text-slate-900 dark:text-slate-100">National Emergency (All India):</span>
                      <strong className="text-rose-600 text-sm">Dial 112</strong>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="font-bold block text-slate-900 dark:text-slate-100">AIIMS National Poison Control Centre:</span>
                      <strong className="text-teal-700 dark:text-teal-400 text-sm">1800-116-117 (Toll-Free)</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Disclaimer: PharmaSafe generates schedule recommendations synthesized from verified clinical pharmacology monographs for patient and caregiver education. Always consult your prescribing doctor or licensed pharmacist before altering any prescribed medication schedule.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.article>
  );
};
