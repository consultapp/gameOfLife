import { Field } from "./Field.js";

export class GameOfLife {
  constructor(dimention = 10, canvas = ".board") {
    this.dimention = dimention;
    this.canvas = canvas;
  }

  init() {
    window.addEventListener("load", () => {
      this.gameField = new Field(this.dimention, this.canvas);

      const resetBtn = document.querySelector(".resetGame");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => this.reset());
      } else throw Error("no reset button found");

      const randomizeFieldBtn = document.querySelector(".randomizeField");
      if (randomizeFieldBtn) {
        randomizeFieldBtn.addEventListener("click", () =>
          this.gameField.randomLife(10)
        );
      } else throw Error("no randomize button found");
    });
  }

  reset(dimention = this.dimention, canvas = this.canvas) {
    this.dimention = dimention;
    this.canvas = canvas;

    if (this.gameField) {
      this.gameField.destroy();
    }
    this.gameField = new Field(this.dimention, this.canvas);
  }
}
