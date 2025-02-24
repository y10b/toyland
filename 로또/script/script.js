// CSV 파일에서 로또 번호를 읽어오는 함수
async function fetchLottoNumbersFromCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const rows = text.split('\n').map(row => row.split(','));
    const lottoNumbers = [];

    // CSV 파일의 각 행에서 로또 번호(3~8 인덱스)만 추출
    rows.forEach(row => {
        if (row.length > 8) {
            lottoNumbers.push(...row.slice(3, 9)); // 로또 번호를 배열에 추가
        }
    });

    return lottoNumbers; // 로또 번호 배열 반환
}

// 번호 추천 함수
function recommendNumbers(numbers, n = 7) {
    const count = {};  // 번호 출현 빈도를 저장할 객체
    numbers.forEach(num => {
        count[num] = (count[num] || 0) + 1;  // 각 번호의 빈도 카운트
    });

    const totalCount = numbers.length;  // 총 번호 개수
    const weights = Array.from({ length: 46 }, (_, i) => (count[i] || 0) * 100 / totalCount);  // 가중치 계산
    const recommended = [];  // 추천 번호 저장할 배열

    while (recommended.length < n) {  // 추천 번호가 n개가 될 때까지 반복
        const rand = Math.random() * 100;  // 0과 100 사이의 랜덤 숫자 생성
        let cumulativeWeight = 0;  // 누적 가중치 초기화

        for (let j = 1; j < weights.length; j++) {  // 번호 1~45에 대해
            cumulativeWeight += weights[j];  // 누적 가중치 업데이트
            if (rand < cumulativeWeight && !recommended.includes(j)) {  // 랜덤 숫자가 누적 가중치보다 작으면
                recommended.push(j);  // 추천 번호로 추가
                break;  // 반복 종료
            }
        }
    }

    return recommended;  // 추천 번호 반환
}

// 로또 데이터 가져오기 및 추천 번호 생성
async function fetchLottoData() {
    const lottoNumbers = await fetchLottoNumbersFromCSV('lottoRes.csv');  // CSV 파일에서 로또 번호 가져오기
    const recommendedNumbers = recommendNumbers(lottoNumbers);  // 추천 번호 생성
    displayResults(recommendedNumbers);  // 결과 표시
}

// 결과를 화면에 표시하는 함수
function displayResults(numbers) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `추천된 로또 번호 : ${numbers.join(', ')}`;
    resultDiv.classList.add('show'); // 애니메이션 클래스 추가

    // 애니메이션 효과 후 클래스 제거
    setTimeout(() => {
        resultDiv.classList.remove('show');
    }, 500);
}

// 문서가 로드된 후 로또 데이터 가져오기
document.addEventListener("DOMContentLoaded", function () {
    const drawButton = document.getElementById("drawButton");
    drawButton.addEventListener("click", fetchLottoData); // 버튼 클릭 시 데이터 가져오기
});