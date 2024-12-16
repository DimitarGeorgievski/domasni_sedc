// funkcijata raboti samo so broevi nad 21 bidejki broevite koj se delivi samo so 7 i so 3 pocnuvaat od 21.
function sortArray(input){
    input = parseInt(prompt("Vnesi do koj broj sakas da ti proveram"));
    let niza = [];
    if(Number.isNaN(input)){
        console.log("vnesi broj");
    }
    else{
        for(let i=0;i<=input;i++){
            if(i %7===0 && i%3===0){
        niza.push(i);
        }
    }
    console.log(niza);
}
}
sortArray();