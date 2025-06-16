document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu sản phẩm khuyến mãi
    const promotionProducts = [
        // SALE
        {
            name: "Tuổi Mộng Mơ",
            image: "images/KhuyenMai/3158_whisper-of-nature.jpg",
            category: "sale",
            originalPrice: 200000,
            currentPrice: 150000,
            badge: "SALE",
            description: "Bó hoa hồng đỏ kèm lá xanh"
        },
        {
            name: "Love to the moon",
            image: "images/KhuyenMai/6907_love-to-the-moon.jpg",
            category: "sale",
            originalPrice: 350000,
            currentPrice: 250000,
            badge: "SALE",
            description: "Hộp hoa hồng đỏ hình trái tim"
        },
        {
            name: "Mini flower vase 01",
            image: "images/KhuyenMai/14555_mini-flower-vase-01.jpg",
            category: "sale",
            originalPrice: 400000,
            currentPrice: 350000,
            badge: "SALE",
            description: "Bình hoa nhỏ đa dạng màu sắc"
        },
        // FREESHIP
        {
            name: "Mini flower vase 04",
            image: "images/KhuyenMai/14425_mini-flower-vase-04.jpg",
            category: "freship",
            originalPrice: 480000,
            currentPrice: 450000,
            badge: "FRESHIP",
            description: "Bình hoa mini phong cách hiện đại"
        },
        {
            name: "Ngọt ngào 3",
            image: "images/KhuyenMai/12285_ngot-ngao-3.jpg",
            category: "freship",
            originalPrice: 650000,
            currentPrice: 550000,
            badge: "FRESHIP",
            description: "Bó hoa hồng phấn kèm hoa baby"
        },
        {
            name: "Whisper of nature",
            image: "images/KhuyenMai/3158_whisper-of-nature.jpg",
            category: "freship",
            originalPrice: 650000,
            currentPrice: 600000,
            badge: "FRESHIP",
            description: "Hộp hoa kết hợp với lá tự nhiên"
        }
    ];

    const productGrid = document.querySelector('.product-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Hiển thị tất cả sản phẩm ban đầu
    displayProducts(promotionProducts);

    // Lọc sản phẩm theo category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            if (filter === 'all') {
                displayProducts(promotionProducts);
            } else {
                const filteredProducts = promotionProducts.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });

    // Hiển thị sản phẩm
    function displayProducts(products) {
        productGrid.innerHTML = '';
        
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="no-products">Hiện không có sản phẩm nào trong danh mục này</p>';
            return;
        }
        
        // Nhóm sản phẩm theo category
        const groupedProducts = products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});
        
        // Hiển thị theo thứ tự SALE trước, FRESHIP sau
        const displayOrder = ['sale', 'freship'];
        
        displayOrder.forEach(category => {
            if (groupedProducts[category]) {
                // Thêm sản phẩm
                groupedProducts[category].forEach(product => {
                    const discountPercent = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
                    
                    const productCard = document.createElement('div');
                    productCard.className = 'product-item';
                    productCard.innerHTML = `
                        <div class="badge ${product.badge.toLowerCase()}">${product.badge}</div>
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h4>${product.name}</h4>
                            <div class="price-container">
                                <span class="current-price">${formatPrice(product.currentPrice)} đ</span>
                                ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)} đ</span>` : ''}
                                <span class="discount">-${discountPercent}%</span>
                            </div>
                            <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Thêm vào giỏ hàng</button>
                        </div>
                    `;
                    productGrid.appendChild(productCard);
                });
            }
        });
        
        // Thêm sự kiện click cho nút thêm vào giỏ hàng
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productData = JSON.parse(this.dataset.product);
                addToCart(productData);
                
                // Hiệu ứng thông báo
                const notification = document.createElement('div');
                notification.className = 'add-to-cart-notification';
                notification.textContent = `Đã thêm ${productData.name} vào giỏ hàng!`;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            });
        });
    }


});
// Hàm định dạng giá tiền
function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}
// Hàm thêm vào giỏ hàng (sử dụng chung với các trang khác)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            imgSrc: product.image,
            price: product.currentPrice,
            originalPrice: product.originalPrice,
            description: product.description,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Cập nhật icon giỏ hàng
    const cartIcons = document.querySelectorAll('.fa-cart-shopping');
    cartIcons.forEach(icon => {
        const countBadge = icon.nextElementSibling || document.createElement('span');
        countBadge.className = 'cart-count';
        countBadge.textContent = totalItems;
        
        if (totalItems > 0) {
            countBadge.style.display = 'inline-block';
        } else {
            countBadge.style.display = 'none';
        }
        
        if (!icon.nextElementSibling) {
            icon.parentNode.appendChild(countBadge);
        }
    });
}