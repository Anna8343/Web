const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const dropdowns = document.querySelectorAll('.nav-item.dropdown');

function toggleMenu() {
    if (navToggle.getAttribute('aria-expanded') === 'false') {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.classList.add('active');
        navMenu.classList.add('active');
    } else {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

navToggle.addEventListener('click', toggleMenu);

function toggleDropdown(e) {
    if (window.innerWidth <= 768) {
        const dropdown = this;
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownToggle = dropdown.querySelector('a');
        
        if (e.target === dropdownToggle || e.target === dropdownToggle.querySelector('i')) {
            e.preventDefault();
            
            if (dropdownToggle.getAttribute('aria-expanded') === 'false') {
                dropdowns.forEach(item => {
                    if (item !== dropdown && item.querySelector('a').getAttribute('aria-expanded') === 'true') {
                        item.querySelector('a').setAttribute('aria-expanded', 'false');
                        item.classList.remove('open');
                    }
                });
                
                dropdownToggle.setAttribute('aria-expanded', 'true');
                dropdown.classList.add('open');
            } else {
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdown.classList.remove('open');
            }
        }
    }
}

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);
});

function handleDropdownKeys(e) {
    const dropdown = this.closest('.dropdown');
    const dropdownToggle = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    
    if ((e.key === 'Enter' || e.key === ' ') && e.target === dropdownToggle) {
        e.preventDefault();
        
        if (!isExpanded) {
            dropdownToggle.setAttribute('aria-expanded', 'true');
            dropdownMenu.style.display = 'block';
        } else {
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownMenu.style.display = '';
        }
    }
    
    if (e.key === 'Escape' && isExpanded) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.style.display = '';
        dropdownToggle.focus();
    }
}

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('keydown', handleDropdownKeys);
});

document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            toggleMenu();
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
            dropdown.querySelector('a').setAttribute('aria-expanded', 'false');
        });
    }
});