let showBtn = document.getElementById("btn");
let nextBtn = document.getElementById("nextBtn");
let previousBtn = document.getElementById("previousBtn");
let table = document.querySelector("table");
let info = (data) => {
    let header = `<tr>
    <th>Planet</th>
    <th>Population</th>
    <th>Climate</th>
    <th>Gravity</th>
    </tr>
    `
    for(let planet of data.results){
        text = `<tr>
        <td>${planet.name}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.gravity}</td>
        </tr>
    `
    header += text;
    }
    table.innerHTML = header;
    };
let data = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        info(data);
    })
}
showBtn.addEventListener("click",() =>{
    data("https://swapi.py4e.com/api/planets/?page=1");
    showBtn.disabled = true;
    nextBtn.style.display = "block";
})
nextBtn.addEventListener("click",() => {
    data("https://swapi.py4e.com/api/planets/?page=2");
    nextBtn.style.display = "none";
    previousBtn.style.display = "block";
})
previousBtn.addEventListener("click",() =>{
    data("https://swapi.py4e.com/api/planets/?page=1");
    previousBtn.style.display = "none";
    nextBtn.style.display = "block"
})