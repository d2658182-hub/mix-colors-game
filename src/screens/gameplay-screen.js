class GameplayScreen extends BaseScreen {
  constructor(game) {
    super(game, 'gameplay');
    this.canvas = null;
    this.ctx = null;
    this.frameId = null;
    this.lastTime = 0;
    this.score = 0;
    this.hearts = game.config.hud.hearts;
  }

  build() {
    const config = this.game.config;

    this.el = document.createElement('div');
    this.el.className = 'screen gameplay-screen';
    this.el.style.backgroundImage = `url("${config.backgrounds.gameplay}")`;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'game-canvas';
    this.ctx = this.canvas.getContext('2d');

    this.hud = document.createElement('div');
    this.hud.className = 'gameplay-hud';
    this.hud.innerHTML = `
      ${this.scoreElement()}
      ${this.heartsElement()}
      <button type="button" class="btn btn-square btn-pause" aria-label="Pause">
        <img src="assets/ui/b_8.png" alt="" draggable="false">
        <span class="btn-icon">⏸</span>
      </button>
    `;

    this.el.appendChild(this.canvas);
    this.el.appendChild(this.hud);

    this.hud.querySelector('.btn-pause').addEventListener('click', () => {
      this.game.audio.click();
      this.game.show('pause');
    });

    this.updateScoreDisplay();
    this.updateHeartsDisplay();
  }

  scoreElement() {
    if (!this.game.config.hud.showScore) return '';
    return `
      <div class="hud-score">
        <img src="assets/ui/c.png" alt="" draggable="false">
        <span class="hud-score-value">0</span>
      </div>
    `;
  }

  heartsElement() {
    if (!this.game.config.hud.showHearts) return '';
    return `
      <div class="hud-hearts"></div>
    `;
  }

  enter() {
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    this.lastTime = 0;
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  exit() {
    window.removeEventListener('resize', this.resize.bind(this));
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  resize() {
    const rect = this.el.getBoundingClientRect();
    this.canvas.width = Math.floor(rect.width * devicePixelRatio);
    this.canvas.height = Math.floor(rect.height * devicePixelRatio);
  }

  loop(time) {
    const delta = this.lastTime ? (time - this.lastTime) / 1000 : 0;
    this.lastTime = time;
    this.update(delta);
    this.render();
    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {}

  render() {
    const { ctx, canvas } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setScore(value) {
    this.score = value;
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    const value = this.hud.querySelector('.hud-score-value');
    if (value) value.textContent = this.score.toLocaleString('fr-FR');
  }

  setHearts(value) {
    this.hearts = Math.max(0, value);
    this.updateHeartsDisplay();
  }

  updateHeartsDisplay() {
    const container = this.hud.querySelector('.hud-hearts');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < this.game.config.hud.hearts; i += 1) {
      const img = document.createElement('img');
      img.src = i < this.hearts ? 'assets/ui/l1.png' : 'assets/ui/l2.png';
      img.alt = '';
      container.appendChild(img);
    }
  }
}
