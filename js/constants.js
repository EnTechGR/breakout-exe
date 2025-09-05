// Game Constants
const GAME_CONSTANTS = {
  // Game Screen
  SCREEN_WIDTH: 800,
  SCREEN_HEIGHT: 600,
  SCREEN_BORDER_WIDTH: 2,
  SCREEN_BORDER_COLOR: "#16213e",
  SCREEN_BOX_SHADOW: "0 0 20px rgba(0, 0, 0, 0.5)",

  // Paddle
  PADDLE_SPEEDS: {
    DEFAULT: 300,
  },

  PADDLE_SPRITE_POSITIONS: {
    SMALL: { x: 192, y: 116, width: 80, height: 16 },
    NORMAL: { x: 160, y: 84, width: 112, height: 16 },
    BIG: { x: 4, y: 116, width: 154, height: 16 },
  },

  PADDLE_DEFAULT_POSITION: {
    X: 350,
    Y: 560,
  },

  // Ball
  BALL_SIZE: 20,
  BALL_DEFAULT_POSITION: {
    X: 400,
    Y: 300,
  },
  BALL_DEFAULT_VELOCITY: {
    X: 200,
    Y: -200,
  },
  BALL_SPRITE_POSITION: { x: 2, y: 82, width: 20, height: 20 },

  // Assets
  ASSETS: {
    SPRITE_SHEET: "assets/BasicArkanoidPack.png",
  },

  // Game Loop
  FPS_LOG_INTERVAL: 60,

  // States
  PADDLE_STATES: {
    SMALL: "small",
    NORMAL: "normal",
    BIG: "big",
  },
};
