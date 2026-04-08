// Product Data
const products = [
    { id: 1, name: 'Wireless Headphones', price: '$79.99', emoji: '🎧', rating: 5 },
    { id: 2, name: 'Smart Watch', price: '$199.99', emoji: '⌚', rating: 4 },
    { id: 3, name: 'USB-C Cable', price: '$12.99', emoji: '🔌', rating: 5 },
    { id: 4, name: 'Phone Stand', price: '$24.99', emoji: '📱', rating: 4 },
    { id: 5, name: 'Webcam HD', price: '$49.99', emoji: '📷', rating: 5 },
    { id: 6, name: 'Keyboard', price: '$89.99', emoji: '⌨️', rating: 4 },
];

let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    attachEventListeners();
});

// Render Products
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">${'⭐'.repeat(product.rating)}</div>
                <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Attach Event Listeners
function attachEventListeners() {
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });

    document.querySelector('.btn-primary').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
}

// Add to Cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    showNotification('Message sent successfully! We will get back to you soon.');
    e.target.reset();
}

// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});
