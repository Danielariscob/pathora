# 🗺️ Pathora

**Pathora** is an AI-powered travel planner that creates personalized urban tour routes based on your time, preferences, and budget. Built for the *Google Maps Platform Awards*, Pathora combines OpenAI and Google Maps to simplify how we explore new cities — thoughtfully, intuitively, and with no time wasted.

## ✨ Features

- 🧠 **Natural Language Input**: Just describe what you want to do (e.g., *"I want a relaxing day with museums and cute cafés in Barranco, Peru"*)
- 📍 **AI-Generated Itinerary**: The app suggests a personalized route with top-rated places from Google Maps
- 🗺️ **Interactive Map View**: See all the recommended spots mapped out
- 💌 **Save & Share**: Save your tours on the web app, view full itinerary in Google Maps, or share with friends

## 🔧 Tech Stack

- **Frontend**: HTML, JavaScript, Firebase Hosting
- **Backend**: Python, FastAPI (deployed on Render)
- **APIs**:
  - Google Maps API (Places, Distance Matrix)
  - OpenAI API (GPT-4 for natural language processing)
- **Auth & Database**: Firebase Authentication + Firestore

## 🚀 How to Run Locally

### Prerequisites
- Node.js & npm installed
- Python 3.10+
- Firebase CLI
- Google Maps API key
- OpenAI API key

### 1. Clone the repo
```bash
git clone https://github.com/Danielariscob/pathora.git
cd pathora
```
### 2. Set up the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
### 3. Set up the Frontend
Update your Firebase config in frontend/index.html.
```bash
cd frontend
firebase login
firebase init hosting
firebase deploy
```

## 🌐 Live Demo
You can try the app here: [Pathora Live Demo](https://pathora-f706b.web.app/)

## 🏆 Hackathon Info
This project was built during Google Maps Platform Awards – celebrating the 20th anniversary of Google Maps API
