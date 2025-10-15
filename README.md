# 🎯 IELTS Fluent AI - Speaking Practice

> AI-powered IELTS speaking practice with full voice conversation and instant feedback

## ✨ Features

- 🗣️ **Full Voice Conversation** - AI speaks questions to you, you speak answers back
- 🎤 **Real-time Speech Recognition** - Natural voice interaction using Web Speech API
- 📊 **Instant AI Feedback** - Detailed band score analysis powered by Perplexity AI
- 📚 **Topic-Based Practice** - 10 comprehensive topics with 130+ unique questions
- 📥 **Import Custom Questions** - Upload your own question banks (JSON/TXT)
- 🎓 **Authentic IELTS Format** - Complete Part 1, 2, and 3 simulation
- 🔐 **User Authentication** - Login/signup with session tracking
- 🎨 **Professional UI** - Beautiful IELTS-themed interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Perplexity API key ([Get one here](https://www.perplexity.ai/))

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd ielts-fluent-ai-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Edit the `.env` file and add your Perplexity API key:
```env
VITE_PERPLEXITY_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:8080`

## 📖 Documentation

- **[Authentication Guide](AUTHENTICATION_GUIDE.md)** - User login/signup system
- **[Topic Banks Feature](TOPIC_BANKS_FEATURE.md)** - Built-in question topics
- **[Import Questions Guide](IMPORT_QUESTIONS_GUIDE.md)** - Upload custom questions
- **[Interactive Speaking Guide](INTERACTIVE_SPEAKING_GUIDE.md)** - Voice conversation system
- **[Supabase Setup](SUPABASE_SETUP.md)** - Optional database configuration

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **AI:** Perplexity AI (sonar models)
- **Voice:** Web Speech API (Recognition + Synthesis)
- **Auth:** Custom JWT + localStorage (demo mode)
- **Database:** Optional Supabase integration

## 🎯 How to Use

1. **Click "Start Free Practice"** on the landing page
2. **Choose a topic** or **import your own questions**
3. **Allow microphone access** when prompted
4. **Start speaking practice:**
   - AI asks you questions via voice
   - You answer by speaking naturally
   - Get instant feedback after each section
5. **Complete all 3 parts** for full IELTS simulation
6. **Review your feedback** with band scores and tips

## 📁 Project Structure

```
ielts-fluent-ai-main/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.tsx
│   │   ├── InteractiveSpeakingPractice.tsx
│   │   ├── TopicSelector.tsx
│   │   ├── QuestionBankImporter.tsx
│   │   ├── LoginModal.tsx
│   │   └── UserDashboard.tsx
│   ├── lib/                 # Utilities
│   │   ├── perplexity-client.ts
│   │   ├── ai-examiner.ts
│   │   ├── speaking-feedback.ts
│   │   └── question-banks.ts
│   ├── context/             # React context
│   │   └── AuthContext.tsx
│   ├── App.tsx
│   └── main.tsx
├── sample-question-bank.json  # Example custom questions
├── sample-question-bank.txt   # Example text format
└── .env                      # API keys (not in git)
```

## 🎓 Topics Available

1. Work & Study
2. Hometown & Home
3. Hobbies & Interests
4. Food & Cooking
5. Travel & Places
6. Technology & Media
7. Family & Relationships
8. Environment & Nature
9. Health & Fitness
10. Culture & Traditions

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to fork and submit pull requests!

---

**Made with ❤️ for IELTS learners worldwide**

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS