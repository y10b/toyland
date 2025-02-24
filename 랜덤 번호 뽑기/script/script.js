document.getElementById('draw-button').addEventListener('click', function() {
    const maxNumber = parseInt(document.getElementById('max-number').value); // 사용자가 입력한 최대 숫자
    if (isNaN(maxNumber) || maxNumber < 1) {
        alert('1 이상의 숫자를 입력하세요.');
        return;
    }
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1; // 1부터 maxNumber까지의 랜덤 번호
    document.getElementById('roulette-number').textContent = randomNumber;
});
