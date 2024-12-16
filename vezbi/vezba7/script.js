function oddChecker(input){
    input = prompt("Vnesi eden broj")
    let broj = parseInt(input);
    if(Number.isNaN(broj)){
        console.log("Vnesi normalen broj.")
    }
    else{
        if(broj % 2 === 0){
            console.log("Brojot ti e paren");
        }
        else{
            console.log("Brojot ne e paren")
        }
    }
}
oddChecker();