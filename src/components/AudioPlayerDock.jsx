import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FileText,
  Volume2,
  VolumeX,
  Gauge
} from 'lucide-react';
import { formatTime } from '../utils/geoUtils';

export default function AudioPlayerDock({
  currentStop,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onResume,
  onNextStop,
  onPrevStop,
  onOpenTranscript,
  elapsedSeconds,
  durationSeconds,
  speechRate,
  onChangeSpeed,
  isAmbientOn,
  onToggleAmbient,
  lang
}) {
  if (!currentStop) return null;

  const progressPercent = durationSeconds > 0 ? (elapsedSeconds / durationSeconds) * 100 : 0;

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (isPaused) {
        onResume();
      } else {
        onPause();
      }
    } else {
      onPlay(currentStop);
    }
  };

  const speedLabels = {
    0.85: '0.8x',
    0.95: '1.0x',
    1.2: '1.2x'
  };

  const nextSpeed = () => {
    if (speechRate === 0.85) onChangeSpeed(0.95);
    else if (speechRate === 0.95) onChangeSpeed(1.2);
    else onChangeSpeed(0.85);
  };

  return (
    <div className="player-dock">
      {/* Top track details & playback controls */}
      <div className="player-top-row">
        <div className="player-track-info">
          <img
            src={currentStop.imageUrl}
            alt={currentStop.title}
            className="player-avatar"
          />
          <div className="player-meta">
            <div className="player-title">
              {lang === 'kr' ? currentStop.titleKr : currentStop.title}
            </div>
            <div className="player-subtitle">
              <span>Stop {currentStop.order} • {currentStop.narrationDuration}</span>
              <div className="waveform-bars">
                <span className={`wave-bar ${isPlaying && !isPaused ? 'playing' : ''}`}></span>
                <span className={`wave-bar ${isPlaying && !isPaused ? 'playing' : ''}`}></span>
                <span className={`wave-bar ${isPlaying && !isPaused ? 'playing' : ''}`}></span>
                <span className={`wave-bar ${isPlaying && !isPaused ? 'playing' : ''}`}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="player-controls">
          {/* Ambient sound toggle */}
          <button
            className="ctrl-btn"
            onClick={onToggleAmbient}
            title={isAmbientOn ? "Mute Ambient Soundscape" : "Turn on Alley Ambient Sound"}
          >
            {isAmbientOn ? <Volume2 size={17} color="#ff7e36" /> : <VolumeX size={17} />}
          </button>

          {/* Speech Rate */}
          <button
            className="ctrl-btn"
            onClick={nextSpeed}
            title="Narration Speed"
            style={{ fontSize: '0.72rem', fontWeight: 700 }}
          >
            {speedLabels[speechRate] || '1.0x'}
          </button>

          {/* Prev Stop */}
          <button className="ctrl-btn" onClick={onPrevStop} title="Previous Stop">
            <SkipBack size={17} />
          </button>

          {/* Main Play/Pause Button */}
          <button
            className="play-main-btn"
            onClick={handlePlayToggle}
            title={isPlaying && !isPaused ? "Pause" : "Play"}
          >
            {isPlaying && !isPaused ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
          </button>

          {/* Next Stop */}
          <button className="ctrl-btn" onClick={onNextStop} title="Next Stop">
            <SkipForward size={17} />
          </button>

          {/* Transcript Drawer button */}
          <button
            className="ctrl-btn"
            onClick={onOpenTranscript}
            title="Read Story Transcript & Notes"
          >
            <FileText size={17} />
          </button>
        </div>
      </div>

      {/* Scrubber progress bar */}
      <div className="player-scrubber-row">
        <span>{formatTime(elapsedSeconds)}</span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
        <span>{formatTime(durationSeconds)}</span>
      </div>
    </div>
  );
}
