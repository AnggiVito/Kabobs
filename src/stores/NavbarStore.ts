import { defineStore } from 'pinia';

interface NavbarState {
    drawer: boolean;
    menuDropdown: boolean;
    tentangDropdown: boolean;
    currentImage: number;
    menuImages: string[];
    intervalId: ReturnType<typeof setInterval> | null;
    menuDropdownItems: { label: string; category: string; route: string }[];
}

export const useNavbarStore = defineStore('navbar', {
    state: (): NavbarState => ({
        drawer: false,
        menuDropdown: false,
        tentangDropdown: false,
        currentImage: 0,
        menuImages: [
            '/images/Thumbnail1.png',
            '/images/Thumbnail2.png',
            '/images/Thumbnail3.png',
            '/images/Thumbnail4.png',
        ],
        intervalId: null,
        menuDropdownItems: [
            { label: 'Kebab', category: 'Kebab', route: '/Menu' },
            { label: 'Drinks', category: 'Drinks', route: '/Menu' },
            { label: 'Snacks', category: 'Snacks', route: '/Menu' },
            { label: 'Fun Box', category: 'Fun Box', route: '/Menu' },
            { label: 'Fun Set', category: 'Fun Set', route: '/Menu' },
            { label: 'Combobs', category: 'Combobs', route: '/Menu' },
            { label: 'Combo Seru', category: 'Combo Seru', route: '/Menu' },
            { label: 'Seasonal Menu', category: 'Seasonal Menu', route: '/Menu' },
        ],
    }),

    getters: {
        getDrawer: (state) => state.drawer,
        getMenuDropdown: (state) => state.menuDropdown,
        getTentangDropdown: (state) => state.tentangDropdown,
        getCurrentMenuImage: (state) => state.menuImages[state.currentImage],
        getMenuDropdownItems: (state) => state.menuDropdownItems,
    },

    actions: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        setMenuDropdown(value: boolean) {
            this.menuDropdown = value;
            if (value) {
                this.startImageCycle();
            } else {
                this.stopImageCycle();
            }
        },
        setTentangDropdown(value: boolean) {
            this.tentangDropdown = value;
        },
        startImageCycle() {
            if (!this.intervalId) {
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
        resetNavbarState() {
            this.drawer = false;
            this.menuDropdown = false;
            this.tentangDropdown = false;
            this.currentImage = 0;
            this.stopImageCycle();
        },
    },
});