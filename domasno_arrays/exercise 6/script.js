function list(){
    let first = ["Bob", "Jill"]; 
    let last = ["Gregory", "Wurtz"];
    let result = [];
    for(let i=0;i<first.length;i++){
        result.push(`${i}. ${first[i]} ${last[i]}`);
    }
    return result;
}
console.log(list());