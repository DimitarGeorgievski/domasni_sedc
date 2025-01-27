//variabli
let mainOutput = document.getElementById("mainOutput");
let primaryOutput = document.getElementById("primaryOutput");
const buttons = {
    "divide": "÷",
    "sevenButton": "7",
    "eightButton": "8",
    "nineButton": "9",
    "multiply": "*",
    "fourButton": "4",
    "fiveButton": "5",
    "sixButton": "6",
    "minus": "-",
    "oneButton": "1",
    "twoButton": "2",
    "threeButton": "3",
    "plusButton": "+",
    "dotButton": ".",
    "zeroButton": "0"
};

//functions
function additonAndSubtractionFunction(stack){
    let result = stack[0];
    for(let i = 1; i < stack.length; i += 2) {
        let op = stack[i];
        let nextNum = stack[i + 1];
        if(op === "+"){
            result += nextNum;
        }
        else if(op === "-"){
            result -= nextNum;
        }
    }
    return result;
}
function multiplicationAndDivideFunction(chars){
    let stack = [];
    for(let i = 0; i < chars.length; i++) {
        if(chars[i] === "*") 
        {
            stack[stack.length - 1] *= chars[i + 1];
            i++;
        }
        else if(chars[i] === "/"){
            stack[stack.length - 1] /= chars[i + 1];
            i++;
        }
        else{
            stack.push(chars[i]);
        }
    }
    return stack;
}
function checkForCopyOperator(expression){
    let chars = [];
    let currentNumber = "";
    for(let i = 0; i < expression.length; i++){
        let char = expression[i];
        if("+-*/".includes(char)){
            if(char === "-" && (i === 0 || "+-*/".includes(expression[i - 1]))){
                currentNumber += char;
            }
            else{
                if(currentNumber !== "") {
                    chars.push(parseFloat(currentNumber));
                    currentNumber = "";
                }
                chars.push(char);
            }
        }
        else{
            currentNumber += char;
        }
    }
    if (currentNumber !== "") {
        chars.push(parseFloat(currentNumber));
    }
    return chars;
}
function calculateExpression(expression) {
    let chars = checkForCopyOperator(expression);
    let stack = multiplicationAndDivideFunction(chars);
    let result = additonAndSubtractionFunction(stack);
    return result;
}
function isValidInput(char) {
    let lastChar = mainOutput.innerText.slice(-1);
    if ("+-*÷.".includes(char)) {
        if ("+-*÷.".includes(lastChar) || (char === "." && mainOutput.innerText.includes("."))) {
            return false;
        }
    }
    return true;
}
function replaceOperator(operator){
    let lastChar = mainOutput.innerText.slice(-1);
    if(operator === "-" && "+-*/÷".includes(lastChar)){
        if (lastChar === "-") return;
        mainOutput.innerText += operator;
        return;
    }
    if("+-*/÷".includes(lastChar)){
        mainOutput.innerText = mainOutput.innerText.slice(0, -1) + operator;
    }
    else{
        mainOutput.innerText += operator;
    }
}

document.getElementById("clearButton").addEventListener("click",function(){
    mainOutput.innerText = "";
    primaryOutput.innerText = "";
})
document.getElementById("clearDigit").addEventListener("click",function(){
    mainOutput.innerText = mainOutput.innerText.slice(0, -1);
})
document.getElementById("even").addEventListener("click", function(){
    let expression = mainOutput.innerText.replace("÷", "/").replace("×", "*");
    let chars = checkForCopyOperator(expression);
    if(chars.length < 3){
        if(chars.length === 1){
            if (primaryOutput.innerText.trim() !== "") {
                return;
            }
            primaryOutput.innerText = "Enter second number";
        }
        else if(chars.length === 2){
            primaryOutput.innerText = "Enter second number";
        }
        return;
    }
    let result = calculateExpression(expression);
    if(isNaN(result)){
        primaryOutput.innerText = "Enter another number";
    }
    else{
        primaryOutput.innerText = result;
    }
    mainOutput.innerText = "";
})
for(const [id, value] of Object.entries(buttons)){ // samo ovaj red go vidov od internet neznaev kako da zemam od objekt elementite
    document.getElementById(id).addEventListener("click", function () {
        if("+-*÷".includes(value)){
            replaceOperator(value);
        }
        if (isValidInput(value)) {
            mainOutput.innerText += `${value}`;
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === value) {
            document.getElementById(id).click();
        }
    });
}