const url = "https://raw.githubusercontent.com/qa-codecademy/mkwd13-04-ajs/refs/heads/main/G1/Extra%20homework/library/books.json";
let inputPublisher = document.getElementById("publisherRomanInput");

function fillSelectButton(select,firstOption){
    fetch(url)
    .then(response => response.json())
    .then(data => {
    let button = document.getElementById(select);
    button.innerHTML = `<option value="${firstOption}">${firstOption}</option>`;
    console.log(data);
    let publisherBook = new Set();
    for(let publishers of data){
        publisherBook.add(publishers.publisher);
    }
    publisherBook.forEach(publisher => {
        button.innerHTML += `<option value="${publisher}">${publisher}</option>`;
    });
    button.addEventListener("change", function(){
        if(button.value === firstOption){
            inputPublisher.disabled = false;
        }
        else{
            inputPublisher.disabled = true;
        }
    })
})
}
function checkSerieNameInputForm(){
    let serieName = document.getElementById("nameRomanSerie").value;
    let seriesNumber = document.getElementById("seriesNumber")
    if(!serieName){
        seriesNumber.disabled = true;
    }
    else{
        seriesNumber.disabled = false;
        seriesNumber.value = "10"
    }
}
function checkISBN(isbn){ // ne znaev kako da go pretvoram od wikipedia formulata sto e vo javascript kod pa zatoa od chatgpt mi e i neznam dali raboti,ama se nadevam deka e okej
    let oddSum = 0;
    for (let i = 0; i < 13; i += 2) {
        oddSum += parseInt(isbn[i], 10);
    }
    let evenSum = 0;
    for (let i = 1; i < 12; i += 2) {
        evenSum += parseInt(isbn[i], 10);
    }
    evenSum *= 3;
    let totalSum = oddSum + evenSum;
    let remainder = totalSum % 10;
    let checkDigit = (10 - remainder) % 10;
    return checkDigit;
}
fillSelectButton("publisherRoman","Select Publisher");
document.getElementById("nameRomanSerie").addEventListener("change", function(){
    checkSerieNameInputForm();
})