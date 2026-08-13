let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

const display = document.getElementById("display");

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (waitingForSecondNumber) {
        currentInput = number;
        waitingForSecondNumber = false;
    } else if (number === "." && currentInput.includes(".")) {
        return;
    } else if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function chooseOperator(selectedOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator !== null && waitingForSecondNumber) {
        operator = selectedOperator;
        return;
    }

    if (firstNumber === null) {
        firstNumber = inputValue;
    } else if (operator !== null) {
        firstNumber = performCalculation(firstNumber, inputValue, operator);
        currentInput = String(firstNumber);
        updateDisplay();
    }

    operator = selectedOperator;
    waitingForSecondNumber = true;
}

function performCalculation(first, second, selectedOperator) {
    if (selectedOperator === "+") return first + second;
    if (selectedOperator === "-") return first - second;
    if (selectedOperator === "*") return first * second;
    if (selectedOperator === "/") {
        if (second === 0) {
            alert("Cannot divide by zero.");
            return first;
        }
        return first / second;
    }
    if (selectedOperator === "%") return first % second;
    return second;
}

function calculate() {
    if (operator === null || firstNumber === null || waitingForSecondNumber) return;

    const secondNumber = parseFloat(currentInput);
    const result = performCalculation(firstNumber, secondNumber, operator);

    currentInput = String(Number(result.toFixed(10)));
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

function deleteLast() {
    if (waitingForSecondNumber) return;
    currentInput = currentInput.length === 1 ? "0" : currentInput.slice(0, -1);
    updateDisplay();
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if ((key >= "0" && key <= "9") || key === ".") appendNumber(key);
    else if (["+", "-", "*", "/", "%"].includes(key)) chooseOperator(key);
    else if (key === "Enter" || key === "=") calculate();
    else if (key === "Escape") clearDisplay();
    else if (key === "Backspace") deleteLast();
});
