function typeChecker(input){
    return typeof(input);
}
console.log(typeChecker(123));
console.log(typeChecker(true));
console.log(typeChecker("Dimitar"));
console.log(typeChecker());
let obj = {name: "Dimitar"};
console.log(typeChecker(obj));
