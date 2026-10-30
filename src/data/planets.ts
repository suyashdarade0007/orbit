export type Fact = { label: string; value: string };

export type Planet = {
  slug: string;
  name: string;
  epithet: string;
  type: string;
  intro: string;
  description: string;
  distance: string;
  diameter: string;
  orbitalPeriod: string;
  temperature: string;
  moons: string;
  facts: string[];
  sections: { title: string; body: string }[];
  /** Visual parameters for the 3D scene (not to scale). */
  visual: {
    radius: number;
    orbit: number;
    speed: number;
    spin: number;
    colors: [string, string, string];
    bands: number;
    rings?: boolean;
    tilt?: number;
  };
};

export const planets: Planet[] = [
  {
    slug: "mercury",
    name: "Mercury",
    epithet: "The Swift Planet",
    type: "Terrestrial",
    intro:
      "The smallest planet in the solar system and the closest to the Sun, Mercury is a cratered world of extremes.",
    description:
      "A rocky, airless world whose surface records billions of years of impacts.",
    distance: "57.9 million km from the Sun",
    diameter: "4,879 km",
    orbitalPeriod: "88 Earth days",
    temperature: "−173 °C to 427 °C",
    moons: "None",
    facts: [
      "A single day on Mercury lasts about 176 Earth days.",
      "Its year is shorter than any other planet's - 88 Earth days.",
      "Despite being closest to the Sun, it is not the hottest planet.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Mercury has only a tenuous exosphere of atoms blasted from its surface by the solar wind and micrometeoroids.",
      },
      {
        title: "Surface",
        body: "Heavily cratered terrain, broad smooth plains and long cliffs called scarps formed as the planet's interior cooled and contracted.",
      },
      {
        title: "Climate",
        body: "With almost no atmosphere to retain heat, temperatures swing by hundreds of degrees between day and night.",
      },
      {
        title: "Exploration",
        body: "Visited by Mariner 10 and MESSENGER; the ESA/JAXA BepiColombo mission is en route to orbit the planet.",
      },
    ],
    visual: {
      radius: 0.38,
      orbit: 7,
      speed: 0.48,
      spin: 0.05,
      colors: ["#8c8279", "#6b625b", "#a89f95"],
      bands: 3,
    },
  },
  {
    slug: "venus",
    name: "Venus",
    epithet: "The Veiled World",
    type: "Terrestrial",
    intro:
      "Similar to Earth in size, Venus is wrapped in a dense carbon dioxide atmosphere that makes it the hottest planet.",
    description:
      "A cloud-covered world with crushing surface pressure and a runaway greenhouse climate.",
    distance: "108.2 million km from the Sun",
    diameter: "12,104 km",
    orbitalPeriod: "225 Earth days",
    temperature: "About 465 °C at the surface",
    moons: "None",
    facts: [
      "Venus rotates in the opposite direction to most planets.",
      "Its surface pressure is roughly 90 times that of Earth.",
      "Clouds of sulfuric acid reflect sunlight, making it very bright in our sky.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Over 96% carbon dioxide, with thick sulfuric acid clouds that hide the surface from view at visible wavelengths.",
      },
      {
        title: "Surface",
        body: "Volcanic plains, highland regions and comparatively few impact craters, suggesting a relatively young surface.",
      },
      {
        title: "Climate",
        body: "A runaway greenhouse effect keeps surface temperatures high enough to melt lead, day and night alike.",
      },
      {
        title: "Exploration",
        body: "Studied by the Venera landers, Magellan's radar mapping and, more recently, orbital missions such as Venus Express and Akatsuki.",
      },
    ],
    visual: {
      radius: 0.6,
      orbit: 9.5,
      speed: 0.35,
      spin: -0.02,
      colors: ["#d8b678", "#b8905a", "#efd9a8"],
      bands: 6,
    },
  },
  {
    slug: "earth",
    name: "Earth",
    epithet: "Home",
    type: "Terrestrial",
    intro:
      "The only world known to host life, with liquid water oceans, a protective atmosphere and an active climate system.",
    description: "Our home planet - an ocean world with a dynamic atmosphere.",
    distance: "149.6 million km from the Sun",
    diameter: "12,742 km",
    orbitalPeriod: "365.25 days",
    temperature: "Average about 15 °C",
    moons: "1 - the Moon",
    facts: [
      "About 71% of Earth's surface is covered by water.",
      "Earth's magnetic field shields the surface from much of the solar wind.",
      "The Moon slowly recedes from Earth by a few centimetres each year.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Mostly nitrogen and oxygen, with trace gases that regulate temperature and shield the surface from ultraviolet light.",
      },
      {
        title: "Surface",
        body: "Continents and ocean basins reshaped continuously by plate tectonics, erosion and volcanism.",
      },
      {
        title: "Climate",
        body: "Oceans and atmosphere move heat around the globe, producing the seasons, weather systems and long-term climate.",
      },
      {
        title: "Moons",
        body: "The Moon stabilises Earth's axial tilt and drives the ocean tides.",
      },
    ],
    visual: {
      radius: 0.64,
      orbit: 12.5,
      speed: 0.29,
      spin: 0.22,
      colors: ["#25507e", "#1a3a63", "#5c8f6a"],
      bands: 7,
      tilt: 0.41,
    },
  },
  {
    slug: "mars",
    name: "Mars",
    epithet: "The Red Planet",
    type: "Terrestrial",
    intro:
      "A cold desert world of iron-rich dust, ancient river valleys and the tallest volcano in the solar system.",
    description:
      "A dusty, cratered planet that once had flowing water on its surface.",
    distance: "227.9 million km from the Sun",
    diameter: "6,779 km",
    orbitalPeriod: "687 Earth days",
    temperature: "−140 °C to 20 °C",
    moons: "2 - Phobos and Deimos",
    facts: [
      "Olympus Mons is the largest volcano in the solar system.",
      "Valles Marineris stretches for thousands of kilometres.",
      "Mars has seasons, polar ice caps and planet-wide dust storms.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "A thin atmosphere of mostly carbon dioxide, less than 1% the pressure of Earth's at sea level.",
      },
      {
        title: "Surface",
        body: "Iron oxide dust gives the planet its colour; channels and deltas record water that flowed billions of years ago.",
      },
      {
        title: "Climate",
        body: "Cold and dry, with seasonal frost, thin clouds and dust storms that can circle the whole planet.",
      },
      {
        title: "Exploration",
        body: "Explored by orbiters, landers and rovers including Viking, Spirit, Opportunity, Curiosity and Perseverance.",
      },
    ],
    visual: {
      radius: 0.5,
      orbit: 15.5,
      speed: 0.24,
      spin: 0.2,
      colors: ["#b4522f", "#8e3d24", "#d98a5f"],
      bands: 5,
      tilt: 0.44,
    },
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    epithet: "The Giant",
    type: "Gas giant",
    intro:
      "The largest planet in the solar system, a banded gas giant with a storm that has raged for centuries.",
    description: "A vast world of hydrogen and helium with dozens of moons.",
    distance: "778.5 million km from the Sun",
    diameter: "139,820 km",
    orbitalPeriod: "11.9 Earth years",
    temperature: "About −145 °C at the cloud tops",
    moons: "95 confirmed",
    facts: [
      "Jupiter is more massive than all the other planets combined.",
      "The Great Red Spot is a storm wider than Earth.",
      "Its moon Europa likely hides an ocean beneath an icy shell.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Hydrogen and helium arranged in fast-moving bands of rising and sinking cloud, with powerful jet streams.",
      },
      {
        title: "Surface",
        body: "No solid surface - pressure and temperature increase with depth until hydrogen behaves like a liquid metal.",
      },
      {
        title: "Moons",
        body: "The four Galilean moons - Io, Europa, Ganymede and Callisto - are worlds in their own right.",
      },
      {
        title: "Exploration",
        body: "Studied by Pioneer, Voyager, Galileo and Juno, with icy-moon missions JUICE and Europa Clipper on the way.",
      },
    ],
    visual: {
      radius: 1.5,
      orbit: 21,
      speed: 0.13,
      spin: 0.5,
      colors: ["#cbab86", "#9b7a5b", "#e6d3b4"],
      bands: 14,
    },
  },
  {
    slug: "saturn",
    name: "Saturn",
    epithet: "The Ringed World",
    type: "Gas giant",
    intro:
      "Famous for its bright ring system of ice and rock, Saturn is the least dense planet in the solar system.",
    description: "A pale gas giant encircled by billions of icy particles.",
    distance: "1.43 billion km from the Sun",
    diameter: "116,460 km",
    orbitalPeriod: "29.4 Earth years",
    temperature: "About −178 °C at the cloud tops",
    moons: "146 confirmed",
    facts: [
      "Saturn's average density is lower than that of water.",
      "Its rings are made mostly of water ice.",
      "Titan has a thick atmosphere and lakes of liquid methane.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Hydrogen and helium with softer banding than Jupiter, and a persistent hexagonal jet stream at the north pole.",
      },
      {
        title: "Rings",
        body: "A broad, thin system of ice and dust particles ranging from grains to boulders, shepherded by small moons.",
      },
      {
        title: "Moons",
        body: "Titan and Enceladus are prime targets in the search for habitable environments beyond Earth.",
      },
      {
        title: "Exploration",
        body: "The Cassini–Huygens mission orbited Saturn for thirteen years and landed a probe on Titan.",
      },
    ],
    visual: {
      radius: 1.25,
      orbit: 27,
      speed: 0.09,
      spin: 0.45,
      colors: ["#d9c191", "#b9a072", "#f0e2c2"],
      bands: 10,
      rings: true,
      tilt: 0.47,
    },
  },
  {
    slug: "uranus",
    name: "Uranus",
    epithet: "The Tilted Giant",
    type: "Ice giant",
    intro:
      "An ice giant that rotates on its side, giving it the most extreme seasons in the solar system.",
    description: "A cold, featureless blue-green world tipped nearly 98°.",
    distance: "2.87 billion km from the Sun",
    diameter: "50,724 km",
    orbitalPeriod: "84 Earth years",
    temperature: "About −195 °C",
    moons: "28 confirmed",
    facts: [
      "Uranus is tipped almost completely onto its side.",
      "Each pole spends roughly 42 years in sunlight, then 42 in darkness.",
      "Methane in its atmosphere gives the planet its blue-green colour.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Hydrogen, helium and methane, with faint cloud bands that are difficult to see in visible light.",
      },
      {
        title: "Interior",
        body: "A hot, dense fluid of water, methane and ammonia ices surrounds a small rocky core.",
      },
      {
        title: "Moons",
        body: "Named after literary characters, including Miranda, Ariel, Umbriel, Titania and Oberon.",
      },
      {
        title: "Exploration",
        body: "Visited once, by Voyager 2 in 1986; a dedicated orbiter has been recommended by planetary scientists.",
      },
    ],
    visual: {
      radius: 0.95,
      orbit: 32,
      speed: 0.06,
      spin: 0.3,
      colors: ["#8fc4cd", "#6ea6b3", "#bfe2e6"],
      bands: 6,
      tilt: 1.7,
    },
  },
  {
    slug: "neptune",
    name: "Neptune",
    epithet: "The Distant Blue",
    type: "Ice giant",
    intro:
      "The most distant major planet, home to supersonic winds and a deep blue atmosphere.",
    description: "A remote ice giant with the fastest winds ever measured.",
    distance: "4.5 billion km from the Sun",
    diameter: "49,244 km",
    orbitalPeriod: "165 Earth years",
    temperature: "About −200 °C",
    moons: "16 confirmed",
    facts: [
      "Neptune was located through mathematical prediction before being observed.",
      "Winds there can exceed 2,000 km/h.",
      "Its moon Triton orbits backwards and may be a captured object.",
    ],
    sections: [
      {
        title: "Atmosphere",
        body: "Hydrogen, helium and methane, with bright cloud streaks and dark storm systems that come and go.",
      },
      {
        title: "Interior",
        body: "A dense mixture of water, ammonia and methane ices above a rocky core, radiating more heat than it receives.",
      },
      {
        title: "Moons",
        body: "Triton is geologically active, with nitrogen plumes erupting from its icy surface.",
      },
      {
        title: "Exploration",
        body: "Voyager 2 remains the only spacecraft to have flown past Neptune, in 1989.",
      },
    ],
    visual: {
      radius: 0.92,
      orbit: 37,
      speed: 0.05,
      spin: 0.32,
      colors: ["#3b5fc0", "#2a4796", "#7f9ee0"],
      bands: 6,
      tilt: 0.49,
    },
  },
];

export const getPlanet = (slug: string) => planets.find((p) => p.slug === slug);
