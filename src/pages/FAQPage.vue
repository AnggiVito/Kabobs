<template>
    <div class="q-pa-lg q-px-md q-px-xl-md">
        <div class="text-center q-mb-xl">
            <h2 class="text-h5 text-weight-bold">Frequently Asked Questions</h2>
            <p class="text-subtitle2">
                Temukan pertanyaan dan jawaban yang terkait dengan Kabobs, pembelian, dukungan, mitra.
            </p>
        </div>
        <div class="container">
            <div v-if="faqStore.isLoading" class="text-center q-pa-lg">
                <q-spinner-hourglass color="primary" size="3em" />
                <div class="q-mt-md">Memuat FAQ...</div>
            </div>

            <div v-else-if="faqStore.error" class="text-center q-pa-lg text-negative">
                Error: {{ faqStore.error }}
            </div>

            <div v-else-if="faqStore.faqs.length === 0" class="text-center q-pa-lg">
                Tidak ada FAQ yang tersedia saat ini.
            </div>

            <q-expansion-item
                v-for="(faq, index) in faqStore.faqs"
                :key="index"
                :label="faq.question"
                expand-separator
                class="q-mb-md faq-box"
                expand-icon="add"
                expanded-icon="remove"
            >
                <div class="divider-line"></div>
                <div v-html="faq.answer" class="q-pa-sm text-body2 text-grey-8"></div>
            </q-expansion-item>
        </div>
    </div>
    <FooterLayout />
</template>


<script setup lang="ts">
    import { onMounted } from 'vue';
    import FooterLayout from 'layouts/FooterLayout.vue';
    import { useFaqStore } from 'src/stores/FAQStore';
    import { QSpinnerHourglass } from 'quasar';

    const faqStore = useFaqStore();

    onMounted(() => {
        void faqStore.fetchFaqs();
    });
</script>

<style scoped>
    h2 {
        color: #000000;
        font-weight: bold;
        font-size: 40px;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-box {
        border: 3px solid #8d8d8d;
        border-radius: 12px;
        box-shadow: 0 10px 4px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        background-color: #ffffff;
        padding: 4px 12px;
        width: 800px;
    }

    .faq-box:hover {
        border-color: #000000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        background-color: #ffffff;
    }

    .faq-question {
        font-weight: 600;
        font-size: 16px;
        color: #333;
        padding: 12px;
    }

    .divider-line {
        height: 1px;
        background-color: #8d8d8d;
        margin: 0 0 8px 0;
    }

    @media (max-width: 768px) {
        h2 {
            color: #000000;
            font-weight: bold;
            font-size: 20px;
        }

        .faq-box {
            width: 100%;
        }
    }
</style>