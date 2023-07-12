var startButton = document.getElementById("start-button");
var introContainer = document.getElementById("intro-container");
var quizContainer = document.getElementById("quiz-container");
var questionText = document.getElementById("question");
var choicesList = document.getElementById("options-list");
var feedbackText = document.getElementById("feedback-text");
var timerText = document.getElementById("timer-text");
var initialsContainer = document.getElementById("initials-container");
var highscoresLinkContainer = document.getElementById("highscores-link-container");
var submitButton = document.getElementById("submit-button")
var finalMessage = document.getElementById("final-message")

var timer;
var timeLeft;
var currentQuestionIndex = 0;
var score = 0;
var quizStarted = false;

var questions = [
  {
    question: "What is JavaScript?",
    options: [
      "A programming language",
      "A markup language",
      "A styling language",
      "A scripting language"
    ],
    correctAnswer: 0
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Oriented Model",
      "Data Object Model",
      "Document Object Model",
      "Data Oriented Model"
    ],
    correctAnswer: 2
  },
  {
    question: "What is the correct HTML tag for insterting a line break?",
    options: [
      "<br>",
      "<break>",
      "<lb>",
      "<line>"
    ],
    correctAnswer: 0
  },
  {
    question: "What is HTML",
    options: [
      "A programming language",
      "A markup language",
      "A styling language",
      "A scripting language"
    ],
    correctAnswer: 1
  },
  {
    question: "How would you select an element with the class example in CSS?",
    options: [
      "*example",
      "example",
      "#example",
      ".example"
    ],
    correctAnswer: 3
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      "String",
      "Number",
      "Float",
      "Boolean"
    ],
    correctAnswer: 2
  },
  {
    question: " What does the <img> tag in HTML stand for?",
    options: [
      "Import",
      "Image",
      "Inline",
      "Insert"
    ],
    correctAnswer: 1
  },
  {
    question: "How can you add a background color to an HTML element using CSS?",
    options: [
      "background-color: red;",
      "color: red;",
      "text-color: red;",
      "background: red;"
    ],
    correctAnswer: 0
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: [
      "<ol>",
      "<li>",
      "<ul>",
      "<list>"
    ],
    correctAnswer: 3
  },
  {
    question: "How do you write a comment in JavaScript?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
      "# This is a comment"
    ],
    correctAnswer: 1
  },
];

var remainingQuestions = [];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  quizStarted = true;
  introContainer.style.display = "none";
  initialsContainer.style.display = "none";
  highscoresLinkContainer.style.display = "none";
  quizContainer.style.display = "block";

  timeLeft = 60;
  timerText.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);

  remainingQuestions = questions.slice();
  currentQuestionIndex = 0;

  showQuestion();
}

function showQuestion() {
  if (remainingQuestions.length <= currentQuestionIndex) {
    endQuiz();
    return;
  }
  var question = remainingQuestions[currentQuestionIndex];
  questionText.textContent = question.question;
  choicesList.innerHTML = "";

  for (var i = 0; i < question.options.length; i++) {
    var choiceElement = document.createElement("li");
    choiceElement.classList.add("option");
    var choiceButton = document.createElement("button");
    choiceButton.textContent = question.options[i];
    choiceButton.setAttribute("data-choice-index", i);
    choiceButton.addEventListener("click", handleChoiceClick);
    choiceElement.appendChild(choiceButton);
    choicesList.appendChild(choiceElement);
  }
}

function handleChoiceClick(event) {
  if (!quizStarted) {
    return;
  }

  var selectedChoiceIndex = parseInt(event.target.getAttribute("data-choice-index"));
  var currentQuestion = remainingQuestions[currentQuestionIndex];

  if (selectedChoiceIndex === currentQuestion.correctAnswer) {
    feedbackText.textContent = "Correct!";
    score++;
  } else {
    feedbackText.textContent = "Wrong!";
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  currentQuestionIndex++;
  showQuestion();
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); 

  var initialsInput = document.getElementById("initial-input");
  var initials = initialsInput.value.trim(); 
  var savedScore = JSON.parse(localStorage.getItem(`savedScores`)) || [];
  var currentScore = {
    score: score,
    initials: initials
  }

  if (initials !== "") {
    savedScore.push(currentScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore));

    window.location.href = "highscores-files/highscores.html";
  }
});


function endQuiz() {
  clearInterval(timer);
  quizStarted = false;
  quizContainer.style.display = "none";
  initialsContainer.style.display = "block";
  highscoresLinkContainer.style.display = "block";
  feedbackText.style.display = "none";

  if (score === questions.length) {
    finalMessage.textContent = `Congratulations! You scored ${score} out of ${questions.length}. You answered all questions correctly!`;
  } else {
    finalMessage.textContent = `The quiz is over. Your score is: ${score} out of ${questions.length}`;
  }
} 