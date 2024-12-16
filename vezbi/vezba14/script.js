function parniBroeviNiza(){
    let brojacParni = 0;
    let array = [1,2,3,4,5,6,7,8];
    for(let i = 0; i < array.length; i++){
        if(array[i] % 2 ===0){
            brojacParni++;
        }
    }
    console.log(`vo slednata niza ima ${brojacParni} parni broevi`);
}
parniBroeviNiza();