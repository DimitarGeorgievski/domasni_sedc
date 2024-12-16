function countdown(){
    let input = parseInt(prompt("Vnesi od koja brojka sakas da pocni odbrojuvanjeto"));
    let niza = [];
    if(Number.isNaN(input)){
        return "Vnesi broj"
    }
    else{
        for(let i=input;i>=0;i--){
            niza.push(i);
        }
        console.log(niza);
    }
}
countdown();