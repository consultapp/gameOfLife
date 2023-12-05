import { Cell, CellTypes } from "./Cell.js";

export class Field {
  constructor(width, dimension = 100, canvas = ".board") {
    this.board = document.querySelector(canvas);
    this.board.width = this.board.clientWidth;
    this.board.height = this.board.clientWidth;
    this.dimension = dimension;
    this.controller = new AbortController();
    this.currentStep = 0;
    this.history = ["0".repeat(this.dimension ** 2)];

    if (this.board) {
      if ("getContext" in this.board) {
        this.boardCtx = this.board.getContext("2d");
        this.boardCtx.fill;
      }
      this.cellSize = this.board.clientWidth / this.dimension;
      this.newField(dimension);
      this.board.addEventListener("pointerdown", this.boardClickListener, {
        signal: this.controller.signal,
      });
    }
  }

  boardClickListener = (event) => {
    if (this.currentStep === 0)
      if (event) {
        const y0 = Math.trunc(event.offsetX / this.cellSize);
        const x0 = Math.trunc(event.offsetY / this.cellSize);
        this.toggleCell(x0, y0);
      }
  };

  newField(dimension = this.dimension) {
    this.field = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      this.field[i] = new Array(dimension);
      for (let j = 0; j < dimension; j++) {
        this.field[i][j] = new Cell(i, j, this, this.cellSize);
      }
    }
    this.history = ["0".repeat(this.dimension ** 2)];
  }

  randomLife(chance = 50) {
    if (this.field) {
      let string = "";
      for (let i = 0; i < this.field.length; i++) {
        for (let j = 0; j < this.field.length; j++) {
          Math.random() > chance / 100
            ? this.field[i][j].die()
            : this.field[i][j].revive();
          string +=
            this.field[i][j].getState(true) === CellTypes.alive ? "1" : "0";
        }
      }
      this.history = [string];
    }
  }

  startEmulation(sleep = 500) {
    if (!this.timer) this.timer = setInterval(this.nextState.bind(this), sleep);
  }

  stopEmulation() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }

  getCell(fieldPoint) {
    return this.field[fieldPoint.x][fieldPoint.y];
  }

  nextState = () => {
    const start = new Date().getTime();
    let hist = "";
    let aliveCount = 0;
    let currentCellState = "";
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.field[i][j].checkLife();
        currentCellState =
          this.field[i][j].getState(true) === CellTypes.alive ? 1 : 0;
        hist += `${currentCellState}`;
        aliveCount += currentCellState;
      }
    }
    const end = new Date().getTime();
    this.currentStep++;

    if (aliveCount === 0) {
      this.sendEOG(
        `End of the game: All cells are dead after ${this.currentStep} step(s).`
      );
      return;
    } else if (this.history.includes(hist)) {
      this.sendEOG(`End of the game: Loop on ${this.currentStep} step.`);
      return;
    }

    this.history.push(hist);
    // trick))
    if (this.history.length > 500) {
      this.history.shift();
    }

    const emulationEvent = new CustomEvent("emulationStep", {
      bubbles: true,
      detail: {
        time: `${this.currentStep}:${end - start}ms; `,
      },
    });
    this.board.dispatchEvent(emulationEvent);
  };

  sendEOG(msg) {
    const emulationEvent = new CustomEvent("eog", {
      bubbles: true,
      detail: {
        msg,
      },
    });
    this.stopEmulation();
    this.board.dispatchEvent(emulationEvent);
  }

  replaceHistoryAt(index, replacement) {
    this.history[0] =
      this.history[0].slice(0, index) +
      replacement +
      this.history[0].slice(index + replacement.length);
  }

  toggleCell(x, y) {
    this.field[x][y].toggle();
    this.replaceHistoryAt(
      x * this.dimension + y,
      this.field[x][y].getState() === CellTypes.alive ? "1" : "0"
    );
  }

  clearField() {
    this.boardCtx.fillStyle = "white";
    this.boardCtx.fillRect(
      0,
      0,
      this.cellSize * this.dimension,
      this.cellSize * this.dimension
    );
  }

  destroy() {
    this.stopEmulation();
    this.curretStep = 0;
    this.history = null;
    this.controller.abort();
    this.clearField();
    this.board = null;
    this.boardCtx = null;
    this.field = null;
  }
}
