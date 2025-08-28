import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';

interface OrderSettingsData {
    headerTitle: string | null;
    headerDesc1: string | null;
    headerDesc2: string | null;
    headerImage: string | null;
    sectionTitle: string | null;
    orderOptions: { name: string; url: string; image: string; image_file?: unknown }[] | null;
}

interface OrderOption {
    name: string;
    image: string;
    url: string;
    customClass?: string;
}

interface OrderState {
    headerTitle: string;
    headerDesc1: string;
    headerDesc2: string;
    headerImage: string;
    sectionTitle: string;
    orderOptions: OrderOption[];
    isLoading: boolean;
}

export const useOrderStore = defineStore('order', {
    state: (): OrderState => ({
        headerTitle: '',
        headerDesc1: '',
        headerDesc2: '',
        headerImage: '',
        sectionTitle: '',
        orderOptions: [],
        isLoading: false,
    }),

    getters: {
        getHeaderTitle: (state) => state.headerTitle,
        getHeaderDesc1: (state) => state.headerDesc1,
        getHeaderDesc2: (state) => state.headerDesc2,
        getHeaderImage: (state) => state.headerImage,
        getSectionTitle: (state) => state.sectionTitle,
        getOrderOptions: (state) => state.orderOptions,
    },

    actions: {
        async fetchOrderPageData() {
            if (this.isLoading) return;
            this.isLoading = true;
            try {
                const response = await baseApi.get<OrderSettingsData>('/order-settings');
                const data = response.data;
                
                this.headerTitle = data.headerTitle || '';
                this.headerDesc1 = data.headerDesc1 || '';
                this.headerDesc2 = data.headerDesc2 || '';
                this.headerImage = data.headerImage ? `http://localhost:3333/${data.headerImage}` : '';
                this.sectionTitle = data.sectionTitle || '';

                if (data.orderOptions && Array.isArray(data.orderOptions)) {
                    this.orderOptions = data.orderOptions.map(option => ({
                        name: option.name || '',
                        url: option.url || '#',
                        image: option.image ? `http://localhost:3333/${option.image}` : '',
                        customClass: option.name === 'Website Kabobs' ? 'order-icon-kabobs' : 'order-icon'
                    }));
                }

            } catch (error) {
                console.error("Gagal mengambil data halaman Order:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});