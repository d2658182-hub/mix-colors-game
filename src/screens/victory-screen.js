class VictoryScreen extends BaseScreen {
  constructor(game) {
    super(game, 'victory');
  }

  build(options = {}) {
    this.el = document.createElement('div');
    this.el.className = 'screen victory-screen';
    this.el.style.backgroundImage = `url("${this.game.config.backgrounds.menu}")`;

    const panel = new Panel({ image: 'assets/ui/f.png' });
    panel.add(
      this.titleEl('VICTORY'),
      this.starsEl(options.stars != null ? options.stars : 3),
      this.buttonEl('NEXT LEVEL', 'primary', () => this.nextLevel()),
      this.buttonEl('DOUBLE COINS', 'secondary', () => this.doubleCoins())
    );
    this.el.appendChild(panel.el);

    this.onKeyDown((event) => {
      if (event.code === 'Enter' || event.code === 'Space') this.nextLevel();
    });
  }

  starsEl(count) {
    const row = document.createElement('div');
    row.className = 'modal-stars';
    for (let i = 0; i < 3; i += 1) {
      const img = document.createElement('img');
      img.src = i < count ? 'assets/ui/s1.png' : 'assets/ui/s2.png';
      img.alt = '';
      row.appendChild(img);
    }
    return row;
  }

  titleEl(text) {
    const h = document.createElement('h2');
    h.className = 'modal-title';
    h.textContent = text;
    return h;
  }

  buttonEl(label, variant, onClick) {
    return new Button({ label, variant, onClick });
  }

  nextLevel() {
    this.game.audio.click();
    this.game.show(this.game.config.playTarget || 'gameplay');
  }

  doubleCoins() {
    this.game.audio.click();
    const coins = this.game.storage.get('coins', 0);
    this.game.storage.set('coins', coins * 2);
    this.game.show('menu');
  }
}
