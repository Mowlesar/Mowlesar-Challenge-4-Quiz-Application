  var startButton = document.getElementById("start-button")
  var introContainer = document.getElementById("intro-container")
  var quizContainer = document.getElementById("quiz-container")
  var questionText= document.getElementById("question")
  var optionList = document.getElementById("options-list")
  var feedbackText = document.getElementById("feedback-text")
  var timerText = document.getElementById("timer-text")
  var initalsContainer = document.getElementById("initals-container")
  var highscoresLinkContainer = document.getElementById("highscores-link-container")

  // set up empty variables for score and timer

  var timer;
  var timeLeft;
  var currentQuestionsIndex = 0;
  var score = 0;
  var quizStarted = false;

  // set up questions

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
      question: "How would you select an element with the class hero in CSS?",
      options: [
        "A programming language",
        "A markup language",
        "A styling language",
        "A scripting language"
      ],
      correctAnswer: 0
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
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

  startButton.addEventListener("click", startQuiz);

  function startQuiz() {
    quizStarted = true;
    introContainer.style.display = "none";
    initalsContainer.style.display = "none";
    highscoresLinkContainer.style.display = "none";
    quizContainer.style.display = "block";

    timeLeft = 60;

    timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = timeLeft;

      if (timeLeft <= 0) {
        endQuiz ()
      }
  }, 1000);

  showQuestion();
  }

  function showQuestion() {
    var randomIndex = Math.floor(Math.random() * questions.length);
    var question = questions[randomIndex];
    questions.splice(randomIndex, 1);
    currentQuestionsIndex++;

    questionText.textContent = question.question;
    choicesList.innerHTML = "";

    for (var i = 0; i < question.choices.length; i++) {
      var choiceElement = document.createElement("li");
      choiceElement.classList.add("option");
      var choiceButton = document.createElement("button");
      choiceButton.textContent = question.choices[i];
      choiceElement.appendChild(choiceButton);
      choicesList.appendChild(choiceElement);
    }

    if (questions.length === 0) {
      questions = [
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
          question: "How would you select an element with the class hero in CSS?",
          options: [
            "A programming language",
            "A markup language",
            "A styling language",
            "A scripting language"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is NOT a JavaScript data type?",
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
    }
  }

  function  handleChoiceClick(event)  {
    if (quizStarted) {
      return;
    }

    var selectedChoiceIndex = parseInt(event.target.getAttribute("data-choice-index"));
    var currentQuestion = questions[currentQuestionsIndex]

    if (selectedChoiceIndex === currentQuestion.correctAnswer) {
      feedbackText.textContent = "Correct!";
      score++;
    } else {
      feedbackText.textContent = "Wrong!"
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerText.textContent = timeLeft;
    }
    
    showQuestion();
    }

  function endQuiz () {
    clearInterval(timer);
    quizStarted = false;
    quizContainer.style.display = "block";
    initalsContainer.style.display = "block";
    highscoresLinkContainer.style.display = "block";
    feedbackText.textContent = `The quiz is over. Your score is: ${score}`
  }

