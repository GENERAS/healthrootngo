import { site } from "./site";

/* ==========================================================================
   Health education knowledge base
   ==========================================================================
   Health Root exists to TEACH health, not to practise medicine. This library
   is written to the same standard.

   What that means here, precisely:
     - no dosage, and no instruction to start, stop or change any treatment
     - no statement of the form "you have X"
     - no prescribing: nobody is told what to take
     - medicine *classes* are named only where withholding the name would
       remove the safety point (e.g. anti-inflammatory painkillers causing
       ulcers). Naming a class is not prescribing it.

   Every entry therefore stays safe to read for someone who turns out to be
   seriously unwell: it describes, it warns, it refers. If Health Root ever
   wants clinical advice, that is a clinical-governance question, not a copy
   change.

   !! CLINICAL REVIEW REQUIRED BEFORE LAUNCH !!
   This is written by a non-clinician. Every entry needs sign-off from a
   qualified clinician before it is published, and the emergency numbers in
   site.emergency need verifying against an authoritative Rwandan source.
   -------------------------------------------------------------------------- */

export type HealthCategory =
  | "everyday illness"
  | "first aid"
  | "living with a condition"
  | "mother and baby"
  | "children"
  | "mental wellbeing"
  | "food and lifestyle"
  | "hygiene and prevention"
  | "sexual and reproductive health"
  | "using health services";

export interface HealthTopic {
  id: string;
  title: string;
  category: HealthCategory;
  /** Tokens and phrases scored against the user's question. */
  keywords: string[];
  /** Education-only markdown. Never a diagnosis, never a prescription. */
  answer: string;
  /** After these, the person should not wait. */
  dangerSigns: string[];
  followUps: string[];
}

const ESCALATE = `\n\n---\n\n**When to get help.** Seek care today — ${site.emergency.guidance.toLowerCase()}`;

export const HEALTH_CATEGORIES: { id: HealthCategory; label: string; blurb: string }[] = [
  { id: "everyday illness", label: "Everyday illness", blurb: "Fevers, coughs, tummy upsets and everyday aches." },
  { id: "first aid", label: "First aid", blurb: "What to do in the minutes before you reach a health centre." },
  { id: "living with a condition", label: "Living with a condition", blurb: "Understanding and managing long-term illness." },
  { id: "mother and baby", label: "Pregnancy & new babies", blurb: "Antenatal care, danger signs, birth and the early weeks." },
  { id: "children", label: "Children", blurb: "Feeding, growth, immunisation and when a child needs urgent care." },
  { id: "mental wellbeing", label: "Mental wellbeing", blurb: "Mood, stress, grief and getting support without shame." },
  { id: "food and lifestyle", label: "Food & lifestyle", blurb: "Eating well, moving well, sleeping well." },
  { id: "hygiene and prevention", label: "Hygiene & prevention", blurb: "Handwashing, water, sanitation and stopping disease spread." },
  { id: "sexual and reproductive health", label: "Sexual & reproductive health", blurb: "Contraception, infections and fertility questions." },
  { id: "using health services", label: "Using health services", blurb: "Finding care, reading health advice and paying for treatment." },
];

const T = (
  id: string,
  title: string,
  category: HealthCategory,
  keywords: string[],
  answer: string,
  dangerSigns: string[],
  followUps: string[],
): HealthTopic => ({ id, title, category, keywords, answer: answer.trim() + ESCALATE, dangerSigns, followUps });

/* --------------------------------------------------------------------------
   Library
   -------------------------------------------------------------------------- */
