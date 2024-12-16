function Book(title,author,readingStatus){
    this.title=title;
    this.author=author;
    this.readingStatus=readingStatus;
    this.displayStatus = function(){
        if (this.readingStatus === "Y") {
            console.log(`veke procitana '${this.title}' od ${this.author}.`);
        } else if(this.readingStatus === "N"){
            console.log(`treba da ja procitas '${this.title}' od ${this.author}.`);
        }
        else{
            console.log("Vnesi tocna vrednost Y/N");
        }
    }
}
let title = prompt("Vnesi go naslovot na knigata");
let author = prompt("Vnesi go avtorot na knigata");
let readingStatusInput = prompt("dali ja imas procitano knigata? Y/N");
let kniga = new Book(title,author,readingStatusInput);
console.log(kniga);
kniga.displayStatus();