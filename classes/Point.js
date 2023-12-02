export class Point {
  constructor(x = null, y = null) {
    this.x = x;
    this.y = y;
  }
}

export class FieldPoint extends Point {
  constructor(x, y, fieldDimention) {
    super(x, y);
    if (fieldDimention > 0) {
      this.x = x;
      this.y = y;
      if (this.x < 0) {
        this.x = fieldDimention - 1;
      }
      if (this.y < 0) {
        this.y = fieldDimention - 1;
      }
      if (this.x >= fieldDimention) {
        this.x = 0;
      }
      if (this.y >= fieldDimention) {
        this.y = 0;
      }
    } else throw Error("Field dimention uncorrect");
  }
}
