/** @format */

import {
  getAnswers,
  getQuestions,
  questions,
  getCurrentIndex,
  setCurrentIndex,
} from "./state.js";

import { calculateScore } from "./utils.js";
export let totalTimeElapsed = 0;
export let questionTimeLeft = 30;

export let questionTimerInterval;
export let totalTimerInterval;

export function renderQuestion(questionText, optionArray, selectedIndex) {
  const questionElement = document.getElementById("question-text");
  const optionWrapper = document.getElementById("option-wrapper");

  questionElement.textContent = questionText;
  optionWrapper.textContent = "";

  optionArray.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className =
      "border-0 border-gray-100 bg-gray-100 text-gray-200 font-medium px-2 py-0.5 rounded shadow-sm text-sm";
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
    nextButton.textContent = "Submit";
    
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

export function showAlert(message) {
  const alertDiv = document.getElementById("alert-box");
  let messageEl = document.getElementById("alert-message");

  // remove any existing alert
  alertDiv.classList.add("hidden");

  //  set the message and show the alert
  messageEl.textContent = message;
  alertDiv.classList.remove("hidden");

  // disappear in 2 seconds
  setTimeout(() => {
    alertDiv.classList.add("hidden");
  }, 2000);
}
export function nextQuestion() {
  clearInterval(questionTimerInterval); // stop the current question timer

  // move to next question
  if (getCurrentIndex < getQuestions().length - 1) {
    setCurrentIndex(getCurrentIndex + 1);
    renderCurrentQuestion(getCurrentIndex());
    
    startQuestionTimer(); // Restart the timer for the next question
  } else {
    stopTimers(); // stop both time when quiz is finish


    showScoreResult(); // show final result
  }
}

// function to start the question timer
export function startQuestionTimer() {
  questionTimerInterval = setInterval(() => {
    if (questionTimeLeft === 0) {
      nextQuestion();
    }
    if (questionTimeLeft > 0) {
      questionTimeLeft--; // decrease by 1 second
      document.getElementById("time-left").textContent =
        formatTime(questionTimeLeft);
    } else {
      // if time runs out, move to the next question ( or submit it if it's the last question)
      nextQuestion();
    }
  }, 1000);
}

// function to start the total timer ( for the entire quiz)
export function startTotalTimer() {
  totalTimerInterval = setInterval(() => {
    totalTimeElapsed++; // mcrease the total time by 1 second
    document.getElementById("total-time").textContent =
      formatTime(totalTimeElapsed);
  }, 1000);
}

// helper function to convert time (seconds to mm:ss format)
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remaingSeconds
    .toString()
    .padStart(2, "0")}`;
}
// function to stop the both timer
export function stopTimers() {
  clearInterval(questionTimerInterval); // stop the question timer
  clearInterval(totalTimerInterval); // stop the total timer
}
