// Products Data
const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4,
        details: "Our premium cotton t-shirt is made from 100% organic cotton for ultimate comfort. The fabric is soft, breathable, and durable, with a relaxed fit that's perfect for everyday wear. Available in multiple colors."
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 5,
        details: "These slim fit jeans are crafted from premium denim with just the right amount of stretch for comfort and mobility. The modern slim fit through the thigh and leg provides a tailored look that's both stylish and comfortable."
    },
    {
        id: 3,
        name: "Leather Crossbody Bag",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 4,
        details: "This elegant leather crossbody bag features genuine leather construction with a soft, supple feel. The adjustable strap allows for multiple carrying options, while the multiple compartments keep your essentials organized."
    },
    {
        id: 4,
        name: "Classic Aviator Sunglasses",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 5,
        details: "Our classic aviator sunglasses feature polarized lenses that reduce glare and provide 100% UV protection. The lightweight metal frame is durable and comfortable for all-day wear, with a timeless design that never goes out of style."
    },
  {
        id: 6,
        name: "Running Sneakers",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        rating: 5,
        details: "Designed for performance and comfort, these running sneakers feature responsive cushioning that absorbs impact and returns energy with every step. The breathable mesh upper keeps your feet cool, while the durable rubber outsole provides traction on various surfaces."
    }
];

// Cart Data
let cart = [];

// DOM Elements
const productRow = document.querySelector('.product-row');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeCartBtn = document.querySelector('.close-cart');
const cartIcon = document.querySelector('.cart-icon a');

// Modal Elements
const productModal = document.getElementById('productModal');
const closeModalBtn = document.querySelector('.close-modal');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductName = document.getElementById('modalProductName');
const modalProductRating = document.getElementById('modalProductRating');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDetails = document.getElementById('modalProductDetails');
const addToCartBtn = document.getElementById('addToCartBtn');

// Current product selected for modal
let currentProduct = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCartItems();
    }
});

// Render products on the page
function renderProducts() {
    productRow.innerHTML = '';
    
    products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.classList.add('product');
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="rating">
                    ${getRatingStars(product.rating)}
                </div>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productRow.appendChild(productEl);
    });
    
    // Add event listeners to product buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
    
    // Add event listeners to product images/names for modal
    document.querySelectorAll('.product img, .product h4').forEach(element => {
        element.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            if (productElement) {
                const productId = parseInt(productElement.querySelector('.add-to-cart').getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    openProductModal(product);
                }
            }
        });
    });
}

// Get rating stars HTML
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Open product modal
function openProductModal(product) {
    currentProduct = product;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductName.textContent = product.name;
    modalProductRating.innerHTML = getRatingStars(product.rating);
    modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
    modalProductDetails.textContent = product.details;
    productModal.style.display = 'block';
}

// Close product modal
function closeProductModal() {
    productModal.style.display = 'none';
    currentProduct = null;
}

// Add product to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
    
    // Show a quick confirmation
    const confirmation = document.createElement('div');
    confirmation.textContent = `${product.name} added to cart!`;
    confirmation.style.position = 'fixed';
    confirmation.style.bottom = '20px';
    confirmation.style.right = '20px';
    confirmation.style.backgroundColor = '#4CAF50';
    confirmation.style.color = 'white';
    confirmation.style.padding = '15px';
    confirmation.style.borderRadius = '5px';
    confirmation.style.zIndex = '1000';
    confirmation.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.style.transition = 'opacity 0.5s';
        confirmation.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(confirmation);
        }, 500);
    }, 2000);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
}

// Update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCartItems();
            saveCartToLocalStorage();
        }
    }
}

// Render cart items in sidebar
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrement-btn" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="increment-btn" data-id="${item.id}">+</button>
                </div>
                <span class="remove-item" data-id="${item.id}">Remove</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
    
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrement-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                updateCartItemQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartItemQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = parseInt(e.target.value);
            if (!isNaN(newQuantity)){
                updateCartItemQuantity(productId, newQuantity);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Menu toggle for mobile
function menutoggle() {
    const menuItems = document.getElementById('MenuItems');
    menuItems.style.maxHeight = menuItems.style.maxHeight === '0px' ? '200px' : '0px';
}

// Event Listeners
closeModalBtn.addEventListener('click', closeProductModal);
window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});

addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('modalProductQty').value) || 1;
        addToCart(currentProduct, quantity);
        closeProductModal();
    }
});

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

closeCartBtn.addEventListener('click', toggleCart);

checkoutBtn.addEventListener('click', () => {
    alert('Checkout functionality would be implemented here!');
    cart = [];
    updateCartCount();
    renderCartItems();
    saveCartToLocalStorage();
    toggleCart();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && e.target !== cartIcon && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});
