/**
 * Interactive IELTS Speaking Practice
 * Full conversational AI examiner with voice interaction
 */

import { useState, useRef, useEffect } from 'react';
import { 
  generatePart1Questions,
  generateFollowUpQuestion,
  generatePart2CueCard 
} from '@/lib/ai-examiner';
import { 
  generateSpeakingFeedback,
  generateQuickFeedback 
} from '@/lib/speaking-feedback';
import { TopicSelector } from './TopicSelector';
import { QuestionBankImporter } from './QuestionBankImporter';
import { QUESTION_BANKS, QUESTION_TOPICS, TopicKey, getRandomQuestions, getCueCard } from '@/lib/question-banks';
import { transcribeAudio, initializeWhisper, isWhisperSupported } from '@/lib/whisper-client';
import { generateSpeakingFeedbackWithGemini, isGeminiConfigured } from '@/lib/gemini-client';

type Message = {
  id: string;
  role: 'examiner' | 'student';
  text: string;
  audioUrl?: string;
  timestamp: Date;
};

type ExamPart = 1 | 2 | 3;

type ImportedQuestionBank = {
  name: string;
  part1Questions: string[];
  part2CueCard?: {
    title: string;
    prompts: string[];
  };
  part3Questions: string[];
};

export function InteractiveSpeakingPractice() {
  const [examPart, setExamPart] = useState<ExamPart>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [showImporter, setShowImporter] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [importedBank, setImportedBank] = useState<ImportedQuestionBank | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [examStarted, setExamStarted] = useState(false);
  const [preparationTime, setPreparationTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionFeedback, setSessionFeedback] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set()); // Track asked questions
  const [questionCount, setQuestionCount] = useState(0); // Track number of questions asked
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isCapturingAnswer, setIsCapturingAnswer] = useState(false); // Track if we're waiting for answer
  const [audioLevel, setAudioLevel] = useState(0); // Audio level for visual feedback
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Whisper settings
  const [whisperStatus, setWhisperStatus] = useState<'loading' | 'ready' | 'error' | null>(null);

  // Initialize Whisper on component mount
  useEffect(() => {
    if (isWhisperSupported()) {
      setWhisperStatus('loading');
      initializeWhisper()
        .then(() => {
          setWhisperStatus('ready');
          console.log('✅ Whisper ready for speech recognition (95% accuracy)');
        })
        .catch((error) => {
          console.error('❌ Failed to initialize Whisper:', error);
          setWhisperStatus('error');
          alert('Failed to load Whisper AI. Please check your internet connection and refresh the page.');
        });
    } else {
      console.error('❌ Whisper not supported in this browser');
      setWhisperStatus('error');
      alert('Your browser does not support Whisper AI. Please use a modern browser like Chrome or Edge.');
    }
  }, []);

  // Text-to-Speech function
  const speak = (text: string) => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-GB'; // British accent for IELTS
      
      utterance.onend = () => resolve();
      
      window.speechSynthesis.cancel(); // Clear any pending speech
      window.speechSynthesis.speak(utterance);
    });
  };

  // Start the exam
  const startExam = async () => {
    if (!selectedTopic && !importedBank) {
      setShowTopicSelector(true);
      return;
    }
    
    setExamStarted(true);
    setExamPart(1);
    
    const greeting = "Hello! Welcome to the IELTS Speaking test. I'm your examiner today. Let me ask you a few questions about yourself. What's your name?";
    
    addMessage('examiner', greeting);
    await speak(greeting);
  };

  // Add message to chat
  const addMessage = (role: 'examiner' | 'student', text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  // Start recording student's answer with Advanced Audio Monitoring
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,      // Cancel echo
          noiseSuppression: true,      // Suppress background noise
          autoGainControl: true,       // Automatically adjust volume
          sampleRate: 48000,           // High quality audio
        } 
      });
      
      // Setup audio level monitoring
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      audioSource.connect(analyser);
      analyserRef.current = analyser;
      
      // Monitor audio levels
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          const normalizedLevel = Math.min(100, (average / 128) * 100);
          setAudioLevel(normalizedLevel);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Stop audio level monitoring
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        setAudioLevel(0);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Transcribe with Whisper AI
        let finalTranscript = '';
        
        if (whisperStatus === 'ready') {
          try {
            console.log('🎤 Transcribing with Whisper AI (95% accuracy)...');
            setIsProcessing(true);
            finalTranscript = await transcribeAudio(audioBlob);
            console.log('✅ Whisper transcription:', finalTranscript);
          } catch (error) {
            console.error('❌ Whisper transcription failed:', error);
            alert('Transcription failed. Please try speaking again.');
            setIsProcessing(false);
            return;
          } finally {
            setIsProcessing(false);
          }
        } else {
          console.error('❌ Whisper not ready');
          alert('Whisper AI is still loading. Please wait a moment and try again.');
          return;
        }
        
        // Process the response with the final transcript
        await processStudentResponse(audioUrl, finalTranscript);
      };

      // Start recording
      setIsCapturingAnswer(true);
      console.log('️ Using Whisper AI for transcription (recording audio)');

      mediaRecorder.start();
      setIsRecording(true);
      console.log('🔴 Recording started with professional audio settings');
      console.log('✅ Echo cancellation: ON');
      console.log('✅ Noise suppression: ON');
      console.log('✅ Auto gain control: ON');
      console.log('✅ Whisper AI: 95% accuracy');
    } catch (error) {
      console.error('❌ Error accessing microphone:', error);
      alert('Please allow microphone access to practice speaking! Click the lock icon in the address bar to grant permission.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log('⏹️ Stopping recording...');
      console.log('Will transcribe with Whisper AI');
      
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Process student's response
  const processStudentResponse = async (audioUrl: string, whisperTranscript: string) => {
    setIsProcessing(true);
    setIsCapturingAnswer(false);

    console.log('📝 Processing response...');
    
    // Use Whisper transcript
    const capturedTranscript = whisperTranscript.trim();
    
    console.log('Transcript length:', capturedTranscript.length);
    console.log('Transcript content:', capturedTranscript);

    // Validate transcript exists
    if (!capturedTranscript || capturedTranscript.length === 0) {
      console.error('❌ No transcript captured');
      setIsProcessing(false);
      
      // Error message
      const errorMsg = 'I didn\'t catch your answer. Please:\n\n1. Speak clearly and loudly\n2. Ensure your microphone is working\n3. Try speaking for at least 3 seconds\n4. Make sure you\'re in a quiet environment\n\nClick OK to try again.';
      
      alert(errorMsg);
      return;
    }

    
    // Add student's response to chat
    addMessage('student', capturedTranscript);
    console.log('✅ Student response captured:', capturedTranscript);

    try {
      // Generate AI follow-up question based on response
      let nextQuestion = '';

      if (examPart === 1) {
        // Part 1: Use questions from imported bank OR selected topic
        if (importedBank && questionCount < 4) {
          // Get unasked question from imported bank
          const availableQuestions = importedBank.part1Questions.filter(q => !askedQuestions.has(q));
          if (availableQuestions.length > 0) {
            nextQuestion = availableQuestions[0];
            setAskedQuestions(prev => new Set(prev).add(nextQuestion));
            setQuestionCount(prev => prev + 1);
          } else {
            // All questions asked, move to Part 2
            nextQuestion = "Now, we'll move on to Part 2. I'm going to give you a topic and you'll have 1 minute to prepare. Then you should speak for 1-2 minutes.";
            setExamPart(2);
            setPreparationTime(60);
          }
        } else if (selectedTopic && questionCount < 4) {
          // Get unasked question from selected topic
          const topicQuestions = getRandomQuestions(selectedTopic, 'part1', 10); // Get more questions to avoid repeats
          const availableQuestions = topicQuestions.filter(q => !askedQuestions.has(q));
          if (availableQuestions.length > 0) {
            nextQuestion = availableQuestions[0];
            setAskedQuestions(prev => new Set(prev).add(nextQuestion));
            setQuestionCount(prev => prev + 1);
          } else {
            // All questions asked, move to Part 2
            nextQuestion = "Now, we'll move on to Part 2. I'm going to give you a topic and you'll have 1 minute to prepare. Then you should speak for 1-2 minutes.";
            setExamPart(2);
            setPreparationTime(60);
          }
        } else if (questionCount >= 4) {
          // Move to Part 2 after 4-5 questions
          nextQuestion = "Now, we'll move on to Part 2. I'm going to give you a topic and you'll have 1 minute to prepare. Then you should speak for 1-2 minutes.";
          setExamPart(2);
          setPreparationTime(60);
        } else {
          nextQuestion = await generateFollowUpQuestion(
            'Daily Life and Personal Information',
            capturedTranscript,
            'easy',
            1
          );
          setQuestionCount(prev => prev + 1);
        }
      } else if (examPart === 2) {
        // Generate Part 2 cue card from imported bank OR selected topic
        if (questionCount === 4) {
          // First time in Part 2, show cue card
          let cueCardData;
          if (importedBank && importedBank.part2CueCard) {
            cueCardData = importedBank.part2CueCard;
            nextQuestion = `${cueCardData.title}\n\nYou should say:\n${cueCardData.prompts.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nYou have 1 minute to prepare. You can make notes if you wish.`;
          } else if (selectedTopic) {
            cueCardData = getCueCard(selectedTopic);
            nextQuestion = `${cueCardData.title}\n\nYou should say:\n${cueCardData.prompts.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nYou have 1 minute to prepare. You can make notes if you wish.`;
          } else {
            const cueCard = await generatePart2CueCard();
            nextQuestion = `${cueCard.mainTopic}\n\n${cueCard.description}\n${cueCard.points.join('\n')}\n\nYou have 1 minute to prepare. You can make notes if you wish.`;
          }
          setQuestionCount(prev => prev + 1);
          
          // Start preparation timer
          setTimeout(async () => {
            const readyPrompt = "Alright, your preparation time is up. Please begin speaking now.";
            addMessage('examiner', readyPrompt);
            await speak(readyPrompt);
          }, 60000); // 60 seconds
        } else {
          // After Part 2 long turn, move to Part 3
          nextQuestion = "Thank you. Now let's discuss some more abstract questions related to this topic.";
          setExamPart(3);
          setQuestionCount(prev => prev + 1);
        }
      } else if (examPart === 3) {
        // Part 3: Use discussion questions from imported bank OR selected topic
        if (questionCount < 10) { // Limit to 4-5 Part 3 questions
          if (importedBank) {
            const availableQuestions = importedBank.part3Questions.filter(q => !askedQuestions.has(q));
            if (availableQuestions.length > 0) {
              nextQuestion = availableQuestions[0];
              setAskedQuestions(prev => new Set(prev).add(nextQuestion));
              setQuestionCount(prev => prev + 1);
            } else {
              // All questions asked, end exam
              await endExam();
              return;
            }
          } else if (selectedTopic) {
            const part3Questions = getRandomQuestions(selectedTopic, 'part3', 10);
            const availableQuestions = part3Questions.filter(q => !askedQuestions.has(q));
            if (availableQuestions.length > 0) {
              nextQuestion = availableQuestions[0];
              setAskedQuestions(prev => new Set(prev).add(nextQuestion));
              setQuestionCount(prev => prev + 1);
            } else {
              // All questions asked, end exam
              await endExam();
              return;
            }
          } else {
            nextQuestion = await generateFollowUpQuestion(
              'Abstract Discussion',
              capturedTranscript,
              'hard',
              3
            );
            setQuestionCount(prev => prev + 1);
          }
        } else {
          // End of exam after enough Part 3 questions
          await endExam();
          return;
        }
      }

      setCurrentQuestion(nextQuestion);
      addMessage('examiner', nextQuestion);
      
      // Speak the question
      await speak(nextQuestion);

    } catch (error) {
      console.error('Error processing response:', error);
      addMessage('examiner', "I'm sorry, could you please repeat that?");
    } finally {
      setIsProcessing(false);
    }
  };

  // End exam and generate feedback
  const endExam = async () => {
    setIsProcessing(true);
    
    const closingMessage = "Thank you! That's the end of the speaking test. Let me generate your feedback now.";
    addMessage('examiner', closingMessage);
    await speak(closingMessage);

    // Collect all student responses
    const studentResponses = messages
      .filter(m => m.role === 'student')
      .map(m => m.text)
      .join('\n\n');

    // Generate comprehensive feedback using Gemini (free) or fallback to Perplexity
    try {
      let feedback = '';
      
      if (isGeminiConfigured()) {
        console.log('🤖 Generating feedback with Google Gemini (FREE)...');
        feedback = await generateSpeakingFeedbackWithGemini(
          studentResponses,
          'Complete IELTS Speaking Test',
          6.0,
          2
        );
      } else {
        console.log('⚠️ Gemini not configured, using Perplexity fallback');
        console.log('Get free Gemini API key at: https://aistudio.google.com/apikey');
        feedback = await generateSpeakingFeedback(
          studentResponses,
          'Complete IELTS Speaking Test',
          6.0,
          2
        );
      }
      
      setSessionFeedback(feedback);
      setShowFeedback(true);
      
    } catch (error) {
      console.error('Error generating feedback:', error);
      setSessionFeedback('Sorry, there was an error generating feedback. Please try again or check your API configuration.');
      setShowFeedback(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset exam
  const resetExam = () => {
    setMessages([]);
    setExamStarted(false);
    setExamPart(1);
    setCurrentQuestion('');
    setShowFeedback(false);
    setSessionFeedback('');
    window.speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🎤 IELTS Speaking Practice
              </h1>
              <p className="text-gray-600">
                Interactive AI Examiner - Real-time Voice Conversation
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Current Part</div>
              <div className="text-3xl font-bold text-blue-600">
                Part {examPart}
              </div>
            </div>
          </div>
        </div>

        {!examStarted && !showFeedback ? (
          /* Welcome Screen */
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to IELTS Speaking Practice
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Practice with an AI examiner that speaks to you and listens to your responses.
              Get instant feedback on your performance!
            </p>

            {/* Topic/Import Selection Display */}
            {selectedTopic && (
              <div className="mb-6 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Selected Topic:</p>
                  <p className="text-lg font-bold text-orange-700">
                    {QUESTION_TOPICS[selectedTopic]}
                  </p>
                  <button
                    onClick={() => setShowTopicSelector(true)}
                    className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium underline"
                  >
                    Change Topic
                  </button>
                </div>
              </div>
            )}

            {importedBank && (
              <div className="mb-6 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Using Custom Questions:</p>
                  <p className="text-lg font-bold text-purple-700">
                    {importedBank.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {importedBank.part1Questions.length} Part 1 questions, {importedBank.part3Questions.length} Part 3 questions
                  </p>
                  <button
                    onClick={() => {
                      setImportedBank(null);
                      setShowTopicSelector(true);
                    }}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium underline"
                  >
                    Clear & Select Topic Instead
                  </button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-3">🗣️</div>
                <h3 className="font-semibold text-lg mb-2">AI Speaks to You</h3>
                <p className="text-sm text-gray-600">
                  The AI examiner asks questions using voice
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-3xl mb-3">🎤</div>
                <h3 className="font-semibold text-lg mb-2">You Speak Back</h3>
                <p className="text-sm text-gray-600">
                  Answer questions by speaking naturally
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-lg mb-2">Get Feedback</h3>
                <p className="text-sm text-gray-600">
                  Receive detailed IELTS band score feedback
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 max-w-2xl mx-auto">
              <p className="text-sm text-gray-700">
                ⚠️ <strong>Important:</strong> Please allow microphone access when prompted.
                Make sure you're in a quiet environment for best results.
              </p>
            </div>

            {/* Whisper Status Indicator */}
            <div className={`max-w-2xl mx-auto mb-8 p-4 rounded-lg border ${
              whisperStatus === 'ready' 
                ? 'bg-green-50 border-green-300' 
                : whisperStatus === 'loading'
                ? 'bg-blue-50 border-blue-300'
                : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center gap-3">
                {whisperStatus === 'ready' && (
                  <>
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-green-800">Whisper AI Ready!</p>
                      <p className="text-sm text-green-700">
                        Professional speech recognition with 95% accuracy (FREE!)
                      </p>
                    </div>
                  </>
                )}
                {whisperStatus === 'loading' && (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <div>
                      <p className="font-semibold text-blue-800">Loading Whisper AI...</p>
                      <p className="text-sm text-blue-700">
                        First-time download (~150MB). Next time will be instant!
                      </p>
                    </div>
                  </>
                )}
                {whisperStatus === 'error' && (
                  <>
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="font-semibold text-red-800">Whisper AI Failed to Load</p>
                      <p className="text-sm text-red-700">
                        Please check your internet connection and refresh the page.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Gemini Status Indicator */}
            {!isGeminiConfigured() && (
              <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg border bg-orange-50 border-orange-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔑</span>
                  <div>
                    <p className="font-semibold text-orange-800">Get FREE Gemini API Key</p>
                    <p className="text-sm text-orange-700 mb-2">
                      For AI-powered feedback, get a free Gemini API key (1500 requests/day, no credit card!)
                    </p>
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-800 font-medium underline"
                    >
                      Get Free API Key →
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
              {!selectedTopic && !importedBank ? (
                <>
                  <button
                    onClick={() => setShowTopicSelector(true)}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xl font-semibold rounded-xl hover:shadow-lg transition"
                  >
                    📚 Choose Topic to Start
                  </button>
                  <button
                    onClick={() => setShowImporter(true)}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-xl hover:shadow-lg transition"
                  >
                    📥 Import Your Questions
                  </button>
                </>
              ) : (
                <button
                  onClick={startExam}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
                >
                  🎯 Start Speaking Practice
                </button>
              )}
            </div>
          </div>
        ) : showFeedback ? (
          /* Feedback Screen */
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              📊 Your Performance Feedback
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {sessionFeedback}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetExam}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                🔄 Practice Again
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([sessionFeedback], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `IELTS_Feedback_${new Date().toISOString().split('T')[0]}.txt`;
                  a.click();
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                📥 Download Feedback
              </button>
            </div>
          </div>
        ) : (
          /* Exam Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chat/Conversation Panel */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  💬 Conversation
                </h2>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Part {examPart}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {messages.filter(m => m.role === 'student').length} Responses
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-[500px] overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👋</div>
                      <p>Waiting for exam to start...</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === 'student'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">
                            {message.role === 'student' ? '🎤 You' : '👨‍🏫 Examiner'}
                          </span>
                          <span className={`text-xs ${message.role === 'student' ? 'text-blue-200' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </div>
                  ))
                )}

                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600">Examiner is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                {isCapturingAnswer && (
                  <div className="flex justify-end">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg max-w-[80%]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="animate-pulse rounded-full h-3 w-3 bg-green-500"></div>
                        <span className="text-green-700 font-semibold text-sm">🎤 Listening...</span>
                      </div>
                      
                      {/* Audio Level Meter */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-600">Audio Level:</span>
                          <span className="text-xs font-mono text-gray-700">{Math.round(audioLevel)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-100 ${
                              audioLevel > 50 ? 'bg-green-500' : 
                              audioLevel > 20 ? 'bg-yellow-500' : 
                              'bg-red-400'
                            }`}
                            style={{ width: `${Math.min(100, audioLevel)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {audioLevel < 10 && "🔇 Speak louder or move closer to mic"}
                          {audioLevel >= 10 && audioLevel < 30 && "📢 Good, speak a bit louder"}
                          {audioLevel >= 30 && "✅ Perfect volume!"}
                        </p>
                      </div>
                      
                      {/* Recording Status */}
                      <p className="text-gray-600 text-sm italic">Recording with Whisper AI... 🎙️</p>
                      <p className="text-gray-500 text-xs">Speak clearly for 3-10 seconds</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recording Controls */}
              <div className="flex gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">🎤</span>
                    Start Speaking
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition font-semibold text-lg flex items-center justify-center gap-2 animate-pulse"
                  >
                    <span className="text-2xl">⏹️</span>
                    Stop Speaking
                  </button>
                )}
                
                <button
                  onClick={endExam}
                  disabled={messages.length < 3}
                  className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
                >
                  🏁 Finish & Get Feedback
                </button>
              </div>

              {isRecording && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-red-800">Recording with Whisper AI...</p>
                      <p className="text-sm text-red-600">Speak clearly - transcription will be shown after you stop</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              
              {/* Current Question */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  📝 Current Question
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {currentQuestion || 'Waiting for question...'}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  ℹ️ Instructions
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span>1️⃣</span>
                    <span>Listen to the examiner's question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>2️⃣</span>
                    <span>Click "Start Speaking" to answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>3️⃣</span>
                    <span>Speak clearly into your microphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>4️⃣</span>
                    <span>Click "Stop Speaking" when done</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>5️⃣</span>
                    <span>AI will ask follow-up questions</span>
                  </li>
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  💡 Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Speak naturally and clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Take your time to think</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Elaborate on your answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Use varied vocabulary</span>
                  </li>
                </ul>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetExam}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                🔄 Restart Practice
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Topic Selector Modal */}
      {showTopicSelector && (
        <TopicSelector
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => {
            setSelectedTopic(topic);
            setImportedBank(null); // Clear imported bank when selecting a topic
            if (!examStarted) {
              startExam();
            }
          }}
          onClose={() => setShowTopicSelector(false)}
        />
      )}

      {/* Question Bank Importer Modal */}
      {showImporter && (
        <QuestionBankImporter
          onImport={(bank) => {
            setImportedBank(bank);
            setSelectedTopic(null); // Clear topic when importing
            setShowImporter(false);
            if (!examStarted) {
              startExam();
            }
          }}
          onClose={() => setShowImporter(false)}
        />
      )}
    </div>
  );
}
