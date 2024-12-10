function minuteToSecondsConverter(minuti) {
    let minute = parseInt(minuti);
    if (Number.isNaN(minute) || minute < 0) {
        console.log("Vnesi tocen broj");
        return -1;
    }
    let sekundi = minuti * 60;
    return sekundi;
}
let minuti = prompt("Vnesi minuti");
console.log(minuteToSecondsConverter(minuti));
// iskreno neznam dali treba vaka ama ne znaev kako da napram vo line 5 vo return da pisi "Vnesi tocen broj" i sekoj pat koga ke probav vaka ke vadese undefined kako result i zato vaka go naprajv