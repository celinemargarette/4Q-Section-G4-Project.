const gameData = {
    easy: [
        {
            images: ["images/cute1.jpg", "images/cute2.jpg", "images/cute3.jpg", "images/cute4.jpg"],
            answer: "CUTE",
            hint: "adorable, me, celine"
        },
        {
            images: ["images/croc1.jpg", "images/croc2.jpg", "images/croc3.jpg", "images/croc4.jpg"],
            answer: "CROCS",
            hint: "marami sa senate"
        },
        {
            images: ["images/apple1.jpg", "images/apple2.jpg", "images/apple3.jpg", "images/apple4.jpg"],
            answer: "APPLE",
            hint: "crim student: ate pa print ate: a4? crim student: apple"
        }
    ],
    hard: [
        {
            images: ["images/jojo1.jpg", "images/jojo2.jpg", "images/jojo3.jpg", "images/jojo4.jpg"],
            answer: "JOJO",
            hint: "name nila lahat"
        },
        {
            images: ["images/corrupt1.jpg", "images/corrupt2.jpg", "images/corrupt3.jpg", "images/corrupt4.jpg"],
            answer: "CORRUPT",
            hint: "government"
        },
        {
            images: ["images/trapo1.jpg", "images/trapo2.jpg", "images/trapo3.jpg", "images/trapo4.jpg"],
            answer: "TRAPO",
            hint: "mar"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    const landingPage = document.getElementById('landing-page');
    const usernameContainer = document.getElementById('username-container');
    const gameContainer = document.getElementById('game-container');
    const resultsContainer = document.getElementById('results-container');
    const playBtn = document.getElementById('play-btn');
    const usernameForm = document.getElementById('username-form');
    const usernameInput = document.getElementById('username-input');
    const welcomeMessage = document.getElementById('welcome-message');
    const picsContainer = document.getElementById('pics-container');
    const letterBoxes = document.getElementById('letter-boxes');
    const answerInput = document.getElementById('answer-input');
    const submitAnswerBtn = document.getElementById('submit-answer');
    const hintBtn = document.getElementById('hint-btn');
    const currentLevelEl = document.getElementById('current-level');
    const currentScoreEl = document.getElementById('current-score');
    const progressBar = document.getElementById('progress-bar');
    const resultScore = document.getElementById('result-score');
    const resultStars = document.getElementById('result-stars');
    const playAgainBtn = document.getElementById('play-again-btn');
    const timerEl = document.getElementById('timer');

    let currentLevel = 1;
    let currentRound = {};
    let score = 0;
    let username = '';
    let timerInterval = null;
    let timeLeft = 30;

    function init() {
        const storedUsername = localStorage.getItem('fourPicOneWordUsername');
        if (storedUsername) {
            username = storedUsername;
        }

        landingPage.style.display = 'block';
        usernameContainer.style.display = 'none';
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'none';

        playBtn.addEventListener('click', function () {
            landingPage.style.display = 'none';
            usernameContainer.style.display = 'block';
            usernameInput.focus();
        });

        usernameForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputValue = usernameInput.value.trim();
            if (/^[a-zA-Z0-9]+$/.test(inputValue)) {
                username = inputValue;
                localStorage.setItem('fourPicOneWordUsername', username);
                startGame();
            } else {
                alert('Username should contain only letters and numbers.');
            }
        });

        submitAnswerBtn.addEventListener('click', checkAnswer);
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
        playAgainBtn.addEventListener('click', () => {
            resultsContainer.style.display = 'none';
            startGame();
        });
        hintBtn.addEventListener('click', showHint);
    }

    function startGame() {
        currentLevel = 1;
        score = 0;
        usernameContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        welcomeMessage.textContent = `Welcome, ${username}!`;
        loadRound();
    }

    function loadRound() {
        const isEasyRound = currentLevel <= 3;
        const roundIndex = isEasyRound ? currentLevel - 1 : currentLevel - 4;
        const roundData = isEasyRound ? gameData.easy[roundIndex] : gameData.hard[roundIndex];

        currentRound = roundData;
        answerInput.value = '';
        letterBoxes.innerHTML = '';

        currentRound.images.forEach((src, index) => {
            const box = document.getElementById(`pic-box-${index + 1}`);
            box.style.backgroundImage = `url(${src})`;
        });

        for (let i = 0; i < roundData.answer.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter-box';
            span.textContent = '_';
            letterBoxes.appendChild(span);
        }

        currentLevelEl.textContent = currentLevel;
        currentScoreEl.textContent = score;
        progressBar.style.width = `${(currentLevel - 1) / 6 * 100}%`;

        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 30;
        updateTimer();

        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time\'s up! Try again!');
                endGame();
            }
        }, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toUpperCase();
        if (userAnswer === currentRound.answer.toUpperCase()) {
            score++;
            if (currentLevel < 6) {
                currentLevel++;
                loadRound();
            } else {
                endGame();
            }
        } else {
            alert('Wrong answer. Try again!');
        }
    }

    function showHint() {
        alert(currentRound.hint);
    }

    function endGame() {
        clearInterval(timerInterval);
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultScore.textContent = `${score}/6`;
        resultStars.textContent = '★'.repeat(score >= 5 ? 3 : score >= 3 ? 2 : 1);
    }

    init();
});