export const HEALTH_TOPICS: HealthTopic[] = [
  /* -------------------------------------------------- everyday illness */
  T(
    "fever",
    "Fever and high temperature",
    "everyday illness",
    ["fever", "temperature", "feverish", "hot", "burning up", "pyrexia", "chills", "shivering", "high temp", "sweating", "38", "39", "40", "body hot", "warm body"],
    `**What fever is**
A temperature above your normal range. It is a sign that the body is fighting something, most often an infection — not a disease in itself. It is very common and usually not dangerous on its own.

**What to do**
- Rest and drink fluids regularly: water, oral rehydration solution, or thin soups. Dehydration is the real risk with fever, not the temperature.
- Keep the room cool, wear light clothing, and change damp clothing promptly.
- A lukewarm sponge bath is fine. Cold water and alcohol rubs are not — they cause shivering, which pushes the temperature up.
- Ask a pharmacist what is safe for pain and temperature, and follow the packet. Do not combine two products containing the same medicine.
- Note when it started and what else is happening. That history matters more than the number.

**Why it matters**
Malaria, typhoid, urinary infection and influenza can all present as fever. A persistent or recurring fever needs a proper examination rather than guesswork.`,
    [
      "Fever in an infant under 3 months",
      "Fever with a stiff neck, severe headache, confusion, or a rash that does not fade",
      "Fever lasting more than 3 days, or returning after seeming to recover",
      "Fever with difficulty breathing, chest pain, or vomiting everything",
      "Convulsions or loss of consciousness",
      "Fever with very little urine, or a child who will not drink",
    ],
    ["What are the warning signs of malaria?", "How do I keep a child hydrated?", "When should I see a doctor?"],
  ),
  T(
    "malaria",
    "Malaria",
    "everyday illness",
    ["malaria", "mosquito", "mosquitoes", "ague", "night sweats", "feverish", "malarial", "inbwaho", "prevent malaria", "net", "nets"],
    `**What it is**
Malaria is a parasite carried by the bite of an infected female Anopheles mosquito. It is among the most important everyday health concerns in Rwanda, and it is both preventable and curable.

**Symptoms**
Fever, chills and shivering, headache, muscle aches, tiredness, nausea or vomiting, and sometimes diarrhoea. Fever often comes and goes rather than staying constant.

**If you suspect it**
- Go to a health centre and ask for a **malaria test**. Treatment only works if the parasite is confirmed, and the right medicine depends on which parasite is present and where the infection was picked up.
- Do not self-medicate with leftover antimalarials. The wrong drug fails, and partial treatment makes the next test harder to read.
- Drink plenty of fluids and rest while you wait.
- Anyone with fever in a malaria area should be tested rather than assumed.

**Prevention**
- Sleep under a treated insecticide net every night. Nets are the single most effective step.
- Empty standing water: tyres, tins, flower pots, blocked gutters.
- Use repellent on exposed skin, and screen windows and doors.
- Cover up after dusk, when malaria-carrying mosquitoes are most active.
- Check children are covered and their nets are tucked in.`,
    [
      "Fever with confusion, drowsiness, fits or convulsions",
      "Fever with fast or difficult breathing",
      "Fever with repeated vomiting, or unable to keep fluids down",
      "Yellowing of the eyes, or very dark or very little urine",
      "Fever during pregnancy, or in a child under 5",
      "Fever that does not settle after 48 hours of treatment",
    ],
    ["How do I prevent mosquito bites?", "What is a treated mosquito net?", "How do I keep a child hydrated?"],
  ),
  T(
    "cough-cold",
    "Coughs, colds and flu",
    "everyday illness",
    ["cough", "coughing", "cold", "colds", "runny nose", "blocked nose", "sore throat", "sneezing", "flu", "influenza", "catarrh", "phlegm", "mucus", "sniffle", "sore throat"],
    `**What is going on**
An upper respiratory infection — a cold — usually starts with a runny or blocked nose, sneezing, sore throat and cough. It is viral, so antibiotics do not help. Flu is more severe: fever, body aches, headache and marked tiredness.

**What usually helps**
- Rest, fluids and warmth.
- Honey in warm water soothes a cough. Safe for anyone over 1 year — **never for infants under 1 year**, which is a botulism risk.
- Steam or a bowl of hot water to loosen congestion.
- Saline nose drops, and a pharmacist's advice for anything else.
- Keep fluids up and rest. Most clear within 1–2 weeks.

**Spreading it**
Cover coughs and sneezes, wash hands, and stay home while feverish. In a busy school or workplace this matters a great deal.

**Antibiotics**
Unnecessary antibiotics cause side effects and breed resistance. They are for bacterial infections a clinician has identified — and a clinician decides that, not the colour of the phlegm.`,
    [
      "Difficulty breathing, very fast breathing, or the ribs showing in as you breathe",
      "Chest pain, or pain when breathing in deeply",
      "Coughing up blood, or frothy pink sputum",
      "Blue lips or fingertips",
      "Fever with a stiff neck or severe headache",
      "A cough lasting more than 3 weeks, or with night sweats and weight loss",
    ],
    ["How do I stop the spread of germs?", "Is this a cold or flu?", "When should I see a doctor?"],
  ),
  T(
    "diarrhoea",
    "Diarrhoea, vomiting and dehydration",
    "everyday illness",
    ["diarrhoea", "diarrhea", "loose", "loose motions", "stomach", "tummy", "belly", "vomit", "vomiting", "throwing up", "dehydration", "dehydrated", "watery", "constipation", "food poisoning", "ors", "rehydration", "belly ache", "stomach ache"],
    `**The real danger is water, not the upset stomach**
Diarrhoea and vomiting make the body lose water and salts. In an adult this causes weakness and confusion; in a child it can become life-threatening within a day. Preventing and correcting dehydration is the whole job.

**Replacing fluids — the ORS rule**
The best treatment is **oral rehydration solution**, sold cheaply at any pharmacy. Mix it exactly as the packet says, in the full amount of water. Do not make it stronger.
- Give small sips or spoonfuls often, rather than big drinks.
- Keep breastfeeding a baby with diarrhoea — breast milk is fluid and food at once.
- After each loose stool, give a child a little more than they would normally drink.

If you have no ORS, a safe homemade version is: **1 litre of clean water, 6 level teaspoons of sugar, half a teaspoon of salt.** Dissolve completely and taste it — it should taste no saltier than tears. Too much salt is dangerous for a child.

**Other things**
- Keep eating. Bland, familiar food beats fasting.
- Wash hands with soap after every visit to the toilet and before handling food.
- Do not use anti-diarrhoeal tablets for a child with bloody diarrhoea or fever.

**Cause matters**
Watery diarrhoea after travel or a shared meal is often bacterial and can need treatment. Prolonged diarrhoea, or diarrhoea with blood, is a different problem entirely.`,
    [
      "Very little urine, dry mouth, no tears, sunken eyes, skin that stays wrinkled when pinched, unusual sleepiness",
      "Blood or mucus in the stool, or black tarry stools",
      "Fever, or vomiting that will not stop, or vomiting blood",
      "Diarrhoea in an infant, or in an older or frail adult",
      "Vomiting everything for more than a few hours — nothing stays down",
      "Diarrhoea lasting more than 2 weeks",
    ],
    ["How do I make oral rehydration solution?", "What should a child eat during diarrhoea?", "How do I keep water safe?"],
  ),
  T(
    "headache",
    "Headache and migraine",
    "everyday illness",
    ["headache", "head ache", "head pain", "head hurts", "migraine", "throbbing", "pressure in head", "head pressure"],
    `**Common types**
- **Tension** — dull, tight, both sides, often after stress, poor sleep, screen time or poor posture. Most common.
- **Migraine** — throbbing, usually one-sided, with nausea or vomiting, and often sensitivity to light or sound.
- **Sinus and dehydration** — with a blocked nose, or after not drinking enough.
- **Medication-overuse** — from taking painkillers too often. This needs medical review, not more painkillers.

**What usually helps**
Water, regular meals, rest in a dark quiet room, and less screen time. A pharmacist can advise on pain relief. Regular sleep and movement help prevent tension headaches.

**Watch the pattern**
Headaches arriving at the same time each day, or that change and worsen over weeks, deserve an examination. So does one that starts after you turned 50, or is new and different from any you have had before.

**Important**
Headache is one of the symptoms people most often self-treat. A new or unusual headache should be described fully to a clinician rather than treated indefinitely with painkillers.`,
    [
      "A sudden, severe headache that peaks within seconds — the worst of your life",
      "Headache with fever, stiff neck, a rash, vomiting or confusion",
      "Headache with weakness or numbness on one side, drooping face, slurred speech or vision loss — think stroke, act now",
      "Headache after a head injury",
      "Headache with blurred vision, or a headache in pregnancy",
      "A headache that keeps returning and is getting worse",
    ],
    ["What are the signs of a stroke?", "How do I sleep better?", "When should I see a doctor?"],
  ),
  T(
    "skin",
    "Skin problems and rashes",
    "everyday illness",
    ["skin", "rash", "rashes", "itch", "itching", "spots", "acne", "eczema", "ringworm", "fungus", "boil", "abscess", "lice", "scabies", "hives", "allergy", "allergic", "wart", "mole", "bruise", "sore"],
    `**Common things**
- **Acne** — blocked oil glands on the face, chest and back. Wash gently, do not scrub, and do not pick. A pharmacist can advise on treatment.
- **Eczema** — dry, itchy, thickened skin that flares. Daily moisturiser is the single most effective step, more than any cream.
- **Fungal infections** — scaly patches with a clearer ring and an itchy edge. Keep the area dry; do not share towels or shoes. Antifungal creams are available from a pharmacist.
- **Bacterial infection** — spreading redness, warmth, swelling, tenderness, sometimes pus or fever. This needs a clinician, because untreated it can go deeper.
- **Scabies** — intense itching at night, worse between the fingers, on the wrists and waist. It spreads through contact, so the whole household and close contacts need treating at the same time.
- **Hives** — raised, itchy welts that come and go within hours.

**General care**
Keep skin clean and dry, avoid harsh soaps, and do not apply unknown creams from informal sellers — some contain steroids that damage skin over time and mask infection.

**Watch for**
A rash that does not fade when you press a glass against it, or that comes with fever, is not a simple rash.`,
    [
      "A rash that does not fade when pressed — with fever, especially in a child or someone with a stiff neck",
      "Redness spreading fast with severe pain and swelling, or red streaks from a wound",
      "Fever with a widespread rash",
      "Swelling of the face, lips or tongue, or difficulty breathing — severe allergic reaction, act immediately",
      "A dark or changing mole, or a sore that will not heal for 3 weeks or more",
      "Pus, or a hot spreading red area around a wound",
    ],
    ["How do I prevent scabies?", "What is a non-fadeable rash?", "How do I care for a wound?"],
  ),
  T(
    "worms",
    "Intestinal worms",
    "everyday illness",
    ["worms", "worm", "parasite", "parasites", "tapeworm", "roundworm", "hookworm", "pinworm", "worms in stool", "itching bottom", "deworming", "deworm", "whipworm"],
    `**What they are**
Intestinal worms are common where sanitation is incomplete, especially in children. Different worms cause different problems: some take blood and iron, some cause pain and diarrhoea, some itch at the bottom.

**Signs that suggest worms**
- A child who is tired, pale, or growing slowly for no clear reason
- Poor appetite, a bloated belly, or grinding of teeth at night
- Itching around the anus, often worse at night
- Seeing a worm in the stool, or in underwear
- Abdominal pain that comes and goes

**What to do**
- Take the child to a health centre. There is an inexpensive, well-established tablet for the most common worms here, and the right one depends on the worm. A pharmacist can advise.
- Deworming is often run on a school or community basis — ask about the next round.
- Wash hands with soap after the toilet and before eating or preparing food. This is the highest-value habit.
- Wear shoes. Hookworm enters through bare skin on the feet.
- Cook food thoroughly, and wash or peel fruit and vegetables.
- Treat the whole household at once, or reinfection is likely.

**Why it matters**
Untreated worms in a child contribute to anaemia and poor growth, and it is entirely treatable.`,
    [
      "Blood in the stool, or black stools",
      "Severe abdominal pain with vomiting",
      "A child who is very pale, unusually tired, or not growing",
      "Weight loss or a swollen belly in an adult",
      "Any worm passed in the stool, in a child who is unwell",
    ],
    ["What foods are high in iron?", "How do I wash hands properly?", "When should I see a doctor?"],
  ),
  T(
    "anaemia",
    "Anaemia and low blood",
    "everyday illness",
    ["anemia", "anaemia", "low blood", "pale", "paleness", "tired", "tiredness", "fatigue", "dizzy", "dizziness", "faint", "iron", "weakness", "breathless", "pale eyes", "no energy"],
    `**What it is**
Anaemia means your blood does not carry as much oxygen as it should, usually because there is too little haemoglobin. It is extremely common — especially in young women, children and pregnancy — and it is a symptom of something rather than a disease itself.

**Common causes**
- Too little iron in the diet, or poor absorption
- Blood loss: heavy periods, worms, stomach ulcers
- Malaria and other infections
- Chronic illness, or conditions affecting the gut
- In pregnancy, the body's increased needs

**Signs**
Tiredness that does not lift with rest, pale inner eyelids or palms, breathlessness on stairs, dizziness, headaches, poor concentration, cold hands and feet, and in children slowing growth or a very good appetite with no weight gain.

**What to do**
See a clinician. Iron treats the commonest cause, but iron is not harmless if you do not need it, and the cause should be found first — worms or an ulcer need treating, not just iron. Haemoglobin can be checked with a simple finger-prick blood test.

**Helpful alongside treatment**
Beans, lentils, groundnuts, dark green leaves, red meat, liver and eggs all contain iron. Vitamin C — citrus, tomatoes, greens — helps the body absorb iron from plants. Tea and coffee reduce absorption, so avoid them around iron-rich meals.`,
    [
      "Chest pain, or breathlessness at rest",
      "Fainting, or feeling about to pass out",
      "Black, tarry or bloody stools",
      "A racing heartbeat at rest",
      "Severe headache with blurred vision, or bleeding that will not stop",
      "Anaemia in pregnancy, or a child who is pale and failing to grow",
    ],
    ["What foods are high in iron?", "How do I stop worms in children?", "When should I see a doctor?"],
  ),
  T(
    "eyes",
    "Eyes and vision",
    "everyday illness",
    ["eye", "eyes", "vision", "sight", "eyesight", "blurry", "blurred", "red eye", "itchy eyes", "conjunctivitis", "cataract", "glasses", "screen", "myopia", "short sighted"],
    `**Common problems**
- **Conjunctivitis** — red, watery, sticky or itchy eyes. Very contagious. Wash hands, do not share towels, and wipe from the inner corner outward with a fresh cloth each time. Antibiotic drops need a prescription, so see a clinician rather than buying them.
- **Strain from screens** — dry, gritty, tired eyes and blurred focus after long screen time. The 20-20-20 habit helps: every 20 minutes, look at something far away for 20 seconds. Blink deliberately.
- **Cataract** — cloudy vision, glare at night, faded colours. Common with age and very treatable with surgery.

**Everyday care**
Wash hands before touching your face. Do not share eye drops, towels or cosmetics. Keep glasses clean and up to date.

**Why it deserves attention**
Untreated infection can damage sight permanently, and glaucoma causes silent permanent vision loss before anyone notices. Eye checks are worth having even when vision seems fine.`,
    [
      "Sudden loss of vision in one or both eyes",
      "Severe eye pain with a red eye, or nausea with eye pain — possible acute glaucoma",
      "An injury or chemical splash in the eye — rinse with clean water continuously for 15 minutes on the way to care",
      "A white or cloudy patch in a newborn's eye",
      "A painful red eye in a contact lens wearer — urgent, the cornea can be damaged",
      "Sudden double vision, or a curtain moving across your vision",
    ],
    ["How do I look after my eyes on a screen?", "How do I stop conjunctivitis spreading?", "When should I see a doctor?"],
  ),
  T(
    "oral",
    "Teeth and mouth",
    "everyday illness",
    ["tooth", "teeth", "toothache", "cavity", "cavities", "gum", "gums", "mouth", "bleeding gums", "dentist", "plaque", "mouth ulcer", "bad breath", "brushing", "brush", "floss"],
    `**The basics**
Tooth decay and gum disease are both driven by sugar and by plaque — the film of bacteria that forms on teeth within hours of cleaning.

**Prevention is most of the treatment**
- Brush twice a day with fluoride toothpaste, for two minutes, including the gum line.
- Clean between teeth daily. This is where most decay starts.
- Reduce the *frequency* of sugary food and drink. Frequency matters more than total amount: sipping a sweet drink all day is worse than one sweet drink.
- Drink water after meals. Avoid tobacco entirely.

**Common problems**
- **Toothache** — rinse with warm salt water, keep the head elevated when lying down, and see a dentist. Do not put a painkiller directly on the gum; it burns the tissue.
- **Bleeding gums** — often just gingivitis, and it stops once cleaning improves. Persistent bleeding belongs with a dentist.
- **Mouth ulcers** — usually heal in 1–2 weeks. Ulcers lasting more than 3 weeks, or a patch that does not heal, must be examined.

**Access**
Dental care is often the hardest service to reach. Ask at a health centre where to find dental cover, or contact us for help finding one.`,
    [
      "Swelling of the face, jaw or neck with difficulty swallowing or breathing — a spreading dental abscess, and an emergency",
      "Fever with facial swelling",
      "Bleeding that does not stop after 10 minutes of firm pressure",
      "A tooth knocked out — time-critical. Hold it by the crown, rinse gently, put it back in the socket or keep it in milk, and get to a dentist immediately",
      "A mouth ulcer or patch lasting more than 3 weeks",
      "Pain that wakes you at night, or is not settled by ordinary pain relief",
    ],
    ["How do I brush properly?", "What causes tooth decay?", "When should I see a doctor?"],
  ),

  /* ------------------------------------------------------------ first aid */
  T(
    "first-aid",
    "First aid essentials",
    "first aid",
    ["first aid", "firstaid", "accident", "what should i do", "help someone", "bleeding", "blood", "wound", "cut", "graze", "injury", "fall", "choke", "choking", "unconscious", "fainted", "poison", "cpr", "resuscitate"],
    `**Order of priority**
1. Is the scene safe? You cannot help if you become a casualty.
2. Is the person responding? Speak loudly, tap the shoulders.
3. Are they breathing normally? If not, this is the emergency.
4. Stop catastrophic bleeding.
5. Then deal with what is in front of you.

**Severe bleeding**
Press hard and directly on the wound with a clean cloth or your hand. Do not stop to look. Keep pressing — add more cloth on top if it soaks through, never remove the first layer. Raise the limb if no fracture is suspected. Once bleeding slows, secure the dressing.

**Minor cuts and grazes**
Rinse under clean running water, remove visible dirt, apply antiseptic if you have it, and cover with a clean dressing kept slightly moist so it does not stick. Change daily. Watch for spreading redness, warmth, swelling or pus — that means infection.

**Burns**
Cool under cool running water for 20 minutes, as soon as possible and within 3 hours. Do not use ice, butter, toothpaste, oil or ash. Remove rings and tight clothing *before* swelling starts. After cooling, cover loosely with a clean non-fluffy dressing. Do not burst blisters.

**Choking**
If they can cough, cough. If they cannot speak, cough or breathe, give back blows between the shoulder blades, then abdominal thrusts. Alternate until the object clears or they collapse. Never do abdominal thrusts on an infant — use back blows and chest thrusts.

**Unresponsive and not breathing normally**
Call for help, lay them on their back on a firm surface, and start chest compressions: centre of the chest, hard and fast, 100–120 per minute, about 5 cm deep. Keep going until help takes over or breathing resumes. If you are untrained, do compressions only — that is far better than nothing.

**Poisoning**
Do not make anyone vomit. Find out what was taken, when and how much, and take the container with you. Rinse the mouth. Get to care immediately.`,
    [
      "Anyone unresponsive or not breathing normally — this is a cardiac arrest",
      "Bleeding that soaks a pad in minutes, or spurts",
      "Suspected spinal injury after a fall or crash — do not move the neck or the person",
      "Suspected poisoning or overdose of any kind",
      "Deep or puncture wounds, or anything embedded in the skin",
      "Any burn to the face, hands, feet or genitals, or larger than the person's palm",
    ],
    ["What are the signs of a stroke?", "How do I keep a cut clean?", "How do I make water safe?"],
  ),
  T(
    "burns",
    "Burns and scalds",
    "first aid",
    ["burn", "burns", "burned", "scald", "scalds", "hot water", "fire", "flame", "steam", "stove", "blister", "scalded"],
    `**Immediately**
- Cool under cool running water for **20 minutes**. This is the single most important step, and sooner is better.
- Keep the rest of the person warm — cooling a large burn can chill them badly.
- Do not use ice, butter, oil, toothpaste, ash or herbs.
- Do not burst blisters; they are a natural dressing.
- Remove rings, watches, belts and tight clothing **before** swelling starts. Do not peel off stuck clothing.
- After cooling, cover loosely with a clean non-fluffy dressing, or cling film laid over rather than wrapped tight.
- Ask a pharmacist what pain relief is safe for you.

**Depth matters more than size**
- **Superficial** — red, dry, painful, no blisters.
- **Partial-thickness** — red, wet or white, blistered, very painful, numb in patches.
- **Full-thickness** — white, brown or charred, leathery, and painless because the nerve endings are destroyed. A painless burn is not a mild burn.

Burns heal according to what lies beneath them, not what is put on them.`,
    [
      "Any burn larger than the person's palm",
      "Any burn to the face, hands, feet, joints or genitals",
      "Electrical, chemical or smoke-inhalation burns — always need care",
      "A burn that is white, charred, or numb",
      "Burns on a child or an older person, whatever the size",
      "Signs of dehydration, or pain out of proportion to the burn",
    ],
    ["How do I treat a minor burn?", "What are the signs of dehydration?", "How do I prevent burns at home?"],
  ),
  T(
    "snakebite",
    "Snakebite, animal bites and stings",
    "first aid",
    ["snake", "snakebite", "snake bite", "bitten", "bite", "dog bite", "cat bite", "rabies", "scorpion", "spider", "bee", "sting", "jellyfish"],
    `**Snakebite is a real emergency**
- Keep the person calm and still. Movement spreads venom faster.
- Keep the bite **below heart level**, ideally at or near the ground.
- Remove rings, watches and tight clothing before swelling starts.
- Wrap a firm, not tight, bandage over the bite and up the limb. It should be snug enough to feel but not to stop the pulse.
- Splint the limb so it cannot move.
- Get to a hospital with antivenom as fast as you can. Only a hospital can give antivenom.

**Never**
Cut the wound. Suck out venom. Use a tourniquet. Apply ice, electric shock, herbs or ash. Try to identify the snake — treatment does not wait for the species.

**Animal bites**
Wash with soap and running water for 15 minutes. This alone dramatically reduces rabies risk. Go to a clinic for assessment and vaccination. Any bite that breaks the skin, or a scratch or lick on broken skin, needs a rabies assessment. Rabies is almost always fatal once symptoms start, and almost always preventable if treated promptly.

**Stings and bee allergy**
Remove a retained stinger by scraping, not pinching. Widespread rash, swelling of the face or throat, or difficulty breathing means a severe allergic reaction: use an adrenaline pen if you have one, and get emergency help immediately.`,
    [
      "Any snakebite — do not wait to see if it worsens",
      "Difficulty breathing, or swelling of the face, lips, tongue or throat",
      "Widespread hives with vomiting or dizziness",
      "A dog or cat bite that breaks the skin — rabies assessment needed",
      "Blurred vision, bleeding gums, or confusion after a bite",
      "Any wound from a dirty or rusty object",
    ],
    ["How do I keep water safe?", "How do I wash hands properly?", "When should I see a doctor?"],
  ),
  T(
    "injuries",
    "Broken bones, sprains and dislocations",
    "first aid",
    ["bone", "bones", "broken", "fracture", "sprain", "sprained", "twist", "twisted", "dislocation", "dislocated", "swollen", "ankle", "wrist", "joint", "cast", "cannot walk", "cant walk", "deformity"],
    `**Tell-tale signs**
Pain, swelling, bruising, deformity, and not being able to use the limb or bear weight. You do not need all of these. If in doubt, treat it as broken.

**What to do**
- Support the limb in the position found. Do not straighten a deformed limb.
- Splint it using anything rigid — rolled newspaper, a stick, a folded jacket — padded with soft material, and secure above and below the injury.
- Apply a cold pack wrapped in cloth for 20 minutes at a time. Never ice directly on skin.
- Remove rings and watches immediately, before swelling traps them.
- Give no food or drink — a person may need surgery.
- Get to a clinic. An X-ray decides whether it is broken.

**Sprains and fractures**
You cannot reliably tell them apart without an X-ray. Treat both the same: rest, ice, compression, elevation, and get it looked at if there is deformity, severe pain, numbness, or no improvement after 48 hours.

**Dislocations**
A joint that looks deformed and will not move. Do not try to put it back — you can damage nerves and vessels. Splint as found, give nothing to eat or drink, and get to hospital.`,
    [
      "A deformed limb, or bone visible through the skin — do not try to realign it",
      "A limb that is numb, pale or blue beyond the injury",
      "Possible skull fracture: vomiting, confusion, unequal pupils, fluid or blood from the ear or nose, or drowsiness — do not move the neck",
      "Possible neck or spine injury after a fall or crash",
      "Pain out of proportion to the visible injury",
      "Any injury where the person cannot bear weight",
    ],
    ["What is a sprain?", "How do I treat a minor burn?", "When should I see a doctor?"],
  ),

  /* ------------------------------------------- living with a condition */
  T(
    "hypertension",
    "High blood pressure",
    "living with a condition",
    ["hypertension", "blood pressure", "high pressure", "bp", "pressure", "hypertensive", "stroke risk", "high bp"],
    `**Why it matters**
High blood pressure usually causes nothing you can feel, for years, while quietly damaging the heart, kidneys, eyes and blood vessels. It is one of the biggest risk factors for stroke and heart disease, and it is easy to miss unless you measure it.

**How to know**
Only by measuring. Screening is worth having, especially over 30 or with a family history. A single high reading is not a diagnosis — blood pressure varies, and is affected by anxiety, pain, caffeine and exercise.

**What helps**
- Reduce salt. This has a bigger effect than almost any supplement. Cut added salt, avoid instant noodles, tinned food, salty snacks and processed meat, and do not cook with a lot of stock.
- Eat more fruit, vegetables, beans and whole foods.
- Move regularly, manage weight, and stop tobacco.
- Keep alcohol low.
- Take medication every day if prescribed, even when you feel completely well. High blood pressure has no symptoms, so feeling fine is not evidence that you can stop.

**Important**
Do not stop or adjust blood pressure medicine without being told to by a clinician. Stopping suddenly can be dangerous, and the dose is chosen for you.`,
    [
      "A severe headache with blurred vision — possible hypertensive emergency",
      "Chest pain",
      "Weakness or numbness on one side, drooping face or slurred speech — stroke",
      "Breathlessness",
      "Numbness, confusion or a seizure",
    ],
    ["What are the signs of a stroke?", "How do I eat less salt?", "How do I start exercising?"],
  ),
  T(
    "diabetes",
    "Diabetes and blood sugar",
    "living with a condition",
    ["diabetes", "sugar", "blood sugar", "glucose", "insulin", "diabetic", "type 1", "type 2", "hba1c", "sweet urine", "sugar level"],
    `**What it is**
Diabetes is a condition where the body cannot control blood sugar properly. Untreated it damages blood vessels, the eyes, the kidneys and nerves. Early control prevents most of that damage, which is why diagnosis matters so much.

**Common signs**
Constant thirst, passing urine very often especially at night, unexplained weight change, tiredness, cuts that heal slowly, blurred vision, and repeated skin or genital infections. Many people have diabetes for years without knowing.

**What helps**
Balanced eating with less sugar and refined carbohydrate, regular activity, weight management, and taking any prescribed medicine exactly as directed. If you use insulin, that is lifelong and non-negotiable — stopping it is dangerous within days, not weeks.

**Everyday checks**
If you are on medication, learn to recognise both too high and too low. Low blood sugar causes sweating, shaking, hunger, palpitations and confusion. Take fast-acting sugar, then a proper meal, and tell your clinician — the dose is probably wrong. Very high blood sugar causes thirst, urinating a lot, vomiting and drowsiness.

**Foot care matters more than people expect**
Check your feet daily. Wear shoes, never walk barefoot, and have any cut or sore looked at early. Most diabetes foot ulcers start from something small that was ignored.`,
    [
      "Very high blood sugar with vomiting, abdominal pain and deep rapid breathing — a diabetic emergency",
      "Blood sugar too low and unable to swallow, or a seizure or unconsciousness — give sugar if safe and get help",
      "A foot wound, a sore that will not heal, or a cold, pale or numb foot",
      "Sudden blurred vision, or vision loss in one eye",
      "Chest pain, or severe breathlessness",
      "Any foot ulcer in someone with diabetes — same day",
    ],
    ["How do I eat less sugar?", "How do I eat more healthily?", "How do I look after my feet?"],
  ),
  T(
    "hiv",
    "HIV",
    "living with a condition",
    ["hiv", "aids", "positive", "status", "antiretroviral", "art", "viral load", "cd4", "undetectable", "window period", "retest", "pep", "preexposure", "prep"],
    `**The single most important fact**
HIV is now a **manageable long-term condition**. With treatment, a person with HIV can live a full, healthy life and **cannot pass the virus on once the viral load is undetectable** — U=U: Undetectable = Untransmittable.

**Getting tested**
The only way to know is an HIV test. It is quick, confidential at many facilities, and free at many government health centres. After a possible exposure, testing is best repeated after **6 weeks and again after 3 months**, because a very recent infection may not show on the first test.

**Treatment**
Antiretroviral therapy, taken every day. Daily treatment keeps the virus suppressed and protects both the person and their partners. Side effects have improved enormously, and clinics work with you if you are struggling.

**Transmission**
Not spread by hugging, shaking hands, sharing cups or a toilet, eating together, mosquito bites, or coughing. It is spread through blood and sexual fluids, and from mother to child during pregnancy or breastfeeding — where medical support makes transmission very preventable.

**Stigma**
Stigma causes more damage than the virus. It drives people away from testing and treatment, which is exactly backwards. Health Root runs programmes supporting young people with this, in confidence.

**After a possible exposure**
Post-exposure prophylaxis can prevent infection, but it must start **within 72 hours** — sooner is much better. Go to a health centre and say you may have been exposed. Do not wait to see if you feel unwell.`,
    [
      "Fever, rash and sore throat in the weeks after a possible exposure — get tested and mention the exposure date",
      "Any possible exposure in the last 72 hours — PEP may still work, go today",
      "Persistent diarrhoea, weight loss or night sweats in someone living with HIV — attend clinic and tell them your status",
      "Severe headache, confusion or vision changes",
      "Chest pain or difficulty breathing",
    ],
    ["How soon should I get tested after exposure?", "How do I stop the spread of germs?", "Where can I get tested?"],
  ),
  T(
    "tb",
    "Tuberculosis",
    "living with a condition",
    ["tb", "tuberculosis", "tbc", "chronic cough", "night sweats", "weight loss", "hemoptysis", "contagious", "coughing blood"],
    `**What it is**
TB is a bacterial infection of the lungs, spread through the air when a person with active lung TB coughs. It is completely curable, but only with a full course of treatment.

**The symptoms that need testing**
A cough lasting 3 weeks or more, coughing up blood, chest pain, breathlessness, night sweats, loss of appetite, unexplained weight loss, and tiredness. Weight loss and night sweats alongside a cough are the combination people most often ignore.

**If you are starting treatment**
- **Take every dose, for the whole course.** Stopping early because you feel better is the single biggest cause of drug resistance, which is harder to treat and needs more drugs for longer.
- The medicine is provided free at government health centres.
- Tell anyone who coughs regularly, sleeps in the same room, or shares a small space with you. Close contacts should be tested.
- Keep the room well ventilated. Do not share a bed with someone with active TB.
- Your sputum is checked repeatedly to confirm treatment is working.

**The truth about transmission**
TB spreads through the air, not through shared utensils, handshakes, or the toilet. A person on effective treatment for about 2 weeks is much less infectious.

**Stigma**
TB is very common in Rwanda and completely curable. Being open with family is what actually protects them.`,
    [
      "Coughing up blood",
      "Severe breathlessness or chest pain",
      "A cough of 3 weeks or more, especially with weight loss and night sweats",
      "A child with a chronic cough, or failing to grow",
      "Confusion, drowsiness or a severe headache with a cough",
      "A cough in someone who is also HIV positive or malnourished — same day",
    ],
    ["How do I stop the spread of germs?", "What are the warning signs of TB?", "When should I see a doctor?"],
  ),
  T(
    "cholera-typhoid",
    "Cholera, typhoid and unsafe water",
    "living with a condition",
    ["cholera", "typhoid", "water", "dirty water", "contaminated", "sewage", "flood", "outbreak", "rice", "safe water", "drinking water"],
    `**How these spread**
Cholera and typhoid are both spread through food or water contaminated with faeces. Cholera causes sudden profuse watery diarrhoea and can dehydrate a healthy adult within hours. Typhoid gives a rising fever with stomach pain, headache and constipation or diarrhoea, and lasts weeks if untreated.

**What to do**
- Treat urgently. Dehydration is the emergency in cholera, and ORS is the treatment.
- Rehydrate steadily with small, frequent sips of ORS, and seek care the same day.
- In an outbreak, treat drinking water: bring it to a rolling boil, or use chlorine as directed. Never drink untreated water.
- Wash hands with soap after the toilet and before preparing or eating food.
- Cook food thoroughly and eat it while it is hot. Cooked rice left to cool and eaten later is a classic typhoid source, because bacteria grow in it.
- Eat food either hot or cold from the fridge, not in between.

**Preventing it in the community**
Safe water supply, latrines not shared with animals, handwashing stations, and safe waste disposal. When cases appear, safe water and handwashing are what contain it.`,
    [
      "Sudden heavy watery diarrhoea, like rice water, especially in a child or older adult",
      "Rice-water diarrhoea with vomiting — cholera until proven otherwise",
      "Very little urine, sunken eyes, no tears, or extreme sleepiness",
      "Fever lasting more than 3 days with stomach pain",
      "A stiff neck, severe headache or confusion with fever",
      "A sudden watery diarrhoea outbreak in your area — report it",
    ],
    ["How do I make oral rehydration solution?", "How do I keep water safe?", "How do I keep food safe?"],
  ),
  T(
    "asthma",
    "Asthma and breathing problems",
    "living with a condition",
    ["asthma", "wheeze", "wheezing", "breathless", "shortness of breath", "short of breath", "tight chest", "chest tightness", "inhaler", "bronchitis", "emphysema", "copd"],
    `**Asthma**
Airways narrow and swell, producing wheezing, breathlessness, a tight chest and cough — often worse at night, on exercise, or in cold or dusty air. It is long-term, and it is controllable.

**What matters**
- Get a proper diagnosis. Wheezing is not always asthma, and children who wheeze need assessment.
- If you have an inhaler, use it as prescribed and check you can find it. Reliever inhalers reduce a flare; preventer inhalers only work if used every day, even when well.
- Avoid triggers: smoke, dust, strong fumes, cold dry air. A house with someone who smokes inside is a major trigger.
- Know your action plan. A written plan from your clinic tells you exactly what to do when symptoms rise.
- Do not stop preventer inhalers because you feel fine. This is the commonest reason asthma attacks happen.

**Long term**
Avoid tobacco smoke, move regularly, keep the home clean and smoke-free, and use a cloth over the mouth and nose in dusty conditions.`,
    [
      "Severe breathlessness, unable to speak full sentences, or speaking in single words",
      "Lips, tongue or fingertips turning blue or grey",
      "No relief after using a reliever inhaler as prescribed",
      "Chest pain with breathlessness",
      "Drowsiness, confusion or exhaustion with breathlessness",
      "A child struggling to breathe, or ribs pulling in between breaths",
    ],
    ["How do I stop the spread of germs?", "How do I avoid tobacco smoke?", "When should I see a doctor?"],
  ),
  T(
    "ulcer",
    "Stomach ulcers and gastritis",
    "living with a condition",
    ["ulcer", "ulcers", "gastritis", "heartburn", "acid", "reflux", "indigestion", "bloating", "stomach pain", "belly pain", "h pylori", "gerd", "acid reflux"],
    `**Common problems**
- **Indigestion / gastritis** — burning or pain in the upper stomach, often with bloating, nausea or fullness, frequently after meals.
- **Acid reflux** — a burning feeling behind the breastbone and a sour taste, often worse lying down.
- **Peptic ulcer** — an open sore in the stomach or upper gut lining. The pain is often worse with an empty stomach, and it can bleed.

**Causes and contributors**
Helicobacter pylori infection is the main cause of ulcers and can be tested for and treated. Anti-inflammatory painkillers such as ibuprofen and similar drugs also cause ulcers and bleeding, especially in older people. Smoking, alcohol and frequent use of these painkillers are all risk factors.

**What helps**
- Smaller, more frequent meals rather than large ones.
- Avoid triggers you have noticed — commonly alcohol, very spicy food, fried food and fizzy drinks.
- Do not lie down for 2–3 hours after eating; raise the head of the bed if reflux is at night.
- Stop tobacco.
- **Do not take painkillers such as ibuprofen casually** for stomach pain — they can make it worse. Ask a pharmacist what is safer, especially if you might be pregnant, have kidney problems, or take regular medication.
- Persistent upper stomach pain needs testing rather than indefinite self-treatment.

**Urgent**
A black tarry stool or vomiting blood means bleeding, and needs emergency care.`,
    [
      "Vomiting blood, or coffee-ground vomit",
      "Black, tarry stools, or blood in the stool",
      "Sudden severe upper abdominal pain — possible perforation",
      "Unintentional weight loss, difficulty eating, vomiting",
      "A hard lump in the abdomen",
      "Anaemia with fatigue and pallor alongside stomach pain",
    ],
    ["What causes anaemia?", "How do I eat more healthily?", "When should I see a doctor?"],
  ),
  T(
    "sickle-epilepsy",
    "Sickle cell disease and epilepsy",
    "living with a condition",
    ["sickle", "sickle cell", "sickle-cell", "epilepsy", "epileptic", "seizure", "fits", "fit", "convulsion", "convulsions", "blackout", "fainting fit"],
    `**Sickle cell disease**
An inherited condition where red blood cells become rigid and sickle-shaped. They can block small blood vessels, causing pain and reduced blood flow to organs. It is inherited, and in Rwanda it affects a meaningful share of the population.

**Living with it**
- Stay well hydrated — this reduces crises more than almost anything else.
- Avoid cold, extreme heat and dehydration.
- Keep vaccinations up to date, especially pneumococcal and hepatitis B.
- Take folic acid and any prescribed medicine.
- Know your triggers and your plan. Pain is best managed early, not at its peak.
- Antibiotics are often prescribed for fever in sickle cell disease because infection moves fast — a fever is urgent.
- Do not delay care for chest pain, breathlessness, fever or a new neurological symptom.

**Epilepsy**
Episodes of involuntary movement, loss of awareness or unusual sensations, caused by bursts of abnormal electrical activity. It is not a spiritual problem and it is not contagious.

**During a fit**
- Protect from injury; move hard objects away.
- Cushy the head.
- Loosen tight clothing. **Never** put anything in the mouth — this is an old and dangerous practice that causes broken teeth and suffocation.
- Let the fit run its course. Do not restrain the person.
- Afterward turn them on their side and let them recover fully. Stay with them.
- Note when it started and how long it lasted.

**Important**
A first fit, any fit lasting more than 5 minutes, fits in pregnancy, or more than one in a month needs a clinician. Epilepsy is treatable, and many people achieve full control with the right medicine.`,
    [
      "A fit lasting more than 5 minutes, or repeated fits without recovery in between",
      "A first-ever fit, or a fit in someone who is pregnant",
      "Fever with a fit, or a fit with a rash that does not fade",
      "Fever in sickle cell disease — treat as urgent",
      "Chest pain, breathlessness or sudden weakness in sickle cell disease",
      "A fit that does not stop, or an injury during a fit",
    ],
    ["What should I do during a seizure?", "How do I keep hydrated?", "When should I see a doctor?"],
  ),
  T(
    "medicines",
    "Taking medicines safely",
    "using health services",
    ["medicine", "medicines", "medication", "drug", "drugs", "tablet", "tablets", "pill", "pills", "antibiotic", "antibiotics", "dosage", "dose", "side effects", "prescription", "expired", "pharmacy", "self-medicate", "injection", "painkiller", "ibuprofen", "paracetamol"],
    `**Using medicines well**
- Take exactly what was prescribed, for the full course. Antibiotics especially — stopping early breeds resistance.
- Check the name, the dose and the expiry date before you leave the pharmacy.
- Ask the pharmacist what to expect, and what to avoid: food, alcohol, other medicines.
- Never share prescription medicines, and never use someone else's.
- Keep medicines out of reach of children, in a cool dry place — not a bathroom or a car.
- Bring the boxes or a written list when you see a clinician, especially if you take regular medication.
- Ask for the label in a language you read comfortably.

**Self-medicating**
Very common, and it causes real harm: wrong drugs, wrong doses, wrong combinations, and delayed diagnosis. A pharmacist is a trained professional and a good first stop. Using a pharmacy this way is far cheaper and safer than guessing.

**Beware**
Avoid informal-market medicines of unknown origin, especially in unmarked or unlabelled containers. Steroid creams sold informally cause lasting skin damage.

**Antibiotics**
They do nothing for viral illnesses like colds and flu. Taking them anyway causes side effects, costs money, and makes future infections harder to treat. Only use them when a clinician has decided you need them.

**Never**
Start, stop or change any prescribed medicine without a clinician telling you to — including blood pressure and diabetes medicines, which are the ones most often abandoned once people feel well.`,
    [
      "A severe allergic reaction: swelling of the face, lips or tongue, or difficulty breathing",
      "Rash with fever and mouth or eye ulcers after starting a new medicine",
      "Repeated vomiting or severe diarrhoea after starting a medicine",
      "Yellowing of the eyes or skin, or dark urine, after a new medicine",
      "Confusion, hallucinations or extreme sleepiness after a medicine",
      "An overdose, or a child who has swallowed a medicine — take the packet and go to hospital",
    ],
    ["How do I keep medicines safe at home?", "When should I see a doctor?", "How do I eat more healthily?"],
  ),

  /* ------------------------------------------------------ mother and baby */
  T(
    "pregnancy",
    "Pregnancy and antenatal care",
    "mother and baby",
    ["pregnancy", "pregnant", "antenatal", "prenatal", "anc", "booking", "trimester", "due date", "pregnancy test", "ultrasound", "folic acid", "birth plan", "morning sickness"],
    `**Early and often**
Antenatal care started in the first trimester, and attended consistently, is the strongest single predictor of a healthy mother and baby. Book as soon as you suspect pregnancy — earlier is better, and the first visit matters most.

**A good ANC course includes**
- Confirming the pregnancy and dating it
- Blood tests, urine tests, and screening for HIV, hepatitis B and syphilis
- Blood pressure, weight, and measuring the growing belly
- Iron and folic acid, with nutrition advice
- Malaria prevention in pregnancy, and net use
- Tetanus vaccination
- HIV testing, with the option of prevention to protect the baby
- Planning for delivery, including where and when

**Everyday care**
- Eat a variety of foods, with enough protein and iron. Do not restrict food.
- Take iron and folic acid as prescribed, at the times advised — iron can cause constipation.
- Rest, but keep moving gently. Avoid heavy lifting.
- Sleep under a treated net.
- Avoid alcohol, and avoid smoking and second-hand smoke.
- Be careful with medicines. Many are unsafe in pregnancy, especially before anyone knows you are pregnant. Ask a clinician or pharmacist rather than self-treating.
- Ask if you are due a tetanus vaccination.

**Partner involvement**
Partners attending ANC improves outcomes, including earlier testing for HIV and syphilis.`,
    [
      "Vaginal bleeding at any point in pregnancy",
      "Severe headache, or seeing flashing lights or spots — can signal pre-eclampsia",
      "Sudden swelling of the face and hands, or severe swelling",
      "Pain under the ribs, or upper abdominal pain",
      "Fever, or shaking chills",
      "Vomiting that will not stop, or unable to keep fluids down",
      "Pain passing urine, or foul-smelling or greenish discharge",
      "Less movement of the baby than usual, or a change in its movements",
      "Contractions, or fluid leaking from the vagina, before the due date",
      "A seizure, or difficulty breathing",
    ],
    ["How do I keep food safe in pregnancy?", "What should a newborn sleep on?", "How do I keep hydrated?"],
  ),
  T(
    "breastfeeding",
    "Breastfeeding and infant feeding",
    "mother and baby",
    ["breastfeeding", "breastfeed", "breast milk", "milk supply", "infant feed", "formula", "wean", "weaning", "bottle", "colic", "latch", "sore nipples", "engorgement"],
    `**Why it matters**
Breast milk is the perfect first food. It is easily digested, always safe and sterile, free, and it carries the mother's antibodies. It protects against diarrhoea and respiratory infection, supports brain development, and reduces the risk of ear infection and some chronic conditions later.

**How to do it well**
- Start within an hour of birth, and continue frequently. Colostrum — the first thick milk — is small in volume and extremely valuable.
- Feed on demand, usually 8–12 times in 24 hours including at night. Frequent feeding builds supply.
- Get a good latch: the mouth should take a good mouthful of the breast, not just the nipple. A pinching latch hurts and feeds ineffectively.
- Finish one breast before moving to the other, so the baby gets the fatty hindmilk.
- Night feeds are important and are not a mistake.
- No water, tea, juice or other foods before 6 months. Nothing at all except breast milk.
- If you cannot or choose not to breastfeed, use safe formula prepared exactly as directed, and never dilute it.

**Common worries**
- **Sore or cracked nipples** — check the latch first; that is the usual cause. Feed often, and keep the area dry.
- **Engorgement** — feed frequently, warm compress before, cold after.
- **Low supply** — uncommon; it usually means feeding too rarely. Feed more, not less.

**The recommendation**
Breastfeeding for at least 2 years, with appropriate complementary food from 6 months alongside it.`,
    [
      "A baby who is difficult to wake, feeding very poorly, or has sunken eyes and a dry mouth",
      "No urine or very few wet nappies in a newborn",
      "A newborn with yellowing of the skin, especially in the first 24 hours",
      "Fever in a breastfeeding mother, or a breast that is red, hot and very painful — mastitis",
      "A baby under 3 months with a fever",
      "A baby who is not gaining weight or is losing weight",
    ],
    ["What are the danger signs in babies?", "What should a newborn sleep on?", "When should I see a doctor?"],
  ),
  T(
    "newborn",
    "Newborn and infant care",
    "mother and baby",
    ["newborn", "baby", "infant", "cord", "umbilical", "navel", "nappy", "diaper", "rash", "sleep", "safe sleep", "cradle", "colic", "immunisation schedule"],
    `**The first hours and days**
- Keep the baby warm, skin to skin with the mother if possible, and feed early and often.
- The umbilical cord stump: keep it clean and dry, fold the nappy below it, and let air get to it. Clean with clean water if soiled. Redness spreading, pus, or a bad smell means infection.
- Cord care is far cleaner and safer than applying traditional pastes, ash or powders, which are a common cause of neonatal infection and tetanus.

**Safe sleep**
- On the back, every time, on a firm flat surface.
- Nothing in the cot: no pillows, blankets, toys or bumpers.
- Room sharing with the parent for the first 6 months is strongly recommended.
- No smoking or second-hand smoke around the baby.

**Recognising a sick baby**
Young infants become ill fast and show little warning. Trust your instinct — if a baby seems different, you are right to be worried. Check for breathing difficulty, feeding less than usual, fewer wet nappies, unusual sleepiness or irritability, a fever, or a rash that does not fade.

**Vaccination**
Follow the national schedule. Vaccines prevent the illnesses that kill the most children here: measles, pneumonia, diarrhoea, pertussis, tetanus and malaria. Keep the card safe and bring it to every visit.`,
    [
      "A baby who is difficult to wake, floppy, or unusually irritable",
      "Breathing fast, grunting, pulling in the ribs between breaths, or pausing in breathing",
      "Fever in a baby under 3 months",
      "Not feeding at all, or refusing all feeds",
      "Convulsions",
      "A rash that does not fade when pressed",
      "Yellowing of the skin or eyes, or pale or grey skin",
      "Vomiting that is green or brings up blood",
      "A swollen, red, draining or smelly umbilical cord",
    ],
    ["What are the danger signs in babies?", "How do I keep my home clean?", "Why are vaccines important?"],
  ),

  /* ---------------------------------------------------------- children */
  T(
    "child-health",
    "Children's health and danger signs",
    "children",
    ["child", "children", "kid", "baby", "toddler", "my son", "my daughter", "growing", "stunting", "malnutrition", "underweight", "appetite", "school child"],
    `**Common concerns in children**
- **Poor appetite or slow growth** — check for worms, anaemia and infection before assuming a child simply picks their food.
- **Stunting and wasting** — poor growth has causes, and it is not simply "not enough food". Infection, worms, poor absorption and poverty all matter, and a health centre can assess and support properly.
- **Anaemia** — very common, and it makes children tired and unable to concentrate at school. Testable with a finger-prick blood check, and treatable.

**General care**
- Immunisations to schedule, kept up to date.
- Deworming on the community or school rounds.
- Enough food, clean water, and handwashing with soap.
- Sleep, movement and play.
- A child eating a varied diet grows well. Variety beats quantity.

**Children show illness differently**
They may not describe a symptom accurately. Look at behaviour: a child who is quiet, unusually clingy, not playing, or not eating is telling you something.

**Trust your instinct**
Parents know their child. If something feels wrong, seek care — it is better to have an unnecessary check than to wait.`,
    [
      "A child who is unusually sleepy, floppy, or difficult to wake",
      "Breathing fast, grunting, or ribs pulling in between breaths",
      "Convulsions",
      "A rash that does not fade when pressed",
      "Refusing all fluids, or signs of dehydration",
      "Blood in the stool or vomit",
      "A swollen belly, or rapid weight loss",
      "Fever in a child under 3 months",
      "Any child who you simply know is very unwell",
    ],
    ["What are the danger signs in babies?", "How do I stop worms in children?", "Why are vaccines important?"],
  ),
  T(
    "vaccines",
    "Vaccines and immunisation",
    "children",
    ["vaccine", "vaccines", "vaccination", "vaccinations", "immunisation", "immunizations", "immunize", "jab", "injection", "shoot", "measles", "polio", "tetanus", "mmr", "cold chain"],
    `**Why they matter**
Vaccines train the immune system to recognise a disease before it meets it. They prevent the illnesses that kill the most children in low-income settings: measles, pneumonia, diarrhoea, pertussis, tetanus, polio and, in Rwanda, malaria.

**How they work in practice**
- The national schedule is free at government health centres and is designed to fit the country's disease pattern.
- Several vaccines need more than one dose, and the later doses are not optional.
- A vaccine may cause a mild fever and soreness for a day or two. This is normal and resolves. Serious reactions are rare.
- If your child has a high fever or is very unwell on the day, ask the nurse — the vaccine can usually be given anyway or rescheduled.

**The practical barriers people hit**
- Bring the card to every visit; without it, doses get missed.
- A missed dose can usually be caught up. Go back and ask. Nothing is lost.
- A child with a mild cold or a low-grade fever can usually still be vaccinated.
- Vaccines are not weakened by the journey, and being slightly late is far safer than never going.

**A real, small risk**
No medicine is completely free of risk. Vaccines are used at doses and schedules chosen because the protection far outweighs the risk — but if you have concerns, raise them with a nurse or clinician rather than skipping.`,
    [
      "A child with a high fever, or who is very unwell, on the day of vaccination",
      "A seizure within 3 days of a vaccine",
      "Persistent crying for more than 2 hours, or unusual floppiness after a vaccine",
      "Difficulty breathing after a vaccine",
      "Any swelling or rash that is severe and spreading after a vaccine",
    ],
    ["What are the danger signs in babies?", "How do I stop the spread of germs?", "When should I see a doctor?"],
  ),

  /* ---------------------------------------------------- mental wellbeing */
  T(
    "mental-health",
    "Mental health and emotional wellbeing",
    "mental wellbeing",
    ["mental", "mental health", "depression", "depressed", "anxiety", "anxious", "stress", "stressed", "sad", "sadness", "mood", "hopeless", "worthless", "cry", "crying", "lonely", "loneliness", "anger", "grief", "bereaved", "loss", "burnout", "tired of life"],
    `**Mental health is health**
Low mood, anxiety and stress are medical states, not weaknesses, and not a matter of willpower. They are also very common here, and they respond well to support.

**What people notice**
Persistent low mood or loss of interest in things they used to enjoy, sleep much more or much less, changes in appetite, tiredness, poor concentration, feeling worthless or hopeless, irritability, panic attacks, or difficulty sleeping because of worry. If these last more than two weeks, they deserve treatment.

**What helps**
- Talk to someone. A family member, a teacher, a pastor, a peer, a counsellor, or us. Shame is what keeps people silent, and it costs more than the illness.
- Keep a rhythm: sleep and wake at similar times, eat regularly, move daily, and keep some structure in the day.
- Reduce alcohol. It makes anxiety and low mood worse, and it damages sleep.
- Movement is a genuine treatment for mild to moderate depression, and it is free.
- Reduce alcohol and tobacco, and protect your sleep.
- Practise what helps: prayer and community support, for many people, are genuinely sustaining.

**When to get professional help**
Any suicidal thoughts, self-harm, or a loss of hope about living — see the crisis guidance below. Also any symptoms lasting more than two weeks, or any symptoms stopping you working, studying, eating or sleeping.

**A note for carers**
If someone you live with is withdrawn, angry, or not sleeping, that is a sign to ask how they are, not to leave them be.`,
    [
      "Any thoughts of suicide, self-harm, or of not wanting to be alive",
      "Feeling trapped, hopeless, or that life is not worth living",
      "Not sleeping for several nights, or sleeping almost continuously",
      "Hearing voices, or seeing or believing things others do not",
      "Not eating or drinking for a day or more",
      "Agitation, aggression or severe restlessness with fever",
    ],
    ["What are the signs of a stroke?", "How do I sleep better?", "How can I get support?"],
  ),
  T(
    "stress-sleep",
    "Stress, sleep and burnout",
    "mental wellbeing",
    ["stress", "stressed", "stressful", "sleep", "sleeping", "insomnia", "tired", "exhausted", "burnout", "busy", "overwhelmed", "worry", "worrying", "anxiety", "anxious", "panic", "rest"],
    `**Sleep is health**
Most adults need 7–9 hours. Too little sleep worsens mood, concentration, blood pressure, appetite and pain. Poor sleep is one of the most under-treated problems in modern life.

**Why people sleep badly**
Screen time and light late at night, caffeine after mid-afternoon, alcohol (it fragments sleep badly), irregular hours, screens in the bedroom, a hot room, and worry.

**What helps**
- Same wake-up time every day, including weekends. This matters more than bedtime.
- Daylight in the morning. A walk outside within an hour of waking helps more than it sounds.
- Cool, dark, quiet room.
- Screens off an hour before bed. Put the phone in another room if you can.
- No caffeine after mid-afternoon, and no alcohol as a sleep aid.
- If you are awake more than 20 minutes, get up, do something dull in dim light, and return when sleepy.
- Wind down deliberately: a shower, a stretch, reading. Screens do not wind you down, they wake you up.

**Stress**
Most stress is not one thing but a pile: money, work, family, exam pressure, unemployment, caring for others. The pressure that does damage is the feeling that you have no control and no end. Naming what is actually weighing on you, to one person you trust, cuts the load measurably.

**Burnout**
Exhaustion, cynicism and reduced effectiveness at something you once cared about. It is not laziness. It needs a real change to workload, sleep and recovery, not more effort.`,
    [
      "Any thoughts of harming yourself, or that you cannot keep going",
      "Several nights with almost no sleep, or sleeping almost constantly",
      "Panic attacks, or chest pain that comes with anxiety",
      "Not eating or functioning for more than a day",
      "Hearing voices, or beliefs others do not share",
    ],
    ["What are the signs of a stroke?", "How do I start exercising?", "What should I eat?"],
  ),

  /* ------------------------------------------------- food and lifestyle */
  T(
    "nutrition",
    "Eating well and balanced diet",
    "food and lifestyle",
    ["nutrition", "diet", "eat", "eating", "food", "balanced", "healthy food", "malnutrition", "underweight", "overweight", "obesity", "protein", "vitamin", "minerals", "portion", "breakfast", "meal", "snack", "fruit", "vegetable", "veg", "beans"],
    `**What a balanced plate looks like**
A good everyday diet is mostly starch staples, plus protein, plus vegetables and fruit, and enough fat for absorption.

- **Starches** — rice, maize, cassava, potatoes, bread, sorghum, millet. These are the base, not the problem.
- **Protein** — beans, lentils, peas, groundnuts, eggs, fish, chicken, meat. Needed for growth, muscle, repair and immunity.
- **Vegetables and fruit** — for vitamins, minerals and fibre. Aim for several portions across the day.
- **Fat** — a small amount of oil, groundnuts, seeds, avocado. Fat helps absorb vitamins A, D, E and K.

**Rules that matter more than any superfood**
- Eat a **variety**. No single food keeps you healthy on its own.
- **Protein at every meal**, especially for children, pregnancy and recovery from illness.
- Eat **regularly**. Long gaps cause overeating later and unstable energy.
- **Drink water** through the day. Sweet drinks, including juice, are not healthy drinks.
- **Cut excess salt, sugar and oil.** Deep frying and sugary drinks are the biggest avoidable contributors to high blood pressure, diabetes and tooth decay in this region.
- **Weigh loss** should be gradual and from diet and activity, not from skipping meals.

**The household reality**
Beans, groundnuts, maize and leafy greens are affordable, complete and available. Eggs and small fish are the cheapest quality protein. Planning one extra pot of beans or groundnut sauce each week is the single highest-impact change many families can make.

**Micronutrients worth knowing**
- **Iron** — red meat, liver, beans, groundnuts, dark greens. Absorbed better with vitamin C. Tea and coffee reduce it.
- **Vitamin A** — liver, eggs, dark green and orange vegetables, prevents eye problems and supports immunity.
- **Iodine** — from iodised salt, needed for brain development.
- **Folate** — dark green leaves, beans, liver; essential in pregnancy.`,
    [
      "A child who is not growing, is losing weight, or is very thin",
      "A swollen belly with thin limbs",
      "A very large appetite with no weight gain",
      "Fainting, breathlessness on stairs, or paleness — possible anaemia",
      "Unintentional weight loss in an adult",
      "Any sign of a nutritional deficiency that is not improving",
    ],
    ["What foods are high in iron?", "How do I keep food safe?", "How do I prepare a balanced meal?"],
  ),
  T(
    "exercise",
    "Movement and physical activity",
    "food and lifestyle",
    ["exercise", "exercising", "activity", "physical activity", "workout", "sport", "sports", "running", "walking", "gym", "movement", "sedentary", "fit", "fitness", "sitting"],
    `**Why it is worth the effort**
Regular movement lowers blood pressure, improves blood sugar control, helps weight, lifts mood, improves sleep, reduces anxiety, strengthens bones and makes daily tasks easier. It is one of the most effective things a person can do for their health, and it is free.

**What counts**
Anything that raises your heart rate a little and makes you warmer: brisk walking, running, cycling, carrying water, dancing, football, manual work, housework. The target is about 150 minutes a week of moderate activity, or 30 minutes on most days.

**Strength matters too**
Twice a week, do something that works against resistance: carrying loads, squats against a wall, push-ups, or climbing. Muscle loss after 30 is a major cause of weakness and falls, and it is reversible.

**For children**
Free play, games, sport and walking to school count fully. Children need activity, not structured exercise.

**Sitting**
Sitting for long unbroken stretches is harmful regardless of exercise. Stand, stretch or walk every 30 minutes. Reduce long screen time.

**Starting**
Begin with what is already available — walking is genuinely enough to change someone&rsquo;s blood pressure and mood. Build up gradually. Pain or chest pain is a reason to stop and seek care, not push through.`,
    [
      "Chest pain during or after exercise",
      "Severe breathlessness that does not settle with rest",
      "Fainting during exercise",
      "Palpitations with dizziness or collapse",
      "Joint pain that is sharp and severe, or follows an injury",
    ],
    ["How do I eat more healthily?", "How do I eat less salt?", "How do I sleep better?"],
  ),
  T(
    "tobacco-alcohol",
    "Tobacco, alcohol and other substances",
    "food and lifestyle",
    ["smoking", "tobacco", "cigarette", "cigar", "alcohol", "drink", "drinking", "beer", "wine", "drug", "drugs", "substance", "addiction", "addicted", "weed", "cannabis", "vaping", "shisha", "smokeless"],
    `**The short version**
Smoking is the single most preventable cause of early death. It causes lung cancer, COPD, heart disease, stroke, and cancers elsewhere in the body. Alcohol above a small amount causes liver disease, hypertension, mental health problems, injuries and road deaths.

**Stopping is worth it at any age**
- After 1 year, heart disease risk is about half that of a smoker.
- After 5 years, stroke risk is substantially reduced.
- Within months, breathing improves, taste and smell recover, and skin and teeth look better.
- Within weeks, circulation improves and exercise tolerance rises.
People who make a serious attempt are far more likely to succeed with support than with willpower alone.

**How to stop**
- Set a quit date and tell the people around you, so they can support rather than sabotage.
- Nicotine replacement and certain medicines are available and can double your chances. Ask a clinician or pharmacist about what is available to you — these work best alongside a plan, not instead of one.
- Avoid triggers: alcohol, the shop where you buy, and the times of day you usually smoke.
- Expect withdrawal for 1–3 weeks: irritability, restlessness, poor sleep, hunger. It passes, and it is a sign the body is clearing.

**Alcohol**
Less is better. The safest level is none, and low-risk guidance is about one small drink occasionally.
- Never mix alcohol with other drugs, and never drink when driving, swimming alone, or doing anything where a fall could kill you.
- Alcohol and mental health feed each other. It worsens depression, anxiety and sleep.

**If you need help**
Health Root runs youth programmes on health, and you can talk to us in confidence. Call ${site.phone} or email ${site.email}.`,
    [
      "Chest pain, or breathlessness at rest",
      "Coughing up blood",
      "Vomiting blood, or a swollen painful abdomen",
      "Confusion, seizures or abnormal breathing after alcohol or drugs",
      "Thoughts of harming yourself — this is a crisis, get help now",
      "Stroking, severe confusion, or one-sided weakness — think stroke, act now",
    ],
    ["How do I stop the spread of germs?", "How do I sleep better?", "How can I get support?"],
  ),

  /* ------------------------------------------- hygiene and prevention */
  T(
    "handwashing",
    "Handwashing and hygiene",
    "hygiene and prevention",
    ["handwashing", "hand wash", "wash hands", "hygiene", "soap", "clean hands", "germs", "sanitation", "dirt", "clean", "tidy", "disinfect", "infection prevention"],
    `**The single highest-value habit**
Handwashing with soap removes the germs behind diarrhoea, cholera, typhoid, worms, hepatitis A, and most respiratory infections. It is cheap, and it works better than almost anything you can buy.

**When to wash**
- After using the toilet or helping a child
- Before handling food, cooking, or eating
- After touching a baby or animal, or their waste
- After coughing, sneezing or blowing the nose
- After handling money, soil, or animals
- Before and after caring for a sick person
- On arriving home

**How to do it properly**
- Wet hands with clean running water.
- Apply soap. Any soap — bar or liquid.
- Rub palms together, then the backs of hands, between fingers, fingertips, thumbs, and around the nails and wrists. At least 20 seconds, about the time it takes to sing a song.
- Rinse under running water.
- Dry on a clean cloth or in the air. A shared damp cloth is worse than nothing — it harbours germs.
If no water is available, use alcohol hand rub if you have it; otherwise use ash or sand on hands and then wash properly as soon as you can.

**Beyond hands**
- Cover coughs and sneezes with the elbow or a tissue, not the hands.
- Keep household animals out of the sleeping and cooking areas.
- Keep shoes off the bed, and consider removing shoes inside if someone in the house is unwell.
- Wash bedding and towels regularly, and never share them.`,
    [
      "Anyone with diarrhoea, especially a child or older person",
      "Diarrhoea with blood, or with fever",
      "Persistent vomiting or signs of dehydration",
      "A household member with diarrhoea, cholera or typhoid — extra hygiene needed",
      "An infant who is not feeding or has no tears when crying",
    ],
    ["How do I keep water safe?", "How do I stop the spread of germs?", "How do I wash hands properly?"],
  ),
  T(
    "water-food-safety",
    "Safe water and food safety",
    "hygiene and prevention",
    ["safe water", "drinking water", "water", "borehole", "purify", "boil water", "chlorine", "tap water", "food safety", "food poisoning", "hygiene", "contamination", "preserve", "storage", "leftover"],
    `**Water**
Contaminated water spreads cholera, typhoid, hepatitis, worms and diarrhoea. In this region most disease comes from water and from the environment around it.

Making water safe at home:
- Bring it to a rolling boil for at least 1 minute. This kills bacteria, viruses and parasites.
- Or treat with chlorine as the product directs, and wait the full time before drinking.
- Or use a ceramic or sand filter of a type that is certified to remove parasites as well as bacteria.
- Keep drinking water in a clean covered container, with a tap or ladle that is not dipped by hands. A narrow-mouth container or one with a spout is far safer than an open bucket.
- Clean the container regularly. A dirty container recontaminates clean water.

**Protecting the source**
- Keep latrines and rubbish away from wells, boreholes, and water collection points.
- Do not let animals near water sources.
- Use a covered latrine, and do not let children defecate in the open.
- Wash hands with soap after defecating, and before preparing food.

**Food safety**
- Wash hands with soap before cooking, and between handling raw and cooked food.
- Cook food thoroughly and eat it while it is hot, or keep it cold in the fridge. Avoid the lukewarm middle ground.
- Cooked rice and reheated sauce are classic sources of serious food poisoning. Cooked rice left to cool at room temperature should be thrown away.
- Keep food covered against flies and dust.
- Eat food the same day if you can, especially in heat.
- Peel it, boil it, cook it, or leave it.`,
    [
      "Sudden heavy watery diarrhoea, especially rice-water diarrhoea",
      "Diarrhoea with blood, or with fever and vomiting",
      "Signs of dehydration in anyone, especially a child or older adult",
      "A sudden outbreak of diarrhoea in the area — report it",
      "Any illness in more than one person who shared the same water or meal",
    ],
    ["How do I make oral rehydration solution?", "How do I wash hands properly?", "How do I stop the spread of germs?"],
  ),
  T(
    "disease-prevention",
    "Preventing disease and recognising it early",
    "hygiene and prevention",
    ["prevent", "prevention", "protect", "protect myself", "disease", "infectious", "infection", "contagious", "spread", "immune", "immunity", "screening", "check up", "checkup", "symptoms", "early detection", "screening"],
    `**The basics that prevent the most disease**
- Wash hands with soap, especially after the toilet and before food.
- Drink safe water, and keep it in a clean covered container.
- Cook food thoroughly and eat it while it is hot.
- Use a latrine. Open defecation spreads disease to the whole community.
- Sleep under a treated net, and clear standing water.
- Vaccinate, on schedule, for you and your children.
- Keep children under 5 and pregnant people away from anyone with a fever or cough.
- Avoid sharing cups, towels, razors and toothbrushes.
- Cover coughs and sneezes, and stay home when you are unwell.
- Do not share needles, and never reuse them.

**Why the delay is dangerous**
The illnesses that kill most here — malaria, diarrhoea, pneumonia, TB, HIV complications and maternal complications — are most treatable early and most dangerous late. Early presentation is the single biggest factor you control.

**Check-ups**
Routine health checks can find high blood pressure, diabetes, anaemia and some cancers before there are any symptoms at all. Screening works precisely because these conditions are silent at first.

**Know the warning signs**
Learn them for the conditions common in your family and area, and act on them early rather than hoping they pass.`,
    [
      "A new or unusual symptom that is getting worse over days rather than settling",
      "A high fever that does not respond to rest and fluids",
      "Persistent coughing or diarrhoea for more than 3 weeks",
      "Any change in body shape, a lump, or a sore that will not heal for 3 weeks",
      "Unintentional weight loss or night sweats",
      "Bleeding that will not stop",
    ],
    ["When should I see a doctor?", "How do I stop the spread of germs?", "Why are vaccines important?"],
  ),

  /* ------------------------------- sexual and reproductive health */
  T(
    "contraception",
    "Contraception and family planning",
    "sexual and reproductive health",
    ["contraception", "contraceptive", "family planning", "birth control", "condom", "condoms", "pill", "pills", "pregnancy test", "pregnant", "spacing", "children", "family"],
    `**Spacing children protects everyone**
Spaceing births by at least 24–36 months gives a mother's body time to recover, and gives each child more nutrition, care and attention. It is one of the highest-impact health decisions a family can make.

**Options**
- **Short-term and reversible** — condoms, the contraceptive pill, injectables, implants, and emergency contraception. Condoms are the only option that also prevents sexually transmitted infections, so they work well alongside another method.
- **Long-acting** — the implant, an IUD, and sterilisation, for people who are confident they do not want more children.
- **Permanent** — for people who have decided their family is complete.

**What to know**
- Family planning services are available at government health centres.
- Many methods do not affect future fertility. Stopping most of them returns you to your previous ability to conceive.
- Some methods change bleeding patterns, especially periods. This is usually an effect, not a problem, but report anything that worries you.
- **Emergency contraception** works best the sooner you take it, and is available without needing to explain what happened. Ask a pharmacist or clinician. The copper IUD is the most effective emergency option.
- **Condoms protect against HIV and other infections.** This matters regardless of contraception.
- A method is only as good as the commitment to use it. Honest discussion with your partner is what makes contraception actually work.

**Never**
Do not use abortion pills bought informally or from unqualified people. Unsafe abortion is one of the biggest causes of maternal death, and most of those deaths are preventable. If you are pregnant and considering your options, talk to a trained clinician you can trust.`,
    [
      "Severe lower abdominal pain, with or without bleeding, in someone who might be pregnant",
      "Heavy bleeding, or fainting, with pregnancy or a missed period — a possible ectopic pregnancy, and an emergency",
      "Fever after an abortion or miscarriage, or pus or a bad smell from the vagina",
      "A pregnancy in which the woman is very unwell, or has a severe headache and blurred vision",
      "Any suspected complication of a contraceptive or an abortion",
    ],
    ["What are the danger signs in pregnancy?", "How do I know if I am pregnant?", "Where can I get tested?"],
  ),
  T(
    "sti",
    "Sexually transmitted infections",
    "sexual and reproductive health",
    ["sti", "stis", "std", "stds", "sexually transmitted", "infection", "discharge", "sores", "genitals", "itching", "burning urine", "painful urination", "vaginal", "penis", "herpes", "syphilis", "gonorrhoea", "gonorrhea", "chlamydia", "hepatitis b", "hepatitis c"],
    `**Common and treatable**
Chlamydia, gonorrhoea, trichomoniasis, syphilis, genital herpes and HIV are all treatable, and most are curable. None of them is a reason for shame — they are common infections spread by ordinary human behaviour, and clinics see them every day.

**What to watch for**
- Discharge from the vagina, penis or anus that is new or different
- Pain or burning when passing urine
- Sores, lumps, ulcers or blisters in the genital area
- Genital itching, or pain during sex
- Unusual vaginal bleeding, especially between periods or after sex
- Swollen glands in the groin
- Often there are **no symptoms at all** — which is why testing matters

**What to do**
- Get tested. Testing is quick, confidential at many facilities, and cheap or free at government health centres.
- Do not have sex while you are being treated, and your partner needs treatment too — otherwise it comes back.
- Complete the full course, exactly as prescribed.
- Get a partner notification service — clinics can help with this confidentially, and it works.

**Prevention**
Condoms reduce the risk of HIV and other infections substantially. Regular testing catches infections early, when they are easiest to treat and least harmful. Vaccination for hepatitis B is available and is part of routine immunisation in many places.

**A note on testing windows**
A very recent infection may not show on the first test. If you have had a possible exposure, ask when to retest, and do not assume a negative result is the final word.`,
    [
      "Severe lower abdominal pain or pelvic pain, with fever",
      "Fever during pregnancy, or with a suspected infection",
      "Testicular pain and swelling, or a sudden severe testicular pain",
      "Genital ulcers with fever — possible serious infection",
      "A rash with fever, or a sore that does not heal",
      "Any eye redness or joint pain after a sexually transmitted infection",
    ],
    ["How do I stop the spread of germs?", "Where can I get tested?", "How soon should I get tested after exposure?"],
  ),

  /* ------------------------------------------ using health services */
  T(
    "seeing-a-doctor",
    "When to see a doctor, and how to get care",
    "using health services",
    ["doctor", "see a doctor", "clinic", "hospital", "health centre", "health center", "health post", "poste de sante", "centre de sante", "nurse", "check up", "checkup", "appointment", "referral", "where do i go", "care"],
    `**Go and get checked if**
- Symptoms last more than a week and are not settling
- Symptoms are getting worse rather than better
- A child is not eating, not growing, or is unusually tired
- There is any sign of a warning sign listed on this page
- Something simply does not look right and you cannot explain it
- You need something that needs a prescription, a test, or a procedure
- You have a chronic condition and have stopped taking your medicines

**Do not wait to be sure.** Getting a second opinion costs far less than a complication.

**How the system usually works here**
A health post or health centre is the first stop for most problems. They can examine, test, treat and refer. A district hospital has more capacity, imaging and surgery. For anything urgent, go straight to a hospital.

**Practical steps that make care better**
- Bring the card, a list of your medicines, and any previous results.
- Write down when things started, what makes them better or worse, and anything you have already tried. This makes the consultation far more useful.
- Ask what your diagnosis is, what the treatment is for, what it should do, and what to watch for. It is your right to know, and asking makes you a safer patient.
- If you do not understand, ask the same question again in different words. Clinicians should explain.
- Ask for a prescription and a written note of what you were told.
- Follow up if you were told to. Improvement that stops after a course is not a cure.

**What you can do before you go**
Bring ID, a list of medicines, and take a photo of the medicine packets so the clinician can read the names and doses.`,
    [
      "Any danger sign listed anywhere on this page",
      "Symptoms that are getting worse over days",
      "A child who is not eating, not growing, or is unusually tired",
      "Symptoms lasting more than a week without settling",
      "A chronic condition that has stopped responding to treatment",
    ],
    ["Where can I get tested?", "How do I prepare for a hospital visit?", "What are the warning signs of dehydration?"],
  ),
  T(
    "health-literacy",
    "Reading health advice and spotting misinformation",
    "using health services",
    ["misinformation", "fake news", "rumour", "rumor", "myth", "myths", "is it true", "true or false", "trust", "reliable", "evidence", "research", "study", "home remedy", "traditional", "herbal", "herbs", "folk remedy", "cure", "miracle"],
    `**Good questions to ask of any health claim**
- Who studied this, and how many people?
- Was it a proper trial, or an opinion?
- Was it compared against something else? Things that are no better than doing nothing are not treatments.
- Has it been repeated by others?
- Who benefits? Claims of instant cures for chronic disease usually profit the seller, not the patient.

**Warning signs of misinformation**
It promises a total cure for a serious condition. It says everyone can be cured by one food or herb. It tells you to stop your prescribed medicine. It attacks anyone who disagrees. It sells a product. It is shared mostly as a forwarded message, without a source, and it tells you to keep it quiet to protect the secret.

**Traditional medicine**
Some traditional practices are harmless and comforting, and some are genuinely useful. The problem is not tradition — it is substitution. Stopping real treatment while relying on a remedy is how a manageable condition becomes fatal. Use traditional medicine alongside, not instead of, care, and tell your clinician what you are taking so nothing interacts badly. Avoid anything applied to an open wound that is not sterile.

**About herbs and remedies**
Some are powerful medicines. Others are contaminated, or contain undisclosed steroids that cause real harm over time. Products sold in unmarked containers carry the most risk.

**Trust these sources**
Your clinician. Government health campaigns. WHO and the Ministry of Health. Properly run public health research. Not a forwarded message.`,
    [
      "A remedy telling you to stop prescribed treatment — do not stop; speak to your clinician first",
      "A product or herb causing vomiting, rash, yellowing of the eyes, or unusual bleeding",
      "A wound being treated with an unsterile substance that is becoming infected",
      "A condition worsening while relying on a remedy instead of care",
      "Any reaction after taking an unregulated product",
    ],
    ["How do I take medicines safely?", "When should I see a doctor?", "How do I keep food safe?"],
  ),
];
