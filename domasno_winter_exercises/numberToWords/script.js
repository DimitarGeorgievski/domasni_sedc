// variables
let output = document.getElementById("wordsOutput");
let inputBox = document.getElementById("numbersInput");
inputBox.addEventListener("input", numberToWordConvert);

// functions
function numberToWordConvert(){
    let inputWords = inputBox.value;
    let parsedInput = parseInt(inputWords);
    const singleDigit = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const ten = ["Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    let result = "";
    if (isNaN(parsedInput)) {
        output.innerText = "Enter something";
        return;
    }
    if(parsedInput === 0){
        output.innerText = "Zero";
        return;
    }
    else if(parsedInput < 0 || parsedInput > 1000000){
        output.innerText = "enter valid number";
        return;
    }
    else if(parsedInput < 20){
        result = singleDigit[parsedInput-1];        
    }
    else if(parsedInput < 100){
        result = ten[Math.floor(parsedInput / 10) - 2];
        if (parsedInput % 10 !== 0) { 
            result += "-" + singleDigit[(parsedInput % 10) - 1]; 
        }
    }
    else if(parsedInput < 1000){
        let remainder = (parsedInput % 100);
        result = singleDigit[Math.floor(parsedInput / 100) - 1] + " Hundred";
       if (remainder > 0) {
        result += " and ";
        if (remainder < 20) {
            result += singleDigit[remainder - 1];
        } else {
            result += ten[Math.floor(remainder / 10) - 2];
            if (remainder % 10 !== 0) {
                result += "-" + singleDigit[remainder % 10 - 1];
            }
        }
    }
    }
    else if(parsedInput < 10000){
        result = singleDigit[Math.floor(parsedInput / 1000) -1] + " thousand ";
        remainder = parsedInput % 1000;
        if(remainder >= 100){
            result += singleDigit[Math.floor(remainder / 100) -1] + " hundred";
        remainder %= 100;
        }
        if (remainder > 0) {
            result += " and ";
        }
        if (remainder < 20 && remainder > 0) {
            result += singleDigit[remainder - 1];
        } 
        else if(remainder >= 20) {
            result += ten[Math.floor(remainder / 10) - 2];
            if (remainder % 10 !== 0) {
                result += " " + singleDigit[(remainder % 10) - 1];
            }
        }
}
else if(parsedInput < 100000){
    remainder = parsedInput % 1000;
    if(parsedInput === 20000){
        result = "Twenty thousand";
    }
    else if(parsedInput <= 20000){
        result = singleDigit[Math.floor(parsedInput / 1000) - 1] + " thousand";
    }
    else{
        result = ten[Math.floor(parsedInput / 10000) - 2] + " ";
        let thousands = parsedInput % 10000;
        if(thousands >= 1000){
            result += singleDigit[Math.floor(thousands / 1000) - 1] + " thousand";
        }
        else{
            result += "thousand"; 
        }
    }
    if(remainder >= 100){
        result += " " + singleDigit[Math.floor(remainder / 100) - 1] + " hundred";
        remainder %= 100;
    }
    if (remainder > 0) {
        result += " and ";
    }
    if(remainder < 20 && remainder > 0) {
        result += singleDigit[remainder - 1];
    }
    else if(remainder >= 20){
        result += ten[Math.floor(remainder / 10) - 2];
        if (remainder % 10 !== 0) { 
            result += " " + singleDigit[(remainder % 10) - 1]; 
        }
    }
}
else if(parsedInput < 1000000){
    remainder = parsedInput;
    if(parsedInput >= 100000){
        result = singleDigit[Math.floor(parsedInput / 100000) - 1] + " hundred";
        remainder %= 100000;
    }
    if(remainder >= 20000){
        result += " " + ten[Math.floor(remainder / 10000) - 2];
        remainder %= 10000;
    }
    else if(remainder >= 10000){
        result += " " + singleDigit[Math.floor(remainder / 1000) -1] + " thousand";
        remainder %= 1000;
    }
    if(remainder >= 1000){
        result += " " + singleDigit[Math.floor(remainder / 1000) - 1] + " thousand";
        remainder %= 1000;
    }
    if(remainder >= 100){
        result += " " + singleDigit[Math.floor(remainder / 100) - 1] + " hundred";
        remainder %= 100;
        }
    if (remainder > 0) {
        result += " and ";
    if(remainder < 20) {
        result += singleDigit[remainder - 1];
        }
    else{
        result += ten[Math.floor(remainder / 10) - 2];
        if (remainder % 10 !== 0) { 
            result += " " + singleDigit[(remainder % 10) - 1]; 
        }
    }
}
}
if(parsedInput === 10000){
    result = "Ten Thousand";
}
if(parsedInput === 1000000){
    result = "One Million";
}
    output.innerText = result;
}