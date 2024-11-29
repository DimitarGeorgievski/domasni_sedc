let NumberPhone = 30;
let PricePhone = 119.95;
let tax = 5 / 100;
let PhoneWithTax = PricePhone * (1 + tax);
let TotalPricePhone = PhoneWithTax * NumberPhone;
console.log("Price of 1 Mobile Phone is " + PhoneWithTax)
console.log("total price of " + NumberPhone + " Phones is " + TotalPricePhone);