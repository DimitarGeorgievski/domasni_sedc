function match(string1,string2){
    let recenica1 = string1.toLowerCase();
    let recenica2 = string2.toLowerCase();
    if ((typeof(recenica1) === "string") && (typeof(recenica2) === "string") && isNaN(recenica1) && isNaN(recenica2)){
        if(recenica1 !== recenica2){
            console.log("False")
        }
        else{
            console.log("True");
        }
    }
    else{
        console.log("Vnesi recenici ne sosema treto!!");
    }
}
let input1 = prompt("Vnesi ja prvata recenica");
let input2 = prompt("Vnesi ja drugata recenica");
match(input1,input2);