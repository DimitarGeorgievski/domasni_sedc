function sentence(day){
switch(day){
    case 1:
    case 2:
    case 4:
    case 6:
    case 7:
        console.log("I am free");
        break;
    case 3:
    case 5:
        console.log("I am in SEDC");
        break;
    default:
        console.log("Vnesi tocen broj");
}
}
sentence(3);