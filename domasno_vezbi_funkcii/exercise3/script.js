function hoursInSecondsConversion(input){
    let hours = parseInt(input)
    if(Number.isNaN(hours) || hours < 0){
        console.log("Vnesi tocen chas");
        return -1;
    }
    let seconds = hours * 3600;
    return seconds;
}
let input = prompt("Vnesi casovi");
console.log(hoursInSecondsConversion(input));