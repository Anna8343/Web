const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.querySelector('.close-modal');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');

let currentSlide = 0;
const totalSlides = galleryItems.length;

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleScrollBtn() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
}

function showSlide(n) {
    for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].style.display = 'none';
    }
    
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }
    
    galleryItems[currentSlide].style.display = 'block';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
    
    const name = document.getElementById('name').value;
    if (!name) {
        document.getElementById('nameError').textContent = 'Введіть ваше ім\'я';
        isValid = false;
    }
    
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('emailError').textContent = 'Введіть ваш email';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Введіть правильний email';
        isValid = false;
    }
    
    const message = document.getElementById('message').value;
    if (!message) {
        document.getElementById('messageError').textContent = 'Введіть ваше повідомлення';
        isValid = false;
    }
    
    if (isValid) {
        contactForm.reset();
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleScrollBtn);
    
    showSlide(0);
    galleryNextBtn.addEventListener('click', nextSlide);
    galleryPrevBtn.addEventListener('click', prevSlide);
    
    contactForm.addEventListener('submit', validateForm);
}); 