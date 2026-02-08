<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Forever Yours - Romantic Story Engine

Forever Yours is a premium digital platform designed to transform traditional proposals and romantic gestures into unforgettable, interactive experiences. Leveraging AI and modern web aesthetics, it allows users to create personalized, highly-engaging digital keepsakes that celebrate their unique bonds.

## ✨ Core Features

- **Precision Personalization**: Anchor invitations with names and custom images to create a 1:1 emotional connection.
- **AI Vow Generation**: Powered by Google's Gemini, the engine crafts unique, poetic expressions of love that resonate deeper than generic templates.
- **Evasive "No" Logic**: A playful digital interaction where the "No" button avoids being clicked, ensuring every journey leads to a smile and a "Yes".
- **Aesthetic Moods**: Choose from curated design themes like *Classic Romance*, *Midnight Starlight*, *Neon Passion*, *Vintage Soul*, and *Ethereal Dream*.
- **Digital Keepsakes**: Verified certificates and interactive memory lanes that index your bond permanently in time.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```text
├── components/          # UI Components
│   ├── layout/         # Navigation, App Shell
│   ├── ui/             # Reusable primitive components
│   └── views/          # Page-level view components (Landing, Create, Proposal)
├── services/           # External API integrations (Gemini, Supabase)
├── hooks/              # Custom React hooks (Audio, UI state)
├── utils/              # Helper functions and business logic
├── constants.tsx       # Centralized theme and content configuration
└── types.ts            # TypeScript definitions
```

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- Gemini API Key

### Installation

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env.local` file and add:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📄 License
Project developed for Dominion & Celebration themes. All rights reserved.

