<template>
    <div>
        <div class="footer-divider"></div>

        <div class="footer-wrapper q-pa-lg">
            <div class="row q-col-gutter-lg justify-center">

                <div class="col-12 col-md-2">
                    <q-img :src="footerStore.getLogoImage" style="width: 140px" />
                </div>

                <div class="col-6 col-md-2">
                    <a v-for="(link, index) in footerStore.getNavLinks" :key="index" :href="link.route">
                        <div class="footer-link">{{ link.label }}</div>
                    </a>
                </div>

                <div class="col-6 col-md-2">
                    <a v-for="(social, index) in footerStore.getSocialMediaLinks" :key="index" :href="social.url" target="_blank" rel="noopener">
                        <div class="footer-link">{{ social.name }}</div>
                    </a>
                </div>

                <div class="col-12 col-md-4">
                    <div class="footer-text text-bold">{{ footerStore.getCompanyName }}</div>
                    <div class="footer-text q-mb-md">
                        {{ footerStore.getCompanyAddress }}
                    </div>

                    <div class="footer-text text-bold q-mb-sm">{{ footerStore.getSignUpText }}</div>
                    <div class="row items-center no-wrap q-gutter-sm">
                        <q-input
                            dense
                            borderless
                            placeholder="Masukkan email"
                            class="footer-input"
                            :model-value="footerStore.getEmailInput"
                            @update:model-value="footerStore.setEmailInput"
                        />
                        <q-btn
                            label="Sign Up"
                            color="yellow"
                            text-color="black"
                            rounded
                            no-caps
                            class="custom-signup-btn"
                            @click="footerStore.signUpForOrder"
                        />
                    </div>
                </div>
            </div>

            <div class="row q-mt-sm q-gutter-lg items-center justify-center">
                <div class="row items-center">
                    <q-icon name="email" size="24px" class="q-mr-sm" />
                    <span>{{ footerStore.getCompanyEmail }}</span>
                </div>
                <div class="row items-center">
                    <q-icon name="call" size="24px" class="q-ml-lg q-mr-sm" />
                    <span>{{ footerStore.getCompanyPhone }}</span>
                </div>
            </div>
        </div>
    </div>
    <FooterCopyright />
</template>

<script setup lang="ts">
    import { useFooterStore } from 'src/stores/FooterStore';
    import FooterCopyright from 'src/components/FooterCopyright.vue';
    import { onMounted } from 'vue';

    const footerStore = useFooterStore();
    onMounted(() => {
        void footerStore.fetchFooterData();
    });
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

    a {
        text-decoration: none;
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