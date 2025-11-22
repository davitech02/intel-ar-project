"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button, Spinner } from 'react-bootstrap';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I am the Intel-AR Assistant. How can I help you manage your ICN nodes today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await res.json();
      
      const botMsg: Message = { 
        id: Date.now() + 1, 
        text: data.reply || "Sorry, I couldn't connect to the server.", 
        sender: 'bot' 
      };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: Date.now(), text: "Network error. Please ensure the backend is running.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. The Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="position-fixed border-0 shadow-lg d-flex align-items-center justify-content-center bg-primary text-white"
        style={{
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          zIndex: 9999,
          cursor: 'pointer'
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* 2. The Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="position-fixed bg-white shadow-lg d-flex flex-column"
            style={{
              bottom: '100px',
              right: '30px',
              width: '350px',
              height: '500px',
              borderRadius: '20px',
              zIndex: 9999,
              overflow: 'hidden',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-3 d-flex align-items-center gap-2">
              <div className="bg-white bg-opacity-25 p-2 rounded-circle">
                <Bot size={20} />
              </div>
              <div>
                <h6 className="mb-0 fw-bold" style={{fontFamily: "'Poppins', sans-serif"}}>Intel-AR Support</h6>
                <span className="small opacity-75">Always online</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow-1 p-3 overflow-auto" style={{ backgroundColor: '#f8f9fa' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="bg-secondary bg-opacity-10 p-1 rounded-circle me-2 align-self-end" style={{width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Bot size={16} className="text-primary"/>
                    </div>
                  )}
                  
                  <div
                    className={`p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-dark border'
                    }`}
                    style={{
                      maxWidth: '80%',
                      borderRadius: '12px',
                      borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                      borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="d-flex justify-content-start mb-3">
                    <div className="bg-white text-secondary p-3 rounded-3 shadow-sm border">
                        <Spinner animation="grow" size="sm" /> <span className="small ms-2">Thinking...</span>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-top">
              <form onSubmit={sendMessage} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Type a question..."
                  style={{ borderRadius: '20px' }}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', padding: 0 }}
                  disabled={isLoading}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}