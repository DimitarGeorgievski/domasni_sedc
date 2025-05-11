function disemvowel(str) {
  const vowels = ["a","e","i","o","u","A","E","I","O","U"];
  const splitString = str.split("");
  let newArray = "";
  for(let character of splitString){
    if(!vowels.includes(character)){
      character.slice(0,0);
      newArray += character;
    }
  }
  return newArray
}
console.log(disemvowel("This website is for losers LOL!"));