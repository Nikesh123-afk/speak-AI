# 🎤 Interactive IELTS Speaking Practice - Complete Guide

## 🎯 What This Does

This is a **FULL CONVERSATIONAL** IELTS speaking practice system where:

1. **AI Examiner Speaks to You** 🗣️ - Uses text-to-speech
2. **You Speak Back** 🎤 - Records your audio
3. **AI Listens** 👂 - Converts your speech to text
4. **AI Responds** 💬 - Asks follow-up questions
5. **Get Feedback** 📊 - Comprehensive IELTS assessment

---

## 🌟 Key Features

### 🎯 Real IELTS Test Simulation
- **Part 1**: Introduction & Interview (4-5 minutes)
- **Part 2**: Long Turn with cue card (3-4 minutes)
- **Part 3**: Discussion (4-5 minutes)

### 🗣️ Voice Interaction
- AI speaks questions using natural voice
- You answer by speaking into your microphone
- Real-time speech recognition
- Live transcript as you speak

### 🤖 Intelligent AI Examiner
- Generates contextual follow-up questions
- Adapts to your responses
- Maintains natural conversation flow
- Follows real IELTS exam format

### 📊 Comprehensive Feedback
- Band score breakdown
- Strengths and weaknesses
- Grammar analysis
- Vocabulary suggestions
- Pronunciation tips
- Downloadable feedback report

---

## 🚀 How to Use

### Step 1: Start the Server

```powershell
cd "c:\Users\nikes\OneDrive\Desktop\ielts-fluent-ai-main\ielts-fluent-ai-main"
npm run dev
```

### Step 2: Open Your Browser

Go to: **http://localhost:8080**

### Step 3: Allow Microphone Access

When prompted, click **"Allow"** to give microphone access.

### Step 4: Start Practice

1. Click **"🎯 Start Speaking Practice"**
2. Listen to the AI examiner's question
3. Click **"🎤 Start Speaking"** to answer
4. Speak your answer clearly
5. Click **"⏹️ Stop Speaking"** when done
6. AI will ask a follow-up question
7. Repeat until you want to finish
8. Click **"🏁 Finish & Get Feedback"**

---

## 📋 Exam Flow

### Part 1: Introduction (4-5 minutes)
```
AI: "Hello! What's your name?"
You: [Speak your answer]
AI: "Where are you from?"
You: [Speak your answer]
AI: "What do you do? Do you work or study?"
... continues with 4-5 questions
```

### Part 2: Long Turn (3-4 minutes)
```
AI: "I'm going to give you a topic..."
[Shows cue card with bullet points]
AI: "You have 1 minute to prepare..."
[60 second countdown]
AI: "Please begin speaking now."
You: [Speak for 1-2 minutes]
```

### Part 3: Discussion (4-5 minutes)
```
AI: "Let's discuss some abstract ideas..."
AI: [Asks analytical questions]
You: [Provide detailed responses]
... continues with follow-up questions
```

### Feedback
```
AI: "Thank you! Generating your feedback..."
[Shows comprehensive IELTS feedback]
[Download option available]
```

---

## 🎛️ User Interface

### Main Screen Layout

```
┌─────────────────────────────────────────────┐
│  🎤 IELTS Speaking Practice        Part 1   │
├──────────────────────┬──────────────────────┤
│                      │                      │
│  💬 Conversation     │   📝 Current Quest.  │
│                      │                      │
│  👨‍🏫 Examiner: "..." │   ℹ️ Instructions    │
│  🎤 You: "..."       │                      │
│                      │   💡 Tips            │
│  [🎤 Start Speaking] │                      │
│  [🏁 Finish]         │   [🔄 Restart]       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

---

## 🔧 Technical Details

### Technologies Used
- **Speech Recognition**: Web Speech API (built into browsers)
- **Text-to-Speech**: Web Speech Synthesis API
- **Audio Recording**: MediaRecorder API
- **AI**: Perplexity AI (for question generation and feedback)
- **Voice**: British English accent (IELTS standard)

### Browser Compatibility
- ✅ Chrome (Recommended)
- ✅ Edge
- ✅ Safari
- ⚠️ Firefox (limited speech recognition)

### Requirements
- Microphone
- Modern browser
- Internet connection
- Perplexity API key configured

---

## 💡 Tips for Best Experience

### Audio Setup
✅ Use a good quality microphone  
✅ Quiet environment (no background noise)  
✅ Speak clearly and at normal pace  
✅ Keep 15-20cm from microphone  

### Practice Tips
✅ Take your time to think  
✅ Speak naturally, don't rush  
✅ Elaborate on answers  
✅ Use varied vocabulary  
✅ Practice pronunciation  

### Technical Tips
✅ Use Chrome browser for best results  
✅ Check microphone permissions  
✅ Ensure stable internet connection  
✅ Close other audio applications  

---

## 🐛 Troubleshooting

### "Microphone not working"
1. Check browser permissions (camera icon in address bar)
2. Go to browser settings → Privacy → Microphone
3. Allow access for localhost
4. Refresh the page

### "Speech recognition not working"
1. Use Chrome browser (best support)
2. Speak clearly and loudly enough
3. Check microphone volume in system settings
4. Ensure English is selected as language

### "AI not responding"
1. Check internet connection
2. Verify Perplexity API key in .env file
3. Check browser console for errors (F12)
4. Try refreshing the page

### "No sound from AI"
1. Check system volume
2. Ensure browser can play audio
3. Try unmuting the tab
4. Refresh the page

---

## 📊 Features Breakdown

| Feature | Description | Status |
|---------|-------------|--------|
| Voice Q&A | AI speaks, you speak back | ✅ Working |
| Speech Recognition | Converts speech to text | ✅ Working |
| Part 1-3 Questions | Full IELTS format | ✅ Working |
| Follow-up Questions | Context-aware | ✅ Working |
| Live Transcript | See what you're saying | ✅ Working |
| Feedback Report | Detailed assessment | ✅ Working |
| Download Results | Save feedback | ✅ Working |
| Part 2 Timer | 60s preparation | ✅ Working |

---

## 🎓 Example Session

```
1. Start → Welcome message (AI speaks)
2. Question 1: "What's your name?"
   → You speak → AI asks next
3. Question 2: "Where are you from?"
   → You speak → AI asks next
4. ... continues with 3-4 more questions
5. Part 2: Shows cue card, 60s preparation
   → You speak for 1-2 minutes
6. Part 3: Discussion questions
   → You discuss → AI asks follow-ups
7. Finish → Comprehensive feedback
8. Download feedback report
9. Practice again or exit
```

---

## 🔐 Privacy & Security

- ✅ All speech processing happens locally in browser
- ✅ Only transcripts sent to AI (not audio files)
- ✅ No data stored on servers
- ✅ Microphone access only when recording
- ✅ Can practice offline (except AI features)

---

## 🎯 Perfect For

✅ IELTS test preparation  
✅ Speaking practice  
✅ Pronunciation improvement  
✅ Building confidence  
✅ Mock tests  
✅ Self-assessment  

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Press F12 in browser to see console errors
3. Share any error messages for help
4. Make sure all prerequisites are met

---

## 🚀 Ready to Practice!

Your interactive IELTS speaking practice app is ready!

**Open**: http://localhost:8080  
**Click**: "Start Speaking Practice"  
**Allow**: Microphone access  
**Practice**: Real IELTS conversation  

**Good luck with your practice! 🎯**
