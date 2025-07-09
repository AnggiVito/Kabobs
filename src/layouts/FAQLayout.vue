<template>
  <div class="q-pa-xl">
    <div class="text-center q-mb-xl">
      <h2 class="text-h5 text-weight-bold">Frequently Asked Questions</h2>
      <p class="text-subtitle2">
        Temukan pertanyaan dan jawaban yang terkait dengan Kabobs, pembelian, dukungan, mitra.
      </p>
    </div>

    <q-expansion-item
      v-for="(faq, index) in faqs"
      :key="index"
      :label="faq.question"
      expand-separator
      class="q-mb-sm bg-grey-1 rounded-borders"
    >
      <div v-html="faq.answer" class="q-pa-sm text-body2"></div>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
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
a {
  color: #1976d2;
  text-decoration: underline;
}
</style>
