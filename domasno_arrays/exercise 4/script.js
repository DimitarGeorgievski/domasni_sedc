function loopingStructure() {
    let rezultat = "";
    for (let i = 1; i <= 20; i++) {
        if (i % 2 === 0) {
            rezultat += i + "\n";
        } else {
            rezultat += i + " ";
        }
    }
    console.log(rezultat);
}
loopingStructure();