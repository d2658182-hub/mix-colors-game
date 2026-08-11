class MenuScreen extends BaseScreen {
  constructor(game) {
    super(game, 'menu');
  }

  build() {
    const config = this.game.config;

    this.el = document.createElement('div');
    this.el.className = 'screen menu-screen';
    this.el.style.backgroundImage = `url("${config.backgrounds.menu}")`;
    this.el.innerHTML = `
      <div class="menu-content">
        <div class="menu-title">
          <h1 class="game-title">${config.title}</h1>
        </div>
        <div class="menu-buttons">
          ${this.playButton()}
          ${config.features.shop ? this.shopButton() : ''}
          <div class="menu-sound">${this.soundButton()}</div>
        </div>
      </div>
    `;

    this.el.querySelector('.btn-play').addEventListener('click', () => this.startGame());
    const shopButton = this.el.querySelector('.btn-shop');
    if (shopButton) shopButton.addEventListener('click', () => this.openShop());
    this.el.querySelector('.btn-sound').addEventListener('click', (event) => this.toggleSound(event));

    this.onKeyDown((event) => {
      if (event.code === 'Enter' || event.code === 'Space') this.startGame();
    });
  }

  playButton() {
    return `
      <button type="button" class="btn btn-primary btn-play" aria-label="Play">
        <img src="assets/ui/b_4.png" alt="" draggable="false">
        <span class="btn-label">PLAY</span>
      </button>
    `;
  }

  shopButton() {
    return `
      <button type="button" class="btn btn-secondary btn-shop" aria-label="Shop">
        <img src="assets/ui/b_5.png" alt="" draggable="false">
        <span class="btn-label">SHOP</span>
      </button>
    `;
  }

  soundButton() {
    const on = this.game.audio.settings.sound;
    return `
      <button type="button" class="btn btn-square btn-sound" aria-label="Sound">
        <img src="assets/ui/b_8.png" alt="" draggable="false">
        <span class="btn-icon">${on ? '🔊' : '🔇'}</span>
      </button>
    `;
  }

  startGame() {
    this.game.audio.click();
    this.game.show(this.game.config.playTarget || 'gameplay');
  }

  openShop() {
    this.game.audio.click();
    this.game.show('shop');
  }

  toggleSound(event) {
    event.stopPropagation();
    this.game.audio.click();
    const on = this.game.audio.toggleSound();
    event.currentTarget.querySelector('.btn-icon').textContent = on ? '🔊' : '🔇';
  }
}
