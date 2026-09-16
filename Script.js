// ==========================================
// 1. YOUR QUIZ QUESTIONS DATA
// ==========================================
const quizQuestions = [
    {
        question: "Which of the following is considered the fundamental structural and functional unit of all living organisms?",
        options: ["Atom", "Cell", "Tissue", "Organ"],
        correct: 1,
        explanation: "The cell is the basic building block of life. All living structures are constructed out of individual cells working together."
    },
    {
        question: "What primary chemical process do plants use to convert sunlight into organic chemical energy?",
        options: ["Respiration", "Fermentation", "Photosynthesis", "Digestion"],
        correct: 2,
        explanation: "Photosynthesis allows green plants to use chlorophyll to capture light energy and synthesize sugars from water and carbon dioxide."
    },
    {
        question: "If a triangle has a base of 10 cm and a height of 6 cm, what is its total mathematical area?",
        options: ["60 cm²", "30 cm²", "16 cm²", "20 cm²"],
        correct: 1,
        explanation: "The mathematical formula for the area of any triangle is: Area = 0.5 × Base × Height. Therefore, 0.5 × 10 × 6 = 30 cm²."
    },
    {
        question: "Which historical event is widely cited as the spark that triggered the outbreak of World War I?",
        options: ["The invasion of Poland", "The sinking of the Lusitania", "The assassination of Archduke Franz Ferdinand", "The signing of the Treaty of Versailles"],
        correct: 2,
        explanation: "The assassination of Archduke Franz Ferdinand of Austria in June 1914 set off a rapid sequence of alliance activations that initiated WWI."
    },
    {
        question: "What is the true chemical formula representation for a standard molecule of water?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        correct: 1,
        explanation: "A molecule of pure water is formed from two Hydrogen atoms covalently bound to a single Oxygen atom, short-formed as H2O."
    }
];

// ==========================================
// 2. QUIZ APPLICATION LOGIC
// ==========================================
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let studentName = "";

const splashScreen = document.getElementById('splash-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');

document.getElementById('start-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('student-name').value.trim();
    if (!nameInput) {
        alert("Please enter your name first!");
        return;
    }
    studentName = nameInput;
    document.getElementById('display-name').textContent = studentName;
    
    splashScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    loadQuestion();
});

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 20;
    document.getElementById('timer-display').textContent = `${timeLeft}s`;
    document.getElementById('timer-display').className = "font-mono font-bold text-xl text-fuchsia-400";
    document.getElementById('feedback-box').classList.add('hidden');
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    document.getElementById('progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('score-counter').textContent = `Score: ${score}`;
    document.getElementById('question-text').textContent = currentQuestion.question;
    
    const percentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.className = "w-full text-left px-5 py-4 rounded-2xl bg-white/5 border border-white/10 font-medium hover:bg-white/10 active:scale-99 transition transform text-base cursor-pointer text-white";
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsContainer.appendChild(btn);
    });
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').textContent = `${timeLeft}s`;
        
        if (timeLeft <= 5) {
            document.getElementById('timer-display').className = "font-mono font-bold text-xl text-red-500 animate-pulse";
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function selectAnswer(selectedIndex, clickedButton) {
    clearInterval(timer);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.getElementsByTagName('button');
    
    for (let btn of buttons) {
        btn.disabled = true;
        btn.classList.remove('hover:bg-white/10', 'cursor-pointer');
    }
    
    if (selectedIndex === currentQuestion.correct) {
        score++;
        clickedButton.className = "w-full text-left px-5 py-4 rounded-2xl bg-emerald-500/25 border-2 border-emerald-400 font-bold text-emerald-200 transition text-base";
    } else {
        clickedButton.className = "w-full text-left px-5 py-4 rounded-2xl bg-red-500/25 border-2 border-red-400 font-bold text-red-200 transition text-base";
        buttons[currentQuestion.correct].className = "w-full text-left px-5 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/50 font-medium text-emerald-300 transition text-base";
    }
    
    showFeedback(currentQuestion.explanation);
}

function handleTimeout() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.getElementsByTagName('button');
    
    for (let btn of buttons) {
        btn.disabled = true;
        btn.classList.remove('hover:bg-white/10', 'cursor-pointer');
    }
    
    buttons[currentQuestion.correct].className = "w-full text-left px-5 py-4 rounded-2xl bg-emerald-500/25 border-2 border-emerald-400 font-bold text-emerald-200 transition text-base";
    showFeedback(`Time ran out! ${currentQuestion.explanation}`);
}

function showFeedback(text) {
    document.getElementById('explanation-text').textContent = text;
    document.getElementById('feedback-box').classList.remove('hidden');
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showScoreboard();
    }
});

function showScoreboard() {
    quizScreen.classList.add('hidden');
    scoreScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    document.getElementById('final-percentage').textContent = `${percentage}%`;
    document.getElementById('final-raw').textContent = `${score} / ${quizQuestions.length}`;
    document.getElementById('cert-name').textContent = studentName;
}
