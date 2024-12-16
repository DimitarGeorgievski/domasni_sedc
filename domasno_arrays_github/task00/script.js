function createArray(input){
    let array = [];
    input = parseInt(prompt("Vnesi do koj broj sakas niza"));
    if(Number.isNaN(input)){
        return "Vnesi broj"
    }
        for(let i = 1; i <= input; i++){
        array.push(i);
        }
return array;
}
console.log(createArray());