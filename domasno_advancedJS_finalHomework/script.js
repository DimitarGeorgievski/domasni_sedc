let url = "https://raw.githubusercontent.com/qa-codecademy/mkwd13-04-ajs/refs/heads/main/G1/Homework/cars.json";
let allCars = [];
function fetchCars() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        allCars = data;
        showAllVehicles(allCars);
        fillFilters(allCars);
    });
}
function showAllVehicles(cars) {
    document.getElementById("container").innerHTML = '';
    for(let car of cars){
        let html = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${car.model}</h6>
                    <p class="card-text">Type: ${car.type}, Brand: ${car.brand}, Model: ${car.model}, 
                    Doors: ${car.doors}, Gas Type: ${car.gasType}, Color: ${car.color}, 
                    New: ${car.isNew ? "Yes" : "No"}, HP: ${car.horsepower}</p>
                    <a href="#" class="card-link">Buy now</a>
                    </div>
                    </div>`;
        document.getElementById("container").innerHTML += html;
    }
}
function fillFilters(cars){
    let typeSelect = document.getElementById("type");
    let brandSelect = document.getElementById("brand");
    let gasTypeSelect = document.getElementById("gas");
    let carTypes = [...new Set(cars.map(car => car.type))];
    let carGas = [...new Set(cars.map(car => car.gasType))];
    let carBrands = [...new Set(cars.map(car => car.brand))];
    typeSelect.innerHTML = `<option value="">All Types</option>`; 
    brandSelect.innerHTML = `<option value="">All Brands</option>`; 
    gasTypeSelect.innerHTML = `<option value="">All Gas Types</option>`; 
    for(let type of carTypes){
        typeSelect.innerHTML += `<option value="${type}">${type}</option>`;
    }
    for(let brand of carBrands){
        brandSelect.innerHTML += `<option value="${brand}">${brand}</option>`;
    }
    for(let gas of carGas){
        gasTypeSelect.innerHTML += `<option value="${gas}">${gas}</option>`;
    }
}
fetchCars();
document.getElementById("searchbtn").addEventListener("click", function(){
    let typeInput = document.getElementById("type").value;
    let brandInput = document.getElementById("brand").value;
    let modelInput = document.getElementById("model").value;
    let gasInput = document.getElementById("gas").value;
    let colorInput = document.getElementById("color").value;
    let newConditionInput = document.getElementById("conditionNew").checked;
    let oldConditionInput = document.getElementById("conditionOld").checked;
    let horsePowerInput = document.getElementById("hp").value;
    let doorsInput = parseInt(document.getElementById("doors").value);
    horsePowerInput = horsePowerInput === "" ? null : parseInt(horsePowerInput);
    let filterCars = allCars.filter(car => (isNaN(doorsInput) || car.doors === doorsInput) && (modelInput === "" || car.model.toLowerCase().includes(modelInput)) &&
    (typeInput === "" || car.type.toLowerCase() === typeInput.toLowerCase()) &&(brandInput === "" || car.brand.toLowerCase() === brandInput.toLowerCase()) && 
    (gasInput === "" || car.gasType.toLowerCase() === gasInput.toLowerCase()) && (colorInput === "" || car.color.toLowerCase() === colorInput.toLowerCase()) &&
    (newConditionInput ? car.isNew === true : true) && (oldConditionInput ? car.isNew === false : true) && (horsePowerInput === null || car.horsepower <= horsePowerInput));
    console.log("Filtered Cars:", filterCars);  
    if(filterCars.length === 0){
        document.getElementById("container").innerHTML = '<p>No cars found matching the criteria.</p>';
    }else{
        showAllVehicles(filterCars);
    }
});
document.getElementById("resetbtn").addEventListener("click", function() {
    document.getElementById("type").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("model").value = "";
    document.getElementById("gas").value = "";
    document.getElementById("color").value = "";
    document.getElementById("conditionNew").checked = false;
    document.getElementById("conditionOld").checked = false;
    document.getElementById("hp").value = "";
    document.getElementById("doors").value = "";
    showAllVehicles(allCars);
});