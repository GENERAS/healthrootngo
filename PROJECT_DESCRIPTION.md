# Health Root NGO — Project Description

*(Written so it can be copy-pasted into an email, proposal, report, grant application, or social post. No coding knowledge needed.)*

---

## 1. Short version (2–3 sentences)

**Health Root NGO** is a youth-led nonprofit organisation based in Kigali, Rwanda, that works to improve health awareness, youth leadership, and community development. This project is the organisation's official website — a modern, fast, and mobile-friendly site that tells the public who we are, what we do, and how to help. Visitors can read about our programmes, see photos of our work, donate money, sign up as a volunteer, contact the team, and ask questions of an automatic health assistant.

---

## 2. Medium version (one short paragraph)

Health Root NGO is a community-based organisation in Kigali, Rwanda, dedicated to the idea that *healthy young people build a healthy community*. The organisation runs three main programmes: health education and awareness, youth leadership and empowerment, and sanitation and environmental protection. This project is the website we built to support that mission. It is a fast, modern, mobile-friendly site that introduces the organisation, explains its programmes and projects, reports on measurable impact, introduces the seven-member leadership team, publishes field stories, and showcases a gallery of 47 photographs from our work. The site also makes it easy for supporters to take action: they can make a donation (by international card or Mobile Money), get in touch with the team, or simply chat with an AI-powered health assistant that answers common health questions in plain language. The site is built with Next.js and TypeScript, loads quickly even on slow connections, is fully accessible to people with disabilities, and is optimised for search engines so that people searching for health education in Rwanda can find us.

---

## 3. Long version (full description, for proposals and reports)

### 3.1 About the organisation

**Name:** Health Root NGO
**Motto:** *Healthy Young People Build a Healthy Community*
**Location:** Kigali, Rwanda
**Founded:** 2023
**Registration:** NGO Reg. No. RW/2023/NGO/0417
**Contact:** info@healthrootngo.org · +250 780 676 289 · WhatsApp +250 788 372 210
**Website:** https://healthrootngo.org

Health Root NGO is a youth-led, community-based organisation whose mission is to build a healthier, educated, responsible and empowered community in which young people actively contribute to health and social development. Rather than delivering programmes *to* young people, the organisation is designed so that young people *lead* them — informed, confident young people being the fastest route to a healthier, stronger community.

**Vision.** To build a healthier, educated, responsible and empowered community where young people actively contribute to positive health and social development.

**Mission.** To advance health education and awareness, youth empowerment and leadership, disease prevention and healthy living, and community participation in health activities.

**Core values:** Integrity, Respect, Teamwork, Innovation, Community Service, Equality.

### 3.2 Our three programmes

1. **Health Education & Awareness** — school hygiene programmes, nutrition and balanced diet, mental health awareness, and disease prevention.
2. **Youth Leadership & Empowerment** — leadership academies, public speaking coaching, peer-to-peer education, and mentorship from professionals.
3. **Sanitation & Environment** — monthly sanitation days, tree planting initiatives, waste segregation training, and green space restoration.

Six concrete projects run under these programmes: School Health Outreach, Community Sanitation Day, Youth Mentorship Programme, Tree Planting Initiative, Nutrition Workshop, and Drug & Substance Abuse Prevention.

### 3.3 Our impact to date

| Measure | Result |
|---|---|
| Young people reached | 10,000+ |
| Schools & communities engaged | 40+ |
| Active volunteers | 120+ |
| Districts engaged | 18 |
| Students reached in partner school hygiene work | 2,400+ |
| Youth leaders trained | 86 |
| Peer mental-health facilitators trained | 34 |

Our 2026 target is to reach 20,000 young people and establish active clean-up groups in 30 districts. We measure this through pre- and post-programme surveys, attendance data, and quarterly field inspections carried out by our Chief Inspector.

### 3.4 What the website does

The website is the public face of the organisation. It has **eight main pages plus a 404 page**:

- **Home** — a bold opening statement, key numbers, who we are, our six objectives, our latest activities, and clear ways to get involved.
- **About** — our story, vision and mission, a four-step timeline of how we grew (2023 → 2026), our core values, and a snapshot of where we stand today.
- **What We Do** — our three programmes in detail, plus all six projects with their current status (ongoing or completed).
- **Our Impact** — measurable results, four real stories of change, a testimonial from a programme graduate, our targets, and how we hold ourselves accountable.
- **Team** — our seven leaders (President & Founder, Executive Director, Vice President, Executive Secretary, Treasurer, Chief Inspector, and Community Influencer), each with a portrait and short biography, plus direct phone and email links.
- **Stories** — a blog of field stories and news on hygiene, leadership, environmental clean-ups, mental health, tree planting, and nutrition.
- **Gallery** — 47 photographs from our work, filterable into five categories (Health Education, Youth & Leadership, Sanitation & Environment, Community Outreach, Our Team), viewable full-screen with zoom, swipe, download, and keyboard navigation.
- **Contact** — our address, phone, email and WhatsApp, office hours (Monday to Friday, 08:00–17:00 CAT), a validated contact form, an embedded map, and answers to frequently asked questions.

**Ways to take action from the site:**

- **Donate** — a dedicated donation page with preset amounts ($10 / $25 / $50 / $100 / $250) or a custom amount, five selectable currencies (USD, RWF, EUR, GBP, KES), a choice of one-off or monthly giving, and two payment paths: international card (Visa, Mastercard, American Express) or Mobile Money (MTN MoMo, Airtel Money). Every pledge receives a reference number and a confirmation email.
- **Get in touch** — a contact form that validates entries and delivers messages to our inbox.
- **Stay informed** — a newsletter sign-up in the footer.
- **Ask a question** — a floating AI health assistant available on every page (see below).

