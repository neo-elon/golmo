import React from 'react';
import { X, BookOpen, Lightbulb, Play, Pause } from 'lucide-react';

export default function TranscriptModal({
  stop,
  isOpen,
  onClose,
  isPlaying,
  onPlay,
  onPause,
  lang
}) {
  if (!isOpen || !stop) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <BookOpen size={18} color="#ff7e36" />
            <span>Story Transcript • Stop {stop.order}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <img
              src={stop.imageUrl}
              alt={stop.title}
              style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                {lang === 'kr' ? stop.titleKr : stop.title}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                {stop.summary}
              </p>
            </div>
          </div>

          {/* Full Narration Script */}
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ff7e36', fontWeight: 700, marginBottom: '8px' }}>
              Full Narration Script
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: '#e2e8f0', whiteSpace: 'pre-line' }}>
              {stop.fullScript}
            </p>
          </div>

          {/* Fun Fact / Local Insight */}
          {stop.funFact && (
            <div style={{ display: 'flex', gap: '12px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '12px', padding: '14px' }}>
              <Lightbulb size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: '2px' }}>
                  Creator's Hidden Insight
                </div>
                <div style={{ fontSize: '0.84rem', color: '#f8fafc', lineHeight: '1.4' }}>
                  {stop.funFact}
                </div>
              </div>
            </div>
          )}

          {/* Play/Listen button */}
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
            {isPlaying ? (
              <button className="play-stop-btn" onClick={onPause}>
                <Pause size={14} />
                <span>Pause Narration</span>
              </button>
            ) : (
              <button className="play-stop-btn" onClick={() => onPlay(stop)}>
                <Play size={14} />
                <span>Listen to this Chapter</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
