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
    phoneNumber: string;
    emailAddress: string;
    addressLine: string;
    instagramUrl: string;
    facebookUrl: string;
    tiktokUrl: string;
    messageCategories: Array<{ label: string; value: string }>;
    form: ContactForm;
    isSubmitted: boolean;
    successImageSrc: string;
    isLoading: boolean;
    error: string | null;
}

export const useContactUsStore = defineStore('contactUs', {
    state: (): ContactUsState => ({
        pageTitle: 'Hubungi Kami',
        pageSubtitle: 'Punya pertanyaan atau komentar? Tulis saja pesan kepada kami!',
        contactInfoHeading: 'Informasi Kontak',
        contactInfoDescription: 'Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut, kerja sama bisnis, atau pertanyaan seputar produk dan layanan kami. Tim kami siap membantu Anda dengan sepenuh hati.',
        phoneNumber: '(62)811-1789-9000',
        emailAddress: 'marketing@kabobs.id',
        addressLine: 'Jl. Ibrahim Adjie No.372a, Binong, Kec. Batununggal, Kota Bandung, Jawa Barat 40275',
        instagramUrl: 'https://instagram.com/kabobs.id',
        facebookUrl: 'https://facebook.com/kabobs.id',
        tiktokUrl: 'https://tiktok.com/@kabobs.id',
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
        successImageSrc: '/images/Success.png',
        isLoading: false,
        error: null,
    }),

    getters: {
        getPageTitle: (state) => state.pageTitle,
        getPageSubtitle: (state) => state.pageSubtitle,
        getContactInfoHeading: (state) => state.contactInfoHeading,
        getContactInfoDescription: (state) => state.contactInfoDescription,
        getPhoneNumber: (state) => state.phoneNumber,
        getEmailAddress: (state) => state.emailAddress,
        getAddressLine: (state) => state.addressLine,
        getInstagramUrl: (state) => state.instagramUrl,
        getFacebookUrl: (state) => state.facebookUrl,
        getTiktokUrl: (state) => state.tiktokUrl,
        getMessageCategories: (state) => state.messageCategories,
        getForm: (state) => state.form,
        getIsSubmitted: (state) => state.isSubmitted,
        getSuccessImageSrc: (state) => state.successImageSrc,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },

    actions: {
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