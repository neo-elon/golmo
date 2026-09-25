import React, { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import MapViewer from './components/MapViewer';
import StopFloatingCard from './components/StopFloatingCard';
import AudioPlayerDock from './components/AudioPlayerDock';
import TranscriptModal from './components/TranscriptModal';
import AIDocentChat from './components/AIDocentChat';
import TourSelectorModal from './components/TourSelectorModal';
import CreatorStudioModal from './components/CreatorStudioModal';
import TourCompletionModal from './components/TourCompletionModal';

import { TOURS } from './data/toursData';
import {
  calculateDistanceMeters,
  generateWalkingRoute
} from './utils/geoUtils';
import { audioEngine } from './utils/audioEngine';
import { Bell, Navigation, Sparkles } from 'lucide-react';

export default function App() {
  // Tour & Stop State
  const [activeTour, setActiveTour] = useState(TOURS[0]);
  const [currentStop, setCurrentStop] = useState(TOURS[0].stops[0]);
  const [selectedStop, setSelectedStop] = useState(TOURS[0].stops[0]);
  const [completedStopIds, setCompletedStopIds] = useState([]);

  // Location & Simulation State
  const [userLocation, setUserLocation] = useState({
    lat: TOURS[0].stops[0].lat,
    lng: TOURS[0].stops[0].lng
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [isRealGps, setIsRealGps] = useState(false);
  const [geofenceBanner, setGeofenceBanner] = useState(null);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(TOURS[0].stops[0].audioSeconds);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [isAmbientOn, setIsAmbientOn] = useState(true);

  // Modals & Drawers
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isDocentOpen, setIsDocentOpen] = useState(false);
  const [docentInitialPrompt, setDocentInitialPrompt] = useState('');
  const [isToursModalOpen, setIsToursModalOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [lang, setLang] = useState('en');

  // Refs for tracking
  const lastTriggeredStopIdRef = useRef(null);
  const simIntervalRef = useRef(null);
  const simRouteIndexRef = useRef(0);
  const watchGpsIdRef = useRef(null);

  // Route simulation coordinates (follows actual street-level walking path)
  const simulatedRoute = useMemo(() => {
    if (activeTour.walkingRoutePath && activeTour.walkingRoutePath.length > 0) {
      return activeTour.walkingRoutePath.map((coord) => ({
        lat: coord[0],
        lng: coord[1]
      }));
    }
    return generateWalkingRoute(activeTour.stops, 8);
  }, [activeTour]);

  // Audio callbacks
  const handlePlayStop = (stop) => {
    setCurrentStop(stop);
    setSelectedStop(stop);
    setDurationSeconds(stop.audioSeconds);
    setElapsedSeconds(0);
    setIsPlaying(true);
    setIsPaused(false);

    audioEngine.playStopNarration(
      stop,
      lang,
      (elapsed, total) => {
        setElapsedSeconds(elapsed);
        setDurationSeconds(total);
      },
      (finishedStop) => {
        setIsPlaying(false);
        setIsPaused(false);
        // Mark as completed
        setCompletedStopIds((prev) => {
          if (!prev.includes(finishedStop.id)) {
            const nextList = [...prev, finishedStop.id];
            if (nextList.length === activeTour.stops.length) {
              setIsCompletionModalOpen(true);
            }
            return nextList;
          }
          return prev;
        });
      }
    );
  };

  const handlePause = () => {
    audioEngine.pause();
    setIsPaused(true);
  };

  const handleResume = () => {
    audioEngine.resume();
    setIsPaused(false);
  };

  const handleNextStop = () => {
    const currentIndex = activeTour.stops.findIndex((s) => s.id === currentStop.id);
    if (currentIndex < activeTour.stops.length - 1) {
      const next = activeTour.stops[currentIndex + 1];
      handlePlayStop(next);
      setUserLocation({ lat: next.lat, lng: next.lng });
    }
  };

  const handlePrevStop = () => {
    const currentIndex = activeTour.stops.findIndex((s) => s.id === currentStop.id);
    if (currentIndex > 0) {
      const prev = activeTour.stops[currentIndex - 1];
      handlePlayStop(prev);
      setUserLocation({ lat: prev.lat, lng: prev.lng });
    }
  };

  // Change Speech Rate
  const handleChangeSpeed = (newRate) => {
    setSpeechRate(newRate);
    audioEngine.setSpeechRate(newRate);
  };

  // Ambient sound toggle
  const handleToggleAmbient = () => {
    if (isAmbientOn) {
      audioEngine.stopAmbientTrack();
      setIsAmbientOn(false);
    } else {
      audioEngine.startAmbientTrack(currentStop?.ambientTrack || 'palace-wind');
      setIsAmbientOn(true);
    }
  };

  // Geofencing Check logic
  const checkGeofenceTrigger = (lat, lng) => {
    if (!activeTour || !activeTour.stops) return;

    for (const stop of activeTour.stops) {
      const dist = calculateDistanceMeters(lat, lng, stop.lat, stop.lng);
      const radius = stop.radiusMeters || 25;

      if (dist <= radius) {
        if (lastTriggeredStopIdRef.current !== stop.id) {
          lastTriggeredStopIdRef.current = stop.id;
          setCurrentStop(stop);
          setSelectedStop(stop);

          // Geofence Chime Alert
          audioEngine.playGeofenceTriggerChime();

          // Show floating trigger banner
          setGeofenceBanner({
            title: lang === 'kr' ? stop.titleKr : stop.title,
            order: stop.order
          });
          setTimeout(() => setGeofenceBanner(null), 4500);

          // Automatically start story narration!
          handlePlayStop(stop);

          // Check-in
          setCompletedStopIds((prev) => {
            if (!prev.includes(stop.id)) {
              const updated = [...prev, stop.id];
              if (updated.length === activeTour.stops.length) {
                setTimeout(() => setIsCompletionModalOpen(true), 2000);
              }
              return updated;
            }
            return prev;
          });
        }
        break;
      }
    }
  };

  // Click on map to teleport user location (Simulate testing)
  const handleMapClickLocation = (lat, lng) => {
    setUserLocation({ lat, lng });
    checkGeofenceTrigger(lat, lng);
  };

  // Toggle Automated Walking Simulation
  const handleToggleSimulation = () => {
    if (isSimulating) {
      clearInterval(simIntervalRef.current);
      setIsSimulating(false);
    } else {
      setIsRealGps(false);
      if (watchGpsIdRef.current) navigator.geolocation.clearWatch(watchGpsIdRef.current);

      setIsSimulating(true);
      simIntervalRef.current = setInterval(() => {
        simRouteIndexRef.current = (simRouteIndexRef.current + 1) % simulatedRoute.length;
        const nextCoord = simulatedRoute[simRouteIndexRef.current];
        setUserLocation({ lat: nextCoord.lat, lng: nextCoord.lng });
        checkGeofenceTrigger(nextCoord.lat, nextCoord.lng);
      }, 1800);
    }
  };

  // Toggle Device Real GPS
  const handleToggleRealGps = () => {
    if (isRealGps) {
      if (watchGpsIdRef.current) navigator.geolocation.clearWatch(watchGpsIdRef.current);
      setIsRealGps(false);
    } else {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }
      setIsSimulating(false);
      clearInterval(simIntervalRef.current);

      setIsRealGps(true);
      watchGpsIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserLocation({ lat, lng });
          checkGeofenceTrigger(lat, lng);
        },
        (err) => {
          console.warn("GPS watch error:", err);
          alert("Could not access real GPS. Please check browser location permissions or use 'Sim Walk' mode.");
          setIsRealGps(false);
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
      );
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(simIntervalRef.current);
      if (watchGpsIdRef.current) navigator.geolocation.clearWatch(watchGpsIdRef.current);
      audioEngine.stopNarration();
    };
  }, []);

  // Distance to selected stop
  const selectedStopDistance = selectedStop
    ? calculateDistanceMeters(userLocation.lat, userLocation.lng, selectedStop.lat, selectedStop.lng)
    : null;

  return (
    <>
      {/* Top Navbar */}
      <Navbar
        currentTour={activeTour}
        isSimulating={isSimulating}
        onToggleSimulation={handleToggleSimulation}
        isRealGps={isRealGps}
        onToggleRealGps={handleToggleRealGps}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'kr' : 'en'))}
        onOpenTours={() => setIsToursModalOpen(true)}
        onOpenDocent={() => {
          setDocentInitialPrompt('');
          setIsDocentOpen(true);
        }}
        onOpenCreatorStudio={() => setIsCreatorModalOpen(true)}
      />

      {/* Geofence Audio Triggered Alert Banner */}
      {geofenceBanner && (
        <div className="sim-banner" style={{ borderColor: 'var(--accent-amber)' }}>
          <div className="sim-pulse-dot" />
          <Bell size={14} color="#ff7e36" />
          <span>
            <b>Geofence Triggered:</b> Stop {geofenceBanner.order} - {geofenceBanner.title}
          </span>
        </div>
      )}

      {/* Interactive Map */}
      <MapViewer
        tour={activeTour}
        currentStop={currentStop}
        userLocation={userLocation}
        completedStopIds={completedStopIds}
        onSelectStop={(stop) => setSelectedStop(stop)}
        onMapClickLocation={handleMapClickLocation}
        isSimulating={isSimulating}
        lang={lang}
      />

      {/* Floating Card for Selected/Approaching Stop */}
      {selectedStop && (
        <StopFloatingCard
          stop={selectedStop}
          distanceMeters={selectedStopDistance}
          isPlaying={isPlaying && currentStop?.id === selectedStop.id && !isPaused}
          onPlay={handlePlayStop}
          onPause={handlePause}
          onOpenDocentWithPrompt={(prompt) => {
            setDocentInitialPrompt(prompt);
            setIsDocentOpen(true);
          }}
          onClose={() => setSelectedStop(null)}
          isCompleted={completedStopIds.includes(selectedStop.id)}
          onMarkComplete={(stopId) => {
            setCompletedStopIds((prev) =>
              prev.includes(stopId) ? prev.filter((id) => id !== stopId) : [...prev, stopId]
            );
          }}
          lang={lang}
        />
      )}

      {/* Audio Player Dock at bottom */}
      <AudioPlayerDock
        currentStop={currentStop}
        isPlaying={isPlaying}
        isPaused={isPaused}
        onPlay={handlePlayStop}
        onPause={handlePause}
        onResume={handleResume}
        onNextStop={handleNextStop}
        onPrevStop={handlePrevStop}
        onOpenTranscript={() => setIsTranscriptOpen(true)}
        elapsedSeconds={elapsedSeconds}
        durationSeconds={durationSeconds}
        speechRate={speechRate}
        onChangeSpeed={handleChangeSpeed}
        isAmbientOn={isAmbientOn}
        onToggleAmbient={handleToggleAmbient}
        lang={lang}
      />

      {/* Modals & Drawers */}
      <TranscriptModal
        stop={currentStop}
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        isPlaying={isPlaying && !isPaused}
        onPlay={handlePlayStop}
        onPause={handlePause}
        lang={lang}
      />

      <AIDocentChat
        isOpen={isDocentOpen}
        onClose={() => setIsDocentOpen(false)}
        currentStop={currentStop}
        tour={activeTour}
        initialPrompt={docentInitialPrompt}
        lang={lang}
      />

      <TourSelectorModal
        isOpen={isToursModalOpen}
        onClose={() => setIsToursModalOpen(false)}
        activeTourId={activeTour.id}
        onSelectTour={(newTour) => {
          setActiveTour(newTour);
          if (newTour.stops && newTour.stops.length > 0) {
            setCurrentStop(newTour.stops[0]);
            setSelectedStop(newTour.stops[0]);
            setUserLocation({ lat: newTour.stops[0].lat, lng: newTour.stops[0].lng });
          }
          setIsToursModalOpen(false);
        }}
        lang={lang}
      />

      <CreatorStudioModal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        lang={lang}
      />

      <TourCompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        tour={activeTour}
        completedCount={completedStopIds.length}
        totalCount={activeTour.stops.length}
        onResetProgress={() => {
          setCompletedStopIds([]);
          setIsCompletionModalOpen(false);
        }}
        lang={lang}
      />
    </>
  );
}
