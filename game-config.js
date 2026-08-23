/* ============================================================
   GAME CONFIGURATION — EVERYTHING IS CUSTOMIZABLE HERE
   ------------------------------------------------------------
   What the agent customizes for EACH game :
     - id, first screen, play target
     - title
     - loading screen (assets to preload)
     - backgrounds (menu + gameplay)
     - optional features (shop)
     - shop items
     - gameplay HUD (score / hearts)

   What stays ALWAYS IDENTICAL (the pack, in assets/ui/) :
     - buttons, panels, coins, stars, bars
     - button texts and all generic screens
   ============================================================ */

const GAME_CONFIG = {
  id: 'mix-colors',
  firstScreen: 'loading',
  playTarget: 'gameplay',

  /* ----- CUSTOMIZE: game identity ----- */
  title: 'MIX COLORS',

  /* ----- CUSTOMIZE: loading screen ----- */
  /* List here EVERY image the game uses (sprites, FX, extra backgrounds)
     so the loading bar fills with real progress. */
  loading: {
    loadTarget: 'menu',
    assets: ['assets/ui/field.png', 'assets/ui/pr_ui_gold.png', 'assets/ui/icon_pause.png', 'assets/ui/icon_sound_on.png', 'assets/ui/icon_sound_off.png', 'assets/ui/l1.png', 'assets/ui/c.png']
  },

  /* ----- CUSTOMIZE: backgrounds ----- */
  /* Replace the PNG files in assets/screens/ */
  backgrounds: {
    menu: 'assets/screens/menu-bg.png',
    gameplay: 'assets/screens/gameplay-bg.png'
  },

  /* ----- CUSTOMIZE: optional features ----- */
  /* Set to false to remove the button AND the screen. */
  features: {
    shop: true
  },

  /* ----- CUSTOMIZE: shop items ----- */
  /* SHOP ITEMS MUST BE VISUAL ASSETS: each item has an image pointing to assets/ui/ real file */
  shop: {
    items: [
      { id: 'extra_heart', name: 'Palette +1', price: 100, image: 'assets/ui/l1.png' },
      { id: 'double_points', name: 'Gold Mix x2', price: 200, image: 'assets/ui/pr_ui_gold.png' }
    ]
  },

  /* ----- CUSTOMIZE: gameplay HUD ----- */
  hud: {
    showScore: true,
    showHearts: true,
    hearts: 3
  }
};
