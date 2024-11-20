# Game of Life

Игра «Жизнь» (англ. Game of Life) — клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году. Это игра без игроков, в которой человек создаёт начальное состояние, а потом лишь наблюдает за её развитием. В игре можно создать процессы с полнотой по Тьюрингу, что позволяет реализовать любую машину Тьюринга.

- <a href="https://dreamy-souffle-2f3e98.netlify.app/" target="_blank">Рабочий макет: https://dreamy-souffle-2f3e98.netlify.app/</a>;
- <a href="https://github.com/consultapp/gameOfLife" target="_blank">Репозиторий: https://github.com/consultapp/gameOfLife</a>.

## Подключение и базовое поле

```
import { GameOfLife } from "./classes/GameOfLife.js";

const game = new GameOfLife();
game.init();

```

```
      <div class="form">
        <div>
          <label>Field dimension:</label>
          <input id="dimension" value="25" />
          <button class="resetGame">Reset</button>
        </div>
        <div>
          <lable>Change cells by the pointer or </lable>&nbsp;
          <button class="randomizeField">Randomize field</button>
        </div>
        <div>
          <label>Sleep (ms):</label>
          <input class="sleep" value="250" />
          <button class="startBtn">Start</button>
          <button class="stopBtn">Stop</button>
        </div>
        <div>
          <button class="nextBtn">Next step</button>
        </div>
      </div>
      <canvas class="board"></canvas>
      <textarea cols="100" rows="10" class="timeContainer"></textarea>
    </div>
    <dialog>
      <p id="message">Greetings, one and all!</p>
      <form method="dialog">
        <button>Reset game</button>
      </form>
    </dialog>
```
