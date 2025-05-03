const menuContainer = document.getElementById('menuContainer');
const burgerMenu = document.querySelector('.burger-menu');

function buildMenu(menuItems, parent) {
    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        if (item.active) {
            menuItem.classList.add('active');
        }
        
        const menuLink = document.createElement('a');
        menuLink.href = item.link;
        menuLink.textContent = item.title;
        menuItem.appendChild(menuLink);
        
        if (item.submenu && item.submenu.length > 0) {
            const submenu = document.createElement('ul');
            submenu.className = 'submenu';
            
            buildMenu(item.submenu, submenu);
            
            menuItem.appendChild(submenu);
            
            menuLink.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSubmenu(submenu);
                }
            });
        }
        
        parent.appendChild(menuItem);
    });
}

function toggleSubmenu(submenu) {
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}

burgerMenu.addEventListener('click', () => {
    menuContainer.classList.toggle('open');
    
    const spans = burgerMenu.querySelectorAll('span');
    spans.forEach(span => {
        span.classList.toggle('active');
    });
});

function saveActiveMenuItem(menuItem) {
    localStorage.setItem('activeMenuItem', menuItem.textContent);
    
    const allItems = menuContainer.querySelectorAll('li');
    allItems.forEach(item => {
        item.classList.remove('active');
    });
    
    menuItem.classList.add('active');
}

menuContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        const menuItem = e.target.parentElement;
        saveActiveMenuItem(menuItem);
    }
});

function restoreActiveMenuItem() {
    const activeMenuText = localStorage.getItem('activeMenuItem');
    if (activeMenuText) {
        const allLinks = menuContainer.querySelectorAll('a');
        allLinks.forEach(link => {
            if (link.textContent === activeMenuText) {
                link.parentElement.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildMenu(menuData.items, menuContainer);
    
    restoreActiveMenuItem();
    
    const menuItems = menuContainer.querySelectorAll('li');
    menuItems.forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.querySelector('a').click();
            }
        });
    });
}); 