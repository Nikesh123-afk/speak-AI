/**
 * Topic Selector Component
 * Allows users to choose IELTS speaking topics
 */

import { QUESTION_TOPICS, TopicKey } from '../lib/question-banks';

interface TopicSelectorProps {
  selectedTopic: TopicKey | null;
  onSelectTopic: (topic: TopicKey) => void;
  onClose: () => void;
}

export function TopicSelector({ selectedTopic, onSelectTopic, onClose }: TopicSelectorProps) {
  const topics: { key: TopicKey; name: string; icon: string; color: string }[] = [
    { key: 'WORK_STUDY', name: QUESTION_TOPICS.WORK_STUDY, icon: '💼', color: 'from-blue-500 to-blue-600' },
    { key: 'HOMETOWN', name: QUESTION_TOPICS.HOMETOWN, icon: '🏠', color: 'from-green-500 to-green-600' },
    { key: 'HOBBIES', name: QUESTION_TOPICS.HOBBIES, icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { key: 'FOOD', name: QUESTION_TOPICS.FOOD, icon: '🍔', color: 'from-orange-500 to-orange-600' },
    { key: 'TRAVEL', name: QUESTION_TOPICS.TRAVEL, icon: '✈️', color: 'from-cyan-500 to-cyan-600' },
    { key: 'TECHNOLOGY', name: QUESTION_TOPICS.TECHNOLOGY, icon: '💻', color: 'from-indigo-500 to-indigo-600' },
    { key: 'FAMILY', name: QUESTION_TOPICS.FAMILY, icon: '👨‍👩‍👧‍👦', color: 'from-pink-500 to-pink-600' },
    { key: 'ENVIRONMENT', name: QUESTION_TOPICS.ENVIRONMENT, icon: '🌱', color: 'from-emerald-500 to-emerald-600' },
    { key: 'HEALTH', name: QUESTION_TOPICS.HEALTH, icon: '💪', color: 'from-red-500 to-red-600' },
    { key: 'CULTURE', name: QUESTION_TOPICS.CULTURE, icon: '🎭', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Topic</h2>
              <p className="text-orange-100">Select a topic to practice speaking questions</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.key}
                onClick={() => {
                  onSelectTopic(topic.key);
                  onClose();
                }}
                className={`
                  relative p-6 rounded-xl border-2 transition-all transform hover:scale-105
                  ${selectedTopic === topic.key 
                    ? 'border-orange-500 bg-orange-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                  }
                `}
              >
                {/* Selected Indicator */}
                {selectedTopic === topic.key && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${topic.color} rounded-full flex items-center justify-center text-3xl shadow-lg`}>
                  {topic.icon}
                </div>

                {/* Topic Name */}
                <h3 className="text-lg font-bold text-gray-900 text-center">
                  {topic.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 text-center mt-2">
                  Practice questions about {topic.name.toLowerCase()}
                </p>
              </button>
            ))}
          </div>

          {/* Random Topic Option */}
          <button
            onClick={() => {
              const randomTopic = topics[Math.floor(Math.random() * topics.length)].key;
              onSelectTopic(randomTopic);
              onClose();
            }}
            className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Surprise Me! (Random Topic)
          </button>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 p-4 rounded-b-2xl border-t">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Tip:</span> Each topic contains unique Part 1, Part 2, and Part 3 questions.
            You can change topics anytime during practice.
          </p>
        </div>
      </div>
    </div>
  );
}
