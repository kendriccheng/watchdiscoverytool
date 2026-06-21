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
      description: "Classic Seiko 5 automatic with stainless steel case."
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
      description: "Iconic Casio digital watch with stainless bracelet."
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
      description: "Vintage sports watch with chronograph features."
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
      description: "Solar-powered titanium field watch."
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
      description: "Elegant automatic dress watch with domed crystal."
    }
  ];
  
  const generatedItems: WatchListing[] = Array.from({ length: 260 }).map((_, i) => {
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
    
    const marketplaces = [
      "ebay",
      "etsy",
      "chrono24",
      "other",
    ] as const;
    
    const conditions = [
      "working",
      "untested",
      "broken",
    ] as const;
  
    const brand = brands[i % brands.length] as (typeof brands)[number];
    const style = styles[i % styles.length] as (typeof styles)[number];
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
      imageUrl: brandLogos[brand], // ← use logo instead of placeholder
      listingUrl: "#",
      description: `${style} style watch from ${brand} with classic design.`
    };
  });
  
  export const mockListings: WatchListing[] = [
    ...baseItems,
    ...generatedItems
  ];