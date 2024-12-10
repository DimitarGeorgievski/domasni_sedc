function increment(input){
    let broj = parseInt(input);
    if(Number.isNaN(broj)){
        console.log("Vnesi pravilen broj");
        return -1;
    }
    let increment = broj + 1;
    return increment;
}
let input = prompt("Vnesi eden broj");
console.log(increment(input));