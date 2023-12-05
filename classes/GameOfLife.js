import { Field } from "./Field.js";

export class GameOfLife {
  constructor(width = 500, dimension = 10, canvas = ".board") {
    this.dimension = dimension;
    this.canvas = canvas;
    this.width = width;
  }

  init() {
    this.controller = new AbortController();
    window.addEventListener("load", () => {
      this.initDialog();
      this.initDimension();
      this.gameField = new Field(this.width, this.dimension, this.canvas);
      this.initStartBtn();
      this.initStopBtn();
      this.initResetBtn();
      this.initRandomizeBtn();
      this.initTimeMeasurement();
      this.initEogListener();
      this.initNextBtn();
    });
  }

  initDialog() {
    this.dialog = document.querySelector("dialog");
    if (this.dialog) {
      this.dialogClose = this.dialog.querySelector("dialog button");
      this.dialogClose.addEventListener(
        "click",
        () => {
          this.dialog.close();
          this.reset();
        },
        {
          signal: this.controller.signal,
        }
      );
    } else throw Error("no dialog was found");
  }

  initTimeMeasurement() {
    this.timeContainer = document.querySelector(".timeContainer");
    if (this.timeContainer) {
      window.addEventListener(
        "emulationStep",
        (event) => {
          this.timeContainer.innerHTML += event.detail.time;
        },
        {
          signal: this.controller.signal,
        }
      );
    } else throw Error("no timeContainer was found");
  }

  initEogListener() {
    window.addEventListener(
      "eog",
      (event) => {
        this.stop();
        this.dialog.children[0].innerHTML = event.detail.msg;
        this.dialog.showModal();
      },
      {
        signal: this.controller.signal,
      }
    );
  }

  initStartBtn() {
    this.startBtn = document.querySelector(".startBtn");
    this.sleepField = document.querySelector(".sleep");
    if (this.startBtn) {
      this.startBtn.addEventListener(
        "click",
        () => this.start(parseInt(this.sleepField?.value) ?? 500),
        {
          signal: this.controller.signal,
        }
      );
    } else throw Error("no start button was found");
  }

  initStopBtn() {
    this.stopBtn = document.querySelector(".stopBtn");
    if (this.stopBtn) {
      this.stopBtn.disabled = true;
      this.stopBtn.addEventListener("click", this.stop, {
        signal: this.controller.signal,
      });
    } else throw Error("no stop button was found");
  }

  initNextBtn() {
    this.nextBtn = document.querySelector(".nextBtn");
    if (this.nextBtn) {
      this.nextBtn.addEventListener(
        "click",
        () => {
          if (this.gameField.history[0] !== "0".repeat(this.dimension ** 2)) {
            this.gameField.nextState();
          } else {
            this.dialog.children[0].innerHTML =
              "We need at least one alive cell.";
            this.dialog.showModal();
          }
        },
        {
          signal: this.controller.signal,
        }
      );
    } else throw Error("no next button was found");
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
    } else throw Error("no reset button was found");
  }

  initRandomizeBtn() {
    this.randomizeFieldBtn = document.querySelector(".randomizeField");
    if (this.randomizeFieldBtn) {
      this.randomizeFieldBtn.addEventListener(
        "click",
        () => this.gameField.randomLife(10),
        { signal: this.controller.signal }
      );
    } else throw Error("no randomize button was found");
  }

  start = (sleep = 250) => {
    if (this.gameField.history[0] !== "0".repeat(this.dimension ** 2)) {
      this.randomizeFieldBtn.disabled = true;
      this.startBtn.disabled = true;
      this.nextBtn.disabled = true;
      this.stopBtn.disabled = false;

      this.gameField.startEmulation(sleep);
    } else {
      this.dialog.children[0].innerHTML = "We need at least one alive cell.";
      this.dialog.showModal();
    }
  };

  stop = () => {
    this.startBtn.disabled = false;
    this.nextBtn.disabled = false;
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
    this.gameField = new Field(this.width, this.dimension, this.canvas);
  }

  destroy() {
    this.controller.abort();
    this.gameField.destroy();
    this.gameField = null;
  }
}
