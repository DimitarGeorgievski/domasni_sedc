function multiplyByLength(){
    let niza = [1,2,3,4,5];
    for(let i=0;i<niza.length;i++){
        niza[i] = niza[i]*niza.length;
    }
    return niza;
}
console.log(multiplyByLength());
