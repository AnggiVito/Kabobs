<template>
    <q-page class="q-pa-md karier-page">
        <div class="join-kabobs-card-wrapper q-mt-xl q-mx-auto">
            <q-card class="join-kabobs-card">
                <q-card-section class="row no-wrap items-center justify-between full-height">
                    <div class="col-xs-12 col-md-6 text-content-wrapper">
                        <h1 class="text-h5 text-dark-title q-mb-md">Bergabunglah Bersama Keluarga Besar Kabobs</h1>
                        <p class="text-body1 text-join-desc q-mt-md">
                            Temukan karier yang penuh semangat dan makna bersama Kabobs! Kami membuka kesempatan bagi Anda untuk menjadi bagian dari tim hebat kami – baik di lingkungan kantor sebagai staf profesional maupun di garis depan sebagai crew outlet yang melayani pelanggan dengan sepenuh hati.
                        </p>
                        <p class="text-body1 text-join-desc q-mt-md">
                            Bersama Kabobs, Anda tidak hanya bekerja, tetapi juga tumbuh, berkembang, dan memberi dampak positif bagi banyak orang. Mari wujudkan masa depan cerah bersama kami!
                        </p>
                    </div>
                    <div class="col-xs-12 col-md-6 image-content-wrapper flex flex-center">
                        <q-img src="images/Sosmed3.png" alt="Join Us" class="join-image-card" />
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <div class="q-xl text-center">
            <h2 class="text-h5 text-dark-title">Posisi yang Terbuka</h2>
        </div>

        <div class="search-filter-bar q-mt-lg row q-gutter-md">
            <q-select
                outlined
                :model-value="karierStore.lokasiFilter"
                @update:model-value="karierStore.setLokasiFilter"
                :options="karierStore.lokasiOptions"
                label="Semua Lokasi"
                dense
                class="filter-select"
            />
            <q-select
                outlined
                :model-value="karierStore.posisiFilter"
                @update:model-value="karierStore.setPosisiFilter"
                :options="karierStore.posisiOptions"
                label="Semua Posisi"
                dense
                class="filter-select"
            />
            <q-input
                outlined
                :model-value="karierStore.keywordSearch"
                @update:model-value="karierStore.setKeywordSearch"
                placeholder="Cari"
                dense
                class="filter-search-input"
            >
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>

        <div class="posisi-list q-mt-xl q-mx-auto">
            <div class="posisi-header q-mb-md q-hidden-md-and-down">
                <div class="posisi-header-item header-posisi">
                    <q-icon name="person" size="24px" color="grey-7" />
                    <span class="text-subtitle1 text-bold text-grey-8">Posisi</span>
                </div>
                <div class="posisi-header-item header-lokasi">
                    <q-icon name="place" size="24px" color="grey-7" />
                    <span class="text-subtitle1 text-bold text-grey-8">Lokasi</span>
                </div>
                <div class="posisi-header-item header-keahlian">
                    <q-icon name="thumb_up_alt" size="24px" color="grey-7" />
                    <span class="text-subtitle1 text-bold text-grey-8">Keahlian</span>
                </div>
                <div class="posisi-header-item header-action"></div>
            </div>

            <q-card
                v-for="(posisi, index) in karierStore.filteredPosisi"
                :key="index"
                class="posisi-card q-mb-md"
            >
                <q-card-section class="posisi-card-content row no-wrap">
                    <div class="posisi-main-content">
                        <div class="posisi-col col-nama column q-gutter-y-sm">
                            <div class="text-subtitle1 text-bold">{{ posisi.nama }}</div>
                            <div class="text-caption text-grey-7">{{ posisi.jenis }}</div>
                        </div>
                        <div class="posisi-col col-lokasi q-mt-sm">
                            <div class="row items-center q-gutter-x-xs">
                                <q-icon name="place" size="18px" />
                                <span class="text-caption">{{ posisi.lokasi }}</span>
                            </div>
                        </div>
                        <div class="posisi-col col-keahlian q-mt-sm">
                            <div class="row items-center q-gutter-x-xs">
                                <q-icon name="work" size="18px" />
                                <span class="text-caption">{{ posisi.keahlian }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="posisi-col col-action">
                        <q-btn flat round icon="arrow_forward" color="primary" />
                    </div>
                </q-card-section>
            </q-card>

            <div v-if="karierStore.filteredPosisi.length === 0" class="text-center q-mt-lg text-grey-7">
                Tidak ada posisi yang ditemukan sesuai kriteria pencarian.
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
    import { useKarierStore } from 'src/stores/KarierStore';

    const karierStore = useKarierStore();
</script>

<style scoped>
    .karier-page {
        max-width: 1440px;
        margin: 0 auto;
        padding-bottom: 50px;
    }

    .text-h5 {
        font-weight: 700;
        color: #CD2F29;
        font-size: 40px;
        line-height: 50px;
    }

    .join-kabobs-card-wrapper {
        max-width: 1320px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .join-kabobs-card {
        background-color: #FFD400;
        border-radius: 15px;
        color: #000;
        min-height: 515px;
        display: flex;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        padding: 0;
        margin-bottom: 80px;
    }

    .join-kabobs-card .q-card-section {
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    .text-content-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px;
        box-sizing: border-box;
        height: 100%;
    }

    .text-content-wrapper h1 {
        margin-top: 0;
        text-align: left;
        align-self: flex-start;
        font-size: 40px;
    }

    .text-content-wrapper p {
        text-align: left;
        margin-bottom: 0;
        font-size: 18px;
    }

    .image-content-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    }

    .join-image-card {
        height: 456px;
        width: 456px;
        max-width: 100%;
        object-fit: contain;
        border-radius: 10px;
    }

    .text-body1 {
        font-size: 18px;
        line-height: 1.5;
    }

    .search-filter-bar {
        max-width: 900px;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 60px;
    }

    .filter-select {
        flex-grow: 1;
        min-width: 200px;
    }

    .filter-search-input {
        flex-grow: 2;
        min-width: 250px;
    }

    .posisi-list {
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;
    }

    .posisi-header {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
        margin-bottom: 15px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .posisi-header-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .posisi-header-item.header-posisi {
        flex: 2;
        justify-content: flex-start;
    }

    .posisi-header-item.header-lokasi {
        flex: 1.2;
        justify-content: flex-start;
    }

    .posisi-header-item.header-keahlian {
        flex: 2;
        justify-content: flex-start;
    }

    .posisi-header-item.header-action {
        flex-shrink: 0;
        width: 50px;
    }

    .posisi-card {
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
    }

    .posisi-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .posisi-card-content {
        padding: 15px 20px;
        display: flex;
        align-items: center;
    }

    .posisi-main-content {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        .posisi-col:nth-child(1) { flex: 2; }
        .posisi-col:nth-child(2) { flex: 1.2; }
        .posisi-col:nth-child(3) { flex: 2; }
    }

    .posisi-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .posisi-col.col-nama {
        text-align: left;
    }

    .posisi-col.col-lokasi {
        text-align: left;
    }

    .posisi-col.col-keahlian {
        text-align: left;
    }

    .posisi-col.col-action {
        flex-shrink: 0;
        width: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .posisi-card .text-subtitle1 {
    color: #CD2F29;
    font-size: 18px;
    }

    .posisi-card .text-caption {
    font-size: 13px;
    }

    @media (max-width: 991px) {
        .join-kabobs-card-wrapper {
            padding: 0 10px;
        }
        .join-kabobs-card {
            min-height: auto;
            margin-bottom: 40px;
        }
        .join-kabobs-card .q-card-section {
            padding: 20px;
        }
        .text-content-wrapper, .image-content-wrapper {
            height: auto;
            padding: 15px;
            order: unset;
        }
        .text-content-wrapper h1, .text-content-wrapper p {
            text-align: left;
        }
        .join-image-card {
            max-height: 250px;
            width: 100%;
            object-fit: contain;
        }
        .posisi-list, .search-filter-bar {
            margin-right: auto;
            margin-left: auto;
            padding: 0 15px;
            box-sizing: border-box;
        }
        .posisi-header {
            display: none;
        }
        .posisi-card .posisi-card-content {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 10px;
        }
        .posisi-main-content {
            flex-direction: column;
            width: 100%;
        }
        .posisi-col.col-nama,
        .posisi-col.col-lokasi,
        .posisi-col.col-keahlian,
        .posisi-col.col-action {
            flex: unset;
            width: 100%;
            margin-bottom: 5px;
        }
        .posisi-col.col-lokasi, .posisi-col.col-keahlian {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
        }
        .posisi-col.col-action {
            margin-top: 10px;
            justify-content: flex-end;
        }
    }

    @media (max-width: 768px) {
        .text-h5 {
            font-size: 32px;
        }
        .text-body1 {
            font-size: 16px;
        }
        .search-filter-bar {
            flex-direction: column;
            align-items: center;
        }
        .filter-select, .filter-search-input {
            width: 90%;
            min-width: unset;
        }
        .join-kabobs-card {
            flex-direction: column;
            min-height: auto;
            margin-bottom: 40px;
        }
        .join-kabobs-card .q-card-section {
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .text-content-wrapper {
            padding: 20px;
            text-align: center;
            order: 1; 
        }
        .text-content-wrapper h1 {
            font-size: 16px;
            text-align: center;
            line-height: 1.2;
        }
        .text-content-wrapper p {
            font-size: 14px;
            text-align: center;
        }
        .image-content-wrapper {
            order: 2; 
            margin-top: 20px;
            width: 100%;
            padding: 0;
        }
        .join-image-card {
            max-height: 200px;
            width: 100%;
            object-fit: contain;
        }
    }

    @media (max-width: 480px) {
        .text-h5 {
            font-size: 28px;
        }
        .text-body1 {
            font-size: 14px;
        }
        .posisi-card .text-subtitle1 {
            font-size: 16px;
        }
        .posisi-card .text-caption {
            font-size: 12px;
        }
        .image-content-wrapper {
            order: 2; 
            margin-top: 20px;
            width: 100%;
            padding: 0;
        }
    }
</style>
