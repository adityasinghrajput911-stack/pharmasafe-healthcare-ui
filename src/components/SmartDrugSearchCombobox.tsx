import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, Pill, ChevronDown, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { standardEaseOut, tactileTapPhysics, chipTapPhysics } from '../utils/motion';
import type { DrugId, CuratedDrugId } from '../types';
import { GENERIC_DRUGS_META } from '../data/brandDatabase';
import { 
  fetchIndianMedicines 
} from '../services/indianPharmacyApi';
import { 
  POPULAR_INDIAN_SHORTCUTS, 
  INDIAN_PHARMACY_DATABASE, 
  type IndianMedicineEntry,
  getBlisterFoilSalt 
} from '../data/indianPharmacyDatabase';

interface SmartDrugSearchComboboxProps {
  stepNumber?: string;
  selectedDrugId: DrugId | null;
  selectedBrandName?: string;
  isSaltConfirmed?: boolean;
  onConfirmSalt?: () => void;
  onSelectDrug: (drugId: DrugId, brandName?: string) => void;
  onClear?: () => void;
  onOpenScanner?: () => void;
}

export const SmartDrugSearchCombobox: React.FC<SmartDrugSearchComboboxProps> = ({
  stepNumber = "1",
  selectedDrugId,
  selectedBrandName,
  isSaltConfirmed = false,
  onConfirmSalt,
  onSelectDrug,
  onClear,
  onOpenScanner,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<IndianMedicineEntry[]>(() => {
    return INDIAN_PHARMACY_DATABASE.slice(0, 10);
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentGeneric = selectedDrugId ? GENERIC_DRUGS_META[selectedDrugId as CuratedDrugId] : null;

  // Find active Indian medicine details if selected
  const activeIndianMed = selectedBrandName 
    ? INDIAN_PHARMACY_DATABASE.find(m => m.brandName.toLowerCase() === selectedBrandName.toLowerCase())
    : selectedDrugId 
    ? INDIAN_PHARMACY_DATABASE.find(m => m.brandName.toLowerCase() === String(selectedDrugId).toLowerCase() || m.mappedCuratedDrugId === selectedDrugId)
    : null;

  // Indian Pharmacy search
  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    if (!searchQuery.trim()) {
      setIsLoading(false);
      setSearchResults(INDIAN_PHARMACY_DATABASE.slice(0, 10));
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
          console.warn('[PharmaSafe] Simulated Indian Pharmacy API error:', err);
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

  // Close combobox on click outside
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

  const handleSelect = (item: IndianMedicineEntry) => {
    if (item.mappedCuratedDrugId) {
      onSelectDrug(item.mappedCuratedDrugId, item.brandName);
    } else {
      onSelectDrug(item.brandName as DrugId, item.brandName);
    }
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleShortcutClick = (shortcut: typeof POPULAR_INDIAN_SHORTCUTS[number]) => {
    onSelectDrug(shortcut.mappedDrugId, shortcut.brandName);
    setSearchQuery('');
    setIsOpen(false);
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
        handleSelect(searchResults[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-100 dark:bg-amber-900/60 text-slate-900 dark:text-amber-100 font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Panel Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <label 
            htmlFor="drug-search-input" 
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-teal-700 text-white text-xs font-bold">
              {stepNumber}
            </span>
            <span>Step 1: Select Your Prescribed Medication</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Step 1 of 2
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Search by brand name (e.g., Dolo 650, Pan 40, Glycomet, Telma, Storvas) or active generic salt.
        </p>
      </div>

      {/* Main Search Input Container - Clean Flat Input */}
      <div className="space-y-3.5">
        <div className="relative w-full z-40">
          <div className="relative w-full">
            <Search 
              className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
              aria-hidden="true" 
            />
            
            <input
              id="drug-search-input"
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls="drug-search-listbox"
              aria-autocomplete="list"
              value={isOpen ? searchQuery : (selectedBrandName || currentGeneric?.name || (selectedDrugId ? String(selectedDrugId) : ''))}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type medicine name (e.g. Dolo 650, Pan 40, Glycomet, Telma, Storvas)..."
              className="w-full h-12 pl-10 pr-28 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none transition-colors shadow-sm placeholder:text-slate-400 placeholder:font-normal"
            />

            {/* Controls inside right side of search bar */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
              {isLoading && (
                <div 
                  className="w-4 h-4 border-2 border-teal-700 border-t-transparent rounded-full animate-spin mr-1" 
                  aria-label="Searching medications"
                />
              )}

              {isOpen && searchQuery && (
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    inputRef.current?.focus();
                  }}
                  className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                  aria-label="Clear medication search text"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}

              {/* Camera Scan Button */}
              {onOpenScanner && (
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={onOpenScanner}
                  className="h-8 px-2.5 rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-semibold transition-colors"
                  title="Scan medication label using camera"
                  aria-label="Scan medication bottle label"
                >
                  <Camera className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span className="hidden sm:inline">Scan</span>
                </motion.button>
              )}

              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                aria-label="Toggle medication dropdown options"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Autocomplete Dropdown Listbox (Flat, 1px border, shadow-sm) */}
          <AnimatePresence>
            {isOpen && !isLoading && (
              <motion.div
                id="drug-search-listbox"
                role="listbox"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: standardEaseOut }}
                className="absolute left-0 right-0 top-full mt-1.5 z-[999] bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm max-h-64 overflow-y-auto"
              >
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  <span>
                    {searchQuery ? `Matching Medications (${searchResults.length})` : 'Common Formulations'}
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">Tap to select</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-5 text-center text-slate-600 dark:text-slate-400">
                    <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">No matching medication found</p>
                    <p className="text-xs mt-1 text-slate-500">
                      Try typing brand names (e.g., Dolo 650, Pan 40, Glycomet) or salts (e.g., Paracetamol, Metformin).
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {searchResults.map((item, index) => {
                      const isHighlighted = index === activeIndex;
                      const isSelected = selectedBrandName === item.brandName || (selectedDrugId === item.mappedCuratedDrugId && !selectedBrandName);

                      return (
                        <motion.button
                          key={item.id}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full min-h-[48px] px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors ${
                            isHighlighted
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                              : isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/40 text-slate-900 dark:text-slate-100 font-semibold'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                                {renderHighlightedText(item.brandName, searchQuery)}
                              </span>
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                {item.category}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                              Contains: {renderHighlightedText(item.genericSalt, searchQuery)}
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded bg-teal-700 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
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

        {/* Selected Prescription Tag Banner (Flat border card) */}
        {selectedDrugId && (
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-start justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 text-teal-800 dark:text-teal-300 rounded border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5">
                <Pill className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Selected:
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded">
                    {activeIndianMed?.category || currentGeneric?.category || 'Standard Formulation'}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedBrandName ? (
                    <>
                      <span>Prescribed: <strong className="text-teal-800 dark:text-teal-300">{selectedBrandName}</strong></span>
                      <span className="text-slate-600 dark:text-slate-400 font-normal ml-2">
                        (Active salt: <strong className="font-semibold text-slate-800 dark:text-slate-200">{activeIndianMed?.genericSalt || currentGeneric?.name || selectedDrugId}</strong>)
                      </span>
                    </>
                  ) : (
                    <span>Medication: <strong className="text-teal-800 dark:text-teal-300">{activeIndianMed?.brandName || currentGeneric?.name || selectedDrugId}</strong></span>
                  )}
                </div>
              </div>
            </div>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                Change
              </button>
            )}
          </div>
        )}

        {/* User-Side Cross-Check Step 1: "Blister Pack Salt Confirmation" */}
        {selectedDrugId && (
          <div
            className={`p-3.5 sm:p-4 rounded-lg border transition-colors ${
              isSaltConfirmed
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800'
            }`}
            role="region"
            aria-label="Blister Pack Salt Cross-Check"
          >
            {isSaltConfirmed ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 block">
                      ✓ Blister Strip Salt Confirmed
                    </span>
                    <div className="text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-100">
                      {getBlisterFoilSalt(selectedDrugId, selectedBrandName)}
                    </div>
                  </div>
                </div>

                {onClear && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Change Medicine
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                      Verification Cross-Check
                    </span>
                    <p className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 leading-snug mt-0.5">
                      Does the back of your medicine foil strip say{' '}
                      <span className="inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-teal-900 dark:text-teal-200 font-bold">
                        "{getBlisterFoilSalt(selectedDrugId, selectedBrandName)}"
                      </span>
                      ?
                    </p>
                    <p className="text-xs text-amber-900 dark:text-amber-200 mt-0.5">
                      Confirm the active chemical compound before checking food interactions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <motion.button
                    whileTap={tactileTapPhysics}
                    type="button"
                    onClick={onConfirmSalt}
                    className="min-h-[38px] px-4 py-1.5 rounded-md bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-teal-800 transition-colors"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ Yes, Matches Strip</span>
                  </motion.button>

                  {onClear && (
                    <motion.button
                      whileTap={tactileTapPhysics}
                      type="button"
                      onClick={onClear}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
                    >
                      Change Medicine
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick-Select Common Medications (Clean Flat Buttons) */}
        <div className="pt-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            <span>Quick Select Common Medicines:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_INDIAN_SHORTCUTS.map((item) => {
              const isSelected = selectedBrandName === item.brandName || (selectedDrugId === item.mappedDrugId && !selectedBrandName);
              return (
                <motion.button
                  key={item.label}
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => handleShortcutClick(item)}
                  className={`min-h-[34px] px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

