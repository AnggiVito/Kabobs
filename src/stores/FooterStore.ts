import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';

interface FooterData {
    logoImage: string | null;
    companyName: string | null;
    companyAddress: string | null;
    companyEmail: string | null;
    companyPhone: string | null;
    signUpText: string | null;
    navLinks: { label: string; route: string }[] | null;
    socialMediaLinks: { name: string; url: string }[] | null;
}

interface FooterState {
    logoImage: string;
    navLinks: { label: string; route: string }[];
    socialMediaLinks: { name: string; url: string }[];
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    signUpText: string;
    emailInput: string;
}

export const useFooterStore = defineStore('footer', {
    state: (): FooterState => ({
        logoImage: '',
        navLinks: [],
        socialMediaLinks: [],
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
        signUpText: '',
        emailInput: '',
    }),

    getters: {
        getLogoImage: (state) => state.logoImage,
        getNavLinks: (state) => state.navLinks,
        getSocialMediaLinks: (state) => state.socialMediaLinks,
        getCompanyName: (state) => state.companyName,
        getCompanyAddress: (state) => state.companyAddress,
        getCompanyEmail: (state) => state.companyEmail,
        getCompanyPhone: (state) => state.companyPhone,
        getSignUpText: (state) => state.signUpText,
        getEmailInput: (state) => state.emailInput,
    },

    actions: {
        async fetchFooterData() {
            try {
                const response = await baseApi.get<FooterData>('footer-settings');
                const data = response.data;

                this.logoImage = data.logoImage ? `${import.meta.env.VITE_IMAGE_URL}${data.logoImage}` : '';
                this.companyName = data.companyName || '';
                this.companyAddress = data.companyAddress || '';
                this.companyEmail = data.companyEmail || '';
                this.companyPhone = data.companyPhone || '';
                this.signUpText = data.signUpText || '';
                this.navLinks = data.navLinks || [];
                this.socialMediaLinks = data.socialMediaLinks || [];

            } catch (error) {
                console.error("Gagal mengambil data footer:", error);
            }
        },

        setEmailInput(value: string | number | null) {
            this.emailInput = String(value || '');
        },

        async signUpForOrder() {
            if (this.emailInput && this.emailInput.includes('@')) {
                try {
                    await baseApi.post('/subscriptions', { email: this.emailInput });
                    alert(`Terima kasih telah mendaftar: ${this.emailInput}`);
                    this.emailInput = '';
                } catch (error) {
                    console.error("Gagal mendaftar:", error);
                    alert('Gagal mendaftar, silakan coba lagi.');
                }
            } else {
                alert('Mohon masukkan email yang valid.');
            }
        },
    },
});
