import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, Pill, Plus, AlertCircle, Sparkles, Camera } from 'lucide-react';
import { standardEaseOut, chipTapPhysics, tactileTapPhysics } from '../utils/motion';
import type { PillItem } from '../types';
import { fetchIndianMedicines } from '../services/indianPharmacyApi';
import { 
  POPULAR_INDIAN_SHORTCUTS, 
  INDIAN_PHARMACY_DATABASE, 
  type IndianMedicineEntry 
} from '../data/indianPharmacyDatabase';

interface VirtualPillboxProps {
  selectedPills: PillItem[];
  onAddPill: (pill: PillItem) => void;
  onRemovePill: (pillId: string) => void;
  onClearAll: () => void;
  onOpenScanner?: () => void;
  maxPills?: number;
}

export const VirtualPillbox: React.FC<VirtualPillboxProps> = ({
  selectedPills,
  onAddPill,
  onRemovePill,
  onClearAll,
  onOpenScanner,
  maxPills = 8,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<IndianMedicineEntry[]>(() => {
    return INDIAN_PHARMACY_DATABASE.slice(0, 8);
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFull = selectedPills.length >= maxPills;

  // 300ms Simulated Indian Pharmacy API call
  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    if (!searchQuery.trim()) {
      setIsLoading(false);
      setSearchResults(INDIAN_PHARMACY_DATABASE.slice(0, 8));
      return;
    }

    setIsLoading(true);

    fetchIndianMedicines(searchQuery, abortController.signal)
      .then((results) => {
        if (!isCancelled) {
          setSearchResults(results);
          setIsLoading(false);
          setIsOpen(true);
        }
      })
      .catch((err: any) => {
        if (err.name !== 'AbortError') {
          console.warn('[PharmaSafe] Pharmacy API error:', err);
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      });

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery, searchResults]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSelectMedicine = (med: IndianMedicineEntry) => {
    if (isFull) {
      showToast(`Pillbox limit reached (max ${maxPills} medicines)`);
      return;
    }

    // Check if already in pillbox
    const alreadyAdded = selectedPills.some(
      (p) => p.brandName.toLowerCase() === med.brandName.toLowerCase()
    );

    if (alreadyAdded) {
      showToast(`${med.brandName} is already in your pillbox`);
      setSearchQuery('');
      setIsOpen(false);
      return;
    }

    const pill: PillItem = {
      id: `${med.id}-${Date.now()}`,
      brandName: med.brandName,
      genericSalt: med.genericSalt,
      category: med.category,
      dosageForm: med.dosageForm,
      popularDose: med.popularDose,
      mappedCuratedDrugId: med.mappedCuratedDrugId
    };

    onAddPill(pill);
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleQuickAdd = (shortcut: typeof POPULAR_INDIAN_SHORTCUTS[number]) => {
    const med = INDIAN_PHARMACY_DATABASE.find(
      (m) => m.brandName.toLowerCase() === shortcut.brandName.toLowerCase()
    );

    if (med) {
      handleSelectMedicine(med);
    } else {
      handleSelectMedicine({
        id: shortcut.label.toLowerCase().replace(/\s+/g, '-'),
        brandName: shortcut.brandName,
        genericSalt: shortcut.genericSalt,
        category: 'Prescription Medicine',
        badge: 'Oral Medication',
        dosageForm: 'Tablet',
        popularDose: 'Standard Dose',
        mappedCuratedDrugId: shortcut.mappedDrugId as any,
        aliases: []
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[activeIndex]) {
        handleSelectMedicine(searchResults[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Header with Step 1 and Pillbox Counter */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label 
            htmlFor="medicine-search-input" 
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2.5"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold shadow-xs">
              1
            </span>
            <span>Step 1: Add all your daily medicines</span>
          </label>

          {/* Blinkit Pillbox Counter Pill */}
          <div className="flex items-center gap-2">
            <div className={`px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
              selectedPills.length >= 2
                ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-200'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Virtual Pillbox: <strong>{selectedPills.length} / {maxPills}</strong></span>
            </div>

            {selectedPills.length > 0 && (
              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={onClearAll}
                className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:underline"
              >
                Clear all
              </motion.button>
            )}
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
          Search and add your daily medicines (e.g. Dolo 650, Pan-D, Telma, Thyronorm, Storvas). PharmaSafe automatically organizes your morning, afternoon, and night timetable and guards against dangerous food and drug clashes.
        </p>
      </div>

      {/* Main Search Input Container */}
      <div className="space-y-3.5">
        <div className="relative w-full rounded-lg">
          <Search 
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
            aria-hidden="true" 
          />
          
          <input
            id="medicine-search-input"
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="indian-medicine-listbox"
            aria-autocomplete="list"
            disabled={isFull}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              isFull
                ? `Pillbox full (${maxPills}/${maxPills}). Remove a pill to add another.`
                : "Type medicine name (e.g. Dolo 650, Ecosprin, Pan-D, Thyronorm, Telma, Storvas)..."
            }
            className={`w-full h-11 sm:h-12 pl-10 pr-32 text-sm sm:text-base font-semibold rounded-lg border transition-colors shadow-sm focus:outline-none placeholder:font-normal ${
              isFull
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:border-teal-600 placeholder:text-slate-400'
            }`}
          />

          {/* Right-side spinner, scanner & clear */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
            {isLoading && (
              <div className="w-5 h-5 flex items-center justify-center mr-0.5" title="Searching Indian Pharmacy...">
                <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent dark:border-teal-400 dark:border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {onOpenScanner && (
              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={onOpenScanner}
                className="h-7 px-2 rounded-md bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Scan prescription bottle label"
                aria-label="Scan bottle label with camera"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scan</span>
              </motion.button>
            )}

            {searchQuery && (
              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
                aria-label="Clear medicine search text"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Temporary friendly toast alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: standardEaseOut }}
              className="p-3 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 rounded-lg text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Pills Cart Tags (Blinkit Soft Floating Cart Items) */}
        <div className="space-y-2">
          {selectedPills.length > 0 && (
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-1.5">
              <span>Your Current Daily Pillbox ({selectedPills.length}):</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedPills.map((pill) => (
                <motion.div
                  key={pill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: standardEaseOut }}
                  className="group relative inline-flex items-center gap-2.5 pl-3 pr-1.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-teal-500 rounded-lg shadow-sm transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                    <Pill className="w-3.5 h-3.5" />
                  </div>

                  <div className="text-left min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-tight">
                        {pill.brandName}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hidden sm:inline">
                        {pill.category}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-teal-700 dark:text-teal-400 truncate max-w-[180px] sm:max-w-xs">
                      {pill.genericSalt}
                    </div>
                  </div>

                  {/* Clean Accessible 'X' Remove Pill Button */}
                  <motion.button
                    whileTap={chipTapPhysics}
                    type="button"
                    onClick={() => onRemovePill(pill.id)}
                    aria-label={`Remove ${pill.brandName} from pillbox`}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick-Add Popular Indian Medicines */}
        {!isFull && (
          <div className="pt-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Tap to Add Common Indian Medicines:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_INDIAN_SHORTCUTS.map((shortcut) => {
                const isAlreadyInPillbox = selectedPills.some(
                  (p) => p.brandName.toLowerCase() === shortcut.brandName.toLowerCase()
                );

                return (
                  <motion.button
                    key={shortcut.label}
                    whileTap={chipTapPhysics}
                    type="button"
                    disabled={isAlreadyInPillbox}
                    onClick={() => handleQuickAdd(shortcut)}
                    className={`h-8 px-3 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1 ${
                      isAlreadyInPillbox
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-50'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-300'
                    }`}
                  >
                    <Plus className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                    <span>{shortcut.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown Listbox */}
      <AnimatePresence>
        {isOpen && !isLoading && !isFull && (
          <motion.div
            id="indian-medicine-listbox"
            role="listbox"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: standardEaseOut }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm max-h-80 overflow-y-auto"
          >
            <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
              <span>
                {searchQuery ? `Matching Indian Medicines (${searchResults.length})` : 'Popular Indian Pharmacy Staples'}
              </span>
              <span className="text-[11px] font-normal text-slate-500">Tap to add to pillbox</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-6 text-center text-slate-600 dark:text-slate-400">
                <AlertCircle className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <p className="text-base font-bold text-slate-900 dark:text-slate-100">No matching medicine found</p>
                <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">
                  Try typing Indian brands (Dolo 650, Pan-D, Thyronorm, Telma, Ecosprin, Storvas) or active chemical salts.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {searchResults.map((item, index) => {
                  const isHighlighted = index === activeIndex;
                  const isAlreadyInPillbox = selectedPills.some(
                    (p) => p.brandName.toLowerCase() === item.brandName.toLowerCase()
                  );

                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      role="option"
                      aria-selected={isAlreadyInPillbox}
                      onClick={() => handleSelectMedicine(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full min-h-[58px] px-5 py-3 text-left flex items-center justify-between gap-3 transition-colors ${
                        isAlreadyInPillbox
                          ? 'bg-slate-50/80 dark:bg-slate-800/40 text-slate-400 opacity-60'
                          : isHighlighted
                          ? 'bg-teal-50/80 dark:bg-teal-950/50 text-slate-900 dark:text-slate-100'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {/* Indian Brand Name in bold */}
                          <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                            {item.brandName}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        {/* Generic salt in smaller teal text */}
                        <div className="text-xs sm:text-sm font-semibold text-teal-700 dark:text-teal-400 mt-0.5 truncate">
                          Contains: {item.genericSalt}
                        </div>
                      </div>

                      {isAlreadyInPillbox ? (
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Added
                        </span>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
