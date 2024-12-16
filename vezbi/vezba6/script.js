function describingCar(producer,model,horsepower,color){
    horsepower = "N/A";
    color = "N/A";
    return `Your car is ${producer} ${model}, and it has ${horsepower} horsepower,and it's in ${color} color.`
}
let producer = prompt("What producer is your car:");
let model = prompt("What model is your car:");
console.log(describingCar(producer,model));