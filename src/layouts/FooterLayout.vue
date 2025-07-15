<template>
    <div>
        <!-- Garis -->
        <div class="footer-divider"></div>

        <!-- Footer -->
        <div class="footer-wrapper q-pa-lg">
            <div class="row q-col-gutter-lg justify-center">

                <!-- Logo -->
                <div class="col-12 col-md-2">
                    <q-img src="/images/KabobsFooter.png" style="width: 140px" />
                </div>

                <!-- Navigasi -->
                <div class="col-6 col-md-2">
                    <div class="footer-link">Tentang Kami</div>
                    <div class="footer-link">Lokasi</div>
                    <div class="footer-link">Karier</div>
                    <div class="footer-link">FAQ</div>
                    <div class="footer-link">Hubungi Kami</div>
                </div>

                <!-- Sosial Media -->
                <div class="col-6 col-md-2">
                    <div class="footer-link">Instagram</div>
                    <div class="footer-link">Tiktok</div>
                    <div class="footer-link">Facebook</div>
                </div>

                <!-- Kolom 4: Alamat + Sign Up -->
                <div class="col-12 col-md-4">
                    <div class="footer-text text-bold">PT Tata Jago Utama</div>
                    <div class="footer-text q-mb-md">
                        Jl. Ibrahim Adjie No.372a, Binong, Kec. Batununggal, Kota Bandung, Jawa Barat 40275
                    </div>

                    <!-- Sign Up Form -->
                    <div class="footer-text text-bold q-mb-sm">Sign Up untuk Order</div>
                    <div class="row items-center no-wrap q-gutter-sm">
                        <q-input
                        dense
                        borderless
                        placeholder="Masukkan email"
                        class="footer-input"
                        v-model="email"
                        />
                        <q-btn
                            label="Sign Up"
                            color="yellow"
                            text-color="black"
                            rounded
                            no-caps
                            class="custom-signup-btn"
                        />
                    </div>
                </div>
            </div>

            <!-- Kontak -->
            <div class="row q-mt-sm q-gutter-lg items-center justify-center">
                <div class="row items-center">
                    <q-icon name="email" size="24px" class="q-mr-sm" />
                    <span>marketing@kabobs.id</span>
                </div>
                <div class="row items-center">
                    <q-icon name="call" size="24px" class="q-ml-lg q-mr-sm" />
                    <span>(62)811-1789-9000</span>
                </div>
            </div>
        </div>
    </div>
    <FooterCopyright />
</template>

<script setup lang="ts">
    import FooterCopyright from 'components/FooterCopyright.vue'
    import { ref } from 'vue'

    const email = ref('')
</script>

<style scoped>
    @media (max-width: 768px) {
        .footer-wrapper {
            margin: 0px 20px;
            padding: 24px 0;
            text-align: center;
        }

        .footer-link,
        .footer-text {
            text-align: center;
        }

        .footer-input {
            min-width: 100%;
            border-bottom: 1px solid #ccc;
        }

        .custom-signup-btn {
            width: 100%;
            margin-top: 12px;
        }

        .row.items-center.no-wrap.q-gutter-sm {
            flex-direction: column;
            align-items: stretch;
        }

        .row.q-mt-sm.q-gutter-lg.items-center.justify-center {
            flex-direction: column;
            gap: 12px;
            margin-top: 24px;
        }
    }

    @media (max-width: 768px) {
        .q-img {
            margin: 0 auto;
        }
    }


    .footer-divider {
        width: 100%;
        height: 20px;
        background-color: #FFD400;
    }

    .footer-wrapper {
        background-color: white;
        margin: 0px 60px;
    }

    .footer-link {
        font-size: 15px;
        margin-bottom: 20px;
        cursor: pointer;
        color: #000;
    }

    .footer-text {
        font-size: 17px;
        margin-bottom: 15px;
        color: #000;
    }

    .footer-input {
        min-width: 320px;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
    }

    .q-btn {
        min-width: 100px;
        font-size: 14px;
    }

    .custom-signup-btn {
        background-color: #FFD400 !important;
        color: #CC2E29 !important;
        font-weight: bold;
        font-size: 14px;
        padding: 8px 16px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        transition: 0.3s ease;
    }

    .custom-signup-btn:hover {
        background-color: #CC2E29 !important;
        color: white !important;
    }

</style>
