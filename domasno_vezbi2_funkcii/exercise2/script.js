function humanToDogYearsConvertor(input){
    {
        input = parseInt(prompt("Vnesi kolku godini ima kuceto"));
        if (Number.isNaN(input)) {
          return "Vnesi normalen broj";
        } else {
          let dogYears = input * 7;
          return `Kuceto ima ${dogYears} normalni godini`;
        }
      }
}
function dogToHumanYearsConvertor(input){
    {
        input = parseInt(prompt("Vnesi kolku kuceski godini ima kuceto"));
        if (Number.isNaN(input)) {
          return "Vnesi normalen broj";
        } else {
          let humanDogYears = input / 7;
          return `Kuceto ima ${humanDogYears} kuceski godini`;
        }
      }
}
console.log(humanToDogYearsConvertor());
console.log(dogToHumanYearsConvertor());