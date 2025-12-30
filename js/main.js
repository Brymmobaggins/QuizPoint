/** @format */

import { renderQuestion } from "./ui.js";

let selectedIndex = null;
let currentIndex = 0;
let answers = {};

// array of questions
const questions = [
  {
    id: "q1",
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswerIndex: 2,
  },
  {
    id: "q2",
    text: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
    correctAnswerIndex: 1,
  },
  {
    id: "q3",
    text: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    correctAnswerIndex: 2,
  },
  {
    id: "q4",
    text: "What is the smallest country in the world by area?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswerIndex: 1,
  },
];
function renderCurrentQuestion(index) {
  let currentQuestion = questions[index];
  selectedIndex = answers[questions[index].id] ?? null;

  renderQuestion(currentQuestion.text, currentQuestion.options, selectedIndex);
  updateNextButtonLabel(index);
}

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  let currentQuestion = questions[currentIndex];

  if (answers[currentQuestion.id] == null) {
    alert("Pick an option");
    return;
  }
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderCurrentQuestion(currentIndex);
  } else {
    let score = calculateScore();
    alert(`your score is ${score}/ ${questions.length}`);
  }
});

function calculateScore() {
  let score = 0;
  questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswerIndex) {
      score++;
    }
  });
  return score;
}

renderCurrentQuestion(currentIndex);

function updateNextButtonLabel(currentIndex) {
  const nextButton = document.getElementById("next-button");

  if (currentIndex === questions.length - 1) {
    nextButton.textContent = "submit";
  } else {
    nextButton.textContent = "Next";
  }
}

const optionWrapper = document.getElementById("option-wrapper");
optionWrapper.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  let indexValue = Number(btn.dataset.index);

  let currentQuestion = questions[currentIndex];
  answers[currentQuestion.id] = indexValue;
  renderCurrentQuestion(currentIndex);
});
