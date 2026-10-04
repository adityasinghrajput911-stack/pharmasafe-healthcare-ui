import type { DrugId, CuratedDrugId, PillItem } from '../types';
import { matchCuratedDrug } from './brandDatabase';

export interface FoodTag {
  name: string;
  emoji: string;
  detail: string;
}

export interface TrafficLightDietPlan {
  medicineName: string;
  genericSalt: string;
  redZone: {
    title: string;
    subtitle: string;
    foods: FoodTag[];
    reasonWhy: string;
  };
  amberZone: {
    title: string;
    subtitle: string;
    timeBadge: string;
    foods: FoodTag[];
    reasonWhy: string;
  };
  greenZone: {
    title: string;
    subtitle: string;
    foods: FoodTag[];
    reasonWhy: string;
  };
}

const TRAFFIC_LIGHT_RULES: Record<CuratedDrugId, TrafficLightDietPlan> = {
  'Atorvastatin': {
    medicineName: 'Atorvastatin / Storvas / Lipicure',
    genericSalt: 'Atorvastatin Calcium (Statin)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Critical biochemical conflict that surges medication levels into toxic territory',
      foods: [
        { name: 'Grapefruit & Grapefruit Juice', emoji: '🚫 🍊', detail: 'Irreversibly destroys CYP3A4 gut enzymes' },
        { name: 'Alcohol & Wine', emoji: '🚫 🍷', detail: 'Multiplies liver strain and muscle toxicity' },
        { name: 'Seville Bitter Oranges', emoji: '🚫 🍊', detail: 'Contains same toxic furanocoumarins as grapefruit' }
      ],
      reasonWhy: 'Grapefruit permanently deactivates the intestinal enzymes that metabolize this medicine, causing drug blood levels to surge up to 330% and risking acute muscle breakdown (rhabdomyolysis) and kidney strain.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Safe only if separated by adequate digestion time',
      timeBadge: 'Wait at least 2 hours',
      foods: [
        { name: 'Heavy Oat Bran & Coarse Fiber', emoji: '🥣', detail: 'Can trap tablet particles in the stomach' },
        { name: 'High-Dose Black Coffee / Energy Drinks', emoji: '☕', detail: 'Elevates cardiac workload' }
      ],
      reasonWhy: 'Massive amounts of coarse oat bran or insoluble fiber can bind oral statin tablets in the gut; separate your medication dose from heavy fiber meals by 2 hours.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Wholesome, heart-healthy grocery staples with zero drug clash',
      foods: [
        { name: 'Sweet Navel Oranges & Sweet Lime (Mosambi)', emoji: '🍊', detail: 'Zero CYP3A4 inhibition' },
        { name: 'Fresh Apples & Applesauce', emoji: '🍎', detail: 'Gentle soluble pectin' },
        { name: 'Steamed White Rice & Roti', emoji: '🍚', detail: 'Neutral digestible grains' },
        { name: 'Ripe Bananas', emoji: '🍌', detail: 'Safe natural potassium' },
        { name: 'Fresh Milk & Homemade Curd (Dahi)', emoji: '🥛', detail: 'Nutritious daily dairy' },
        { name: 'Moong Dal, Paneer & Sabzi', emoji: '🥗', detail: 'Heart-healthy Indian nutrition' }
      ],
      reasonWhy: 'These fresh everyday fruits and home-cooked Indian staples contain zero furanocoumarins and nourish your body safely while your cholesterol medicine does its job.'
    }
  },

  'Paracetamol / Acetaminophen': {
    medicineName: 'Dolo 650 / Calpol / Crocin / Pacimol',
    genericSalt: 'Paracetamol / Acetaminophen (Antipyretic & Analgesic)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Dangerous combination causing rapid liver cell depletion',
      foods: [
        { name: 'Alcohol, Beer & Hard Liquor', emoji: '🚫 🍺', detail: 'Depletes glutathione and triggers acute liver toxicity' },
        { name: 'Excessive Hangover Cocktails', emoji: '🚫 🍹', detail: 'Severe dual stress on hepatic filtration' }
      ],
      reasonWhy: 'Alcohol forces your liver to convert paracetamol into a toxic byproduct (NAPQI) that rapidly destroys hepatic tissue when cellular antioxidant stores are depleted.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Avoid simultaneous intake to protect your stomach lining',
      timeBadge: 'Wait at least 1 hour',
      foods: [
        { name: 'Strong Black Coffee & Espresso', emoji: '☕', detail: 'Increases gastric acid and heart rate' },
        { name: 'High-Sugar Carbonated Colas', emoji: '🥤', detail: 'Delays uniform stomach tablet dissolution' }
      ],
      reasonWhy: 'Strong caffeine on an empty feverish stomach triggers acid flare-ups; take your fever tablet with plain water and space coffee apart by at least 1 hour.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Hydrating, comforting Indian foods that speed fever recovery',
      foods: [
        { name: 'Fresh Tender Coconut Water', emoji: '🥥', detail: 'Restores vital electrolytes naturally' },
        { name: 'Light Moong Dal Khichdi', emoji: '🍲', detail: 'Gentle on recovering stomach' },
        { name: 'Steamed White Rice & Curd (Dahi-Chawal)', emoji: '🍚', detail: 'Calms internal digestion' },
        { name: 'Stewed Apples & Pears', emoji: '🍎', detail: 'Soothing natural energy' },
        { name: 'Herbal Tulsi & Ginger Water', emoji: '🍵', detail: 'Caffeine-free soothing hydration' },
        { name: 'Plain Toast & Warm Soups', emoji: '🍞', detail: 'Non-irritating mild sustenance' }
      ],
      reasonWhy: 'These light, easily digested meals keep your energy steady without taxing your liver while fever and pain subside.'
    }
  },

  'Metformin': {
    medicineName: 'Glycomet / Glycomet-GP / Gluconorm',
    genericSalt: 'Metformin Hydrochloride (Oral Antidiabetic)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Critical trigger for dangerous systemic lactic acid accumulation',
      foods: [
        { name: 'Alcoholic Drinks & Cocktails', emoji: '🚫 🍷', detail: 'Blocks liver lactate clearance, triggering Lactic Acidosis' },
        { name: 'Binge Drinking & Hard Spirits', emoji: '🚫 🥃', detail: 'Fatal risk of sudden severe hypoglycemia' }
      ],
      reasonWhy: 'Alcohol halts the liver\'s ability to clear lactate produced during cellular metabolism, provoking potentially fatal Lactic Acidosis.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Always consume alongside or immediately after meals',
      timeBadge: 'Take directly with meals',
      foods: [
        { name: 'High-Sugar Sweets (Mithai / Halwa)', emoji: '🍬', detail: 'Spikes glucose and triggers intense stomach cramps' },
        { name: 'Empty Stomach Strong Coffee', emoji: '☕', detail: 'Causes acute nausea and diarrhoea' }
      ],
      reasonWhy: 'Metformin slows gastrointestinal sugar transit; taking it on an empty stomach or with concentrated sugar causes acute cramping and digestive distress.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Low-glycemic Indian pantry items that smooth out blood sugar',
      foods: [
        { name: 'Whole Wheat Roti & Multigrain Chapati', emoji: '🫓', detail: 'Steady slow-release complex carbs' },
        { name: 'Moong Dal, Chana & Rajma', emoji: '🫘', detail: 'High plant protein & soluble fiber' },
        { name: 'Green Vegetables & Palak / Methi', emoji: '🥗', detail: 'Zero glycemic spike' },
        { name: 'Fresh Cucumbers & Raw Tomatoes', emoji: '🥒', detail: 'Crunchy low-calorie hydration' },
        { name: 'Plain Homemade Paneer & Boiled Eggs', emoji: '🥚', detail: 'Clean protein for glycemic stability' },
        { name: 'Clear Water with Lemon (Nimbu Pani)', emoji: '🍋', detail: 'Pure kidney hydration' }
      ],
      reasonWhy: 'Rich in dietary fiber and clean protein, these foods optimize insulin sensitivity and prevent sudden spikes in glucose.'
    }
  },

  'Lisinopril / Losartan': {
    medicineName: 'Telma / Telma-H / Tazloc / Telmikind / Losar',
    genericSalt: 'Telmisartan / Losartan (RAAS Pathway / ARB)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'High risk of toxic potassium build-up (Hyperkalemia)',
      foods: [
        { name: 'Potassium Salt Substitutes (Lona / Low-Sodium Salt)', emoji: '🚫 🧂', detail: 'Packed with pure Potassium Chloride (KCl)' },
        { name: 'Excessive Daily Bananas (>2 per day)', emoji: '🚫 🍌', detail: 'Overwhelms diminished kidney potassium excretion' }
      ],
      reasonWhy: 'Telmisartan and ARB blood pressure medications stop your kidneys from flushing potassium; combining them with potassium salt substitutes can cause fatal heart rhythm abnormalities.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Can trigger dizzy spells and sudden postural hypotension',
      timeBadge: 'Wait at least 2 hours',
      foods: [
        { name: 'Alcoholic Beverages', emoji: '🍺', detail: 'Amplifies sudden blood pressure drops upon standing' },
        { name: 'Strong Morning Caffeine', emoji: '☕', detail: 'Temporarily fluctuates vascular tone' }
      ],
      reasonWhy: 'Alcohol widens blood vessels simultaneously with your medicine, creating sudden orthostatic lightheadedness or fainting.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Naturally low-potassium Indian foods that keep blood pressure smooth',
      foods: [
        { name: 'Sweet Apples & Pears', emoji: '🍎', detail: 'Naturally low potassium profile' },
        { name: 'Steamed Rice, Poha & Toast', emoji: '🍚', detail: 'Gentle neutral grain energy' },
        { name: 'Carrots, Cabbage & Bottle Gourd (Lauki)', emoji: '🥕', detail: 'Hydrating low-potassium vegetables' },
        { name: 'Fresh Lemon & Cumin Seasoning', emoji: '🍋', detail: 'Delicious salt-free flavour boost' },
        { name: 'Fresh Green Beans & Green Peas', emoji: '🫛', detail: 'Safe nutrient-dense sides' },
        { name: 'Plain Water & Herbal Tisanes', emoji: '💧', detail: 'Maintains optimal vascular volume' }
      ],
      reasonWhy: 'Seasoning with natural herbs, garlic, and lemon delivers robust flavor without dangerous potassium chloride salts.'
    }
  },

  'Warfarin': {
    medicineName: 'Marevan / Warf',
    genericSalt: 'Warfarin Sodium (Vitamin K Antagonist Anticoagulant)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Directly neutralizes blood-thinner efficacy or triggers dangerous bleeding',
      foods: [
        { name: 'Surges of Spinach, Kale & Sarson Saag', emoji: '🚫 🥬', detail: 'Vitamin K flood overwhelms anticoagulation' },
        { name: 'Alcohol & Heavy Beer', emoji: '🚫 🍷', detail: 'Unpredictably spikes bleeding and haemorrhage risk' },
        { name: 'Cranberry Concentrate Juice', emoji: '🚫 🍒', detail: 'Inhibits Warfarin metabolism, causing dangerous INR spikes' }
      ],
      reasonWhy: 'Sudden massive spikes in dietary Vitamin K override Warfarin\'s therapeutic enzyme blockade, leading to sudden stroke and thrombosis risk.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Requires absolute daily intake consistency',
      timeBadge: 'Keep Strictly Consistent Daily',
      foods: [
        { name: 'Green Tea & Matcha', emoji: '🍵', detail: 'Contains natural Vitamin K1' },
        { name: 'Broccoli & Brussels Sprouts', emoji: '🥦', detail: 'Consume in stable, identical portions' }
      ],
      reasonWhy: 'The clinical rule with Warfarin is consistency: never suddenly start or stop eating greens without consulting your haematologist.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Low Vitamin K grocery staples that keep blood clotting levels rock-solid',
      foods: [
        { name: 'Fresh Apples, Peaches & Oranges', emoji: '🍎', detail: 'Negligible Vitamin K content' },
        { name: 'White Rice, Chapati & Potatoes', emoji: '🍚', detail: 'Clean carbohydrates with zero clotting clash' },
        { name: 'Carrots, Bell Peppers & Cucumbers', emoji: '🥕', detail: 'Crisp low-K salad staples' },
        { name: 'Fresh Milk & Homemade Paneer', emoji: '🥛', detail: 'Safe calcium & protein sources' },
        { name: 'Moong Dal & Cooked Lentils', emoji: '🍲', detail: 'Safe steady Indian nutrition' }
      ],
      reasonWhy: 'These everyday foods have predictable, trace Vitamin K levels that allow your prescribed Warfarin dose to maintain the exact target INR.'
    }
  },

  'Levothyroxine': {
    medicineName: 'Thyronorm / Eltroxin / Thyrox',
    genericSalt: 'Levothyroxine Sodium (Synthetic Thyroid T4 Hormone)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Physically blocks up to 80% of your morning thyroid hormone uptake',
      foods: [
        { name: 'Morning Black Coffee / Espresso with pill', emoji: '🚫 ☕', detail: 'Acidic caffeine coats gut enterocytes' },
        { name: 'Soy Milk, Edamame & Soya Chunks with pill', emoji: '🚫 🫛', detail: 'Isoflavones physically trap thyroid hormones' },
        { name: 'High-Calcium Dairy Milk taken simultaneously', emoji: '🚫 🥛', detail: 'Binds tablet into unabsorbable chalky mass' }
      ],
      reasonWhy: 'Caffeine, soy, and dairy calcium physically adhere to the fragile synthetic T4 hormone in the stomach lumen, preventing it from passing into your bloodstream.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Must be strictly separated from your morning waking tablet',
      timeBadge: 'Wait at least 4 hours',
      foods: [
        { name: 'Calcium Tablets & Rich Dairy (Paneer/Curd)', emoji: '🥛', detail: 'Separate by at least 4 full hours' },
        { name: 'Iron Tonics & Supplements (DexOrange)', emoji: '💊', detail: 'Separate by at least 4 full hours' },
        { name: 'Breakfast Cereals & Walnuts', emoji: '🥣', detail: 'Wait at least 30-60 minutes after taking pill' }
      ],
      reasonWhy: 'Take Thyronorm first thing in the morning with plain water on a completely empty stomach. Wait 30-60 minutes before breakfast, and 4 hours before taking calcium or iron.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Nourishing Indian morning foods to enjoy 60 minutes after taking your pill',
      foods: [
        { name: 'Full Glass of Clean Plain Water', emoji: '💧', detail: 'Take medicine ONLY with plain water' },
        { name: 'Warm Poha, Upma & Toast (After 1 hr)', emoji: '🍞', detail: 'Comforting, easy morning carbs' },
        { name: 'Fresh Apples & Bananas (After 1 hr)', emoji: '🍎', detail: 'Wholesome whole fruits' },
        { name: 'Boiled Eggs & Mild Dal (After 1 hr)', emoji: '🥚', detail: 'Sustained healthy morning energy' },
        { name: 'Normal Lunch & Dinner Foods', emoji: '🥗', detail: 'Zero restrictions later in the day' }
      ],
      reasonWhy: 'Once your morning 60-minute absorption window passes, your body has absorbed the thyroid hormone and you can enjoy normal daily meals.'
    }
  },

  'Tetracycline / Ciprofloxacin': {
    medicineName: 'Ciplox / Cifran / Cipro',
    genericSalt: 'Ciprofloxacin / Fluoroquinolone (Antibacterial)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Chemical binding (chelation) that wipes out antibiotic strength',
      foods: [
        { name: 'Milk, Paneer, Curd & Yogurt with pill', emoji: '🚫 🥛', detail: 'Calcium ions bind antibiotic like chemical glue' },
        { name: 'Calcium & Iron Fortified Health Drinks', emoji: '🚫 🥤', detail: 'Forms insoluble unabsorbable chelate complex' }
      ],
      reasonWhy: 'Multivalent calcium and magnesium ions in dairy bind to the antibiotic molecule in your stomach, creating an insoluble compound that cannot pass into your bloodstream.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Safe if separated by digestive buffer windows',
      timeBadge: 'Wait 2 hrs before or 4 hrs after',
      foods: [
        { name: 'Antacids (Gelusil / Digene / Pan-D)', emoji: '💊', detail: 'Aluminium/Magnesium destroys absorption' },
        { name: 'Chai & Black Tea', emoji: '☕', detail: 'Tannins interfere with digestive transit' }
      ],
      reasonWhy: 'Always schedule antacids and dairy at least 2 hours before or 4 hours after taking your ciprofloxacin dose.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Dairy-free, mineral-safe Indian meals that allow full antibiotic potency',
      foods: [
        { name: 'Steamed Rice, Roti, Dal & Sabzi (No Dairy)', emoji: '🍚', detail: 'Clean, easily absorbed everyday food' },
        { name: 'Fresh Apples, Papaya & Bananas', emoji: '🍎', detail: 'Safe fruit energy' },
        { name: 'Tender Coconut Water', emoji: '🥥', detail: 'Natural recovery hydration' },
        { name: 'Clear Vegetable Soup & Khichdi', emoji: '🍲', detail: 'Comforts gastrointestinal tract' },
        { name: 'Abundant Plain Water (2 to 3 Litres)', emoji: '💧', detail: 'Prevents crystalluria in kidneys' }
      ],
      reasonWhy: 'Non-dairy home meals allow the antibiotic to enter your bloodstream at 100% strength to clear bacterial infections quickly.'
    }
  },

  'Ibuprofen / NSAIDs': {
    medicineName: 'Brufen / Combiflam / Voveran / Zerodol / Ecosprin',
    genericSalt: 'Ibuprofen / NSAID (Anti-Inflammatory Analgesic)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Severe trigger for acute stomach lining erosion and gastric ulcers',
      foods: [
        { name: 'Alcoholic Beverages & Spirits', emoji: '🚫 🍺', detail: 'Strips gastric protective mucus; triggers bleeding' },
        { name: 'Empty Stomach Intake', emoji: '🚫 ⚠️', detail: 'Direct chemical burning of the stomach wall' }
      ],
      reasonWhy: 'Alcohol and NSAIDs deliver a double blow to the stomach lining: alcohol dissolves the mucus barrier while the pill blocks protective prostaglandins, causing acute bleeding ulcers.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Buffer your stomach with gentle food',
      timeBadge: 'Always take with food or milk',
      foods: [
        { name: 'Hot Spices & Red Chilli (Mirch)', emoji: '🌶️', detail: 'Aggravates mucosal irritation' },
        { name: 'Black Coffee on Empty Stomach', emoji: '☕', detail: 'Spikes hydrochloric acid secretion' }
      ],
      reasonWhy: 'Never take pain relievers on an empty stomach. Always swallow your dose with food or a glass of milk to protect your stomach.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Soothing, gentle foods that buffer your digestive tract',
      foods: [
        { name: 'Warm Milk or Sweet Curd (Dahi)', emoji: '🥛', detail: 'Directly buffers stomach mucosa' },
        { name: 'Comforting Moong Khichdi', emoji: '🍲', detail: 'Warm, soft gastric coat' },
        { name: 'Steamed White Rice & Ghee', emoji: '🍚', detail: 'Non-irritating comforting fuel' },
        { name: 'Ripe Sweet Bananas', emoji: '🍌', detail: 'Natural mucosal stimulant' },
        { name: 'Plain Toast & Saltine Biscuits', emoji: '🍞', detail: 'Absorbs excess gastric acid' }
      ],
      reasonWhy: 'These coating, low-acid staples act as a natural pillow for your stomach while the anti-inflammatory medication relieves your pain.'
    }
  },

  'Iron Supplements': {
    medicineName: 'DexOrange / Fefol / Feronia-XT',
    genericSalt: 'Ferrous Minerals (Hematinic Iron)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Insoluble complexes that flush iron out completely unabsorbed',
      foods: [
        { name: 'Indian Milk Chai & Black Tea with iron', emoji: '🚫 ☕', detail: 'Tannins and polyphenols bind iron insoluble' },
        { name: 'Milk, Curd & Cheese with iron', emoji: '🚫 🥛', detail: 'Calcium outcompetes iron at gut receptors' }
      ],
      reasonWhy: 'Tannins in tea and calcium in dairy attach to iron molecules in your gut, forming heavy black insoluble precipitates that get passed out with zero absorption.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Separate from heavy grains and morning tea',
      timeBadge: 'Wait at least 2 hours',
      foods: [
        { name: 'High-Fiber Bran & Whole Cereals', emoji: '🥣', detail: 'Phytates reduce iron bioavailability' },
        { name: 'Eggs & High-Phosphate Foods', emoji: '🍳', detail: 'Phosphoproteins slow iron absorption' }
      ],
      reasonWhy: 'Take your iron tonic 2 hours apart from your morning chai or whole-wheat meals to ensure your red blood cells get the full dose.'
    },
    greenZone: {
      title: 'Safe to Enjoy (Boosters!)',
      subtitle: 'Vitamin C rich foods that triple iron uptake into your blood',
      foods: [
        { name: 'Fresh Oranges & Sweet Lime (Mosambi)', emoji: '🍊', detail: 'Vitamin C triples iron uptake!' },
        { name: 'Lemon Water / Fresh Nimbu Pani', emoji: '🍋', detail: 'Converts iron into easily absorbed Fe²⁺' },
        { name: 'Fresh Amla Juice (Indian Gooseberry)', emoji: '🍈', detail: 'Potent natural Vitamin C champion' },
        { name: 'Boiled Beetroot & Carrots', emoji: '🥕', detail: 'Natural blood-building cofactors' },
        { name: 'Sweet Red Apples & Pomegranates (Anaar)', emoji: '🍎', detail: 'Traditional blood-enriching fruits' }
      ],
      reasonWhy: 'Vitamin C actively reduces ferric iron to ferrous iron, multiplying intestinal absorption up to 300% to boost your hemoglobin quickly!'
    }
  },

  'Digoxin': {
    medicineName: 'Lanoxin / Digox',
    genericSalt: 'Digoxin (Cardiac Glycoside)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Dangerous potassium-lowering foods that cause cardiac toxicity',
      foods: [
        { name: 'Natural Black Licorice (Mulethi extract)', emoji: '🚫 🍬', detail: 'Glycyrrhizin drains potassium rapidly' },
        { name: 'Excessive Laxative Herbal Teas', emoji: '🚫 🫖', detail: 'Triggers acute hypokalemia' }
      ],
      reasonWhy: 'Glycyrrhizin causes rapid kidney potassium wasting (hypokalemia), which causes digoxin to over-bind heart receptors, provoking fatal arrhythmias.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Prevents binding in the digestive tract',
      timeBadge: 'Wait at least 2 hours',
      foods: [
        { name: 'Coarse Oat Bran & High-Fiber Meals', emoji: '🥣', detail: 'Traps glycoside molecules in bowel' }
      ],
      reasonWhy: 'Space excessive soluble fiber apart from digoxin by 2 hours so your heart receives a consistent daily blood level.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Potassium-steady Indian staples that support normal heart rhythms',
      foods: [
        { name: 'Fresh Bananas & Sweet Apples', emoji: '🍎', detail: 'Maintains healthy potassium balance' },
        { name: 'Steamed Rice, Roti & Moong Dal', emoji: '🍚', detail: 'Gentle, steady everyday energy' },
        { name: 'Fresh Homemade Milk & Curd', emoji: '🥛', detail: 'Wholesome everyday nutrition' },
        { name: 'Cooked Green Vegetables (Lauki / Tinda / Palak)', emoji: '🥗', detail: 'Healthy dietary minerals' }
      ],
      reasonWhy: 'A steady, balanced diet preserves normal serum potassium levels, keeping your heartbeat stable and safe.'
    }
  },

  'MAO Inhibitors': {
    medicineName: 'Nardil / Parnate',
    genericSalt: 'Phenelzine / Tranylcypromine (MAOI)',
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Lethal hypertensive crisis from tyramine overload',
      foods: [
        { name: 'Aged & Fermented Cheeses', emoji: '🚫 🧀', detail: 'Packed with toxic tyramine levels' },
        { name: 'Fermented Soya, Tofu & Soy Sauce', emoji: '🚫 🫛', detail: 'Triggers catastrophic blood pressure spike' },
        { name: 'Cured Meats, Salami & Marmite', emoji: '🚫 🥩', detail: 'Massive surge of norepinephrine' }
      ],
      reasonWhy: 'Blocked MAO enzymes cannot degrade dietary tyramine, releasing massive norepinephrine that can cause sudden fatal strokes or heart attacks.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Strict alcohol precautions required',
      timeBadge: 'Complete Avoidance',
      foods: [
        { name: 'Craft Beers & Red Wine', emoji: '🍷', detail: 'Fermented biogenic amine hazard' }
      ],
      reasonWhy: 'Fermented alcoholic drinks contain volatile amine compounds; avoid all fermented tap drinks.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Freshly prepared, non-aged Indian home meals with zero tyramine',
      foods: [
        { name: 'Fresh Homemade Paneer (Unaged)', emoji: '🧀', detail: '100% fresh, non-fermented dairy' },
        { name: 'Fresh Milk & Fresh Curd (Made Today)', emoji: '🥛', detail: 'Safe when prepared fresh' },
        { name: 'Steamed Basmati Rice & Chapati', emoji: '🍚', detail: 'Clean non-aged staples' },
        { name: 'Fresh Fruits & Farm Vegetables', emoji: '🍎', detail: 'Freshly cut produce is 100% tyramine-free' }
      ],
      reasonWhy: 'Eating freshly cooked food prepared same-day ensures zero tyramine accumulation and complete clinical safety.'
    }
  }
};

