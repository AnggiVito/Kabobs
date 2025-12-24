import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';

interface NavbarItem {
    id: number;
    itemType: 'Thumb' | 'Link' | 'NavLink' | 'TentangLink' | 'Logo';
    title: string | null;
    linkUrl: string | null;
    imageUrl: string | null;
    sortOrder: number;
}

interface DropdownItem {
    label: string;
    category: string;
    route: string;
}

interface NavbarState {
    logoImage: string;
    drawer: boolean;
    menuDropdown: boolean;
    tentangDropdown: boolean;
    currentImage: number;
    menuImages: string[];
    intervalId: ReturnType<typeof setInterval> | null;
    menuDropdownItems: DropdownItem[];
    navLinks: DropdownItem[];
    tentangDropdownItems: DropdownItem[];
}

export const useNavbarStore = defineStore('navbar', {
    state: (): NavbarState => ({
        logoImage: '',
        drawer: false,
        menuDropdown: false,
        tentangDropdown: false,
        currentImage: 0,
        menuImages: [],
        intervalId: null,
        menuDropdownItems: [],
        navLinks: [],
        tentangDropdownItems: [],
    }),

    getters: {
        getLogoImage: (state) => state.logoImage,
        getDrawer: (state) => state.drawer,
        getMenuDropdown: (state) => state.menuDropdown,
        getTentangDropdown: (state) => state.tentangDropdown,
        getCurrentMenuImage: (state) => state.menuImages[state.currentImage] || '',
        getMenuDropdownItems: (state) => state.menuDropdownItems,
        getNavLinks: (state) => state.navLinks,
        getTentangDropdownItems: (state) => state.tentangDropdownItems,
    },

    actions: {
        async fetchNavbarData() {
            try {
                const logoResponse = await baseApi.get<NavbarItem[]>('/navbar-items', { params: { item_type: 'Logo' } });
                const thumbsPromise = baseApi.get<NavbarItem[]>('/navbar-items', { params: { item_type: 'Thumb' } });
                const linksPromise = baseApi.get<NavbarItem[]>('/navbar-items', { params: { item_type: 'Link' } });
                const navLinksPromise = baseApi.get<NavbarItem[]>('/navbar-items', { params: { item_type: 'NavLink' } });
                const tentangLinksPromise = baseApi.get<NavbarItem[]>('/navbar-items', { params: { item_type: 'TentangLink' } });

                const [thumbResponse, linkResponse, navLinkResponse, tentangLinkResponse] = await Promise.all([
                    thumbsPromise, linksPromise, navLinksPromise, tentangLinksPromise
                ]);

                this.logoImage = logoResponse.data.length > 0 && logoResponse.data[0]?.imageUrl
                    ? `${import.meta.env.VITE_IMAGE_URL}${logoResponse.data[0].imageUrl}`
                    : '';

                this.menuImages = thumbResponse.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(item => `${import.meta.env.VITE_IMAGE_URL}${item.imageUrl}`);

                this.menuDropdownItems = linkResponse.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(item => ({ label: item.title || '', category: item.title || '', route: item.linkUrl || '/' }));

                this.navLinks = navLinkResponse.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(item => ({ label: item.title || '', category: '', route: item.linkUrl || '/' }));

                this.tentangDropdownItems = tentangLinkResponse.data
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(item => ({ label: item.title || '', category: '', route: item.linkUrl || '/' }));

            } catch (error) {
                console.error('Gagal mengambil data navbar:', error);
            }
        },

        toggleDrawer() { this.drawer = !this.drawer; },
        setMenuDropdown(value: boolean) {
            this.menuDropdown = value;
            if (value) { this.startImageCycle(); } else { this.stopImageCycle(); }
        },
        setTentangDropdown(value: boolean) { this.tentangDropdown = value; },
        startImageCycle() {
            if (!this.intervalId && this.menuImages.length > 0) {
                this.intervalId = setInterval(() => {
                    this.currentImage = (this.currentImage + 1) % this.menuImages.length;
                }, 1500);
            }
        },
        stopImageCycle() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },
    },
});
