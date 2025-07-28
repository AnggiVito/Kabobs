import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

interface Posisi {
    id?: number;
    nama: string;
    jenis: string;
    lokasi: string;
    keahlian: string;
}

interface KarierState {
    lokasiFilter: string;
    posisiFilter: string;
    keywordSearch: string;
    
    lokasiOptions: string[];
    posisiOptions: string[];
    
    allPosisi: Posisi[];
    isLoading: boolean;
    error: string | null;
}

export const useKarierStore = defineStore('karier', {
    state: (): KarierState => ({
        lokasiFilter: 'Semua Lokasi',
        posisiFilter: 'Semua Posisi',
        keywordSearch: '',

        lokasiOptions: [
            'Semua Lokasi', 
            'Kabobs Kaliurang', 
            'Kota Bandung', 
            'Jakarta Pusat', 
            'Kota Semarang', 
            'Jakarta Selatan'
        ],
        
        posisiOptions: [
            'Semua Posisi', 
            'Crew', 
            'Staff', 
            'Leader', 
            'Supervisor', 
            'Manajer', 
            'Marketing Executive', 
            'Tax'
        ],

        allPosisi: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        filteredPosisi: (state) => {
            return state.allPosisi;
        },
    },

    actions: {
        async setLokasiFilter(value: string) {
            this.lokasiFilter = value;
            await this.fetchPosisiData(); 
        },
        async setPosisiFilter(value: string) {
            this.posisiFilter = value;
            await this.fetchPosisiData(); 
        },
        async setKeywordSearch(value: string | number | null) {
            this.keywordSearch = typeof value === 'string' ? value : value?.toString() ?? '';
            await this.fetchPosisiData(); 
        },
        
        async fetchPosisiData() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await baseApi.get('kariers', {
                    params: {
                        lokasi: this.lokasiFilter === 'Semua Lokasi' ? undefined : this.lokasiFilter,
                        posisi: this.posisiFilter === 'Semua Posisi' ? undefined : this.posisiFilter,
                        keyword: this.keywordSearch || undefined,
                    }
                });
                this.allPosisi = response.data as Posisi[];
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil data posisi: ${err.response?.data?.message || err.message}`;
                } else if (err instanceof Error) {
                    this.error = `Gagal mengambil data posisi: ${err.message}`;
                } else {
                    this.error = 'Gagal mengambil data posisi: Terjadi kesalahan tidak diketahui.';
                }
                console.error('Error fetching career data:', err);
            } finally {
                this.isLoading = false;
            }
        },
    },
});