// Sample product data
const products = [
    {
        id: 1,
        name: "86 Diamond",
        game: "ml",
        gameName: "Mobile Legends",
        price: 20000,
        image: "images/game1.jpg",
        discount: 0
    },
    {
        id: 2,
        name: "172 Diamond",
        game: "ml",
        gameName: "Mobile Legends",
        price: 40000,
        image: "images/game1.jpg",
        discount: 5
    },
    {
        id: 3,
        name: "257 Diamond",
        game: "ml",
        gameName: "Mobile Legends",
        price: 60000,
        image: "images/game1.jpg",
        discount: 10
    },
    {
        id: 4,
        name: "50 Diamond",
        game: "ff",
        gameName: "Free Fire",
        price: 10000,
        image: "images/game2.jpg",
        discount: 0
    },
    {
        id: 5,
        name: "100 Diamond",
        game: "ff",
        gameName: "Free Fire",
        price: 20000,
        image: "images/game2.jpg",
        discount: 5
    },
    {
        id: 6,
        name: "500 Diamond",
        game: "ff",
        gameName: "Free Fire",
        price: 100000,
        image: "images/game2.jpg",
        discount: 15
    },
    {
        id: 7,
        name: "60 Genesis Crystals",
        game: "gi",
        gameName: "Genshin Impact",
        price: 15000,
        image: "images/game3.jpg",
        discount: 0
    },
    {
        id: 8,
        name: "300 Genesis Crystals",
        game: "gi",
        gameName: "Genshin Impact",
        price: 75000,
        image: "images/game3.jpg",
        discount: 10
    },
    {
        id: 9,
        name: "980 Genesis Crystals",
        game: "gi",
        gameName: "Genshin Impact",
        price: 240000,
        image: "images/game3.jpg",
        discount: 20
    },
    {
        id: 10,
        name: "350 VP",
        game: "valo",
        gameName: "Valorant",
        price: 50000,
        image: "images/game4.jpg",
        discount: 0
    },
    {
        id: 11,
        name: "700 VP",
        game: "valo",
        gameName: "Valorant",
        price: 100000,
        image: "images/game4.jpg",
        discount: 5
    },
    {
        id: 12,
        name: "1400 VP",
        game: "valo",
        gameName: "Valorant",
        price: 200000,
        image: "images/game4.jpg",
        discount: 10
    },
    {
        id: 13,
        name: "100 UC",
        game: "pubg",
        gameName: "PUBG Mobile",
        price: 15000,
        image: "images/game5.jpg",
        discount: 0
    },
    {
        id: 14,
        name: "500 UC",
        game: "pubg",
        gameName: "PUBG Mobile",
        price: 75000,
        image: "images/game5.jpg",
        discount: 5
    },
    {
        id: 15,
        name: "1000 UC",
        game: "pubg",
        gameName: "PUBG Mobile",
        price: 150000,
        image: "images/game5.jpg",
        discount: 10
    },
    {
        id: 16,
        name: "100 CP",
        game: "cod",
        gameName: "Call of Duty",
        price: 15000,
        image: "images/game6.jpg",
        discount: 0
    },
    {
        id: 17,
        name: "500 CP",
        game: "cod",
        gameName: "Call of Duty",
        price: 75000,
        image: "images/game6.jpg",
        discount: 5
    },
    {
        id: 18,
        name: "1000 CP",
        game: "cod",
        gameName: "Call of Duty",
        price: 150000,
        image: "images/game6.jpg",
        discount: 10
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalElement = document.getElementById('subtotal');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');
const checkoutBtn = document.querySelector('.btn-checkout');
const gameFilter = document.getElementById('game-filter');
const productSearch = document.getElementById('product-search');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const btnShopNow = document.querySelector('.btn-shop-now');

// Initialize the app
function init() {
    renderProducts();
    updateCart();
    setupEventListeners();
}

// Render products to the shop page
function renderProducts(filteredProducts = products) {
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const discountedPrice = product.price * (1 - product.discount / 100);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card animate-slide-up';
        productCard.innerHTML = `
            ${product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="game-name">${product.gameName}</p>
                <p class="price">Rp ${discountedPrice.toLocaleString()}</p>
                ${product.discount > 0 ? `<p class="original-price">Rp ${product.price.toLocaleString()}</p>` : ''}
                <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartAnimation(productId);
}

// Show animation when adding to cart
function showAddToCartAnimation(productId) {
    const button = document.querySelector(`.btn-add-to-cart[data-id="${productId}"]`);
    if (!button) return;
    
    button.textContent = 'Added!';
    button.style.backgroundColor = '#00b894';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 1000);
}

// Update setupEventListeners function
function setupEventListeners() {
    // ... kode sebelumnya ...
    
    // Add event listeners to new nav links
    document.querySelector('[data-page="about"]').addEventListener('click', () => showPage('about'));
    document.querySelector('[data-page="contact"]').addEventListener('click', () => showPage('contact'));
    
    // Contact form submission
    document.getElementById('messageForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        e.target.reset();
    });
}


function showPage(pageName) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`${pageName}-page`).classList.add('active');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}
// Update cart UI
function updateCart() {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Render cart items
    renderCartItems();
    
    // Update summary
    updateSummary();
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn-shop-now">Shop Now</button>
            </div>
        `;
        
        // Add event listener to the "Shop Now" button in empty cart
        document.querySelector('.empty-cart-message .btn-shop-now')?.addEventListener('click', () => {
            showPage('shop');
        });
        
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const discountedPrice = item.price * (1 - item.discount / 100);
        const itemTotal = discountedPrice * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="game-name">${item.gameName}</p>
                <p class="price">Rp ${discountedPrice.toLocaleString()}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="item-total">Rp ${itemTotal.toLocaleString()}</p>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity controls
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Remove item if quantity reaches 0
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    updateCart();
}