/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { VirtualPillbox } from './components/VirtualPillbox';
import { ClashResultsAndSchedule } from './components/ClashResultsAndSchedule';
import { PrescriptionScannerModal } from './components/PrescriptionScannerModal';
import { DosageHelperModal } from './components/DosageHelperModal';
import { SmartDietCompanion } from './components/SmartDietCompanion';
import { FriendlyGuide } from './components/FriendlyGuide';
import { SymptomReliefModule } from './components/SymptomReliefModule';
import { ClinicalAiCopilot } from './components/ClinicalAiCopilot';
import { SpotlightCard } from './components/SpotlightCard';
import { MagneticButton } from './components/MagneticButton';
import { checkMultiMedicineClashes } from './data/drugClashEngine';
import { INDIAN_PHARMACY_DATABASE } from './data/indianPharmacyDatabase';
import { getSavedDosages } from './utils/dosageGuidelines';
import { useTheme } from './context/ThemeContext';
import { 
  standardEaseOut, 
  staggerContainer, 
  upwardDriftCard, 
  fluidHeightVariants 
} from './utils/motion';
import type { DrugId, FoodId, PillItem, MultiMedicineAnalysisResult } from './types';
import { ShieldCheck, Info, Clock, AlertTriangle } from 'lucide-react';

const INITIAL_PILLS: PillItem[] = [
  {
    id: 'pan-d-init',
    brandName: 'Pan-D',
    genericSalt: 'Pantoprazole (40mg) + Domperidone (30mg)',
    category: 'Antacid / PPI',
    dosageForm: 'Capsule',
    popularDose: '40mg/30mg',
    mappedCuratedDrugId: 'Pantoprazole / Pan 40' as any
  },
  {
    id: 'dolo-init',
    brandName: 'Dolo 650',
    genericSalt: 'Paracetamol (650mg)',
    category: 'Analgesic / Antipyretic',
    dosageForm: 'Tablet',
    popularDose: '650mg',
    mappedCuratedDrugId: 'Paracetamol / Acetaminophen' as any
  }
];

