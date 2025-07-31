// public/js/queryParser.js

export function parseSearchQuery(inputText) {
    const query = inputText.toLowerCase();
    const filters = {
      category: null,
      food: null,
      budget: null,
      mobility: null,
      time: null,
      pet_friendly: false,
    };
  
    // CATEGORY
    if (/art|museum|history/.test(query)) filters.category = "museum";
    if (/nature|park|trees/.test(query)) filters.category = "nature";
    if (/shopping|stores/.test(query)) filters.category = "shopping";
    if (/viewpoint|scenic/.test(query)) filters.category = "viewpoint";
  
    // FOOD
    if (/vegan|vegetarian/.test(query)) filters.food = "vegan";
    if (/coffee|cafe/.test(query)) filters.food = "coffee";
  
    // BUDGET
    if (/free|no cost/.test(query)) filters.budget = "free";
    if (/cheap|low cost|budget/.test(query)) filters.budget = "low";
  
    // MOBILITY
    if (/walk|walking/.test(query)) filters.mobility = "walking";
    if (/bike|bicycle/.test(query)) filters.mobility = "bike";
    if (/car|drive/.test(query)) filters.mobility = "driving";
  
    // TIME
    const matchTime = query.match(/(\d+)\s?(hour|hours|h)/);
    if (matchTime) filters.time = parseInt(matchTime[1]);
  
    // PET FRIENDLY
    if (/dog|pet/.test(query)) filters.pet_friendly = true;
  
    return filters;
  }
  