import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, CheckCircle, Share2, RotateCcw, Heart } from 'lucide-react';

export default function TourCompletionModal({
  isOpen,
  onClose,
  tour,
  completedCount,
  totalCount,
  onResetProgress,
  lang
}) {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center' }}>
        <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ alignItems: 'center', paddingBottom: '28px' }}>
          {/* Badge Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ff7e36)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 30px rgba(255, 126, 54, 0.5)',
            marginBottom: '8px'
          }}>
            <Award size={44} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>
            {lang === 'kr' ? '서촌 골목 탐험 완주를 축하합니다!' : 'Alley Quest Completed!'}
          </h2>

          <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '380px' }}>
            {lang === 'kr'
              ? '조선 시대의 성문부터 예술가들의 은신처까지, 서촌 6개 골목의 모든 이야기를 발견하셨습니다.'
              : 'You have listened to all 6 secret chapters of Seochon, walking through 600 years of living memories.'}
          </p>

          {/* Stats card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '16px',
            padding: '14px',
            margin: '12px 0',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff7e36' }}>
                {completedCount}/{totalCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Stops Unlocked</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b' }}>
                {tour.distanceKm} km
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Distance Walked</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                {tour.durationMinutes} m
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Time Spent</div>
            </div>
          </div>

          {/* Creator Thank You note */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255, 126, 54, 0.08)',
            border: '1px solid rgba(255, 126, 54, 0.25)',
            borderRadius: '12px',
            padding: '12px',
            width: '100%',
            textAlign: 'left'
          }}>
            <Heart size={20} color="#ff7e36" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              <b style={{ color: '#fff' }}>Note from {tour.creator.name}:</b> "Thank you for walking gently through our neighborhood alleys. I hope you found a quiet piece of Seoul to carry with you."
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px' }}>
            <button
              className="nav-btn"
              style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
              onClick={onResetProgress}
            >
              <RotateCcw size={14} />
              <span>{lang === 'kr' ? '다시 탐험하기' : 'Retake Tour'}</span>
            </button>

            <button
              className="play-stop-btn"
              style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'GOLMO | Seochon Whispering Alleys',
                    text: 'I just completed the Seochon Alley Audio Tour with GOLMO!',
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  alert("Link copied! Share your story with friends.");
                }
              }}
            >
              <Share2 size={14} />
              <span>{lang === 'kr' ? '스토리 공유' : 'Share Journey'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
