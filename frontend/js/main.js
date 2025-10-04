
// Theme toggle functionality
const btn = document.querySelector('#themeColor');

function bgChange() {
    const body = document.body;
    const isLightTheme = body.classList.contains('light-theme');
    
    if (isLightTheme) {
        // Switch to dark theme
        body.classList.remove('light-theme');
        btn.textContent = 'Light Theme';
    } else {
        // Switch to light theme
        body.classList.add('light-theme');
        btn.textContent = 'Dark Theme';
    }
}

btn.onclick = bgChange;

// Carousel functionality
class Carousel {
    constructor() {
        this.slidesContainer = document.getElementById('carousel-slides');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slides = [];
        this.dots = [];
        
        this.init();
    }
    
    init() {
        this.populateCarousel();
        this.setupEventListeners();
    }
    
    populateCarousel() {
        // Clear existing slides and dots
        this.slidesContainer.innerHTML = '';
        this.dotsContainer.innerHTML = '';
        this.slides = [];
        this.dots = [];
        
        // Use featured cards if available, otherwise fallback to static images
        const cardsToShow = featuredCards.length > 0 ? featuredCards.slice(0, 4) : this.getStaticCards();
        
        cardsToShow.forEach((card, index) => {
            // Create slide
            const slide = document.createElement('li');
            slide.className = 'slide';
            slide.id = `s${index + 1}`;
            
            const img = document.createElement('img');
            let imageSrc = card.imageUrl;
            if (imageSrc && imageSrc.includes('via.placeholder.com')) {
                // Use placeholder for generated cards
                imageSrc = 'assets/placeholder.png';
            } else if (!imageSrc || imageSrc.includes('assets/') && !imageSrc.includes('http')) {
                // Use static assets for sample data
                imageSrc = imageSrc || this.getStaticImagePath(index);
            }
            img.src = imageSrc;
            img.alt = card.title ? `${card.title} - ${card.description}` : `Featured Vision Card ${index + 1}`;
            img.loading = 'lazy';
            img.onerror = () => { img.src = 'assets/placeholder.png'; };
            
            slide.appendChild(img);
            this.slidesContainer.appendChild(slide);
            this.slides.push(slide);
            
            // Create dot
            const dot = document.createElement('button');
            dot.className = `dot-nav ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', index);
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('aria-selected', index === 0);
            
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
        
        // Update current slide to 0
        this.currentSlide = 0;
        this.updateCarousel();
    }
    
    getStaticCards() {
        // Fallback static cards when API is not available
        return [
            { title: 'Future Transportation', imageUrl: 'assets/33.png' },
            { title: 'Future Living', imageUrl: 'assets/77.png' },
            { title: 'Future Health', imageUrl: 'assets/96.png' },
            { title: 'Future Technology', imageUrl: 'assets/12.png' }
        ];
    }
    
    getStaticImagePath(index) {
        const staticImages = ['assets/33.png', 'assets/77.png', 'assets/96.png', 'assets/12.png'];
        return staticImages[index] || staticImages[0];
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add event listeners to dots after they're created
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play carousel
        this.startAutoPlay();
        
        // Pause on hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Update slides visibility
        this.slides.forEach((slide, index) => {
            slide.style.display = index === this.currentSlide ? 'block' : 'none';
        });
        
        // Update dots with accessibility attributes
        this.dots.forEach((dot, index) => {
            const isActive = index === this.currentSlide;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive);
        });
        
        // Update button states
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
        
        // Announce slide change to screen readers
        const carousel = document.querySelector('.carousel');
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Now showing slide ${this.currentSlide + 1} of ${this.slides.length}`;
        carousel.appendChild(announcement);
        
        setTimeout(() => {
            carousel.removeChild(announcement);
        }, 1000);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.slideInterval = setInterval(() => this.nextSlide(), 4000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Global variables for cards and carousel
let allCards = [];
let featuredCards = [];
let carouselInstance = null;

// Gallery variables
let filteredCards = [];
let currentLightboxIndex = 0;
let lightboxCards = [];

// Fetch cards from backend API
async function fetchCards() {
    try {
        console.log('Fetching cards from API...');
        const response = await fetch(`${API_BASE_URL}/cards`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cards = await response.json();
        allCards = cards;
        
        // Filter featured cards
        featuredCards = cards.filter(card => card.isFeatured);
        
        console.log(`✅ Fetched ${cards.length} total cards, ${featuredCards.length} featured`);
        return cards;
    } catch (error) {
        console.error('❌ Error fetching cards:', error);
        console.log('🔄 Falling back to static images');
        // Fallback to static images if API fails
        return [];
    }
}

// Refresh carousel with updated data
async function refreshCarousel() {
    await fetchCards();
    if (carouselInstance) {
        carouselInstance.populateCarousel();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch cards from API
    await fetchCards();
    
    // Initialize carousel with dynamic content
    carouselInstance = new Carousel();
    
    // Initialize gallery
    initializeGallery();
});
// RSVP functionality removed



// Enhanced Modal functionality
const toggleModal = (message) => {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-item');
    
    modal.style.display = 'flex';
    modalContent.innerHTML = `
        <h3 style="color: #F3C404; margin-bottom: 1rem;">🎉 Success!</h3>
        <p>${message}</p>
    `;

    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add escape key to close
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Auto-close after 4 seconds
    setTimeout(() => {
        closeModal();
    }, 4000);

    // Animate the star image
    animateImage();
};

const closeModal = () => {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
};

let rotateFactor = 0;
let animationInterval = null;

const animateImage = () => {
    const modalImage = document.getElementById('modal-img');
    
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    animationInterval = setInterval(() => {
        rotateFactor = rotateFactor === 0 ? -15 : 0;
        modalImage.style.transform = `rotate(${rotateFactor}deg) scale(1.1)`;
        
        setTimeout(() => {
            modalImage.style.transform = `rotate(0deg) scale(1)`;
        }, 200);
    }, 1000);
};

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#navBar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll-to-top functionality
const addScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #F3C404, #d5ae00);
        color: #004179;
        border: none;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(243, 196, 4, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
};

// Initialize scroll-to-top when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Submit vision to backend API
async function submitVision(vision) {
    try {
        console.log('🚀 Submitting vision to API...');
        const response = await fetch(`${API_BASE_URL}/cards/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: vision.substring(0, 50), // Truncate title to 50 chars
                description: vision,
                submittedBy: 'Anonymous User',
                category: 'OTHER' // Default category
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newCard = await response.json();
        console.log('✅ New card created:', newCard);
        
        // Add the new card to our local arrays
        allCards.push(newCard);
        if (newCard.isFeatured) {
            featuredCards.push(newCard);
        }
        
        return newCard;
    } catch (error) {
        console.error('❌ Error submitting vision:', error);
        throw error;
    }
}

// Handle Create Your Own Vision form
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.querySelector('.create-form');
    if (createForm) {
        createForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = createForm.querySelector('input[type="text"]');
            const submitBtn = createForm.querySelector('button[type="submit"]');
            const vision = input.value.trim();
            
            if (vision.length < 10) {
                toggleModal('Please enter a vision with at least 10 characters.');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating...';
            submitBtn.disabled = true;
            
            try {
                const newCard = await submitVision(vision);
                
                // Success message
                toggleModal(`🎉 Your vision "${vision.substring(0, 30)}${vision.length > 30 ? '...' : ''}" has been created! Check out your card in the gallery.`);
                
                // Clear form
                input.value = '';
                
                // Refresh carousel and gallery to show the new card
                await refreshCarousel();
                await refreshGallery();
                
            } catch (error) {
                // Error message
                toggleModal('Sorry, there was an error creating your vision. Please try again later.');
            } finally {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Handle Explore button click
    const exploreBtn = document.getElementById('ctaBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('AboutSec');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// ========================================
// VIRTUAL GALLERY FUNCTIONALITY
// ========================================

// Initialize gallery
function initializeGallery() {
    console.log('🎨 Initializing Virtual Gallery...');
    
    // Set initial filtered cards to all cards
    filteredCards = [...allCards];
    lightboxCards = [...allCards];
    
    // Render gallery
    renderGallery();
    
    // Setup event listeners
    setupGalleryEventListeners();
    
    // Update stats
    updateGalleryStats();
}

// Setup gallery event listeners
function setupGalleryEventListeners() {
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Lightbox event listeners
    setupLightboxEventListeners();
}

// Handle category filter
function handleCategoryFilter() {
    const category = document.getElementById('category-filter').value;
    console.log(`🔍 Filtering by category: ${category}`);
    
    if (category === 'all') {
        filteredCards = [...allCards];
    } else {
        filteredCards = allCards.filter(card => card.category === category);
    }
    
    renderGallery();
    updateGalleryStats();
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    console.log(`🔍 Searching for: "${searchTerm}"`);
    
    if (!searchTerm) {
        filteredCards = [...allCards];
    } else {
        filteredCards = allCards.filter(card => 
            card.title.toLowerCase().includes(searchTerm) ||
            card.description.toLowerCase().includes(searchTerm) ||
            card.submittedBy.toLowerCase().includes(searchTerm)
        );
    }
    
    renderGallery();
    updateGalleryStats();
}

// Handle sort
function handleSort() {
    const sortBy = document.getElementById('sort-select').value;
    console.log(`📊 Sorting by: ${sortBy}`);
    
    switch (sortBy) {
        case 'newest':
            filteredCards.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
            break;
        case 'oldest':
            filteredCards.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
            break;
        case 'title':
            filteredCards.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'category':
            filteredCards.sort((a, b) => a.category.localeCompare(b.category));
            break;
    }
    
    renderGallery();
}

// Render gallery
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    console.log(`🎨 Rendering ${filteredCards.length} cards`);
    
    // Clear existing cards
    galleryGrid.innerHTML = '';
    
    if (filteredCards.length === 0) {
        galleryGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <h3>No cards found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    // Create cards
    filteredCards.forEach((card, index) => {
        const cardElement = createGalleryCard(card, index);
        galleryGrid.appendChild(cardElement);
    });
}

// Create gallery card element
function createGalleryCard(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'gallery-card';
    cardDiv.setAttribute('data-card-index', index);
    cardDiv.setAttribute('role', 'gridcell');
    
    // Format date
    const formattedDate = new Date(card.submittedAt).toLocaleDateString();
    
    // Handle image URL - use static images for sample data, placeholder for generated cards
    let imageSrc = card.imageUrl;
    if (imageSrc && imageSrc.includes('via.placeholder.com')) {
        // Use placeholder for generated cards
        imageSrc = 'assets/placeholder.png';
    } else if (!imageSrc || imageSrc.includes('assets/') && !imageSrc.includes('http')) {
        // Use static assets for sample data
        imageSrc = imageSrc || 'assets/placeholder.png';
    }
    
    cardDiv.innerHTML = `
        <img 
            class="gallery-card-image" 
            src="${imageSrc}" 
            alt="${card.title}"
            loading="lazy"
            onerror="this.src='assets/placeholder.png'"
        />
        <div class="gallery-card-content">
            <h3 class="gallery-card-title">${card.title}</h3>
            <p class="gallery-card-description">${card.description}</p>
            <div class="gallery-card-meta">
                <span class="gallery-card-category">${card.category}</span>
                <span class="gallery-card-date">${formattedDate}</span>
            </div>
        </div>
    `;
    
    // Add click event
    cardDiv.addEventListener('click', () => openLightbox(index));
    
    return cardDiv;
}

// Update gallery stats
function updateGalleryStats() {
    const statsElement = document.getElementById('gallery-count');
    if (statsElement) {
        const totalCards = allCards.length;
        const filteredCount = filteredCards.length;
        
        if (filteredCount === totalCards) {
            statsElement.textContent = `Showing all ${totalCards} vision cards`;
        } else {
            statsElement.textContent = `Showing ${filteredCount} of ${totalCards} vision cards`;
        }
    }
}

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

// Setup lightbox event listeners
function setupLightboxEventListeners() {
    const lightbox = document.getElementById('gallery-lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateLightbox(1));
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display !== 'none') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
}

// Open lightbox
function openLightbox(index) {
    console.log(`🖼️ Opening lightbox for card ${index}`);
    
    currentLightboxIndex = index;
    lightboxCards = [...filteredCards];
    
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    // Show lightbox
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    // Update content
    updateLightboxContent();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    console.log('❌ Closing lightbox');
    
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Navigate lightbox
function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;
    
    if (newIndex >= 0 && newIndex < lightboxCards.length) {
        currentLightboxIndex = newIndex;
        updateLightboxContent();
    }
}

// Update lightbox content
function updateLightboxContent() {
    const card = lightboxCards[currentLightboxIndex];
    if (!card) return;
    
    // Update image
    const image = document.getElementById('lightbox-image');
    if (image) {
        let imageSrc = card.imageUrl;
        if (imageSrc && imageSrc.includes('via.placeholder.com')) {
            // Use placeholder for generated cards
            imageSrc = 'assets/placeholder.png';
        } else if (!imageSrc || imageSrc.includes('assets/') && !imageSrc.includes('http')) {
            // Use static assets for sample data
            imageSrc = imageSrc || 'assets/placeholder.png';
        }
        image.src = imageSrc;
        image.alt = card.title;
    }
    
    // Update title
    const title = document.getElementById('lightbox-title');
    if (title) {
        title.textContent = card.title;
    }
    
    // Update description
    const description = document.getElementById('lightbox-description');
    if (description) {
        description.textContent = card.description;
    }
    
    // Update meta information
    const category = document.querySelector('.lightbox-category');
    if (category) {
        category.textContent = card.category;
    }
    
    const submittedBy = document.querySelector('.lightbox-submitted-by');
    if (submittedBy) {
        submittedBy.textContent = `Submitted by: ${card.submittedBy}`;
    }
    
    const date = document.querySelector('.lightbox-date');
    if (date) {
        date.textContent = new Date(card.submittedAt).toLocaleDateString();
    }
    
    // Update counter
    const counter = document.getElementById('lightbox-counter');
    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} of ${lightboxCards.length}`;
    }
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn) {
        prevBtn.style.display = currentLightboxIndex > 0 ? 'flex' : 'none';
    }
    
    if (nextBtn) {
        nextBtn.style.display = currentLightboxIndex < lightboxCards.length - 1 ? 'flex' : 'none';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Refresh gallery when new cards are added
async function refreshGallery() {
    await fetchCards();
    initializeGallery();
}
