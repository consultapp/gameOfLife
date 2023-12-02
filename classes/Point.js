export class Point {
  constructor(x = null, y = null) {
    this.x = x;
    this.y = y;
  }
}

export class FieldPoint extends Point {
  constructor(x, y, fielddimension) {
    super(x, y);
    if (fielddimension > 0) {
      this.x = x;
      this.y = y;
      if (this.x < 0) {
        this.x = fielddimension - 1;
      }
      if (this.y < 0) {
        this.y = fielddimension - 1;
      }
      if (this.x >= fielddimension) {
        this.x = 0;
      }
      if (this.y >= fielddimension) {
        this.y = 0;
      }
    } else throw Error("Field dimension uncorrect");
  }
}
