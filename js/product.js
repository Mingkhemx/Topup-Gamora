// product.js
document.addEventListener('DOMContentLoaded', function() {
    // Diamond options data
    const diamondOptions = [
        { id: 1, diamonds: 50, bonus: 5, price: 15000, popular: false },
        { id: 2, diamonds: 100, bonus: 10, price: 29000, popular: true },
        { id: 3, diamonds: 200, bonus: 25, price: 55000, popular: false },
        { id: 4, diamonds: 500, bonus: 75, price: 125000, popular: true },
        { id: 5, diamonds: 1000, bonus: 200, price: 240000, popular: false },
        { id: 6, diamonds: 2000, bonus: 500, price: 450000, popular: true }
    ];

    // Render diamond options
    const diamondOptionsContainer = document.getElementById('diamond-options');
    diamondOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-card';
        if (option.popular) {
            optionElement.classList.add('popular');
        }
        
        optionElement.innerHTML = `
            <div class="option-content">
                <input type="radio" name="diamond-option" id="option-${option.id}" value="${option.id}">
                <label for="option-${option.id}">
                    <div class="diamond-amount">
                        <span class="main-amount">${option.diamonds}</span>
                        <span class="bonus-amount">+${option.bonus} bonus</span>
                    </div>
                    <div class="option-price">Rp ${option.price.toLocaleString('id-ID')}</div>
                    ${option.popular ? '<div class="popular-badge">POPULER</div>' : ''}
                </label>
            </div>
        `;
        diamondOptionsContainer.appendChild(optionElement);
    });

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show/hide tabs
            const tabName = button.getAttribute('data-tab');
            document.querySelectorAll('.options-grid').forEach(grid => {
                grid.classList.add('hidden');
            });
            document.getElementById(`${tabName}-options`).classList.remove('hidden');
        });
    });

    // Form validation and add to cart functionality
    const userIdInput = document.getElementById('user-id');
    const serverSelect = document.getElementById('server');
    const addToCartButton = document.getElementById('add-to-cart');
    const notificationToast = document.getElementById('notification-toast');

    // Check if all required fields are filled
    function checkFormValidity() {
        const isUserIdValid = userIdInput.value.trim().length >= 6;
        const isServerSelected = serverSelect.value !== '';
        const isOptionSelected = document.querySelector('input[name="diamond-option"]:checked') !== null;
        
        addToCartButton.disabled = !(isUserIdValid && isServerSelected && isOptionSelected);
    }

    // Add event listeners for form validation
    userIdInput.addEventListener('input', checkFormValidity);
    serverSelect.addEventListener('change', checkFormValidity);
    document.querySelectorAll('input[name="diamond-option"]').forEach(radio => {
        radio.addEventListener('change', checkFormValidity);
    });

    // Add to cart functionality
    addToCartButton.addEventListener('click', function() {
        // Get selected values
        const userId = userIdInput.value.trim();
        const server = serverSelect.value;
        const selectedOption = document.querySelector('input[name="diamond-option"]:checked').value;
        const optionData = diamondOptions.find(opt => opt.id == selectedOption);
        
        // Create cart item object
        const cartItem = {
            game: 'Mobile Legends',
            product: 'Diamond',
            userId: userId,
            server: server,
            diamonds: optionData.diamonds,
            bonus: optionData.bonus,
            price: optionData.price,
            timestamp: new Date().getTime()
        };
        
        // Add to cart (in this example, we'll use localStorage)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show notification
        showNotification();
    });

    // Show notification function
    function showNotification() {
        notificationToast.classList.remove('hidden');
        setTimeout(() => {
            notificationToast.classList.add('hidden');
        }, 3000);
    }
});