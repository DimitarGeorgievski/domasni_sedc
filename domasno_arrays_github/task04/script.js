function check(){
    let niza = [1,2,3,4,5];
    let input = prompt("Vnesi koj broj sakas da go proveris");
    let proverka = niza.includes(input);
    return proverka
}
console.log(check());