<template>
    <q-img src="/images/HomeKebab.png" />

    <q-page class="q-pa-xl">
        <h1 class="text-h5 text-weight-bold">Menu Favorit</h1>

        <div class="menu-scroll q-mt-lg">
            <div class="scroll-container">
                <q-img src="/images/Thumbnail1.png" class="menu-card" />
                <q-img src="/images/Thumbnail2.png" class="menu-card" />
                <q-img src="/images/Thumbnail3.png" class="menu-card" />
                <q-img src="/images/Thumbnail4.png" class="menu-card" />
                <q-img src="/images/Thumbnail5.png" class="menu-card" />
                <q-img src="/images/Thumbnail6.png" class="menu-card" />
            </div>
        </div>
        <div class="lihat-semua-wrapper q-mt-lg">
            <LihatSemuaButton label="Lihat Semua" route="/Menu" />
        </div>

        <h1 class="text-h5 text-weight-bold">Penawaran Spesial</h1>
        <div class="penawaran-wrapper q-mt-lg">
            <q-img src="/images/Penawaran1.png" class="penawaran-fixed" />
            <div class="penawaran-scroll">
                <div class="penawaran-scroll-container">
                    <q-img src="/images/Penawaran2.png" class="penawaran-card" />
                    <q-img src="/images/Penawaran3.png" class="penawaran-card" />
                    <q-img src="/images/Penawaran4.png" class="penawaran-card" />
                </div>
            </div>
        </div>
        <div class="lihat-semua-wrapper q-mt-lg">
            <LihatSemuaButton label="Lihat Semua" route="/Menu" />
        </div>

        <div class="download-app-section q-mt-xl">
            <div>
                <div class="download-teks">
                    Makin Hemat & Praktis dengan Aplikasi<br />
                    Order Kabobs. Download Sekarang!
                </div>
                <q-img src="/images/Barcode.png" class="download-kiri-img" />
            </div>

            <q-img src="/images/Aplikasi.png" class="download-kanan-img" />
        </div>

        <div class="start-order-section row items-center q-mt-xl">
            <div class="col">
                <div class="start-order-text text-h5 text-weight-bold">
                    Mau Pesan Kabobs Sekarang?
                </div>
            </div>

            <div class="col-auto">
                <q-btn
                    label="Mulai Pesan"
                    class="start-order-button"
                    unelevated
                    no-caps
                    @click="$router.push('/order-now')"
                />
            </div>
        </div>

        <div class="lihat-menu q-mt-xl">
            <div class="menu-kiri">
                <div
                    class="gambar-hover-wrapper"
                    @mouseenter="isMenuHover = true"
                    @mouseleave="isMenuHover = false"
                >
                    <q-img src="/images/KebabMenu.png" class="gambar-base" />
                    <q-img src="/images/KebabMenuHover.png" class="gambar-hover-layer" :class="{ visible: isMenuHover }" />
                    <div class="teks-pojok-kanan" :class="{ visible: isMenuHover }">
                        <div class="lihat-text">LIHAT</div>
                        <div class="menu-text">MENU</div>
                    </div>
                </div>
            </div>

            <div class="outlet-kanan">
                <div
                    class="outlet-kanan-hover"
                    @mouseenter="isPromoHover = true"
                    @mouseleave="isPromoHover = false"
                >
                    <q-img src="/images/OutletHome.png" class="outlet-home" />

                    <div class="overlay-outlet-kanan" :class="{ show: isPromoHover }"></div>
                    <div class="outlet-teks" :class="{ show: isPromoHover }">
                        Temukan <br />
                        Kabobs
                        <div class="text-h4">Cari Kabobs terdekat</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-gambar">
            <div class="col-auto">
                <div class="cara-order-kiri">
                    <div
                        class="gambar-hover-wrapper"
                        @mouseenter="isCaraOrderHover = true"
                        @mouseleave="isCaraOrderHover = false"
                    >
                        <q-img src="/images/CaraOrder1.png" class="gambar-base" />
                        <q-img
                            src="/images/CaraOrder2.png"
                            class="gambar-hover-layer"
                            :class="{ visible: isCaraOrderHover }"
                        />
                        <div class="teks-kiri-atas" :class="{ visible: isCaraOrderHover }">
                            CARA
                        </div>
                        <div class="teks-kanan-bawah" :class="{ visible: isCaraOrderHover }">
                            ORDER
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="kebab-maker">
                    <div
                        class="zoom-hover-wrapper"
                        @mouseenter="isKebabMakerHover = true"
                        @mouseleave="isKebabMakerHover = false"
                    >
                        <q-img src="/images/KebabMaker.png" class="zoom-base-img" />
                        <div class="zoom-overlay" :class="{ show: isKebabMakerHover }">
                            <q-img src="/images/TextKebabMaker.png" class="zoom-center-icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="k-stars" @mouseenter="restartCycle">
                    <q-img
                        :src="kStarsImages[currentIndex]"
                        :class="[
                            'k-stars-img',
                            {
                                zoomed: currentIndex === kStarsImages.length - 1,
                                unzoomed: currentIndex === kStarsImages.length - 1 && overlayVisible,
                            },
                        ]"
                    />
                    <img
                        v-if="currentIndex === kStarsImages.length - 1 && overlayVisible"
                        src="/images/KStars.png"
                        class="k-stars-overlay-img"
                    />
                </div>
            </div>
        </div>

        <div class="col">
            <div class="start-order-text text-h5 text-weight-bold">
                Kabobs Social Media
            </div>
        </div>

        <div class="auto-scroll-gallery" @mouseenter="showOverlay = true" @mouseleave="showOverlay = false">
            <div ref="scrollTrack" class="gallery-track">
                <div v-for="i in 8" :key="i" class="gallery-item">
                <img :src="`/images/Sosmed${i}.png`" alt="" />
                </div>
            </div>

            <!-- Overlay tengah -->
            <div class="global-overlay" :class="{ visible: showOverlay }">
                <div class="overlay-text">Follow Kabobs.id</div>
                <div class="social-icons">
                    <a href="https://www.facebook.com/kabobs.id" target="_blank" rel="noopener">
                        <img src="/icons/Facebook.png" alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com/kabobs.id/" target="_blank" rel="noopener">
                        <img src="/icons/Instagram.png" alt="Instagram" />
                    </a>
                    <a href="https://www.tiktok.com/@kabobs.id" target="_blank" rel="noopener">
                        <img src="/icons/TikTok.png" alt="TikTok" />
                    </a>
                </div>
            </div>
        </div>


        <OrderNowButton />
    </q-page>
