
// Theme toggle functionality
const btn = document.querySelector('#themeColor');

function bgChange() {
    const currentColor = getComputedStyle(document.body).backgroundColor;

    if (currentColor === 'rgb(0, 65, 121)') {
        document.body.style.backgroundColor = 'rgb(112,112,112)';
        btn.textContent = 'Light Theme';
    } else if (currentColor === 'rgb(112,112,112)') {
        document.body.style.backgroundColor = 'rgb(0, 65, 121)';
        btn.textContent = 'Dark Theme';
    } else {
        // default fallback
        document.body.style.backgroundColor = 'rgb(0, 65, 121)';
        btn.textContent = 'Dark Theme';
    }
}

btn.onclick = bgChange;

// Carousel functionality
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot-nav');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
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

// Handle Create Your Own Vision form
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.querySelector('.create-form');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = createForm.querySelector('input[type="text"]');
            const vision = input.value.trim();
            
            if (vision.length >= 10) {
                toggleModal(`Thank you for sharing your vision: "${vision}". We'll review it and may feature it in our exhibit!`);
                input.value = '';
            } else {
                toggleModal('Please enter a vision with at least 10 characters.');
            }
        });
    }
});
