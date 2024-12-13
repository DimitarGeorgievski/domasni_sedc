function atm(input){
    input = parseInt(prompt("Vnesi kolku pari sakas da izvadis"));
    let accountMoney = parseInt(Math.floor(Math.random() * 1001));
    if(Number.isNaN(input) || Number.isNaN(accountMoney)){
        return "Vnesi normalen broj";
    }
    else{
        if (input > accountMoney) {
            return "Nemas dovolno pari na smetkata";
        }
        else{
            moneyLeft = accountMoney - input;
            return `Uspesno si podignal ${input} denari, ti preostanuvaat uste ${moneyLeft} denari`
        }
    }
}
console.log(atm());