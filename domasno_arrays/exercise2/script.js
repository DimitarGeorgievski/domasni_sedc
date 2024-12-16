function validateNumber(number){
    return typeof(number) === "number";
}
function suma(niza) {
    let sum = 0;
    for (let i = 0; i < niza.length; i++) {
        if (!validateNumber(niza[i])) {
            console.log("eden od elementite vo nizata ne e broj");
            return;
        }
        sum += niza[i];
    }
    console.log(`sumata na nizata e: ${sum}`);
}
suma([1,2,3,4,5]);