"use strict";

// Global Variables
let allProducts = [];
let indexArray = [];
let votes = 0;
let votesAllowed = 25;
// console.log(allProducts, indexArray);

// DOM Elements
let productContainer = document.getElementById("productContainer");
let ul = document.querySelector("ul");
let resultButton = document.querySelector("aside > div");

let imageOne = document.getElementById("img-one");
let imageTwo = document.getElementById("img-two");
let imageThree = document.getElementById("img-three");

// Constructor
function Product(name, src, views = 0, votes = 0, fileExt = "jpg") {
  this.name = name;
  this.views = views;
  this.votes = votes;
  if (!src) {
    this.src = `images/${this.name}.${fileExt}  `;
  } else {
    this.src = src;
  }
}

// Functions

function makeProduct(name, src, views, votes, fileExt) {
  let prodObj = new Product(name, src, views, votes, fileExt);
  // console.log(prodObj);

  allProducts.push(prodObj);
  // renderProduct();
}

function getVotes() {
  let potentialVotes = localStorage.getItem("votes");
  if (potentialVotes) {
    let parsedVotes = JSON.parse(potentialVotes);
    votes = parsedVotes;
  }
}

function getProducts() {
  let potentialProducts = localStorage.getItem("products");

  if (potentialProducts) {
    let parsedProducts = JSON.parse(potentialProducts);
    for (let product of parsedProducts) {
      let name = product.name;
      let src = product.src;
      let votes = product.votes;
      let views = product.views;
      makeProduct(name, src, views, votes);
    }
  }
  // getVotes();
  // renderProduct();
}

function storeVotes() {
  let stringifiedVotes = JSON.stringify(votes);
  localStorage.setItem("votes", stringifiedVotes);
  console.log(votes);
}

function storeProducts() {
  let stringifiedProducts = JSON.stringify(allProducts);
  localStorage.setItem("products", stringifiedProducts);
}

function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {
  // let productOne = getRandomProduct();
  // let productTwo = getRandomProduct();
  // let productThree = getRandomProduct();

  // while (productOne === productTwo || productOne === productThree) {
  //   productTwo = getRandomProduct();
  //   productThree = getRandomProduct();
  // }
  // while (productTwo === productThree || productThree === productOne) {
  //   productThree = getRandomProduct();
  // }

  while (indexArray.length < 6) {
    let ranNum = getRandomProduct();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  let productOne = indexArray.shift();
  let productTwo = indexArray.shift();
  let productThree = indexArray.shift();

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

function renderResults() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${allProducts[i].name} has ${allProducts[i].views} views and have ${allProducts[i].votes} voted`;
    ul.appendChild(li);
  }
}

// Event Handler
function handleProdClick(e) {
  // if (e.target === productContainer) {
  //   alert("Please click on an Odd Duck product");
  // }
  votes++;
  // storeVotes();
  let clickedProd = e.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProd === allProducts[i].name) {
      allProducts[i].votes++;
      storeProducts();
      break;
    }
  }
  renderProduct();
  if (votes === votesAllowed) {
    // resultButton.className = "clicks-allowed";
    productContainer.removeEventListener("click", handleProdClick);
    // storeVotes();
    renderChart();
    // resultButton.addEventListener("click", handleButtonClick);
  }
}

function handleButtonClick(e) {
  if (votes === votesAllowed) {
    renderResults();
  }
}

// ChartJS
function renderChart() {
  let prodName = [];
  let prodViews = [];
  let prodVotes = [];
  for (let i = 0; i < allProducts.length; i++) {
    prodName.push(allProducts[i].name);
    prodViews.push(allProducts[i].views);
    prodVotes.push(allProducts[i].votes);
  }

  const data = {
    labels: prodName,
    datasets: [
      {
        label: "Views",
        data: prodViews,
        backgroundColor: ["rgba(3, 138, 255)"],
        borderColor: ["rgb(0, 0, 0)"],
        borderWidth: 1,
      },
      {
        label: "Clicks/Votes",
        data: prodVotes,
        backgroundColor: ["rgba(194, 249, 112)"],
        borderColor: ["rgb(0, 0, 0)"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

// Excutable Code

// Products
// let bag = new Product("bag");
// let banana = new Product("banana");
// let bathroom = new Product("bathroom");
// let boots = new Product("boots");
// let breakfast = new Product("breakfast");
// let bubblegum = new Product("bubblegum");
// let chair = new Product("chair");
// let cthulhu = new Product("cthulhu");
// let dogDuck = new Product("dog-duck");
// let dragon = new Product("dragon");
// let pen = new Product("pen");
// let petSweep = new Product("pet-sweep");
// let scissors = new Product("scissors");
// let shark = new Product("shark");
// let sweep = new Product("sweep", "png");
// let tauntaun = new Product("tauntaun");
// let unicorn = new Product("unicorn");
// let waterCan = new Product("water-can");
// let wineGlass = new Product("wine-glass");

// allProducts.push(
//   bag,
//   banana,
//   bathroom,
//   boots,
//   breakfast,
//   bubblegum,
//   chair,
//   cthulhu,
//   dogDuck,
//   dragon,
//   pen,
//   petSweep,
//   scissors,
//   shark,
//   tauntaun,
//   unicorn,
//   waterCan,
//   wineGlass
//   );

let curProducts = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];
getProducts();
console.log(allProducts.length);

if (allProducts.length === 0) {
  for (let product of curProducts) {
    makeProduct(product);
  }
  makeProduct("sweep", undefined, undefined, undefined, "png");
  renderProduct();
} else {
  // getProducts();
  renderProduct();
}

// console.log(allProducts);
// console.log(allProducts[0].name);
// console.log(allProducts[1].name);
// console.log(allProducts[2].name);

// renderProduct();

// Event listener
productContainer.addEventListener("click", handleProdClick);
