function stringLengthChecker(string1,string2){
    if(typeof(string1) === "string" && typeof(string2) === "string" && isNaN(string1) && isNaN(string2)){
        if(string1.length === string2.length){
            console.log("Dvete recenici se isto dolgi");
        }
        else if(string1.length > string2.length){
            console.log("Prvata recenica e podolga");
        }
        else if(string1.length < string2.length){
            console.log("Vtorata recenica e pogolema");
        }
    }
    else{
        console.log("Vnesi pravilna recenica za sporeduvanje");
    }
}
let input1 = prompt("Vnesi edna recenica");
let input2 = prompt("Vnesi ja prvata recenica");
stringLengthChecker(input1,input2);