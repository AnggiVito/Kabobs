<template>
    <q-img :src="homeStore.getHeroImage" />

    <q-page class="q-pa-xl">
        <h1 class="text-h5 text-weight-bold">{{ homeStore.getMenuFavoritTitle }}</h1>

        <div class="menu-scroll q-mt-lg">
            <div class="scroll-container">
                <q-img
                    v-for="(image, index) in homeStore.getMenuCards"
                    :key="index"
                    :src="image.fullImageUrl"
                    class="menu-card"
                />
            </div>
        </div>
        <div class="lihat-semua-wrapper q-mt-lg">
            <LihatSemuaButton
                :label="homeStore.getLihatSemuaMenuLabel"
                :route="homeStore.getLihatSemuaMenuRoute"
            />
        </div>

        <h1 class="text-h5 text-weight-bold">{{ homeStore.getPenawaranSpesialTitle }}</h1>
        <div class="penawaran-wrapper q-mt-lg">
            <q-img :src="homeStore.getPenawaranFixedImage" class="penawaran-fixed" />
            <div class="penawaran-scroll">
                <div class="penawaran-scroll-container">
                    <q-img
                        v-for="(image, index) in homeStore.getPenawaranCards"
                        :key="index"
                        :src="image.fullImageUrl"
                        class="penawaran-card"
                    />
                </div>
            </div>
        </div>
        <div class="lihat-semua-wrapper q-mt-lg">
            <LihatSemuaButton
                :label="homeStore.getLihatSemuaPromoLabel"
                :route="homeStore.getLihatSemuaPromoRoute"
            />
        </div>

        <DownloadAppLayout />
        <div class="start-order-section row items-center q-mt-xl">
            <div class="col">
                <div class="start-order-text text-h5 text-weight-bold">
                    {{ homeStore.getStartOrderText }}
                </div>
            </div>

            <div class="col-auto">
                <q-btn
                    :label="homeStore.getStartOrderButtonLabel"
                    class="start-order-button"
                    unelevated
                    no-caps
                    @click="goToOrderNow"
                />
            </div>
        </div>

        <div class="lihat-menu q-mt-xl">
            <div class="menu-kiri">
                <div class="gambar-hover-wrapper"
                    @mouseenter="homeStore.setMenuHover(true)"
                    @mouseleave="homeStore.setMenuHover(false)"
                    @click="goToMenuPage"
                >
                    <q-img :src="homeStore.getMenuKiriImageBase" class="gambar-base" />
                    <q-img
                        :src="homeStore.getMenuKiriImageHover"
                        class="gambar-hover-layer"
                        :class="{ visible: homeStore.getIsMenuHover }"
                    />
                    <div class="teks-pojok-kanan" :class="{ visible: homeStore.getIsMenuHover }">
                        <div class="lihat-text">{{ homeStore.getMenuKiriTextLihat }}</div>
                        <div class="menu-text">{{ homeStore.getMenuKiriTextMenu }}</div>
                    </div>
                </div>
            </div>

            <div class="outlet-kanan">
                <div
                class="outlet-kanan-hover"
                    @mouseenter="homeStore.setPromoHover(true)"
                    @mouseleave="homeStore.setPromoHover(false)"
                    @click="goToPromoPage"
                >
                    <q-img :src="homeStore.getOutletKananImage" class="outlet-home" />

                    <div class="overlay-outlet-kanan" :class="{ show: homeStore.getIsPromoHover }"></div>
                    <div class="outlet-teks" :class="{ show: homeStore.getIsPromoHover }">
                        {{ homeStore.getOutletKananTextTemukan }} <br />
                        {{ homeStore.getOutletKananTextKabobs }}
                        <div class="text-h4">{{ homeStore.getOutletKananTextCari }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-gambar">
            <div class="col-auto">
                <div class="cara-order-kiri">
                    <div
                        class="gambar-hover-wrapper"
                        @mouseenter="homeStore.setCaraOrderHover(true)"
                        @mouseleave="homeStore.setCaraOrderHover(false)"
                        @click="goToCaraOrderPage"
                    >
                        <q-img :src="homeStore.getCaraOrderImageBase" class="gambar-base" />
                        <q-img
                            :src="homeStore.getCaraOrderImageHover"
                            class="gambar-hover-layer"
                            :class="{ visible: homeStore.getIsCaraOrderHover }"
                        />
                        <div class="teks-kiri-atas" :class="{ visible: homeStore.getIsCaraOrderHover }">
                            {{ homeStore.getCaraOrderTextCara }}
                        </div>
                        <div class="teks-kanan-bawah" :class="{ visible: homeStore.getIsCaraOrderHover }">
                            {{ homeStore.getCaraOrderTextOrder }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="kebab-maker">
                    <div
                        class="zoom-hover-wrapper"
                        @mouseenter="homeStore.setKebabMakerHover(true)"
                        @mouseleave="homeStore.setKebabMakerHover(false)"
                    >
                        <q-img :src="homeStore.getKebabMakerImageBase" class="zoom-base-img" />
                        <div class="zoom-overlay" :class="{ show: homeStore.getIsKebabMakerHover }">
                            <q-img :src="homeStore.getKebabMakerImageOverlay" class="zoom-center-icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="k-stars" @mouseenter="startKStarsCycle" @mouseleave="doNothingOnKStarsLeave">
                    <q-img
                        v-for="(img, index) in homeStore.getKStarsImages"
                        :key="index"
                        :src="img.imageUrl"
                        class="k-stars-img"
                        :class="{
                            active: index === kStarsCurrentIndex,
                            zoomed:
                                index === homeStore.getKStarsImages.length - 1 &&
                                kStarsCurrentIndex === index &&
                                !kStarsOverlayVisible,
                            'final-state': index === homeStore.getKStarsImages.length - 5 && kStarsOverlayVisible,
                        }"
                    />
                    <img
                        v-if="
                            kStarsCurrentIndex === homeStore.getKStarsImages.length - 1 && kStarsOverlayVisible
                        "
                        :src="homeStore.getKStarsOverlayImage"
                        class="k-stars-overlay-img"
                    />
                </div>
            </div>
        </div>

        <div class="col">
            <div class="start-order-text text-h5 text-weight-bold">
                {{ homeStore.getSocialMediaTitle }}
            </div>
        </div>

        <div
            class="auto-scroll-gallery"
            @mouseenter="homeStore.setAutoScrollGalleryOverlayVisible(true)"
            @mouseleave="homeStore.setAutoScrollGalleryOverlayVisible(false)"
        >
            <div ref="scrollTrack" class="gallery-track">
                <div v-for="(image, i) in homeStore.getGalleryImages" :key="i" class="gallery-item">
                    <img :src="image.fullImageUrl" alt="" />
                </div>
                <div
                    v-for="(image, i) in homeStore.getGalleryImages"
                    :key="`dup-${i}`"
                    class="gallery-item"
                >
                    <img :src="image.fullImageUrl" alt="" />
                </div>
            </div>

            <div
                class="global-overlay"
                :class="{ visible: homeStore.getAutoScrollGalleryOverlayVisible }"
            >
                <div class="overlay-text">{{ homeStore.getSocialMediaOverlayText }}</div>
                <div class="social-icons">
                    <a
                        v-for="social in homeStore.getSocialMediaIcons"
                        :key="social.name"
                        :href="social.url"
                        target="_blank"
                        rel="noopener"
                    >
                        <img :src="social.icon" :alt="social.name" />
                    </a>
                </div>
            </div>
        </div>

        <div class="instagram-gallery">
            <div class="instagram-item" v-for="(post, i) in homeStore.getInstagramPosts" :key="i">
                <blockquote
                    class="instagram-media"
                    :data-instgrm-permalink="post"
                    data-instgrm-version="14"
                    style="background: #fff; border: none; padding: 0; margin: 0; width: 100%"
                ></blockquote>
            </div>
        </div>
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useRouter } from 'vue-router';
    import FooterLayout from 'layouts/FooterLayout.vue';
    import DownloadAppLayout from 'layouts/DownloadAppLayout.vue';
    import LihatSemuaButton from 'components/LihatSemuaButton.vue';
    import { useHomeStore } from 'src/stores/HomeStore';

    const router = useRouter();
    const homeStore = useHomeStore();
    const scrollTrack = ref<HTMLElement | null>(null);

    const kStarsCurrentIndex = ref(0);
    const kStarsOverlayVisible = ref(false);
    let kStarsIntervalId: number | null = null;
    let kStarsAnimationFinished = false;

    function startKStarsCycle() {
        if (kStarsAnimationFinished) {
            resetKStarsToInitialState();
        }

        if (kStarsIntervalId !== null) {
            return;
        }

        kStarsOverlayVisible.value = false;

        kStarsIntervalId = window.setInterval(() => {
            if (kStarsCurrentIndex.value < homeStore.getKStarsImages.length - 1) {
                kStarsCurrentIndex.value++;
            } else {
                kStarsOverlayVisible.value = true;
                kStarsAnimationFinished = true;
                clearInterval(kStarsIntervalId!);
                kStarsIntervalId = null;
            }
        }, 800);
    }

    function doNothingOnKStarsLeave() {}

    function resetKStarsToInitialState() {
        if (kStarsIntervalId !== null) {
            clearInterval(kStarsIntervalId);
        }
        kStarsIntervalId = null;
        kStarsCurrentIndex.value = 0;
        kStarsOverlayVisible.value = false;
        kStarsAnimationFinished = false;

        const firstKStarsImage = document.querySelector('.k-stars-img:nth-child(1)') as HTMLElement;
        if (firstKStarsImage) {
            firstKStarsImage.style.opacity = '1';
            firstKStarsImage.style.zIndex = '2';
            firstKStarsImage.style.transform = 'scale(1.0)';
            firstKStarsImage.style.filter = 'brightness(100%)';
        }
    }

    function setInitialKStarsImageOpacity() {
        if (
            !kStarsAnimationFinished &&
            kStarsIntervalId === null &&
            kStarsCurrentIndex.value === 0 &&
            !kStarsOverlayVisible.value
        ) {
            const firstKStarsImage = document.querySelector('.k-stars-img:nth-child(1)') as HTMLElement;
            if (firstKStarsImage) {
                firstKStarsImage.style.opacity = '1';
                firstKStarsImage.style.zIndex = '2';
                firstKStarsImage.style.transform = 'scale(1.0)';
                firstKStarsImage.style.filter = 'brightness(100%)';
            }
        }
    }

    function goToOrderNow() {
        void router.push(homeStore.getStartOrderButtonRoute);
    }

    function goToMenuPage() {
        void router.push(homeStore.getMenuKiriRoute);
    }

    function goToPromoPage() {
        void router.push(homeStore.getOutletKananRoute);
    }

    function goToCaraOrderPage() {
        void router.push(homeStore.getCaraOrderRoute);
    }

    onMounted(() => {
        void homeStore.fetchHomeData();
        setInitialKStarsImageOpacity();

        if (scrollTrack.value) {
            homeStore.startAutoScrollAnimation(scrollTrack.value);
        }

        const igScript = document.createElement('script');
        igScript.setAttribute('src', '//www.instagram.com/embed.js');
        igScript.setAttribute('async', '');
        document.body.appendChild(igScript);
    });

    onBeforeUnmount(() => {
        if (kStarsIntervalId !== null) {
            clearInterval(kStarsIntervalId);
        }
        homeStore.stopAutoScrollAnimation();
    });
