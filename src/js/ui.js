/** @format */

import {
  setSelectedIndex,
  getSelectedIndex,
  getAnswers,
  getQuestions,
  getCurrentIndex,
  questions,
} from "./state.js";
import { calculateScore } from "./utils.js";

export function renderQuestion(questionText, optionArray, selectedIndex) {
  const questionElement = document.getElementById("question-text");
  const optionWrapper = document.getElementById("option-wrapper");

  questionElement.textContent = questionText;
  optionWrapper.textContent = "";

  optionArray.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "border px-2 py-0.5 rounded text-sm";
    button.setAttribute("type", "button");
    button.setAttribute("data-index", index);

    if (index === selectedIndex) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }

    // append each button that is created
    optionWrapper.appendChild(button);
  });
}

export function renderCurrentQuestion(index) {
  let currentQuestion = getQuestions()[index];
  let selectedIndex = getAnswers()[getQuestions()[index].id] ?? null;

  renderQuestion(currentQuestion.text, currentQuestion.options, selectedIndex);
  updateNextButtonLabel(index);
}
export function updateNextButtonLabel(currentIndex) {
  const nextButton = document.getElementById("next-button");

  if (currentIndex === questions.length - 1) {
    nextButton.textContent = "submit";
  } else {
    nextButton.textContent = "Next";
  }
}

export function showScoreResult() {
  const score = calculateScore();
  const scoreMessage = document.getElementById("score-message");

  if (scoreMessage == null) {
    return console.error("score-message element is not found");
  }

  let message = "";
  if (score === questions.length) {
    message = "Perfect Score";
  } else if (score > getQuestions().length / 2) {
    message = "Good job";
  } else {
    message = "Try again!";
  }
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");
  scoreMessage.textContent = `You scored ${score} out of ${questions.length} questions, ${message}`;
}
