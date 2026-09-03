export type ResearchItem = {
  id: string;
  category: ResearchCategory;
  title: string;
  summary: string;
  authors: string;
  publication: string;
  year: string;
  source: string;
  url?: string;
  /** True until a verified citation is added. Never present placeholders as real. */
  placeholder: boolean;
  planets?: string[];
};

export type ResearchCategory =
  | "Planetary Science"
  | "Astrophysics"
  | "Space Exploration"
  | "Exoplanets"
  | "Cosmology";

export const researchCategories: ResearchCategory[] = [
  "Planetary Science",
  "Astrophysics",
  "Space Exploration",
  "Exoplanets",
  "Cosmology",
];

/**
 * Placeholder entries. Every item is marked `placeholder: true` and carries no
 * fabricated citation — titles describe a topic, not a real paper. Replace an
 * entry with a verified reference and set `placeholder: false`.
 */
export const research: ResearchItem[] = [
  {
    id: "ps-1",
    category: "Planetary Science",
    title: "Water in the history of Mars",
    summary:
      "Placeholder entry for a review of geological and orbital evidence for ancient surface water on Mars.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
    planets: ["mars"],
  },
  {
    id: "ps-2",
    category: "Planetary Science",
    title: "The greenhouse climate of Venus",
    summary:
      "Placeholder entry for research on the radiative balance and cloud chemistry of the Venusian atmosphere.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
    planets: ["venus"],
  },
  {
    id: "se-1",
    category: "Space Exploration",
    title: "Robotic exploration of the outer solar system",
    summary:
      "Placeholder entry for a survey of mission architectures used to reach and study the giant planets.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
    planets: ["jupiter", "saturn", "uranus", "neptune"],
  },
  {
    id: "ap-1",
    category: "Astrophysics",
    title: "Magnetospheres of the giant planets",
    summary:
      "Placeholder entry for work on planetary magnetic fields and their interaction with the solar wind.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
    planets: ["jupiter", "saturn"],
  },
  {
    id: "ex-1",
    category: "Exoplanets",
    title: "Comparing our solar system with planetary systems elsewhere",
    summary:
      "Placeholder entry for research comparing solar system architecture with detected exoplanet populations.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
  },
  {
    id: "co-1",
    category: "Cosmology",
    title: "Formation of the protoplanetary disk",
    summary:
      "Placeholder entry for models describing how the solar nebula collapsed into the Sun and planets.",
    authors: "—",
    publication: "—",
    year: "—",
    source: "Awaiting verified citation",
    placeholder: true,
  },
];

export const researchForPlanet = (slug: string) =>
  research.filter((r) => r.planets?.includes(slug));
