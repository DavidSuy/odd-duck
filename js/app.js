"use strict";

// Global Variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 0;

// DOM Elements
let productContainer = document.getElementById("productContainer");
let ul = document.querySelector("ul");

let imageOne = document.getElementById("img-one");
let imageTwo = document.getElementById("img-two");
let imageThree = document.getElementById("img-three");

// Constructor
function Product(name, fileExt = "jpg") {
  this.name = name;
  this.src = `images/${this.name}.${fileExt}  `;
  this.clicks = 0;
  this.views = 0;
}

// functions
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {
  let productOne = getRandomProduct();
  let productTwo = getRandomProduct();
  let productThree = getRandomProduct();

  while (productOne === productTwo || productOne === productThree) {
    productTwo = getRandomProduct();
    productThree = getRandomProduct();
  }
  while (productTwo === productThree || productThree === productOne) {
    productThree = getRandomProduct();
  }

  // while (productTwo === productThree || productThree === productOne) {
  //   productThree = getRandomProduct();
  // }
  // console.log(productOne, productTwo, productThree);
  // console.log(allProducts);

  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;
  imageTwo.src = allProducts[productTwo].src;
  imageTwo.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;
  imageThree.src = allProducts[productThree].src;
  imageThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}

// Excutable Code

// Products
let bag = new Product("bag");
let banana = new Product("banana");
let bathroom = new Product("bathroom");
let boots = new Product("boots");
let breakfast = new Product("breakfast");
let bubblegum = new Product("bubblegum");
let chair = new Product("chair");
let cthulhu = new Product("cthulhu");
let dogDuck = new Product("dog-duck");
let dragon = new Product("dragon");
let pen = new Product("pen");
let petSweep = new Product("pet-sweep");
let scissors = new Product("scissors");
let shark = new Product("shark");
let sweep = new Product("sweep", "png");
let tauntaun = new Product("tauntaun");
let unicorn = new Product("unicorn");
let waterCan = new Product("water-can");
let wineGlass = new Product("wine-glass");

allProducts.push(
  bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  cthulhu,
  dogDuck,
  dragon,
  pen,
  petSweep,
  scissors,
  shark,
  tauntaun,
  unicorn,
  waterCan,
  wineGlass
);
console.log(allProducts);
// console.log(allProducts[0].name);
// console.log(allProducts[1].name);
// console.log(allProducts[2].name);

renderProduct();
