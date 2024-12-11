function isPlural(sentence){
    if(typeof(sentence) === "string" && isNaN(sentence)){
        if(sentence.endsWith("s")){
            console.log("Zborot e vo mnozina")
        }
        else{
            console.log("Zborot e vo ednina")
        }
    }
    else{
        console.log("Vnesi zbor a ne nesto sosema treto!!");
    };
}
let input = prompt("Vnesi zbor");
isPlural(input);
