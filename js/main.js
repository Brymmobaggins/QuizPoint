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
  },
  {
    id: "q2",
    text: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
  },
  {
    id: "q3",
    text: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
  },
  {
    id: "q4",
    text: "What is the smallest country in the world by area?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
  },
];

renderQuestion(
  questions[currentIndex].text,
  questions[currentIndex].options,
  selectedIndex
);

const optionWrapper = document.getElementById("option-wrapper");

optionWrapper.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  let indexValue = Number(btn.dataset.index);

  let currentQuestion = questions[currentIndex];
  answers[currentQuestion.id] = indexValue;
  selectedIndex = answers[currentQuestion.id] ?? null;

  renderQuestion(
    questions[currentIndex].text,
    questions[currentIndex].options,
    selectedIndex
  );

  
  console.log(currentQuestion.id)
  console.log(indexValue)
   console.log(answers)
});

