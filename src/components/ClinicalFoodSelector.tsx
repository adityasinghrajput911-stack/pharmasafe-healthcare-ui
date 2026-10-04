import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, X, Coffee, Wine, Apple, Milk, Leaf, UtensilsCrossed, AlertCircle } from 'lucide-react';
import { standardEaseOut, tactileTapPhysics, chipTapPhysics } from '../utils/motion';
import type { FoodId } from '../types';

interface ClinicalFoodSelectorProps {
  stepNumber?: string;
  selectedFoodId: FoodId | null;
  onChangeFood: (foodId: FoodId) => void;
  onClear?: () => void;
}

interface FoodMeta {
  id: FoodId;
  name: string;
  category: 'Dairy & Calcium' | 'Fruits & Produce' | 'Vegetables & Greens' | 'Beverages' | 'Aged & Fermented' | 'Neutral Staples';
  description: string;
  keyActiveCompound: string;
  chipLabel: string;
  chipIcon: string;
}

export const FOOD_DATABASE: FoodMeta[] = [
  {
    id: 'Milk / Dairy Products',
    name: 'Milk, Yogurt & Cheese (Dairy)',
    category: 'Dairy & Calcium',
    description: 'Cow milk, cheese, yogurt, calcium-fortified plant milks, and dairy shakes.',
    keyActiveCompound: 'Calcium (Ca²⁺) & Magnesium cations',
    chipLabel: '🥛 Dairy',
    chipIcon: '🥛'
  },
  {
    id: 'Grapefruit / Grapefruit Juice',
    name: 'Grapefruit & Citrus Juice',
    category: 'Fruits & Produce',
    description: 'Fresh grapefruit, concentrated grapefruit juice, pomelos, and Seville oranges.',
    keyActiveCompound: 'Furanocoumarins (Bergamottin)',
    chipLabel: '🍊 Citrus',
    chipIcon: '🍊'
  },
  {
    id: 'Coffee / Black Tea',
    name: 'Coffee & Black / Green Tea',
    category: 'Beverages',
    description: 'Brewed coffee, espresso, black tea, green tea, iced tea, and energy drinks.',
    keyActiveCompound: 'Caffeine & Chlorogenic Acid Tannins',
    chipLabel: '☕ Caffeine',
    chipIcon: '☕'
  },
  {
    id: 'Alcohol / Beer / Wine',
    name: 'Alcohol, Wine, Beer & Spirits',
    category: 'Beverages',
    description: 'Beer, red/white wine, liquor, spirits, and mixed alcoholic drinks.',
    keyActiveCompound: 'Ethanol (Ethyl Alcohol)',
    chipLabel: '🍷 Alcohol',
    chipIcon: '🍷'
  },
  {
    id: 'Spinach, Kale & Broccoli (Vitamin K Rich)',
    name: 'Spinach, Kale & Dark Greens',
    category: 'Vegetables & Greens',
    description: 'Cooked or raw spinach, kale, broccoli, Brussels sprouts, and collard greens.',
    keyActiveCompound: 'Phylloquinone (Vitamin K1)',
    chipLabel: '🥬 Greens',
    chipIcon: '🥬'
  },
  {
    id: 'Bananas & Salt Substitutes (High Potassium)',
    name: 'Bananas & Potassium Salt Substitutes',
    category: 'Fruits & Produce',
    description: 'Bananas, potassium chloride table salt substitutes (NoSalt, Nu-Salt), dried fruit.',
    keyActiveCompound: 'Potassium Chloride (KCl)',
    chipLabel: '🍌 Potassium',
    chipIcon: '🍌'
  },
  {
    id: 'Aged Cheese & Fermented Foods (High Tyramine)',
    name: 'Aged Cheese & Fermented Foods',
    category: 'Aged & Fermented',
    description: 'Aged cheddar, parmesan, blue cheese, cured salami, tap beer, and soy sauce.',
    keyActiveCompound: 'Biogenic Tyramine',
    chipLabel: '🧀 Aged Cheese',
    chipIcon: '🧀'
  },
  {
    id: 'Black Licorice (Natural Glycyrrhizin)',
    name: 'Black Licorice (Natural Extract)',
    category: 'Aged & Fermented',
    description: 'Traditional black licorice candy, licorice root extract, herbal licorice teas.',
    keyActiveCompound: 'Glycyrrhizic Acid',
    chipLabel: '🌿 Licorice',
    chipIcon: '🌿'
  },
  {
    id: 'Plain White Rice & Apples',
    name: 'Plain White Rice & Apples (Neutral)',
    category: 'Neutral Staples',
    description: 'Boiled white rice, fresh peeled apples, plain toast, and steamed carrots.',
    keyActiveCompound: 'Simple Starch & Pectin',
    chipLabel: '🍚 White Rice',
    chipIcon: '🍚'
  },
  {
    id: 'Oatmeal & Whole Wheat Toast',
    name: 'Oatmeal & Whole Wheat Bread',
    category: 'Neutral Staples',
    description: 'Plain rolled oats, unfortified whole grain toast, and plain crackers.',
    keyActiveCompound: 'Dietary Beta-Glucan Fiber',
    chipLabel: '🥣 Oatmeal',
    chipIcon: '🥣'
  }
];

