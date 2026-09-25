import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Bot, User, MapPin } from 'lucide-react';

export default function AIDocentChat({
  isOpen,
  onClose,
  currentStop,
  tour,
  initialPrompt,
  lang
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: lang === 'kr'
        ? `안녕하세요! GOLMO AI 로컬 도슨트입니다. 현재 '${currentStop ? currentStop.titleKr : '서촌'}' 주변에 계시네요. 골목의 역사나 숨겨진 카페, 건축의 유래 등 무엇이든 편하게 물어보세요!`
        : `Annyeong! I'm your GOLMO AI Local Docent. You are currently exploring around "${currentStop ? currentStop.title : 'Seochon'}". Ask me anything about this alley, its history, or secret spots nearby!`
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle preset prompt click
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const suggestionChips = [
    currentStop?.suggestedDocentPrompt || "What's the best hidden cafe in this alley?",
    "Why are the roofs in Seochon curved like that?",
    "Where did local poets like to drink makgeolli?",
    "How is Seochon different from Bukchon?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Knowledge base responses for Seochon local guide
    setTimeout(() => {
      let replyText = "";
      const lower = query.toLowerCase();

      if (lower.includes('court') || lower.includes('yeongchumun') || lower.includes('gate') || lower.includes('palace')) {
        replyText = `Yeongchumun (Gate of Autumn Breeze) was the west gate of Gyeongbokgung. Unlike the grand Gwanghwamun where foreign dignitaries marched, Yeongchumun was the 'daily life portal' used by court astronomers, royal physicians, and palace ladies. When dusk fell, scholars and artists slipped out through this gate into the cozy pubs and hanoks of Seochon to compose poetry and discuss forbidden ideas!`;
      } else if (lower.includes('cafe') || lower.includes('coffee') || lower.includes('tea')) {
        replyText = `Here are 2 authentic local gems right in this alley:
1. 'Boan Books & Cafe' (2F of Boan Stay) - Overlooks the palace stone walls with quiet jazz and filtered drip coffee.
2. 'MK2' (just 3 mins walk from Nuha-dong) - A legendary Seochon pioneer with Bauhaus furniture and decadent apricot tarts.`;
      } else if (lower.includes('yi sang') || lower.includes('poet') || lower.includes('modern boy')) {
        replyText = `In 1930s colonial Seoul, 'Modern Boys' and 'Modern Girls' were rebellious youth who embraced Western jazz, trench coats, espresso, and avant-garde art. Yi Sang was their tragic icon—an architectural engineer who wrote poetry backward and explored surrealism in narrow Seochon rooms while running bohemian cafes that always went bankrupt!`;
      } else if (lower.includes('roof') || lower.includes('hanok') || lower.includes('narrow')) {
        replyText = `The roofs curve gently like a falcon's wings to control sunlight and monsoon rain. In summer, the steep overhang blocks the high midday sun while scooping up cool mountain breezes from Mount Inwangsan. In winter, the low sunbeams slide deep into the wooden ondol rooms. The alleys in Nuha-dong remain narrow because they followed the natural water drainage streams from centuries ago!`;
      } else if (lower.includes('bukchon') || lower.includes('difference')) {
        replyText = `Bukchon ('North Village') was historically where high-ranking yangban nobility and royal in-laws built sprawling mansions. Seochon ('West Village') was the realm of the 'Jungin' (middle class)—court interpreters, painters, calligraphers, and doctors. That's why Seochon feels far more intimate, bohemian, and lived-in!`;
      } else {
        replyText = `That's a wonderful detail to notice! Seochon is defined by layers of 600 years: Joseon scholars, 1930s modernist writers, 1970s blue-collar neighborhoods, and today's quiet indie workshops. Right around your current spot (${currentStop?.title || 'Seochon'}), if you peek into the side alleys, you'll see original granite foundation stones from centuries ago sitting beneath contemporary brick walls.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: replyText
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-drawer">
      <div className="modal-header">
        <div className="modal-title">
          <Sparkles size={18} color="#f59e0b" />
          <span>Ask GOLMO AI Docent</span>
          {currentStop && (
            <span style={{ fontSize: '0.75rem', background: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', padding: '2px 8px', borderRadius: '12px' }}>
              Near Stop {currentStop.order}
            </span>
          )}
        </div>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.sender}`}>
            {m.sender === 'assistant' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.72rem', color: '#ea580c' }}>
                <Bot size={13} />
                <span>GOLMO Local Guide</span>
              </div>
            )}
            <div>{m.text}</div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble assistant" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
            GOLMO AI is searching alley archives...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips */}
      <div className="chat-suggestions">
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            className="suggestion-chip"
            onClick={() => handleSend(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder={lang === 'kr' ? "골목에 대해 무엇이든 물어보세요..." : "Ask about this alley, food, or history..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send-btn" onClick={() => handleSend()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
