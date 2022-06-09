const keys = document.querySelector(".keys");
const displayUp = document.querySelector(".display-up");
const displayDown = document.querySelector(".display-down");

let displayUpValue = 0;
let displayDownValue = 0;
let isControl = true;
let operator = [];

// let operatorPrev;
displayDown.innerHTML = displayDownValue;

//click any button
keys.addEventListener("click", (e) => {
  //so that it doesn't take action when the space is clicked
  if (e.target.parentElement.classList.contains("box")) {
    // console.log(e.target);
    //write to the number
    if (e.target.parentElement.classList.contains("number")) {
      if (!isControl) {
        // "=" işlemi yaptıktan sonra resetlemek için
        displayDownValue = 0;
        displayDown.innerHTML = "";
      }
      displayDownValue = +(displayDown.innerHTML + e.target.innerHTML);
      console.log(displayDownValue);
      displayDown.innerHTML = displayDownValue;
      isControl = true;
    }
    //to make the current number positive or negative
    if (e.target.innerHTML == "±") {
      console.log("+-");
      displayDownValue *= -1;
      console.log(displayDownValue);
      displayDown.innerHTML = displayDownValue;
    }

    // displayDown.innerHTML = displayDownValue;
    // point button
    if (e.target.innerHTML == ".") {
      console.log(e.target.innerHTML);
      console.log(displayDownValue);
      if (displayDownValue % 1 == 0) {
        displayDown.innerHTML += ".";
        console.log(displayDown.innerHTML);
      }
    }
    //operators buttons
    if (e.target.parentElement.classList.contains("operator")) {
      if (e.target.innerHTML == "x") {
        operator.push("*");
      } else if (e.target.innerHTML == "÷") {
        operator.push("/");
      } else {
        operator.push(e.target.innerHTML);
      }

      if (displayUp.innerHTML) {
        if (displayDownValue) {
          displayUpValue = process(
            displayUpValue,
            displayDownValue,
            operator[operator.length - 2]
          );
          displayUp.innerHTML = displayUpValue + operator[operator.length - 1];
        } else {
          displayUp.innerHTML = displayUpValue + operator[operator.length - 1];
        }

        displayDown.innerHTML = "";
        displayDownValue = 0;
      } else {
        // if (displayDownValue != 0 && typeof displayDownValue == "number") {
        // }
        displayUpValue = displayDownValue;
        displayDownValue = 0;
        displayUp.innerHTML =
          displayDown.innerHTML + operator[operator.length - 1];
        displayDown.innerHTML = "";
      }

      //   operatorPrev = operator;
      console.log(operator);
      //   console.log(operatorPrev);
    }
    // result(=) button
    if (e.target.innerHTML == "=") {
      if (displayUp.innerHTML) {
        displayDownValue = process(
          displayUpValue,
          displayDownValue,
          operator[operator.length - 1]
        );
        displayDown.innerHTML = displayDownValue;
        displayUp.innerHTML = "";
        isControl = false;
      }
    }
    // reset button
    if (e.target.innerHTML == "AC") {
      console.log("AC");
      displayUp.innerHTML = "";
      displayDown.innerHTML = 0;
      displayDownValue = 0;
      displayUpValue = 0;
    }
  }
});

// arithmetic process function
const process = function (val1, val2, ops) {
  let result;
  console.log(ops);
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
  if (result % 1 != 0) {
    console.log(result, typeof result);
    result = result.toFixed(2);
  }

  return result;
};
