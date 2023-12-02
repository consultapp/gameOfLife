import { Field } from "./Field.js";

export class GameOfLife {
  constructor(dimension = 10, canvas = ".board") {
    this.dimension = dimension;
    this.canvas = canvas;
  }

  init() {
    this.controller = new AbortController();
    window.addEventListener("load", () => {
      this.initDimension();
      this.gameField = new Field(this.dimension, this.canvas);
      this.initStartBtn();
      this.initStopBtn();
      this.initResetBtn();
      this.initRandomizeBtn();
      this.initTimeMeasurement();
    });
  }

  initTimeMeasurement() {
    this.timeContainer = document.querySelector(".timeContainer");
    if (this.timeContainer) {
      window.addEventListener(
        "emulationStep",
        (event) => {
          console.log("event", event);
          this.timeContainer.innerHTML += event.detail.time;
        },
        {
          signal: this.controller.signal,
        }
      );
    } else throw Error("no timeContainer found");
  }

  initStartBtn() {
    this.startBtn = document.querySelector(".startBtn");
    if (this.startBtn) {
      this.startBtn.addEventListener("click", this.start, {
        signal: this.controller.signal,
      });
    } else throw Error("no start button found");
  }

  initStopBtn() {
    this.stopBtn = document.querySelector(".stopBtn");
    if (this.stopBtn) {
      this.stopBtn.disabled = true;
      this.stopBtn.addEventListener("click", this.stop, {
        signal: this.controller.signal,
      });
    } else throw Error("no stop button found");
  }

  initDimension() {
    this.dimensionField = document.getElementById("dimension");
    if (this.dimensionField) {
      this.dimension = parseInt(this.dimensionField?.value) || 10;
    }
  }

  initResetBtn() {
    this.resetBtn = document.querySelector(".resetGame");
    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.reset(), {
        signal: this.controller.signal,
      });
    } else throw Error("no reset button found");
  }

  initRandomizeBtn() {
    this.randomizeFieldBtn = document.querySelector(".randomizeField");
    if (this.randomizeFieldBtn) {
      this.randomizeFieldBtn.addEventListener(
        "click",
        () => this.gameField.randomLife(10),
        { signal: this.controller.signal }
      );
    } else throw Error("no randomize button found");
  }

  start = () => {
    this.randomizeFieldBtn.disabled = true;
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;

    this.gameField.startEmulation();
  };

  stop = () => {
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.gameField.stopEmulation();
  };

  reset(dimension = this.dimension, canvas = this.canvas) {
    this.randomizeFieldBtn.disabled = false;
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.timeContainer.innerHTML = "";

    const d = parseInt(this.dimensionField?.value) || 10;
    this.dimension = dimension;
    if (d) this.dimension = d;
    this.canvas = canvas;

    if (this.gameField) {
      this.gameField.destroy();
    }
    this.gameField = new Field(this.dimension, this.canvas);
  }

  destroy() {
    this.controller.abort();
    this.gameField.destroy();
    this.gameField = null;
  }
}
