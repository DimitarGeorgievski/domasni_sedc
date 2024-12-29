//variabli
let mainOutput = document.getElementById("mainOutput");
let primaryOutput = document.getElementById("primaryOutput");
let operators = ["-", "*", "-", "+"];

//functions
function numberToOutput(selector,number){
    document.getElementById(`${selector}`).addEventListener("click",function(){
        mainOutput.innerText += `${number}`;
    })
}
function numberPressedByKeyboard(selector, number) {
    document.addEventListener("keydown", function(event) {
        if (event.key === `${number}`) {
            document.getElementById(`${selector}`).click();
        }
    });
}

document.getElementById("clearButton").addEventListener("click",function(){
    mainOutput.innerText = "";
    primaryOutput.innerText = "";
})
document.getElementById("clearDigit").addEventListener("click",function(){
    mainOutput.innerText = mainOutput.innerText.slice(0, -1);
})
document.getElementById("even").addEventListener("click", function(){
    primaryOutput.innerText += mainOutput.innerText;
    mainOutput.innerText = "";
})
.document.getElementById("divide").addEventListener("click", function(){
            mainOutput.innerText += /;
});
numberPressedByKeyboard("clearDigit", "Backspace");
numberToOutput("divide", "÷");
numberPressedByKeyboard("divide", "÷");
numberToOutput("sevenButton", "7");
numberPressedByKeyboard("sevenButton", "7");
numberToOutput("eightButton", "8");
numberPressedByKeyboard("eightButton", "8");
numberToOutput("nineButton", "9");
numberPressedByKeyboard("nineButton", "9");
numberToOutput("multiply", "*");
numberPressedByKeyboard("multiply", "*");
numberToOutput("fourButton", "4");
numberPressedByKeyboard("fourButton", "4");
numberToOutput("fiveButton", "5");
numberPressedByKeyboard("fiveButton", "÷");
numberToOutput("sixButton", "6");
numberPressedByKeyboard("sixButton", "6");
numberToOutput("minus", "-");
numberPressedByKeyboard("minus", "-");
numberToOutput("oneButton", "1");
numberPressedByKeyboard("oneButton", "1");
numberToOutput("twoButton", "2");
numberPressedByKeyboard("twoButton", "2");
numberToOutput("threeButton", "3");
numberPressedByKeyboard("threeButton", "3");
numberToOutput("plusButton", "+");
numberPressedByKeyboard("plusButton", "+");
numberToOutput("dotButton", ".");
numberPressedByKeyboard("dotButton", ".");
numberToOutput("zeroButton", "0");
numberPressedByKeyboard("zeroButton", "0");
