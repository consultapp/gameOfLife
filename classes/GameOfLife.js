import { Field } from "./Field.js";

export class GameOfLife {
  constructor(dimention = 10, canvas = ".board") {
    this.dimention = dimention;
    this.canvas = canvas;
  }

  init() {
    this.controller = new AbortController();
    window.addEventListener("load", () => {
      this.gameField = new Field(this.dimention, this.canvas);

      this.resetBtn = document.querySelector(".resetGame");
      if (this.resetBtn) {
        this.resetBtn.addEventListener("click", () => this.reset(), {
          signal: this.controller.signal,
        });
      } else throw Error("no reset button found");

      this.randomizeFieldBtn = document.querySelector(".randomizeField");
      if (this.randomizeFieldBtn) {
        this.randomizeFieldBtn.addEventListener(
          "click",
          () => this.gameField.randomLife(10),
          { signal: this.controller.signal }
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

  destroy() {
    this.controller.abort();
    this.gameField.destroy();
    this.gameField = null;
  }
}
