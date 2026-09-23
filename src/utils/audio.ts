/**
 * Web Audio API synthesizer for friendly retro sound effects
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, delay = 0, gainLevel = 0.15) {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    } catch {
      // Audio might be blocked until interaction
    }
  }

  playClick() {
    this.playTone(600, 'triangle', 0.04, 0, 0.1);
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    // Cheerful arpeggio C5 - E5 - G5 - C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.15, idx * 0.08, 0.18);
    });
  }

  playCoin() {
    if (!this.soundEnabled) return;
    this.playTone(987.77, 'sine', 0.08, 0, 0.2); // B5
    this.playTone(1318.51, 'sine', 0.25, 0.08, 0.25); // E6
  }

  playError() {
    if (!this.soundEnabled) return;
    this.playTone(220, 'sawtooth', 0.15, 0, 0.12);
    this.playTone(180, 'sawtooth', 0.25, 0.12, 0.12);
  }

  playFanfare() {
    if (!this.soundEnabled) return;
    const melody = [
      { f: 523.25, d: 0.1, t: 0 },
      { f: 659.25, d: 0.1, t: 0.12 },
      { f: 783.99, d: 0.1, t: 0.24 },
      { f: 1046.50, d: 0.35, t: 0.36 },
      { f: 880.00, d: 0.1, t: 0.72 },
      { f: 1046.50, d: 0.5, t: 0.85 },
    ];
    melody.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, n.t, 0.25);
    });
  }

  async playMorseCode(code: string, onBeep?: (active: boolean) => void) {
    if (!this.soundEnabled) return;
    this.initCtx();
    const dotDuration = 100; // ms
    const dashDuration = 300; // ms
    const elementPause = 100; // ms between dots/dashes
    const letterPause = 300; // ms between letters
    const wordPause = 600; // ms between words

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      if (char === '.') {
        onBeep?.(true);
        this.playTone(750, 'sine', dotDuration / 1000, 0, 0.2);
        await new Promise(r => setTimeout(r, dotDuration));
        onBeep?.(false);
        await new Promise(r => setTimeout(r, elementPause));
      } else if (char === '-') {
        onBeep?.(true);
        this.playTone(750, 'sine', dashDuration / 1000, 0, 0.2);
        await new Promise(r => setTimeout(r, dashDuration));
        onBeep?.(false);
        await new Promise(r => setTimeout(r, elementPause));
      } else if (char === ' ') {
        await new Promise(r => setTimeout(r, letterPause));
      } else if (char === '/') {
        await new Promise(r => setTimeout(r, wordPause));
      }
    }
  }
}

export const sound = new SoundManager();
