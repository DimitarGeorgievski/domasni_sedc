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
    let randomWordFilm = tvShowWords[Math.floor(Math.random() * tvShowWords.length)];
    let mysteriousWord = ""
    for (let i = 0; i < randomWordFilm.length; i++) {
        mysteriousWord += "_";
    }
    wordToGuess.innerText = mysteriousWord;
}
function wrongGuess(){
    document.getElementById("hangman").src = `./img/hangman-${mistakes + 1}.png`;
    lives -= 1;
    target.remove();
    if(lives === 0){
        alert("Game Over");
        return;
    }
}
document.getElementById("topicChangeButton").addEventListener("click", function(){
    if(topic === "Film"){
        document.getElementById("topic").innerText = "TV show";
        topic = "TV";
        newGame();
        let randomWordFilm = tvShowWords[Math.floor(Math.random() * tvShowWords.length)];
        let mysteriousWord = ""
        for (let i = 0; i < randomWordFilm.length; i++) {
            mysteriousWord += "_";
        }
        wordToGuess.innerText = mysteriousWord;
        
    }
    else{
        document.getElementById("topic").innerText = "Film";
        topic = "Film";
        newGame();
        let randomWordFilm = tvShowWords[Math.floor(Math.random() * tvShowWords.length)];
        wordToGuess.innerText = randomWordFilm;
    }
});
document.getElementById("playAgainButton").addEventListener("click",newGame);
document.getElementById("hintButton").addEventListener("click", function(){
    if(allowedHints === 0){
        alert("You've used all your hints!");
        newGame(); 
    }
    else{
        if(mysteriousWord.includes("_")){  
            let randomIndex = Math.floor(Math.random() * mysteriousWord.length);
            while (mysteriousWord[randomIndex] !== "_") {
                randomIndex = Math.floor(Math.random() * mysteriousWord.length);
            }
            let bukva;
            if(topic === "Film"){
                bukva = randomWordFilm[randomIndex];
            }
            else if(topic === "TV"){
                bukva = randomWordShow[randomIndex];
            }
            mysteriousWord = mysteriousWord.slice(0, randomIndex) + bukva + mysteriousWord.slice(randomIndex + 1);
            wordToGuess.innerText += mysteriousWord;
        }
        allowedHints -= 1;
    }
});