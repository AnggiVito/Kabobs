import { defineStore } from 'pinia';
import { ref } from 'vue';

interface FaqItem {
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
            await new Promise(resolve => setTimeout(resolve, 500));

            faqs.value = [
                {
                    question: 'Di mana saya dapat menemukan gerai KABOBS?',
                    answer: 'Untuk mengetahui lokasi outlet kami, bisa dilihat pada link berikut <a href="https://kabobs.id/location" target="_blank">https://kabobs.id/location</a>'
                },
                {
                    question: 'Promo apa saja yang terdapat di KABOBS saat ini?',
                    answer: 'Silakan cek halaman Promo kami untuk informasi terbaru.'
                },
                {
                    question: 'Jenis pembayaran apa saja yang diterima di outlet KABOBS?',
                    answer: 'Kami menerima pembayaran tunai, e-wallet, dan kartu debit.'
                },
                {
                    question: 'Apakah di outlet KABOBS bisa menerima sistem pembayaran dengan credit card?',
                    answer: 'Ya, beberapa outlet mendukung pembayaran dengan credit card.'
                },
                {
                    question: 'Saya akan melakukan pemesanan dalam jumlah banyak. Kemana saya dapat melakukan pemesanan?',
                    answer: 'Silakan hubungi layanan pemesanan kami di email/WA resmi.'
                },
                {
                    question: 'Saldo saya terpotong dua kali saat pembayaran di outlet KABOBS. Kemana saya bisa mengajukan komplain?',
                    answer: 'Anda bisa menghubungi layanan customer care kami melalui email atau WhatsApp.'
                },
                {
                    question: 'Apakah KABOBS menerima sistem franchise min?',
                    answer: 'Untuk saat ini belum tersedia sistem franchise.'
                },
                {
                    question: 'Halo min! Bagaimana cara melamar pekerjaan ke KABOBS?',
                    answer: 'Silakan buka halaman karier kami atau kirimkan CV ke email resmi kami.'
                }
            ];

        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = `Gagal mengambil FAQ: ${err.message}`;
            } else {
                error.value = 'Gagal mengambil FAQ: Terjadi kesalahan yang tidak diketahui.';
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