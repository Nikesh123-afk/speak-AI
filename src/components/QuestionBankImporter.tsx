/**
 * Custom Question Bank Import Component
 * Allows users to upload their own question banks
 */

import { useState } from 'react';

interface ImportedQuestionBank {
  name: string;
  part1Questions: string[];
  part2CueCard?: {
    title: string;
    prompts: string[];
  };
  part3Questions: string[];
}

interface QuestionBankImporterProps {
  onImport: (questionBank: ImportedQuestionBank) => void;
  onClose: () => void;
}

export function QuestionBankImporter({ onImport, onClose }: QuestionBankImporterProps) {
  const [importMethod, setImportMethod] = useState<'file' | 'paste' | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [bankName, setBankName] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        parseAndImport(text, file.name.replace(/\.[^/.]+$/, ''));
      } catch (err) {
        setError('Failed to read file. Please check the format.');
      }
    };

    if (file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      setError('Please upload a .json, .txt, or .csv file');
    }
  };

  const parseAndImport = (text: string, name: string) => {
    try {
      // Try parsing as JSON first
      const data = JSON.parse(text);
      
      if (data.part1Questions && data.part3Questions) {
        onImport({
          name: data.name || name || 'Custom Bank',
          part1Questions: data.part1Questions,
          part2CueCard: data.part2CueCard,
          part3Questions: data.part3Questions,
        });
        onClose();
        return;
      }
    } catch {
      // If JSON fails, try parsing as text
      const lines = text.split('\n').filter(line => line.trim());
      
      const part1Questions: string[] = [];
      const part3Questions: string[] = [];
      let currentSection = '';
      let cueCardTitle = '';
      let cueCardPrompts: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.toLowerCase().includes('part 1') || trimmed.toLowerCase().includes('part1')) {
          currentSection = 'part1';
          continue;
        }
        if (trimmed.toLowerCase().includes('part 2') || trimmed.toLowerCase().includes('part2')) {
          currentSection = 'part2';
          continue;
        }
        if (trimmed.toLowerCase().includes('part 3') || trimmed.toLowerCase().includes('part3')) {
          currentSection = 'part3';
          continue;
        }

        if (currentSection === 'part1' && trimmed && !trimmed.startsWith('#')) {
          part1Questions.push(trimmed.replace(/^[-•*]\s*/, ''));
        } else if (currentSection === 'part2') {
          if (trimmed.toLowerCase().startsWith('describe') || trimmed.toLowerCase().startsWith('talk about')) {
            cueCardTitle = trimmed;
          } else if (trimmed && !trimmed.startsWith('#')) {
            cueCardPrompts.push(trimmed.replace(/^[-•*\d.]\s*/, ''));
          }
        } else if (currentSection === 'part3' && trimmed && !trimmed.startsWith('#')) {
          part3Questions.push(trimmed.replace(/^[-•*]\s*/, ''));
        }
      }

      if (part1Questions.length > 0 || part3Questions.length > 0) {
        onImport({
          name: bankName || name || 'Custom Bank',
          part1Questions: part1Questions.length > 0 ? part1Questions : ['What is your name?'],
          part2CueCard: cueCardTitle ? { title: cueCardTitle, prompts: cueCardPrompts } : undefined,
          part3Questions: part3Questions.length > 0 ? part3Questions : part1Questions,
        });
        onClose();
        return;
      }
    }

    setError('Could not parse the question bank. Please check the format.');
  };

  const handlePasteImport = () => {
    if (!pastedText.trim()) {
      setError('Please paste some questions');
      return;
    }
    parseAndImport(pastedText, bankName || 'Custom Bank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">📥 Import Question Bank</h2>
              <p className="text-purple-100">Upload your own IELTS speaking questions</p>
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

        <div className="p-6">
          {/* Method Selection */}
          {!importMethod && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Import Method:</h3>
              
              <button
                onClick={() => setImportMethod('file')}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Upload File</h4>
                    <p className="text-sm text-gray-600">Upload a .json, .txt, or .csv file</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setImportMethod('paste')}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Paste Text</h4>
                    <p className="text-sm text-gray-600">Copy and paste questions directly</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* File Upload */}
          {importMethod === 'file' && (
            <div className="space-y-4">
              <button
                onClick={() => setImportMethod(null)}
                className="text-purple-600 hover:text-purple-700 font-medium mb-4"
              >
                ← Back to methods
              </button>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept=".json,.txt,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: .json, .txt, .csv
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Paste Text */}
          {importMethod === 'paste' && (
            <div className="space-y-4">
              <button
                onClick={() => setImportMethod(null)}
                className="text-purple-600 hover:text-purple-700 font-medium mb-4"
              >
                ← Back to methods
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Bank Name
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g., My Custom Questions"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Your Questions
                </label>
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your questions here... (See format below)"
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                />
              </div>

              <button
                onClick={handlePasteImport}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Import Questions
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Format Guide */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3">📋 Format Guide:</h4>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800 mb-2">Option 1: JSON Format</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto">
{`{
  "name": "My Questions",
  "part1Questions": [
    "What is your favorite color?",
    "Do you like reading books?"
  ],
  "part2CueCard": {
    "title": "Describe your favorite book",
    "prompts": [
      "What the book is about",
      "When you read it",
      "Why you like it"
    ]
  },
  "part3Questions": [
    "How important is reading?",
    "Will books disappear?"
  ]
}`}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-2">Option 2: Text Format</p>
                <pre className="bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto">
{`PART 1
- What is your favorite color?
- Do you like reading books?

PART 2
Describe your favorite book
- What the book is about
- When you read it
- Why you like it

PART 3
- How important is reading?
- Will books disappear in the future?`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
