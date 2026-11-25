import type { SymptomEntry } from '../types';

export const SYMPTOM_DATABASE: SymptomEntry[] = [
  {
    id: 'fever',
    name: 'Fever & High Body Temperature',
    chipLabel: '🤒 Fever',
    emoji: '🤒',
    synonyms: ['fever', 'temperature', 'pyrexia', 'chills', 'hot', 'sweating', 'burning up', 'high temp'],
    summary: 'Elevated core body temperature above 100.4°F (38.0°C), usually an immune response defending against viral or bacterial infections.',
    quickAdvice: 'Stay in lightweight breathable clothing, drink cool fluids frequently, and avoid heavy blankets which trap body heat.',
    otcMedicines: [
      {
        name: 'Paracetamol / Acetaminophen (500mg - 650mg)',
        brandExamples: 'Dolo 650, Tylenol, Calpol, Panadol, Crocin',
        badge: 'First-Line Antipyretic',
        purpose: 'Safely acts on the hypothalamus in the brain to reduce body temperature and relieve generalized body aches.',
        dosageAndTiming: 'Adults: 500mg to 650mg every 4 to 6 hours as needed. Maximum 3,000mg in 24 hours. Never combine with alcohol.',
        linkedDrugId: 'Paracetamol / Acetaminophen',
        efficacyPercent: 80,
        efficacyRangeLabel: '75–85%',
        onsetWindow: 'within 30–45 minutes',
        clinicalMechanismNote: 'Estimated 75–85% fever and ache relief within 30–45 minutes via central hypothalamic COX inhibition and PGE2 thermal set-point reduction.'
      },
      {
        name: 'Ibuprofen (200mg - 400mg)',
        brandExamples: 'Advil, Motrin, Brufen, Nurofen',
        badge: 'Anti-Inflammatory Alternative',
        purpose: 'Non-steroidal anti-inflammatory that lowers high fever and relieves muscular tension.',
        dosageAndTiming: 'Adults: 200mg to 400mg every 6 to 8 hours with food and a full glass of water. Avoid if you have active stomach ulcers or kidney concerns.',
        linkedDrugId: 'Ibuprofen / NSAIDs',
        efficacyPercent: 70,
        efficacyRangeLabel: '65–75%',
        onsetWindow: 'within 45 minutes',
        clinicalMechanismNote: 'Estimated 65–75% fever and inflammatory pain relief within 45 minutes via peripheral & central COX-1/COX-2 prostaglandin inhibition.'
      }
    ],
    homeRemedies: [
      {
        title: 'Cold Damp Compress',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% surface temperature relief via evaporative convective heat transfer',
        action: 'Apply a cold, damp cloth to the forehead, nape of the neck, and wrists.',
        scienceRationale: 'Evaporative cooling directly conducts excess surface thermal energy away from major blood vessels.'
      },
      {
        title: 'Electrolyte Hydration Therapy',
        efficacyPercent: 55,
        efficacyMechanismSummary: '~55% recovery support via SGLT1 sodium-glucose cotransport rehydration',
        action: 'Drink plenty of electrolyte water, oral rehydration solutions (ORS), or clear broths.',
        scienceRationale: 'Fevers cause accelerated fluid and sodium/potassium loss through sweating; replenishing prevents dehydration-induced tachycardia.'
      },
      {
        title: 'Cool Rest Environment',
        efficacyPercent: 25,
        efficacyMechanismSummary: '~25% thermal comfort gain via ambient radiant heat dissipation',
        action: 'Rest in a well-ventilated, cool room (68°F–72°F / 20°C–22°C) wearing loose cotton clothing.',
        scienceRationale: 'Prevents thermal re-insulation so metabolic heat can dissipate naturally through ambient radiation.'
      }
    ],
    redFlags: [
      'Temperature exceeds 103°F (39.4°C) in adults or fails to come down after OTC antipyretics.',
      'Fever lasts more than 3 consecutive days without improvement.',
      'Accompanied by a stiff neck, confusion, extreme drowsiness, or severe sensitivity to light.',
      'Sudden onset of purple or red skin rashes that do not blanch when pressed with a clear glass.',
      'Severe shortness of breath, chest pain, or persistent vomiting unable to keep liquids down.'
    ],
    emergencyContactText: 'Call 112 / 911 immediately if fever is accompanied by convulsions, altered consciousness, or blue lips.'
  },
  {
    id: 'acidity',
    name: 'Acidity, Acid Reflux & Heartburn',
    chipLabel: '🔥 Acidity',
    emoji: '🔥',
    synonyms: ['acidity', 'heartburn', 'acid reflux', 'gerd', 'burning chest', 'sour burps', 'indigestion', 'gas'],
    summary: 'Stomach acid surges upward into the sensitive esophageal lining, causing burning chest discomfort, sour belching, or gnawing upper stomach distress.',
    quickAdvice: 'Remain upright for at least 2 hours after drinking or eating; never lie flat or bend over when experiencing acid backflow.',
    otcMedicines: [
      {
        name: 'Antacids (Aluminum Hydroxide + Magnesium Hydroxide + Simethicone)',
        brandExamples: 'Digene, Gelusil, Mylanta, Maalox, Gaviscon',
        badge: 'Instant Symptomatic Relief',
        purpose: 'Directly neutralizes existing hydrochloric acid in the stomach lumen within 5 minutes.',
        dosageAndTiming: 'Take 1 to 2 chewable tablets or 10–20mL liquid suspension 20 to 60 minutes after meals and before bedtime. Separate from prescription antibiotics by 2 to 4 hours.',
        linkedDrugId: undefined,
        efficacyPercent: 72,
        efficacyRangeLabel: '65–78%',
        onsetWindow: 'within 5–10 minutes',
        clinicalMechanismNote: 'Estimated 65–78% acute heartburn relief within 5–10 minutes via direct luminal acid-base neutralization (Mg(OH)2 + 2HCl -> MgCl2 + 2H2O).'
      },
      {
        name: 'Omeprazole / Pantoprazole / Esomeprazole (20mg)',
        brandExamples: 'Prilosec, Omez, Pantocid, Nexium',
        badge: 'Proton Pump Inhibitor (Daily Acid Blocker)',
        purpose: 'Deactivates the proton pump enzymes in stomach parietal cells, shutting down acid production at the biological source.',
        dosageAndTiming: 'Take 1 capsule (20mg) in the morning 30 to 60 minutes before breakfast with plain water for 7–14 days.',
        linkedDrugId: undefined,
        efficacyPercent: 88,
        efficacyRangeLabel: '82–92%',
        onsetWindow: 'within 1–2 hours (peak 24h)',
        clinicalMechanismNote: 'Estimated 82–92% sustained acid suppression via irreversible covalent disulfide binding to gastric parietal H+/K+-ATPase proton pumps.'
      },
      {
        name: 'Famotidine (20mg)',
        brandExamples: 'Pepcid AC, Famocid',
        badge: 'H2 Receptor Blocker',
        purpose: 'Blocks histamine receptors in gastric cells to reduce nighttime and meal-stimulated acid secretion for up to 12 hours.',
        dosageAndTiming: 'Take 20mg with water 15 to 60 minutes before meals that trigger heartburn or before sleep.',
        linkedDrugId: undefined,
        efficacyPercent: 75,
        efficacyRangeLabel: '70–80%',
        onsetWindow: 'within 30–60 minutes',
        clinicalMechanismNote: 'Estimated 70–80% acid reduction within 30–60 minutes via competitive antagonism of basolateral parietal cell H2 histamine receptors.'
      }
    ],
    homeRemedies: [
      {
        title: 'Chilled Water or Cold Milk',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% rapid soothing relief via esophageal acid dilution & casein pH buffering',
        action: 'Drink a glass of cold milk (low fat) or cold water slowly in small sips.',
        scienceRationale: 'Cold liquids wash refluxed acid back into the stomach, while milk proteins temporarily buffer esophageal mucosa against acidic erosion.'
      },
      {
        title: 'Strict Upright Posture',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% reflux episode reduction via gravitational hydrostatic barrier at the LES',
        action: 'Sit upright or stand (do not lie down or slouch on the sofa). Elevate head of bed by 6 inches if resting.',
        scienceRationale: 'Gravity naturally keeps acidic gastric contents below the lower esophageal sphincter (LES).'
      },
      {
        title: 'Non-Mint Chewing Gum',
        efficacyPercent: 38,
        efficacyMechanismSummary: '~38% esophageal acid clearance via bicarbonate-rich salivary buffering (HCO3-)',
        action: 'Chew a piece of non-mint gum for 15 to 20 minutes.',
        scienceRationale: 'Stimulates saliva secretion rich in bicarbonate, which neutralizes residual acid in the food pipe with every swallow.'
      }
    ],
    redFlags: [
      'Crushing chest pressure or burning radiating to the left arm, shoulder, jaw, or back (potential heart attack symptom).',
      'Difficulty or severe pain when swallowing solid food or liquids (dysphagia).',
      'Vomiting blood or dark fluid resembling coffee grounds, or black tarry stools.',
      'Unexplained sudden weight loss accompanied by chronic acid reflux.',
      'Heartburn symptoms occurring more than 3 times a week for several consecutive weeks.'
    ],
    emergencyContactText: 'If chest burning is accompanied by cold sweat, nausea, or shortness of breath, call 112 / 911 immediately.'
  },
  {
    id: 'headache',
    name: 'Tension Headache & Migraine',
    chipLabel: '🤕 Headache',
    emoji: '🤕',
    synonyms: ['headache', 'migraine', 'head throbbing', 'temple pain', 'forehead ache', 'tension headache'],
    summary: 'Constriction or throbbing of cranial muscles and blood vessels, frequently triggered by dehydration, eye strain, stress, or sensory overload.',
    quickAdvice: 'Step away from all digital screens, drink 500mL of water immediately, and apply gentle acupressure between your thumb and index finger.',
    otcMedicines: [
      {
        name: 'Paracetamol / Acetaminophen (500mg - 1000mg)',
        brandExamples: 'Panadol, Tylenol, Crocin, Dolo',
        badge: 'First-Line Analgesic',
        purpose: 'Provides clean analgesic relief for mild-to-moderate tension headaches without gastric irritation.',
        dosageAndTiming: 'Take 500mg to 1000mg with water. Repeat after 4–6 hours if needed. Do not exceed 3,000mg per 24 hours.',
        linkedDrugId: 'Paracetamol / Acetaminophen',
        efficacyPercent: 68,
        efficacyRangeLabel: '60–75%',
        onsetWindow: 'within 30–45 minutes',
        clinicalMechanismNote: 'Estimated 60–75% tension headache relief within 30–45 minutes via central serotonergic descending pain modulation and CNS COX suppression.'
      },
      {
        name: 'Ibuprofen (400mg)',
        brandExamples: 'Advil, Motrin, Brufen',
        badge: 'Vascular & Throbbing Headache Relief',
        purpose: 'Inhibits inflammatory prostaglandins that dilate cranial blood vessels during throbbing tension episodes.',
        dosageAndTiming: 'Take 400mg with a meal or snack. Do not take on an empty stomach or combine with alcohol.',
        linkedDrugId: 'Ibuprofen / NSAIDs',
        efficacyPercent: 72,
        efficacyRangeLabel: '65–78%',
        onsetWindow: 'within 45 minutes',
        clinicalMechanismNote: 'Estimated 65–78% throbbing headache relief within 45 minutes via anti-inflammatory prostaglandin inhibition and reduced meningeal vasodilation.'
      }
    ],
    homeRemedies: [
      {
        title: 'Immediate Rehydration',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% dehydration-headache relief via osmotic restoration of meningeal volume',
        action: 'Drink 1 to 2 large glasses of room-temperature water or coconut water.',
        scienceRationale: 'Mild cerebral dehydration contracts brain tissues slightly away from the skull, triggering meningeal pain sensors; rehydration restores volume.'
      },
      {
        title: 'Dark Room & Cold Forehead Compress',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% throbbing pain reduction via TRPM8 cold-induced cranial vasoconstriction',
        action: 'Lie down in a completely dark, silent room with a chilled gel pack or damp cloth over your temples.',
        scienceRationale: 'Reduces sensory input to hyper-excitable cortical neurons while cold induces local vasoconstriction of painful cranial arteries.'
      },
      {
        title: 'Neck & Temple Acupressure',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% tension relief via gate-control A-beta fiber modulation & trigger-point release',
        action: 'Firmly massage the base of your skull (suboccipital muscles) and the webbed space between thumb and forefinger (LI4 point) for 2 minutes.',
        scienceRationale: 'Releases myofascial trigger points in the trapezius and scalp that refer pain directly to the forehead and temples.'
      }
    ],
    redFlags: [
      'Sudden, explosive "thunderclap" headache reaching maximum intensity within seconds (worst headache of your life).',
      'Headache accompanied by numbness, facial drooping, one-sided weakness, or speech difficulty.',
      'Headache accompanied by a high fever, stiff neck, and sudden confusion.',
      'Headache following a recent blow to the head, fall, or concussion.',
      'New onset headache occurring in individuals over 50 years of age.'
    ],
    emergencyContactText: 'Sudden severe thunderclap headaches or neurological weakness require immediate 112 / 911 emergency response.'
  },
  {
    id: 'nausea',
    name: 'Nausea & Motion / Stomach Upset',
    chipLabel: '🤢 Nausea',
    emoji: '🤢',
    synonyms: ['nausea', 'queasy', 'vomiting', 'throwing up', 'upset stomach', 'car sick', 'seasick', 'motion sickness'],
    summary: 'Unsettled, queasy sensation in the stomach frequently triggered by viral gastroenteritis, motion imbalance, food intolerance, or medication side effects.',
    quickAdvice: 'Take slow deep breaths of cool fresh air, avoid strong food aromas, and do not drink large gulps of water all at once.',
    otcMedicines: [
      {
        name: 'Dimenhydrinate / Meclizine (25mg - 50mg)',
        brandExamples: 'Dramamine, Gravol, Bonine',
        badge: 'Vestibular & Motion Relief',
        purpose: 'Blocks H1 receptors and acetylcholine in the vomiting center of the brain stem.',
        dosageAndTiming: 'Take 25mg to 50mg 30 to 60 minutes before travel or at onset of nausea. May cause drowsiness; avoid driving.',
        linkedDrugId: undefined,
        efficacyPercent: 78,
        efficacyRangeLabel: '72–82%',
        onsetWindow: 'within 30–60 minutes',
        clinicalMechanismNote: 'Estimated 72–82% motion-nausea control within 30–60 minutes via central vestibular H1 histamine and M1 muscarinic receptor antagonism.'
      },
      {
        name: 'Bismuth Subsalicylate (262mg - 524mg)',
        brandExamples: 'Pepto-Bismol',
        badge: 'Gastric Mucosal Soother',
        purpose: 'Coats irritated stomach lining, absorbs bacterial toxins, and reduces mucosal inflammation.',
        dosageAndTiming: 'Chew 2 tablets or take 30mL liquid every 30 to 60 minutes as needed. Maximum 8 doses in 24 hours. May temporarily darken tongue/stools.',
        linkedDrugId: undefined,
        efficacyPercent: 62,
        efficacyRangeLabel: '55–68%',
        onsetWindow: 'within 30–45 minutes',
        clinicalMechanismNote: 'Estimated 55–68% upset-stomach relief within 30–45 minutes via topical bismuth mucosal coating and local prostaglandin antisecretory action.'
      }
    ],
    homeRemedies: [
      {
        title: 'Fresh Ginger Root Infusion',
        efficacyPercent: 65,
        efficacyMechanismSummary: '~65% nausea relief via peripheral 5-HT3 serotonin receptor antagonism',
        action: 'Sip warm water steeped with fresh sliced ginger or chew crystallized ginger.',
        scienceRationale: 'Gingerols and shogaols block peripheral 5-HT3 serotonin receptors in the gastrointestinal tract, halting nauseous gastric dysrhythmias.'
      },
      {
        title: 'Slow Chilled Sips',
        efficacyPercent: 35,
        efficacyMechanismSummary: '~35% emetic calm via gastric mechanoreceptor stretch avoidance',
        action: 'Sip small spoonfuls of ice water, clear apple juice, or suck on clean ice cubes.',
        scienceRationale: 'Prevents sudden stomach wall distension which activates mechanoreceptors that trigger the emetic reflex.'
      },
      {
        title: 'P6 (Neiguan) Acupressure Point',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% motion-nausea reduction via median-nerve autonomic vagal modulation',
        action: 'Press two fingers firmly into the groove between the two tendons on the inner wrist (three finger-widths below wrist crease).',
        scienceRationale: 'Clinically validated somatosensory stimulation that suppresses autonomic signals routed through the vagal vomiting center.'
      }
    ],
    redFlags: [
      'Inability to keep any liquids down for more than 12 to 24 hours leading to dehydration.',
      'Vomiting blood or dark brownish granular material resembling coffee grounds.',
      'Severe, sudden acute abdominal pain that feels sharp or localized (possible appendicitis/obstruction).',
      'Signs of severe dehydration: dark sunken eyes, dry mouth, extreme dizziness, or no urination for 8+ hours.',
      'Nausea accompanied by severe chest pressure or pain radiating to the left arm.'
    ],
    emergencyContactText: 'Severe dehydration or blood in vomit requires immediate hospital emergency room attention.'
  },
  {
    id: 'cough',
    name: 'Cough, Sore Throat & Common Cold',
    chipLabel: '🤧 Cough & Cold',
    emoji: '🤧',
    synonyms: ['cough', 'cold', 'sore throat', 'phlegm', 'dry cough', 'runny nose', 'congestion', 'flu'],
    summary: 'Irritation of the upper respiratory tract and pharynx caused by viral infections, seasonal allergens, or post-nasal drip.',
    quickAdvice: 'Sip warm fluids continuously to keep pharyngeal mucous membranes hydrated, and run a cool-mist humidifier in your sleeping area.',
    otcMedicines: [
      {
        name: 'Dextromethorphan (15mg - 30mg) for Dry Cough',
        brandExamples: 'Robitussin, Delsym, Benylin',
        badge: 'Cough Center Suppressant',
        purpose: 'Acts centrally on the medullary cough reflex center to suppress non-productive dry hacking coughs.',
        dosageAndTiming: 'Take every 6 to 8 hours as needed. Do not exceed recommended dosage; avoid if taking MAOI antidepressants.',
        linkedDrugId: undefined,
        efficacyPercent: 64,
        efficacyRangeLabel: '58–70%',
        onsetWindow: 'within 20–30 minutes',
        clinicalMechanismNote: 'Estimated 58–70% dry cough suppression within 20–30 minutes via medullary sigma-1 receptor agonism and NMDA cough-reflex threshold elevation.'
      },
      {
        name: 'Guaifenesin (200mg - 400mg) for Chest Congestion',
        brandExamples: 'Mucinex, Benylin Mucus',
        badge: 'Expectorant (Thins Mucus)',
        purpose: 'Increases the volume and reduces the viscosity of respiratory secretions, making phlegm easier to cough up.',
        dosageAndTiming: 'Take with a full 8 oz glass of water every 4 hours. Ample hydration is vital for guaifenesin to work.',
        linkedDrugId: undefined,
        efficacyPercent: 58,
        efficacyRangeLabel: '52–65%',
        onsetWindow: 'within 30–60 minutes',
        clinicalMechanismNote: 'Estimated 52–65% mucus clearance improvement within 30–60 minutes via vagal gastropulmonary reflex stimulation that hydrates bronchial mucin.'
      },
      {
        name: 'Cetirizine / Loratadine (10mg) for Allergic Rhinitis',
        brandExamples: 'Zyrtec, Claritin, Cetzine',
        badge: 'Non-Drowsy Antihistamine',
        purpose: 'Blocks histamine H1 receptors to dry up runny nose, sneezing, and allergen-triggered throat tickles.',
        dosageAndTiming: 'Take 1 tablet (10mg) once daily with water.',
        linkedDrugId: undefined,
        efficacyPercent: 76,
        efficacyRangeLabel: '70–82%',
        onsetWindow: 'within 45–60 minutes',
        clinicalMechanismNote: 'Estimated 70–82% sneeze and rhinorrhea relief within 45–60 minutes via selective peripheral H1 histamine inverse agonism.'
      }
    ],
    homeRemedies: [
      {
        title: 'Warm Honey & Lemon Water',
        efficacyPercent: 40,
        efficacyMechanismSummary: '~40% soothing cough relief via viscous pharyngeal demulcent mucosal coating',
        action: 'Mix 1 tablespoon of pure natural honey with warm water and fresh lemon juice (for adults and children > 1 year).',
        scienceRationale: 'Honey coats demulcent sensory nerve endings in the pharynx, proven in clinical trials to be as effective as dextromethorphan.'
      },
      {
        title: 'Warm Salt Water Gargle',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% throat pain reduction via hypertonic osmotic edema drainage',
        action: 'Dissolve half a teaspoon of culinary salt in a glass of warm water; gargle thoroughly for 30 seconds and spit out.',
        scienceRationale: 'Hypertonic saline draws excess inflammatory fluid out of swollen throat tissues through gentle osmosis, relieving pain.'
      },
      {
        title: 'Warm Steam Inhalation',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% congestion relief via mucociliary hydration & mucus viscosity reduction',
        action: 'Inhale gentle steam from a bowl of hot water with a towel draped overhead for 5–10 minutes.',
        scienceRationale: 'Directly hydrates dry bronchial passages, loosens sticky mucus plugs, and relaxes airway spasms.'
      }
    ],
    redFlags: [
      'Shortness of breath, audible wheezing, or struggling to complete a sentence without catching breath.',
      'Coughing up rust-colored, pink, or frank blood.',
      'Cough persisting longer than 3 weeks without improvement.',
      'High fever lasting more than 3 days or sudden relapse with shaking chills (possible pneumonia).',
      'Inability to swallow saliva or open the mouth fully (sign of peritonsillar abscess).'
    ],
    emergencyContactText: 'Severe breathing distress or stridor requires calling 112 / 911 immediately.'
  },
  {
    id: 'muscle-pain',
    name: 'Muscle Spasms & Body Aches',
    chipLabel: '⚡ Muscle Pain',
    emoji: '⚡',
    synonyms: ['muscle pain', 'body ache', 'back pain', 'stiffness', 'spasm', 'cramp', 'sore muscles', 'strain'],
    summary: 'Localized or systemic muscular soreness triggered by physical strain, postural stress, viral infections, or electrolyte depletion.',
    quickAdvice: 'Avoid strenuous lifting, rest the affected muscle group, and alternate gentle movement with comfortable posture.',
    otcMedicines: [
      {
        name: 'Ibuprofen (400mg) or Naproxen (220mg)',
        brandExamples: 'Advil, Aleve, Brufen',
        badge: 'NSAID Muscle Reliever',
        purpose: 'Directly reduces cyclooxygenase inflammatory mediators in strained muscle fibers.',
        dosageAndTiming: 'Take with food and water. For Ibuprofen: 400mg every 6 to 8 hours. For Naproxen: 220mg every 12 hours.',
        linkedDrugId: 'Ibuprofen / NSAIDs',
        efficacyPercent: 68,
        efficacyRangeLabel: '60–70%',
        onsetWindow: 'within 45 minutes',
        clinicalMechanismNote: 'Estimated 60–70% relief within 45 minutes via anti-inflammatory COX-1/COX-2 prostaglandin inhibition in strained skeletal muscle.'
      },
      {
        name: 'Topical Diclofenac or Methyl Salicylate Gel',
        brandExamples: 'Voltaren Gel, Moov, Bengay, Tiger Balm',
        badge: 'Targeted Topical Gel',
        purpose: 'Delivers localized analgesic anti-inflammatory concentration directly through the dermis without stomach upset.',
        dosageAndTiming: 'Gently massage a 2-inch ribbon over the painful muscle area 3 to 4 times daily. Wash hands after applying.',
        linkedDrugId: undefined,
        efficacyPercent: 62,
        efficacyRangeLabel: '55–68%',
        onsetWindow: 'within 20–30 minutes',
        clinicalMechanismNote: 'Estimated 55–68% localized ache relief within 20–30 minutes via transdermal COX-2 inhibition and TRPV1/TRPM8 sensory counter-irritation.'
      }
    ],
    homeRemedies: [
      {
        title: 'Contrast Thermal Therapy',
        efficacyPercent: 50,
        efficacyMechanismSummary: '~50% ache reduction via initial vasoconstrictive edema control & reactive vasodilation',
        action: 'Apply cold packs for the first 24–48 hours to blunt inflammation; switch to warm compresses thereafter.',
        scienceRationale: 'Cold reduces local edema and blunts pain fibers; subsequent warmth dilates capillaries to flush metabolic lactic acid.'
      },
      {
        title: 'Warm Epsom Salt Soak',
        efficacyPercent: 40,
        efficacyMechanismSummary: '~40% spasm relaxation via thermal actin-myosin cross-bridge release',
        action: 'Soak in a warm bath infused with 1–2 cups of Epsom salts (magnesium sulfate) for 20 minutes.',
        scienceRationale: 'Warmth relaxes tense actin-myosin filaments while transdermal magnesium ions soothe neuromuscular hyper-excitability.'
      },
      {
        title: 'Gentle Low-Load Stretching',
        efficacyPercent: 45,
        efficacyMechanismSummary: '~45% stiffness relief via Golgi tendon organ autogenic inhibition',
        action: 'Perform gentle, slow static stretches holding each position for 20 to 30 seconds without bouncing.',
        scienceRationale: 'Lengthens contracted muscle spindles and restores physiological venous return without causing micro-tears.'
      }
    ],
    redFlags: [
      'Sudden loss of bowel or bladder control accompanying lower back pain (cauda equina surgical emergency).',
      'Muscle pain accompanied by high fever and dark cola-colored or reddish-brown urine (rhabdomyolysis warning).',
      'Severe weakness where you cannot lift your foot or arm.',
      'Sudden excruciating calf pain with local heat, swelling, and redness (deep vein thrombosis).',
      'Pain that progressively worsens at night regardless of position or rest.'
    ],
    emergencyContactText: 'Dark cola urine or sudden loss of bladder sensation requires immediate emergency room evaluation.'
  }
];
