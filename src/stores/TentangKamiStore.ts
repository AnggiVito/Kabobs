import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';

interface AboutUsData {
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
        storeCount: '',
        storeDescription: '',
        ratingTitle: '',
        ratingDescription: '',
        aboutUsTitle: '',
        aboutUsBody1: '',
        aboutUsBody2: '',
        imgUtamaSrc: '',
        imgSosmed1Src: '',
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

        async fetchAboutUsData() {
            try {
                const response = await baseApi.get<AboutUsData>('/tentang-kamis');
                const data = response.data;

                this.storeCount = data.storeCount;
                this.storeDescription = data.storeDescription;
                this.ratingTitle = data.ratingTitle;
                this.ratingDescription = data.ratingDescription;
                this.aboutUsTitle = data.aboutUsTitle;
                this.aboutUsBody1 = data.aboutUsBody1;
                this.aboutUsBody2 = data.aboutUsBody2;

                this.imgUtamaSrc = `${import.meta.env.VITE_IMAGE_URL}${data.imgUtamaSrc}`;
                this.imgSosmed1Src = `${import.meta.env.VITE_IMAGE_URL}${data.imgSosmed1Src}`;

            } catch (error) {
                console.error('Gagal mengambil data Tentang Kami:', error);
            }
        },
    },
});
