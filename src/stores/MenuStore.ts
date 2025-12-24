import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { baseApi } from 'boot/axios';

interface MenuItem {
    id?: number;
    name: string;
    image: string;
    category: string;
}

interface NavbarLinkItem {
    title: string | null;
}

interface DisplayMenuItem extends MenuItem {
    fullImageUrl: string;
}

interface MenuState {
    pageTitle: string;
    categoryButtons: string[];
    selectedCategory: string;
    allMenusRaw: MenuItem[];
    displayMenus: DisplayMenuItem[];
    isLoading: boolean;
    error: string | null;
}

export const useMenuStore = defineStore('menu', {
    state: (): MenuState => ({
        pageTitle: 'Menu Kabobs',
        categoryButtons: [],
        selectedCategory: 'Semua Menu',
        allMenusRaw: [],
        displayMenus: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        getFilteredMenuGroups: (state) => {
            const filtered: { [key: string]: DisplayMenuItem[] } = {};

            const itemsToFilter = state.displayMenus;

            const displayCategories = state.selectedCategory === 'Semua Menu'
                ? state.categoryButtons
                : [state.selectedCategory];

            displayCategories.forEach(categoryName => {
                filtered[categoryName] = itemsToFilter.filter(item => item.category === categoryName);
            });

            return filtered;
        },

        getPageTitle: (state) => state.pageTitle,
        getCategoryButtons: (state) => ['Semua Menu', ...state.categoryButtons],
        getSelectedCategory: (state) => state.selectedCategory,
    },

    actions: {
        setSelectedCategory(category: string) {
            this.selectedCategory = category;
        },

        initializeCategoryFromQuery(queryCategory: string | string[] | null | undefined) {
            const category = Array.isArray(queryCategory) ? queryCategory[0] : queryCategory;

            if (category && (this.categoryButtons.includes(category) || category === 'Semua Menu')) {
                this.selectedCategory = category;
            } else {
                this.selectedCategory = 'Semua Menu';
            }
        },

        async fetchMenus() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.error = null;
            try {
                const linkResponse = await baseApi.get<NavbarLinkItem[]>('/navbar-items', {
                    params: { item_type: 'Link' }
                });
                this.categoryButtons = linkResponse.data.map(item => item.title || '');

                const menuResponse = await baseApi.get<MenuItem[]>('menus');
                this.allMenusRaw = menuResponse.data;

                this.displayMenus = this.allMenusRaw.map(item => ({
                    ...item,
                    fullImageUrl: `${import.meta.env.VITE_IMAGE_URL}${item.image}`
                }));

            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil menu: ${err.response?.data?.message || err.message}`;
                } else {
                    this.error = 'Gagal mengambil menu: Terjadi kesalahan tidak diketahui.';
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
});
