/** @format */

import { renderQuestion } from "./ui.js";

let selectedIndex = null;
const question = {
  text: "What is the capital of France",
  options: ["london", "Berlin", "Paris", "Madrid"],
};

const optionWrapper = document.getElementById("option-wrapper");

optionWrapper.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  let indexValue = Number(btn.dataset.index);
  selectedIndex = indexValue;
  // renderQuestion(selectedIndex)

  renderQuestion(question.text, question.options, selectedIndex);
  console.log(indexValue);
});

renderQuestion(question.text, question.options, selectedIndex);
