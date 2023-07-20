const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let canvasWidth, canvasHeight, platformWidth, platformHeight, circleRadius, circleColor, circleSpeed, platformSpeed;
let topPlatformX, bottomPlatformX;
let topPlatformY = 0;
let bottomPlatformY;
let circleX, circleY, circleDX, circleDY;
let topScore = 0;
let bottomScore = 0;
let topPlatformColor = '#ff0000';
let bottomPlatformColor = '#00ff00';
const keys = {};

function updateCanvasSize() {
    canvasWidth = parseInt(document.getElementById('canvasWidth').value);
    canvasHeight = parseInt(document.getElementById('canvasHeight').value);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    bottomPlatformY = canvasHeight - platformHeight;
    topPlatformX = canvasWidth / 2 - platformWidth / 2;
    bottomPlatformX = canvasWidth / 2 - platformWidth / 2;
    circleX = canvasWidth / 2;
    circleY = canvasHeight / 2;
}

function initializeGame() {
    platformWidth = parseInt(document.getElementById('platformWidth').value);
    platformHeight = parseInt(document.getElementById('platformHeight').value);
    circleRadius = parseInt(document.getElementById('circleRadius').value);
    circleColor = document.getElementById('circleColor').value;
    circleSpeed = parseInt(document.getElementById('circleSpeed').value);
    platformSpeed = parseInt(document.getElementById('platformSpeed').value);
    topPlatformColor = document.getElementById('topPlatformColor').value;
    bottomPlatformColor = document.getElementById('bottomPlatformColor').value;
    updateCanvasSize();
    circleDX = circleSpeed;
    circleDY = circleSpeed;

    window.addEventListener('keydown', function (event) {
        keys[event.key] = true;
    });

    window.addEventListener('keyup', function (event) {
        keys[event.key] = false;
    });
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = circleColor;
    ctx.fill();
    ctx.closePath();
}

function drawPlatform(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, platformWidth, platformHeight);
}

function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = topPlatformColor;
    ctx.fillText(`${topScore}`, canvasWidth / 4, canvasHeight / 2 + 15);
    ctx.fillStyle = bottomPlatformColor;
    ctx.fillText(`${bottomScore}`, (canvasWidth * 3) / 4, canvasHeight / 2 + 15);
}

