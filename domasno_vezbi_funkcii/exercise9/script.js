function Month(month){
    let input = parseInt(month)
    if(Number.isNaN(input)){
        console.log("Vnesi pravilen karakter");
        return -1;
    }
   switch(input){
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("February");
        break;
    case 3:
        console.log("March");
        break;
    case 4:
        console.log("April");
        break;
    case 5:
        console.log("May");
        break;
    case 6:
        console.log("June");
        break;
    case 7:
        console.log("July");
        break;
    case 8:
        console.log("August");
        break;
    case 9:
        console.log("September");
        break;
    case 10:
        console.log("Octomber");
        break;
    case 11:
        console.log("November");
        break;
    case 12:
        console.log("December");
        break;
        default:
            console.log(`godinata nema ${input} meseci,vnesi mesec od 1 do 12`);
   }
}
let month = prompt("Vnesi broj na mesec");
console.log(Month(month));