// ===== WEEK 6: ASYNC & APIs =====
// Instead of hardcoding products, we "fetch" them — just like a real store
// would load products from a server/database.

// ===== SIMULATE AN API =====
// This pretends to be a server. It waits 1 second then returns product data.
// Later (Phase 5) you'll replace this with a real API call.

async function fetchProducts() {
    // "await" means: pause here and wait until the data comes back
    // The Promise + setTimeout simulates a server taking 1 second to respond
    let data = await new Promise(function(resolve) {
        setTimeout(function() {
            resolve([
                { name: "Phone Stand", price: 12.99, description: "Sleek, minimal stand for any phone" },
                { name: "Desk Organizer", price: 18.00, description: "Keep your workspace clean and tidy" },
                { name: "Miniature Dragon", price: 8.00, description: "Detailed fantasy figure, hand-finished" }
            ]);
        }, 1000);  // 1 second delay to simulate real network request
    });

    return data;
}

// ===== GLOBAL VARIABLES =====

let products = [];   // Starts empty — gets filled when data loads

// Load cart from localStorage (so it survives page refresh!)
// localStorage stores text, so we use JSON.parse to turn it back into an array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// ↑ This says: "Get 'cart' from storage. If nothing is there, use an empty array []"

// ===== CART FUNCTIONS =====

function addToCart(productName) {
    let product = products.find(p => p.name === productName);
    if (product) {
        cart.push(product);
        updateCartDisplay();
    }
}

function removeFromCart(productName) {
    let index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}

function getCartTotal() {
    let total = 0;
    for (let item of cart) {
        total = total + item.price;
    }
    return total;
}

// ===== SAVE CART =====
// Every time the cart changes, save it to localStorage
// JSON.stringify turns the array into text (localStorage only stores text)

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== UPDATE CART DISPLAY =====

function updateCartDisplay() {
    saveCart();  // Save to localStorage every time the display updates
    document.querySelector("#cart-count").textContent = cart.length;
    document.querySelector("#cart-total").textContent = getCartTotal().toFixed(2);

    let cartItems = document.querySelector("#cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        return;
    }

    let html = "";
    for (let i = 0; i < cart.length; i++) {
        html += '<div class="cart-item">'
            + '<span class="cart-item-name">' + cart[i].name + '</span>'
            + '<span class="cart-item-price">$' + cart[i].price.toFixed(2) + '</span>'
            + '<button class="remove-btn" data-name="' + cart[i].name + '">&times;</button>'
            + '</div>';
    }
    cartItems.innerHTML = html;

    let removeButtons = cartItems.querySelectorAll(".remove-btn");
    removeButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            let name = this.getAttribute("data-name");
            removeFromCart(name);
        });
    });
}

// ===== BUILD PRODUCT CARDS FROM DATA =====
// This is the big new thing: JavaScript builds the HTML instead of us writing it by hand!

function displayProducts(productList) {
    let container = document.querySelector(".product-list");

    let html = "";
    for (let product of productList) {
        html += '<div class="product-card">'
            + '<div class="product-image">' + product.name + '</div>'
            + '<h3>' + product.name + '</h3>'
            + '<p class="product-desc">' + product.description + '</p>'
            + '<p class="price">$' + product.price.toFixed(2) + '</p>'
            + '<button class="btn btn-small">Add to Cart</button>'
            + '</div>';
    }
    container.innerHTML = html;

    // Now attach click events to the new buttons
    let addButtons = container.querySelectorAll(".btn-small");
    addButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let card = this.closest(".product-card");
            let productName = card.querySelector("h3").textContent;
            addToCart(productName);

            this.textContent = "Added!";
            this.style.backgroundColor = "#27ae60";

            let btn = this;
            setTimeout(function() {
                btn.textContent = "Add to Cart";
                btn.style.backgroundColor = "";
            }, 1000);
        });
    });
}

// ===== SEARCH / FILTER =====

document.querySelector("#search-bar").addEventListener("input", function() {
    let searchText = this.value.toLowerCase();
    let filtered = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
    });
    displayProducts(filtered);
});

// ===== CART DROPDOWN TOGGLE =====

document.querySelector("#cart-link").addEventListener("click", function(e) {
    e.preventDefault();
    let dropdown = document.querySelector("#cart-dropdown");
    dropdown.classList.toggle("hidden");
});

// ===== LOAD THE STORE =====
// This is the "main" function — it runs when the page opens.
// "async" means this function can wait for things (like fetching data).

async function loadStore() {
    // Show a loading message while we wait

    document.querySelector(".product-list").innerHTML = '<p style="text-align:center; color:#888;">Loading products...</p>';

    // Fetch the products (waits 1 second)
    products = await fetchProducts();

    // Now display them on the page
    displayProducts(products);

    console.log("Store loaded! " + products.length + " products available.");
}

// Start the store!
loadStore();

// Show any saved cart items right away (don't wait for products to load)
updateCartDisplay();
