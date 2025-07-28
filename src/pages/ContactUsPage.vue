<template>
    <h1 class="text-h3 text-center q-mb-md">{{ contactUsStore.getPageTitle }}</h1>
    <p class="text-center q-mb-xs">
        {{ contactUsStore.getPageSubtitle }}
    </p>
    <div class="q-pa-lg bg-grey-1">
        <q-card class="main-card row q-pa-md">
            <div class="col-12 col-md-5 q-pa-md">
                <div class="yellow-card">
                    <div>
                        <q-img src="/images/LogoKabobs.png" class="logo" />
                        <h5 class="text-h6">{{ contactUsStore.getContactInfoHeading }}</h5>
                        <p>
                            {{ contactUsStore.getContactInfoDescription }}
                        </p>

                        <div class="info-section">
                            <div class="info-item">
                                <q-icon name="call" />
                                <span>{{ contactUsStore.getPhoneNumber }}</span>
                            </div>
                            <div class="info-item">
                                <q-icon name="email" />
                                <span>{{ contactUsStore.getEmailAddress }}</span>
                            </div>
                            <div class="info-item">
                                <q-icon name="place" />
                                <span>
                                    {{ contactUsStore.getAddressLine }}<br />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="social-icons row q-gutter-sm">
                        <a :href="contactUsStore.getInstagramUrl" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-instagram" />
                        </a>
                        <a :href="contactUsStore.getFacebookUrl" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-facebook-f" />
                        </a>
                        <a :href="contactUsStore.getTiktokUrl" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-tiktok" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-7 q-pa-md form-right">
                <transition name="fade-slide" mode="out-in">
                    <div v-if="!contactUsStore.getIsSubmitted" class="q-gutter-md">
                        <q-form @submit="handleFormSubmission" class="q-gutter-md">
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <div class="input-label">Nama Depan</div>
                                    <q-input
                                        borderless
                                        :model-value="contactUsStore.getForm.firstName"
                                        @update:model-value="(val) => contactUsStore.updateFormField('firstName', val as string)"
                                        placeholder="Masukkan nama depan"
                                        class="underlined-input"
                                        :rules="[val => !!val && val.length > 0 || 'Nama depan wajib diisi']"
                                        lazy-rules
                                    />
                                    <div class="divider-line"></div>
                                </div>

                                <div class="col-12">
                                    <div class="input-label">Nama Belakang</div>
                                    <q-input
                                        borderless
                                        :model-value="contactUsStore.getForm.lastName"
                                        @update:model-value="(val) => contactUsStore.updateFormField('lastName', val as string)"
                                        placeholder="Masukkan nama belakang"
                                        class="underlined-input"
                                        :rules="[val => !!val && val.length > 0 || 'Nama belakang wajib diisi']"
                                        lazy-rules
                                    />
                                    <div class="divider-line"></div>
                                </div>

                                <div class="col-12">
                                    <div class="input-label">Email</div>
                                    <q-input
                                        borderless
                                        :model-value="contactUsStore.getForm.email"
                                        @update:model-value="(val) => contactUsStore.updateFormField('email', val as string)"
                                        placeholder="Masukkan email"
                                        class="underlined-input"
                                        type="email"
                                        :rules="[val => !!val && val.length > 0 || 'Email wajib diisi', val => /.+@.+\..+/.test(val) || 'Format email tidak valid']"
                                        lazy-rules
                                    />
                                    <div class="divider-line"></div>
                                </div>

                                <div class="col-12">
                                    <div class="input-label">Nomor Handphone</div>
                                    <q-input
                                        borderless
                                        :model-value="contactUsStore.getForm.phone"
                                        @update:model-value="(val) => contactUsStore.updateFormField('phone', val as string)"
                                        placeholder="Masukkan nomor handphone"
                                        class="underlined-input"
                                        type="tel"
                                        :rules="[val => !!val && val.length > 0 || 'Nomor handphone wajib diisi', val => val.length >= 8 || 'Nomor telepon terlalu pendek']"
                                        lazy-rules
                                    />
                                    <div class="divider-line"></div>
                                </div>

                                <div class="col-12">
                                    <div class="input-label q-pl-sm">Kategori Pesan</div>
                                    <q-option-group
                                        :model-value="contactUsStore.getForm.category"
                                        @update:model-value="(val) => contactUsStore.updateFormField('category', val as string)"
                                        type="radio"
                                        color="black"
                                        :options="contactUsStore.getMessageCategories"
                                        inline
                                        class="radio-group-custom q-ml-sm"
                                    />
                                    <div v-if="!contactUsStore.getForm.category && submittedOnce" class="text-negative q-mt-xs q-ml-sm">
                                        Kategori pesan wajib dipilih
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="input-label">Pesan</div>
                                    <q-input
                                        borderless
                                        :model-value="contactUsStore.getForm.message"
                                        @update:model-value="(val) => contactUsStore.updateFormField('message', val as string)"
                                        placeholder="Tulis pesan Anda..."
                                        class="underlined-input"
                                        type="text"
                                        rows="3"
                                        :rules="[val => !!val && val.length > 0 || 'Pesan wajib diisi', val => val.length >= 10 || 'Pesan terlalu pendek']"
                                        lazy-rules
                                    />
                                    <div class="divider-line"></div>
                                </div>

                                <div class="col-12 text-left">
                                    <q-btn
                                        label="Kirim Pesan"
                                        no-caps
                                        type="submit"
                                        :loading="contactUsStore.getIsLoading"
                                    />
                                </div>
                            </div>
                        </q-form>
                    </div>

                    <div v-else class="q-pa-xl flex flex-center column text-center">
                        <q-img :src="contactUsStore.getSuccessImageSrc" class="after" />
                        <div class="text-h6 q-mt-md">Pesanmu akan segera diproses dan kami akan segera menghubungimu!</div>
                        <q-btn
                            label="Kembali"
                            @click="contactUsStore.resetForm()"
                            no-caps
                        />
                    </div>
                </transition>
            </div>
        </q-card>
    </div>
    <FooterCopyright />
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import FooterCopyright from 'components/FooterCopyright.vue';
    import { useQuasar } from 'quasar';
    import { useContactUsStore } from 'src/stores/ContactUsStore';

    const $q = useQuasar();
    const contactUsStore = useContactUsStore();
    const route = useRoute();
    const submittedOnce = ref(false);

    onMounted(() => {
        const categoryParam = route.query.category as string | string[] | null | undefined;
        contactUsStore.initializeCategoryFromQuery(categoryParam);
    });

    async function handleFormSubmission() {
        submittedOnce.value = true;

        if (!contactUsStore.getForm.category.trim()) {
            $q.notify({
                type: 'negative',
                message: 'Kategori pesan wajib dipilih.',
            });
            return;
        }

        const success = await contactUsStore.submitForm();

        if (success) {
            $q.notify({ type: 'positive', message: 'Pesan berhasil dikirim!' });
            submittedOnce.value = false;
        } else {
            $q.notify({
                type: 'negative',
                message: contactUsStore.getError || 'Terjadi kesalahan saat mengirim pesan.',
            });
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: 600;
        margin-top: 0px;
        font-size: 40px;
        padding-top: 40px;
    }

    .main-card {
        max-width: 1200px;
        max-height: auto;
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    .yellow-card {
        background-color: #FFD400;
        border-radius: 12px;
        padding: 24px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .yellow-card .logo {
        width: 100px;
        margin-bottom: -20px;
    }

    .yellow-card h5 {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 30px;
        color: #CC2E29;
    }

    .yellow-card p {
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 16px;
        color: #CC2E29;
    }

    .yellow-card .info-section {
        margin-top: 20px;
    }

    .yellow-card .info-section .row {
        margin-bottom: 10px;
        font-size: 14px;
        align-items: flex-start;
        color: #CC2E29;
    }

    .icon-circle {
        width: 30px;
        height: 30px;
        border: 1px solid #CC2E29;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #CC2E29;
        transition: 0.3s;
    }

    .icon-circle:hover {
        background-color: #CC2E29;
        color: white;
        cursor: pointer;
    }

    a.icon-circle {
        text-decoration: none;
    }

    .social-icons {
        gap: 12px;
        padding-top: 20px;
    }

    .info-section {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .info-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        color: #CC2E29;
    }

    .q-btn {
        min-width: 150px;
        margin-top: 30px;
        height: 40px;
        font-size: 14px;
        font-weight: 500;
        color: #CC2E29;
        background-color: #FFD400;
    }

    .q-btn:hover {
        background-color: #CC2E29;
        color: white;
        transition: background-color 0.5s ease;
    }

    .input-label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 6px;
        color: #333;
        padding-left: 2px;
    }

    .underlined-input .q-field__control {
        border-bottom: 1px solid #ccc;
        padding-top: 10px;
        padding-bottom: 4px;
        padding-left: 0;
        padding-right: 0;
        background: transparent;
        height: 42px;
    }

    .underlined-input .q-field__native {
        padding-left: 0;
        font-size: 14px;
    }

    .underlined-input .q-field__control:before,
    .underlined-input .q-field__control:after {
        border: none !important;
    }

    .form-right {
        margin-top: 50px;
        padding-left: 20px !important;
    }

    .q-option-group {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-left: -15px;
    }

    .divider-line {
        height: 1px;
        background-color: #e0e0e0;
        margin-top: 8px;
        margin-bottom: 16px;
    }

    .after {
        width: 550px;
        height: auto;
        margin: 0 auto;
    }

    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.4s ease;
    }

    .fade-slide-enter-from,
    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    @media screen and (max-width: 768px) {
        .after {
            width: 200px;
            height: auto;
            margin-top: -80px;
        }
    }
</style>