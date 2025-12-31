/** @format */

import {
  getCurrentIndex,
  setCurrentIndex,
  getQuestions,
  setAnswer, getAnswers
} from "./state.js";

import { renderCurrentQuestion, showScoreResult } from "./ui.js";

export function setupEventListeners() {
  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", () => {
    let currentIndex = getCurrentIndex();
    let currentQuestion = getQuestions()[currentIndex];

    if (getAnswers()[currentQuestion.id] == null) {
      alert("Pick an option");
      return;
    }
    if (currentIndex < getQuestions().length - 1) {
      setCurrentIndex(currentIndex + 1);
      renderCurrentQuestion(currentIndex + 1);
    } else {
      showScoreResult();
    }
  });

  const optionWrapper = document.getElementById("option-wrapper");
  optionWrapper.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    let indexValue = Number(btn.dataset.index);
    
    let currentIndex = getCurrentIndex()
    let currentQuestion = getQuestions()[currentIndex];
    setAnswer(currentQuestion.id, indexValue)
    renderCurrentQuestion(getCurrentIndex());
  });
}
