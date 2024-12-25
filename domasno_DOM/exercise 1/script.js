let firstBigHeading = document.getElementById("myTitle");
let allBigHeadings = document.getElementsByTagName("h1");
let lastBigHeading = allBigHeadings[allBigHeadings.length - 1];
let onlySmallHeading = document.getElementsByTagName("h3")[0];
let firstParagraph = document.querySelector(".paragraph");
let lastParagraph = document.querySelector(".second");

firstBigHeading.innerText = "First Big Heading/Changed";
lastBigHeading.innerText = "Last Big Heading/Changed";
onlySmallHeading.innerText = "malo tekstce/Changed";
firstParagraph.innerText = "first Paragraph/Changed";
lastParagraph.innerText = "last Paragraph/Changed";