function update() {
    if (keys['a']) {
        topPlatformX -= platformSpeed;
    }
    if (keys['d']) {
        topPlatformX += platformSpeed;
    }
    if (keys['ArrowLeft']) {
        bottomPlatformX -= platformSpeed;
    }
    if (keys['ArrowRight']) {
        bottomPlatformX += platformSpeed;
    }

    circleX += circleDX;
    circleY += circleDY;

    if (circleX - circleRadius <= 0 || circleX + circleRadius >= canvasWidth) {
        circleDX = -circleDX;
    }

    if (circleY - circleRadius <= 0) {
        circleY = canvasHeight / 2;
        circleDY = circleSpeed;
        bottomScore++;
    }

    if (circleY + circleRadius >= canvasHeight) {
        circleY = canvasHeight / 2;
        circleDY = -circleSpeed;
        topScore++;
    }

    if (
        circleY - circleRadius <= platformHeight &&
        circleX + circleRadius >= topPlatformX &&
        circleX - circleRadius <= topPlatformX + platformWidth
    ) {
        circleDY = circleSpeed;
    }

    if (
        circleY + circleRadius >= canvasHeight - platformHeight &&
        circleX + circleRadius >= bottomPlatformX &&
        circleX - circleRadius <= bottomPlatformX + platformWidth
    ) {
        circleDY = -circleSpeed;
    }

    if (topPlatformX <= 0 && circleDX < 0) {
        topPlatformX = 0;
    }

    if (topPlatformX + platformWidth >= canvasWidth && circleDX > 0) {
        topPlatformX = canvasWidth - platformWidth;
    }

    if (bottomPlatformX <= 0 && circleDX < 0) {
        bottomPlatformX = 0;
    }

    if (bottomPlatformX + platformWidth >= canvasWidth && circleDX > 0) {
        bottomPlatformX = canvasWidth - platformWidth;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawCircle();
    drawPlatform(topPlatformX, topPlatformY, topPlatformColor);
    drawPlatform(bottomPlatformX, bottomPlatformY, bottomPlatformColor);
    drawScore();
    if (gameRunning) requestAnimationFrame(update);
}

document.getElementById('canvasWidth').addEventListener('input', function () {
    updateCanvasSize();
});

document.getElementById('canvasHeight').addEventListener('input', function () {
    updateCanvasSize();
});

document.getElementById('platformWidth').addEventListener('input', function () {
    platformWidth = parseInt(this.value);
});

document.getElementById('platformHeight').addEventListener('input', function () {
    platformHeight = parseInt(this.value);
});

document.getElementById('topPlatformColor').addEventListener('input', function () {
    topPlatformColor = this.value;
    document.getElementById('gameCanvas').focus();
});

document.getElementById('bottomPlatformColor').addEventListener('input', function () {
    bottomPlatformColor = this.value;
    document.getElementById('gameCanvas').focus();
});

document.getElementById('circleRadius').addEventListener('input', function () {
    circleRadius = parseInt(this.value);
});

document.getElementById('circleColor').addEventListener('input', function () {
    circleColor = this.value;
});

document.getElementById('circleSpeed').addEventListener('input', function () {
    circleSpeed = parseInt(this.value);
    circleDX = circleSpeed;
    circleDY = circleSpeed;
});

document.getElementById('platformSpeed').addEventListener('input', function () {
    platformSpeed = parseInt(this.value);
});

let gameRunning = false;
let paused = false;
let gameStarted = false; // New flag to track if the game has been explicitly started

let defaultCanvasWidth = 500;
let defaultCanvasHeight = 600;
let defaultPlatformWidth = 100;
let defaultPlatformHeight = 10;
let defaultTopPlatformColor = "#ff0000";
let defaultBottomPlatformColor = "#00ff00";
let defaultCircleRadius = 20;
let defaultCircleColor = "#0000ff";
let defaultCircleSpeed = 2;
let defaultPlatformSpeed = 5;

canvasWidth, canvasHeight, platformWidth, platformHeight, circleRadius, circleColor, circleSpeed, platformSpeed;
topPlatformX, bottomPlatformX;
topPlatformY = 0;
bottomPlatformY;
circleX, circleY, circleDX, circleDY;
topScore = 0;
bottomScore = 0;
topPlatformColor = defaultTopPlatformColor;
bottomPlatformColor = defaultBottomPlatformColor;
gameRunning = false;
paused = false;
gameStarted = false;

function updateCanvasSize() {
    canvasWidth = parseInt(document.getElementById('canvasWidth').value);
    canvasHeight = parseInt(document.getElementById('canvasHeight').value);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    bottomPlatformY = canvasHeight - platformHeight;
    topPlatformX = canvasWidth / 2 - platformWidth / 2;
    bottomPlatformX = canvasWidth / 2 - platformWidth / 2;
    circleX = canvasWidth / 2;
    circleY = canvasHeight / 2;
}

function initializeGame() {
    platformWidth = parseInt(document.getElementById('platformWidth').value);
    platformHeight = parseInt(document.getElementById('platformHeight').value);
    circleRadius = parseInt(document.getElementById('circleRadius').value);
    circleColor = document.getElementById('circleColor').value;
    circleSpeed = parseInt(document.getElementById('circleSpeed').value);
    platformSpeed = parseInt(document.getElementById('platformSpeed').value);
    topPlatformColor = document.getElementById('topPlatformColor').value;
    bottomPlatformColor = document.getElementById('bottomPlatformColor').value;
    updateCanvasSize();
    circleDX = circleSpeed;
    circleDY = circleSpeed;

    window.addEventListener('keydown', function (event) {
        keys[event.key] = true;
    });

    window.addEventListener('keyup', function (event) {
        keys[event.key] = false;
    });
}

function startGame() {
    if (!gameStarted) { // Only start the game if it hasn't been explicitly started before
        gameStarted = true;
        gameRunning = true;
        paused = false;
        circleDX = circleSpeed;
        circleDY = circleSpeed;
        update();
    }
}

function stopGame() {
    gameRunning = false;
    paused = true;
    circleDX = 0;
    circleDY = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawCircle();
    drawPlatform(topPlatformX, topPlatformY, topPlatformColor);
    drawPlatform(bottomPlatformX, bottomPlatformY, bottomPlatformColor);
    drawScore();
    drawPauseIcon();
}

function drawPauseIcon() {
    ctx.font = "60px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(pauseIcon, canvasWidth / 2, canvasHeight / 2);
}

function resetGame() {
    gameStarted = false; // Reset the gameStarted flag when resetting the game
    gameRunning = false;
    paused = false;
    topScore = 0;
    bottomScore = 0;
    document.getElementById('canvasWidth').value = defaultCanvasWidth;
    document.getElementById('canvasHeight').value = defaultCanvasHeight;
    document.getElementById('platformWidth').value = defaultPlatformWidth;
    document.getElementById('platformHeight').value = defaultPlatformHeight;
    document.getElementById('topPlatformColor').value = defaultTopPlatformColor;
    document.getElementById('bottomPlatformColor').value = defaultBottomPlatformColor;
    document.getElementById('circleRadius').value = defaultCircleRadius;
    document.getElementById('circleColor').value = defaultCircleColor;
    document.getElementById('circleSpeed').value = defaultCircleSpeed;
    document.getElementById('platformSpeed').value = defaultPlatformSpeed;
    initializeGame(); // Reinitialize the game with default values
    stopGame();
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

// Initialize the game without automatically starting it
resetGame();
