const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let resetDisplay = false;

function add(a, b) {
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b) {
    return a *b
}

function divide(a, b) {
    return b === 0 ? "No existe divison por 0": a/b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator){
        case '+': return add(a,b);
        case '-': return substract(a,b);
        case '*': return multiply(a,b);
        case '/': return divide(a,b);
        default : return null;
    }
}

function updateDisplay(value) {
    if(resetDisplay){
        display.textContent = value;
        resetDisplay = false;
    }else{
        display.textContent = display.textContent === "0" ? value: display.textContent + value;
    }
}

buttons.forEach(button =>{
    const value = button.dataset.value;
    if(value){
        button.addEventListener("click", ()=>{
            handleInput(value)
            button.classList.add("button-flash");
            setTimeout(()=>{
                button.classList.remove("button-flash");
            }, 200)
        });
    }
});

document.getElementById("equals").addEventListener('click',evaluate);
document.getElementById("clear").addEventListener('click',clear);

function handleInput(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentOperator && !resetDisplay) {
            evaluate();
        }
        firstNumber = display.textContent;
        currentOperator = value;
        resetDisplay = true;
    } else if (value === 'sign') {
        // cambiar el signo del número actual
        let current = Number(display.textContent);
        if (!isNaN(current)) {
            display.textContent = (current * -1).toString();
        }
    } else if (value === 'percent') {
        // convertir a porcentaje
        let current = Number(display.textContent);
        if (!isNaN(current)) {
            display.textContent = (current / 100).toString();
        }
    } else if (value === 'clear') {
        clear();
    } else if (value === '=') {
        evaluate();
    } else {
        updateDisplay(value);
    }
}

function evaluate() {
    if (!currentOperator || resetDisplay) return;
    
    secondNumber = display.textContent;
    const result = operate(currentOperator, firstNumber, secondNumber);

    if (typeof result === 'number') {
        display.textContent = Math.round(result*1000)/1000;
    }else{
        display.textContent = result;
    }
    firstNumber = display.textContent;
    currentOperator = null;
    resetDisplay = true;
}

function clear() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    resetDisplay = false;
}
