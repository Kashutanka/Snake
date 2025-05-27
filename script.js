const kletka = document.getElementById('Snake')
const ctx = kletka.getContext('2d')
const pausedBtn = document.getElementById('paused')

const size = 20; //размер клетки
const width = kletka.width
const height = kletka.height

let score = 0

//Рисуем саму сетку
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

let food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
}

function drawFood() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x * size, food.y * size, size, size)
}

let snake = [];

snake[0] = {
    x: Math.floor(kletka.width / size / 2),
    y: Math.floor(kletka.height / size / 2)
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let part of snake) {
        ctx.fillRect(part.x * size, part.y * size, size, size);
    }
}

let dx = 0;
let dy = 0;

function moveSnake() {
    // Берём голову змейки
    const head = snake[0];
    const newHead = {
        x: head.x + dx,
        y: head.y + dy
    };

    snake.pop();              // удаляем хвост (последний элемент)
    snake.unshift(newHead);   // добавляем новую голову
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
    drawFood()
    setTimeout(gameLoop, 150);
}

gameLoop();

