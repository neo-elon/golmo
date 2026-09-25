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

      if (lower.includes('cheongna') || lower.includes('waterway') || lower.includes('canal')) {
        replyText = lang === 'kr'
          ? `청라국제도시는 대한민국 최초로 도시 전체를 순환하는 4.5km 인공 수로 '커낼웨이(Canal Way)'를 중심으로 설계된 첨단 수변 도시입니다. 한강과 서해의 지류를 순환 정화하는 친환경 수로를 따라 차도와 분리된 산책로가 조성되어 있어, 도심 속에서도 물소리를 들으며 안전하고 평화롭게 걸을 수 있습니다!`
          : `Cheongna is Korea's premier water-centric international city, built around a continuous 4.5km canal system called 'Canal Way'. The sunken pedestrian promenade separates walkers completely from vehicle traffic, circulating fresh water through smart eco-wetlands right into the grand Central Lake Park!`;
      } else if (lower.includes('fountain') || lower.includes('musical') || lower.includes('lake')) {
        replyText = lang === 'kr'
          ? `청라호수공원 음악분수는 국내 최대 규모(길이 120m, 최대 분사 높이 70m)의 수변 무대입니다! 클래식, 최신 K-POP, 영화 OST에 맞춰 춤추는 물줄기와 레이저 쇼가 펼쳐집니다. 봄부터 가을까지 매주 저녁 시간대(19:30~20:30)에 환상적인 야경 공연이 열립니다.`
          : `The Cheongna Lake Park Musical Fountain is one of the largest choreographed water stages in Asia, shooting water jets up to 70 meters high! Laser light shows and orchestral sound systems dance across the water surface every evening during spring, summer, and autumn.`;
      } else if (lower.includes('sunset') || lower.includes('sunset spot') || lower.includes('eco-bridge') || lower.includes('view')) {
        replyText = lang === 'kr'
          ? `청라 최고의 노을 명소는 단연 '에코 브릿지(Eco-Bridge)'와 호수공원 서쪽 데크입니다! 맑은 날 해 질 무렵 서해 영종대교 너머로 붉게 물드는 황금빛 낙조가 호수 수면에 거울처럼 반사되는 광경은 전국 어디서도 보기 힘든 장관입니다.`
          : `The absolute best sunset viewpoint is the wooden summit of the Eco-Bridge facing west! As the sun dips toward Yeongjong Island and the Yellow Sea, the entire lake turns into a shimmering sea of molten gold.`;
      } else if (lower.includes('court') || lower.includes('yeongchumun') || lower.includes('gate') || lower.includes('palace')) {
        replyText = `Yeongchumun (Gate of Autumn Breeze) was the west gate of Gyeongbokgung. Unlike the grand Gwanghwamun where foreign dignitaries marched, Yeongchumun was the 'daily life portal' used by court astronomers, royal physicians, and palace ladies. When dusk fell, scholars and artists slipped out through this gate into the cozy pubs and hanoks of Seochon to compose poetry and discuss forbidden ideas!`;
      } else if (lower.includes('cafe') || lower.includes('coffee') || lower.includes('tea')) {
        replyText = tour?.id === 'incheon-cheongna-waterways'
          ? (lang === 'kr'
            ? `청라 수변 추천 카페 2곳입니다:\n1. '루비로 커피 하우스' - 직접 볶은 싱글 오리진 드립 커피와 수제 소금빵이 일품인 테라스 카페.\n2. '호수 뷰 레이크 카페' - 2층 창가에서 탁 트인 호수공원과 분수를 감상할 수 있는 명소.`
            : `Here are 2 favorite Cheongna cafes:\n1. 'Ruby-ro Micro-Roastery' - Artisanal single-origin pour-overs with outdoor canal terrace seats.\n2. 'Lakeview Panorama Cafe' - Best panoramic viewpoint overlooking the musical fountain.`)
          : `Here are 2 authentic local gems in Seochon:\n1. 'Boan Books & Cafe' (2F of Boan Stay) - Overlooks palace stone walls with jazz.\n2. 'MK2' (Nuha-dong) - Bauhaus furniture with apricot tarts.`;
      } else if (lower.includes('yi sang') || lower.includes('poet') || lower.includes('modern boy')) {
        replyText = `In 1930s colonial Seoul, 'Modern Boys' and 'Modern Girls' were rebellious youth who embraced Western jazz, trench coats, espresso, and avant-garde art. Yi Sang was their tragic icon—an architectural engineer who wrote poetry backward and explored surrealism in narrow Seochon rooms while running bohemian cafes that always went bankrupt!`;
      } else if (lower.includes('roof') || lower.includes('hanok') || lower.includes('narrow')) {
        replyText = `The roofs curve gently like a falcon's wings to control sunlight and monsoon rain. In summer, the steep overhang blocks the high midday sun while scooping up cool mountain breezes from Mount Inwangsan. In winter, the low sunbeams slide deep into the wooden ondol rooms. The alleys in Nuha-dong remain narrow because they followed the natural water drainage streams from centuries ago!`;
      } else if (lower.includes('bukchon') || lower.includes('difference')) {
        replyText = `Bukchon ('North Village') was historically where high-ranking yangban nobility and royal in-laws built sprawling mansions. Seochon ('West Village') was the realm of the 'Jungin' (middle class)—court interpreters, painters, calligraphers, and doctors. That's why Seochon feels far more intimate, bohemian, and lived-in!`;
      } else {
        replyText = `That's a wonderful detail to notice! ${tour?.title || 'Our tour'} offers unique stories hidden beneath the surface. Right around your current stop (${currentStop?.title || 'this neighborhood'}), take a moment to look around at the architecture and local life along the path.`;
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
