function dogOrHumanYears(input){
    input = prompt("Vnesi sto sakas da promenis? D/H");
    if (input === "D"){
      let input1 = parseInt(prompt("Vnesi kolku godini ima kuceto(normalni)"));
      if(Number.isNaN(input1)){
        return "vnesi normalen broj";
      }
      else{
        let dogYears = input1 * 7;
        return `Kuceto ima ${dogYears} coecki godini.`;
      }
    }
    else if(input === "H"){
      let input2 = parseInt(prompt("Vnesi kolku godini ima kuceto(coecki godini)"));
      if(Number.isNaN(input2)){
        return "vnesi normalen broj";
      }
      else{
        let humanDogYears = input2 / 7;
        return `Kuceto ima ${humanDogYears} kuceski godini`;
      }
    }
    else{
      return "Vnesi D ili H";
    }
}
console.log(dogOrHumanYears());