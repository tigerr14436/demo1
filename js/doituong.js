console.log("index.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    const flowerSections = document.querySelectorAll('.flower-section');
    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbLast = document.getElementById('breadcrumb-last');
    const productDetail = document.getElementById('product-detail');
    const searchResults = document.getElementById('search-results');
    const searchForm = document.querySelector('.search');
    const closeDetailButton = document.querySelector('.close-detail');
    let currentSectionId = null;

    // Format price to VND
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    
    // Show flower section
    window.showFlowerSection = (sectionId) => {
        console.log("Showing flower section:", sectionId);
        // Hide all sections
        flowerSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
            const flowerGrid = section.querySelector('.flower-grid');
            if (flowerGrid) flowerGrid.style.display = 'grid';
        });
        productDetail.classList.remove('active');
        productDetail.style.display = 'none';
        searchResults.style.display = 'none';

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            section.style.display = 'block';
            breadcrumb.style.display = 'flex';
            breadcrumbLast.textContent = sectionId === 'hoa-tang-nguoi-yeu' ? 'Hoa tặng người yêu' : 
                                        sectionId === 'hoa-tang-ban-be' ? 'Hoa tặng bạn bè' :
                                        sectionId === 'hoa-tang-sep' ? 'Hoa tặng sếp' : 'Đối tượng';
            currentSectionId = sectionId;
        }
    };

    // Show product detail
    window.showProductDetail = (name, imageSrc, price, originalPrice = null, description = 'Không có mô tả') => {
        console.log("Showing product detail:", name, imageSrc, price, originalPrice, description);
        if (!productDetail) {
            console.error("Product detail element not found!");
            return;
        }
        const addToCartButton = productDetail.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                
                const newItem = {
                    imgSrc: imageSrc,
                    name: name,
                    price: price,
                    quantity: 1
                };
                
                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const existingItem = cartItems.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push(newItem);
                }
                
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                alert(`Đã thêm ${name} vào giỏ hàng!`);
            });
        }
        const productImage = productDetail.querySelector('.product-image');
        const productName = productDetail.querySelector('.product-name');
        const priceElement = productDetail.querySelector('.product-price .price');
        const originalPriceElement = productDetail.querySelector('.product-price .original-price');
        const productDescription = productDetail.querySelector('.product-description');

        if (!productImage || !productName || !priceElement || !originalPriceElement || !productDescription) {
            console.error("One or more product detail elements not found!");
            return;
        }

        // Update product detail content
        productImage.src = imageSrc;
        productImage.onerror = () => console.error("Failed to load image:", imageSrc);
        productName.textContent = name;
        priceElement.textContent = formatPrice(price);
        productDescription.textContent = description;
        if (originalPrice) {
            originalPriceElement.textContent = formatPrice(originalPrice);
            originalPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.textContent = '';
            originalPriceElement.style.display = 'none';
        }

        // Show product detail, hide flower grid, keep section and breadcrumb visible
        const flowerSection = document.getElementById(currentSectionId);
        if (flowerSection) {
            flowerSection.classList.add('active');
            flowerSection.style.display = 'block';
            const flowerGrid = flowerSection.querySelector('.flower-grid');
            if (flowerGrid) flowerGrid.style.display = 'none';
        }
        breadcrumb.style.display = 'flex';
        productDetail.classList.add('active');
        productDetail.style.display = 'block';
        searchResults.style.display = 'none';
    };

    // Handle close detail button
    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', () => {
            console.log("Closing product detail");
            productDetail.classList.remove('active');
            productDetail.style.display = 'none';
            // Restore flower grid and keep section and breadcrumb visible
            const flowerSection = document.getElementById(currentSectionId);
            if (flowerSection) {
                flowerSection.classList.add('active');
                flowerSection.style.display = 'block';
                const flowerGrid = flowerSection.querySelector('.flower-grid');
                if (flowerGrid) flowerGrid.style.display = 'grid';
            }
            breadcrumb.style.display = 'flex';
        });
    }

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input').value.trim().toLowerCase();
            console.log("Search query:", query);
            if (query) {
                // Mock search results (replace with actual search logic if needed)
                searchResults.innerHTML = `<h2>Kết quả tìm kiếm cho "${query}"</h2><p>Không tìm thấy sản phẩm nào.</p>`;
                searchResults.style.display = 'block';
                flowerSections.forEach(section => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                });
                productDetail.classList.remove('active');
                productDetail.style.display = 'none';
                breadcrumb.style.display = 'none';
            }
        });
    }

    // Default section on page load (for doituong.html)
    if (window.location.pathname.includes('doituong.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionId = urlParams.get('section');
        if (sectionId === 'hoa-tang-ban-be') {
            showFlowerSection('hoa-tang-ban-be');
        } else if (sectionId === 'hoa-tang-sep') {
            showFlowerSection('hoa-tang-sep');
        } else {
            showFlowerSection('hoa-tang-nguoi-yeu'); 
        }
    }
});