</template>


<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const isMenuHover = ref(false)
    const isPromoHover = ref(false)
    const isCaraOrderHover = ref(false)
    const isKebabMakerHover = ref(false)

    const kStarsImages = [
        '/images/KStars1.png',
        '/images/KStars2.png',
        '/images/KStars3.png',
        '/images/KStars4.png',
        '/images/KStars5.png',
    ]
    const currentIndex = ref(0)
    const overlayVisible = ref(false)
    let intervalId: number | undefined
    let isCycling = false

    function restartCycle() {
    // Jangan reset kalau sedang cycling
    if (isCycling) return

    isCycling = true
    currentIndex.value = 0
    overlayVisible.value = false
    clearInterval(intervalId)

    intervalId = window.setInterval(() => {
        if (currentIndex.value < kStarsImages.length - 1) {
            currentIndex.value++
            } else {
            clearInterval(intervalId)
            isCycling = false
            setTimeout(() => {
                overlayVisible.value = true
            }, 100)
            }
        }, 500)
    }

    const showOverlay = ref(false)
    const scrollTrack = ref<HTMLElement | null>(null)

    onMounted(() => {
        const trackEl = scrollTrack.value
        if (!trackEl) return

        // Gandakan isi track agar bisa looping terus
        const items = trackEl.innerHTML
        trackEl.innerHTML += items

        let pos = 0
        const speed = 1

        function animate() {
            // Safety check tiap frame
            if (!scrollTrack.value) return

            pos -= speed
            const width = scrollTrack.value.scrollWidth / 2

            if (Math.abs(pos) >= width) {
            pos = 0
            }

            scrollTrack.value.style.transform = `translateX(${pos}px)`
            requestAnimationFrame(animate)
        }

        animate()
    })

    import LihatSemuaButton from 'components/LihatSemuaButton.vue'
    import OrderNowButton from 'components/OrderNowButton.vue'
