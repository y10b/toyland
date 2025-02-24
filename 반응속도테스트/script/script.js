const gameArea = document.getElementById('game-area');
const circle = document.getElementById('circle');
const result = document.getElementById('result');

let startTime;

function getRandomSize() {
    // 원 크기를 20~60px 범위에서 랜덤으로 설정
    return Math.floor(Math.random() * 41) + 20;
}

function getRandomColor() {
    // 랜덤 색상 생성 (RGB 값)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomPosition(size) {
    const areaWidth = gameArea.offsetWidth;
    const areaHeight = gameArea.offsetHeight;
    const x = Math.random() * (areaWidth - size); // 원의 크기를 고려
    const y = Math.random() * (areaHeight - size); // 원의 크기를 고려
    return { x, y };
}

function showCircle() {
    const size = getRandomSize(); // 원 크기 결정
    const color = getRandomColor(); // 원 색상 결정
    const { x, y } = getRandomPosition(size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.display = 'block';

    startTime = Date.now();
}

function startGame() {
    const randomDelay = Math.random() * 2000 + 1000; // 1~3초 대기
    setTimeout(showCircle, randomDelay);
}

circle.addEventListener('click', () => {
    const reactionTime = Date.now() - startTime;
    result.textContent = `당신의 반응 속도는 ${reactionTime} ms 입니다.`;
    circle.style.display = 'none';
    startGame();
});

// 게임 시작
startGame();