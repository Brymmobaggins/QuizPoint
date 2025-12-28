/** @format */

import { renderQuestion } from "./ui.js";

const question = {
  text: "What is the capital of France",
  options: ["london", " Berlin", "Paris", "Madrid"],
};

renderQuestion(question.text, question.options);
