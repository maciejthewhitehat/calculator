const buttonClearAll = document.querySelector(".buttonClearAll");
const buttonDelete = document.querySelector(".buttonDelete");
const button7 = document.querySelector(".button7");
const button8 = document.querySelector(".button8");
const button9 = document.querySelector(".button9");
const buttonDivide = document.querySelector(".buttonDivide");
const button4 = document.querySelector(".button4");
const button5 = document.querySelector(".button5");
const button6 = document.querySelector(".button6");
const buttonMultiply = document.querySelector(".buttonMultiply");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const buttonSubstract = document.querySelector(".buttonSubstract");
const buttonDot = document.querySelector(".buttonDot");
const button0 = document.querySelector(".button0");
const buttonEqual = document.querySelector(".buttonEqual");
const buttonSum = document.querySelector(".buttonSum");
const total = document.querySelector(".total");
const currentOperation = document.querySelector(".currentOperation");

let currentNumber = "";
let lastOperation = null;
let lastResult = null;
let isOperatorUsed = false;
currentOperation.innerHTML = "0";

function performOperation() {
    const currentValue = parseFloat(currentNumber);

    if (lastResult === null) {
        lastResult = currentValue;
    } else {
        switch (lastOperation) {
            case "divide":
                lastResult /= currentValue;
                break;
            case "multiply":
                lastResult *= currentValue;
                break;
            case "substract":
                lastResult -= currentValue;
                break;
            case "sum":
                lastResult += currentValue;
                break;
        }
    }

    total.innerHTML = lastResult;  // Display the result in total
    currentOperation.innerHTML = lastResult;  // Update currentOperation with the result
    currentNumber = "";  // Reset currentNumber for the next operation
}

function operationHandler(operator) {
    if (currentNumber !== "") {
        performOperation();
    }

    lastOperation = operator;
    isOperatorUsed = true;
    currentOperation.innerHTML += getOperatorSymbol(operator);  // Append the operator to currentOperation
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case "divide":
            return "÷";
        case "multiply":
            return "×";
        case "substract":
            return "-";
        case "sum":
            return "+";
        default:
            return "";
    }
}

// Event listeners for number buttons
function handleNumber(number) {
    if (currentOperation.innerHTML === "0" && number !== ".") {
        currentOperation.innerHTML = number;
    } else {
        currentOperation.innerHTML += number;
    }
    currentNumber += number;
    isOperatorUsed = false;
}

button0.addEventListener("click", () => handleNumber("0"));
button1.addEventListener("click", () => handleNumber("1"));
button2.addEventListener("click", () => handleNumber("2"));
button3.addEventListener("click", () => handleNumber("3"));
button4.addEventListener("click", () => handleNumber("4"));
button5.addEventListener("click", () => handleNumber("5"));
button6.addEventListener("click", () => handleNumber("6"));
button7.addEventListener("click", () => handleNumber("7"));
button8.addEventListener("click", () => handleNumber("8"));
button9.addEventListener("click", () => handleNumber("9"));

// Dot button handling
buttonDot.addEventListener("click", () => {
    if (!currentNumber.includes(".")) {
        handleNumber(".");
    }
});

// Event listeners for operators
buttonDivide.addEventListener("click", () => operationHandler("divide"));
buttonMultiply.addEventListener("click", () => operationHandler("multiply"));
buttonSubstract.addEventListener("click", () => operationHandler("substract"));
buttonSum.addEventListener("click", () => operationHandler("sum"));

// Equal button listener
buttonEqual.addEventListener("click", () => {
    if (lastOperation !== null) {
        performOperation();
        lastOperation = null;  // Reset last operation after equals
    }
    isOperatorUsed = false;
});

// Clear and delete
buttonClearAll.addEventListener("click", () => {
    total.innerHTML = "";
    currentOperation.innerHTML = "0";
    currentNumber = "";
    lastOperation = null;
    lastResult = null;
});

buttonDelete.addEventListener("click", () => {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1);
        currentOperation.innerHTML = currentOperation.innerHTML.slice(0, -1);
    }
    if (currentOperation.innerHTML === "") {
        currentOperation.innerHTML = "0";
    }
});
