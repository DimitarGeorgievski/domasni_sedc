function proverkaNiza(item){
    item = prompt("Vnesi koe ime sakas da go proveris od nizata")
    let niza1 = ["Dimitar","Marija","Petar"];
    for(let i of niza1){
        if(item === i){
            return true;
        }
    }
    return false;
}
console.log(proverkaNiza());