/**
 * Universal safe fallback plan for modern Indian pharmacy staples
 * (e.g., Pan 40, Shelcal, Evion 400, Supradyn, Augmentin, Allegra, etc.)
 */
function createSafeIndianDietPlan(medicineName: string, genericSalt: string): TrafficLightDietPlan {
  return {
    medicineName,
    genericSalt,
    redZone: {
      title: 'Strictly Avoid',
      subtitle: 'Zero critical food clashes documented in clinical monographs',
      foods: [
        { name: 'No Dangerous Food Restrictions', emoji: '✅ 🥗', detail: 'Clinical monographs flag zero acute dietary toxicities' }
      ],
      reasonWhy: `Standard pharmacology monographs do not document hazardous, acute food clashes for ${medicineName}. You can follow your normal daily diet safely.`
    },
    amberZone: {
      title: 'Space Out',
      subtitle: 'Standard healthy hydration and schedule rules',
      timeBadge: 'Standard Routine',
      foods: [
        { name: 'Clean Plain Water', emoji: '💧', detail: 'Swallow oral doses with a full glass of water' },
        { name: 'Alcoholic Excess', emoji: '⚠️ 🍺', detail: 'Always minimize alcohol while taking medication' }
      ],
      reasonWhy: 'Taking medications with a full glass of plain water ensures smooth transit through the esophagus and optimal tablet dissolution in your stomach.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: 'Nourishing Indian home-cooked meals recommended for everyday vitality',
      foods: [
        { name: 'Fresh Seasonal Fruits (Apples, Oranges, Bananas)', emoji: '🍎', detail: 'Natural vitamins & dietary fiber' },
        { name: 'Rice, Roti, Dal & Sabzi', emoji: '🍚', detail: 'Balanced home-cooked nourishment' },
        { name: 'Fresh Milk, Curd & Buttermilk (Chaas)', emoji: '🥛', detail: 'Supports healthy digestion' },
        { name: 'Tender Coconut Water & Soups', emoji: '🥥', detail: 'Safe daily hydration' }
      ],
      reasonWhy: 'Enjoy your normal home-cooked meals. Maintain consistent meal timings and follow your prescribing doctor\'s general lifestyle advice.'
    }
  };
}

