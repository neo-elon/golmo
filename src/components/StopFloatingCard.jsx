import React from 'react';
import { Play, Pause, Navigation, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { formatDistance } from '../utils/geoUtils';

export default function StopFloatingCard({
  stop,
  distanceMeters,
  isPlaying,
  onPlay,
  onPause,
  onOpenDocentWithPrompt,
  onClose,
  isCompleted,
  onMarkComplete,
  lang
}) {
  if (!stop) return null;

  return (
    <div className="stop-floating-card">
      <img
        src={stop.imageUrl}
        alt={stop.title}
        className="stop-card-thumb"
      />

      <div className="stop-card-info">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="stop-card-badge">
              Stop {stop.order} • {stop.narrationDuration}
            </span>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={15} />
            </button>
          </div>

          <h3 className="stop-card-title">
            {lang === 'kr' ? stop.titleKr : stop.title}
          </h3>

          <div className="stop-card-distance" style={{ marginTop: '4px' }}>
            <Navigation size={12} color="#ff7e36" />
            <span>
              {distanceMeters !== null
                ? `${formatDistance(distanceMeters)} away`
                : 'Selected on map'}
            </span>
            {distanceMeters !== null && distanceMeters <= (stop.radiusMeters || 25) && (
              <span style={{ color: '#10b981', fontWeight: 600 }}>• In Range!</span>
            )}
          </div>
        </div>

        <div className="stop-card-actions">
          {isPlaying ? (
            <button className="play-stop-btn" onClick={onPause}>
              <Pause size={13} />
              <span>{lang === 'kr' ? '일시정지' : 'Pause'}</span>
            </button>
          ) : (
            <button className="play-stop-btn" onClick={() => onPlay(stop)}>
              <Play size={13} />
              <span>{lang === 'kr' ? '스토리 듣기' : 'Play Story'}</span>
            </button>
          )}

          <button
            className="nav-btn"
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            onClick={() => onOpenDocentWithPrompt(stop.suggestedDocentPrompt)}
          >
            <Sparkles size={12} color="#f59e0b" />
            <span>AI Ask</span>
          </button>

          <button
            className={`nav-btn ${isCompleted ? 'active' : ''}`}
            style={{ padding: '6px 10px', fontSize: '0.75rem' }}
            onClick={() => onMarkComplete(stop.id)}
            title="Mark this stop as visited"
          >
            <CheckCircle2 size={13} color={isCompleted ? '#10b981' : '#94a3b8'} />
            <span>{isCompleted ? (lang === 'kr' ? '방문 완료' : 'Visited') : (lang === 'kr' ? '스탬프' : 'Check-in')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
