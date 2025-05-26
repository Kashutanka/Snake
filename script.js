const kletka = document.getElementById('Snake')
const ctx = kletka.getContext('2d')
const pausedBtn = document.getElementById('paused')

const size = 20;
const width = kletka.width
const height = kletka.height

function drawGrid() {
    // Цвет линий
    ctx.strokeStyle = "red";

    // Горизонтальные линии
    for (let y = 0; y <= height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Вертикальные линии
    for (let x = 0; x <= width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
}
drawGrid();

const gridSize = kletka.width / size;

const x = Math.floor(Math.random() * (gridSize - 2)) + 2;
const y = Math.floor(Math.random() * gridSize);

let snake = [
    { x: x, y: y },
    { x: x - 1, y: y },
    { x: x - 2, y: y }
];

function drawSnake() {
    ctx.fillStyle = "green";
    for (let part of snake) {
        ctx.fillRect(part.x * size, part.y * size, size, size);
    }
}

let dx = 1; // движение по x: 1 клетка вправо
let dy = 0; // пока не двигаемся по y

function moveSnake() {
    // Берём голову змейки
    const head = snake[0];
    const newHead = {
        x: head.x + dx,
        y: head.y + dy
    };

    snake.unshift(newHead);   // добавляем новую голову
    snake.pop();              // удаляем хвост (последний элемент)
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.key;

    if (key === 'W' || key === 'w' || key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (key === 'S' || key === 's' || key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (key === 'A' || key === 'a' || key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (key === 'D' || key === 'd' || key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }
}

function setDirection(newDx, newDy) {
    if (newDx === -dx && newDy === -dy) {
        return; // не даём змейке развернуться назад
    }

    dx = newDx;
    dy = newDy;
}

let paused = false;

function togglePause() {
    paused = !paused;
}

function gameLoop() {
    if (!paused) {
        moveSnake(); // двигаем только если не пауза
    }

    ctx.clearRect(0, 0, kletka.width, kletka.height);
    drawGrid();
    drawSnake();

    setTimeout(gameLoop, 150);
}


gameLoop();