</script>

<style scoped>
    .q-img {
        object-fit: cover;
    }

    .q-page {
        max-width: 1400px;
        margin: 0 auto;
    }

    h1 {
        font-size: 48px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
        font-weight: bold;
    }

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
        background-color: #feda00;
        color: #cd2f29;
    }

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
        cursor: pointer;
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

    .content-gambar {
        display: flex;
        gap: 0px;
        flex-wrap: nowrap;
        justify-content: start;
        margin-bottom: 50px;
    }

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
        transition:
        transform 0.4s ease,
        filter 0.4s ease;
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
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition:
        opacity 0.5s ease,
        transform 0.6s ease,
        filter 0.4s ease;
        z-index: 1;
    }

    .k-stars-img.active {
        opacity: 1;
        z-index: 2;
    }

    .k-stars-img.zoomed {
        transform: scale(1.3);
    }

    .k-stars-img.final-state {
        transform: scale(1);
        filter: brightness(70%);
        opacity: 1;
        z-index: 1;
    }

    .k-stars-overlay-img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 303px;
        height: 92px;
        transform: translate(-50%, -50%);
        z-index: 3;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .k-stars-overlay-img[src] {
        opacity: 1;
    }

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

    .instagram-gallery {
        display: flex;
        gap: 11px;
        flex-wrap: nowrap;
        width: 1320px;
        margin-top: 50px;
    }

    .instagram-item {
        max-width: 320px;
        flex: 0 0 auto;
    }

    .instagram-item blockquote {
        max-width: 100% !important;
        box-sizing: border-box;
    }

    @media (max-width: 991px) {
        .q-page {
            padding-left: 20px;
            padding-right: 20px;
        }

        .text-h5 {
            font-size: 24px;
            margin-top: -20px;
        }

        .scroll-container {
            gap: 10px;
        }

        .menu-card {
            width: 118px;
            height: 118px;
        }

        .penawaran-wrapper {
            gap: 10px;
        }

        .penawaran-fixed {
            width: 154px;
            height: 170px;
        }

        .penawaran-scroll-container {
            gap: 10px;
        }

        .penawaran-card {
            width: 290px;
            height: 170px;
        }

        .start-order-text {
            font-size: 14px;
        }

        .start-order-button {
            width: 120px;
            height: 40px;
            font-size: 12px;
        }

        .lihat-semua-wrapper {
            margin-bottom: -50px;
        }

        .menu-kiri,
        .outlet-kanan {
            width: 190px;
            height: 190px;
            flex-shrink: 0;
        }

        .lihat-text {
            font-size: 10px;
        }

        .menu-text {
            font-size: 30px;
        }

        .outlet-teks {
            font-size: 20px;
            line-height: 20px;
        }

        .text-h4 {
            font-size: 12px;
            line-height: 20px;
        }

        .content-gambar {
            max-width: 380px;
        }

        .cara-order-kiri {
            width: 127px;
            height: 127px;
        }

        .teks-kiri-atas {
            top: 0px;
            left: 5px;
            font-size: 20px;
            transform: translateX(-30px);
        }

        .teks-kanan-bawah {
            bottom: 0px;
            right: 5px;
            font-size: 20px;
            transform: translateX(30px);
        }

        .teks-kiri-atas.visible,
        .teks-kanan-bawah.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .kebab-maker {
            width: 166px;
            height: 127px;
        }

        .zoom-base-img {
            width: 127px;
            height: 127px;
        }

        .zoom-center-icon {
            width: 85px;
            height: 56px;
            margin-left: -35px;
        }

        .k-stars {
            width: 127px;
            height: 127px;
            margin-left: -40px;
        }

        .k-stars-img {
            width: 127px;
            height: 127px;
        }

        .k-stars-overlay-img {
            width: 100px;
            height: auto;
        }

        .auto-scroll-gallery {
            width: 601px;
            height: 149px;
            margin-left: calc(-28vw);
            margin-top: 10px;
        }

        .gallery-item {
            width: 150px;
            height: 150px;
        }

        .overlay-text {
            font-size: 30px;
        }

        .social-icons {
            gap: 30px;
        }

        .social-icons img {
            height: 50px;
        }

        .instagram-gallery {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            width: 100%;
            max-width: 380px;
            gap: 20px;
            height: auto;
            margin: 50px auto 0 auto;
        }

        .instagram-item {
            max-width: 100%;
            width: 100%;
            height: auto;
            flex: 0 0 auto;
        }
        .instagram-item blockquote {
            max-width: 100% !important;
            box-sizing: border-box;
        }
    }

    @media (max-width: 768px) {
        .text-h5 {
            font-size: 32px;
        }
        .text-body1 {
            font-size: 16px;
        }
        .search-filter-bar {
            flex-direction: column;
            align-items: center;
        }
        .filter-select,
        .filter-search-input {
            width: 90%;
            min-width: unset;
        }
        .join-kabobs-card {
            flex-direction: column;
            min-height: auto;
            margin-bottom: 40px;
        }
        .join-kabobs-card .q-card-section {
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .text-content-wrapper {
            padding: 20px;
            text-align: center;
            order: 1;
        }
        .text-content-wrapper h1 {
            font-size: 16px;
            text-align: center;
            line-height: 1.2;
        }
        .text-content-wrapper p {
            font-size: 14px;
            text-align: center;
        }
        .image-content-wrapper {
            order: 2;
            margin-top: 20px;
            width: 100%;
            padding: 0;
        }
        .join-image-card {
            max-height: 200px;
            width: 100%;
            object-fit: contain;
        }
    }

    @media (max-width: 480px) {
        .text-h5 {
            font-size: 28px;
        }
        .text-body1 {
            font-size: 14px;
        }
        .posisi-card .text-subtitle1 {
            font-size: 16px;
        }
        .posisi-card .text-caption {
            font-size: 12px;
        }
        .image-content-wrapper {
            order: 2;
            margin-top: 20px;
            width: 100%;
            padding: 0;
        }
    }
</style>
