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
        fetch('organized_menu_corrected.json')
            .then(response => response.json())
            .then(data => {
                // Assuming the JSON data is an array of products
                loadProducts(data.products);
            })
            .catch(error => console.error('Error loading product data:', error));
    }
    // Function to load and display category buttons dynamically
        // Modify the initial fetch for categories to include a conditional check
    const categoryButtonsContainer = document.querySelector('.category-buttons');
    if (categoryButtonsContainer) {
        // Only attempt to fetch and display categories if the container exists
        fetch('organized_menu_corrected.json')
            .then(response => response.json())
            .then(data => {
                displayCategoryButtons(data); // Display category buttons dynamically
                const firstCategoryName = Object.keys(data)[0];
                loadCategory(firstCategoryName);
            })
            .catch(error => console.error('Error loading initial data:', error));
    }

    // Load featured products only if the featured products container exists
    const featuredProductsContainer = document.getElementById('featured-products-container');
    if (featuredProductsContainer) {
        loadFeaturedProducts();
    }
    function displayCategoryButtons(categories) {
        const buttonsContainer = document.querySelector('.category-buttons');
        buttonsContainer.innerHTML = ''; // Clear any existing buttons
        
        Object.keys(categories).forEach(categoryName => {
            const button = document.createElement('button');
            button.textContent = categoryName;
            button.onclick = () => loadCategory(categoryName);
            buttonsContainer.appendChild(button);
        });
    }

    function loadCategory(categoryName) {
        const jsonUrl = 'organized_menu_corrected.json';
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                displayProducts(data[categoryName]);
            })
            .catch(error => console.error('Error loading product data:', error));
    }

    // Assuming 'displayProducts' is correctly implemented to display products of a selected category
    // Function to load featured products
function loadFeaturedProducts() {
    fetch('data/organized_menu_corrected.json') // Update the path to where your JSON file is located
        .then(response => response.json())
        .then(data => {
            // Here you would select which items to feature, for simplicity we're featuring the first item from each category
            const featuredProducts = Object.keys(data).map(category => {
                const items = data[category];
                const firstItemKey = Object.keys(items)[0];
                return {
                    name: `${firstItemKey} - ${category}`,
                    price: items[firstItemKey],
                    // Placeholder image, replace with actual product images if available
                    imageUrl: 'https://via.placeholder.com/150'
                };
            });
            displayFeaturedProducts(featuredProducts);
        })
        .catch(error => console.error('Error loading featured products:', error));
}

// Function to display featured products on the homepage
function displayFeaturedProducts(products) {
    const container = document.getElementById('featured-products-container');
    if (!container) return;
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <a href="shop.html" class="cta-button">Shop Now</a>
        `;
        container.appendChild(productElement);
    });
}

// Ensure the loadFeaturedProducts function is called when the page loads, if we're on the homepage
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', loadFeaturedProducts);
}
    // Initial fetch to load categories from JSON and display the first category's products
    fetch('organized_menu_corrected.json')
        .then(response => response.json())
        .then(data => {
            displayCategoryButtons(data); // Display category buttons dynamically
            const firstCategoryName = Object.keys(data)[0]; // Automatically load the first category
            loadCategory(firstCategoryName);
        })
        .catch(error => console.error('Error loading initial data:', error));

    function displayProducts(products) {
        const container = document.querySelector('.product-listing .container');
        container.innerHTML = ''; // Clear existing content

        // Check for empty or undefined products
        if (!products || Object.keys(products).length === 0) {
            container.innerHTML = '<p>No products found in this category.</p>';
            return;
        }

        // Iterate over products and display them
        Object.entries(products).forEach(([size, price]) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <h3>${size}</h3>
                <p>Price: $${price}</p>
                <button>Add to Cart</button>
            `;
            container.appendChild(productElement);
        });
    }

    // Example to load a default category or implement logic to select one
    loadCategory('Hot Coffee / Coco / Cider / Tea');
    function loadFeaturedProducts() {
        const jsonUrl = 'organized_menu_corrected.json'; // Adjust the path as needed
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                // Assuming 'Featured' is a category or criteria in your JSON
                // Modify this part based on your actual JSON structure
                const featuredProducts = data['Featured'] || []; // Fallback to an empty array if not found
                displayFeaturedProducts(featuredProducts);
            })
            .catch(error => console.error('Error loading featured products:', error));
    }

    function displayFeaturedProducts(products) {
        const container = document.getElementById('featured-products-container');
        container.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            // Adjust image URL, name, description, etc., based on your actual product structure
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="shop.html" class="cta-button">Shop Now</a>
            `;
            container.appendChild(productElement);
        });
    }

    // Load featured products if on the index page
    if(document.body.contains(document.getElementById('featured-products-container'))) {
        loadFeaturedProducts();
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
