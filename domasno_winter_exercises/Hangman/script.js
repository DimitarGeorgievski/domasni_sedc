// variables
let topic = "Film";
let filmWords = ["Director","Screenplay", "Cinematography", "Blockbuster", "Actor", "Premiere", "Soundtrack", "Trailer", "Sequel", "Animation"];
let tvShowWords = ["Pilot", "Viewer", "Showrunner","Antagonist", "Cliffhanger", "Season","Series", "Streaming", "Episode", "Sitcom"];
let allowedHints = 3;
let mistakes = 0;
let wordToGuess = document.getElementById("wordToGuess");
let lives = 6;
// functions
function getHint(input) {
    let hint = Math.floor(Math.random() * input.length);
    return hint;
}
function newGame(){
    allowedHints = 3;
    document.getElementById("hangman").src = `./img/hangman-${mistakes}.png`;
    document.getElementById("lives").innerHTML = lives;
}
function wrongGuess(){
    document.getElementById("hangman").src = `./img/hangman-${mistakes + 1}.png`;
    lives -= 1;
    target.remove();
}
document.querySelectorAll(".letters").forEach(button => {
    button.addEventListener("click", wrongGuess);
});
document.getElementById("topicChangeButton").addEventListener("click", function(){
    if(topic === "Film"){
        document.getElementById("topic").innerText = "TV show";
        topic = "TV";
        newGame();
        let randomWordFilm = tvShowWords[Math.floor(Math.random() * tvShowWords.length)];
        wordToGuess.innerText = randomWordFilm;
    }
    else{
        document.getElementById("topic").innerText = "Film";
        topic = "Film";
        newGame();
        let randomWordShow = filmWords[Math.floor(Math.random() * filmWords.length)];
        wordToGuess.innerText = randomWordShow;
    }
});
document.getElementById("playAgainButton").addEventListener("click", function(){
    newGame();
});