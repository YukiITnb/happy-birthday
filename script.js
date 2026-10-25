document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. CÁC MỐC THỜI GIAN ĐẶC BIỆT
    // ==========================================
    // Sinh nhật người yêu: 25/10/2004
    const birthDate = new Date('2004-10-25T00:00:00');
    // Ngày chính thức yêu nhau: 16/03/2025
    const loveStartDate = new Date('2025-03-16T00:00:00');

    const countdownElement = document.getElementById('countdown');
    const loveCounterElement = document.getElementById('love-counter');

    function updateTimers() {
        const now = new Date();

        // --- Đếm tuổi & thời gian sinh nhật (25/10/2004) ---
        if (countdownElement) {
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours() - birthDate.getHours();
            let minutes = now.getMinutes() - birthDate.getMinutes();
            let seconds = now.getSeconds() - birthDate.getSeconds();

            if (seconds < 0) { seconds += 60; minutes--; }
            if (minutes < 0) { minutes += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) {
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate();
                months--;
            }
            if (months < 0) { months += 12; years--; }

            countdownElement.innerHTML = `
                <div class="flex flex-wrap justify-center gap-3 md:gap-6 mt-4">
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${years}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Năm</span>
                    </div>
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${months}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Tháng</span>
                    </div>
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${days}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Ngày</span>
                    </div>
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${hours < 10 ? '0' + hours : hours}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Giờ</span>
                    </div>
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${minutes < 10 ? '0' + minutes : minutes}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Phút</span>
                    </div>
                    <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-sm">
                        <span class="text-3xl md:text-4xl font-bold font-anime text-pink-200">${seconds < 10 ? '0' + seconds : seconds}</span>
                        <span class="block text-xs md:text-sm uppercase tracking-wider text-white">Giây</span>
                    </div>
                </div>
            `;
        }

        // --- Đếm thời gian bên nhau (từ 16/03/2024) ---
        if (loveCounterElement) {
            const diffTime = Math.max(0, now - loveStartDate);
            const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
            const seconds = Math.floor((diffTime / 1000) % 60);

            loveCounterElement.innerHTML = `
                <div class="text-center font-anime">
                    <p class="text-lg md:text-xl text-sakura font-semibold mb-2">Đã cùng nhau đi qua</p>
                    <div class="text-3xl md:text-5xl font-bold text-pink-500 tracking-wider">
                        ${totalDays} <span class="text-xl md:text-2xl text-gray-700">ngày</span>
                        ${hours} <span class="text-xl md:text-2xl text-gray-700">giờ</span>
                        ${minutes} <span class="text-xl md:text-2xl text-gray-700">phút</span>
                        ${seconds} <span class="text-xl md:text-2xl text-gray-700">giây</span>
                    </div>
                    <p class="text-sm md:text-base text-gray-500 mt-2 font-normal italic">kể từ ngày 16 tháng 03 năm 2025 ❤️</p>
                </div>
            `;
        }
    }

    setInterval(updateTimers, 1000);
    updateTimers();

    // ==========================================
    // 2. TRÌNH PHÁT NHẠC VÀ NÚT TẮT/BẬT NHẠC
    // ==========================================
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicDisc = document.getElementById('music-disc');
    const musicText = document.getElementById('music-text');
    const soundWave = document.getElementById('sound-wave');

    if (audio) {
        audio.volume = 1.0;

        // Cập nhật giao diện khi nhạc đang phát
        audio.addEventListener('play', () => {
            if (musicDisc) {
                musicDisc.classList.remove('disc-paused');
                musicDisc.classList.add('disc-spinning');
            }
            if (soundWave) {
                soundWave.classList.remove('inactive');
                soundWave.classList.add('active');
            }
            if (musicText) musicText.innerText = 'Tắt nhạc';
            if (musicBtn) musicBtn.classList.add('playing');
        });

        // Cập nhật giao diện khi nhạc dừng
        audio.addEventListener('pause', () => {
            if (musicDisc) {
                musicDisc.classList.add('disc-paused');
            }
            if (soundWave) {
                soundWave.classList.remove('active');
                soundWave.classList.add('inactive');
            }
            if (musicText) musicText.innerText = 'Bật nhạc';
            if (musicBtn) musicBtn.classList.remove('playing');
        });

        audio.addEventListener('error', (e) => {
            console.error("Audio error:", audio.error);
        });

        function tryPlayAudio() {
            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                        console.log("Chờ người dùng tương tác để phát nhạc:", err);
                    });
                }
            }
        }

        // Bấm nút bật / tắt nhạc
        if (musicBtn) {
            musicBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (audio.paused) {
                    audio.play().catch(err => console.error("Không thể phát nhạc:", err));
                } else {
                    audio.pause();
                }
            });
        }

        // Tự động phát khi người dùng chạm hoặc tương tác lần đầu
        const startAudioOnInteraction = () => {
            tryPlayAudio();
            document.removeEventListener('click', startAudioOnInteraction);
            document.removeEventListener('touchstart', startAudioOnInteraction);
            document.removeEventListener('keydown', startAudioOnInteraction);
            document.removeEventListener('scroll', startAudioOnInteraction);
        };

        document.addEventListener('click', startAudioOnInteraction);
        document.addEventListener('touchstart', startAudioOnInteraction);
        document.addEventListener('keydown', startAudioOnInteraction);
        document.addEventListener('scroll', startAudioOnInteraction);

        // Thử phát ngay khi trang tải xong
        tryPlayAudio();
    }

    // ==========================================
    // 3. KHỞI TẠO AOS (ANIMATION CUỘN TRANG)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
        });
    }

    // ==========================================
    // 4. KHỞI TẠO LIGHTGALLERY (ALBUM ẢNH)
    // ==========================================
    const lightgalleryElem = document.getElementById('lightgallery');
    if (lightgalleryElem && typeof lightGallery !== 'undefined') {
        lightGallery(lightgalleryElem, {
            speed: 500,
            download: false
        });
    }

    // ==========================================
    // 5. THANH CUỘN KHO BÁU KỶ NIỆM (HALL OF FAME)
    // ==========================================
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        if (card) {
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap || '32');
            scrollRightBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
            scrollLeftBtn.addEventListener('click', () => {
                scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }
    }

    // ==========================================
    // 6. HIỆU ỨNG CÁNH HOA ANH ĐÀO RƠI (SAKURA)
    // ==========================================
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 45;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 20 + Math.random() * 14;
            this.h = 16 + Math.random() * 10;
            this.opacity = 0.5 + Math.random() * 0.4;
            this.flip = Math.random();
            this.xSpeed = 1.2 + Math.random() * 1.8;
            this.ySpeed = 0.8 + Math.random() * 1.2;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.2 + Math.random() * 1.8;
                this.ySpeed = 0.8 + Math.random() * 1.2;
                this.flip = Math.random();
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }
});
