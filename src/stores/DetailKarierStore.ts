import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

interface PosisiDetail {
    id: number;
    namaposisi: string;
    jenis: string;
    lokasi: string;
    deskripsi: string;
    requirement: string;
    keahlian: string;
}

interface DetailKarierState {
    selectedKarierDetail: PosisiDetail | null;
    isLoading: boolean;
    error: string | null;
}

export const useDetailKarierStore = defineStore('detailKarier', {
    state: (): DetailKarierState => ({
        selectedKarierDetail: null,
        isLoading: false,
        error: null,
    }),

    getters: {
        getKarierDetail: (state) => state.selectedKarierDetail,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },

    actions: {
        async fetchKarierDetail(id: number) {
            this.isLoading = true;
            this.error = null;
            this.selectedKarierDetail = null;

            try {
                const response = await baseApi.get<PosisiDetail>(`kariers/${id}`);
                this.selectedKarierDetail = response.data;
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil detail karier: ${err.response?.data?.message || err.message}`;
                } else if (err instanceof Error) {
                    this.error = `Gagal mengambil detail karier: ${err.message}`;
                } else {
                    this.error = 'Gagal mengambil detail karier: Terjadi kesalahan tidak diketahui.';
                }
                console.error('Error fetching career detail in DetailKarierStore:', err);
            } finally {
                this.isLoading = false;
            }
        },

        clearKarierDetail() {
            this.selectedKarierDetail = null;
            this.error = null;
        }
    },
});