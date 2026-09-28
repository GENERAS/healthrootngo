export const site = {
  name: "Health Root NGO",
  shortName: "Health Root",
  tagline: "Healthy Young People Build a Healthy Community",
  description:
    "Health Root NGO is a youth-centered organization in Kigali, Rwanda, promoting health education, youth empowerment, sanitation, and community development.",
  url: "https://healthrootngo.org",
  locale: "en",
  email: "info@healthrootngo.org",
  phone: "+250 780 676 289",
  phoneHref: "tel:+250780676289",
  whatsapp: "+250 788 372 210",
  whatsappHref: "https://wa.me/250788372210",
  address: {
    street: "Kigali, Rwanda",
    city: "Kigali",
    country: "RW",
    countryName: "Rwanda",
    // Approximate centre for Kigali, used for the map embed
    lat: -1.9441,
    lng: 30.0619,
  },
  founded: 2023,
  registration: "NGO Reg. No. RW/2023/NGO/0417",

  /* ------------------------------------------------------------------
     Emergency and care-seeking information.
     Single source of truth for the chatbot, the contact page and the
     health knowledge base.

     !! VERIFY BEFORE LAUNCH !!
     These numbers came from general knowledge, not from an authoritative
     source. Confirm each one against MINECOFIN / Ministry of Health /
     Rwanda Police before publishing. They are isolated in this one block
     precisely so a correction is a single edit.
     ------------------------------------------------------------------ */
  emergency: {
    ambulance: "1122",
    police: "112",
    fire: "116",
    /** tel: links, so the whole strip is one tap on mobile. */
    ambulanceHref: "tel:1122",
    policeHref: "tel:112",
    fireHref: "tel:116",
    /** Shown whenever the assistant needs a real clinician. */
    guidance:
      "Go to your nearest health centre (centre de santé), health post (poste de santé), or a clinic. In Kigali you can also use a pharmacy for minor advice only.",
    /** Highest point of escalation for anything urgent. */
    hospital: "Kigali hospital, or any district hospital with an emergency ward",
  },

  socials: [
    { label: "Facebook", href: "https://facebook.com/healthrootngo", icon: "facebook" as const },
    { label: "X", href: "https://x.com/healthrootngo", icon: "twitter" as const },
    { label: "Instagram", href: "https://instagram.com/healthrootngo", icon: "instagram" as const },
    { label: "LinkedIn", href: "https://linkedin.com/company/healthrootngo", icon: "linkedin" as const },
  ],
} as const;

/**
 * Brand asset paths.
 *
 * Single source of truth for every reference to the logo, so a file move is
 * one edit rather than a hunt. The React tree does not read these: it inlines
 * the geometry from `brand.ts` via the <Logo> component, because `currentColor`
 * only resolves inside inline SVG. These paths are for the cases that need a
 * real URL: metadata, structured data, and downloadable/print artwork.
 */
