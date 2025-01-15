function listGeneratorFromArray(){
    let array = ["Dimitar", "Petar", "Andrej", "Nikola", "Zdravko"];
    document.getElementById("btn").addEventListener("click",function(){
        for(let i=0;i<array.length;i++){
            let li = document.createElement("li");
            li.textContent = array[i];
            list.appendChild(li);
        }
    })
}
function listGeneratorFromInput(){
    let list = document.createElement("ul");
    document.body.appendChild(list);
    document.getElementById("btn1").addEventListener("click", function(){
        let inputItems = document.getElementById("items").value;
        let inputColor = document.getElementById("color").value;
        let inputFontSize = document.getElementById("fontSize").value;
        let li = document.createElement("li");
        li.textContent = inputItems;
        li.style.color = inputColor;
        li.style.fontSize = `${inputFontSize}px`;
        list.appendChild(li);
    })
}
function studentDatabase(){
    let database = [];
    function studentGenerator(firstName, lastName, age, email) {
        return{
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email
        }
    };
    document.getElementById("btn2").addEventListener("click", function(){
        let firstName = document.getElementById("fName").value;
        let lastName = document.getElementById("lName").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        if (!firstName || !lastName || !age || !email) {
            alert("Please enter some informations.");
            return;
        }
        let student = studentGenerator(firstName, lastName, age, email);
        database.push(student);
        console.log(database);
        document.getElementById("fName").value = "";
        document.getElementById("lName").value = "";
        document.getElementById("age").value = 18;
        document.getElementById("email").value = "";
    })
};

listGeneratorFromArray();
listGeneratorFromInput();
studentDatabase();