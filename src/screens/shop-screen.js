class ShopScreen extends BaseScreen {
  constructor(game) {
    super(game, 'shop');
  }

  build() {
    const items = this.game.config.shop.items;

    this.el = document.createElement('div');
    this.el.className = 'screen shop-screen';
    this.el.style.backgroundImage = `url("${this.game.config.backgrounds.menu}")`;

    const panel = new Panel({ image: 'assets/ui/f.png' });
    panel.add(
      this.titleEl('SHOP'),
      this.coinsEl(),
      this.itemsEl(items),
      this.backButton()
    );
    this.el.appendChild(panel.el);

    this.onKeyDown((event) => {
      if (event.code === 'Escape') this.game.show('menu');
    });
  }

  titleEl(text) {
    const h = document.createElement('h2');
    h.className = 'modal-title';
    h.textContent = text;
    return h;
  }

  coinsEl() {
    const row = document.createElement('div');
    row.className = 'shop-coins';
    row.innerHTML = `<img src="assets/ui/c.png" alt="" draggable="false"><span>${this.getCoins()}</span>`;
    return row;
  }

  itemsEl(items) {
    const list = document.createElement('div');
    list.className = 'shop-list';
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'shop-item';
      // SHOP ITEMS VISUAL ASSETS: image is mandatory, not text-only (skill PHASE 3B)
      const itemIcon = item.image ? `<img src="${item.image}" alt="" draggable="false" class="shop-item-icon">` : '';
      row.innerHTML = `
        ${itemIcon}
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-price"><img src="assets/ui/c.png" alt="" draggable="false">${item.price.toLocaleString('fr-FR')}</span>
      `;
      const buyButton = new Button({
        label: 'BUY',
        variant: 'secondary',
        onClick: () => this.buy(item, buyButton)
      });
      row.appendChild(buyButton.el);
      list.appendChild(row);
    });
    return list;
  }

  backButton() {
    return new Button({
      label: 'BACK',
      variant: 'back',
      onClick: () => this.game.show('menu')
    });
  }

  getCoins() {
    return this.game.storage.get('coins', 0).toLocaleString('fr-FR');
  }

  buy(item, button) {
    const coins = this.game.storage.get('coins', 0);
    if (coins >= item.price) {
      this.game.storage.set('coins', coins - item.price);
      this.game.audio.click();
      button.el.querySelector('.btn-label').textContent = '✔';
      this.refreshCoins();
    } else {
      this.game.audio.click();
    }
  }

  refreshCoins() {
    const value = this.el.querySelector('.shop-coins span');
    if (value) value.textContent = this.getCoins();
  }
}
