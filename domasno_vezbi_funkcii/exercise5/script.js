function legsCounter(chickenLegs,cowLegs,pigLegs){
    let chichkenLegsParse = parseInt(chickenLegs);
    let cowLegsParse = parseInt(cowLegs);
    let pigLegsParse = parseInt(pigLegs);
    if((Number.isNaN(chichkenLegsParse) || chichkenLegsParse < 0) || (Number.isNaN(cowLegsParse) || cowLegsParse < 0) || (Number.isNaN(pigLegsParse) || pigLegsParse < 0)){
    console.log("Vnesi tocen broj");
    return -1;
    }
    let totalLegs = (chichkenLegsParse * 2) + (cowLegsParse * 4) + (pigLegsParse * 4);
    return totalLegs;
}
let chickenLegs = prompt("Vnesi broj na kokoski");
let cowLegs = prompt("Vnesi broj na kravi");
let pigLegs = prompt("Vnesi broj na svinji");
console.log(legsCounter(chickenLegs,cowLegs,pigLegs));