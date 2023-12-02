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
    this.type = type;
    this.field = field;
    this.cellSize = cellSize;
    this.getNeighbours();
  }

  check() {}

  getNeighbours() {
    this.neighbours = roundCoords.map(
      ({ x, y }) => new FieldPoint(this.x + x, this.y + y, this.field.dimention)
    );
  }

  die() {
    this.type = CellTypes.dead;
    this.updateUI();
  }

  revive() {
    this.type = CellTypes.alive;
    this.updateUI();
  }

  updateUI() {
    this.type === CellTypes.alive
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
