class GameOverScreen extends BaseScreen {
  constructor(game) {
    super(game, 'gameover');
  }

  build() {
    this.el = document.createElement('div');
    this.el.className = 'screen gameover-screen';
    this.el.style.backgroundImage = `url("${this.game.config.backgrounds.menu}")`;

    const panel = new Panel({ image: 'assets/ui/f.png' });
    panel.add(
      this.titleEl('GAME OVER'),
      this.buttonEl('RETRY', 'primary', () => this.retry()),
      this.buttonEl('REVIVE', 'secondary', () => this.revive()),
      this.buttonEl('MENU', 'back', () => this.menu())
    );
    this.el.appendChild(panel.el);

    this.onKeyDown((event) => {
      if (event.code === 'Enter' || event.code === 'Space') this.retry();
    });
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
