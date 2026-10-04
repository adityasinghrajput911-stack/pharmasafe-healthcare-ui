import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BookOpen, RotateCcw, Clock, Sun, Moon, Type, Check, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { standardEaseOut, chipTapPhysics, tactileTapPhysics } from '../utils/motion';

interface HeaderProps {
  activeTab: 'checker' | 'diet-companion' | 'guide';
  setActiveTab: (tab: 'checker' | 'diet-companion' | 'guide') => void;
  appMode: 'interactions' | 'symptoms';
  setAppMode: (mode: 'interactions' | 'symptoms') => void;
  onReset: () => void;
  onOpenDosageHelper?: () => void;
  savedDosagesCount?: number;
  largeText: boolean;
  onToggleLargeText: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  appMode,
  setAppMode,
  onReset,
  onOpenDosageHelper,
  savedDosagesCount = 0,
  largeText,
  onToggleLargeText
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.18, ease: standardEaseOut }}
      className="sticky top-0 z-40 print:hidden"
    >
      {/* Top Header Bar in Solid Professional Medical Teal */}
      <div className={`border-b transition-colors ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-teal-700 border-teal-800 text-white'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Logo Area: Clean Shield & Standard Medical Typography */}
          <div 
            onClick={onReset}
            className="cursor-pointer flex items-center gap-3 select-none"
            role="button"
            tabIndex={0}
            aria-label="PharmaSafe Home - Return to home & reset"
            onKeyDown={(e) => e.key === 'Enter' && onReset()}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
              isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-800 border-teal-200'
            }`}>
              <Shield className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Pharma<span className={isDark ? 'text-teal-300' : 'text-teal-200 font-extrabold'}>Safe</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-teal-600 bg-teal-800/80 text-white hidden sm:inline">
                  Clinical Pharmacology
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-teal-100'}`}>
                Drug-Food Safety & Clinical Guidance
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Flat Enterprise Segmented Tabs */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAppMode('interactions');
                setActiveTab('checker');
              }}
              className={`min-h-[40px] px-3.5 py-1.5 text-sm font-semibold rounded-md border transition-colors flex items-center gap-2 ${
                appMode === 'interactions' && activeTab === 'checker'
                  ? isDark 
                    ? 'bg-teal-700 text-white border-teal-600' 
                    : 'bg-white text-teal-900 border-white font-bold'
                  : isDark
                    ? 'text-slate-200 border-transparent hover:bg-slate-800 hover:text-white'
                    : 'text-white border-transparent hover:bg-teal-800/80 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Pillbox & Timetable</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAppMode('symptoms');
              }}
              className={`min-h-[40px] px-3.5 py-1.5 text-sm font-semibold rounded-md border transition-colors flex items-center gap-2 ${
                appMode === 'symptoms'
                  ? isDark 
                    ? 'bg-teal-700 text-white border-teal-600' 
                    : 'bg-white text-teal-900 border-white font-bold'
                  : isDark
                    ? 'text-slate-200 border-transparent hover:bg-slate-800 hover:text-white'
                    : 'text-white border-transparent hover:bg-teal-800/80 hover:text-white'
              }`}
            >
              <span>Symptom Relief</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAppMode('interactions');
                setActiveTab('diet-companion');
              }}
              className={`min-h-[40px] px-3.5 py-1.5 text-sm font-semibold rounded-md border transition-colors flex items-center gap-2 ${
                appMode === 'interactions' && activeTab === 'diet-companion'
                  ? isDark 
                    ? 'bg-teal-700 text-white border-teal-600' 
                    : 'bg-white text-teal-900 border-white font-bold'
                  : isDark
                    ? 'text-slate-200 border-transparent hover:bg-slate-800 hover:text-white'
                    : 'text-white border-transparent hover:bg-teal-800/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Diet Guide</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAppMode('interactions');
                setActiveTab('guide');
              }}
              className={`min-h-[40px] px-3.5 py-1.5 text-sm font-semibold rounded-md border transition-colors flex items-center gap-2 ${
                appMode === 'interactions' && activeTab === 'guide'
                  ? isDark 
                    ? 'bg-teal-700 text-white border-teal-600' 
                    : 'bg-white text-teal-900 border-white font-bold'
                  : isDark
                    ? 'text-slate-200 border-transparent hover:bg-slate-800 hover:text-white'
                    : 'text-white border-transparent hover:bg-teal-800/80 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Common Pairs</span>
            </button>
          </nav>

          {/* Right Control Tools: Schedule, Large Text, Theme Switcher */}
          <div className="flex items-center gap-2">
            {onOpenDosageHelper && (
              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={onOpenDosageHelper}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md border flex items-center gap-1.5 transition-colors ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                    : 'bg-teal-800/90 hover:bg-teal-900 text-white border-teal-600'
                }`}
                title="View your saved daily medication schedule"
                aria-label="Dosage schedule reminder"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Schedule</span>
                {savedDosagesCount > 0 && (
                  <span className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center ${
                    isDark ? 'bg-teal-500 text-white' : 'bg-white text-teal-900'
                  }`}>
                    {savedDosagesCount}
                  </span>
                )}
              </motion.button>
            )}

            {/* Accessibility Font Size Toggle */}
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={onToggleLargeText}
              className={`min-h-[38px] px-2.5 py-1.5 text-xs font-semibold rounded-md border flex items-center gap-1 transition-colors ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-teal-800/90 hover:bg-teal-900 text-white border-teal-600'
              }`}
              title="Toggle larger typography for enhanced readability"
              aria-label="Toggle font size"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">{largeText ? '100%' : '125%'}</span>
            </motion.button>

            {/* Night/Day Mode Toggle */}
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-md border flex items-center justify-center transition-colors shrink-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              title={isDark ? "Switch to standard daylight mode" : "Switch to hospital night mode"}
              aria-label="Toggle night and day mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </motion.button>

            {/* Reset */}
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={onReset}
              className={`min-h-[38px] px-2.5 py-1.5 text-xs font-semibold rounded-md border hidden sm:flex items-center gap-1 transition-colors ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-teal-800/90 hover:bg-teal-900 text-white border-teal-600'
              }`}
              title="Reset search to default consultation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden px-4 pb-2.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('checker');
            }}
            className={`flex-1 min-h-[38px] py-1.5 text-xs font-semibold rounded-md border text-center ${
              appMode === 'interactions' && activeTab === 'checker'
                ? isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-white font-bold'
                : 'text-white border-transparent hover:bg-teal-800/80'
            }`}
          >
            Checker
          </button>
          <button
            type="button"
            onClick={() => {
              setAppMode('symptoms');
            }}
            className={`flex-1 min-h-[38px] py-1.5 text-xs font-semibold rounded-md border text-center ${
              appMode === 'symptoms'
                ? isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-white font-bold'
                : 'text-white border-transparent hover:bg-teal-800/80'
            }`}
          >
            Symptoms
          </button>
          <button
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('diet-companion');
            }}
            className={`flex-1 min-h-[38px] py-1.5 text-xs font-semibold rounded-md border text-center ${
              appMode === 'interactions' && activeTab === 'diet-companion'
                ? isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-white font-bold'
                : 'text-white border-transparent hover:bg-teal-800/80'
            }`}
          >
            Diet Guide
          </button>
          <button
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('guide');
            }}
            className={`flex-1 min-h-[38px] py-1.5 text-xs font-semibold rounded-md border text-center ${
              appMode === 'interactions' && activeTab === 'guide'
                ? isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-white font-bold'
                : 'text-white border-transparent hover:bg-teal-800/80'
            }`}
          >
            Common Pairs
          </button>
        </div>
      </div>

      {/* Trust Badge Sub-banner: Flat solid hospital bar */}
      <div className={`py-2 px-4 border-b text-xs font-medium transition-colors ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-slate-300' 
          : 'bg-white border-slate-200 text-slate-700'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-teal-700 text-white shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">Verified Clinical Pharmacology Guidelines</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-600 dark:text-slate-400">
              Indian Pharmacopoeia (IP) & CDSCO Clinical Safety Guidelines
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-teal-700 dark:text-teal-400" />
              <span>Safety Assessment Engine</span>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

