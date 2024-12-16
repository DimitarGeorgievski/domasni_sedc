// Bonus: enter the values from prompt
function Animal(name,kind){
    this.name = name;
    this.kind = kind;
    this.animalSpeak = function(){
        console.log(`${this.name} ${this.kind} says: Hey Bro!!`);
    }
}
let nameDog = prompt("Vnesi go imeto na kuceto");
let kindDog = prompt("Vnesi ja rasata na kuceto");
let dog = new Animal(nameDog,kindDog);
console.log(dog);
dog.animalSpeak();