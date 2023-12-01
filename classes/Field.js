import { Cell } from "./Cell.js";

export class Field {
  constructor(dimention = 100) {
    this.root = document.querySelector(".root");
    this.dimention = dimention;
    console.log("first", this.root);
    this.divs = [];
    console.log("this.root", this.root);
    if (this.root) {
      this.initHTML();
      this.newField();
      this.randomLife(10);
      this.appendCells();
    }
  }

  newField(dimention = this.dimention) {
    if (this.root) this.root.innerHTML = "";

    this.field = new Array(dimention);
    for (let i = 0; i < dimention; i++) {
      this.field[i] = new Array(dimention);
      for (let j = 0; j < dimention; j++) {
        this.field[i][j] = new Cell(i, j, this, this.divs[i * 10 + j]);
      }
    }
    console.log("this.field", this.field);
  }

  randomLife(chance = 50) {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field.length; j++) {
        Math.random() > chance / 100
          ? this.field[i][j].die()
          : this.field[i][j].alive();
      }
    }
    console.log("this.field", this.field);
  }

  initHTML(dimention = this.dimention) {
    if (dimention) {
      //   this.root.style.gridTemplateColumns = `repeat(${this.field.length}, 1fr)`;
      this.divs = new Array(dimention * dimention);
      for (let i = 0; i < this.divs.length; i++) {
        this.divs[i] = document.createElement("div");
        this.divs[i].classList.add("dead");
      }
    }
  }
  appendCells() {
    this.root.append(...this.divs);
  }
}
