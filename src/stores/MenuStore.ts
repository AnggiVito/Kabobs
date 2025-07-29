import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { baseApi } from 'boot/axios';

interface MenuItem {
    id?: number;
    name: string;
    image: string;
    category: string;
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
        categoryButtons: [
            'Semua Menu', 'Kebab', 'Drinks', 'Snacks',
            'Combobs', 'Fun Set', 'Fun Box', 'Combo Seru', 'Seasonal Menu'
        ],
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

            const uniqueCategoriesFromData = Array.from(new Set(itemsToFilter.map(item => item.category)));
            const allDisplayCategories = Array.from(new Set([...state.categoryButtons.filter(btn => btn !== 'Semua Menu'), ...uniqueCategoriesFromData]));
            
            if (state.selectedCategory === 'Semua Menu') {
                allDisplayCategories.sort().forEach(categoryName => {
                    filtered[categoryName] = itemsToFilter.filter(item => item.category === categoryName);
                });
                state.categoryButtons.filter(btn => btn !== 'Semua Menu' && !filtered[btn]).forEach(categoryName => {
                    filtered[categoryName] = [];
                });
            } else {
                if (allDisplayCategories.includes(state.selectedCategory)) {
                    filtered[state.selectedCategory] = itemsToFilter.filter(item => item.category === state.selectedCategory);
                } else {
                    filtered[state.selectedCategory] = [];
                }
            }
            return filtered;
        },

        getPageTitle: (state) => state.pageTitle,
        getCategoryButtons: (state) => state.categoryButtons,
        getSelectedCategory: (state) => state.selectedCategory,
    },

    actions: {
        setSelectedCategory(category: string) {
            this.selectedCategory = category;
        },

        initializeCategoryFromQuery(queryCategory: string | string[] | null | undefined) {
            let targetCategory: string | null = null;
            if (typeof queryCategory === 'string') {
                targetCategory = queryCategory;
            } else if (Array.isArray(queryCategory) && queryCategory.length > 0 && typeof queryCategory[0] === 'string') {
                targetCategory = queryCategory[0];
            }

            if (targetCategory && (this.categoryButtons.includes(targetCategory) || this.allMenusRaw.some(item => item.category === targetCategory))) {
                this.selectedCategory = targetCategory;
            } else {
                this.selectedCategory = 'Semua Menu';
            }
        },

        async fetchMenus() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await baseApi.get<MenuItem[]>('menus');
                this.allMenusRaw = response.data;
                this.displayMenus = this.allMenusRaw.map(item => ({
                    ...item,
                    fullImageUrl: `http://localhost:3333/${item.image}`
                }));
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil menu: ${err.response?.data?.message || err.message}`;
                } else if (err instanceof Error) {
                    this.error = `Gagal mengambil menu: ${err.message}`;
                } else {
                    this.error = 'Gagal mengambil menu: Terjadi kesalahan tidak diketahui.';
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
});