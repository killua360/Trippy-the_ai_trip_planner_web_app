✈️ Trippy – AI Powered Trip Planner

An intelligent AI-powered travel planning web application that generates personalized trip itineraries based on user preferences such as destination, budget, duration, and group size.

Built using modern full-stack technologies with real-time backend and AI integration.

🚀 Features

🔐 Authentication with Clerk

🤖 AI-powered itinerary generation

🗺️ Google Places API integration

🏨 Hotel and place recommendations

📍 Interactive trip view pages

💰 Budget-based filtering

👥 Group size customization

📅 Dynamic trip duration selection

☁️ Real-time backend with Convex

🎨 Modern UI with reusable components

🛠️ Tech Stack

Frontend:

Next.js (App Router)

TypeScript

Tailwind CSS

ShadCN UI Components

Backend:

Convex (Database + Serverless Functions)

Authentication:

Clerk

APIs:

Google Places API

AI Model API (custom route)

Deployment:

Vercel

📂 Project Structure
app/
  (auth)/
  create-new-trip/
  my-trips/
  view-trip/
  api/

components/
context/
convex/
hooks/
lib/
public/
⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/killua360/Trippy-the_ai_trip_planner_web_app.git
cd Trippy-the_ai_trip_planner_web_app

2️⃣ Install dependencies

npm install

3️⃣ Create a .env.local file and add:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CONVEX_URL=
GOOGLE_PLACE_API_KEY=
AI_MODEL_API_KEY=

4️⃣ Run the development server

npm run dev

App will run at:

http://localhost:3000
🧠 How It Works

User signs in

User selects:

Destination

Budget

Duration

Group size

AI generates itinerary

Google Places enriches results

Data stored in Convex

User can view and manage trips.

📈 Future Improvements

Trip editing functionality

Saved destinations

Weather integration

PDF itinerary export

Expense tracking per trip

AI chat assistant refinement

🌍 Live Demo

trippy-the-ai-trip-planner-web-app.vercel.app

👨‍💻 Author

Rahul Sen
B.Tech | Full-Stack Developer | AI Enthusiast
