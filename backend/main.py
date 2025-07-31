from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os
from openai import OpenAI

app = FastAPI()
load_dotenv()

# === API KEYS ===
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

# === CORS CONFIG ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O usa ["http://127.0.0.1:5500"] para más seguridad
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/plan-tour")
async def plan_tour(request: Request):
    data = await request.json()
    prompt = data.get("prompt")
    location = data.get("location")
    filters = data.get("filters", [])
    duration = data.get("duration", 2)

    if not prompt or not location:
        return {"error": "Missing prompt or location"}

    # 1. Buscar lugares reales
    places = search_places(prompt, location, filters)

    # 2. Crear el tour y ruta
    tour_markdown, route_link = generate_text(prompt, location, places, duration)

    return {
        "tourPlan": tour_markdown,
        "places": places,
        "routeLink": route_link
    }

def describe_place(place):
    name = place.get("name", "")
    rating = place.get("rating", "N/A")
    types = place.get("types", [])
    category = types[0].replace('_', ' ').title() if types else "place"
    base = f"{name} is a {category.lower()}"
    if rating != "N/A":
        base += f" rated {rating}/5"
    return base + "."

def search_places(prompt, location, filters):
    query = prompt + " in " + location
    filter_terms = ", ".join(filters)
    if filter_terms:
        query += f" with {filter_terms}"

    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&key={GOOGLE_API_KEY}"
    response = requests.get(url)
    results = response.json().get("results", [])[:5]

    return [
        {
            "name": r["name"],
            "address": r.get("formatted_address", ""),
            "rating": r.get("rating"),
            "location": r.get("geometry", {}).get("location", {}),
            "mapsLink": f"https://www.google.com/maps/search/?api=1&query_place_id={r['place_id']}",
            "types": r.get("types", []),
            "description": describe_place(r),
            "place_id": r.get("place_id")
        }
        for r in results
    ]

def generate_route_link(places):
    if not places:
        return None

    base_url = "https://www.google.com/maps/dir/?api=1"
    origin = f"{places[0]['location']['lat']},{places[0]['location']['lng']}"
    destination = f"{places[-1]['location']['lat']},{places[-1]['location']['lng']}"
    waypoints = "|".join([
        f"{p['location']['lat']},{p['location']['lng']}" for p in places[1:-1]
    ]) if len(places) > 2 else ""

    route_url = f"{base_url}&origin={origin}&destination={destination}"
    if waypoints:
        route_url += f"&waypoints={waypoints}"

    return route_url

def generate_text(prompt, location, places, duration):
    place_lines = "\n".join([
        f"- [{p['name']}]({p['mapsLink']}) ({p['address']}): {p['description']}" for p in places
    ])

    route_link = generate_route_link(places)

    full_prompt = f"""
You are a travel assistant creating a personalized walking tour in {location}.

The user described their mood as: \"{prompt}\".
They have approximately {duration} hours.

Below is a list of real locations, extracted from Google Maps, with their descriptions:
{place_lines}

Your task is to:
- Select the most emotionally relevant 2–4 stops.
- Assign realistic time blocks (e.g. "10:00–10:45 AM"), making sure the **total duration including ~10-15 minutes walking time between each stop** adds up to around {duration} hours.
- Mention estimated cost (if any), e.g. "Free" or "Paid".
- Format each stop like:
  - TIME — [Name]({{mapsLink}})
    - Beautified 1-liner description
    - Cost: Free / Paid
- End with a closing line like “Enjoy your day exploring!”
- Finally, include a link at the end with the text:  
  🗺️ Explore route on Google Maps: [Open itinerary]({route_link})

IMPORTANT:
Do not invent new places. Use only the ones provided.
Descriptions must stay aligned with the base data. You can embellish tone, but not facts.
Output in English, clean markdown format.
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": full_prompt}]
    )

    tour_plan = response.choices[0].message.content
    return tour_plan, route_link
