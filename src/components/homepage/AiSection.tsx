'use client';

import React, { useState } from 'react';

const AISection: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);
  const [question, setQuestion] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<{ question: string; answer: string }[]>([]);
  const [displayedText, setDisplayedText] = useState<string>('');

  const qnaTemplates: { question: string; answer: string }[] = [
    { question: 'What is Rockstock?', answer: 'Rockstock is a furniture brand for those who live loud, with bold gothic and emo-inspired designs.' },
    { question: 'Who is Rockstock for?', answer: 'For those who still embrace their dark aesthetic and want furniture that speaks to their identity.' },
    { question: 'Where is Rockstock based?', answer: 'Rockstock operates online, shipping to various locations with a strong focus on quality and style.' },
    { question: 'How can I order from Rockstock?', answer: 'Simply browse our catalog online, add to cart, and proceed with secure checkout.' },
    { question: 'What materials are used in Rockstock furniture?', answer: 'We use high-quality, durable materials like reclaimed wood, metal, and leather to give our furniture a unique, bold look.' },
    { question: 'Is Rockstock eco-friendly?', answer: 'Yes, Rockstock aims to reduce environmental impact by using sustainable materials and eco-friendly manufacturing processes.' },
    { question: 'Can I customize my Rockstock furniture?', answer: 'Yes, we offer customization options to make your furniture uniquely yours.' },
    { question: 'What is the warranty for Rockstock furniture?', answer: 'We offer a 5-year warranty on all our furniture, ensuring durability and quality.' },
    { question: 'Can I track my order from Rockstock?', answer: 'Yes, once your order is shipped, we’ll provide a tracking number to follow your shipment.' },
    { question: 'Does Rockstock offer international shipping?', answer: 'Yes, Rockstock ships internationally, though shipping fees and availability may vary based on location.' },
  ];

  const handleSend = (query: string) => {
    if (query.trim() === '') return;

    setQuestion(query);
    setIsThinking(true);
    setDisplayedText('');

    const matchedResponse = qnaTemplates.find(qna => query.toLowerCase().includes(qna.question.toLowerCase()));
    const fullResponse = matchedResponse ? matchedResponse.answer : `Not sure about that, but let's just say, Rockstock never plays it safe.`;

    setTimeout(() => {
      setIsThinking(false);
      setResponses([fullResponse]);

      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayedText(fullResponse.slice(0, i));
        i++;
        if (i > fullResponse.length) clearInterval(typingInterval);
      }, 50);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      const filteredSuggestions = qnaTemplates
        .map(qna => qna)
        .filter(qna => qna.question.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3); // Limit suggestions to top 3 matches

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const resetChat = () => {
    setInput('');
    setQuestion(null);
    setResponses([]);
    setDisplayedText('');
    setSuggestions([]);
  };

  return (
    <div className="py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl mb-8 font-bold text-black">Rockstock AI. Ask me anything.</h2>

        {!question && (
          <div className="flex flex-col relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask something..."
              className="border border-black text-black rounded-md p-2"
            />
            
            <div className="mt-2 space-y-2">
              {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="text-left bg-white p-2 rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSend(suggestion.question)}
                >
                  <p className="font-semibold text-black">{suggestion.question}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSend(input)}
              className="border-2 border-red-600 text-red-600 rounded-md p-2 mt-4 hover:bg-red-600 hover:text-white transition duration-300"
            >
              Send
            </button>
          </div>
        )}

        {question && (
          <div className="mt-8">
            <p className="font-semibold text-black">{question}</p>
            {isThinking ? (
              <p className="text-gray-500 mt-2">Thinking...</p>
            ) : (
              <p className="mt-4 text-black">{displayedText}</p>
            )}

            {!isThinking && displayedText === responses[0] && (
              <button
                onClick={resetChat}
                className="mt-6 border-2 border-red-600 text-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white transition duration-300"
              >
                Ask Another
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISection;
