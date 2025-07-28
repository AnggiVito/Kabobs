import { defineStore } from 'pinia';

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
        logoImage: '/images/KabobsFooter.png',
        
        navLinks: [
            { label: 'Tentang Kami', route: '/AboutUs' },
            { label: 'Lokasi', route: '/Lokasi' },
            { label: 'Karier', route: '/Karier' },
            { label: 'FAQ', route: '/FAQ' },
            { label: 'Hubungi Kami', route: '/ContactUs' },
        ],
        
        socialMediaLinks: [
            { name: 'Instagram', url: 'https://www.instagram.com/kabobs.id/' },
            { name: 'Tiktok', url: 'https://www.tiktok.com/@kabobs.id' },
            { name: 'Facebook', url: 'https://www.facebook.com/kabobs.id' },
        ],
        
        companyName: 'PT Tata Jago Utama',
        companyAddress: 'Jl. Ibrahim Adjie No.372a, Binong, Kec. Batununggal, Kota Bandung, Jawa Barat 40275',
        companyEmail: 'marketing@kabobs.id',
        companyPhone: '(62)811-1789-9000',
        
        signUpText: 'Sign Up untuk Order',
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
        setEmailInput(value: string | number | null) {
        this.emailInput = String(value || ''); 
        },
        signUpForOrder() {
            if (this.emailInput && this.emailInput.includes('@')) {
                console.log('Email untuk Sign Up:', this.emailInput);
                alert(`Terima kasih telah mendaftar: ${this.emailInput}`);
                this.emailInput = ''; 
            } else {
                alert('Mohon masukkan email yang valid.');
            }
        },
    },
});