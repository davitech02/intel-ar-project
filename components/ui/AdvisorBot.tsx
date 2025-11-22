// components/ui/AdvisorBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { Spinner, Button } from 'react-bootstrap'; // <-- FIX: IMPORTED BUTTON

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const AdvisorBot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = language === 'fr' 
        ? "Bonjour ! Je suis l'assistant virtuel d'Intel-Ar. Comment puis-je vous aider aujourd'hui ?"
        : "Hello! I am Intel-Ar's virtual assistant. How can I help you today?";
      setMessages([{ sender: 'bot', text: welcomeMessage }]);
    }
  }, [isOpen, language, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/advisorbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, language: language }),
      });
      const data = await response.json();

      if (response.ok) {
        const newBotMessage: Message = { sender: 'bot', text: data.reply };
        setMessages(prev => [...prev, newBotMessage]);
      } else {
        const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting." };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // --- FIX: Using the 'error' variable ---
      console.error("AdvisorBot API error:", error);
      const errorMessage: Message = { sender: 'bot', text: "Sorry, an error occurred." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const botStyles: React.CSSProperties = { /* ... */ };
  const chatWindowStyles: React.CSSProperties = { /* ... */ };

  return (
    <div style={botStyles}>
      <div style={chatWindowStyles}>
        <div style={{ backgroundColor: 'var(--midnight-blue)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 className="mb-0">{language === 'fr' ? 'Conseiller IA' : 'AI Advisor'}</h5>
          <FaTimes style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
        </div>
        <div style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#f1f5f9' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ backgroundColor: msg.sender === 'user' ? 'var(--cyan)' : 'white', color: msg.sender === 'user' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '1rem', maxWidth: '80%' }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-center"><Spinner size="sm" /></div>}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '0.5rem', borderTop: '1px solid #ddd' }}>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={language === 'fr' ? 'Posez une question...' : 'Ask a question...'} className="form-control border-0" style={{ flexGrow: 1, boxShadow: 'none' }} />
          <Button type="submit" variant="link" className="text-info fs-4" disabled={isLoading}>
            <FaPaperPlane />
          </Button>
        </form>
      </div>
      <Button
        className="btn-cyan rounded-circle shadow-lg"
        style={{ width: '60px', height: '60px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaComments />
      </Button>
    </div>
  );
};

export default AdvisorBot;