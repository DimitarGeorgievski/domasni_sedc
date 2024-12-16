function diffMaxMin(){
    let niza = [1,2,3,4,5,6];
    let Max = -Infinity;
    let min = Infinity;
    for(let i=0;i<niza.length;i++){
        if(niza[i] > Max){
            Max = niza[i];
        }
        if(niza[i] < min){
            min = niza[i];
        }
}
    let difference = Max - min;
    return `Max: ${Max}, Min: ${min}, difference ${difference}`;
}
console.log(diffMaxMin());