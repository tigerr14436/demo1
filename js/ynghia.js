// Dữ liệu chi tiết ý nghĩa các loài hoa
        const flowerMeanings = {
            'Hoa Hồng': {
                description: 'Hoa hồng là biểu tượng phổ biến nhất của tình yêu và sự lãng mạn. Mỗi màu sắc của hoa hồng mang một ý nghĩa khác nhau, từ tình yêu nồng cháy (đỏ) đến tình bạn (vàng) và sự ngưỡng mộ (hồng).',
                colors: [
                    {color: '#e60000', meaning: 'Hồng đỏ: Tình yêu nồng cháy, lãng mạn'},
                    {color: '#ffffff', meaning: 'Hồng trắng: Sự ngây thơ, thuần khiết'},
                    {color: '#ffcc00', meaning: 'Hồng vàng: Tình bạn, sự quan tâm'},
                    {color: '#ffb6c1', meaning: 'Hồng phấn: Sự ngưỡng mộ, biết ơn'}
                ]
            },
            'Hoa Cẩm Chướng': {
                description: 'Hoa cẩm chướng tượng trưng cho tình yêu trong sáng, sự ngưỡng mộ và lòng biết ơn. Loài hoa này thường được dùng để bày tỏ tình cảm với mẹ, với người phụ nữ mình kính trọng.',
                colors: [
                    {color: '#ff0000', meaning: 'Cẩm chướng đỏ: Tình yêu và sự ngưỡng mộ'},
                    {color: '#ffffff', meaning: 'Cẩm chướng trắng: Tình yêu thuần khiết'},
                    {color: '#ff69b4', meaning: 'Cẩm chướng hồng: Tình mẫu tử'},
                    {color: '#800080', meaning: 'Cẩm chướng tím: Tính khí thất thường'}
                ]
            },
            'Hoa Bách Hợp': {
                description: 'Hoa bách hợp (hoa loa kèn) biểu tượng cho sự thanh khiết, trong trắng và hạnh phúc viên mãn. Trong văn hóa phương Tây, hoa bách hợp trắng thường gắn liền với Đức Mẹ Đồng Trinh, tượng trưng cho sự thuần khiết và đức hạnh.',
                colors: [
                    {color: '#ffffff', meaning: 'Bách hợp trắng: Sự thuần khiết, trong trắng'},
                    {color: '#ff69b4', meaning: 'Bách hợp hồng: Sự giàu có, thịnh vượng'},
                    {color: '#ffa500', meaning: 'Bách hợp cam: Niềm đam mê, nhiệt huyết'},
                    {color: '#ff0000', meaning: 'Bách hợp đỏ: Sự kiêu hãnh, lòng can đảm'}
                ]
            },
            // Thêm dữ liệu cho các loài hoa khác tương tự
        };

        // Hiển thị modal chi tiết ý nghĩa hoa
        function showMeaningDetail(name, imageSrc, description) {
            const modal = document.getElementById('meaningModal');
            const title = document.getElementById('meaningModalTitle');
            const image = document.getElementById('meaningModalImage');
            const desc = document.getElementById('meaningModalDescription');
            const colorsList = document.getElementById('meaningModalColors');
            
            title.textContent = `Ý Nghĩa ${name}`;
            image.src = imageSrc;
            image.alt = name;
            desc.textContent = description;
            
            // Xóa danh sách màu sắc cũ
            colorsList.innerHTML = '';
            
            // Thêm danh sách màu sắc nếu có trong dữ liệu
            if (flowerMeanings[name] && flowerMeanings[name].colors) {
                flowerMeanings[name].colors.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span class="color-sample" style="background-color: ${item.color}; ${item.color === '#ffffff' ? 'border: 1px solid #ccc;' : ''}"></span> ${item.meaning}`;
                    colorsList.appendChild(li);
                });
            } else {
                // Nếu không có dữ liệu màu sắc, ẩn phần này
                document.querySelector('.meaning-colors').style.display = 'none';
            }
            
            modal.style.display = 'block';
        }

        // Đóng modal chi tiết
        function closeMeaningDetail() {
            document.getElementById('meaningModal').style.display = 'none';
            // Hiển thị lại phần màu sắc cho lần mở tiếp theo
            document.querySelector('.meaning-colors').style.display = 'block';
        }

        // Đóng modal khi click bên ngoài
        window.onclick = function(event) {
            const modal = document.getElementById('meaningModal');
            if (event.target === modal) {
                closeMeaningDetail();
            }
        }