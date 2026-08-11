class AudioEngine {
  constructor(game) {
    this.game = game;
    this.ctx = null;
    this.master = null;
    this.settings = { sound: true };
    const saved = game.storage.get('settings', null);
    if (saved) Object.assign(this.settings, saved);
    window.addEventListener('pointerdown', () => this.unlock(), { once: true });
    window.addEventListener('keydown', () => this.unlock(), { once: true });
  }

  ensure() {
    if (this.ctx) return true;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.8;
      this.master.connect(this.ctx.destination);
      return true;
    } catch (error) {
      return false;
    }
  }

  unlock() {
    if (!this.ensure()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  tone({ freq = 440, freqEnd = null, duration = 0.08, type = 'sine', gain = 0.3, when = 0 }) {
    if (!this.ensure()) return;
    const start = this.ctx.currentTime + when;
    const oscillator = this.ctx.createOscillator();
    const envelope = this.ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);
    if (freqEnd) oscillator.frequency.exponentialRampToValueAtTime(freqEnd, start + duration);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope);
    envelope.connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  click() {
    if (!this.settings.sound) return;
    this.tone({ freq: 660, freqEnd: 880, type: 'triangle', duration: 0.09, gain: 0.22 });
  }

  hover() {
    if (!this.settings.sound) return;
    this.tone({ freq: 460, freqEnd: 540, type: 'sine', duration: 0.05, gain: 0.05 });
  }

  toggleSound() {
    this.settings.sound = !this.settings.sound;
    this.game.storage.set('settings', this.settings);
    return this.settings.sound;
  }
}
