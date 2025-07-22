import { defineStore } from 'pinia';

interface Posisi {
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

        allPosisi: [
            {   
                nama: 'Crew Outlet Yogyakarta', 
                jenis: 'Crew', 
                lokasi: 'Kabobs Kaliurang', 
                keahlian: 'Pengalaman di bidang F&B 1 tahun' 
            },
            { 
                nama: 'Leader Produksi Makanan', 
                jenis: 'Leader', 
                lokasi: 'Kota Bandung', 
                keahlian: 'Pengalaman di bidang F&B 1 tahun, Target oriented, Leadership' 
            },
            { 
                nama: 'Crew Kota Semarang', 
                jenis: 'Crew', 
                lokasi: 'Paragon Mall', 
                keahlian: 'Pengalaman di bidang F&B 1 tahun' 
            },
            { 
                nama: 'Tax Staff', 
                jenis: 'Staff', 
                lokasi: 'Kota Bandung', 
                keahlian: 'Pengalaman sejenis 1-2 tahun Menguasai e-SPT, e-Bupot, E-Filling, e-Form' 
            },
            { 
                nama: 'Store Manager Jakarta', 
                jenis: 'Manajer', 
                lokasi: 'Jakarta Pusat', 
                keahlian: 'Pengalaman manajerial F&B 2 tahun, Leadership, Analitis' 
            },
            { 
                nama: 'Supervisor Outlet Bandung', 
                jenis: 'Supervisor', 
                lokasi: 'Kota Bandung', 
                keahlian: 'Pengalaman F&B 1 tahun, Leadership' 
            },
            { 
                nama: 'Marketing Executive', 
                jenis: 'Staff', 
                lokasi: 'Jakarta Selatan', 
                keahlian: 'Pengalaman marketing 1 tahun, Komunikatif, Kreatif' 
            },
        ],
        isLoading: false,
        error: null,
    }),

    getters: {
        filteredPosisi: (state) => {
            return state.allPosisi.filter(posisi => {
                const matchesLokasi = state.lokasiFilter === 'Semua Lokasi' || 
                    posisi.lokasi.toLowerCase().includes(state.lokasiFilter.toLowerCase());
                
                const matchesPosisi = state.posisiFilter === 'Semua Posisi' || 
                    posisi.jenis.toLowerCase().includes(state.posisiFilter.toLowerCase()) ||
                    posisi.nama.toLowerCase().includes(state.posisiFilter.toLowerCase());
                
                const keyword = state.keywordSearch.toLowerCase();
                const matchesKeyword = keyword === '' ||
                    posisi.nama.toLowerCase().includes(keyword) ||
                    posisi.lokasi.toLowerCase().includes(keyword) ||
                    posisi.keahlian.toLowerCase().includes(keyword) ||
                    posisi.jenis.toLowerCase().includes(keyword);

                return matchesLokasi && matchesPosisi && matchesKeyword;
            });
        },
    },

    actions: {
        setLokasiFilter(value: string) {
            this.lokasiFilter = value;
        },
        setPosisiFilter(value: string) {
            this.posisiFilter = value;
        },
        setKeywordSearch(value: string | number | null) {
            this.keywordSearch = typeof value === 'string' ? value : value?.toString() ?? '';
        }
        // fetchPosisiData: async function() {
        //     this.isLoading = true;
        //     this.error = null;
        //     try {
        //         // Contoh: Ganti dengan panggilan Axios atau Fetch API Anda yang sebenarnya
        //         // const response = await axios.get<Posisi[]>('https://your-api.com/careers');
        //         // this.allPosisi = response.data;
        //         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulasi loading
        //     } catch (err: unknown) {
        //         if (err instanceof Error) {
        //             this.error = `Gagal mengambil data posisi: ${err.message}`;
        //         } else {
        //             this.error = 'Gagal mengambil data posisi: Terjadi kesalahan tidak diketahui.';
        //         }
        //         console.error(err);
        //     } finally {
        //         this.isLoading = false;
        //     }
        // },
    },
});