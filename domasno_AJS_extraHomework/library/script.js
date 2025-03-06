const url =
  "https://raw.githubusercontent.com/qa-codecademy/mkwd13-04-ajs/refs/heads/main/G1/Extra%20homework/library/books.json";
let inputPublisher = document.getElementById("publisherRomanInput");
let romanFormButton = document.getElementById("exampleRadios1");
let anthologyFormButton = document.getElementById("exampleRadios2");
let romanForm = document.getElementById("form-roman");
let anthologyForm = document.getElementById("form-anthology");
let errorText = document.getElementById("errorTextAnthology");
let tbody = document.getElementsByTagName("tbody")[0];
let alldata = [];
let storiesAnthology = [];

function fillSelectButton(select, firstOption) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      alldata = data;
      let button = document.getElementById(select);
      button.innerHTML = `<option value="${firstOption}">${firstOption}</option>`;
      let publisherBook = new Set();
      for (let publishers of alldata) {
        publisherBook.add(publishers.publisher);
      }
      publisherBook.forEach((publisher) => {
        button.innerHTML += `<option value="${publisher}">${publisher}</option>`;
      });
      button.addEventListener("change", function () {
        if (button.value === firstOption) {
          inputPublisher.disabled = false;
        } else {
          inputPublisher.disabled = true;
        }
      });
    });
}
function checkSerieNameInputForm() {
  let serieName = document.getElementById("nameRomanSerie").value;
  let seriesNumber = document.getElementById("seriesNumber");
  if (!serieName) {
    seriesNumber.disabled = true;
  } else {
    seriesNumber.disabled = false;
    seriesNumber.value = "10";
  }
}
function checkISBN(isbn) {
  // ne znaev kako da go pretvoram od wikipedia formulata sto e vo javascript kod pa zatoa od chatgpt mi e i neznam dali raboti,ama se nadevam deka e okej
  if (isbn.length !== 13) {
    return "Invalid ISBN";
  }
  for (let i = 0; i < isbn.length; i++) {
    if (isNaN(isbn[i])) {
      return "Invalid ISBN";
    }
  }
  let oddSum = 0;
  let evenSum = 0;
  for (let i = 0; i < 13; i++) {
    let digit = parseInt(isbn[i], 10);
    if (i % 2 === 0) {
      oddSum += digit;
    } else {
      evenSum += digit;
    }
  }
  evenSum *= 3;
  let totalSum = oddSum + evenSum;
  let remainder = totalSum % 10;
  let checkDigit = (10 - remainder) % 10;
  return checkDigit === parseInt(isbn[12], 10);
}
class PublishRoman {
  constructor(
    nameRoman,
    authorRoman,
    publisherRomanSelect = null,
    publisherRomanInput = "",
    dateRoman = null,
    lengthRoman = null,
    serieNameRoman = "",
    serieNumberRoman = null,
    isbnRoman = null,
    reviewRoman = ""
  ) {
    this.kind = "Novel";
    this.title = nameRoman;
    this.author = authorRoman;
    let publisherName = document.getElementById("publisherRoman").value;
    if (publisherName !== "Select Publisher") {
      this.publisher = publisherRomanSelect;
    } else {
      this.publisher = publisherRomanInput;
    }
    this.year = dateRoman;
    this.length = lengthRoman;
    let serieName = document.getElementById("nameRomanSerie").value;
    if (!serieName) {
      this.serieName = serieNameRoman;
    } else {
      this.serieName = serieNameRoman;
      this.serieNumber = serieNumberRoman;
    }
    this.isbn = checkISBN(isbnRoman) ? isbnRoman : null;
    this.review = reviewRoman;
    this.getinfo = function () {
      return `
                Title: ${this.nameRoman},
                Author: ${this.authorRoman},
                Publisher: ${this.Publisher},
                Year: ${this.dateRoman || "N/A"}, 
                Series: ${this.serieName || "None"},
                ISBN: ${this.isbn || "Invalid ISBN"},
                Review: ${this.review || "No review"}.
            `;
    };
  }
}
class StoriesAnthology {
  constructor(name, author, original) {
    this.name = name;
    this.author = author;
    this.original = original;
  }
}
class publishAnthology {
  constructor(
    title,
    editor,
    publisher = "",
    year = null,
    length = null,
    stories,
    isbn = null,
    review = ""
  ) {
    this.kind = "Anthology";
    this.title = title;
    this.editor = editor;
    this.publisher = publisher;
    this.year = year;
    this.length = length;
    this.stories = stories;
    this.isbn = checkISBN(isbn) ? isbn : null;
    this.review = review;
  }
}
function fillTable(data){
  let html = "";
  for(let book of data){
    let index = 0;
    let row = `<tr>
            <td>${index + 1}</td>
            <td>${book.kind === "Novel" ? book.author : book.editor}</td>
            <td>${book.year} (${book.publisher})</td>
            <td>${book.length} pages</td>
            <td>${book.kind === "novel" && book.serieName !== "" ? book.serieName + "(#" + romanize(book.serieNumber) + ")" : ""}</td>
            <td>${book.kind === "Anthology" ?  : } Albums, first Album Year: ${firstYear}  Last Album Year: ${lastYear} </td>
            <td>Studio Albums: ${studioAlbums}, Live Albums: ${liveAlbums}, Compilation Albums: ${compilationAlbums}</td>
        </tr>
        `
  }
  tbody += html;
}
function romanize(num){ // i ova funkcija e od stack overflow forumot
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
fillSelectButton("publisherRoman", "Select Publisher");
document
  .getElementById("nameRomanSerie")
  .addEventListener("change", function () {
    checkSerieNameInputForm();
  });
romanFormButton.addEventListener("change", function () {
  if (romanFormButton.checked) {
    storiesAnthology = [];
    romanForm.style.display = "block";
    anthologyForm.style.display = "none";
  }
});
anthologyFormButton.addEventListener("change", function () {
  if (anthologyFormButton.checked) {
    storiesAnthology = [];
    romanForm.style.display = "none";
    anthologyForm.style.display = "block";
  }
});
// imam prasanje,na primer ako sakam sekoj pat da pravam nova kniga dali treba example da se menva ili samo da se dodava primer example1+1 ili da proverva dali postoj i ako postoj da e i+1 vo toj kontekst ili ima drug nacin za da se napraj ova
document
  .getElementById("publishRomanButton")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let romanName = document.getElementById("nameRoman").value;
    let authorRoman = document.getElementById("authorBook").value;
    let publisherSelect = document.getElementById("publisherRoman").value;
    let publisherInput = document.getElementById("publisherRomanInput").value;
    let datePublish = Number(
      document.getElementById("dateOfPublication").value
    );
    let lengthRoman = document.getElementById("lengthBook").value;
    let nameRomanSerie = document.getElementById("nameRomanSerie").value;
    let serieNumber = document.getElementById("seriesNumber").value;
    let isbnRoman = document.getElementById("isbnInput").value;
    let reviewRoman = document.getElementById("reviewInput").value;
    let example = new PublishRoman(
      romanName,
      authorRoman,
      publisherSelect,
      publisherInput,
      datePublish,
      lengthRoman,
      nameRomanSerie,
      serieNumber,
      isbnRoman,
      reviewRoman
    );
    alldata.push(example);
    console.log(alldata);
  });
