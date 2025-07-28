import { defineStore } from 'pinia';

interface AboutUsState {
    storeCount: string;
    storeDescription: string;
    ratingTitle: string;
    ratingDescription: string;
    aboutUsTitle: string;
    aboutUsBody1: string;
    aboutUsBody2: string;
    imgUtamaSrc: string;
    imgSosmed1Src: string;
}

export const useAboutUsStore = defineStore('aboutUs', {
    state: (): AboutUsState => ({
        storeCount: '100+',
        storeDescription: 'Saat ini mengoperasikan 100 lebih toko dan akan bertambah lagi di masa mendatang.',
        ratingTitle: 'Rating Tertinggi!',
        ratingDescription: 'Rating tertinggi berkat kualitas rasa dan layanan yang konsisten.',
        aboutUsTitle: 'TENTANG KAMI',
        aboutUsBody1: '<strong>KABOBS - Premium Kebab</strong>, merupakan perusahaan makanan yang berdiri di Bandung. <strong>\'Premium\'</strong> bukan hanya sekedar nama, karena perusahaan ini bertujuan untuk memberikan yang terbaik, baik dari segi rasa maupun pelayanan.',
        aboutUsBody2: 'Sejak toko pertamanya diluncurkan pada tahun 2016, <strong>KABOBS</strong> telah berevolusi dan tumbuh, memperluas tokonya ke banyak lokasi strategis, dan menyediakan kebab segar bagi pelanggan yang kemudian menjadi kebab favorit mereka di Bandung.',
        imgUtamaSrc: '/images/Sosmed2.png',
        imgSosmed1Src: '/images/Sosmed1.png',
    }),

    getters: {
        getStoreCount: (state) => state.storeCount,
        getStoreDescription: (state) => state.storeDescription,
        getRatingTitle: (state) => state.ratingTitle,
        getRatingDescription: (state) => state.ratingDescription,
        getAboutUsTitle: (state) => state.aboutUsTitle,
        getAboutUsBody1: (state) => state.aboutUsBody1,
        getAboutUsBody2: (state) => state.aboutUsBody2,
        getImgUtamaSrc: (state) => state.imgUtamaSrc,
        getImgSosmed1Src: (state) => state.imgSosmed1Src,
    },

    actions: {
    },
});