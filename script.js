const kletka = document.getElementById('Snake')
const ctx = kletka.getContext('2d')

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

function gameLoop() {
    ctx.clearRect(0, 0, kletka.width, kletka.height); // очистить экран
    drawGrid();    // рисуем сетку
    drawSnake();   // рисуем змейку
    requestAnimationFrame(gameLoop);
}

gameLoop();

