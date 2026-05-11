# 🤖 SmartPick AI — Intelligent Product Recommendation System

An AI-powered product recommendation system built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and the **Google Gemini API**.

Users describe what they're looking for in plain English, and the AI analyzes the product catalog to return the best matches with confidence scores and explanations. The application features a clean, minimal, Apple-inspired design for a premium user experience.

---

## 📁 Folder Structure

```
assignment/
├── client/                        # React + Vite frontend
│   ├── public/
│   │   └── vite.svg               # App favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── ProductCard.jsx    # Product display card
│   │   │   ├── SearchBar.jsx      # Search input
│   │   │   ├── CategoryFilter.jsx # Category filter pills
│   │   │   ├── PreferenceInput.jsx# AI preference input
│   │   │   ├── LoadingSpinner.jsx # Loading animation
│   │   │   ├── RecommendationResults.jsx  # AI results display
│   │   │   └── ErrorMessage.jsx   # Error handling
│   │   ├── App.jsx                # Main application
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind + custom styles
│   ├── index.html                 # HTML entry point
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   ├── postcss.config.js          # PostCSS config
│   └── package.json
│
├── server/                        # Node.js + Express backend
│   ├── data/
│   │   └── products.json          # Sample product catalog (20 items)
│   ├── routes/
│   │   └── recommend.js           # AI recommendation route
│   ├── server.js                  # Express server
│   ├── test.js                    # Testing script for Gemini API models
│   ├── .env                       # Environment variables (your API key)
│   ├── .env.example               # Environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **Google Gemini API Key** — Get one at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 1. Clone / Open the Project

```bash
git clone https://github.com/Yashkatiyar24/Smartpick.git
cd Smartpick
```

### 2. Configure the Gemini API Key

Edit `server/.env` (or copy `.env.example` to `.env`) and replace the placeholder:

```env
GEMINI_API_KEY=your-actual-api-key-here
PORT=5001
```

### 3. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 4. Start the Application

**Terminal 1 — Start the backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```

### 5. Open in Browser

Navigate to **http://localhost:5173** (or the port Vite provides) — the frontend is running with Vite dev server.

---

## 🎯 How It Works

1. **Browse Products** — View the product catalog with search and category filters
2. **Enter Preference** — Type what you're looking for (e.g., "I want a phone under $500")
3. **Get Recommendations** — Click the button to send your preference to the AI
4. **View Results** — See AI-matched products with confidence scores and explanations

---

## 📡 API Endpoints

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/api/products` | Get all products from the catalog  |
| POST   | `/api/recommend`| Get AI-powered recommendations     |
| GET    | `/api/health`   | Health check                       |

---

## ✨ Features

- ✅ AI-powered product recommendations via Google Gemini
- ✅ Clean, minimal Apple-inspired UI design
- ✅ Search filtering by name, category, description, and specs
- ✅ Category filter pills
- ✅ Confidence scores for each recommendation
- ✅ AI reasoning explanations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading animations and skeleton states
- ✅ Error handling with retry
- ✅ Example prompts for quick testing
- ✅ Product image lazy loading with fallback
- ✅ Star rating display
- ✅ Spec tag badges

---

## 🛡️ Security

- Gemini API key is stored in `.env` on the server only — **never exposed to the frontend**
- API calls are proxied through Express — the frontend communicates only with your backend
- `.env` is in `.gitignore` — never committed to version control

---

## 🧰 Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Frontend | React 18, Vite 5    |
| Styling  | Tailwind CSS 3      |
| HTTP     | Axios               |
| Backend  | Node.js, Express 4  |
| AI       | Google Gemini Flash |
| Env      | dotenv              |

---

## 📝 License

MIT — Built for educational purposes.
