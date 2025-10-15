/**
 * Professional IELTS Speaking AI Landing Page
 * Complete modern UI with all sections
 */

import { useState } from 'react';
import { InteractiveSpeakingPractice } from './InteractiveSpeakingPractice';
import { LoginModal } from './LoginModal';
import { UserDashboard } from './UserDashboard';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const [showPractice, setShowPractice] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  const { user, isAuthenticated, login, signup } = useAuth();

  if (showPractice) {
    return <InteractiveSpeakingPractice />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      
      {/* HEADER / NAVBAR */}
      <header className="fixed top-0 w-full bg-white/98 backdrop-blur-md shadow-md z-50 border-b border-orange-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">IELTS Fluent AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition font-medium">Home</a>
              <a href="#practice" className="text-gray-600 hover:text-blue-600 transition font-medium">Practice</a>
              <a href="#progress" className="text-gray-600 hover:text-blue-600 transition font-medium">Progress</a>
              <a href="#resources" className="text-gray-600 hover:text-blue-600 transition font-medium">Resources</a>
              
              {isAuthenticated ? (
                <button 
                  onClick={() => setShowDashboard(true)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user?.name}
                </button>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <a href="#home" className="block py-2 text-gray-600 hover:text-blue-600">Home</a>
              <a href="#practice" className="block py-2 text-gray-600 hover:text-blue-600">Practice</a>
              <a href="#progress" className="block py-2 text-gray-600 hover:text-blue-600">Progress</a>
              <a href="#resources" className="block py-2 text-gray-600 hover:text-blue-600">Resources</a>
              
              {isAuthenticated ? (
                <button 
                  onClick={() => setShowDashboard(true)}
                  className="mt-2 w-full px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg"
                >
                  {user?.name}
                </button>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="mt-2 w-full px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
        onSignup={signup}
      />

      {/* User Dashboard */}
      {showDashboard && (
        <UserDashboard onClose={() => setShowDashboard(false)} />
      )}

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 overflow-hidden border-b-4 border-orange-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6 border border-orange-200">
              <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              AI-Powered IELTS Speaking Coach
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master IELTS Speaking <br/>
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get instant band scores, personalized feedback, and practice with an AI examiner 24/7. 
              Achieve your target score faster!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowPractice(true)}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Free Practice
              </button>
              <button className="px-8 py-4 bg-white border-2 border-orange-300 text-orange-700 text-lg font-semibold rounded-xl hover:border-orange-600 hover:bg-orange-50 transition shadow-md">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              <svg className="w-4 h-4 inline-block text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required  
              <svg className="w-4 h-4 inline-block text-green-500 ml-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              3 free practice sessions  
              <svg className="w-4 h-4 inline-block text-green-500 ml-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Instant feedback
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="practice" className="py-20 bg-gradient-to-br from-white via-cream-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose IELTS Fluent AI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practice like you're in the real exam with our advanced AI examiner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition transform hover:scale-105 border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real Exam Simulation</h3>
              <p className="text-gray-600">
                Practice all 3 parts of the IELTS Speaking test with an AI examiner that follows official guidelines and timing.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Part 1: Introduction
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Part 2: Long Turn
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Part 3: Discussion
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 hover:shadow-xl transition transform hover:scale-105 border border-amber-200">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Feedback</h3>
              <p className="text-gray-600">
                Get detailed band scores and personalized feedback immediately after each practice session.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Band score breakdown
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Grammar analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Vocabulary suggestions
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 hover:shadow-xl transition transform hover:scale-105 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">24/7 Practice</h3>
              <p className="text-gray-600">
                Practice anytime, anywhere. Our AI examiner is always available, no scheduling needed.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Unlimited practice
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> No time constraints
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Track your progress
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-y-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-1 bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-300"></div>

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Select Mode</h3>
              <p className="text-gray-600 mb-4">
                Choose from Quick Practice, Full Test, or Topic-Based practice modes.
              </p>
              <div className="bg-white rounded-lg p-4 shadow-md border border-orange-100">
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">⚡</span> Quick (5 min)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600">📝</span> Full Test (11-14 min)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">🎯</span> Topic-Based
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Record Answers</h3>
              <p className="text-gray-600 mb-4">
                AI asks questions like a real examiner. Speak naturally into your microphone.
              </p>
              <div className="bg-white rounded-lg p-4 shadow-md border border-amber-100">
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🎤</span> Voice recognition
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🗣️</span> Natural conversation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">⏱️</span> Real-time recording
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-white text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">View Detailed Feedback</h3>
              <p className="text-gray-600 mb-4">
                Get comprehensive analysis with band scores and improvement suggestions.
              </p>
              <div className="bg-white rounded-lg p-4 shadow-md border border-yellow-100">
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span> Band score 1-9
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">📊</span> Detailed breakdown
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">💡</span> Improvement tips
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE PREVIEW SECTION */}
      <section className="py-20 bg-gradient-to-br from-white via-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Try It Now - Free Sample</h2>
            <p className="text-xl text-gray-600">Experience the AI examiner with a quick practice question</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 shadow-xl border-2 border-orange-200">
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 border border-orange-200">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-orange-600 mb-2 font-semibold">Sample Part 1 Question</p>
                  <p className="text-lg text-gray-800 font-medium">
                    "Let's talk about your hometown. Where are you from?"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowPractice(true)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                Record Your Answer
              </button>
              <button className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 transition font-semibold">
                View Sample Feedback
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600 bg-white/50 rounded-lg p-3 border border-orange-200">
              Click "Record" to practice with full voice interaction and get instant AI feedback!
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-y-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Join thousands who improved their IELTS speaking scores</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ramesh Kumar</h4>
                  <p className="text-sm text-gray-500">Nepal</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I improved from 5.5 to 7.0 in just 2 months! The AI feedback helped me identify exactly where I was making mistakes."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                  5.5 → 7.0
                </span>
                <span className="text-gray-500">in 2 months</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  L
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Li Wei</h4>
                  <p className="text-sm text-gray-500">China</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                "The 24/7 availability is perfect for my schedule. I could practice anytime and track my progress clearly."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                  6.0 → 7.5
                </span>
                <span className="text-gray-500">in 3 months</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Maria Garcia</h4>
                  <p className="text-sm text-gray-500">Spain</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The instant feedback is incredibly detailed. It's like having a personal IELTS tutor available all the time!"
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                  6.5 → 8.0
                </span>
                <span className="text-gray-500">in 6 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-white via-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">3 practice sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Basic feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Part 1 only</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-300 text-xl">✗</span>
                  <span className="text-gray-400">No progress tracking</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowPractice(true)}
                className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold"
              >
                Start Free
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-2xl p-8 shadow-2xl transform scale-105 relative border-2 border-orange-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$15</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-white">Unlimited practice</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-white">All Parts 1, 2, 3</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-white">Detailed feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-white">Progress tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span className="text-white">Email support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white text-orange-600 rounded-xl hover:bg-gray-100 transition font-semibold shadow-lg">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$35</span>
                <span className="text-gray-500">/3 months</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Everything in Standard</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Mock test suite</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Vocabulary builder</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Certificate</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition font-semibold">
                Get Premium
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-gray-500">
            All plans include access to AI examiner, instant feedback, and mobile app
          </p>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 border-y-4 border-orange-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Boost Your IELTS Speaking Score?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join 10,000+ students who achieved their target scores with our AI examiner
          </p>
          <button 
            onClick={() => setShowPractice(true)}
            className="px-12 py-4 bg-white text-orange-600 text-xl font-bold rounded-xl hover:shadow-2xl transition transform hover:scale-105 shadow-xl"
          >
            <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started Free
          </button>
          <p className="mt-4 text-orange-100 text-sm">
            No credit card required • 3 free sessions • Cancel anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">IELTS Fluent AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Master IELTS Speaking with AI-powered practice and instant feedback.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Practice</a></li>
                <li><a href="#resources" className="hover:text-white transition">Resources</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">
                Get tips and updates delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 IELTS Fluent AI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                <span className="text-sm">𝕏</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
