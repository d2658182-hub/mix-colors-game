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
  id: 'mon-jeu',
  firstScreen: 'loading',
  playTarget: 'gameplay',

  /* ----- CUSTOMIZE: game identity ----- */
  title: 'MY GAME',

  /* ----- CUSTOMIZE: loading screen ----- */
  /* List here EVERY image the game uses (sprites, FX, extra backgrounds)
     so the loading bar fills with real progress. */
  loading: {
    loadTarget: 'menu',
    assets: []
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
  shop: {
    items: [
      { id: 'extra_heart', name: 'Heart +1', price: 100 },
      { id: 'double_points', name: 'Double Points', price: 200 }
    ]
  },

  /* ----- CUSTOMIZE: gameplay HUD ----- */
  hud: {
    showScore: true,
    showHearts: true,
    hearts: 3
  }
};
