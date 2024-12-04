// Example 1
let money = prompt("How much money do you have");
let input = parseInt(money);
if(input === null){
    console.log(null)
}
else if(input > 100){
    alert("you are rich");
}
else if(input <= 20){
    alert("Start working you are going to starve");
}
else if(input <= 40){
    alert("go buy some burek")
}
else if(input <= 60){
    alert("go buy some hamburger")
}
else if(input <= 80){
    alert("You should go and date some girls");
}
else{
    alert("you are rich")
}

// Homework

let input1 = prompt("Which year have you been born? ");
let year = parseInt(input1);
let ZodiacCalculation = (year - 4) % 12;
if(ZodiacCalculation == 0){
    alert("You are rat");
}
else if(ZodiacCalculation == 1){
    alert("You are an Ox");
}
else if(ZodiacCalculation == 2){
    alert("You are an Tiger");
}
else if(ZodiacCalculation == 3){
    alert("You are an Rabbit");
}
else if(ZodiacCalculation == 4){
    alert("You are an Dragon");
}
else if(ZodiacCalculation == 5){
    alert("You are an Snake");
}
else if(ZodiacCalculation == 6){
    alert("You are an Horse");
}
else if(ZodiacCalculation == 7){
    alert("You are an Goat");
}
else if(ZodiacCalculation == 8){
    alert("You are an Monkey");
}
else if(ZodiacCalculation == 9){
    alert("You are an Rooster");
}
else if(ZodiacCalculation == 10){
    alert("You are an Dog");
}
else if(ZodiacCalculation == 11){
    alert("You are an Pig");
}
