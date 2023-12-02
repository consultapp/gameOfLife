import { FieldPoint, Point } from "./Point.js";

export const CellTypes = {
  dead: "dead",
  alive: "alive",
};

const roundCoords = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
];

export class Cell extends Point {
  constructor(x, y, field, cellSize = 10, type = CellTypes.dead) {
    super(x, y);
    this.type = [type];
    this.field = field;
    this.cellSize = cellSize;
    this.getNeighbours();
  }

  checkLife() {
    let count = 0;
    if (this.getState() === CellTypes.dead) {
      for (let i = 0; i < this.neighbours.length; i++) {
        if (
          this.field.getCell(this.neighbours[i]).getState() === CellTypes.alive
        )
          count++;
        if (count === 3) {
          this.revive(true);
          return;
        }
      }
    } else {
      for (let i = 0; i < this.neighbours.length; i++) {
        if (
          this.field.getCell(this.neighbours[i]).getState() === CellTypes.alive
        ) {
          count++;
        }
      }
      if (count < 2 || count > 3) {
        this.die(true);
        return;
      }
    }

    this.saveType();
  }

  getState(last = false) {
    return last ? this.type.at(-1) : this.type[this.field.currentStep];
  }

  getNeighbours() {
    this.neighbours = roundCoords.map(
      ({ x, y }) => new FieldPoint(this.x + x, this.y + y, this.field.dimension)
    );
  }

  die(queue = false) {
    if (!queue) this.type[0] = CellTypes.dead;
    else this.type.push(CellTypes.dead);
    this.updateUI(true);
  }

  revive(queue = false) {
    if (!queue) this.type[0] = CellTypes.alive;
    else this.type.push(CellTypes.alive);
    this.updateUI(true);
  }

  saveType() {
    this.type.push(this.type.at(-1));
  }

  toggle(queue = false) {
    this.getState() === CellTypes.alive ? this.die(queue) : this.revive(queue);
  }

  updateUI(last = true) {
    this.getState(last) === CellTypes.alive
      ? (this.field.boardCtx.fillStyle = "red")
      : (this.field.boardCtx.fillStyle = "white");

    this.field.boardCtx.fillRect(
      this.y * this.cellSize,
      this.x * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
