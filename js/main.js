// Shared cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

      // Auto-rotate featured games in hero section
    const games = [
        {
            title: "MOBILE LEGENDS<br><span>NEW SEASON UPDATE!</span>",
            desc: "Dapatkan skin eksklusif dan diamond dengan harga spesial!",
            price: "RP 5.000 TO RP 500.000",
            image: "images/mlbb-hero-large.png",
            link: "shop.html?game=ml"
        },
        {
            title: "FREE FIRE<br><span>NEW SEASON UPDATE!</span>",
            desc: "Dapatkan Promo Diamond Free Fire Sekarang!",
            price: "RP 3.000 TO RP 1.000.000",
            image: "images/epep4.png",
            link: "shop.html?game=gi"
        },
        {
            title: "GENSHIN IMPACT<br><span>NEW REGION UPDATE!</span>",
            desc: "Genesis Crystals diskon hingga 25% untuk update terbaru!",
            price: "RP 15.000 TO RP 1.000.000",
            image: "images/genshin-hero.png",
            link: "shop.html?game=gi"
        },
        {
            title: "Wuwa<br><span>NEW REGION UPDATE!</span>",
            desc: " lunite diskon hingga 40% untuk update terbaru!",
            price: "RP 15.000 TO RP 1.000.000",
            image: "images/wuwa1.png",
            link: "shop.html?game=gi"
        },     
        {
            title: "BLUE ARCHIVE<br><span>NEW MAP UPDATE!</span>",
            desc: "Pyroxene diskon hingga 30% untuk update terbaru!",
            price: "RP 15.000 TO RP 1.000.000",
            image: "images/shiroko.png",
            link: "shop.html?game=gi"
        }
        
    ];
    
    // Ripple effect for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.ripple-effect');
    
 buttons.forEach(button => {
         // Create particles
        const particles = button.querySelector('.particles');
        
        // Create 4 particle elements
        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particles.appendChild(particle);
        }
        
        // Animate particles on hover
        button.addEventListener('mouseenter', function() {
            const particles = this.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                // Random size
                const size = Math.random() * 10 + 5;
                
                // Random animation delay
                const delay = Math.random() * 0.5;
                
                // Set styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
                particle.style.animation = `particle-float ${Math.random() * 1 + 1}s ${delay}s ease-out infinite`;
            });
        });
        
        // Click ripple effect
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('click-ripple');
            
            // Position ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
            
        });
    });
});
    
    let currentGame = 0;
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroPrice = document.querySelector('.hero-price-range');
    const heroImage = document.querySelector('.hero-image img');
    const heroButton = document.querySelector('.hero-button');
    
    function rotateGame() {
        currentGame = (currentGame + 1) % games.length;
        const game = games[currentGame];
        
        heroTitle.innerHTML = game.title;
        heroDesc.textContent = game.desc;
        heroPrice.innerHTML = `<span>${game.price.split(' TO ')[0]}</span> TO <span>${game.price.split(' TO ')[1]}</span>`;
        heroImage.src = game.image;
        heroImage.alt = game.title.replace(/<[^>]*>/g, '');
        heroButton.href = game.link;
        
        // Add animation class
        heroImage.classList.add('animate-pop-in');
        setTimeout(() => {
            heroImage.classList.remove('animate-pop-in');
        }, 600);
    }
    
    // Rotate every 5 seconds
    setInterval(rotateGame, 5000);

    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (currentPage) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
});

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}