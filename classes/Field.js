import { Cell } from "./Cell.js";

export class Field {
  constructor(dimention = 100, canvas = ".board") {
    this.board = document.querySelector(canvas);
    this.dimention = dimention;

    if (this.board) {
      if ("getContext" in this.board) {
        this.boardCtx = this.board.getContext("2d");
        console.log("boardCtx", this.boardCtx);
      }
      this.cellSize = this.board.clientWidth / this.dimention;
      this.newField(dimention);
      this.board.addEventListener("pointerdown", (event) => {
        if (event) {
          const y0 = Math.trunc(event.offsetX / this.cellSize);
          const x0 = Math.trunc(event.offsetY / this.cellSize);
          this.toggleCell(x0, y0);
        }
      });
    }
  }

  newField(dimention = this.dimention) {
    this.field = new Array(dimention);
    for (let i = 0; i < dimention; i++) {
      this.field[i] = new Array(dimention);
      for (let j = 0; j < dimention; j++) {
        this.field[i][j] = new Cell(i, j, this, this.cellSize);
      }
    }
    console.dir(this.dimention);
    console.dir(this.field);
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

  destroy() {
    console.log("field destroy()");
    this.board = null;
    this.boardCtx = null;
    this.field = null;
  }
}
