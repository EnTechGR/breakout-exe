class Menu {
  constructor() {
    this.element = null;
    this.isVisible = false;
    this.callbacks = {
      resume: null,
      restart: null
    };
    
    this.createMenuElement();
  }

  createMenuElement() {
    this.element = document.createElement("div");
    this.element.id = "gameMenu";
    this.element.className = "game-menu";
    
    this.element.style.position = "absolute";
    this.element.style.top = "0";
    this.element.style.left = "0";
    this.element.style.width = "100%";
    this.element.style.height = "100%";
    this.element.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    this.element.style.display = "none";
    this.element.style.flexDirection = "column";
    this.element.style.justifyContent = "center";
    this.element.style.alignItems = "center";
    this.element.style.zIndex = "2000";
    this.element.style.fontSize = "24px";
    this.element.style.color = "white";
    this.element.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("h2");
    title.textContent = "PAUSED";
    title.style.marginBottom = "30px";
    title.style.fontSize = "36px";
    title.style.textShadow = "2px 2px 4px rgba(0,0,0,0.8)";
    
    const resumeButton = document.createElement("button");
    resumeButton.textContent = "Resume (ESC)";
    resumeButton.className = "menu-button";
    this.styleButton(resumeButton);
    resumeButton.addEventListener("click", () => this.resume());
    
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.className = "menu-button";
    this.styleButton(restartButton);
    restartButton.addEventListener("click", () => this.restart());

    const instructions = document.createElement("div");
    instructions.innerHTML = `
      <div style="margin-top: 40px; font-size: 16px; text-align: center; line-height: 1.5;">
        <div>Press <strong>ESC</strong> to pause/resume</div>
        <div>Use <strong>Arrow Keys</strong> or <strong>A/D</strong> to move paddle</div>
      </div>
    `;
    
    this.element.appendChild(title);
    this.element.appendChild(resumeButton);
    this.element.appendChild(restartButton);
    this.element.appendChild(instructions);
  }

  styleButton(button) {
    button.style.padding = "15px 30px";
    button.style.margin = "10px";
    button.style.fontSize = "20px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s";
    button.style.minWidth = "200px";
    
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "#45a049";
    });
    
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "#4CAF50";
    });
  }

  show(type = 'pause') {
    this.isVisible = true;
    this.element.style.display = "flex";
    
    const title = this.element.querySelector("h2");
    if (type === 'gameOver') {
      title.textContent = "GAME OVER";
    } else if (type === 'levelComplete') {
      title.textContent = "LEVEL COMPLETE";
    } else {
      title.textContent = "PAUSED";
    }
  }

  hide() {
    this.isVisible = false;
    this.element.style.display = "none";
  }

  resume() {
    if (this.callbacks.resume) {
      this.callbacks.resume();
    }
    this.hide();
  }

  restart() {
    if (this.callbacks.restart) {
      this.callbacks.restart();
    }
    this.hide();
  }

  setCallbacks(resumeCallback, restartCallback) {
    this.callbacks.resume = resumeCallback;
    this.callbacks.restart = restartCallback;
  }

  isMenuVisible() {
    return this.isVisible;
  }
}