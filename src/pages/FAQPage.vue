<template>
    <div class="q-pa-lg q-px-md q-px-xl-md">
        <div class="text-center q-mb-xl">
            <h2 class="text-h5 text-weight-bold">Frequently Asked Questions</h2>
            <p class="text-subtitle2">
                Temukan pertanyaan dan jawaban yang terkait dengan Kabobs, pembelian, dukungan, mitra.
            </p>
        </div>
        <div class="container">
            <q-expansion-item
                v-for="(faq, index) in faqs"
                :key="index"
                :label="faq.question"
                expand-separator
                class="q-mb-md faq-box"
                expand-icon="add"
                expanded-icon="remove"
            >
                <!-- Garis pemisah di bawah pertanyaan -->
                <div class="divider-line"></div>

                <!-- Jawaban -->
                <div v-html="faq.answer" class="q-pa-sm text-body2 text-grey-8"></div>
            </q-expansion-item>
        </div>
    </div>
    <FooterLayout />
</template>


<script setup lang="ts">
    import FooterLayout from 'layouts/FooterLayout.vue'
    const faqs = [
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

    
</style>
