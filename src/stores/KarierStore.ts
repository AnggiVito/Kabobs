import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

interface Posisi {
    id: number;
    posting: string;
    namaposisi: string;
    kota: string;
    provinsi: string;
    workplace: string;
    worktype: string;
    paytype: string;
    payrangeFrom: number | null;
    payrangeTo: number | null;
    deskripsi: string;
    jobSummary: string;
    jobRequirement: string;
    dbCreatedAt: string;
    dbUpdatedAt: string;
}

interface KarierSettings {
    headerTitle: string | null;
    headerDesc1: string | null;
    headerDesc2: string | null;
    headerImage: string | null;
    sectionTitle: string | null;
}

interface KarierState {
    headerTitle: string;
    headerDesc1: string;
    headerDesc2: string;
    headerImage: string;
    sectionTitle: string;

    lokasiFilter: string;
    tipeFilter: string;
    keywordSearch: string;

    lokasiOptions: string[];
    tipeOptions: string[];

    allPosisi: Posisi[];
    isLoading: boolean;
    error: string | null;
    selectedKarierDetail: Posisi | null;
    isDetailLoading: boolean;
    detailError: string | null;
}

export const useKarierStore = defineStore('karier', {
    state: (): KarierState => ({
        headerTitle: '',
        headerDesc1: '',
        headerDesc2: '',
        headerImage: '',
        sectionTitle: '',
        lokasiFilter: 'Semua Lokasi',
        tipeFilter: 'Semua Tipe',
        keywordSearch: '',

        lokasiOptions: ['Semua Lokasi'],
        tipeOptions: ['Semua Tipe'],

        allPosisi: [],
        isLoading: false,
        error: null,
        selectedKarierDetail: null,
        isDetailLoading: false,
        detailError: null,
    }),

    getters: {
        getHeaderTitle: (state) => state.headerTitle,
        getHeaderDesc1: (state) => state.headerDesc1,
        getHeaderDesc2: (state) => state.headerDesc2,
        getHeaderImage: (state) => state.headerImage,
        getSectionTitle: (state) => state.sectionTitle,
        filteredPosisi: (state) => state.allPosisi,
    },

    actions: {
        async setLokasiFilter(value: string) {
            this.lokasiFilter = value;
            await this.fetchPosisiData();
        },
        async setTipeFilter(value: string) {
            this.tipeFilter = value;
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
                const settingsResponse = await baseApi.get<KarierSettings>('karier-settings');
                const settings = settingsResponse.data;

                this.headerTitle = settings.headerTitle || '';
                this.headerDesc1 = settings.headerDesc1 || '';
                this.headerDesc2 = settings.headerDesc2 || '';
                this.headerImage = settings.headerImage ? `${import.meta.env.VITE_IMAGE_URL}${settings.headerImage}` : '';
                this.sectionTitle = settings.sectionTitle || '';

                const response = await baseApi.get<Posisi[]>('kariers', {
                    params: {
                        lokasi: this.lokasiFilter === 'Semua Lokasi' ? undefined : this.lokasiFilter,
                        posisi: this.tipeFilter === 'Semua Tipe' ? undefined : this.tipeFilter,
                        keyword: this.keywordSearch || undefined,
                    }
                });
                this.allPosisi = response.data;

                const uniqueLokasi = Array.from(new Set(this.allPosisi.map(p => p.kota)));
                const uniqueTipe = Array.from(new Set(this.allPosisi.map(p => p.worktype)));

                this.lokasiOptions = ['Semua Lokasi', ...uniqueLokasi.sort()];
                this.tipeOptions = ['Semua Tipe', ...uniqueTipe.sort()];

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

        async fetchKarierDetail(id: number) {
            this.isDetailLoading = true;
            this.detailError = null;
            this.selectedKarierDetail = null;

            try {
                const response = await baseApi.get<Posisi>(`kariers/${id}`);
                this.selectedKarierDetail = response.data;
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.detailError = `Gagal mengambil detail karier: ${err.response?.data?.message || err.message}`;
                } else if (err instanceof Error) {
                    this.detailError = `Gagal mengambil detail karier: ${err.message}`;
                } else {
                    this.detailError = 'Gagal mengambil detail karier: Terjadi kesalahan tidak diketahui.';
                }
                console.error('Error fetching career detail:', err);
            } finally {
                this.isDetailLoading = false;
            }
        },
    },
});
