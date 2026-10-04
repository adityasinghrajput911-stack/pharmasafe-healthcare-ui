import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BookOpen, RotateCcw, Clock, Sun, Moon, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { standardEaseOut, chipTapPhysics } from '../utils/motion';

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo Area: Clean Shield & Standard Medical Typography */}
          <div 
            onClick={onReset}
            className="cursor-pointer flex items-center gap-2.5 sm:gap-3 select-none"
            role="button"
            tabIndex={0}
            aria-label="PharmaSafe Home - Return to home & reset"
            onKeyDown={(e) => e.key === 'Enter' && onReset()}
          >
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 border ${
              isDark ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-800 border-teal-200'
            }`}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Pharma<span className={isDark ? 'text-teal-300' : 'text-teal-200 font-extrabold'}>Safe</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-teal-600 bg-teal-800/80 text-white hidden sm:inline">
                  Clinical Pharmacology
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${isDark ? 'text-slate-300' : 'text-teal-100'}`}>
                Drug-Food Safety & Clinical Guidance
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Flat Enterprise Segmented Tabs (Desktop) */}
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            {onOpenDosageHelper && (
              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={onOpenDosageHelper}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md border hidden sm:flex items-center gap-1.5 transition-colors ${
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

            {/* Accessibility Font Size Toggle (Hidden on mobile) */}
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={onToggleLargeText}
              className={`min-h-[38px] px-2.5 py-1.5 text-xs font-semibold rounded-md border hidden sm:flex items-center gap-1 transition-colors ${
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

            {/* Night/Day Mode Toggle (Always Visible) */}
            <motion.button
              whileTap={chipTapPhysics}
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border flex items-center justify-center transition-colors shrink-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs"
              title={isDark ? "Switch to standard daylight mode" : "Switch to hospital night mode"}
              aria-label="Toggle night and day mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </motion.button>

            {/* Reset (Desktop only) */}
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

        {/* Mobile Navigation Tabs: Single Horizontally Scrollable Category Pill Row (Swiggy/Blinkit style) */}
        <nav aria-label="Mobile Navigation" className="md:hidden px-4 pb-2.5 pt-0.5 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide no-scrollbar">
          <motion.button
            whileTap={chipTapPhysics}
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('checker');
            }}
            className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 select-none ${
              appMode === 'interactions' && activeTab === 'checker'
                ? isDark
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-white text-teal-900 border-white font-black shadow-xs'
                : isDark
                  ? 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-teal-800/60 text-teal-100 border-teal-600/50 hover:bg-teal-800/80 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Checker</span>
          </motion.button>

          <motion.button
            whileTap={chipTapPhysics}
            type="button"
            onClick={() => {
              setAppMode('symptoms');
            }}
            className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 select-none ${
              appMode === 'symptoms'
                ? isDark
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-white text-teal-900 border-white font-black shadow-xs'
                : isDark
                  ? 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-teal-800/60 text-teal-100 border-teal-600/50 hover:bg-teal-800/80 hover:text-white'
            }`}
          >
            <span>Symptoms</span>
          </motion.button>

          <motion.button
            whileTap={chipTapPhysics}
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('diet-companion');
            }}
            className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 select-none ${
              appMode === 'interactions' && activeTab === 'diet-companion'
                ? isDark
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-white text-teal-900 border-white font-black shadow-xs'
                : isDark
                  ? 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-teal-800/60 text-teal-100 border-teal-600/50 hover:bg-teal-800/80 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Diet Guide</span>
          </motion.button>

          <motion.button
            whileTap={chipTapPhysics}
            type="button"
            onClick={() => {
              setAppMode('interactions');
              setActiveTab('guide');
            }}
            className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-1.5 select-none ${
              appMode === 'interactions' && activeTab === 'guide'
                ? isDark
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-white text-teal-900 border-white font-black shadow-xs'
                : isDark
                  ? 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:text-white'
                  : 'bg-teal-800/60 text-teal-100 border-teal-600/50 hover:bg-teal-800/80 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Common Pairs</span>
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

