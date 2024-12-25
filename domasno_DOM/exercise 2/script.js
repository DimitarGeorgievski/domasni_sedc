let niza = [1, 2, 3, 4, 5];
let contentDiv = document.getElementsByClassName("content");
let sumaDiv = document.getElementsByClassName("sum");
function printArray(array, elements) {
  elements.innerHTML = "";
  let content = "<ul>";
  for (let i = 0; i < array.length; i++) {
    content += `<li> ${array[i]}</li>`;
  }
  content += "</ul>";
  elements.innerHTML = content;
}
printArray(niza, contentDiv);

function printSum(niza, element) {
  element.innerHTML = "";
  let content = `<p> Sum:`;
  let suma = 0;
  for (let i = 0; i < niza.length; i++) {
    if (i > 0) {
      content += " +";
    }
    suma += niza[i];
    content += ` ${niza[i]}`;
  }
  content += `= ${suma}`;
  content += `</p>`;
  element.innerHTML = content;
}
printSum(niza, sumaDiv);