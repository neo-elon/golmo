import React from 'react';
import { Compass, Sparkles, Navigation, Globe, Layers, Feather } from 'lucide-react';

export default function Navbar({
  currentTour,
  isSimulating,
  onToggleSimulation,
  isRealGps,
  onToggleRealGps,
  lang,
  onToggleLang,
  onOpenTours,
  onOpenDocent,
  onOpenCreatorStudio
}) {
  return (
    <header className="navbar">
      <div className="brand-wrapper" onClick={onOpenTours}>
        <div className="brand-badge">
          <Compass size={20} color="#fff" />
        </div>
        <div>
          <div className="brand-logo-text">GOLMO</div>
          <div className="brand-slogan">
            {lang === 'kr' ? '길을 잃으면 여행이 시작된다' : 'Get Lost. Find Your Story.'}
          </div>
        </div>
      </div>

      <div className="nav-actions">
        {/* Simulation Walk Toggle */}
        <button
          className={`nav-btn ${isSimulating ? 'active' : ''}`}
          onClick={onToggleSimulation}
          title="Auto-walk through the alleyways to test geofencing"
        >
          <Navigation size={14} className={isSimulating ? 'animate-spin' : ''} />
          <span>{isSimulating ? (lang === 'kr' ? '시뮬레이션 중' : 'Simulating Walk') : (lang === 'kr' ? '모의 산책' : 'Sim Walk')}</span>
        </button>

        {/* Real GPS Toggle */}
        <button
          className={`nav-btn ${isRealGps ? 'active' : ''}`}
          onClick={onToggleRealGps}
          title="Use actual device GPS coordinates"
        >
          <Compass size={14} />
          <span>GPS</span>
        </button>

        {/* AI Docent Drawer Button */}
        <button className="nav-btn" onClick={onOpenDocent}>
          <Sparkles size={14} color="#f59e0b" />
          <span>Ask AI</span>
        </button>

        {/* Tours List */}
        <button className="nav-btn" onClick={onOpenTours}>
          <Layers size={14} />
          <span>{lang === 'kr' ? '투어' : 'Tours'}</span>
        </button>

        {/* Creator Studio Link */}
        <button className="nav-btn" onClick={onOpenCreatorStudio} title="Creator Studio Preview">
          <Feather size={14} />
          <span>{lang === 'kr' ? '스튜디오' : 'Studio'}</span>
        </button>

        {/* Language Switcher */}
        <button className="nav-btn" onClick={onToggleLang} style={{ minWidth: '40px', justifyContent: 'center' }}>
          <Globe size={14} />
          <span>{lang.toUpperCase()}</span>
        </button>
      </div>
    </header>
  );
}
