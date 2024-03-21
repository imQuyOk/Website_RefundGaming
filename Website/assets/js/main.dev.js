"use strict";

// Cart
var cartIcon = document.querySelector('#cart-icon');
var cart = document.querySelector('.cart');
var closeCart = document.querySelector('#close-cart'); // Open Cart

cartIcon.onclick = function () {
  cart.classList.add('active');
}; // Close Cart


closeCart.onclick = function () {
  cart.classList.remove('active');
}; // Cart Working Js


if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
} // Making Function


function ready() {
  // Reomve Items From Cart
  var reomveCartButtons = document.getElementsByClassName('cart-remove');
  console.log(reomveCartButtons);

  for (var i = 0; i < reomveCartButtons.length; i++) {
    var button = reomveCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity');

  for (var _i = 0; _i < quantityInputs.length; _i++) {
    var input = quantityInputs[_i];
    input.addEventListener("change", quantityChanged);
  } // Add To Card


  var addCart = document.getElementsByClassName('add-cart');

  for (var _i2 = 0; _i2 < addCart.length; _i2++) {
    var _button = addCart[_i2];

    _button.addEventListener('click', addCartClicked);
  } // Buy Button Work


  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
} // Buy Button


function buyButtonClicked() {
  alert('Your Order is placed');
  var cartContent = document.getElementsByClassName('cart-content')[0];

  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }

  updatetotal();
} // Reomve Items From Cart 


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
} // Add To Cart


function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('You have already add this item to cart !');
      return;
    }
  }

  var cartBoxContent = "\n    <img src=\"".concat(productImg, "\" alt=\"\" class=\"cart-img\">\n                            <div class=\"detail-box\">\n                                <div class=\"cart-product-title\">\n                                    ").concat(title, "\n                                </div>\n                                <div class=\"cart-price\">\n                                    ").concat(price, "\n                                </div>\n                                <input type=\"number\" value=\"1\" class=\"cart-quantity\">\n                            </div>\n                            <!-- Remove Cart -->\n                           \n                            <i class='bx bxs-trash-alt cart-remove'></i> ");
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
} // Quantity changes


function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updatetotal();
} // Update Total


function updatetotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  } // If price Contain some Cents Value


  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}