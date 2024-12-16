function combineArray(array){
    let result = [];
    array = ["Hello", "there", "students", "of", "SEDC", "!"];
    for(let i=0;i<array.length;i++){
        result = result + " " + array[i];
    }
    return result;
}
console.log(combineArray());