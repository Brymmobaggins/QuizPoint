/** @format */

// resuabale function
import { getQuestions, getAnswers } from "./state.js";

export function calculateScore() {
  let score = 0;
  getQuestions().forEach((question) => {
    if (getAnswers()[question.id] === question.correctAnswerIndex) {
      score++;
    }
  });
  return score;
}
