import { defineStore } from 'pinia';
import { ref } from 'vue';
import { baseApi } from 'boot/axios'

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export const useFaqStore = defineStore('faq', () => {
    const faqs = ref<FaqItem[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchFaqs = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const { data } = await baseApi.get('faqs')
            faqs.value = data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = 'Gagal mengambil FAQ';
            }
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        faqs,
        isLoading,
        error,
        fetchFaqs,
    };
});