export const brandAssets = {
  /** Square mark. Inline SVG in the UI; this path is for external use. */
  mark: "/brand/mark.svg",
  /** Square mark, raster. Used for structured data and press kits. */
  markPng: "/brand/mark-512.png",
  /** "Health Root" as outlined paths, one colour, no font dependency. */
  wordmark: "/brand/wordmark.svg",
  /** Mark + wordmark on one line. For partner pages, email, print. */
  lockup: "/brand/lockup-horizontal.svg",
  /** 1200x630 social card. */
  ogCard: "/brand/og-card.png",
} as const;

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "What We Do", href: "/what-we-do" },
  { name: "Our Impact", href: "/our-impact" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
  { name: "Stories", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;

export const programs = [
  {
    num: "01",
    slug: "health-education",
    title: "Health Education & Awareness",
    short: "Health Education",
    icon: "heart-pulse" as const,
    desc: "Large-scale campaigns on personal hygiene, nutrition, reproductive health, mental wellness and disease prevention — delivered in schools, churches and community halls.",
    points: ["School hygiene programmes", "Nutrition & balanced diet", "Mental health awareness", "Disease prevention"],
  },
  {
    num: "02",
    slug: "youth-empowerment",
    title: "Youth Leadership & Empowerment",
    short: "Youth Empowerment",
    icon: "users" as const,
    desc: "Structured training that turns young people into confident leaders — public speaking, project management, teamwork and community organising.",
    points: ["Leadership academies", "Public speaking coaching", "Peer-to-peer education", "Mentorship from professionals"],
  },
  {
    num: "03",
    slug: "sanitation-environment",
    title: "Sanitation & Environment",
    short: "Sanitation",
    icon: "leaf" as const,
    desc: "Community clean-up drives, waste-management education and tree planting to build healthier, greener neighbourhoods that last.",
    points: ["Monthly sanitation days", "Tree planting initiatives", "Waste segregation training", "Green space restoration"],
  },
] as const;

export const projects = [
  {
    img: "/images/wed7.jpg",
    title: "School Health Outreach",
    desc: "Teaching students in Kigali schools about personal hygiene, nutrition and mental wellness.",
    status: "ongoing" as const,
    category: "health" as const,
  },
  {
    img: "/images/ga6.jpg",
    title: "Community Sanitation Day",
    desc: "Monthly clean-up activities that turn neighbourhoods into shared, accountable spaces.",
    status: "ongoing" as const,
    category: "sanitation" as const,
  },
  {
    img: "/images/ga8.jpg",
    title: "Youth Mentorship Programme",
    desc: "A six-month training track for young leaders in community health development.",
    status: "ongoing" as const,
    category: "youth" as const,
  },
  {
    img: "/images/ga11.jpg",
    title: "Tree Planting Initiative",
    desc: "Restoring local greenery and building climate awareness among young people.",
    status: "completed" as const,
    category: "environment" as const,
  },
  {
    img: "/images/ga3.jpg",
    title: "Nutrition Workshop",
    desc: "Teaching families about balanced diets and sustainable local food sources.",
    status: "completed" as const,
    category: "health" as const,
  },
  {
    img: "/images/ga12.jpg",
    title: "Drug & Substance Abuse Prevention",
    desc: "Peer-led awareness campaigns helping young people resist substance abuse.",
    status: "ongoing" as const,
    category: "youth" as const,
  },
] as const;

export const team = [
  {
    name: "Asante Serge",
    role: "President & Founder",
    image: "/images/optimized/president.jpg",
    bio: "Founded Health Root NGO to give young Rwandans the platform and skills to lead change in their own communities.",
  },
  {
    name: "Habumugisha Elie",
    role: "Executive Director",
    image: "/images/optimized/professor.jpg",
    bio: "Provides strategic direction and academic guidance across every youth-driven health initiative we run.",
  },
  {
    name: "Ntwali Samuel",
    role: "Vice President",
    image: "/images/optimized/vice presdent.jpg",
    bio: "Leads project development and stakeholder partnerships, keeping community programmes on track.",
  },
  {
    name: "Irasubiza Manzi Hubert",
    role: "Executive Secretary",
    image: "/images/optimized/secretary.jpg",
    bio: "Manages administration, communications and logistics for all major organisational activities.",
  },
  {
    name: "Harerimana Zidane",
    role: "Treasurer",
    image: "/images/optimized/ni treasurer AN.harerimana zidane.jpg",
    bio: "Oversees budgeting, financial reporting and resource accountability to our donors and partners.",
  },
  {
    name: "Jean Paul Mugisha",
    role: "Chief Inspector",
    image: "/images/optimized/inspector.jpg",
    bio: "Audits field activities to uphold quality standards, compliance and measurable impact.",
  },
  {
    name: "Nzeyimana Prince",
    role: "Community Influencer",
    image: "/images/optimized/nzeyimana prince.jpg",
    bio: "Drives youth engagement and raises awareness for campaigns through social media and community media.",
  },
] as const;

export const coreValues = [
  { title: "Integrity", desc: "We work honestly, responsibly and transparently — with donors, partners and the communities we serve.", icon: "shield" as const },
  { title: "Respect", desc: "We respect every person regardless of age, gender, background or ability.", icon: "handshake" as const },
  { title: "Teamwork", desc: "Collaboration between youth, volunteers and partners is what makes the work last.", icon: "users" as const },
  { title: "Innovation", desc: "We test new, practical approaches to stubborn community health problems.", icon: "sparkles" as const },
  { title: "Community Service", desc: "We are committed to measurable improvement in community wellbeing.", icon: "heart" as const },
  { title: "Equality", desc: "Everyone deserves access to health information and support — nobody is left out.", icon: "scale" as const },
] as const;

export const impactStats = [
  { value: "10,000+", label: "Young people reached" },
  { value: "40+", label: "Schools & communities" },
  { value: "120+", label: "Active volunteers" },
  { value: "18", label: "Districts engaged" },
] as const;
