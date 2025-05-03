// Клас для слайдера зображень
class ImageSlider {
    constructor() {
        // Отримуємо елементи слайдера
        this.sliderContainer = document.querySelector('.slider-container');
        this.slidesContainer = document.querySelector('.slides');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.dots-container');
        this.autoplayBtn = document.querySelector('.autoplay-button');
        this.currentSlideElem = document.querySelector('.current-slide');
        this.totalSlidesElem = document.querySelector('.total-slides');
        this.progressBar = document.querySelector('.progress');
        
        // Налаштування слайдера
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 секунд між слайдами
        this.isPlaying = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        // Ініціалізуємо слайдер
        this.init();
    }
    
    // Ініціалізація слайдера
    init() {
        // Відображаємо загальну кількість слайдів
        this.totalSlidesElem.textContent = this.slideCount;
        
        // Створюємо навігаційні точки
        this.createDots();
        
        // Додаємо обробники подій
        this.addEventListeners();
        
        // Оновлюємо відображення активного слайду
        this.updateActiveSlide();
    }
    
    // Створення навігаційних точок
    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            
            // Додаємо обробник кліку
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }
    
    // Додавання обробників подій
    addEventListeners() {
        // Клік на кнопки "Вперед" і "Назад"
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Клік на кнопку автовідтворення
        this.autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
        
        // Обробка клавіш клавіатури
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === ' ') {
                this.toggleAutoplay();
                e.preventDefault(); // Щоб сторінка не скролилась
            }
        });
        
        // Обробка свайпів на мобільних пристроях
        this.sliderContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });
        
        this.sliderContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }
    
    // Обробка свайпів
    handleSwipe() {
        const swipeDiff = this.touchStartX - this.touchEndX;
        
        // Якщо була достатня відстань свайпу
        if (Math.abs(swipeDiff) > 50) {
            if (swipeDiff > 0) {
                // Свайп вліво - наступний слайд
                this.nextSlide();
            } else {
                // Свайп вправо - попередній слайд
                this.prevSlide();
            }
        }
    }
    
    // Перехід до попереднього слайду
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateActiveSlide();
    }
    
    // Перехід до наступного слайду
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateActiveSlide();
    }
    
    // Перехід до конкретного слайду
    goToSlide(index) {
        if (index >= 0 && index < this.slideCount) {
            this.currentIndex = index;
            this.updateActiveSlide();
        }
    }
    
    // Оновлення відображення активного слайду
    updateActiveSlide() {
        // Зміщуємо контейнер слайдів
        this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Оновлюємо лічильник
        this.currentSlideElem.textContent = this.currentIndex + 1;
        
        // Оновлюємо активні навігаційні точки
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Скидаємо прогрес-бар, якщо автовідтворення активне
        if (this.isPlaying) {
            this.resetProgressBar();
        }
    }
    
    // Увімкнення/вимкнення автовідтворення
    toggleAutoplay() {
        if (this.isPlaying) {
            this.stopAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    // Запуск автовідтворення
    startAutoplay() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.autoplayBtn.classList.add('playing');
            
            // Запускаємо інтервал для перемикання слайдів
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
            
            // Запускаємо відображення прогресу
            this.startProgressBar();
        }
    }
    
    // Зупинка автовідтворення
    stopAutoplay() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.autoplayBtn.classList.remove('playing');
            
            // Зупиняємо інтервал
            clearInterval(this.autoplayInterval);
            
            // Скидаємо прогрес-бар
            this.progressBar.style.width = '0%';
        }
    }
    
    // Запуск анімації прогрес-бару
    startProgressBar() {
        // Скидаємо прогрес-бар
        this.progressBar.style.width = '0%';
        
        // Створюємо анімацію прогресу
        let startTime = null;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            
            // Обчислюємо прогрес
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / this.autoplayDelay * 100, 100);
            
            // Оновлюємо прогрес-бар
            this.progressBar.style.width = `${progress}%`;
            
            // Продовжуємо анімацію, якщо ще не досягли 100%
            if (progress < 100 && this.isPlaying) {
                requestAnimationFrame(animate);
            } else if (progress === 100 && this.isPlaying) {
                 // Ensure the progress bar is full and then immediately reset for the next slide
                 this.progressBar.style.width = '100%';
            }
        };
        
        // Запускаємо анімацію
        requestAnimationFrame(animate);
    }
    
    // Скидання прогрес-бару
    resetProgressBar() {
        if (this.isPlaying) {
            this.progressBar.style.transition = 'none'; // Disable transition for reset
            this.progressBar.style.width = '0%';
            // Force a reflow to apply the width: 0% before re-enabling transition
            this.progressBar.offsetHeight;
            this.progressBar.style.transition = `width ${this.autoplayDelay / 1000}s linear`; // Re-enable transition
            this.startProgressBar();
        }
    }
}

// Ініціалізація слайдера при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ImageSlider();
}); 