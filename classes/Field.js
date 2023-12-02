import { Cell } from "./Cell.js";

export class Field {
  constructor(dimension = 100, canvas = ".board") {
    this.board = document.querySelector(canvas);
    this.dimension = dimension;
    this.controller = new AbortController();
    this.currentStep = 0;

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
  }

  randomLife(chance = 50) {
    if (this.field) {
      for (let i = 0; i < this.field.length; i++) {
        for (let j = 0; j < this.field.length; j++) {
          Math.random() > chance / 100
            ? this.field[i][j].die()
            : this.field[i][j].revive();
        }
      }
    }
  }

  startEmulation() {
    if (!this.timer) this.timer = setInterval(this.nextState.bind(this), 1000);
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
    console.log("step start:", this.currentStep);
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.field[i][j].checkLife();
      }
    }
    this.currentStep++;
    console.log("this.field", this.field);
  };

  toggleCell(x, y) {
    this.field[x][y].toggle();
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
    this.curretStep = 0;
    this.controller.abort();
    this.clearField();
    this.board = null;
    this.boardCtx = null;
    this.field = null;
  }
}
