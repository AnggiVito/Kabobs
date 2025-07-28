import { defineStore } from 'pinia';

interface DownloadAppState {
    downloadTextLine1: string;
    downloadTextLine2: string;
    barcodeImage: string;
    appScreenshotImage: string;
}

export const useDownloadAppStore = defineStore('downloadApp', {
    state: (): DownloadAppState => ({
        downloadTextLine1: 'Makin Hemat & Praktis dengan Aplikasi',
        downloadTextLine2: 'Order Kabobs. Download Sekarang!',
        barcodeImage: '/images/Barcode.png',
        appScreenshotImage: '/images/Aplikasi.png',
    }),

    getters: {
        getDownloadTextLine1: (state) => state.downloadTextLine1,
        getDownloadTextLine2: (state) => state.downloadTextLine2,
        getBarcodeImage: (state) => state.barcodeImage,
        getAppScreenshotImage: (state) => state.appScreenshotImage,
        getFullDownloadText: (state) => `${state.downloadTextLine1}\n${state.downloadTextLine2}`,
    },
});