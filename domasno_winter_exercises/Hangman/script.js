// variables
let topic = "Film";
let currentWord = "";
let mysteriousWord = "";
let filmWords = ["Director","Screenplay", "Cinematography", "Blockbuster", "Actor", "Premiere", "Soundtrack", "Trailer", "Sequel", "Animation"];
let tvShowWords = ["Pilot", "Viewer", "Showrunner","Antagonist", "Cliffhanger", "Season","Series", "Streaming", "Episode", "Sitcom"];
let allowedHints = 3;
let mistakes = 0;
let lives = 6;
let wordToGuess = document.getElementById("wordToGuess");

// functions
function disableButton(button){
    button.disabled = true;
    button.style.opacity = "0";
}
function checkWin(){
    if (!mysteriousWord.includes("_")) {
        alert("Congratulations! You won!");
        newGame();
    } else if (lives === 0) {
        alert("Game Over! The word was: " + currentWord);
        newGame();
    }
}
function checkMistake(correct){
    if (!correct) {
        mistakes++;
        lives--;
        document.getElementById("lives").innerText = lives;
        document.getElementById("hangman").src = `./img/hangman-${mistakes}.png`;
    }
}
function newGame() {
    allowedHints = 3;
    lives = 6;
    mistakes = 0;
    document.getElementById("lives").innerText = lives;
    document.getElementById("hangman").src = `./img/hangman-0.png`;
    if (topic === "Film") {
        currentWord = filmWords[Math.floor(Math.random() * filmWords.length)];
    } else {
        currentWord = tvShowWords[Math.floor(Math.random() * tvShowWords.length)];
    }
    mysteriousWord = "_".repeat(currentWord.length);
    wordToGuess.innerText = mysteriousWord;
    document.querySelectorAll(".letters").forEach(button => {
        button.disabled = false;
        button.style.opacity = "1";
    });
}
function updateCurrentWord(currentWord){
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i].toLowerCase() === letter) {
            updatedWord += currentWord[i];
            isCorrect = true;
        } else {
            updatedWord += mysteriousWord[i];
        }
    }
}

document.getElementById("topicChangeButton").addEventListener("click", function() {
    topic = topic === "Film" ? "TV" : "Film";
    document.getElementById("topic").innerText = topic;
    newGame();
});
document.getElementById("playAgainButton").addEventListener("click", newGame);
document.getElementById("hintButton").addEventListener("click", function() {
    if (allowedHints > 0 && mysteriousWord.includes("_")) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * mysteriousWord.length);
        } while (mysteriousWord[randomIndex] !== "_");

        let letter = currentWord[randomIndex];
        mysteriousWord = mysteriousWord.substring(0, randomIndex) + letter + mysteriousWord.substring(randomIndex + 1);
        wordToGuess.innerText = mysteriousWord;
        allowedHints--;
    } else {
        alert("No hints left!");
    }
});
document.querySelectorAll(".letters").forEach(button => {
    button.addEventListener("click", function() {
        let letter = button.innerText.toLowerCase();
        let updatedWord = "";
        let isCorrect = false;
        updateCurrentWord(currentWord);
        mysteriousWord = updatedWord;
        wordToGuess.innerText = mysteriousWord;
        disableButton(button);
        checkMistake(isCorrect);
        checkWin();
    });
});