const QUICK_TAP_CATEGORIES = [
  { label: '🥛 Dairy', foodId: 'Milk / Dairy Products' as FoodId },
  { label: '🍊 Citrus', foodId: 'Grapefruit / Grapefruit Juice' as FoodId },
  { label: '🍷 Alcohol', foodId: 'Alcohol / Beer / Wine' as FoodId },
  { label: '☕ Caffeine', foodId: 'Coffee / Black Tea' as FoodId },
  { label: '🥬 Greens', foodId: 'Spinach, Kale & Broccoli (Vitamin K Rich)' as FoodId },
  { label: '🍌 Potassium', foodId: 'Bananas & Salt Substitutes (High Potassium)' as FoodId },
];

export const ClinicalFoodSelector: React.FC<ClinicalFoodSelectorProps> = ({
  stepNumber = "2",
  selectedFoodId,
  onChangeFood,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedFood = selectedFoodId ? (FOOD_DATABASE.find((f) => f.id === selectedFoodId) || null) : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFoods = FOOD_DATABASE.filter((food) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      food.name.toLowerCase().includes(q) ||
      food.description.toLowerCase().includes(q) ||
      food.category.toLowerCase().includes(q) ||
      food.keyActiveCompound.toLowerCase().includes(q)
    );
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dairy & Calcium':
        return <Milk className="w-4 h-4 text-teal-700 dark:text-teal-400" />;
      case 'Fruits & Produce':
        return <Apple className="w-4 h-4 text-amber-700 dark:text-amber-400" />;
      case 'Vegetables & Greens':
        return <Leaf className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case 'Beverages':
        return <Coffee className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />;
      default:
        return <UtensilsCrossed className="w-4 h-4 text-slate-700 dark:text-slate-400" />;
    }
  };

  const handleSelectFood = (foodId: FoodId) => {
    onChangeFood(foodId);
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
      setActiveIndex((prev) => (prev < filteredFoods.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredFoods.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredFoods[activeIndex]) {
        handleSelectFood(filteredFoods[activeIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Panel Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <label 
            htmlFor="food-search-input" 
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-teal-700 text-white text-xs font-bold">
              {stepNumber}
            </span>
            <span>Step 2: Select Diet or Beverage to Cross-Check</span>
          </label>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Step 2 of 2
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Type to search or tap a common dietary category below.
        </p>
      </div>

      {/* Main Search Input Container */}
      <div className="space-y-3.5">
        <div className="relative w-full z-40">
          <div className="relative w-full">
            <Search 
              className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
              aria-hidden="true" 
            />
            
            <input
              id="food-search-input"
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls="food-search-listbox"
              aria-autocomplete="list"
              value={isOpen ? searchQuery : (selectedFood?.name || '')}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search food or drink (e.g. Milk, Grapefruit, Wine, Coffee)..."
              className="w-full h-12 pl-10 pr-20 text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none transition-colors shadow-sm placeholder:text-slate-400 placeholder:font-normal"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
              {isOpen && searchQuery && (
                <motion.button
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    inputRef.current?.focus();
                  }}
                  className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                  aria-label="Clear food search text"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}

              <motion.button
                whileTap={chipTapPhysics}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                aria-label="Toggle food dropdown options"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Autocomplete Dropdown Listbox */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="food-search-listbox"
                role="listbox"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: standardEaseOut }}
                className="absolute left-0 right-0 top-full mt-1.5 z-[999] bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm max-h-64 overflow-y-auto"
              >
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  <span>{searchQuery ? `Matching Foods (${filteredFoods.length})` : 'Dietary Items'}</span>
                  <span className="text-[11px] font-normal text-slate-500">Tap to select</span>
                </div>

                {filteredFoods.length === 0 ? (
                  <div className="p-5 text-center text-slate-600 dark:text-slate-400">
                    <AlertCircle className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">No matching food found</p>
                    <p className="text-xs mt-1 text-slate-500">
                      Try searching for Milk, Grapefruit, Spinach, Coffee, Alcohol, or Rice.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredFoods.map((food, index) => {
                      const isHighlighted = index === activeIndex;
                      const isSelected = food.id === selectedFoodId;

                      return (
                        <motion.button
                          key={food.id}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectFood(food.id)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`w-full min-h-[48px] px-4 py-2.5 text-left flex items-center justify-between gap-3 transition-colors ${
                            isHighlighted
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                              : isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/40 text-slate-900 dark:text-slate-100 font-semibold'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                              {getCategoryIcon(food.category)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                                  {food.name}
                                </span>
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {food.category}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                {food.description}
                              </div>
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

        {/* Selected Food Tag Banner */}
        {selectedFood && (
          <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-start justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 text-teal-800 dark:text-teal-300 rounded border border-slate-200 dark:border-slate-700 shrink-0 mt-0.5">
                {getCategoryIcon(selectedFood.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Selected Food:
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded">
                    {selectedFood.category}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  <strong className="text-teal-800 dark:text-teal-300">{selectedFood.name}</strong>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Compound: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedFood.keyActiveCompound}</span> — {selectedFood.description}
                </p>
              </div>
            </div>
            {onClear && (
              <motion.button
                whileTap={tactileTapPhysics}
                type="button"
                onClick={onClear}
                className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              >
                Change
              </motion.button>
            )}
          </div>
        )}

        {/* Quick-Tap Categories (Clean Flat Buttons) */}
        <div className="pt-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
            <span>Quick Select Categories:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAP_CATEGORIES.map((chip) => {
              const isSelected = selectedFoodId === chip.foodId;
              return (
                <motion.button
                  key={chip.label}
                  whileTap={chipTapPhysics}
                  type="button"
                  onClick={() => handleSelectFood(chip.foodId)}
                  className={`min-h-[34px] px-3.5 py-1 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-800 font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{chip.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 stroke-[3] ml-0.5" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
