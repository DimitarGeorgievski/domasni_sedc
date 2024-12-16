function transform(){
    let niza = [1,2,3,4,5];
    for(let i=0;i<niza.length;i++){
        if(niza[i] % 2===0){
            niza[i] -= 1;
        }
        else if(niza[i]%2===1){
            niza[i] += 1;
        }
    }
    console.log(niza);
}
transform();