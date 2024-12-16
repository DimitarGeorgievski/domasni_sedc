function search(){
    let niza = ["jabolko", "avion","ananas"];
    let input = prompt("Vnesi koj zbor sakas da go proveris");
    let index = niza.indexOf(input);
    return index;
}
console.log(search());