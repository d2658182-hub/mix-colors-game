class GameOverScreen extends BaseScreen {
  constructor(game) {
    super(game, 'gameover');
  }

  build(options = {}) {
    this.el = document.createElement('div');
    this.el.className = 'screen gameover-screen';
    this.el.style.backgroundImage = `url("${this.game.config.backgrounds.menu}")`;

    const panel = new Panel({ image: 'assets/ui/f.png' });
    const children = [this.titleEl('GAME OVER')];
    if (options.stars != null) children.push(this.starsEl(options.stars));
    children.push(
      this.buttonEl('RETRY', 'primary', () => this.retry()),
      this.buttonEl('REVIVE', 'secondary', () => this.revive()),
      this.buttonEl('MENU', 'back', () => this.menu())
    );
    panel.add(...children);
    this.el.appendChild(panel.el);

    this.onKeyDown((event) => {
      if (event.code === 'Enter' || event.code === 'Space') this.retry();
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

  retry() {
    this.game.audio.click();
    this.game.show(this.game.config.playTarget || 'gameplay');
  }

  revive() {
    this.game.audio.click();
    this.game.show(this.game.config.playTarget || 'gameplay');
  }

  menu() {
    this.game.audio.click();
    this.game.show('menu');
  }
}