</script>

<style scoped>

    .q-img {
        object-fit: cover;
    }
    
    .q-page {
        max-width: 1400px;
        margin: 0 auto;
        padding-left: 60px;
        padding-right: 60px;
    }

    h1 {
        font-size: 48px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
        font-weight: bold;
    }
    
    /* Menu Favorit styles */
    .menu-scroll {
        overflow-x: auto;
        white-space: nowrap;
    }

    .scroll-container {
        display: flex;
        gap: 16px;
    }

    .menu-card {
        width: 300px;
        height: 300px;
        border-radius: 12px;
        flex-shrink: 0;
    }

    .lihat-semua-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    /* Penawaran styles */
    .penawaran-wrapper {
        display: flex;
        gap: 16px;
    }

    .penawaran-fixed {
        width: 450px;
        height: 490px;
        border-radius: 12px;
        object-fit: cover;
        flex-shrink: 0;
    }

    .penawaran-scroll {
        overflow-x: auto;
        white-space: nowrap;
        flex-grow: 1;
    }

    .penawaran-scroll-container {
        display: flex;
        gap: 16px;
    }

    .penawaran-card {
        width: 860px;
        height: 485px;
        border-radius: 12px;
        flex-shrink: 0;
    }

    /* Download App styles */
    .download-app-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
    }

    .download-teks {
        font-size: 40px;
        line-height: 1.5;
        font-weight: bold;
    }

    .download-kiri-img {
        width: 250px;
        height: auto;
        margin-top: 16px;
    }

    .download-kanan-img {
        width: 329px;
        height: 420px;
        object-fit: contain;
        border-radius: 12px;
    }

    /* Start Order styles */
    .start-order-section {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 100px;
    }

    .start-order-text {
        font-size: 36px;
        font-weight: 400;
    }

    .start-order-button {
        background-color: #cd2f29;
        color: #ffffff;
        font-weight: bold;
        font-size: 20px;
        transition: 0.3s ease;
        border-radius: 10px;
        padding: 8px 16px;
        align-items: center;
        width: 200px;
        height: 50px;
    }

    .start-order-button:hover {
        background-color: #FEDA00;
        color: #cd2f29;
    }

    /* Lihat Menu styles */
    .lihat-menu {
        display: flex;
        gap: 0px;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    .menu-kiri,
    .outlet-kanan {
        width: 660px;
        height: 660px;
        flex-shrink: 0;
    }

    .gambar-hover-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .gambar-base,
    .gambar-hover-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.4s ease;
    }

    .gambar-base {
        z-index: 1;
        opacity: 1;
    }

    .gambar-hover-layer {
        z-index: 2;
        opacity: 0;
    }
    
    .gambar-hover-layer.visible {
        opacity: 1;
    }

    .teks-pojok-kanan {
        position: absolute;
        top: 16px;
        right: 16px;
        color: #feda00;
        font-weight: bold;
        opacity: 0;
        transform: translateX(40px);
        transition: all 0.3s ease;
        z-index: 3;
        text-align: right;
        line-height: 1.1;
    }

    .teks-pojok-kanan.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .lihat-text {
        font-size: 50px;
    }

    .menu-text {
        font-size: 115px;
        margin-top: -5px;
    }

    /* Outlet kanan styles */
    .outlet-kanan {
        position: relative;
        overflow: hidden;
    }

    .outlet-kanan-hover {
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
    }

    .outlet-home {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .overlay-outlet-kanan {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: rgba(254, 218, 0, 0.7);
        transition: height 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 24px;
        z-index: 2;
        overflow: hidden;
    }

    .overlay-outlet-kanan.show {
        height: 100%;
    }

    .outlet-teks {
        font-size: 80px;
        font-weight: bold;
        color: #ffffff;
        position: absolute;
        top: 50%;
        left: 24px;
        transform: translateY(-50%) translateX(-100%);
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 3;
        line-height: 90px;
    }

    .outlet-teks.show {
        transform: translateY(-50%) translateX(0%);
        opacity: 1;
    }

    /* Content gambar styles */
    .content-gambar {
        display: flex;
        gap: 0;
        flex-wrap: nowrap;
        justify-content: start;
        margin-bottom: 50px;
    }

    /* Cara Order styles */
    .cara-order-kiri {
        width: 440px;
        height: 440px;
        position: relative;
        flex-shrink: 0;
        overflow: hidden;
    }

    .teks-kiri-atas,
    .teks-kanan-bawah {
        position: absolute;
        font-weight: bold;
        color: #ffffff;
        opacity: 0;
        transition: all 0.4s ease;
        z-index: 3;
    }

    .teks-kiri-atas {
        top: -15px;
        left: 16px;
        font-size: 100px;
        transform: translateX(-30px);
    }

    .teks-kanan-bawah {
        bottom: -20px;
        right: 16px;
        font-size: 100px;
        transform: translateX(30px);
    }

    .teks-kiri-atas.visible,
    .teks-kanan-bawah.visible {
        opacity: 1;
        transform: translateX(0);
    }

    /* Kebab Maker styles */
    .kebab-maker {
        width: 480px;
        height: 480px;
        position: relative;
        overflow: hidden;
        flex-wrap: nowrap;
    }

    .zoom-hover-wrapper {
        overflow: hidden;
    }

    .zoom-base-img {
        width: 440px;
        height: 440px;
        object-fit: cover;
        transition: transform 0.4s ease, filter 0.4s ease;
    }

    .zoom-hover-wrapper:hover .zoom-base-img {
        transform: scale(1.2);
        filter: brightness(70%);
    }

    .zoom-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 2;
    }

    .zoom-overlay.show {
        opacity: 1;
    }

    .zoom-center-icon {
        width: 324px;
        height: 213px;
        object-fit: cover;
    }

    /* K Stars styles */
    .k-stars {
        width: 440px;
        height: 440px;
        position: relative;
        overflow: hidden;
        margin-left: -40px;
    }

    .k-stars-img {
        width: 440px;
        height: 440px;
        object-fit: cover;
        transition: transform 0.6s ease, filter 0.4s ease;
    }

    .k-stars-img.zoomed {
        object-fit: cover;
        transform: scale(1.3);
    }

    .k-stars-overlay-img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 303px;
        height: 92px;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .k-stars-img.zoomed.unzoomed {
        transform: scale(1.0);
        filter: brightness(70%);
    }

    /* Auto Scroll Gallery styles */
    .auto-scroll-gallery {
        position: relative;
        width: 1320px;
        height: 360px;
        overflow: hidden;
        margin-top: 50px;
        border-radius: 10px;
    }

    .gallery-track {
        display: flex;
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        will-change: transform;
    }

    .gallery-item {
        width: 361px;
        height: 360px;
        flex-shrink: 0;
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3s ease;
    }

    .auto-scroll-gallery:hover .gallery-item img {
        filter: brightness(50%);
    }

    /* Overlay tengah */
    .global-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 2;
    }

    .global-overlay.visible {
        opacity: 1;
    }

    .overlay-text {
        color: white;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 16px;
    }

    .social-icons {
        display: flex;
        gap: 80px;
    }

    .social-icons img {
        height: 100%;
    }

</style>
