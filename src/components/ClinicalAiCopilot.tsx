import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Send, 
  AlertTriangle, 
  Bot, 
  User, 
  RefreshCw, 
  Minimize2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { standardEaseOut, tactileTapPhysics, chipTapPhysics } from '../utils/motion';
import { MagneticButton } from './MagneticButton';
import type { DrugId, FoodId, InteractionAnalysis, PillItem, MultiMedicineAnalysisResult } from '../types';
import { getBlisterFoilSalt } from '../data/indianPharmacyDatabase';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface ClinicalAiCopilotProps {
  selectedDrug?: DrugId | null;
  selectedBrandName?: string;
  selectedFood?: FoodId | null;
  analysisResult?: InteractionAnalysis | null;
  selectedPills?: PillItem[];
  multiAnalysis?: MultiMedicineAnalysisResult | null;
}

export const ClinicalAiCopilot: React.FC<ClinicalAiCopilotProps> = ({
  selectedDrug,
  selectedBrandName,
  selectedFood,
  analysisResult,
  selectedPills = [],
  multiAnalysis = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: 'Namaste! I am your PharmaSafe Smart Assistant. I can explain medicine timing, drug-to-drug clashes, safe diet advice, or missed-dose guidelines. How can I help you today?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pillNames = selectedPills.map(p => p.brandName).join(' + ');
  const activeDrugName = selectedBrandName || (selectedDrug ? String(selectedDrug) : pillNames || null);
  const activeSaltName = selectedDrug ? getBlisterFoilSalt(selectedDrug, selectedBrandName) : undefined;

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on open
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isLoading]);

  // Contextual Quick-Tap prompts based on what the user is currently viewing in PharmaSafe
  const getContextualPrompts = (): string[] => {
    const list: string[] = [];

    if (activeDrugName && selectedFood) {
      list.push('Explain this interaction simply');
      list.push(`Can I drink tea with ${activeDrugName}?`);
      list.push('What if I missed a dose?');
      list.push(`Is ${selectedFood} safe 2 hours later?`);
    } else if (activeDrugName) {
      list.push(`Can I drink tea with ${activeDrugName}?`);
      list.push('What if I missed a dose?');
      list.push(`What foods should I avoid with ${activeDrugName}?`);
      list.push(`Best time of day to take ${activeDrugName}?`);
    } else {
      list.push('Explain this interaction simply');
      list.push('Can I drink tea with this?');
      list.push('What if I missed a dose?');
      list.push('Which foods clash with blood pressure pills?');
    }

    return list;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInputText('');

    // --- CLIENT-SIDE INTERCEPTION FOR QUICK-ACTIONS (Bypasses API completely for production / Vercel) ---
    const normalizedText = text.trim().toLowerCase();

    // 1. "What if I missed a dose?"
    if (
      text === 'What if I missed a dose?' || 
      normalizedText === 'what if i missed a dose?' || 
      normalizedText === 'what if i missed a dose'
    ) {
      const botMsg: Message = {
        id: `bot-intercept-${Date.now()}`,
        role: 'model',
        content: `Standard clinical rule for missed doses: Take your missed dose as soon as you remember. However, if it is almost time for your next scheduled dose, skip the missed dose and resume your regular schedule. Never take two doses at once or double up to make up for a missed dose.\n\n⚠️ Disclaimer: PharmaSafe Smart Assistant is an educational AI tool, not a doctor. Always check your medicine strip or consult your prescribing doctor or pharmacist for personalized instructions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      return;
    }

    // 2. "Can I drink tea with Pan-D?"
    if (
      text === 'Can I drink tea with Pan-D?' ||
      normalizedText === 'can i drink tea with pan-d?' ||
      normalizedText === 'can i drink tea with pan-d' ||
      normalizedText === 'can i drink tea with pan d?' ||
      normalizedText === 'can i drink tea with pan d'
    ) {
      const botMsg: Message = {
        id: `bot-intercept-${Date.now()}`,
        role: 'model',
        content: `Pan-D (Pantoprazole + Domperidone) is an antacid/anti-reflux capsule that should strictly be taken on an empty stomach with plain room-temperature water, ideally 30 to 60 minutes before your morning meal.\n\nAvoid drinking tea, chai, or coffee immediately before or with Pan-D. Caffeine and hot tannins stimulate stomach acid production, directly counteracting the acid-reducing effect of Pantoprazole. Wait at least 30 to 45 minutes after taking Pan-D before having your tea or chai.\n\n⚠️ Disclaimer: PharmaSafe Smart Assistant is an educational AI tool, not a doctor. This guidance is based on standard Indian Pharmacopoeia guidelines. Always consult your healthcare provider.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      return;
    }

    // Custom messages only: attempt the backend API call
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          })),
          context: {
            drug: selectedDrug,
            brandName: selectedBrandName,
            genericSalt: activeSaltName,
            food: selectedFood,
            analysis: analysisResult
              ? {
                  severity: analysisResult.severity,
                  headline: analysisResult.headline,
                  mechanismExplanation: analysisResult.mechanismExplanation,
                  timingBuffer:
                    analysisResult.timingBuffer?.badgeText ||
                    analysisResult.timingBuffer?.shortLabel
                }
              : null
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Chat API error ${response.status}`);
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || 'I am an AI, not a doctor. I cannot diagnose or prescribe medication. Please consult a physician.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('[PharmaSafe Copilot] Failed to send message:', err);
      // Fallback message adhering to safety guardrails
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        role: 'model',
        content: 'I am an AI, not a doctor. I cannot diagnose or prescribe medication. Please consult a physician, or check our verified clinical diet tabs.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: 'Chat cleared. How can I help you double-check your medication and meal schedule?',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* 1. Floating Action Button with Magnetic Hover & Tactile Spring Physics */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15, ease: standardEaseOut }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 no-print"
          >
            <MagneticButton
              type="button"
              maxOffset={5}
              onClick={() => setIsOpen(true)}
              className="h-11 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white shadow-sm flex items-center gap-2 border border-teal-800 transition-colors cursor-pointer"
              aria-label="Open PharmaSafe Smart Assistant Chat"
              title="Ask PharmaSafe Smart Assistant"
            >
              <Sparkles className="w-4 h-4 text-teal-200 stroke-[2.2]" />
              <span className="text-sm font-semibold tracking-wide">Smart Assistant</span>
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: standardEaseOut }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden no-print"
            role="dialog"
            aria-label="PharmaSafe Smart Assistant"
          >
            {/* Header: Solid Teal with Amber Disclaimer Badge */}
            <div className="p-4 bg-teal-800 dark:bg-slate-900 text-white flex items-start justify-between gap-3 shrink-0 border-b border-teal-900 dark:border-slate-800">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-teal-700 text-teal-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-base font-bold tracking-tight truncate">
                    PharmaSafe Smart Assistant
                  </h3>
                </div>

                {/* Mandatory Sub-Badge in Amber */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-bold text-[11px] uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 shrink-0 stroke-[2.5]" />
                  <span>AI Assistant • Not a Doctor</span>
                </div>
              </div>

              {/* Window Controls: Reset & Minimize (X) */}
              <div className="flex items-center gap-1 shrink-0">
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={handleResetChat}
                  title="Clear conversation"
                  aria-label="Clear chat history"
                  className="w-7 h-7 rounded-md hover:bg-teal-700 flex items-center justify-center text-teal-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize AI Copilot window"
                  className="w-7 h-7 rounded-md hover:bg-teal-700 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              </div>
            </div>

            {/* Currently Active Prescription Context Pill */}
            {activeDrugName && (
              <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <div className="truncate">
                  <span>Current Pill: </span>
                  <strong className="text-slate-900 dark:text-slate-100 font-semibold">{activeDrugName}</strong>
                  {selectedFood && (
                    <span> + <strong className="text-slate-900 dark:text-slate-100">{selectedFood}</strong></span>
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400 shrink-0 ml-2">
                  Audited
                </span>
              </div>
            )}

            {/* Message History Area */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50/50 dark:bg-slate-950">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`text-sm leading-relaxed rounded-lg px-3.5 py-2.5 ${
                        isUser
                          ? 'bg-teal-700 text-white max-w-[85%]'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 max-w-[90%]'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {/* Loading State */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
                    <span 
                      className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" 
                      style={{ animationDelay: '200ms' }} 
                    />
                    <span 
                      className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" 
                      style={{ animationDelay: '400ms' }} 
                    />
                  </div>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 mt-1 px-1">
                    Searching verified clinical database...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick-Tap Prompts */}
            <div className="px-3 pt-2 pb-1.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {getContextualPrompts().map((promptText, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={chipTapPhysics}
                    type="button"
                    onClick={() => handleSendMessage(promptText)}
                    disabled={isLoading}
                    className="min-h-[30px] px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium whitespace-nowrap shrink-0 transition-colors disabled:opacity-50"
                  >
                    {promptText}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about food timings, side effects..."
                disabled={isLoading}
                className="flex-1 h-9 px-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:border-teal-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
              <motion.button
                whileTap={tactileTapPhysics}
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="h-9 px-3 rounded-md bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
              </motion.button>
            </div>

            {/* Bottom Guardrail Footer */}
            <div className="px-3 py-1 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-800">
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                PharmaSafe Smart Assistant is grounded in CDSCO guidelines. Not a replacement for a doctor.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