export default function App() {
  const { isDark } = useTheme();
  const [appMode, setAppMode] = useState<'interactions' | 'symptoms'>('interactions');
  const [selectedPills, setSelectedPills] = useState<PillItem[]>(INITIAL_PILLS);
  const [multiAnalysis, setMultiAnalysis] = useState<MultiMedicineAnalysisResult | null>(() => 
    checkMultiMedicineClashes(INITIAL_PILLS)
  );

  const [activeTab, setActiveTab] = useState<'checker' | 'diet-companion' | 'guide'>('checker');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDosageModalOpen, setIsDosageModalOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [savedDosagesCount, setSavedDosagesCount] = useState<number>(0);
  const [largeText, setLargeText] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Sync saved reminders count on mount
  useEffect(() => {
    setSavedDosagesCount(getSavedDosages().length);
  }, []);

  const refreshSavedCount = () => {
    setSavedDosagesCount(getSavedDosages().length);
  };

  // Add a pill to the virtual pillbox
  const handleAddPill = (pill: PillItem) => {
    setSelectedPills((prev) => {
      const alreadyAdded = prev.some(
        (p) => p.brandName.toLowerCase() === pill.brandName.toLowerCase()
      );
      if (alreadyAdded) return prev;
      return [...prev, pill];
    });
  };

  // Remove a pill from the virtual pillbox
  const handleRemovePill = (pillId: string) => {
    setSelectedPills((prev) => {
      const updated = prev.filter((p) => p.id !== pillId);
      if (updated.length > 0) {
        // Automatically refresh analysis for remaining pills
        setMultiAnalysis(checkMultiMedicineClashes(updated));
      } else {
        setMultiAnalysis(null);
      }
      return updated;
    });
  };

  // Clear all pills
  const handleClearAllPills = () => {
    setSelectedPills([]);
    setMultiAnalysis(null);
  };

  // Execute clash analysis and timetable generation
  const handleRunMultiAnalysis = () => {
    if (selectedPills.length === 0) return;
    setIsLoading(true);
    setTimeout(() => {
      const result = checkMultiMedicineClashes(selectedPills);
      setMultiAnalysis(result);
      setIsLoading(false);

      // Smooth scroll to timetable results
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }, 250);
  };

  // Keyboard shortcut listener: Enter key triggers timetable analysis
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && activeTab === 'checker' && !isLoading && selectedPills.length > 0) {
        handleRunMultiAnalysis();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPills, activeTab, isLoading]);

  const handleSelectQuickPair = (drug: DrugId, _food: FoodId) => {
    // Add the selected drug into the pillbox
    const found = INDIAN_PHARMACY_DATABASE.find(
      (m) =>
        m.genericSalt.toLowerCase().includes(String(drug).toLowerCase()) ||
        m.brandName.toLowerCase().includes(String(drug).toLowerCase()) ||
        (m.mappedCuratedDrugId && m.mappedCuratedDrugId.toLowerCase() === String(drug).toLowerCase())
    );

    const newPill: PillItem = found
      ? {
          id: `${found.id}-${Date.now()}`,
          brandName: found.brandName,
          genericSalt: found.genericSalt,
          category: found.category,
          dosageForm: found.dosageForm,
          popularDose: found.popularDose,
          mappedCuratedDrugId: found.mappedCuratedDrugId
        }
      : {
          id: `drug-${Date.now()}`,
          brandName: String(drug),
          genericSalt: String(drug),
          category: 'Prescription Medicine',
          dosageForm: 'Tablet',
          popularDose: 'Standard Dose',
          mappedCuratedDrugId: drug as any
        };

    handleAddPill(newPill);
    setActiveTab('checker');
    setAppMode('interactions');
    setTimeout(() => {
      const updated = [...selectedPills, newPill];
      setMultiAnalysis(checkMultiMedicineClashes(updated));
    }, 50);
  };

  const handleReset = () => {
    setSelectedPills([]);
    setMultiAnalysis(null);
    setActiveTab('checker');
    setAppMode('interactions');
  };

  const handleScannedDrugSelected = (drugId: DrugId, brandName?: string) => {
    const searchName = (brandName || String(drugId)).toLowerCase();
    const found = INDIAN_PHARMACY_DATABASE.find(
      (m) =>
        m.brandName.toLowerCase() === searchName ||
        m.genericSalt.toLowerCase().includes(searchName)
    );

    const newPill: PillItem = found
      ? {
          id: `${found.id}-${Date.now()}`,
          brandName: found.brandName,
          genericSalt: found.genericSalt,
          category: found.category,
          dosageForm: found.dosageForm,
          popularDose: found.popularDose,
          mappedCuratedDrugId: found.mappedCuratedDrugId
        }
      : {
          id: `scanned-${Date.now()}`,
          brandName: brandName || String(drugId),
          genericSalt: String(drugId),
          category: 'Prescription Medicine',
          dosageForm: 'Tablet',
          popularDose: 'Standard Dose',
          mappedCuratedDrugId: drugId as any
        };

    handleAddPill(newPill);
    setAppMode('interactions');
    setActiveTab('checker');
  };

  const activeDrugForCompanion = selectedPills.length > 0
    ? (selectedPills[0].mappedCuratedDrugId || selectedPills[0].brandName)
    : 'Atorvastatin';

  const activeBrandForCompanion = selectedPills.length > 0
    ? selectedPills[0].brandName
    : 'Storvas';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-colors duration-200 pb-16 ${
      largeText ? 'text-lg' : 'text-base'
    }`}>
      {/* High-Contrast Clinical Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appMode={appMode}
        setAppMode={setAppMode}
        onReset={handleReset}
        onOpenDosageHelper={() => setIsDosageModalOpen(true)}
        savedDosagesCount={savedDosagesCount}
        largeText={largeText}
        onToggleLargeText={() => setLargeText(!largeText)}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">

        {/* Secondary Mode: Symptom Relief & Home Care */}
        {appMode === 'symptoms' && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <SymptomReliefModule
              onCheckDrugInteraction={(drugId) => {
                const found = INDIAN_PHARMACY_DATABASE.find(
                  (m) =>
                    m.genericSalt.toLowerCase().includes(drugId.toLowerCase()) ||
                    m.brandName.toLowerCase().includes(drugId.toLowerCase()) ||
                    (m.mappedCuratedDrugId && m.mappedCuratedDrugId.toLowerCase() === drugId.toLowerCase())
                );
                if (found) {
                  handleAddPill({
                    id: `${found.id}-${Date.now()}`,
                    brandName: found.brandName,
                    genericSalt: found.genericSalt,
                    category: found.category,
                    dosageForm: found.dosageForm,
                    popularDose: found.popularDose,
                    mappedCuratedDrugId: found.mappedCuratedDrugId
                  });
                }
                setAppMode('interactions');
                setActiveTab('checker');
                setTimeout(() => handleRunMultiAnalysis(), 100);
              }}
            />
          </motion.div>
        )}

        {/* Primary Mode: Drug Interactions (Tab 1: Checker) */}
        {appMode === 'interactions' && activeTab === 'checker' && (
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Clinical Overview Intro Banner */}
            <motion.div 
              variants={upwardDriftCard}
              className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Conflict-Free Medicine Schedule Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Multi-Medicine Pillbox & Safe Daily Timetable
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Search multiple daily medicines to automatically detect harmful chemical clashes and map your safe Morning, Afternoon, and Night timetable.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 space-y-1.5 shrink-0 max-w-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                  <Info className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>How It Works:</span>
                </div>
                <p>1. Add multiple pills to your Virtual Pillbox below.</p>
                <p>2. Tap "Run Safety Analysis" to check for clashes.</p>
                <p>3. Follow your personalized Morning, Afternoon, and Night timetable.</p>
              </div>
            </motion.div>

            {/* Step 1: Virtual Pillbox Multi-Medicine Selection */}
            <div className="space-y-5">
              <motion.section 
                variants={upwardDriftCard}
                aria-label="Step 1: Virtual Pillbox Medicine Selection"
                className="relative z-30 overflow-visible"
              >
                <SpotlightCard className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <VirtualPillbox
                    selectedPills={selectedPills}
                    onAddPill={handleAddPill}
                    onRemovePill={handleRemovePill}
                    onClearAll={handleClearAllPills}
                    onOpenScanner={() => setIsScannerOpen(true)}
                    maxPills={8}
                  />
                </SpotlightCard>
              </motion.section>

              {/* Step 2: The Analysis Action Button (Magnetic Hover with Spring Physics) */}
              <AnimatePresence>
                {selectedPills.length > 0 && (
                  <motion.div 
                    key="pillbox-analysis-btn"
                    variants={fluidHeightVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative z-10 overflow-visible"
                  >
                    <MagneticButton
                      type="button"
                      maxOffset={6}
                      onClick={handleRunMultiAnalysis}
                      disabled={isLoading}
                      className="w-full min-h-[50px] px-6 rounded-lg font-bold text-base text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-colors flex items-center justify-center gap-2.5 border border-teal-800 shadow-sm disabled:opacity-60 cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2.5">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Evaluating Medicine Cross-Interactions & Timetable...</span>
                        </div>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 stroke-[2.5]" />
                          <span>
                            {selectedPills.length === 1 
                              ? 'Run Safety Analysis & Generate Timetable' 
                              : `Check for Clashes & Generate Timetable (${selectedPills.length} Medicines)`}
                          </span>
                        </>
                      )}
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Assessment Output: Clash Warnings, Timetable, Unified Diet Guide & Internet Cross-Check */}
            <section ref={resultRef} aria-label="Assessment Output" className="pt-1 relative z-0">
              <AnimatePresence mode="wait">
                {multiAnalysis && (
                  <motion.div
                    key={`analysis-${multiAnalysis.analyzedPills.map(p => p.id).join('-')}`}
                    variants={fluidHeightVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <ClashResultsAndSchedule
                      analysis={multiAnalysis}
                      onResetPillbox={handleClearAllPills}
                      onNavigateToDietGuide={() => setActiveTab('diet-companion')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

          </motion.div>
        )}

        {/* Tab 2: Smart Food Companion / Safe Diet Guide */}
        {appMode === 'interactions' && activeTab === 'diet-companion' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <SmartDietCompanion
              selectedDrug={activeDrugForCompanion as any}
              selectedBrandName={activeBrandForCompanion}
              onSelectMedication={(drug, brand) => {
                const found = INDIAN_PHARMACY_DATABASE.find(
                  (m) =>
                    m.genericSalt.toLowerCase().includes(String(drug).toLowerCase()) ||
                    m.brandName.toLowerCase().includes(String(drug).toLowerCase())
                );
                if (found) {
                  handleAddPill({
                    id: `${found.id}-${Date.now()}`,
                    brandName: found.brandName,
                    genericSalt: found.genericSalt,
                    category: found.category,
                    dosageForm: found.dosageForm,
                    popularDose: found.popularDose,
                    mappedCuratedDrugId: found.mappedCuratedDrugId
                  });
                }
              }}
              standalone
            />
          </motion.div>
        )}

        {/* Tab 3: Clinical Safety Guide */}
        {appMode === 'interactions' && activeTab === 'guide' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <FriendlyGuide onSelect={handleSelectQuickPair} />
          </motion.div>
        )}

        {/* Clinical Digital Health Footer */}
        <footer className="pt-8 pb-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4 font-medium text-slate-700 dark:text-slate-300">
            <div>
              PharmaSafe Clinical Pharmacology & Healthcare Decision Support
            </div>
            <div>
              Compliant with WCAG 2.1 AA Accessibility Guidelines
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Medical Disclaimer: PharmaSafe provides pharmacology reference information synthesized from standard clinical pharmacology guidelines for patient and caregiver education. It is not a replacement for professional medical advice, clinical diagnosis, or personalized treatment. Always consult your prescribing physician or licensed pharmacist before discontinuing or altering any medication schedule.
          </p>
        </footer>

      </main>

      {/* Prescription Bottle Label Camera Scanner Modal */}
      <PrescriptionScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSelectScannedDrug={handleScannedDrugSelected}
      />

      {/* Dosage Schedule Overlay Modal */}
      <DosageHelperModal
        isOpen={isDosageModalOpen}
        onClose={() => {
          setIsDosageModalOpen(false);
          refreshSavedCount();
        }}
        activeDrug={activeDrugForCompanion as any}
        onSelectSavedDrug={(drug) => {
          const found = INDIAN_PHARMACY_DATABASE.find(
            (m) =>
              m.brandName.toLowerCase() === drug.toLowerCase() ||
              m.genericSalt.toLowerCase().includes(drug.toLowerCase())
          );
          if (found) {
            handleAddPill({
              id: `${found.id}-${Date.now()}`,
              brandName: found.brandName,
              genericSalt: found.genericSalt,
              category: found.category,
              dosageForm: found.dosageForm,
              popularDose: found.popularDose,
              mappedCuratedDrugId: found.mappedCuratedDrugId
            });
          }
          setIsDosageModalOpen(false);
          refreshSavedCount();
          setActiveTab('checker');
        }}
      />

      {/* Clinical AI Copilot Chatbot */}
      <ClinicalAiCopilot
        selectedPills={selectedPills}
        multiAnalysis={multiAnalysis}
        selectedDrug={activeDrugForCompanion as any}
        selectedBrandName={activeBrandForCompanion}
      />
    </div>
  );
}
