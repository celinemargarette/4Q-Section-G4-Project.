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
    let timer = null;
    let timeLeft = 30;

    function init() {
        const savedName = localStorage.getItem('fourPicOneWordUsername');
        if (savedName) {
            username = savedName;
        }

        landingPage.style.display = 'block';
        usernameContainer.style.display = 'none';
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'none';

        playBtn.onclick = () => {
            landingPage.style.display = 'none';
            usernameContainer.style.display = 'block';
            usernameInput.focus();
        };

        usernameForm.onsubmit = (e) => {
            e.preventDefault();
            const val = usernameInput.value.trim();
            if (/^[a-zA-Z0-9]+$/.test(val)) {
                username = val;
                localStorage.setItem('fourPicOneWordUsername', username);
                startGame();
            } else {
                alert("Username should only contain letters and numbers!");
            }
        };

        submitAnswerBtn.onclick = checkAnswer;

        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });

        hintBtn.onclick = () => {
            alert(currentRound.hint);
        };

        playAgainBtn.onclick = () => {
            resultsContainer.style.display = 'none';
            startGame();
        };
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
        const isEasy = currentLevel <= 3;
        const index = isEasy ? currentLevel - 1 : currentLevel - 4;
        const round = isEasy ? gameData.easy[index] : gameData.hard[index];

        currentRound = round;

        answerInput.value = '';
        letterBoxes.innerHTML = '';

        round.images.forEach((src, i) => {
            const box = document.getElementById(`pic-box-${i + 1}`);
            box.style.backgroundImage = `url(${src})`;
        });

        for (let i = 0; i < round.answer.length; i++) {
            const letter = document.createElement('span');
            letter.classList.add('letter-box');
            letter.textContent = '_';
            letterBoxes.appendChild(letter);
        }

        currentLevelEl.textContent = currentLevel;
        currentScoreEl.textContent = score;
        progressBar.style.width = ((currentLevel - 1) / 6) * 100 + "%";

        startTimer();
    }

    function startTimer() {
        clearInterval(timer);
        timeLeft = 30;
        updateTimer();

        timer = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up!");
                endGame();
            }
        }, 1000);
    }

    function updateTimer() {
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        timerEl.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function checkAnswer() {
        const userInput = answerInput.value.trim().toUpperCase();
        if (userInput === currentRound.answer.toUpperCase()) {
            score++;
            if (currentLevel < 6) {
                currentLevel++;
                loadRound();
            } else {
                endGame();
            }
        } else {
            alert("Mali! Try ulit.");
        }
    }

    function endGame() {
        clearInterval(timer);
        gameContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultScore.textContent = `${score}/6`;
        resultStars.textContent = "★".repeat(score >= 5 ? 3 : score >= 3 ? 2 : 1);
    }

    init();
});
