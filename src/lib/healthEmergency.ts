import { site } from "./site";

/* ==========================================================================
   Emergency triage
   ==========================================================================
   Runs BEFORE the language model, on every message, and is deliberately
   deterministic.

   Why it is not left to the model:
     - A model can be slow, rate-limited, filtered, or simply wrong.
     - Someone typing "my father collapsed and is not breathing" must never be
       answered with a paragraph about stroke prevention.
     - Crisis messages must get a fixed, non-negotiable response.

   Design notes:
     - Patterns are specific enough that ordinary questions do not trip them.
       "I have a headache" must not launch an emergency protocol.
     - Where a benign explanation is genuinely common - breathlessness in a
       panic attack is the clearest case - the response says so, rather than
       pretending the only explanation is a cardiac arrest.
     - No hotline numbers are invented here. The ones we do have live in
       site.emergency and must be verified before launch.
   -------------------------------------------------------------------------- */

export interface EmergencyRule {
  id: string;
  label: string;
  patterns: RegExp[];
  /** Panic is a genuine alternative reading for some symptoms. */
  mayBePanic?: boolean;
  reply: (ctx: { mayBePanic: boolean }) => string;
}

export interface EmergencyMatch {
  id: string;
  label: string;
  reply: string;
}

const AMBULANCE = (context = "an ambulance") =>
  `**Get help now: call ${site.emergency.ambulance} for ${context}.** If you cannot get through, or nobody can come, get to ${site.emergency.hospital} yourself and do not wait.`;

const STAY = "**Do not leave them alone**, and do not let them walk or drive. Stay with them until help has taken over.";

