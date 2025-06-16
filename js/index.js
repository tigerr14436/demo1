document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle menu
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
    
    // Đóng menu khi click overlay
    menuOverlay.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
        this.classList.remove('active');
    });
    
    // Toggle dropdown menu trên mobile
    const dropdownToggles = document.querySelectorAll('.menu-list > li > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const dropdown = this.parentElement.querySelector('.dropdown-menu');
                if (dropdown) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });
    
    // Đóng menu khi click vào mục menu không có dropdown
    const menuItems = document.querySelectorAll('.menu-list > li > a:not([href="#"])');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            }
        });
    });
});