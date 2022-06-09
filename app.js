const keys = document.querySelector(".keys");
const displayUp = document.querySelector(".display-up");
const displayDown = document.querySelector(".display-down");

let displayUpValue = 0;
let displayDownValue = 0;
let operator;
let operatorPrev;
displayDown.innerHTML = displayDownValue;

keys.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("box")) {
    // console.log(e.target);

    if (e.target.parentElement.classList.contains("number")) {
      displayDownValue = +(displayDown.innerHTML + e.target.innerHTML);
      console.log(displayDownValue);
    }

    if (e.target.innerHTML == "±") {
      console.log("+-");
      displayDownValue *= -1;
      console.log(displayDownValue);
    }
    displayDown.innerHTML = displayDownValue;

    if (e.target.parentElement.classList.contains("operator")) {
      if (e.target.innerHTML == "x") {
        operator = "*";
      } else {
        operator = e.target.innerHTML;
      }

      if (displayUp.innerHTML) {
        displayUpValue = process(
          displayUpValue,
          displayDownValue,
          operatorPrev
        );
        displayUp.innerHTML = displayUpValue + operator;
        displayDown.innerHTML = "";
        displayDownValue = 0;
      } else {
        displayUpValue = displayDownValue;
        displayDownValue = 0;
        displayUp.innerHTML = displayDown.innerHTML + operator;
        displayDown.innerHTML = "";
      }
      operatorPrev = operator;
      console.log(operator);
    }

    if (e.target.innerHTML == "=") {
      if (displayUp.innerHTML) {
        displayDownValue = process(displayUpValue, displayDownValue, operator);
        displayDown.innerHTML = displayDownValue;
        displayUp.innerHTML = "";
      }
    }

    if (e.target.innerHTML == "AC") {
      console.log("AC");
      displayUp.innerHTML = "";
      displayDown.innerHTML = 0;
      displayDownValue = 0;
      displayUpValue = 0;
    }
  }
});

const process = function (val1, val2, ops) {
  let result;
  switch (ops) {
    case "*":
      result = val1 * val2;
      break;
    case "/":
      result = val1 / val2;
      break;
    case "+":
      result = val1 + val2;
      break;
    case "-":
      result = val1 - val2;
      break;
  }
  if (!result % 1 || result < 0) {
    result.toFixed(2);
  }
  return result;
};
