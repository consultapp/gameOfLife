import { Cell } from "./Cell.js";

export class Field {
  constructor(dimention = 100, divClass = ".board") {
    this.board = document.querySelector(divClass);
    this.dimention = dimention;

    if (this.board) {
      if ("getContext" in this.board) {
        this.boardCtx = this.board.getContext("2d");
        console.log("boardCtx", this.boardCtx);
      }
      this.cellSize = this.board.clientWidth / this.dimention;
      this.newField();
      this.randomLife(20);
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
  }

  randomLife(chance = 50) {
    console.log("random life");
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field.length; j++) {
        Math.random() > chance / 100
          ? this.field[i][j].die()
          : this.field[i][j].revive();
      }
    }
  }

  destroy() {
    this.board = null;
    this.boardCtx = null;
  }
}
