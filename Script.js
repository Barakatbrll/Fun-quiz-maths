 const quizData = [
    { question: "What is 5 + 3?", choices: ["6", "7", "8", "9"], correct: "8" },
    { question: "What is 12 ÷ 4?", choices: ["2", "3", "4", "5"], correct: "3" },
    { question: "What is 5 + 1?", choices: ["6", "7", "8", "9"], correct: "6" },
    { question: "What is 12 ÷ 3?", choices: ["2", "3", "4", "5"], correct: "4" },
    { question: "What is 7 × 6?", choices: ["42", "46", "36", "56"], correct: "42" },
    { question: "What is 15 − 7?", choices: ["6", "7", "8", "9"], correct: "8" },
    { question: "What is 9²?", choices: ["81", "72", "64", "90"], correct: "81" },
    { question: "Solve: √144", choices: ["12", "14", "10", "16"], correct: "12" },
    { question: "What is 25% of 200?", choices: ["50", "40", "60", "75"], correct: "50" },
    { question: "What is the sum of angles in a triangle?", choices: ["180°", "90°", "360°", "270°"], correct: "180°" },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const current = quizData[currentQuestion];

    questionEl.textContent = current.question;
    choicesEl.innerHTML = '';
    current.choices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.onclick = () => selectAnswer(choice);
        choicesEl.appendChild(li);
    });
let timer;
let timeLeft = 10;

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                document.getElementById('result').textContent = `Time's up! Your score is ${score}/${quizData.length}`;
            }
        }
    }, 1000);

    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const current = quizData[currentQuestion];

    questionEl.textContent = current.question;
    choicesEl.innerHTML = '';
    current.choices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.onclick = () => {
            clearInterval(timer);
            selectAnswer(choice);
        };
        choicesEl.appendChild(li);
    });
}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizData);

const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

function selectAnswer(choice) {
    const resultEl = document.getElementById('result');
    const current = quizData[currentQuestion];

    if (choice === current.correct) {
        correctSound.play();
        score++;
        resultEl.textContent = "Correct!";
    } else {
        wrongSound.play();
        resultEl.textContent = "Wrong! The correct answer was " + current.correct;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            resultEl.textContent = '';
            loadQuestion();
        }, 1000);
    } else {
        resultEl.textContent = "Quiz Over! Your score is " + score + "/" + quizData.length;
    }
}
const leaderboard = [];

document.getElementById('name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    displayLeaderboard();
    document.getElementById('name-form').reset();
});

function displayLeaderboard() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.score}`;
        scoresList.appendChild(li);
    });
}

function selectAnswer(choice) {
    const resultEl = document.getElementById('result');
    const current = quizData[currentQuestion];

    if (choice === current.correct) {
        score++;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong! The correct answer was " + current.correct;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        setTimeout(() => {
            resultEl.textContent = '';
            loadQuestion();
        }, 1000);
    } else {
        resultEl.textContent = "Quiz Over! Your score is " + score + "/" + quizData.length;
    }
}

document.addEventListener('DOMContentLoaded', loadQuestion);