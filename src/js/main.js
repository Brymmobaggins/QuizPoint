/** @format */

import { renderCurrentQuestion, updateNextButtonLabel } from "./ui.js";
import { setupEventListeners } from "./events.js";
import { getCurrentIndex, getQuestions } from "./state.js";


renderCurrentQuestion(0);
setupEventListeners();
updateNextButtonLabel(getCurrentIndex, getQuestions().length);
