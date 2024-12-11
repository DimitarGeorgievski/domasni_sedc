function remainder(num1,num2){
    num1 = Number(num1);
    num2 = Number(num2);
    if(isNaN(num1) && isNaN(num2) ){
        console.log("Greska mora da vnesis broj");
        return "Greska mora da vnesis broj";
    }
        if(num2 === 0){
            console.log("Nemozis da delis so 0");
            return "Nemozis da delis so 0";
        }
        let result = num1 % num2;
        console.log(result);
        return result;
}
let input1 = prompt("Vnesi go prviot broj")
let input2 = prompt("Vnesi go vtoriot broj")
remainder(input1,input2)