export type GalleryCategory =
  | "Health Education"
  | "Youth & Leadership"
  | "Sanitation & Environment"
  | "Community Outreach"
  | "Our Team";

export interface GalleryImage {
  /** Public path to the (already-optimised) asset */
  src: string;
  /** Native intrinsic size — lets the viewer render at true resolution */
  width: number;
  height: number;
  title: string;
  alt: string;
  category: GalleryCategory;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Health Education",
  "Youth & Leadership",
  "Sanitation & Environment",
  "Community Outreach",
  "Our Team",
];

/**
 * Every photograph we hold, in the order it should read.
 * `width` / `height` are the true intrinsic pixel dimensions of the source file
 * so the lightbox can report real resolution and avoid upscaling artefacts.
 */
export const galleryImages: GalleryImage[] = [
  // ---- Health Education -------------------------------------------------
  {
    src: "/images/optimized/event1.jpg",
    width: 2000,
    height: 1500,
    title: "Health awareness campaign",
    alt: "Health Root NGO volunteers running a health awareness session",
    category: "Health Education",
  },
  {
    src: "/images/wed1.jpg",
    width: 736,
    height: 490,
    title: "Personal hygiene teaching",
    alt: "Young volunteers demonstrating personal hygiene practices",
    category: "Health Education",
  },
  {
    src: "/images/ga1.jpg",
    width: 704,
    height: 552,
    title: "Nutrition education in schools",
    alt: "Students taking part in a nutrition education session",
    category: "Health Education",
  },
  {
    src: "/images/ga2.jpg",
    width: 704,
    height: 552,
    title: "Disease prevention workshop",
    alt: "Workshop on disease prevention for community members",
    category: "Health Education",
  },
  {
    src: "/images/ga3.jpg",
    width: 704,
    height: 552,
    title: "Nutrition workshop for families",
    alt: "Families learning about balanced diets at a nutrition workshop",
    category: "Health Education",
  },
  {
    src: "/images/ga4.jpg",
    width: 736,
    height: 570,
    title: "Mental wellness session",
    alt: "Facilitator leading a mental wellness session for young people",
    category: "Health Education",
  },
  {
    src: "/images/wed2.jpg",
    width: 736,
    height: 490,
    title: "Handwashing demonstration",
    alt: "Demonstration of correct handwashing technique",
    category: "Health Education",
  },
  {
    src: "/images/wed3.jpg",
    width: 736,
    height: 490,
    title: "School health outreach",
    alt: "Health education outreach delivered in a partner school",
    category: "Health Education",
  },
  {
    src: "/images/wed4.jpg",
    width: 736,
    height: 490,
    title: "Community health talk",
    alt: "Community members gathered for a health awareness talk",
    category: "Health Education",
  },
  {
    src: "/images/wed7.jpg",
    width: 735,
    height: 490,
    title: "Hygiene kit distribution",
    alt: "Hygiene supplies being distributed to students",
    category: "Health Education",
  },

  // ---- Youth & Leadership ------------------------------------------------
  {
    src: "/images/optimized/event2.jpg",
    width: 2000,
    height: 1500,
    title: "Youth leadership summit",
    alt: "Young leaders gathered at a Health Root NGO leadership summit",
    category: "Youth & Leadership",
  },
  {
    src: "/images/ga8.jpg",
    width: 736,
    height: 573,
    title: "Leadership training in progress",
    alt: "Young people taking part in leadership and public-speaking training",
    category: "Youth & Leadership",
  },
  {
    src: "/images/ga5.jpg",
    width: 702,
    height: 552,
    title: "Public speaking coaching",
    alt: "A participant practising public speaking during a coaching session",
    category: "Youth & Leadership",
  },
  {
    src: "/images/ga7.jpg",
    width: 704,
    height: 552,
    title: "Mentorship group session",
    alt: "Mentors working with a group of young participants",
    category: "Youth & Leadership",
  },
  {
    src: "/images/wed6.jpg",
    width: 736,
    height: 490,
    title: "Peer-to-peer education training",
    alt: "Young facilitators training to become peer educators",
    category: "Youth & Leadership",
  },
  {
    src: "/images/ga12.jpg",
    width: 736,
    height: 579,
    title: "Drug abuse prevention campaign",
    alt: "Awareness campaign against drug and substance abuse",
    category: "Youth & Leadership",
  },
  {
    src: "/images/wed8.jpg",
    width: 690,
    height: 460,
    title: "Youth volunteer briefing",
    alt: "Young volunteers receiving a briefing before an outreach",
    category: "Youth & Leadership",
  },

  // ---- Sanitation & Environment -----------------------------------------
  {
    src: "/images/ga6.jpg",
    width: 704,
    height: 552,
    title: "Community sanitation day",
    alt: "Volunteers taking part in a monthly community clean-up",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/ga11.jpg",
    width: 703,
    height: 552,
    title: "Tree planting initiative",
    alt: "Young volunteers planting trees to restore local greenery",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/optimized/event3.jpg",
    width: 1600,
    height: 1200,
    title: "Clean-up drive in progress",
    alt: "Large-scale community clean-up and waste collection drive",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/optimized/event4.jpg",
    width: 1200,
    height: 1600,
    title: "Green space restoration",
    alt: "Restoration of a community green space",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/optimized/event5.jpg",
    width: 1600,
    height: 1200,
    title: "Environmental awareness walk",
    alt: "Community environmental awareness campaign",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/shelter.jpeg",
    width: 736,
    height: 414,
    title: "Shelter support",
    alt: "Support work around community shelter accommodation",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/gal.jpeg",
    width: 705,
    height: 552,
    title: "Waste segregation training",
    alt: "Training community members on waste segregation",
    category: "Sanitation & Environment",
  },
  {
    src: "/images/gal2.jpeg",
    width: 705,
    height: 552,
    title: "Neighbourhood clean-up",
    alt: "Residents joining a neighbourhood clean-up activity",
    category: "Sanitation & Environment",
  },

  // ---- Community Outreach -------------------------------------------------
  {
    src: "/images/Malawi children.jpg",
    width: 704,
    height: 550,
    title: "Children in Malawi",
    alt: "Children reached by an outreach and health education programme in Malawi",
    category: "Community Outreach",
  },
  {
    src: "/images/Operation Christmas Child in Madagascar_.jpg",
    width: 648,
    height: 431,
    title: "Operation Christmas Child, Madagascar",
    alt: "Children taking part in Operation Christmas Child in Madagascar",
    category: "Community Outreach",
  },
  {
    src: "/images/hungryfam.jpeg",
    width: 735,
    height: 489,
    title: "Food security outreach",
    alt: "Families reached through a food security and nutrition outreach",
    category: "Community Outreach",
  },
  {
    src: "/images/home1.jpg",
    width: 736,
    height: 736,
    title: "Community health visit",
    alt: "A community health visit by the Health Root NGO team",
    category: "Community Outreach",
  },
  {
    src: "/images/gal3.jpg",
    width: 705,
    height: 552,
    title: "School visit",
    alt: "Team visiting a partner school for health education",
    category: "Community Outreach",
  },
  {
    src: "/images/dav.jpg",
    width: 670,
    height: 446,
    title: "Outreach in action",
    alt: "Health Root NGO volunteers during a community outreach",
    category: "Community Outreach",
  },
  {
    src: "/images/img_7.jpg",
    width: 800,
    height: 533,
    title: "Field team at work",
    alt: "Field team delivering a community activity",
    category: "Community Outreach",
  },
  {
    src: "/images/about1.jpg",
    width: 735,
    height: 490,
    title: "Our community",
    alt: "Members of the community we serve",
    category: "Community Outreach",
  },
  {
    src: "/images/hom1.jpg",
    width: 735,
    height: 490,
    title: "Working together",
    alt: "Team members collaborating on a community project",
    category: "Community Outreach",
  },

  // ---- Our Team ----------------------------------------------------------
  {
    src: "/images/optimized/all.jpg",
    width: 960,
    height: 720,
    title: "The full Health Root team",
    alt: "Group photograph of the Health Root NGO team",
    category: "Our Team",
  },
  {
    src: "/images/optimized/work.jpg",
    width: 960,
    height: 720,
    title: "Team working session",
    alt: "Health Root NGO team during a working session",
    category: "Our Team",
  },
  {
    src: "/images/optimized/president.jpg",
    width: 960,
    height: 848,
    title: "Asante Serge, President & Founder",
    alt: "Portrait of Asante Serge, President and Founder",
    category: "Our Team",
  },
  {
    src: "/images/optimized/professor.jpg",
    width: 1086,
    height: 1448,
    title: "Habumugisha Elie, Executive Director",
    alt: "Portrait of Habumugisha Elie, Executive Director",
    category: "Our Team",
  },
  {
    src: "/images/optimized/vice presdent.jpg",
    width: 720,
    height: 960,
    title: "Ntwali Samuel, Vice President",
    alt: "Portrait of Ntwali Samuel, Vice President",
    category: "Our Team",
  },
  {
    src: "/images/optimized/secretary.jpg",
    width: 718,
    height: 960,
    title: "Irasubiza Manzi Hubert, Executive Secretary",
    alt: "Portrait of Irasubiza Manzi Hubert, Executive Secretary",
    category: "Our Team",
  },
  {
    src: "/images/optimized/ni treasurer AN.harerimana zidane.jpg",
    width: 960,
    height: 960,
    title: "Harerimana Zidane, Treasurer",
    alt: "Portrait of Harerimana Zidane, Treasurer",
    category: "Our Team",
  },
  {
    src: "/images/optimized/inspector.jpg",
    width: 540,
    height: 960,
    title: "Jean Paul Mugisha, Chief Inspector",
    alt: "Portrait of Jean Paul Mugisha, Chief Inspector",
    category: "Our Team",
  },
  {
    src: "/images/optimized/nzeyimana prince.jpg",
    width: 720,
    height: 960,
    title: "Nzeyimana Prince, Community Influencer",
    alt: "Portrait of Nzeyimana Prince, Community Influencer",
    category: "Our Team",
  },
  {
    src: "/images/found1.jpeg",
    width: 400,
    height: 600,
    title: "Leadership portrait",
    alt: "Portrait of a Health Root NGO leader",
    category: "Our Team",
  },
  {
    src: "/images/found2.jpeg",
    width: 736,
    height: 1106,
    title: "Leadership portrait",
    alt: "Portrait of a Health Root NGO leader",
    category: "Our Team",
  },
  {
    src: "/images/found4.jpeg",
    width: 736,
    height: 1070,
    title: "Leadership portrait",
    alt: "Portrait of a Health Root NGO leader",
    category: "Our Team",
  },
  {
    src: "/images/found5.jpeg",
    width: 572,
    height: 858,
    title: "Leadership portrait",
    alt: "Portrait of a Health Root NGO leader",
    category: "Our Team",
  },
];

export function galleryByCategory(category: GalleryCategory | "All"): GalleryImage[] {
  if (category === "All") return galleryImages;
  return galleryImages.filter((img) => img.category === category);
}

export function categoryCount(category: GalleryCategory | "All"): number {
  return galleryByCategory(category).length;
}