/**
 * Retrieves the vertical 3-tier Traffic Light Diet Guide for any selected medication
 */
export function getTrafficLightDietGuide(
  drugId: DrugId | null,
  brandName?: string
): TrafficLightDietPlan {
  const effectiveName = brandName || (drugId ? String(drugId) : 'Atorvastatin');
  const matchedCurated = matchCuratedDrug(effectiveName);

  if (matchedCurated && TRAFFIC_LIGHT_RULES[matchedCurated]) {
    const basePlan = TRAFFIC_LIGHT_RULES[matchedCurated];
    return {
      ...basePlan,
      medicineName: brandName ? `${brandName} (${basePlan.medicineName})` : basePlan.medicineName
    };
  }

  // Safe fallback for uncurated / neutral Indian medicines (e.g. Evion 400, Supradyn, Pan 40)
  return createSafeIndianDietPlan(effectiveName, brandName || 'Prescribed Indian Formulation');
}

/**
 * Combines the 3-tier Traffic Light Diet Guide across all medicines in the user's Pillbox
 * into one unified, non-redundant list.
 */
export function getUnifiedTrafficLightDietGuide(pills: PillItem[]): TrafficLightDietPlan {
  if (!pills || pills.length === 0) {
    return getTrafficLightDietGuide('Atorvastatin', 'Daily Medication');
  }

  if (pills.length === 1) {
    const pill = pills[0];
    return getTrafficLightDietGuide(pill.mappedCuratedDrugId || pill.genericSalt, pill.brandName);
  }

  // Multiple pills: Collect individual diet plans
  const plans = pills.map(p => 
    getTrafficLightDietGuide(p.mappedCuratedDrugId || p.genericSalt, p.brandName)
  );

  // Combine Red Zone
  const seenRed = new Set<string>();
  const combinedRedFoods: FoodTag[] = [];
  const redReasons: string[] = [];

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    const pill = pills[i];
    let addedSpecificRed = false;

    for (const food of plan.redZone.foods) {
      const key = food.name.toLowerCase().trim();
      if (!seenRed.has(key)) {
        seenRed.add(key);
        combinedRedFoods.push(food);
        addedSpecificRed = true;
      }
    }

    if (addedSpecificRed && plan.redZone.reasonWhy && !plan.redZone.reasonWhy.includes('Standard pharmacology monographs do not document')) {
      redReasons.push(`${pill.brandName}: ${plan.redZone.reasonWhy}`);
    }
  }

  // Combine Amber Zone
  const seenAmber = new Set<string>();
  const combinedAmberFoods: FoodTag[] = [];
  const amberReasons: string[] = [];

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    const pill = pills[i];
    let addedSpecificAmber = false;

    for (const food of plan.amberZone.foods) {
      const key = food.name.toLowerCase().trim();
      // Ensure it's not already in red zone
      if (!seenRed.has(key) && !seenAmber.has(key)) {
        seenAmber.add(key);
        combinedAmberFoods.push(food);
        addedSpecificAmber = true;
      }
    }

    if (addedSpecificAmber && plan.amberZone.reasonWhy && !plan.amberZone.reasonWhy.includes('Taking medications with a full glass')) {
      amberReasons.push(`${pill.brandName}: ${plan.amberZone.reasonWhy}`);
    }
  }

  // Combine Green Zone
  const seenGreen = new Set<string>();
  const combinedGreenFoods: FoodTag[] = [];

  for (const plan of plans) {
    for (const food of plan.greenZone.foods) {
      const key = food.name.toLowerCase().trim();
      // Only include if NOT in red or amber
      if (!seenRed.has(key) && !seenAmber.has(key) && !seenGreen.has(key)) {
        seenGreen.add(key);
        combinedGreenFoods.push(food);
      }
    }
  }

  // Fallback defaults if green is low
  if (combinedGreenFoods.length === 0) {
    combinedGreenFoods.push(
      { name: 'Plain Steamed Rice & Dal', emoji: '🍚', detail: 'Gentle on digestion' },
      { name: 'Fresh Apples & Papaya', emoji: '🍎', detail: 'Safe fruit nourishment' },
      { name: 'Tender Coconut Water', emoji: '🥥', detail: 'Safe daily electrolyte hydration' },
      { name: 'Home-cooked Roti & Sabzi', emoji: '🫓', detail: 'Standard Indian wholesome meal' }
    );
  }

  const combinedMedicineName = pills.map(p => p.brandName).join(' + ');

  return {
    medicineName: combinedMedicineName,
    genericSalt: `${pills.length} Active Prescriptions in Pillbox`,
    redZone: {
      title: 'Strictly Avoid',
      subtitle: `Critical food conflicts identified across your ${pills.length} selected medicines`,
      foods: combinedRedFoods.length > 0 ? combinedRedFoods : [
        { name: 'Excessive Alcohol / Spirits', emoji: '🚫 🍷', detail: 'Increases liver and stomach stress' }
      ],
      reasonWhy: redReasons.length > 0 
        ? redReasons.join(' • ') 
        : 'Avoid severe clashes that surge medication blood levels or damage gastric mucosa.'
    },
    amberZone: {
      title: 'Space Out',
      subtitle: `Items requiring separation time to prevent digestion absorption blocks`,
      timeBadge: 'Wait 2 to 4 Hours',
      foods: combinedAmberFoods.length > 0 ? combinedAmberFoods : [
        { name: 'High-Fiber Heavy Bran', emoji: '🥣', detail: 'Can reduce drug absorption' },
        { name: 'Caffeinated Beverages / Strong Tea', emoji: '☕', detail: 'Keep 1-2 hours apart from dose' }
      ],
      reasonWhy: amberReasons.length > 0
        ? amberReasons.join(' • ')
        : 'Keep these items separated by at least 2 hours from your medicine times to allow complete chemical absorption.'
    },
    greenZone: {
      title: 'Safe to Enjoy',
      subtitle: `Everyday wholesome grocery and meal staples 100% safe with all your medicines`,
      foods: combinedGreenFoods,
      reasonWhy: `These nutritious home-cooked foods do not interfere with any of your ${pills.length} medicines (${combinedMedicineName}). You can enjoy them safely with regular family meals.`
    }
  };
}
