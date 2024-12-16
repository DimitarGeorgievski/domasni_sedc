function pinGuesser(input){
    input = prompt("Vnesi go tvojot pin za karticka");
    let pin = Math.floor(Math.random() * 10000).toString();
    if(pin.length < 4){
        pin = pin.padStart(4, '0');
    }
    if(Number.isNaN(input)){
        return "Vnesi broj"
    }
    else{
        if(input.length > 4){
            return "Pinot ne mozi da bidi pogolem od 4 cifri"
        }
        else{
            if(input == pin){
                return "Vneseniot pin e tocen";
            }
            else{
                return "Vneseniot pin e gresen"
            }
        }
    }
}
console.log(pinGuesser());