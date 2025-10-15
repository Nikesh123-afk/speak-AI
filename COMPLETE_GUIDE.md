# 📚 Complete Project Guide

## Quick Navigation

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Usage Guide](#usage-guide)
4. [Documentation](#documentation)
5. [Project Structure](#project-structure)

---

## Getting Started

### ✅ Your Project is Already Set Up!

The server is currently running at **http://localhost:8080**

### What You Have:
- ✅ All dependencies installed (467 packages)
- ✅ Perplexity API configured and working
- ✅ Development server running on port 8080
- ✅ All features fully functional
- ✅ Clean, organized codebase

---

## Features

### 🗣️ Interactive Voice Conversation
- AI speaks IELTS questions to you (British English accent)
- You answer by speaking naturally
- Real-time speech recognition
- Natural conversation flow

### 📚 Multiple Question Sources

1. **Built-in Topics (10 options)**
   - Work & Study
   - Hometown & Home
   - Hobbies & Interests
   - Food & Cooking
   - Travel & Places
   - Technology & Media
   - Family & Relationships
   - Environment & Nature
   - Health & Fitness
   - Culture & Traditions

2. **Import Your Own Questions**
   - Upload JSON or TXT files
   - Paste questions directly
   - Use your coaching materials
   - See `IMPORT_QUESTIONS_GUIDE.md` for details

### 📊 AI-Powered Feedback
- Perplexity AI analyzes your responses
- Detailed band score (0-9)
- Fluency & Coherence analysis
- Lexical Resource evaluation
- Grammatical Range assessment
- Pronunciation tips

### 🔐 User Authentication
- Login/Signup system
- Session tracking
- Practice count monitoring
- User dashboard
- See `AUTHENTICATION_GUIDE.md` for details

---

## Usage Guide

### Starting a Practice Session

1. **Open the App**
   - Go to http://localhost:8080
   - You'll see the landing page

2. **Login (Optional)**
   - Click "Login" in the header
   - Sign up or log in to track your progress

3. **Start Practice**
   - Click "Start Free Practice" button
   - You'll see the welcome screen

4. **Choose Your Questions**
   
   **Option A: Select a Topic**
   - Click "📚 Choose Topic to Start"
   - Select from 10 pre-made topics
   - Or click "Surprise Me!" for random

   **Option B: Import Your Questions**
   - Click "📥 Import Your Questions"
   - Upload a file OR paste text
   - See sample files for format examples

5. **Allow Microphone Access**
   - Browser will ask for permission
   - Click "Allow" to use voice features

6. **Practice!**
   - AI speaks the first question
   - Click "🎤 Start Recording" to answer
   - Speak naturally for 20-60 seconds
   - Click "⏹️ Stop Recording" when done
   - AI gives feedback and asks next question

7. **Complete All 3 Parts**
   - **Part 1:** Introduction & Interview (4-5 minutes)
   - **Part 2:** Individual Long Turn (3-4 minutes, includes 1 min prep)
   - **Part 3:** Two-way Discussion (4-5 minutes)

8. **Review Feedback**
   - Get your band score
   - Read detailed analysis
   - Identify improvement areas

---

## Documentation

### Core Guides
- **README.md** - This file, main overview
- **AUTHENTICATION_GUIDE.md** - Login/signup system
- **IMPORT_QUESTIONS_GUIDE.md** - Custom question upload
- **TOPIC_BANKS_FEATURE.md** - Built-in question topics
- **INTERACTIVE_SPEAKING_GUIDE.md** - Voice conversation details

### Optional Setup
- **SUPABASE_SETUP.md** - Production database (optional)

### Reference
- **CLEANUP_SUMMARY.md** - Files removed/kept during cleanup

### Sample Files
- **sample-question-bank.json** - Example questions (JSON format)
- **sample-question-bank.txt** - Example questions (text format)

---

## Project Structure

### `/src/components/` - UI Components

| File | Purpose |
|------|---------|
| `LandingPage.tsx` | Marketing page with login/signup |
| `InteractiveSpeakingPractice.tsx` | Main voice conversation interface |
| `TopicSelector.tsx` | Modal to choose from 10 topics |
| `QuestionBankImporter.tsx` | Upload/paste custom questions |
| `LoginModal.tsx` | Login/signup form |
| `UserDashboard.tsx` | User profile & stats |

### `/src/lib/` - Business Logic

| File | Purpose |
|------|---------|
| `perplexity-client.ts` | Perplexity API integration |
| `ai-examiner.ts` | AI question generation |
| `speaking-feedback.ts` | Feedback analysis |
| `question-banks.ts` | 130+ built-in questions |

### `/src/context/` - State Management

| File | Purpose |
|------|---------|
| `AuthContext.tsx` | Global authentication state |

---

## Tips for Best Experience

### 🎤 Voice Input
- Speak clearly and naturally
- Don't rush - take your time
- Use a quiet environment
- Test microphone before starting

### 📚 Question Selection
- Start with familiar topics
- Try different topics to practice variety
- Import exam-specific questions before real test
- Use "Surprise Me!" to challenge yourself

### 📊 Feedback
- Read feedback carefully after each session
- Focus on one improvement area at a time
- Practice weak areas more
- Track your progress over sessions

### 🎯 Exam Simulation
- Treat it like a real exam
- No pauses or breaks
- Answer fully and naturally
- Time yourself

---

## Common Questions

### Q: Can I use this offline?
A: No, requires internet for Perplexity AI and speech recognition.

### Q: How many questions are included?
A: 130+ questions across 10 topics, plus unlimited AI-generated questions.

### Q: Can I import questions in my language?
A: Questions should be in English (IELTS exam language).

### Q: Is my voice data saved?
A: No, voice is processed in real-time and not stored.

### Q: How accurate is the band score?
A: AI provides estimates. Real scores come from certified examiners.

### Q: Can multiple users use this?
A: Yes, each user can create their own account.

---

## Next Steps

### For Daily Practice:
1. Open http://localhost:8080
2. Choose a topic
3. Practice for 10-15 minutes
4. Review feedback
5. Repeat daily!

### For Exam Preparation:
1. Import actual past papers
2. Complete full 3-part simulation
3. Focus on weak areas
4. Time yourself strictly
5. Practice with different topics

### For Advanced Users:
1. Create custom question banks
2. Integrate Supabase for persistence
3. Add payment system for premium features
4. Deploy to production

---

## Need Help?

- Check the specific guide for your issue
- Review sample files for examples
- Ensure microphone permissions are granted
- Verify Perplexity API key is set in `.env`

---

**Happy Practicing! 🎯**

Your IELTS Fluent AI is ready to help you ace the speaking test!
