function hurdleJump() {
    let hurdles =[5,5,3,4,5];
    let jumpHeight = prompt("Vnes kolku skokna")
    for (let i = 0; i < hurdles.length; i++) {
        if (jumpHeight < hurdles[i]) {
            return false;
        }
    }
    return true;
}
console.log(hurdleJump());