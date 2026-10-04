import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Printer, 
  Share2, 
  Check, 
  ChevronDown, 
  Info, 
  Layers, 
  ArrowRight,
  PhoneCall,
  HeartPulse,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import type { InteractionAnalysis } from '../types';
import { ChemistryModal } from './ChemistryModal';
import { InternetCrossCheck } from './InternetCrossCheck';
import { getTrafficLightDietGuide } from '../data/trafficLightDietGuide';
import { 
  standardEaseOut, 
  editorialRevealContainer, 
  editorialItem,
  tactileTapPhysics,
  chipTapPhysics
} from '../utils/motion';

interface ClinicalAssessmentCardProps {
  analysis: InteractionAnalysis;
  onOpenDosageHelper?: () => void;
  onSelectAlternativeFood?: (foodName: string) => void;
}

export const ClinicalAssessmentCard: React.FC<ClinicalAssessmentCardProps> = ({
  analysis,
  onOpenDosageHelper,
  onSelectAlternativeFood
}) => {
  const [showBiochemistry, setShowBiochemistry] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedAltIndex, setSelectedAltIndex] = useState<number | null>(null);
  const [isFirstAidExpanded, setIsFirstAidExpanded] = useState(false);
  const scrollRowRef = useRef<HTMLDivElement>(null);

  // Graceful fallback safeguard if analysis is ever missing or malformed
  if (!analysis) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center shadow-sm">
        <AlertCircle className="w-8 h-8 text-teal-700 dark:text-teal-400 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Data Temporarily Unavailable
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Please select both your prescribed medication and dietary item to generate a clinical safety evaluation.
        </p>
      </div>
    );
  }

  const severityStr = String(analysis?.severity || analysis?.status || 'SAFE COMBINATION');
  const isCritical = Boolean(analysis?.isCritical || severityStr.includes('CRITICAL') || analysis?.status === 'CRITICAL');
  const isUnverified = 
    Boolean(analysis?.isUnverifiedCombination) || 
    severityStr.includes('UNVERIFIED');
  const isPrecaution = 
    !isCritical && 
    !isUnverified &&
    (severityStr.includes('MODERATE') || 
     severityStr.includes('CAUTION') || 
     severityStr.includes('PRECAUTION') ||
     analysis?.status === 'PRECAUTION' ||
     analysis?.timingBuffer?.type === 'BUFFER_WINDOW' ||
     analysis?.timingBuffer?.type === 'ONGOING_PRECAUTION');

  let bannerType: 'CRITICAL' | 'PRECAUTION' | 'SAFE' | 'UNVERIFIED' = 'SAFE';
  if (isCritical) {
    bannerType = 'CRITICAL';
  } else if (isUnverified) {
    bannerType = 'UNVERIFIED';
  } else if (isPrecaution) {
    bannerType = 'PRECAUTION';
  }

  // Safe references to nested fields
  const patientGuidance = analysis?.patientGuidance || {
    saferFoods: [],
    clinicalAlternatives: [],
    dosageAndTimingRules: 'Take medication as directed by prescribing physician with a full glass of water.',
    emergencySymptoms: []
  };

  const saferFoods = patientGuidance.saferFoods || [];
  const dosageRules = patientGuidance.dosageAndTimingRules || 'Take medication as directed by prescribing physician with a full glass of water.';
  const dietGuide = getTrafficLightDietGuide(analysis?.drug, (analysis as any)?.brandName);

  const handleCopy = () => {
    const text = `PharmaSafe Clinical Assessment Report
Medication: ${analysis?.drug ?? 'Medication'}
Food / Beverage: ${analysis?.food ?? 'Food'}
Safety Status: ${severityStr}

Why It Happens:
${analysis?.mechanismExplanation ?? 'No critical chemical conflict detected.'}

Action To Take:
${dosageRules}

Safe Substitutes:
${saferFoods.map(f => `• ${f.name} - ${f.rationale}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollSubstitutes = (direction: 'left' | 'right') => {
    if (scrollRowRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Specific Symptom Watch text from database
  const symptomWatchText = 
    analysis?.emergencyFirstAid?.symptomWatch || 
    patientGuidance?.symptomWatch || 
    (patientGuidance?.emergencySymptoms && patientGuidance.emergencySymptoms.length > 0 
      ? patientGuidance.emergencySymptoms.join(', ')
      : 'Severe dizziness, rapid or irregular heartbeat, acute stomach pain, or difficulty breathing.');

  const universalFirstAidSteps = 
    analysis?.emergencyFirstAid?.universalSteps || [
      '1. Stop eating or drinking the interacting food immediately.',
      '2. Drink a full glass of plain water to help dilute stomach contents.',
      '3. Sit upright and do not induce vomiting unless told by a doctor.',
      '4. Check your pulse and note the exact time the food and medication were taken.'
    ];

  return (
    <>
      <motion.article
        key={`${analysis?.drug}-${analysis?.food}`}
        variants={editorialRevealContainer}
        initial="hidden"
        animate="show"
        className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden print-area"
        aria-labelledby="assessment-result-heading"
      >
        {/* Status Header: Solid professional clinical banner */}
        <motion.div
          variants={editorialItem}
          className={`px-5 sm:px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 transition-colors ${
            bannerType === 'CRITICAL'
              ? 'bg-red-50 dark:bg-red-950/70 border-red-200 dark:border-red-900 text-red-950 dark:text-red-100'
              : bannerType === 'PRECAUTION'
              ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
              : bannerType === 'UNVERIFIED'
              ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
              : analysis?.isUncuratedLiveDrug
              ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
              bannerType === 'CRITICAL'
                ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800'
                : bannerType === 'PRECAUTION'
                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800'
                : bannerType === 'UNVERIFIED'
                ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700'
                : analysis?.isUncuratedLiveDrug
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800'
                : 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800'
            }`}>
              {bannerType === 'CRITICAL' ? (
                <AlertOctagon className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              ) : bannerType === 'PRECAUTION' || bannerType === 'UNVERIFIED' ? (
                <AlertTriangle className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              ) : (
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              )}
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold opacity-80 block">
                {bannerType === 'UNVERIFIED'
                  ? 'Clinical Audit Verification'
                  : analysis?.isUncuratedLiveDrug
                  ? 'Clinical Safety Review'
                  : 'Safety Assessment Result'}
              </span>
              <h3 id="assessment-result-heading" className="text-lg sm:text-xl font-bold tracking-tight">
                {bannerType === 'UNVERIFIED' && 'NOTICE: UNVERIFIED COMBINATION'}
                {bannerType !== 'UNVERIFIED' && analysis?.isUncuratedLiveDrug && 'SAFETY REVIEW: NO CRITICAL CONFLICT'}
                {!analysis?.isUncuratedLiveDrug && bannerType === 'CRITICAL' && 'CRITICAL RISK: AVOID COMBINATION'}
                {!analysis?.isUncuratedLiveDrug && bannerType === 'PRECAUTION' && 'PRECAUTION: TIME BUFFER REQUIRED'}
                {!analysis?.isUncuratedLiveDrug && bannerType === 'SAFE' && 'SAFE: NO CONFLICT DETECTED'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide border ${
              bannerType === 'CRITICAL'
                ? 'bg-red-100 text-red-900 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-800'
                : bannerType === 'PRECAUTION'
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800'
                : bannerType === 'UNVERIFIED'
                ? 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-700'
                : analysis?.isUncuratedLiveDrug
                ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800'
            }`}>
              {analysis?.severity ?? analysis?.status ?? 'SAFE COMBINATION'}
            </span>
          </div>
        </motion.div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Headline & Monograph Pair */}
          <motion.div variants={editorialItem} className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                <span>Evaluated Pair:</span>
                <span className="text-teal-800 dark:text-teal-300 font-bold">{analysis?.drug ?? 'Medication'}</span>
                <span>+</span>
                <span className="text-teal-800 dark:text-teal-300 font-bold">{analysis?.food ?? 'Food'}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {analysis?.headline ?? 'Safety Evaluation Complete'}
              </h4>

              {/* Actionable Timeline / Buffer Badge */}
              {analysis?.timingBuffer && (
                <div className="mt-2.5">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold border ${
                      bannerType === 'CRITICAL'
                        ? 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900'
                        : bannerType === 'PRECAUTION'
                        ? 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900'
                        : 'bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/50 dark:text-teal-200 dark:border-teal-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{analysis?.timingBuffer?.badgeText ?? 'Standard Schedule'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0 no-print">
              <motion.button
                whileTap={tactileTapPhysics}
                type="button"
                onClick={() => setShowBiochemistry(true)}
                className="min-h-[36px] px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md flex items-center gap-1.5 transition-colors"
                title="View molecular pathway and enzyme mechanism"
              >
                <Layers className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>Mechanism</span>
              </motion.button>

              <motion.button
                whileTap={tactileTapPhysics}
                type="button"
                onClick={handlePrint}
                className="min-h-[36px] px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md flex items-center gap-1.5 transition-colors"
                title="Print assessment for clinical visit"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print</span>
              </motion.button>

              <motion.button
                whileTap={tactileTapPhysics}
                type="button"
                onClick={handleCopy}
                className="min-h-[36px] px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-md flex items-center gap-1.5 transition-colors"
                title="Copy assessment summary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-700 stroke-[3]" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* The 3-Tier Vertical Traffic Light Diet Guide */}
          <div className="space-y-4 pt-1">

            {/* 🔴 Section 1: "Strictly Avoid" (Red Zone) */}
            <motion.div 
              variants={editorialItem}
              className="rounded-lg p-5 sm:p-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 shadow-sm space-y-3.5"
              role="region"
              aria-label="Strictly Avoid Red Zone"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-rose-200 dark:border-rose-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-rose-700 text-white flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                      Red Zone • Strict Danger
                    </span>
                    <h5 className="text-lg sm:text-xl font-bold text-rose-950 dark:text-rose-100 tracking-tight">
                      🔴 {dietGuide?.redZone?.title ?? 'Strictly Avoid'}
                    </h5>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-rose-200 text-rose-950 dark:bg-rose-900 dark:text-rose-100 border border-rose-300 dark:border-rose-800">
                  Critical Hazard
                </span>
              </div>

              {/* Food Tags */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                  Hazardous Foods & Drinks to Eliminate:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(dietGuide?.redZone?.foods ?? []).map((foodItem, idx) => (
                    <div 
                      key={idx}
                      className="min-h-[36px] px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm font-bold"
                    >
                      <span className="text-base" aria-hidden="true">{foodItem.emoji}</span>
                      <span>{foodItem.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reason Why */}
              <div className="p-3.5 rounded-md bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Why It Happens:</span>
                </span>
                <p className="text-sm sm:text-base font-semibold text-rose-950 dark:text-rose-100 leading-normal">
                  {dietGuide?.redZone?.reasonWhy ?? 'Follow standard prescription precautions.'}
                </p>
              </div>
            </motion.div>

            {/* 🟡 Section 2: "Space Out" (Amber Zone / Time Gap) */}
            <motion.div 
              variants={editorialItem}
              className="rounded-lg p-5 sm:p-6 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 shadow-sm space-y-3.5"
              role="region"
              aria-label="Space Out Amber Zone"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-amber-200 dark:border-amber-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                      Amber Zone • Buffer Window
                    </span>
                    <h5 className="text-lg sm:text-xl font-bold text-amber-950 dark:text-amber-100 tracking-tight">
                      🟡 {dietGuide?.amberZone?.title ?? 'Space Out'}
                    </h5>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500 text-white">
                  ⏱️ {dietGuide?.amberZone?.timeBadge ?? 'Standard Routine'}
                </span>
              </div>

              {/* Food Tags */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Foods Requiring Time Gap:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(dietGuide?.amberZone?.foods ?? []).map((foodItem, idx) => (
                    <div 
                      key={idx}
                      className="min-h-[36px] px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm font-bold"
                    >
                      <span className="text-base" aria-hidden="true">{foodItem.emoji}</span>
                      <span>{foodItem.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing Rule */}
              <div className="p-3.5 rounded-md bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timing Rule:</span>
                </span>
                <p className="text-sm sm:text-base font-semibold text-amber-950 dark:text-amber-100 leading-normal">
                  {dietGuide?.amberZone?.reasonWhy ?? 'Maintain steady digestion intervals.'}
                </p>
              </div>
            </motion.div>

            {/* 🟢 Section 3: "Safe to Enjoy" (Green Zone / Safe Swaps) */}
            <motion.div 
              variants={editorialItem}
              className="rounded-lg p-5 sm:p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 shadow-sm space-y-3.5 transition-colors"
              role="region"
              aria-label="Safe to Enjoy Green Zone"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      Green Zone • 100% Compatible
                    </span>
                    <h5 className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-100 tracking-tight">
                      🟢 {dietGuide?.greenZone?.title ?? 'Safe to Enjoy'}
                    </h5>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-200 text-emerald-950 dark:bg-emerald-900 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-700">
                  Recommended Daily Swaps
                </span>
              </div>

              {/* Food Tags */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Foods You Can Eat Safely:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(dietGuide?.greenZone?.foods ?? []).map((foodItem, idx) => (
                    <div 
                      key={idx}
                      className="min-h-[36px] px-3 py-1.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm font-bold"
                    >
                      <span className="text-base" aria-hidden="true">{foodItem.emoji}</span>
                      <span>{foodItem.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="p-3.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dietitian Note:</span>
                </span>
                <p className="text-sm sm:text-base font-semibold text-emerald-950 dark:text-emerald-100 leading-normal">
                  {dietGuide?.greenZone?.reasonWhy ?? 'Enjoy normal home-cooked meals safely.'}
                </p>
              </div>

              {/* Safe Substitutes Carousel */}
              {saferFoods && saferFoods.length > 0 && (
                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                      <span>Safe Food Swaps (Tap to Switch):</span>
                    </span>

                    <div className="flex items-center gap-1 no-print">
                      <motion.button
                        whileTap={chipTapPhysics}
                        type="button"
                        onClick={() => scrollSubstitutes('left')}
                        className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center justify-center"
                        aria-label="Scroll substitutes left"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        whileTap={chipTapPhysics}
                        type="button"
                        onClick={() => scrollSubstitutes('right')}
                        className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center justify-center"
                        aria-label="Scroll substitutes right"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>

                  <div 
                    ref={scrollRowRef}
                    className="flex overflow-x-auto gap-3 pb-1.5 scroll-smooth snap-x snap-mandatory"
                    tabIndex={0}
                    role="region"
                    aria-label="Safe dietary substitutes carousel"
                  >
                    {saferFoods.map((substitute, i) => {
                      const isSelected = selectedAltIndex === i;
                      const icon = substitute.icon || (i === 0 ? '🍊' : i === 1 ? '🍎' : '🫐');

                      return (
                        <motion.button
                          key={i}
                          whileTap={chipTapPhysics}
                          type="button"
                          onClick={() => {
                            setSelectedAltIndex(i);
                            if (onSelectAlternativeFood) {
                              onSelectAlternativeFood(substitute.name);
                            }
                          }}
                          className={`min-w-[220px] p-3.5 rounded-lg border text-left transition-colors flex flex-col justify-between snap-start shrink-0 ${
                            isSelected
                              ? 'bg-teal-700 text-white border-teal-800'
                              : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-teal-600 text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-2xl" role="img" aria-label={substitute.name}>{icon}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                isSelected ? 'bg-teal-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}>
                                0% Conflict
                              </span>
                            </div>
                            <div className="text-sm font-bold tracking-tight">
                              {substitute.name}
                            </div>
                            <p className={`text-xs mt-1 line-clamp-2 ${
                              isSelected ? 'text-teal-100' : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {substitute.rationale}
                            </p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                            <span className={isSelected ? 'text-teal-100' : 'text-teal-700 dark:text-teal-400'}>
                              {isSelected ? 'Active Selection' : 'Tap to Select'}
                            </span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center ${
                              isSelected ? 'bg-white text-teal-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-700'
                            }`}>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

          </div>

          {/* Live Internet Cross-Check */}
          <motion.div variants={editorialItem} className="pt-2">
            <InternetCrossCheck 
              medicineNames={analysis?.drug ? [analysis.drug] : ['Current Prescription']}
            />
          </motion.div>

        </div>

        {/* Dosage Helper Action Strip */}
        {onOpenDosageHelper && (
          <motion.div variants={editorialItem} className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Clock className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
              <span>Save this medication to your daily schedule reminder?</span>
            </div>
            <motion.button
              whileTap={tactileTapPhysics}
              type="button"
              onClick={onOpenDosageHelper}
              className="min-h-[36px] px-4 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white font-bold text-xs rounded-md flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <span>Open Dosage Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}

        {/* Emergency First-Aid Section */}
        <motion.div variants={editorialItem} className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 no-print">
          <motion.button
            whileTap={tactileTapPhysics}
            type="button"
            onClick={() => setIsFirstAidExpanded(!isFirstAidExpanded)}
            className={`w-full min-h-[48px] p-3.5 rounded-lg border transition-colors flex items-center justify-between gap-3 text-left font-bold ${
              isFirstAidExpanded
                ? 'bg-red-50 dark:bg-red-950/80 border-red-300 dark:border-red-700 text-red-950 dark:text-red-100'
                : 'bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/80 text-red-900 dark:text-red-200 hover:bg-red-50/50'
            }`}
            aria-expanded={isFirstAidExpanded}
            aria-controls="emergency-first-aid-panel"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-red-700 text-white flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold tracking-tight block">
                  Did you already consume this? View First-Aid
                </span>
                <span className="text-xs font-normal text-red-800 dark:text-red-300">
                  Universal emergency procedures & symptom watch
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline text-red-800 dark:text-red-300">
                {isFirstAidExpanded ? 'Close Guidance' : 'View First-Aid'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isFirstAidExpanded ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>

          {/* Expandable Emergency Panel */}
          <AnimatePresence>
            {isFirstAidExpanded && (
              <motion.div
                id="emergency-first-aid-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18, ease: standardEaseOut }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-5 sm:p-6 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-100 shadow-sm space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start gap-2.5 pb-3 border-b border-rose-200 dark:border-rose-900">
                    <div className="w-8 h-8 rounded bg-red-700 text-white flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-red-950 dark:text-red-100 tracking-tight">
                        Urgent First-Aid Protocol
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                        Immediate actions to minimize chemical absorption and protect health.
                      </p>
                    </div>
                  </div>

                  {/* 1. Universal First-Aid Steps */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-900 dark:text-red-300">
                      Immediate Action Steps:
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                      {universalFirstAidSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-white dark:bg-slate-900 p-2.5 rounded-md border border-rose-200 dark:border-slate-800">
                          <span className="w-5 h-5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="flex-1 leading-snug">{step.replace(/^\d+\.\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. Symptom Watch */}
                  <div className="p-3.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Symptom Watch (Reaction Specific to {analysis.drug}):</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      Watch out for: <span className="text-amber-950 dark:text-amber-200">{symptomWatchText}</span>
                    </p>
                  </div>

                  {/* 3. Emergency Contacts */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-900 dark:text-red-300">
                      Emergency Contacts:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <motion.a
                        whileTap={tactileTapPhysics}
                        href="tel:112"
                        className="min-h-[44px] px-4 py-2.5 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" />
                        <span>Call Emergency (112 / 911)</span>
                      </motion.a>

                      <motion.a
                        whileTap={tactileTapPhysics}
                        href="tel:18002221222"
                        className="min-h-[44px] px-4 py-2.5 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 text-red-900 dark:text-red-200 border border-red-300 dark:border-red-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
                        <span>Poison Control (1-800-222-1222)</span>
                      </motion.a>
                    </div>
                  </div>

                  {/* 4. Disclaimer Banner */}
                  <div className="pt-2 border-t border-rose-200 dark:border-rose-900 text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      ⚠️ <strong>Disclaimer:</strong> This is first-aid guidance, not medical advice. If you feel unwell, seek emergency medical help.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.article>

      {/* Biochemical Mechanism Modal */}
      <ChemistryModal
        isOpen={showBiochemistry}
        onClose={() => setShowBiochemistry(false)}
        analysis={analysis}
      />
    </>
  );
};

