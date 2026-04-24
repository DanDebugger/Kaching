// 🔊 Web Audio API synth for "Ka-Ching!" Mock
export const playKachingSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    
    const playTone = (freq: number, type: OscillatorType, startTime: number, duration: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      
      gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    // "Ka" (high chirp)
    playTone(1200, 'sine', 0, 0.1, 0.5);
    // "Ching" (layered metallic ring)
    playTone(1600, 'triangle', 0.1, 0.6, 0.3);
    playTone(2400, 'sine', 0.1, 0.8, 0.2);
    playTone(3200, 'triangle', 0.1, 0.5, 0.1);
    
  } catch (err) {
    console.error("Audio API not supported", err);
  }
};
