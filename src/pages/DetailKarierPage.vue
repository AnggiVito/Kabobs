<template>
    <q-page class="q-pa-md detail-karier-page">
        <div class="q-mx-auto detail-container">
            <div v-if="karierStore.isDetailLoading" class="text-center q-pa-lg">
                <q-spinner-hourglass color="primary" size="3em" />
                <div class="q-mt-md">Memuat detail karier...</div>
            </div>

            <div v-else-if="karierStore.detailError" class="text-center q-pa-lg text-negative">
                Error: {{ karierStore.detailError }}
                <q-btn label="Kembali" @click="router.back()" color="primary" flat class="q-mt-md" />
            </div>

            <div v-else-if="!karierStore.selectedKarierDetail" class="text-center q-pa-lg text-grey-7">
                <q-icon name="info" size="48px" />
                <div class="text-h6 q-mt-md">Detail posisi karier tidak ditemukan.</div>
                <q-btn label="Kembali ke Karier" @click="router.push('/Karier')" color="primary" flat class="q-mt-md" />
            </div>

            <div v-else class="detail-content-wrapper">
                <q-btn
                    flat
                    dense
                    icon="arrow_back"
                    label="Kembali ke Daftar Karier"
                    color="grey-8"
                    no-caps
                    @click="router.back()"
                    class="q-mb-md back-to-top-btn"
                />
                
                <h1 class="main-title">{{ karierStore.selectedKarierDetail.namaposisi }}</h1>
                
                <div class="date-info q-mb-md">
                    Diposting pada: {{ formatPostingDate(karierStore.selectedKarierDetail.posting) }}
                </div>
                <div class="section-title q-mt-lg">Deskripsi</div>
                <p class="section-text">{{ karierStore.selectedKarierDetail.deskripsi }}</p>

                <div class="section-title q-mt-lg">Ringkasan</div>
                <p class="section-text">{{ karierStore.selectedKarierDetail.jobSummary }}</p>

                <div class="section-title q-mt-lg">Kualifikasi</div>
                <ul class="requirement-list">
                    <li v-for="(qual, index) in parsedJobRequirement" :key="index">
                        {{ qual }}
                    </li>
                </ul>

                <div class="section-title q-mt-lg">Detail Pekerjaan</div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Kota:</span>
                        <span class="detail-value">{{ karierStore.selectedKarierDetail.kota }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Provinsi:</span>
                        <span class="detail-value">{{ karierStore.selectedKarierDetail.provinsi }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Lokasi Kerja:</span>
                        <span class="detail-value">{{ karierStore.selectedKarierDetail.workplace }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipe Pekerjaan:</span>
                        <span class="detail-value">{{ karierStore.selectedKarierDetail.worktype }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipe Gaji:</span>
                        <span class="detail-value">{{ karierStore.selectedKarierDetail.paytype }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Kisaran Gaji:</span>
                        <span class="detail-value">
                            {{ formatSalary(karierStore.selectedKarierDetail.payrangeFrom) }} - 
                            {{ formatSalary(karierStore.selectedKarierDetail.payrangeTo) }}
                        </span>
                    </div>
                </div>

                <div class="apply-button-wrapper">
                    <q-btn 
                        label="Apply Now!" 
                        no-caps 
                        rounded
                        class="apply-now-btn"
                        @click="goToApplyNow(karierStore.selectedKarierDetail.id)"
                    />
                </div>
            </div>
        </div>
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import { computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import FooterLayout from 'layouts/FooterLayout.vue';
    import { useKarierStore } from 'src/stores/KarierStore';
    import { QSpinnerHourglass } from 'quasar';

    const router = useRouter();
    const route = useRoute();
    const karierStore = useKarierStore();

    const positionId = computed(() => Number(route.params.id));

    const parsedJobRequirement = computed(() => {
        if (!karierStore.selectedKarierDetail || !karierStore.selectedKarierDetail.jobRequirement) {
            return [];
        }
        return karierStore.selectedKarierDetail.jobRequirement.split(/\r?\n/)
            .map((item: string) => item.trim())
            .filter((item: string) => item.length > 0);
    });

    function formatPostingDate(dateString: string): string {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString;
            }
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        } catch (e) {
            console.error("Gagal mem-parse tanggal posting (native Date):", dateString, e);
            return dateString;
        }
    }

    function formatSalary(amount: number | null): string {
        if (amount === null) {
            return 'Tidak Ditetapkan';
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    watch(positionId, (newId) => {
        if (newId) {
            void karierStore.fetchKarierDetail(newId);
        }
    }, { immediate: true });

    function goToApplyNow(id: number) {
        void router.push({ name: 'ApplyNow', params: { positionId: id } });
    }
</script>

<style scoped>
    .detail-karier-page {
        max-width: 1440px;
        margin: 0 auto;
        margin-top: -40px;
        padding-bottom: 20px;
        background-color: #fff;
    }

    .detail-container {
        max-width: 1000px;
        margin-top: 50px;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .detail-content-wrapper {
        background-color: #fff;
        padding: 20px;
        position: relative;
    }

    .main-title {
        font-weight: 700;
        font-size: 48px;
        color: #333;
        margin-bottom: 10px;
        line-height: 1.2;
    }

    .back-to-top-btn {
        font-size: 16px;
        color: #555;
        z-index: 10;
        margin-bottom: -10px;
        margin-top: -10px;
    }

    .back-to-top-btn:hover {
        color: #CD2F29;
    }

    .date-info {
        font-size: 16px;
        color: #777;
        margin-top: -10px;
        margin-bottom: 30px;
    }

    .section-title {
        font-weight: 700;
        font-size: 24px;
        color: #333;
        margin-bottom: 5px;
        margin-top: 40px;
    }

    .section-text {
        font-size: 16px;
        line-height: 1.7;
        color: #333;
        margin-bottom: 10px;
    }

    .requirement-list {
        list-style: disc;
        padding-left: 25px;
        margin-bottom: 20px;
    }

    .requirement-list li {
        font-size: 16px;
        line-height: 1.7;
        color: #333;
        margin-bottom: 8px;
    }

    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        padding: 10px 0;
        border-top: 1px solid #eee;
        padding-top: 20px;
    }

    .detail-item {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
    }

    .detail-label {
        font-weight: bold;
        color: #555;
        font-size: 14px;
        margin-bottom: 3px;
    }

    .detail-value {
        font-size: 16px;
        color: #333;
    }


    .apply-button-wrapper {
        display: flex;
        justify-content: flex-end;
        padding-top: 30px;
        padding-bottom: 20px;
    }

    .apply-now-btn {
        font-size: 16px;
        font-weight: bold;
        padding: 12px 25px;
        border-radius: 8px;
        color: #CD2F29;
        background-color: #FFD400;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.3s ease, background-color 0.3s ease;
    }

    .apply-now-btn:hover {
        color: #fff;
        background-color: #CD2F29;
    }

    @media (max-width: 768px) {
        .detail-container {
            padding: 0 15px;
            margin-top: 30px;
        }
        .main-title {
            font-size: 32px;
            margin-bottom: 8px;
        }
        .back-to-top-btn {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            justify-content: center;
            margin-bottom: 20px;
        }
        .date-info {
            font-size: 14px;
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 20px;
            margin-bottom: 10px;
            margin-top: 30px;
        }
        .section-text, .requirement-list li {
            font-size: 14px;
            line-height: 1.5;
        }
        .apply-button-wrapper {
            justify-content: center;
            padding-top: 20px;
        }
        .apply-now-btn {
            width: 100%;
            max-width: 300px;
            font-size: 15px;
            padding: 8px 15px;
        }
        .detail-grid {
            grid-template-columns: 1fr;
        }
    }
</style>