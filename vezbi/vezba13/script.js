function averageArray(){
    let suma = 0;
    let array = [1,2,3,4,5,6]
    for(let i = 0;i<array.length;i++){
        suma = suma + array[i];
    }
    let prosek = suma / array.length;
    console.log(`prosek od celata niza e ${prosek}.`)
}
averageArray();