import { Point } from "./Point.js";

export const CellTypes = {
  dead: "dead",
  alive: "alive",
};

export class Cell extends Point {
  constructor(x, y, field, div, type = CellTypes.dead) {
    super();
    this.type = type;
    this.field = field;
    this.div = div;
    console.log("div", div);
  }

  check() {}
  die() {
    this.type = CellTypes.dead;
    this.updateUI();
  }
  alive() {
    this.type = CellTypes.alive;
    this.updateUI();
  }

  updateUI() {
    this.div.className = this.type;
  }
}
