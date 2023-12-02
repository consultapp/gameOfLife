import { Cell } from "./Cell.js";

export class Field {
  constructor(dimention = 100, canvas = ".board") {
    this.board = document.querySelector(canvas);
    this.dimention = dimention;
    this.controller = new AbortController();

    if (this.board) {
      if ("getContext" in this.board) {
        this.boardCtx = this.board.getContext("2d");
        this.boardCtx.fill;
      }
      this.cellSize = this.board.clientWidth / this.dimention;
      this.newField(dimention);
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

  newField(dimention = this.dimention) {
    this.field = new Array(dimention);
    for (let i = 0; i < dimention; i++) {
      this.field[i] = new Array(dimention);
      for (let j = 0; j < dimention; j++) {
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

  toggleCell(x, y) {
    this.field[x][y].toggle();
  }

  clearField() {
    this.boardCtx.fillStyle = "white";
    this.boardCtx.fillRect(
      0,
      0,
      this.cellSize * this.dimention,
      this.cellSize * this.dimention
    );
  }

  destroy() {
    this.controller.abort();
    this.clearField();
    this.board = null;
    this.boardCtx = null;
    this.field = null;
  }
}
