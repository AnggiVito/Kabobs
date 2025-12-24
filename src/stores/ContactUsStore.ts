import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    category: string;
    message: string;
}

interface ContactUsState {
    pageTitle: string;
    pageSubtitle: string;
    contactInfoHeading: string;
    contactInfoDescription: string;
    phone: string;
    email: string;
    address: string;
    instagramUrl: string;
    facebookUrl: string;
    tiktokUrl: string;
    messageCategories: Array<{ label: string; value: string }>;
    form: ContactForm;
    isSubmitted: boolean;
    successImage: string;
    isLoading: boolean;
    error: string | null;
}

export const useContactUsStore = defineStore('contactUs', {
    state: (): ContactUsState => ({
        pageTitle: '',
        pageSubtitle: '',
        contactInfoHeading: '',
        contactInfoDescription: '',
        phone: '',
        email: '',
        address: '',
        instagramUrl: '',
        facebookUrl: '',
        tiktokUrl: '',
        messageCategories: [
            { label: 'Pertanyaan Umum', value: 'umum' },
            { label: 'Komplain', value: 'komplain' },
            { label: 'Masukan / Saran', value: 'saran' },
        ],
        form: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            category: '',
            message: '',
        },
        isSubmitted: false,
        successImage: '',
        isLoading: false,
        error: null,
    }),

    getters: {
        getPageTitle: (state) => state.pageTitle,
        getPageSubtitle: (state) => state.pageSubtitle,
        getContactInfoHeading: (state) => state.contactInfoHeading,
        getContactInfoDescription: (state) => state.contactInfoDescription,
        getPhone: (state) => state.phone,
        getemail: (state) => state.email,
        getAddress: (state) => state.address,
        getInstagramUrl: (state) => state.instagramUrl,
        getFacebookUrl: (state) => state.facebookUrl,
        getTiktokUrl: (state) => state.tiktokUrl,
        getMessageCategories: (state) => state.messageCategories,
        getForm: (state) => state.form,
        getIsSubmitted: (state) => state.isSubmitted,
        getSuccessImage: (state) => state.successImage,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },

    actions: {
        async fetchPageData() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.error = null;

            try {
                const response = await baseApi.get<ContactUsState>('/contact-settings');
                const data = response.data;

                this.pageTitle = data.pageTitle || '';
                this.pageSubtitle = data.pageSubtitle || '';
                this.contactInfoHeading = data.contactInfoHeading || '';
                this.contactInfoDescription = data.contactInfoDescription || '';
                this.phone = data.phone || '';
                this.email = data.email || '';
                this.address = data.address || '';
                this.successImage = data.successImage ? `${import.meta.env.VITE_IMAGE_URL}${data.successImage}` : '';

            } catch (err) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil data halaman: ${err.response?.data?.message || err.message}`;
                } else {
                    this.error = 'Gagal mengambil data halaman: Terjadi kesalahan tidak dikenal.';
                }
            } finally {
                this.isLoading = false;
            }
        },

        async fetchSocialMediaLinks() {
            if (this.isLoading) return;
            this.isLoading = true;
            this.error = null;

            try {
                const response = await baseApi.get('/footer-settings');
                const data = response.data;

                if (data.socialMediaLinks && Array.isArray(data.socialMediaLinks)) {
                    this.instagramUrl = data.socialMediaLinks.find((link: { name: string; url: string }) => link.name.toLowerCase() === 'instagram')?.url || '';
                    this.facebookUrl = data.socialMediaLinks.find((link: { name: string; url: string }) => link.name.toLowerCase() === 'facebook')?.url || '';
                    this.tiktokUrl = data.socialMediaLinks.find((link: { name: string; url: string }) => link.name.toLowerCase() === 'tiktok')?.url || '';
                }

            } catch (err) {
                if (err instanceof AxiosError) {
                    this.error = `Gagal mengambil data halaman: ${err.response?.data?.message || err.message}`;
                } else {
                    this.error = 'Gagal mengambil data halaman: Terjadi kesalahan tidak dikenal.';
                }
            } finally {
                this.isLoading = false;
            }
        },

        updateFormField<T extends keyof ContactForm>(field: T, value: ContactForm[T]) {
            this.form[field] = value;
        },

        initializeCategoryFromQuery(queryCategory: string | string[] | null | undefined) {
            if (
                typeof queryCategory === 'string' &&
                this.messageCategories.some(cat => cat.value === queryCategory)
            ) {
                this.form.category = queryCategory;
            } else if (Array.isArray(queryCategory) && queryCategory.length > 0 && typeof queryCategory[0] === 'string' && this.messageCategories.some(cat => cat.value === queryCategory[0])) {
                this.form.category = queryCategory[0];
            }
            else {
                this.form.category = '';
            }
        },

        resetForm() {
            this.form = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                category: '',
                message: '',
            };
            this.isSubmitted = false;
            this.error = null;
        },

        async submitForm() {
            this.isLoading = true;
            this.error = null;
            try {
                await baseApi.post('contacts', this.form);
                this.isSubmitted = true;
                return true;
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    this.error = err.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.';
                } else if (err instanceof Error) {
                    this.error = err.message;
                } else {
                    this.error = 'Terjadi kesalahan tidak dikenal saat mengirim pesan.';
                }
                this.isSubmitted = false;
                return false;
            } finally {
                this.isLoading = false;
            }
        },
    },
});
