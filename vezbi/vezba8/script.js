function euroConverter(input){
    input = prompt("Vnesi kolku denari sakas da pretvoris");
    let denari = parseInt(input);
    if(Number.isNaN(denari)){
        console.log("Vnesi normalen broj");
    }
    else{
        let formula = denari / 61.5;
        console.log(`Momentalno prefrli ${denari} denari, vo ${formula} evra.`)
    }
}
euroConverter();