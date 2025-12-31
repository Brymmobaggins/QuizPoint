/** @format */

let selectedIndex = null;
let currentIndex = 0;
let answers = {};

export const questions = [
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
export function getSelectedIndex() {
  return selectedIndex;
}
export function setSelectedIndex(value) {
  selectedIndex = value;
}

export function getCurrentIndex() {
  return currentIndex;
}

export function setCurrentIndex(value) {
  currentIndex = value;
}

export function getAnswers() {
  return answers;
}
export function setAnswer(questionId, value) {
  answers[questionId] = value;
}
export function getQuestions() {
  return questions;
}
