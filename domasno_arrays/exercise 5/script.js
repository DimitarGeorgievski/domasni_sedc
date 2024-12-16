function maxOfArray(){
    let niza = [1,2,3,4,5,true,"aren"];
    let Max = -Infinity;
    let min = Infinity;
    let sum = 0;
    for(let i=0;i<niza.length;i++){
        if(typeof(niza[i]) === "number"){
            sum += niza[i];
        }
        if(niza[i] > Max){
            Max = niza[i];
        }
        if(niza[i] < min){
            min = niza[i];
        }
    }
    return `Min: ${min}, Max: ${Max}, sum: ${sum}`;
}
console.log(maxOfArray());