export const EMERGENCY_RULES: EmergencyRule[] = [
  /* ---------------------------------------------------- cardiac / breathing */
  {
    id: "cardiac-arrest",
    label: "Not breathing or unresponsive",
    patterns: [
      /\b(not|isn'?t|is not|stopped|has stopped|cannot|can'?t|unable to|is barely)\s+(breathing|breathe)\b/i,
      /\bnot responding\b/i,
      /\bunresponsive\b/i,
      /\bunconscious\b/i,
      /\bcardiac arrest\b/i,
      /\bheart (attack|stopped)\b/i,
      /\bblue lips\b/i,
      /\bgasping\b/i,
      /\bno pulse\b/i,
      /\bchest compressions\b/i,
    ],
    reply: () =>
      `**This is an emergency. Act now.**

${AMBULANCE()}

**If they are unresponsive and not breathing normally:**
1. Lay them on their back on a firm, flat surface.
2. Kneel beside the chest, put both hands in the centre of the chest.
3. Press hard and fast - about 100 to 120 times a minute, roughly two pushes a second, pressing about 5 cm deep on an adult.
4. Keep going until help takes over, or they start breathing normally.

If you are untrained, **do chest compressions only.** That is far better than doing nothing, and better than rescue breaths you are unsure about.

**If they are breathing normally**, turn them onto their side, keep watching their breathing, and stay with them.

${STAY}

If you are completely alone, put your phone on speaker so you can call while you work.`,
  },
  {
    id: "breathing-difficulty",
    label: "Difficulty breathing",
    mayBePanic: true,
    patterns: [
      /\b(can'?t|cannot|unable to|difficulty|trouble|struggling to|hard to)\s+(breathe|breathing)\b/i,
      /\bshort(ness)? of breath\b.{0,30}\b(worse|severe|at rest|getting worse|laying down)\b/i,
      /\bbreathless\b.{0,30}\b(at rest|lying|severe|worse|cannot)\b/i,
      /\bwheez(e|ing)\b.{0,30}\b(severe|bad|can'?t|cannot|worst)\b/i,
      /\bbreathing (is )?(fast|rapid)\b.{0,30}\b(and|with)\b.{0,25}\b(chest pain|fever|confusion|exhausted|drowsy)\b/i,
    ],
    reply: ({ mayBePanic }) =>
      `**${mayBePanic ? "This needs a clear decision - read both parts before deciding." : "This needs urgent medical care."}**

${AMBULANCE()}

**Sit the person upright.** Do not let them lie flat - it makes breathing harder. Loosen tight clothing and belts. Keep the room calm and get them to stop talking.

**While you wait:**
- If they have a prescribed reliever inhaler, help them use it now, as directed.
- Keep them still. Walking makes breathlessness worse.

**Signs it is serious:** blue or grey lips, tongue or fingertips; struggling to speak; drowsiness or confusion; ribs pulling in between breaths; no improvement after a reliever inhaler.
${
  mayBePanic
    ? `
**It might also be a panic attack.** A panic attack causes sudden breathlessness, tingling, a racing heart, and a fear of dying - frightening, but not dangerous. If they are young, otherwise well, and it passed within about half an hour, that may be what this is.

Still: if you are not sure, or there is any chest pain or any history of heart or lung disease, get them checked. Do not let uncertainty turn into delay.`
    : ""
}

${STAY}`,
  },
  {
    id: "chest-pain",
    label: "Chest pain",
    mayBePanic: true,
    patterns: [
      /\bchest (pain|pressure|tightness|crushing)\b/i,
      /\b(pain|pressure|tightness)\b.{0,20}\b(in|across|under)\b.{0,10}\b(my |his |her |the )?chest\b/i,
      /\bheart attack\b/i,
      /\bangina\b/i,
    ],
    reply: ({ mayBePanic }) =>
      `**Treat this as a heart attack until proven otherwise. This is the one symptom where you do not wait.**

${AMBULANCE()}

**While you wait:**
- **Sit them down and keep them still.** Do not let them walk around, and do not let them drive or go alone.
- Loosen tight clothing and help them relax. Anxiety and exertion both make it worse.
- If they have a prescribed heart medicine, help them take it as directed.
- **Do not** give anything to eat or drink.

**Note the time it started** and tell the ambulance crew - it genuinely changes what is done in hospital.
${
  mayBePanic
    ? `
**It might not be the heart.** Anxiety, muscle strain, reflux and chest infection can all cause chest pain, particularly in a young person. But you cannot tell the difference at home, and guessing wrong is fatal. If you are even slightly unsure, call.`
    : ""
}`,
  },
  {
    id: "stroke",
    label: "Possible stroke",
    patterns: [
      /\bstroke\b/i,
      /\b(facial droop|face droop|dropped face|face is sagging|face has dropped)\b/i,
      /\b(slurred speech|slurring (my |his |her |the )?words|speech (is )?slurred|can'?t speak|cannot speak|jumbled speech)\b/i,
      /\b(one side|one arm|one side of (my |his |her |the )?(body|face))\b.{0,30}\b(weak|weakness|numb|can'?t|unable|is weak)\b/i,
      /\b(numbness|weakness|paralysed|paralyzed)\b.{0,25}\b(left|right)\b.{0,20}\b(arm|leg|side|face|hand)\b/i,
      /\bsudden (loss of|loss of) (vision|sight)\b/i,
      /\bcurtain\b.{0,25}\bvision\b/i,
    ],
    reply: () =>
      `**Possible stroke. Time is the treatment - act now.**

${AMBULANCE()}

**Check FAST:**
- **F**ace - ask them to smile. Is one side of the face drooping?
- **A**rms - ask them to raise both arms. Does one drift downwards or feel weak?
- **S**peech - ask them to repeat a simple sentence. Is it slurred or garbled?
- **T**ime - note the exact time it started and tell the crew.

**While you wait:**
- Keep them sitting or lying with the head slightly raised and supported.
- Do not give food, drink or medication - swallowing may already be impaired, and it can go into the lungs.
- Do not let them walk or drive. One "walk it off" stroke becomes a permanent disability.
- Reassure them and stay with them. Many people recover fully when this is treated quickly.

**Do not dismiss it because it passed.** Symptoms that come and go are still a stroke warning, and often the biggest one.`,
  },

  /* ---------------------------------------------------- bleeding / burns */
  {
    id: "severe-bleeding",
    label: "Severe bleeding",
    patterns: [
      /\b(bleeding|bleeds|haemorrhage|hemorrhage|blood loss)\b.{0,30}\b(heavily|badly|severe|severely|a lot|soaking|won'?t stop|not stopping|spurting|non.?stop|endless)\b/i,
      /\b(spurting|spraying|flowing) blood\b/i,
      /\bwon'?t stop bleeding\b/i,
      /\b(stabbed|shot|gunshot|cut) (him|her|himself|herself|themselves)\b.{0,20}\b(arm|leg|neck|chest|abdomen|body)\b/i,
      /\bdeep cut\b/i,
    ],
    reply: () =>
      `**This is an emergency.**

${AMBULANCE()}

**Stop the bleeding first. It is the only thing that matters right now.**
1. Press **hard and directly** on the wound with a clean cloth, or the flat of your hand.
2. **Do not stop to look.** Keep the pressure on continuously.
3. If it soaks through, put **another cloth on top** and keep pressing. Never remove the first layer - lifting it pulls away the clot.
4. If no fracture is suspected, raise the limb above heart level.
5. Once bleeding slows, secure the dressing, but do not loosen it.

**Also:**
- Lay them down, keep them warm, and reassure them.
- Watch for pallor, cold skin, drowsiness or rapid breathing - that means significant blood loss.

**Note the time it started.** Do not remove anything embedded in the wound, and do not try to clean a deep wound yourself.

${STAY}`,
  },
  {
    id: "burns-severe",
    label: "Serious burn",
    patterns: [
      /\b(burn|burned|burnt|burning|scalded|scald)\b.{0,30}\b(face|hands|hand|feet|foot|huge|big|large|severe|deep|extensive|all over|whole body|chest|neck|chemical|electrical|electric)\b/i,
      /\b(electrical|electric|chemical)\s+burn\b/i,
      /\b(on fire|caught fire|set on fire|caught alight)\b/i,
      /\bsmoke (inhalation|in)\b/i,
    ],
    reply: () =>
      `**Serious burns are a medical emergency.**

${AMBULANCE()}

**Cool it now.** Hold the burn under cool running water for **20 minutes**, continuously, starting immediately. This is the single most effective thing a bystander does. Keep the rest of the person warm - cooling a large burn can chill them dangerously.

**Never** use ice, butter, toothpaste, oil, ash or herbs. Do not burst blisters. Do not peel off stuck clothing. Remove rings, watches and tight clothing **before** swelling starts.

After 20 minutes, cover loosely with a clean, non-fluffy dressing or cling film laid over rather than wrapped tight.

**Go straight to hospital** for any burn to the face, hands, feet, joints or genitals; anything larger than their palm; any electrical, chemical or smoke-inhalation burn; any burn on a child or an older person; and any burn that is white, charred, brown or numb. A painless burn is a deep burn.`,
  },
  {
    id: "anaphylaxis",
    label: "Severe allergic reaction",
    patterns: [
      /\banaphyla(c|tic|xis|xy)\b/i,
      /\ballergic reaction\b/i,
      /\b(swelling|swollen|tight|closing)\b.{0,30}\b(my |his |her |their |the )?(face|throat|tongue|lips|eyelid|eyelids|airway)\b/i,
      /\b(my |his |her |their |the )?(face|throat|tongue|lips)\b.{0,25}\bswoll(ing|en)\b/i,
      /\bswelling\b.{0,30}\b(after|ate|bit|sting|nut|peanut|food)\b/i,
    ],
    reply: () =>
      `**This can close an airway within minutes. Act immediately.**

${AMBULANCE()}

**Now:**
- If they have an **adrenaline auto-injector**, use it into the outer mid-thigh straight away. Use it even if you are unsure - it saves lives, and the risk of one dose is tiny. A second dose after 5 minutes is reasonable if symptoms persist.
- Sit them up if they are breathing. If they are struggling to breathe, let them lie down.
- If unconscious, turn them onto their side and clear the airway.
- Remove the trigger if you can - a sting, a food, a tight belt or necklace.
- Keep them calm and still.

**Do not** let them lie flat if they are struggling to breathe. Give nothing to eat or drink.

${STAY}

Tell the crew what they were exposed to and **when**. Even if they improve they still need to be observed, because reactions can come back.`,
  },
  {
    id: "poisoning",
    label: "Poisoning or overdose",
    patterns: [
      /\b(poison|poisoned|poisoning|overdose|overdosed)\b/i,
      /\bdrank (bleach|chemical|pesticide|insecticide|kerosene|detergent|oil)\b/i,
      /\bchemical (in|on|on his|on her|on my) (skin|eyes|face|hand|body|arm)\b/i,
      /\bchild (swallowed|ate|drank)\b/i,
      /\btook (too much|a whole|all of)\b.{0,20}\b(pills|tablets|medicine|medication|insulin)\b/i,
    ],
    reply: () =>
      `**Treat this as a poisoning emergency.**

${AMBULANCE()}

**Now:**
- **Do not make them vomit.** It causes burns and permanent damage on the way back up.
- Rinse the mouth with water. If it is on the skin or eyes, rinse with clean running water for at least 20 minutes, removing contaminated clothing as you rinse.
- **Find the container or packet and take it with you.** The label tells clinicians what matters, and it is the fastest route to the right treatment.
- If unconscious but breathing, turn them onto their side.
- If they are not breathing, start chest compressions and keep going.

**Know the exact time it happened and roughly how much was involved.** This is genuinely important and impossible to get afterwards.

**Try to reach someone who knows what they took** - a parent, partner, housemate or neighbour - but do not delay the ambulance call to find out.

${STAY}`,
  },

  {
    id: "self-harm",
    label: "Self-harm or suicide risk",
    patterns: [
      /\bsuicid(e|al)\b/i,
      /\bkill myself\b/i,
      /\bend my life\b/i,
      /\bhurt myself\b/i,
      /\bharm myself\b/i,
      /\bcut myself\b/i,
      /\bself.?harm(ing)?\b/i,
      /\boverdose\b/i,
      /\bdon'?t want to (live|be here)\b/i,
      /\bbetter off dead\b/i,
      /\bno reason to live\b/i,
      /\btook (all|the rest of) (my |the )?(pills|tablets)\b/i,
    ],
    reply: () =>
      `**You do not have to face this alone. I am glad you told me.**

**Please talk to a person now.** A counsellor is the right person for this, and you do not have to explain everything in order to start.

- **Immediate danger, or you have already acted:** call **${site.emergency.ambulance}** for an ambulance, or go to the nearest health centre now.
- **Safe for the moment, but you need to talk:** ask any health professional to refer you to a counselling service, and call **${site.emergency.police}** if you need someone to come to you.

**If you can, tell one person you trust exactly this:** "I am thinking about harming myself and I do not want to be alone right now." That one sentence is usually enough, and it is far easier for them to act on than "I am not okay."

**For now, please:**
- Put distance between yourself and anything you could use to harm yourself. Hand it to someone else, or put it in another room.
- Stay with someone. Do not be alone, even briefly.
- If you have already taken something, or cut yourself, say so now - that changes what needs to happen urgently, and it is treatable.

You reached out. That is the hardest part, and it means part of you wants this to stop. That is worth protecting.`,
  },
  {
    id: "seizure",
    label: "Seizure",
    patterns: [
      /\bseizure\b/i,
      /\bseizing\b/i,
      /\bconvulsion(s)?\b/i,
      /\bfitting\b/i,
      /\b(is|are|was|were) (shaking|jerking) (uncontrollably|violently|the whole time)\b/i,
      /\bfell down\b.{0,30}\b(arms? twitching|legs? twitching|foaming|unconscious|unresponsive|jerking)\b/i,
      /\bfoaming at the mouth\b/i,
      /\beyes rolled back\b/i,
    ],
    reply: () =>
      `**Stay calm. Most seizures stop on their own. Your job is to protect them and time it.**

**Now:**
1. **Clear the space.** Move hard furniture, hot drinks, sharp objects and cushions away.
2. **Do not restrain them** and do not put anything in their mouth. A person cannot swallow their tongue.
3. Turn them onto their side if possible - this is what matters most, because it keeps the airway clear and lets saliva drain.
4. Loosen tight clothing around the neck.
5. **Note the exact time it started.** Tell them what is happening calmly - they may be partly aware.
6. When the movements stop, roll them onto their side and stay.

**Call ${site.emergency.ambulance} now if:** it lasts **5 minutes or longer**; it repeats without them fully recovering; they are injured; it is their first seizure; they are pregnant, diabetic, or in water; or they are not recovering fully.

${STAY}

${AMBULANCE("an ambulance, or get to the nearest health centre")}

Afterwards, note how long it lasted, whether they recovered fully, and anything unusual they saw or smelled beforehand. That record is genuinely useful.`,
  },
  {
    id: "obstetric-emergency",
    label: "Pregnancy or childbirth emergency",
    patterns: [
      /\b(pregnant|pregnancy)\b.{0,30}\b(bleeding|haemorrhage|hemorrhage|paining|severe pain|faint|seizure|headache|vomiting blood)\b/i,
      /\bbleeding\b.{0,30}\b(pregnant|pregnancy|preg)\b/i,
      /\blost the baby\b/i,
      /\bmiscarriage\b/i,
      /\bheavy periods?\b.{0,30}\b(dizzy|faint|soaking|won'?t stop|not stopping)\b/i,
      /\b(miscarriage|abortion|stillbirth)\b/i,
      /\b(32|34|36|37|38|39|40)\b.{0,15}\bweeks?\b.{0,30}\b(bleeding|contractions|pain|fluid|waters? broke|moved less)\b/i,
      /\bperiods?\b.{0,25}\b(soaking|heavily)\b.{0,20}\b(a pad|tampon|an hour)\b/i,
    ],
    reply: () =>
      `**This needs a maternity unit now. Please go, and call on the way if you can.**

${AMBULANCE()}

**Go to hospital immediately if you are pregnant and have any of:**
- **Vaginal bleeding** - any amount. Especially bright red, or with pain.
- **Regular painful contractions, or cramping that does not ease.**
- **Water breaking** - especially if the fluid is green or brown, or if the baby has not reached term.
- **A severe or persistent headache, or vision changes** - this can be pre-eclampsia, and it is one of the leading causes of maternal death. The danger is the seizure that follows.
- **Seizures, fainting, or vomiting blood.**
- **The baby moving much less than usual, or not at all.**
- **Feeling very unwell** in a way you cannot explain.

**While you travel:**
- Lie down, on your left side if you can. Do not lie flat on your back - it reduces blood flow to the baby.
- Note **how much** bleeding, and pad with a clean towel. Take used pads with you so the team can estimate blood loss.
- **Do not** insert anything into the vagina, including tampons, to "stop" bleeding.
- Do not eat or drink if surgery might be needed.
- If you feel faint, lie down and call for help rather than trying to walk it off.

**Do not wait to see if it settles.** The serious complications get worse with delay, and most of them are treatable.`,
  },
  {
    id: "severe-dehydration",
    label: "Severe dehydration",
    patterns: [
      /\b(dehydrated|dehydration|not passing urine|no urine|not weeing|cannot urinate|can'?t urinate)\b/i,
      /\b(not passing|hasn'?t passed) (any )?(urine|water|pee)\b/i,
      /\b(no urine|zero urine) for\b/i,
      /\b(12|18|24) hours?\b.{0,25}\b(urinat|wee|urine|water)\b/i,
      /\bsunken (eyes|fontanelle|fontanel)\b/i,
      /\bsunken eyes\b/i,
      /\bvery drowsy\b.{0,30}\b(diarrh?oea|vomit|diarrhea)\b/i,
    ],
    reply: () =>
      `**This is a medical emergency. Go to the clinic or hospital now.**

${AMBULANCE()}

**The signs that mean "now", not "later":**
- No urine for 8 hours or more, or very dark urine
- Sunken eyes, sunken soft spot on a baby's head, or no tears when crying
- **Lips, mouth and tongue are dry, and the skin stays stretched when you pinch it**
- Very drowsy, floppy, or hard to wake
- Faint, racing pulse, cold hands and feet
- Blood in diarrhoea or vomit, or diarrhoea that keeps up with everything they drink
- Diarrhoea lasting over 2 days in a child, or any diarrhoea in a newborn

**A child under 5 goes faster than you expect.** A child who is limp, has dry lips, or stops crying is seriously unwell even if they look alert.

**Give oral rehydration solution (ORS) - or your pharmacy's sachet mixed exactly as directed - if they can swallow, in small sips after each loose stool.** But do not delay going in to drink it. A severely dehydrated person needs fluids through a drip, not by mouth.

**Do not** give strong sugary drinks, alcohol, or plain tea. If the child can drink, breastfeed more often and for longer, including at night. Do not stop breastfeeding because of the diarrhoea.

${STAY}`,
  },
  {
    id: "head-injury",
    label: "Head injury",
    patterns: [
      /\b(hit|knocked|banged) (my |his |her |their |the )?head\b/i,
      /\bhead (injury|injur|trauma|traumatised|traumatized)\b/i,
      /\bconcussion\b/i,
      /\bfell (off|from|off a) (a |the |that )?(bike|bicycle|stairs|roof|tree|wall|ladder|horse|bed|motorcycle|matatu)\b/i,
      /\bknocked (out|unconscious|off)\b/i,
    ],
    reply: () =>
      `**Head injuries can hide serious bleeding inside the skull, hours later. When in doubt, get checked.**

**Go to a clinic or hospital today - not in a week - if they:**
- Lost consciousness, even briefly, even "only for a second"
- Are vomiting, or feel sick
- Are confused, unusually sleepy, or hard to wake
- Have a severe or worsening headache
- Have a seizure
- Have a weak or numb arm or leg, slurred speech, or unequal pupils
- Have fluid or blood leaking from the nose or ear
- Bounced back and got worse again after appearing fine
- Bled from the scalp and it did not stop within 10 minutes of firm pressure

**If they are unconscious but breathing, treat as a possible neck injury:**
- Place them on their side
- Do not straighten the neck or turn them over
- Leave a gap between the head and the ground, and loosen the neck

**Watch them for 24-48 hours, including overnight** - that is when delayed brain bleeding shows up. Wake them every few hours to check they respond. The adults around you should take turns, not one tired person.

**Go straight in if the injury came from a fall off a roof, tree, ladder, or into water, or there was a moment of "going blank"** - those carry a much higher risk and you cannot safely manage them at home.

They are not safe to drive, cycle, work, or drink alcohol until a clinician has cleared them.`,
  },
  {
    id: "diabetic-emergency",
    label: "Diabetic emergency",
    patterns: [
      /\bdiabet\w*\b.{0,30}\b(unconscious|passed out|fitting|seizure|coma|confused|cannot walk|can'?t walk|vomiting|collapsed|not responding)\b/i,
      /\b(confused|unconscious|passed out|seizure|collapsed)\b.{0,30}\bdiabet\w*\b/i,
      /\b(blood sugar|glucose|insulin|sugar level)\b.{0,30}\b(critically low|critically high|very low|very high|way (up|down)|collapsed|passed out)\b/i,
      /\b(very|extremely) high blood sugar\b/i,
      /\b(very|extremely) low blood sugar\b/i,
      /\bdiabetic (and|with).{0,30}\b(collapsed|confused|vomiting|unconscious|unresponsive|seizure)\b/i,
    ],
    reply: () =>
      `**A diabetic who is confused, drowsy, fitting or unconscious is a medical emergency.**

${AMBULANCE()}

**Act now, in this order:**
1. **Check for sugar.** If they are conscious enough to swallow, give **glucose tablets, sweet juice, or sugary soda immediately.** If there is sugar at all, use it. Do not wait to test.
2. **If not fully awake, do NOT put anything in their mouth** - it will go into the lungs.
3. If they have **glucagon** (a diabetic emergency kit) and you have been shown how to use it, give it, ideally into the outer thigh.
4. Re-check and re-give the sugar every 10-15 minutes until they are fully alert.
5. If blood sugar is very high, there is no sugar at home that fixes it - this needs a drip and treatment in hospital. Still give fluids if fully awake.

**Why this matters:** when blood sugar is very high, the body breaks down fat for energy, which makes the blood acidic. The person's breath turns **deep, heavy and fruity**, and they may breathe fast. That pattern plus a diabetic who is drowsy and passing a lot of urine means **ketoacidosis**, which kills within hours without treatment.

**Give them their normal insulin or tablets if they are due for them** - and still go to hospital. Stabilising sugar is not the same as being safe, and this pattern can kill despite a normal reading.

${STAY}`,
  },
  {
    id: "severe-abdominal",
    label: "Severe abdominal pain",
    patterns: [
      /\b(severe|terrible|excruciating|unbearable|worst) (belly|abdominal|tummy|stomach|abdominal) pain\b/i,
      /\b(agonising|agonizing)\b.{0,20}\b(abdomen|belly|stomach|tummy)\b/i,
      /\b(stomach|belly|abdomen|abdominal)\b.{0,25}\b(going|went) (rigid|hard|board|stone)\b/i,
      /\bappendix\b.{0,20}\b(pain|inflamed|ruptured|burst)\b/i,
      /\b(appendicitis|perforated ulcer|bowel obstruction|twisted bowel|testicular torsion|ectopic pregnancy)\b/i,
      /\b(4|5|6|7|8) days?\b.{0,20}\b(haven'?t|hasn'?t) (eaten|passed|pooped|bowel)\b/i,
      /\bvomit(ing)? blood\b/i,
      /\bthrowing up blood\b/i,
      /\bblack tarry stool/i,
      /\b(black|tarry) (stool|bowel movement)s?\b/i,
    ],
    reply: () =>
      `**Severe abdominal pain needs a surgeon, not a guess. Go now.**

${AMBULANCE()}

**This is a genuine emergency when:**
- The belly has gone **rigid, hard, or board-like** - that suggests perforation or obstruction
- **Vomiting blood**, or black, tarry, sticky stools
- It has lasted **4 to 5 days with no bowel movement or passing wind**
- The pain is sudden and severe and then suddenly **spreads to the whole belly**
- There is a swollen, tender or bruising lower belly, or a testicle that is swollen and very tender (6 hours is a deadline)
- Fever, vomiting, and an inability to pass wind or stool together
- Any possibility of pregnancy, with pain and bleeding

**While you travel:**
- **Do not eat or drink.** A surgeon or anaesthetist may need to operate, and a full stomach is dangerous under anaesthesia.
- Do not take laxatives, "wind" or pain medicines that can hide or worsen the problem, and do not use traditional preparations before being examined.
- Lie down in whatever position is most comfortable, usually on the side with the knees bent.
- Note when the pain started, whether it moved anywhere, and when you last ate.

**Do not wait for the pain to settle.** A perforated ulcer or a twisted testicle loses the chance of a simple fix with every hour.`,
  },
  {
    id: "eye-injury",
    label: "Eye injury or chemical exposure",
    patterns: [
      /\b(chemical|acid|alkali|bleach|ammonia)\b.{0,25}\b(eye|eyes|in (my|his|her|their) (eye|eyes))\b/i,
      /\bin (my|his|her|their) (eye|eyes)\b.{0,25}\b(chemical|bleach|acid|ammonia|thrown|splashed|spilled)\b/i,
      /\b(eye|eyes)\b.{0,25}\b(poked|penetrated|scratched|cut|stabbed|cut by|glass|metal|wire|rust)\b/i,
      /\bcannot see\b.{0,25}\b(any light|light at all|in one eye|out of)\b/i,
      /\blost (my |his |her |their )?sight\b.{0,20}\b(after|suddenly)\b/i,
      /\beyes (are|were|feel|feel) (burst|popped|sticking out)\b/i,
      /\bburn(ing|ed) (my |his |her |their )?eyes\b.{0,25}\b(chem|acid|bleach|ammonia|on fire)\b/i,
    ],
    reply: () =>
      `**An eye injury can cost sight in hours. Act immediately.**

${AMBULANCE("an ambulance, or go to the nearest hospital with an eye service")}

**Chemical in the eye - the single most time-critical:**
- **Rinse continuously with clean cool running water for 20 to 30 minutes.** Tilt the head so water runs away from the good eye.
- Do not neutralise it with anything. Water, and only water, for a full 20 minutes.
- Then get to hospital for a check. Alkali burns can keep destroying tissue well after the pain fades.

**Physical injury - object in the eye, or cut:**
- **Do not rub, press, or try to remove anything stuck in the eye.**
- Do not put drops, ointment or traditional remedies in it.
- Cover the eye loosely with a clean pad or a rigid shield - a paper cup taped over the eye works, so it cannot be pressed on. Do not pad both eyes.
- Keep them still and get them in fast.

**No vision at all, or a shadow in the field of vision**, after a blow or a chemical, needs assessment today even if it clears.

**Do not let anyone drive.** Vision can change while you travel.`,
  },
  {
    id: "meningitis",
    label: "Rash that does not fade",
    patterns: [
      /\b(meningitis|meningeal)\b/i,
      /\brash\b.{0,50}\b(did ?n'?t|does ?n'?t|not|won'?t|no |fails? to)\s*(fade|disappear|blanch|go away|clear)\b/i,
      /\b(pinpoint|purple|non.?blanching|red|does not fade|won'?t fade|fever)\s*rash\b/i,
      /\b(fever|headache|neck pain|stiff neck|photophobia|light hurts)\b.{0,40}\brash\b/i,
      /\b(stiff neck|neck stiffness|neck pain)\b.{0,30}\b(fever|headache|vomit|confus)\b/i,
      /\bfever\b.{0,30}\b(confused|confusion|very drowsy|hard to wake|unconscious|fitting|seizure)\b/i,
      /\b(infant|baby|newborn|neonate|child)\b.{0,30}\b(fever|hot to touch|warm|drowsy|floppy|not feeding|refusing to feed|won'?t feed)\b/i,
      /\bcherry (red )?spots?\b/i,
    ],
    reply: () =>
      `**If this is meningitis or sepsis, you have hours, not days. Go to hospital now.**

${AMBULANCE()}

**Meningitis signs - fever plus any of:**
- A **headache that is severe and worse than any previous**, often with light hurting the eyes
- A **stiff neck** - they cannot touch their chin to their chest
- Confusion, unusual drowsiness, or a seizure
- A rash that **does not fade** when you press a clear glass against it. A rash of red or purple pinpricks that does not blanch is a medical emergency in itself
- Vomiting, sometimes refusing to look at bright light

**In a baby or small child this is the more dangerous form, and the signs are less obvious. Go in immediately if a baby has:**
- Fever, or a hot body, **or a noticeably cold body**
- **Refusing feeds**, or feeding poorly, or unusual drowsiness, floppy or hard to wake
- Refusing to smile, or a strange cry
- A bulging soft spot on the head, or a very tense one
- Fast breathing

**Do not wait for a rash.** The rash often appears late, and the absence of one does not rule it out.

**Do not wait for the morning, and do not try traditional treatment first.** Give fluids if they can swallow, keep them cool and still, and travel now.

**Note any antibiotics they have already taken** - the team needs to know, and a full course changes the approach.`,
  },
  {
    id: "sickle-cell-crisis",
    label: "Sickle-cell crisis",
    patterns: [
      /\bsickle.?cell\b.{0,30}\b(crisis|attack|pain|episode|admission|episode of pain)\b/i,
      /\b(crisis|attack|episode)\b.{0,20}\bsickle.?cell\b/i,
      /\bsickle.?cell\b.{0,30}\b(cannot|can'?t|unable to) (walk|stand|eat|breathe)\b/i,
      /\bsickle.?cell\b.{0,30}\b(severe|excruciating|unbearable|worse than)\b/i,
      /\b(dactylitis|hand.?foot syndrome)\b/i,
    ],
    reply: () =>
      `**A sickle-cell crisis is a medical emergency. Go to hospital now.**

${AMBULANCE()}

**Do not wait this out at home.** Untreated, a crisis can cause chest syndrome, stroke, or damage to the spleen or kidneys. A crisis that does not settle with the measures below still needs to go in.

**This is especially urgent in children**, and a small child who is unusually quiet, clingy, or refusing to walk may be in crisis even if they are not crying - pain in infants shows as withdrawal.

**While you travel:**
- Give **extra fluids** - more than usual, in small sips, and keep drinking. Dehydration makes everything worse. If you have ORS, use it.
- Give the **pain medicine they were prescribed, exactly as directed, and on time.** Pain relief given early and on schedule is far more effective than waiting until the pain is severe. This is what a pain plan is for - use it, do not ration it.
- Keep them warm, resting, and calm.
- Get someone to come with you, and travel by the fastest means available.

**Tell the team** how long the pain has lasted, where it is, whether they have taken their usual medicines, and any history of breathing problems, jaundice, or previous admissions. That shapes their treatment.`,
  },
];

/** Order matters: the first match wins, so life-threatening conditions are listed before milder ones. */
export const EMERGENCY_CHECK_ORDER = EMERGENCY_RULES.map((r) => r.id);

export function detectEmergency(input: string): EmergencyMatch | null {
  const text = input.toLowerCase();

  for (const rule of EMERGENCY_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      return {
        id: rule.id,
        label: rule.label,
        reply: rule.reply({ mayBePanic: Boolean(rule.mayBePanic) }),
      };
    }
  }

  return null;
}
