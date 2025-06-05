// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartCount();
    
    // Checkout button event
    document.getElementById('checkout-btn').addEventListener('click', proceedToCheckout);
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items-container');
    const itemCount = document.getElementById('item-count');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Keranjang Kamu Kosong</h3>
                <p>Belum ada produk yang ditambahkan ke keranjang</p>
                <a href="shop.html" class="btn-shop-now">Belanja Sekarang</a>
            </div>
        `;
        itemCount.textContent = '0 Produk';
        return;
    }
      // Update item count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    itemCount.textContent = `${totalItems} Produk`;
    
    // Render cart items
    let html = '';
    let subtotal = 0;
    let totalDiscount = 0;
    
   cart.forEach(item => {
    // Pastikan price dan originalPrice adalah angka
    const price = Number(item.price) || 0;
    const originalPrice = Number(item.originalPrice) || price;
    const quantity = 1; // selalu 1 sesuai permintaan

    const discount = (originalPrice - price) * quantity;
    const itemTotal = price * quantity;
    subtotal += itemTotal;
    totalDiscount += discount;

    html += `
        <div class="cart-item" data-id="${item.productId}">
            <img src="${item.image || 'images/default-game.jpg'}" alt="${item.productName}" class="cart-item-img">
            <div class="cart-item-details">
                <h4>${item.productName}</h4>
                <p class="cart-item-game">${item.gameName}</p>
                <p class="cart-item-id">ID: ${item.userId} | Server: ${item.server}</p>
            </div>
            <div class="cart-item-controls">
                <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')} x 1</p>
                <button class="remove-item" onclick="removeItem(${item.productId})">
                    <i class="fas fa-trash-alt"></i> Hapus
                </button>
            </div>
        </div>
    `;
});
    
    container.innerHTML = html;
    
    // Update summary
    updateSummary(subtotal, totalDiscount);
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart animate-pop-in">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet</p>
                <a href="shop.html" class="btn-shop-now">Browse Products</a>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    let totalDiscount = 0;
    cart.forEach(item => {
        const gameInfo = games[item.game];
        const discountedPrice = item.price * (1 - item.discount / 100);
        const itemTotal = discountedPrice * item.quantity;
        
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item animate-slide-up';
        cartItem.innerHTML = `
            <div class="cart-item-game" style="background-color: ${gameInfo.color}">
                ${gameInfo.name}
            </div>
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="price-container">
                    <p class="price">${formatCurrency(discountedPrice)}</p>
                    ${item.discount > 0 ? 
                        `<p class="original-price">${formatCurrency(item.price)}</p>` : ''
                    }
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="item-total">${formatCurrency(itemTotal)}</p>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update quantity with buttons
function updateQuantity(productId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId == productId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    // Remove if quantity is 0 or less
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart
    loadCartItems();
    updateCartCount();
}
// Update quantity with input
function updateQuantityInput(productId, value) {
    const quantity = parseInt(value) || 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId == productId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity = quantity;
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart
    loadCartItems();
    updateCartCount();
}
// Remove item from cart
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productId != productId);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload cart
    loadCartItems();
    updateCartCount();
}
// Update summary section
function updateSummary(subtotal, discount) {
    subtotal = isNaN(subtotal) ? 0 : subtotal;
    discount = isNaN(discount) ? 0 : discount;
    const total = subtotal - discount;

    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('discount').textContent = `-Rp ${discount.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;

    // Enable/disable checkout button
    document.getElementById('checkout-btn').disabled = subtotal <= 0;
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;
    
    // In a real app, you would redirect to payment page
    // For this example, we'll show a confirmation and clear cart
    if (confirm('Apakah Anda yakin ingin melanjutkan ke pembayaran?')) {
        alert('Pembayaran berhasil! Item akan dikirim ke akun game Anda.');
    // Clear cart
    localStorage.removeItem('cart');
    loadCartItems();
    updateCartCount(); // Ini sudah benar, akan mengubah cart-count jadi 0
    // Redirect ke shop.html setelah pembayaran
    window.location.href = "shop.html";
    }
}

// Update cart count in header
function updateCartCount() {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        cart = [];
    }
    // Jika setiap produk hanya bisa 1x di cart, maka:
    let totalItems = 0;
    if (Array.isArray(cart)) {
        totalItems = cart.length;
    }
    // Pastikan tidak NaN
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems > 0 ? totalItems : "0";
    });
}