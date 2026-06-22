export type WatchListing = {
  id: string;
  title: string;
  marketplace: "ebay" | "etsy" | "chrono24" | "other";
  price: number;
  shipping: number;
  totalCost: number;
  condition: "working" | "untested" | "broken";
  imageUrl: string;
  listingUrl: string;
  description: string;
};

const brandLogos: Record<string, string> = {
  Seiko: "/logos/seiko.png",
  Casio: "/logos/casio.png",
  Timex: "/logos/timex.png",
  Citizen: "/logos/citizen.png",
  Orient: "/logos/orient.png",
  Fossil: "/logos/fossil.png",
  Swatch: "/logos/swatch.png",
};

const brands = [
  "Seiko",
  "Casio",
  "Timex",
  "Citizen",
  "Orient",
  "Fossil",
  "Swatch",
] as const;

const styles = [
  "Vintage",
  "Field",
  "Dress",
  "Digital",
  "Sport",
  "Chronograph",
  "Dive",
] as const;

const marketplaces = ["ebay", "etsy", "chrono24", "other"] as const;

const conditions = ["working", "untested", "broken"] as const;

const GENERATED_MIN = 275;
const GENERATED_MAX = 400;

const baseItems: WatchListing[] = [
  {
    id: "1",
    title: "Seiko 5 Automatic Day-Date Silver Dial",
    marketplace: "ebay",
    price: 48,
    shipping: 6,
    totalCost: 54,
    condition: "working",
    imageUrl: brandLogos.Seiko,
    listingUrl: "#",
    description: "Classic Seiko 5 automatic with stainless steel case.",
  },
  {
    id: "2",
    title: "Casio Vintage Digital A158W",
    marketplace: "etsy",
    price: 22,
    shipping: 5,
    totalCost: 27,
    condition: "working",
    imageUrl: brandLogos.Casio,
    listingUrl: "#",
    description: "Iconic Casio digital watch with stainless bracelet.",
  },
  {
    id: "3",
    title: "Timex Ironman Triathlon 90s Edition",
    marketplace: "ebay",
    price: 18,
    shipping: 4,
    totalCost: 22,
    condition: "working",
    imageUrl: brandLogos.Timex,
    listingUrl: "#",
    description: "Vintage sports watch with chronograph features.",
  },
  {
    id: "4",
    title: "Citizen Eco-Drive Titanium Field Watch",
    marketplace: "chrono24",
    price: 95,
    shipping: 10,
    totalCost: 105,
    condition: "working",
    imageUrl: brandLogos.Citizen,
    listingUrl: "#",
    description: "Solar-powered titanium field watch.",
  },
  {
    id: "5",
    title: "Vintage Orient Bambino Dress Watch",
    marketplace: "ebay",
    price: 60,
    shipping: 8,
    totalCost: 68,
    condition: "working",
    imageUrl: brandLogos.Orient,
    listingUrl: "#",
    description: "Elegant automatic dress watch with domed crystal.",
  },
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockListings(count: number): WatchListing[] {
  return Array.from({ length: count }, (_, i) => {
    const brand = brands[i % brands.length];
    const style = styles[i % styles.length];
    const marketplace = marketplaces[i % marketplaces.length];
    const condition = conditions[i % conditions.length];

    const price = Math.floor(Math.random() * 120) + 10;
    const shipping = Math.floor(Math.random() * 15) + 3;

    return {
      id: String(i + 6),
      title: `${brand} ${style} Watch Model ${100 + i}`,
      marketplace,
      price,
      shipping,
      totalCost: price + shipping,
      condition,
      imageUrl: brandLogos[brand],
      listingUrl: "#",
      description: `${style} style watch from ${brand} with classic design.`,
    };
  });
}

export function createMockListings(): WatchListing[] {
  const generatedCount = randomInt(GENERATED_MIN, GENERATED_MAX);
  return [...baseItems, ...generateMockListings(generatedCount)];
}
