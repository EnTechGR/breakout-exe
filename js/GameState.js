class GameState {
  constructor() {
    this.state = 'playing'; // 'playing', 'paused', 'gameOver', 'levelComplete'
    this.listeners = [];
  }

  setState(newState) {
    const oldState = this.state;
    this.state = newState;
    
    this.listeners.forEach(listener => {
      listener(newState, oldState);
    });
  }

  getState() {
    return this.state;
  }

  isPaused() {
    return this.state === 'paused';
  }

  isPlaying() {
    return this.state === 'playing';
  }

  isGameOver() {
    return this.state === 'gameOver';
  }

  isLevelComplete() {
    return this.state === 'levelComplete';
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}