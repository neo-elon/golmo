// GOLMO Audio & Synthesizer Engine
// Provides Geofence arrival chimes, ambient alley soundscapes (Web Audio API), and TTS Narration (Web Speech API)

class GolmoAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
    this.currentAmbientType = null;
    this.speechUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStop = null;
    this.onProgressCallback = null;
    this.onEndCallback = null;
    this.speechRate = 0.95; // Warm, natural storytelling pace
    this.voices = [];
    this.elapsedSeconds = 0;
    this.timerInterval = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Plays a delicate chime sound when the user crosses a geofence boundary into a new alley stop
   */
  playGeofenceTriggerChime() {
    try {
      this.initAudioContext();
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Two-tone bell chime (E6 -> B6)
      const freqs = [1318.51, 1975.53];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);

        gain.gain.setValueAtTime(0, now + idx * 0.14);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.14 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.14 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 1.3);
      });
    } catch (e) {
      console.warn("Chime audio could not play:", e);
    }
  }

  /**
   * Web Audio API generated soft ambient background (Wind, Temple bell, Alley murmur)
   */
  startAmbientTrack(type = 'palace-wind') {
    try {
      this.initAudioContext();
      this.stopAmbientTrack();

      const ctx = this.audioCtx;
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink/Brown noise generator for gentle breeze
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.08;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate breeze through eaves
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'valley-stream' ? 800 : 380, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      whiteNoise.start();
      this.ambientSource = whiteNoise;
      this.isAmbientPlaying = true;
      this.currentAmbientType = type;
    } catch (e) {
      console.warn("Ambient audio initialization note:", e);
    }
  }

  stopAmbientTrack() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch (e) {}
      this.ambientSource = null;
    }
    this.isAmbientPlaying = false;
  }

  /**
   * Narrates the story of the current stop using Web Speech API with smooth pacing
   */
  playStopNarration(stop, lang = 'en', onProgress, onEnd) {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    this.stopNarration();
    this.initAudioContext();
    this.currentStop = stop;
    this.onProgressCallback = onProgress;
    this.onEndCallback = onEnd;

    // Start ambient background
    this.startAmbientTrack(stop.ambientTrack || 'palace-wind');

    const textToSpeak = lang === 'kr' && stop.fullScriptKr ? stop.fullScriptKr : stop.fullScript;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick best English voice (Natural / Google / Premium)
    const available = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (lang === 'kr') {
      preferredVoice = available.find(v => v.lang.includes('ko') || v.lang.includes('KO'));
    } else {
      preferredVoice = available.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('UK English') || v.name.includes('US')) && v.lang.startsWith('en'));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = this.speechRate;
    utterance.pitch = 1.0;

    this.elapsedSeconds = 0;
    this.isPlaying = true;
    this.isPaused = false;

    // Timer for elapsed seconds
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        this.elapsedSeconds += 1;
        if (this.onProgressCallback) {
          this.onProgressCallback(this.elapsedSeconds, stop.audioSeconds);
        }
      }
    }, 1000);

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      clearInterval(this.timerInterval);
      if (this.onEndCallback) {
        this.onEndCallback(stop);
      }
    };

    utterance.onerror = (err) => {
      console.warn("Speech error:", err);
      this.isPlaying = false;
      this.isPaused = false;
      clearInterval(this.timerInterval);
    };

    this.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  pause() {
    if ('speechSynthesis' in window && this.isPlaying) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if ('speechSynthesis' in window && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  stopNarration() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    clearInterval(this.timerInterval);
    this.isPlaying = false;
    this.isPaused = false;
    this.stopAmbientTrack();
  }

  setSpeechRate(rate) {
    this.speechRate = rate;
    if (this.isPlaying && this.currentStop) {
      // Re-trigger with updated rate from current position if needed
    }
  }
}

export const audioEngine = new GolmoAudioEngine();
