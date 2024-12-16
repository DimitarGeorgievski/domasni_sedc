function lengthOfArray(){
    let niza = ["Dimitar", "Marija","Petar"];
    let nizaDolzina = [];
    for (let i = 0; i < niza.length; i++) {
        nizaDolzina.push(niza[i].length);
    }
    console.log(nizaDolzina);
}
lengthOfArray();