function sum(){
    let suma = 0;
    let array = [1,2,3,4,5];
    for(let i = 0; i<array.length; i++){
        suma = suma + array[i];
    }
    console.log(suma);
}
sum();