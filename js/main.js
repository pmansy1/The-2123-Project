
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
/***** Form Handling *****/
const addParticipant = (person) => {
    const rsvpList = document.getElementById('rsvpList');
    const li = document.createElement('li');
    li.textContent = `${person.name} – ${person.comment}`;
    li.style.opacity = '0';
    li.style.transform = 'translateY(20px)';
    rsvpList.appendChild(li);
    
    // Animate the new item
    setTimeout(() => {
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }, 100);
};

/***** Enhanced Form Validation *****/
const validateForm = (event) => {
    event.preventDefault();

    let containsErrors = false;
    const rsvpInputs = document.querySelectorAll('.rsvp-input');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Validate each input
    rsvpInputs.forEach((input, index) => {
        const value = input.value.trim();
        let isValid = true;
        
        // Remove previous error state
        input.classList.remove('error');
        
        // Validation rules
        if (index === 0) { // Name field
            isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
        } else if (index === 1) { // Email field
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (index === 2) { // Comment field
            isValid = value.length >= 10;
        }
        
        if (!isValid) {
            containsErrors = true;
            input.classList.add('error');
            
            // Add error message
            let errorMsg = input.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ff4444';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '0.25rem';
                input.parentNode.appendChild(errorMsg);
            }
            
            // Set specific error messages
            if (index === 0) {
                errorMsg.textContent = 'Please enter a valid name (at least 2 characters, letters only)';
            } else if (index === 1) {
                errorMsg.textContent = 'Please enter a valid email address';
            } else if (index === 2) {
                errorMsg.textContent = 'Please enter a comment (at least 10 characters)';
            }
        } else {
            // Remove error message if exists
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });

    if (!containsErrors) {
        const person = {
            name: rsvpInputs[0].value.trim(),
            email: rsvpInputs[1].value.trim(),
            comment: rsvpInputs[2].value.trim(),
        };

        // Simulate API call delay
        setTimeout(() => {
            addParticipant(person);
            toggleModal(person);
            
            // Clear form
            rsvpInputs.forEach(input => {
                input.value = "";
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1000);
    } else {
        // Remove loading state on error
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 500);
    }
};

// Add real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const rsvpInputs = document.querySelectorAll('.rsvp-input');
    
    rsvpInputs.forEach((input, index) => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            let isValid = true;
            
            if (index === 0) { // Name
                isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
            } else if (index === 1) { // Email
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (index === 2) { // Comment
                isValid = value.length >= 10;
            }
            
            if (value && !isValid) {
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorMsg = input.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
    });
});

// Add event listener to RSVP form
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', validateForm);
}



// Enhanced Modal functionality
const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-item');
    
    modal.style.display = 'flex';
    modalContent.innerHTML = `
        <h3 style="color: #F3C404; margin-bottom: 1rem;">🎉 Congratulations!</h3>
        <p>Dear <strong>${person.name}</strong>,</p>
        <p>You are officially signed up to attend the Project 2123 Exhibit! We're thrilled to have you join us in envisioning Trinity's future.</p>
        <p style="margin-top: 1rem; font-style: italic;">Can't wait to see you there!</p>
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

    // Auto-close after 6 seconds
    setTimeout(() => {
        closeModal();
    }, 6000);

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