### 3.5 The health assistant (AI chatbot)

One of the more distinctive features of the site is a built-in "Health Root Assistant" — a chat bubble in the corner of every page. It is designed to answer two kinds of question: questions about our organisation (what we do, how to donate, how to volunteer, how to contact us) and general health questions (fever, malaria, diarrhoea, mental health, nutrition, hygiene, vaccinations, family planning, and more), in plain, reassuring language.

It is built with strict safety rules:

- **Emergencies are detected first, automatically.** If someone describes a symptom that could be life-threatening — chest pain, not breathing, stroke signs, severe bleeding, burns, poisoning, seizures, diabetic emergencies — the assistant immediately stops the normal conversation and tells them to call **1122** for an ambulance, along with what to do in the meantime.
- **It never gives medical instructions.** It is forbidden from diagnosing conditions, prescribing medicines or dosages, interpreting test results, or offering false reassurance. It reminds users that it is health *education*, not medical *care*, and that nobody should change treatment based on what it says.
- **It never asks for money or secrets.** It will not process payments, request card numbers or Mobile Money PINs, or discuss anything about the site's internal security.
- **It works even without an internet connection to the AI provider.** If the AI service is unavailable, the assistant falls back to a built-in offline library of answers, so a visitor is never left with a dead chat box.
- **It is rate-limited** to protect the service from abuse.

Alongside it, the site also ships an offline health-information library of **40 practical health articles** across 10 categories, and an emergency triage system of 18 life-safety rules — both clearly marked in the source code as requiring review by a qualified clinician before final publication.

### 3.6 How it is built (technical summary, for donors, partners, or IT reviewers)

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router) — the modern React framework, which produces a fast website that also works as a mobile app |
| Language | TypeScript (strict mode) — catches errors before the site goes live |
| UI library | React 19 |
| Animations | Framer Motion (scroll reveals, page transitions) |
| Icons | Lucide React (hand-inlined brand social icons) |
| Styling | A custom design system (one structured stylesheet of ~1,900 lines) plus Bootstrap 4 grid and layout utilities |
| Fonts | Plus Jakarta Sans (body and headings) and Newsreader (editorial accents) |
| Colour palette | Deep navy (`#0a2540`, `#04101f`), amber (`#e8963c`), teal (`#0d8478`), on white and off-white |
| Image handling | Next.js image optimisation with automatic resizing, lazy loading, and modern formats |
| Backend | Three lightweight server endpoints — contact, donation, and chat — each with validation and abuse rate-limiting |
| Third-party services | Google Gemini (AI assistant), Resend (email delivery), and optional hosted payment checkout — all optional, with safe offline fallbacks |
| Deployment target | Any Node.js host or modern hosting platform |

**Notable quality characteristics:**

- **Fast.** Pages are static-generated where possible, images are optimised, and the site is built to load well on the mobile networks common in Rwanda.
- **Accessible.** Built to WCAG-oriented standards: skip-to-content link, full keyboard support, visible focus outlines, screen-reader labels on every control, and a full focus trap in the image viewer. It also respects the visitor's "reduce motion" system setting.
- **Search-engine optimised.** Each page has its own title and description, the site generates a sitemap and robots file automatically, and it embeds structured organisation data so Google can display our details correctly.
- **Safe and honest.** Donation amounts are never silently charged while the site is still being configured — a visitor sees a clear notice that a pledge has been recorded and a secure payment link will follow. The contact form refuses to pretend success if email delivery is not configured, and instead offers phone and WhatsApp alternatives. Any attempt to submit raw card numbers or PINs through the donation endpoint is rejected outright.
- **Well documented.** The source code is written with explanatory notes explaining *why* decisions were made, so future developers can maintain it confidently.

### 3.7 Project status and next steps

**Ready as-is:** full site content and design, all eight pages, the gallery, the contact form, the AI assistant with its offline fallback, SEO and accessibility foundations, and the donation flow up to pledge recording.

**Before public launch:**

1. **Clinical review** of the 40 health articles and the emergency contact numbers, by a qualified health professional, against Rwanda's Ministry of Health and other official sources. *(This is flagged in the code itself.)*
2. **Connect a live payment provider** so donations can be completed and settled.
3. **Connect a mailing-list provider** for the newsletter sign-up.
4. **Review and proofread** all copy, names, and statistics for accuracy.

### 3.8 Project history note

This site replaces an earlier static version of the same website that was built on a generic charity template. That old version still exists in the project folder for reference only and is not part of the live site. The current site was designed and developed by **NeoScratch (NeoScratch Software Company)** for Health Root NGO — https://www.neoscratch.com — founded by Theogene Iradukunda.

---

## 4. One-paragraph version (for social media or a report summary)

Health Root NGO is a youth-led organisation in Kigali, Rwanda, working on health education, youth empowerment, and sanitation and environmental protection, on the belief that healthy young people build healthy communities. This project is our official website: a modern, fast, accessible, mobile-friendly site that introduces the organisation, explains its three programmes and six projects, reports on real impact (10,000+ young people reached, 120+ active volunteers, 18 districts), introduces our seven leaders, publishes field stories, and displays 47 photographs of our work. It also lets supporters donate (card or Mobile Money), get in touch, and ask questions of a safety-first AI health assistant that detects emergencies automatically and never gives medical instructions. Built with Next.js and TypeScript and optimised for both search engines and low-bandwidth connections, the site is designed to turn awareness into action.
