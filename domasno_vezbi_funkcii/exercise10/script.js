function isTruthy(string) {
    if (string) {
        console.log("1");
        return 1;
    } else {
        console.log("0");
        return 0;
    }
}
let input = prompt("Vnesi nesto");
isTruthy(input);
