/** @format */

import {
  getCurrentIndex,
  setCurrentIndex,
  getQuestions,
  setAnswer,
  getAnswers,
  setSelectedIndex,
} from "./state.js";

import {
  renderCurrentQuestion,
  showAlert,
  showScoreResult,
  updateNextButtonLabel,
  startQuestionTimer,
  startTotalTimer,
  stopTimers,
  questionTimeLeft,
  formatTime,
} from "./ui.js";

export function setupEventListeners() {
  const startQuizButton = document.getElementById("start-button");
  const optionWrapper = document.getElementById("option-wrapper");
  const nextButton = document.getElementById("next-button");
  const resetButton = document.getElementById("reset-btn");

  nextButton.addEventListener("click", () => {
    let currentIndex = getCurrentIndex();
    let currentQuestion = getQuestions()[currentIndex];

    if (getAnswers()[currentQuestion.id] == null) {
      return showAlert("Pick an option");
    }
    if (currentIndex < getQuestions().length - 1) {
      setCurrentIndex(currentIndex + 1);
      renderCurrentQuestion(currentIndex + 1);
    } else {
      stopTimers()
      showScoreResult();
    }
  });

  
  optionWrapper.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    let indexValue = Number(btn.dataset.index);

    let currentIndex = getCurrentIndex();
    let currentQuestion = getQuestions()[currentIndex];
    setAnswer(currentQuestion.id, indexValue);
    renderCurrentQuestion(getCurrentIndex());
  });

  
  startQuizButton.addEventListener("click", (e) => {
    console.log(e.target);

    // hide set up screen and show quiz
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("quiz-section").classList.remove("hidden");

    startQuestionTimer();
    startTotalTimer();

    renderCurrentQuestion(getCurrentIndex());
  });

  
  resetButton.addEventListener("click", () => {
    // set current index to zero
    setCurrentIndex(0);

    // clear the answers object
    const answers = getAnswers();
    Object.keys(answers).forEach((questionId) => {
      setAnswer(questionId, null); // reset the question id to null
    });

    // reset both timer
    stopTimers();
      
    // questionTimeLeft = QUESTION_TIME_DEFAULT;

    document.getElementById("time-left").textContent =
      formatTime(questionTimeLeft);

    // reset selected index to null
    setSelectedIndex(null);

    // hidden result section
    document.getElementById("result-section").classList.add("hidden");

    // show quiz section
    document.getElementById("quiz-section").classList.remove("hidden");

    renderCurrentQuestion(getCurrentIndex());
    updateNextButtonLabel(getCurrentIndex());
  });
}
