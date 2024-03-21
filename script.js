document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile navigation menu
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    // Function to dynamically load products on the Shop page from JSON data
    function loadProducts(products) {
        const container = document.querySelector('.product-listing .container');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button>Add to Cart</button>
            `;
            container.appendChild(productElement);
        });
    }

    // Check if we are on the shop page and load products if we are
    if (window.location.pathname.endsWith('shop.html')) {
        // This URL will be your GitHub JSON file path
        fetch('organized_data.json')
            .then(response => response.json())
            .then(data => {
                // Assuming the JSON data is an array of products
                loadProducts(data.products);
            })
            .catch(error => console.error('Error loading product data:', error));
    }

    // Function to dynamically load products on the Shop page from JSON data
    if (window.location.pathname.endsWith('shop.html')) {
        // This URL will be your GitHub JSON file path
        const jsonUrl = 'organized_data.json';
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                loadProducts(data.products);
            })
            .catch(error => console.error('Error loading product data:', error));
    }

    // Carousel functionality
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.remove('active');
            if (index === currentIndex) {
                img.classList.add('active');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    setInterval(nextImage, 3000); // Rotate images every 3 seconds
    updateCarousel(); // Initialize carousel

    // Define product data
    const products = [
        {
            id: 1,
            name: "Signature Blend",
            description: "A smooth, rich blend of several premium beans.",
            price: 14.99,
            imageUrl: "https://source.unsplash.com/random/300x300?coffee",
        },
        {
            id: 2,
            name: "Espresso Roast",
            description: "Bold and full-bodied, perfect for a classic espresso.",
            price: 15.99,
            imageUrl: "https://source.unsplash.com/random/300x300?espresso",
        },
        // Add more products as needed
    ];

    // Dynamically load products on the Shop page
    if(document.querySelector('.product-listing')) {
        loadProducts();
    }

    function loadProducts() {
        const container = document.querySelector('.product-listing .container');
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button>Add to Cart</button>
            `;
            container.appendChild(productElement);
        });
    }

    // Form validation for the Contact Page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting

            const emailInput = contactForm.querySelector('input[type="email"]');
            if (!emailInput.value || !emailInput.value.includes('@')) {
                alert('Please enter a valid email address.');
                return false;
            }

            // Simulate form submission
            alert('Thank you for your message!');
            contactForm.reset(); // Reset the form after submission
        });
    }
});
