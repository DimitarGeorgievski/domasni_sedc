function devisibleNumber(input){
    input = parseInt(prompt("Vnesi do koj broj sakas da go proveris"));
    let niza = []
    if(Number.isNaN(input)){
        return "Vnesi broj"
    }
    else{
        for(let i =1;i<=input;i++){
            if(i%3===0 && i%5===0){
                niza.push(i + " - " + "FizzBuzz");
            }
            else if(i%3===0){
                niza.push(i + " - " + "Fizz");
            }
            else if(i%5===0){
                niza.push(i + " - " + "Buzz");
            }
            else{
                niza.push(i);
            }
        }
        console.log(niza);
    }
}
console.log(devisibleNumber());