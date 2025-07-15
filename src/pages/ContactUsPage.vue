<template>
    <h1 class="text-h3 text-center q-mb-md">Hubungi Kami</h1>
    <p class="text-center q-mb-xs">
        Punya pertanyaan atau komentar? Tulis saja pesan kepada kami!
    </p>
    <div class="q-pa-lg bg-grey-1">
        <q-card class="main-card row q-pa-md">
            <div class="col-12 col-md-5 q-pa-md">
                <div class="yellow-card">
                    <div>
                        <q-img src="/images/LogoKabobs.png" class="logo" />
                        <h5 class="text-h6">Informasi Kontak</h5>
                        <p>
                            Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut, kerja sama bisnis, atau pertanyaan seputar produk dan layanan kami. Tim kami siap membantu Anda dengan sepenuh hati.
                        </p>

                        <div class="info-section">
                            <div class="info-item">
                                <q-icon name="call" />
                                <span>(62)811-1789-9000</span>
                            </div>
                            <div class="info-item">
                                <q-icon name="email" />
                                <span>marketing@kabobs.id</span>
                            </div>
                            <div class="info-item">
                                <q-icon name="place" />
                                <span>
                                Jl. Ibrahim Adjie No.372a, Binong,<br />
                                Kec. Batununggal, Kota Bandung,<br />
                                Jawa Barat 40275
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="social-icons row q-gutter-sm">
                        <a href="https://instagram.com/kabobs.id" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-instagram" />
                        </a>
                        <a href="https://facebook.com/kabobs.id" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-facebook-f" />
                        </a>
                        <a href="https://tiktok.com/@kabobs.id" target="_blank" class="icon-circle">
                            <q-icon name="fa-brands fa-tiktok" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Formulir Kontak -->
            <div class="col-12 col-md-7 q-pa-md form-right">
                <transition name="fade-slide" mode="out-in">
                    <div v-if="!isSubmitted" class="q-gutter-md">
                        <div class="row q-col-gutter-md">
                            <!-- Nama Depan -->
                            <div class="col-12">
                                <div class="input-label">Nama Depan</div>
                                <q-input
                                    borderless
                                    v-model="form.firstName"
                                    placeholder="Masukkan nama depan"
                                    class="underlined-input"
                                />
                                <div class="divider-line"></div>
                            </div>

                            <!-- Nama Belakang -->
                            <div class="col-12">
                                <div class="input-label">Nama Belakang</div>
                                <q-input
                                    borderless
                                    v-model="form.lastName"
                                    placeholder="Masukkan nama belakang"
                                    class="underlined-input"
                                />
                                <div class="divider-line"></div>
                            </div>

                            <!-- Email -->
                            <div class="col-12">
                                <div class="input-label">Email</div>
                                <q-input
                                    borderless
                                    v-model="form.email"
                                    placeholder="Masukkan email"
                                    class="underlined-input"
                                />
                                <div class="divider-line"></div>
                            </div>

                            <!-- Nomor Handphone -->
                            <div class="col-12">
                                <div class="input-label">Nomor Handphone</div>
                                <q-input
                                    borderless
                                    v-model="form.phone"
                                    placeholder="Masukkan nomor handphone"
                                    class="underlined-input"
                                />
                                <div class="divider-line"></div>
                            </div>

                            <!-- Kategori Pesan -->
                            <div class="col-12">
                                <div class="input-label q-pl-sm">Kategori Pesan</div>
                                <q-option-group
                                    v-model="form.category"
                                    type="radio"
                                    color="black"
                                    :options="[
                                        { label: 'Pertanyaan Umum', value: 'umum' },
                                        { label: 'Komplain', value: 'komplain' },
                                        { label: 'Masukan / Saran', value: 'saran' }
                                    ]"
                                    inline
                                    class="radio-group-custom q-ml-sm"
                                />
                            </div>

                            <!-- Pesan -->
                            <div class="col-12">
                                <div class="input-label">Pesan</div>
                                <q-input
                                    borderless
                                    v-model="form.message"
                                    placeholder="Tulis pesan Anda..."
                                    class="underlined-input"
                                />
                                <div class="divider-line"></div>
                            </div>

                            <!-- Tombol -->
                            <div class="col-12 text-left">
                                <q-btn
                                label="Kirim Pesan"
                                no-caps
                                @click="handleSubmit"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Setelah submit -->
                    <div v-else class="q-pa-xl flex flex-center column text-center">
                        <q-img src="/images/Success.png" class="after" />
                        <div class="text-h6 q-mt-md">Pesanmu akan segera diproses dan kami akan segera menghubungimu!</div>
                        <q-btn
                            label="Kembali"
                            @click="resetForm"
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
    import FooterCopyright from 'components/FooterCopyright.vue'
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'

    const $q = useQuasar()
    const isSubmitted = ref(false)

    function resetForm() {
        form.value = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            category: '',
            message: ''
        }
        isSubmitted.value = false
    }

    const form = ref({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        category: '',
        message: ''
    })

    function handleSubmit() {
        const { firstName, lastName, email, phone, category, message } = form.value

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !category.trim?.() ||  // optional chaining untuk jaga-jaga
            !message.trim()
        ) {
            $q.notify({
            type: 'negative',
            message: 'Semua kolom wajib diisi sebelum mengirim pesan.'
            })
            return
        }

        $q.notify({ type: 'positive', message: 'Pesan berhasil dikirim!' })
        isSubmitted.value = true
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
        max-height: 1000px;
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

    .q-option-group{
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

</style>