document
  .getElementById("publishStoryAntholgy")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let storyName = document.getElementById("StoryForAnthology").value;
    let authorStory = document.getElementById("authorStoryForAnthology").value;
    let originalStory = document.getElementById("originalStory").checked;
    let story = new StoriesAnthology(storyName, authorStory, originalStory);
    storiesAnthology.push(story);
    console.log(storiesAnthology);
  });
document
  .getElementById("publishAnthology")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (storiesAnthology.length >= 2) {
      errorText.style.display = "none";
      let title = document.getElementById("titleAnthology").value;
      let editor = document.getElementById("editorAnthology").value;
      let publisher = document.getElementById("publisherAnthologyInput").value;
      let datePublishAnthology = Number(
        document.getElementById("publicationAnthologyInput").value
      );
      let lengthAnthology = document.getElementById(
        "lengthAnthologyInput"
      ).value;
      let isbnAntholgy = document.getElementById("isbnInputAnthology").value;
      let reviewAntholgy = document.getElementById(
        "reviewInputAnthology"
      ).value;
      let newAnthology = new publishAnthology(
        title,
        editor,
        publisher,
        datePublishAnthology,
        lengthAnthology,
        storiesAnthology,
        isbnAntholgy,
        reviewAntholgy
      );
      alldata.push(newAnthology);
      console.log(alldata);
    } else {
      errorText.style.display = "block";
    }
  });
