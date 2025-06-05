// Product data
const products = [
    {
        id: 1,
        name: "1x Weekly Diamond Pass",
        game: "ml",
        price: 26790,
        oldPrice: 32000,
        discount: "-15%",
        image: "images/ml_weekly.jpg",
        desc: "Total 220 DM"
    },
    {
        id: 2,
        name: "5 Diamonds",
        game: "ml",
        price: 1450,
        oldPrice: 1500,
        discount: "-3%",
        image: "images/ml_5dm.jpg",
        desc: ""
    },
    {
        id: 3,
        name: "12 Diamonds",
        game: "ml",
        price: 3500,
        oldPrice: 3688,
        discount: "-5%",
        image: "images/ml_12dm.jpg",
        desc: "11 + 1 Bonus"
    },
    {
        id: 4,
        name: "Free Fire Diamonds",
        game: "ff",
        price: 1400,
        oldPrice: 1500,
        discount: "-7%",
        image: "images/ff.jpg",
        desc: ""
    },
    {
        id: 5,
        name: "Genshin Impact Genesis Crystals",
        game: "gi",
        price: 2000,
        oldPrice: 2500,
        discount: "-20%",
        image: "images/gi.jpg",
        desc: ""
    },
    {
        id: 6,
        name: "Valorant Points",
        game: "valo",
        price: 1800,
        oldPrice: 2000,
        discount: "-10%",
        image: "images/valo.jpg",
        desc: ""
    },
    {
        id: 7,
        name: "PUBG Mobile UC",
        game: "pubg",
        price: 1700,
        oldPrice: 1900,
        discount: "-10%",
        image: "images/pubg.jpg",
        desc: ""
    },
    {
        id: 8,
        name: "Call of Duty CP",
        game: "cod",
        price: 1600,
        oldPrice: 1800,
        discount: "-11%",
        image: "images/cod.jpg",
        desc: ""
    }
];

const qty = Math.max(1, parseInt(document.getElementById(`qty-${productId}`).value) || 1);

// Game data
const games = {
    ml: { name: 'Mobile Legends', color: '#ff5722' },
    ff: { name: 'Free Fire', color: '#ff9800' },
    gi: { name: 'Genshin Impact', color: '#2196f3' },
    valo: { name: 'Valorant', color: '#f44336' },
    pubg: { name: 'PUBG Mobile', color: '#4caf50' },
    cod: { name: 'Call of Duty', color: '#9c27b0' }
};

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    // Get game parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameFilter = urlParams.get('game');
    
    // Set the filter if game parameter exists
    if (gameFilter) {
        document.getElementById('game-filter').value = gameFilter;
        filterProductsByGame(gameFilter);
    }
});

function filterProductsByGame(game) {
    // Your existing product filtering function
    // This should show only products for the selected game
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (game === 'all' || product.dataset.game === game) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Render products
function renderProducts(filter = "all", search = "") {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    let filtered = products.filter(p => (filter === "all" || p.game === filter) && p.name.toLowerCase().includes(search.toLowerCase()));
    filtered.forEach(product => {
        let titleHtml = product.name;
        // Contoh khusus untuk Mobile Legends
        if (product.name === "Mobile Legends" || product.name.startsWith("Mobile Legends")) {
            titleHtml = `<span class="ml-blue">Mobile</span> <span class="ml-orange">Legends</span>`;
        }
        grid.innerHTML += `
        <div class="topup-card">
            <div class="topup-img-wrap">
                <img src="${product.image}" alt="${product.name}" class="topup-img">
                <span class="topup-discount">${product.discount}</span>
            </div>
            <div class="topup-info">
                <h3 class="topup-title">${titleHtml}</h3>
                ${product.desc ? `<p class="topup-desc">${product.desc}</p>` : ""}
                <div class="topup-price-wrap">
                    <span class="topup-price">Rp${product.price.toLocaleString()}</span>
                    <span class="topup-oldprice">Rp${product.oldPrice.toLocaleString()}</span>
                </div>
                <div class="topup-action">
                    <input type="number" min="1" value="1" class="topup-qty" id="qty-${product.id}">
                    <button class="topup-btn" onclick="addToCart(${product.id})">Beli</button>
                </div>
            </div>
        </div>
        `;
    });
}
    
    // Add event listeners
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(document.querySelector(`.quantity-input[data-id="${productId}"]`).value);
            addToCart(productId, quantity);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            input.value = parseInt(input.value) + 1;
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });


// Filter products by search term
function filterProducts(searchTerm) {
    const gameFilter = document.getElementById('game-filter').value;
    const filteredProducts = (gameFilter === 'all' ? products : products.filter(p => p.game === gameFilter))
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    renderFilteredProducts(filteredProducts);
}

// Add product to cart
function addToCart(productId) {
    const qty = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Produk berhasil dimasukkan ke keranjang!");
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Cek apakah sudah ada
    if (cart.find(item => item.productId === product.id)) {
        alert('Produk sudah ada di keranjang!');
        return;
    }
    cart.push({
        productId: product.id,
        productName: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.oldPrice || product.price,
        gameName: product.game, // atau nama game lain sesuai kebutuhan
        userId: '', // isi jika ada
        server: '', // isi jika ada
        quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount && updateCartCount();
    alert('Produk berhasil dimasukkan ke keranjang!');
}
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) cartCount.textContent = count;
}
    
    // Show success animation
    const button = document.querySelector(`.btn-add-to-cart[data-id="${productId}"]`);
    if (button) {
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = 'Add to Cart <i class="fas fa-shopping-cart"></i>';
            button.style.backgroundColor = '';
        }, 1500);
    }
        // Filter dan search
    document.getElementById("game-filter").addEventListener("change", function() {
        renderProducts(this.value, document.getElementById("product-search").value);
    });
    document.getElementById("product-search").addEventListener("input", function() {
        renderProducts(document.getElementById("game-filter").value, this.value);
    });

// Inisialisasi
renderProducts();
updateCartCount();

window.addToCart = addToCart;