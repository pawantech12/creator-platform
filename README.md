# 📸 Creator Platform – AI-Powered Instagram Growth Toolkit (MERN Stack)

Welcome to **Creator Platform**, a full-stack web application designed to empower content creators with AI-powered content suggestions and simulated Instagram analytics — all built using the MERN stack.

## 🧩 Modules Overview

### 📌 Module 1: Content Idea Assistant (Powered by Gemini AI)

Generate Instagram content ideas effortlessly using Google Gemini API.

**Features:**

- Input a topic and choose a content niche (e.g., Fashion, Fitness, Finance)
- Get AI-generated:
  - 🎬 Instagram Reel Idea
  - ✍️ Captivating Caption
  - 🔥 10 Relevant Hashtags
  - 💡 Hook/Opening Line
- Loading & error states with elegant UI feedback
- Gemini API used securely via `.env`

> ✨ Prompt Example to Gemini:
> _"You are a content strategist. Suggest one trending Instagram reel idea for a creator in the [niche] niche. Include a caption, 5 relevant hashtags, and a strong opening hook."_

### 📊 Module 2: Simulated Instagram Analytics Dashboard

Visualize and track your content performance via mock or seeded analytics.

**Features:**

- 📈 Follower Growth (Last 7 Days) — _Line Chart_
- 🧮 Post Engagements (Likes + Comments) — _Bar or Pie Chart_
- 🕖 Best Time to Post — _e.g., "Wednesday 7 PM"_
- 📤 Upload custom JSON data to update dashboard
- 📥 Export analytics data as a downloadable `.json` report

**Sample Data Format:**

```json
{
  "followers": [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  "engagement": [
    { "post": 1, "likes": 320, "comments": 25 },
    { "post": 2, "likes": 400, "comments": 40 },
    { "post": 3, "likes": 290, "comments": 10 }
  ],
  "bestPostTime": "Wednesday 7 PM"
}
```

## 🔐 Authentication

- Basic login system using **JWT Authentication**
- Only logged-in users can access the analytics dashboard

## 🛠 Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React.js, TailwindCSS / Bootstrap |
| Backend  | Node.js, Express.js               |
| Charts   | Chart.js or Recharts              |
| AI API   | Google Gemini 1.5 Flash           |
| Auth     | JWT-based Login                   |

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pawantech12/creator-platform.git
cd creator-platform
```

### 2. Install Dependencies

#### Backend

```bash
cd server
pnpm install
```

#### Frontend

```bash
cd client
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file in the `client` directory:

```env
VITE_SERVER_URL=your server url
```

### 4. Start the Development Server

#### Backend

```bash
pnpm run start
```

#### Frontend

```bash
pnpm run dev
```

## 📤 Exporting Analytics

Click the **"Export Data"** button to download your current dashboard metrics in `.json` format.

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License

This project is free to use.

## ✨ Author

**Pawan Kumavat** – [@pawantech12](https://github.com/pawantech12)
