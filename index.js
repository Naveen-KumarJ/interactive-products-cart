const productList = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality over-ear wireless headphones with noise-canceling features, 40-hour battery life, and superior sound quality.",
    price: "₹2,499",
    imgPath: "./assets/wirless-Headphones.webp",
  },
  {
    id: 2,
    name: "Smart Fitness Band",
    description:
      "Track your fitness with precision. Features include heart rate monitoring, step counting, and a sleek AMOLED display.",
    price: "₹1,299",
    imgPath: "./assets/smart-watch.jpg",
  },
  {
    id: 3,
    name: "Portable Laptop Stand",
    description:
      "Lightweight, foldable aluminum stand compatible with all laptops up to 15.6 inches. Adjustable height for better posture.",
    price: "₹899",
    imgPath: "./assets/portable-laptop-stand.jpg",
  },
];

const productListDiv = document.querySelector("#product-list");
let productHTML = "";

productList.forEach((product) => {
  productHTML += `
      <div class="product-item">
        <div class="product-info">
          <img src="${product.imgPath}" alt="${product.name}">
          <div>
            <p><strong>${product.name}</strong></p>
            <p>${product.description}</p>
          </div>
        </div>
        <div class="quantity-part">
          <button class="decrement">-</button>
          <input type="text" class="quantity-val" value=0>
          <button class="increment">+</button>
        </div>
        <div class="price">${product.price}</div>
      </div>`;
});
productListDiv.innerHTML = productHTML;

let productsCountSpan = document.getElementById("products-count");
productsCountSpan.innerText = productList.length;

let quantityInput = document.querySelectorAll(".quantity-val");
let productItem = document.querySelectorAll(".product-item");
let purchasedProductDetailsTab = document.querySelector(
  ".product-purchased-details-tab"
);
let alertTab = document.querySelector(".alert-tab");
let checkoutTab = document.querySelector(".checkout-tab");
let cartProductDetails = document.querySelector(".cart-products-details");
let finalPrice = document.getElementById("final-price");

function updateOrderSummary() {
  let totalPrice = 0;
  let purchaseOutput = "";
  quantityInput.forEach((eachInput, idx) => {
    if (parseInt(eachInput.value) > 0) {
      let eachPrice =
        parseInt(eachInput.value) *
        parseInt(productList[idx].price.slice(1).split(",").join(""));
      totalPrice += eachPrice;
      purchaseOutput += `
        <div class="each-purchased-product">
          <div class="purchased-product-name">${productList[idx].name}</div>
          <div class="purchased-quantity-price">${
            eachInput.value
          } x ${productList[idx].price.slice(1)}</div>
          <div class="purchased-product-total-price">₹${
            parseInt(eachInput.value) *
            parseInt(productList[idx].price.slice(1).split(",").join(""))
          }</div>
        </div>
      `;
      // console.log(productList[idx].name+" count "+eachInput.value);
    }
  });
  if (purchaseOutput !== "") {
    purchasedProductDetailsTab.innerHTML = purchaseOutput;
    alertTab.innerText = "";
    checkoutTab.style.display = "flex";
    cartProductDetails.style.justifyContent = "space-between";
    finalPrice.innerText = `₹${totalPrice}`;
  } else {
    purchasedProductDetailsTab.innerHTML = "";
    alertTab.innerText = "No Product added to the cart";
    checkoutTab.style.display = "none";
    cartProductDetails.style.justifyContent = "center";
  }
}

productItem.forEach((eachProduct, idx) => {
  eachProduct.addEventListener("click", (e) => {
    // console.log(e);
    if (e.target.className === "increment") {
      quantityInput[idx].value = parseInt(quantityInput[idx].value) + 1;
      updateOrderSummary();
      // console.log("clicked Increment");
    }
    if (e.target.className === "decrement") {
      if (parseInt(quantityInput[idx].value) > 0) {
        quantityInput[idx].value = parseInt(quantityInput[idx].value) - 1;
        // console.log("clicked decrement");
      }
      updateOrderSummary();
    }
  });
});
