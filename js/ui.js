/** @format */

export function renderQuestion(questionText, optionArray, selectedIndex) {
  const questionElement = document.getElementById("question-text");
  const optionWrapper = document.getElementById("option-wrapper");

  questionElement.textContent = questionText;
  optionWrapper.textContent = ""


  optionArray.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "border px-2 py-5 rounded"
    button.setAttribute("dataindex", "index");

    if(index === selectedIndex){
        button.classList.add("selected")
    }

    // append each button that is created
    optionWrapper.appendChild(button);
  });

}
