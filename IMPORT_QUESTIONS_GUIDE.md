# 📥 Import Your Own Question Bank - User Guide

## Overview
You can now import your own custom IELTS speaking questions into the practice system! This feature allows you to practice with questions that are specific to your needs, preparation materials, or coaching program.

## How to Use

### Step 1: Prepare Your Questions
Create a question bank file in one of these formats:

#### **Option 1: JSON Format** (Recommended)
```json
{
  "name": "My Custom Questions",
  "part1Questions": [
    "What is your name?",
    "Where are you from?",
    "Do you work or study?",
    "What do you do in your free time?",
    "Do you like reading books?",
    "What kind of music do you enjoy?",
    "Do you prefer hot or cold weather?",
    "What is your favorite season?"
  ],
  "part2CueCard": {
    "title": "Describe a person who has influenced you",
    "prompts": [
      "Who this person is",
      "How you know them",
      "What they have done to influence you",
      "Why you admire this person"
    ]
  },
  "part3Questions": [
    "How important are role models in society?",
    "Do you think celebrities make good role models?",
    "How has the concept of influence changed with social media?",
    "What qualities make someone a good leader?",
    "How do different cultures view leadership?"
  ]
}
```

#### **Option 2: Text/Plain Format**
```
PART 1
- What is your name?
- Where are you from?
- Do you work or study?
- What do you do in your free time?
- Do you like reading books?

PART 2
Describe a person who has influenced you
- Who this person is
- How you know them
- What they have done to influence you
- Why you admire this person

PART 3
- How important are role models in society?
- Do you think celebrities make good role models?
- How has the concept of influence changed with social media?
```

### Step 2: Import Your Questions

1. **Start the Application**
   - Open http://localhost:8080 in your browser
   - Click "Start Free Practice"

2. **Choose Import Method**
   - Click the **"📥 Import Your Questions"** button
   - You'll see two options:

   **A. Upload File**
   - Click "Upload File"
   - Select your `.json`, `.txt`, or `.csv` file
   - Questions will be automatically parsed and imported

   **B. Paste Text**
   - Click "Paste Text"
   - Enter a name for your question bank
   - Paste your questions in the text area
   - Click "Import Questions"

3. **Start Practice**
   - After import, you'll see a confirmation showing your custom question bank name
   - Click "🎯 Start Speaking Practice"
   - The AI will ask questions from your imported bank!

## File Format Requirements

### Part 1 Questions
- Should have **at least 5 questions** (recommended: 8-10)
- Simple, personal questions
- About daily life, hobbies, work, family, etc.

### Part 2 Cue Card (Optional)
- One descriptive topic
- 3-4 prompts/bullet points
- Should be about describing something (person, place, event, object, etc.)

### Part 3 Questions
- Should have **at least 4 questions** (recommended: 5-7)
- More abstract, discussion-style questions
- Related to broader topics and opinions

## Sample Files Included

We've included two sample files in your project folder:

1. **`sample-question-bank.json`** - JSON format example
2. **`sample-question-bank.txt`** - Text format example

You can use these as templates for creating your own question banks!

## Tips for Creating Good Question Banks

### ✅ Do's
- Use natural, conversational language
- Include a variety of question types
- Make Part 3 questions thought-provoking
- Test your questions before a real practice session
- Keep questions relevant to IELTS topics

### ❌ Don'ts
- Don't make questions too complex or confusing
- Avoid yes/no questions in Part 3
- Don't include special characters that might break parsing
- Don't mix different topics in the same bank

## Switching Between Question Banks

You can easily switch between your custom questions and the built-in topic banks:

1. **From Custom to Topics:**
   - Click "Clear & Select Topic Instead" in the purple info box
   - Choose from 10 built-in topics

2. **From Topics to Custom:**
   - Click "📥 Import Your Questions" button
   - Upload your new question bank

## Common Use Cases

### 1. **Coaching Centers**
Use this to import official practice questions from your IELTS preparation course.

### 2. **Self-Study**
Create question banks based on topics you're weak in or want to practice more.

### 3. **Mock Tests**
Import actual IELTS past questions or mock test questions.

### 4. **Specific Preparation**
Focus on questions related to your background (e.g., IT students might create technology-focused questions).

## Troubleshooting

### "Could not parse the question bank"
- Check that your JSON is valid (use https://jsonlint.com)
- Ensure PART 1, PART 2, PART 3 headers are present in text files
- Make sure questions are on separate lines

### Questions not showing up
- Verify you have at least 3-5 questions in each part
- Check that questions are properly formatted (JSON array or bulleted list)

### Imported bank disappeared
- Question banks are stored in browser memory only
- They reset when you refresh the page
- Save your question bank files and re-import when needed

## Advanced: Creating Multiple Banks

You can create multiple question bank files for different topics:

- `work-questions.json`
- `travel-questions.json`
- `education-questions.json`
- `technology-questions.json`

Switch between them by importing different files each session!

## Need Help?

If you encounter any issues or have questions about creating custom question banks, check the format examples in the `sample-question-bank.json` and `sample-question-bank.txt` files.

---

**Happy Practicing! 🎯**
