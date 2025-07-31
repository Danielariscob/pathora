// js/getRecommendations.js

export async function getRecommendations(filters) {
    console.log("Received filters:", filters);
  
    // Simulated logic: you can replace this with actual Firestore or API calls
    const dummyPlaces = [
      {
        name: "Green Café",
        image: "/img/greencafe.jpg",
        description: "A cozy vegan-friendly café near the park.",
        rating: 4.6,
        tags: ["vegan", "coffee", "pet_friendly", "low"]
      },
      {
        name: "City Art Walk",
        image: "/img/artwalk.jpg",
        description: "A curated walking tour through local galleries.",
        rating: 4.8,
        tags: ["free"]
      },
      {
        name: "Riverside Stroll",
        image: "/img/river.jpg",
        description: "Peaceful walk by the riverside with food trucks nearby.",
        rating: 4.2,
        tags: ["pet_friendly", "low", "vegan"]
      }
    ];
  
    // Simple matching logic based on filters
    const matched = dummyPlaces.filter(place => {
      if (filters.pet_friendly && !place.tags.includes("pet_friendly")) return false;
      if (filters.budget && !place.tags.includes(filters.budget)) return false;
      if (filters.food && !place.tags.includes(filters.food)) return false;
      return true;
    });
  
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1000));
    return matched;
  }
  