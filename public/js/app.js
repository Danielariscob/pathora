// js/app.js

// Simple SPA navigation
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').substring(1);
    pages.forEach(p => p.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
  });
});

// Google Maps basic init
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 }, // Default NYC
    zoom: 13,
  });
}

// Tour generation (mock version)
document.getElementById("searchBtn").addEventListener("click", () => {
  const tourType = document.getElementById("tourInput").value;
  const vegan = document.getElementById("vegan").checked;
  const petFriendly = document.getElementById("petFriendly").checked;
  const lowCost = document.getElementById("lowCost").checked;
  const priceRange = document.getElementById("priceRange").value;
  const tourTime = document.getElementById("tourTime").value;

  const filters = {
    tourType,
    vegan,
    petFriendly,
    lowCost,
    priceRange,
    tourTime
  };

  console.log("Searching with filters:", filters);

  // Dummy result pin
  const dummySpot = { lat: 40.7138, lng: -74.0065 };
  new google.maps.Marker({
    position: dummySpot,
    map,
    title: `Tour: ${tourType}`
  });

  document.getElementById("results").innerHTML = `<p>Showing results for: <strong>${tourType}</strong></p>`;
});
