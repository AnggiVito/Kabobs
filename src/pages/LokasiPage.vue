<template>
    <q-page class="q-pa-md">
        <div class="lokasi-page">
            <div class="text-center q-mt-xl">
                <h1 class="text-h5">Lokasi Outlet</h1>
                <div class="text-caption-tittle">
                    Temukan outlet Kabobs terdekatmu!
                </div>
            </div>

            <div class="search-bar q-mt-lg q-mx-auto">
                <q-input
                    :model-value="lokasiStore.search"
                    @update:model-value="lokasiStore.setSearch"
                    placeholder="Cari lokasi"
                    borderless
                    dense
                    debounce="300"
                    @focus="lokasiStore.setShowSuggestions(true)"
                    @blur="lokasiStore.handleBlur"
                    class="search-box underline-only"
                    :class="{ 'active': lokasiStore.search }"
                >
                    <template #prepend>
                        <q-icon name="place" class="text-black" />
                    </template>
                    <template #append>
                        <q-btn class="search-btn" flat label="Cari" no-caps @click="lokasiStore.doSearch" />
                    </template>
                </q-input>
                <q-list
                    v-if="lokasiStore.showSuggestions && lokasiStore.filteredSuggestions.length"
                    class="autocomplete-list"
                >
                    <q-item
                        v-for="(item, idx) in lokasiStore.filteredSuggestions"
                        :key="idx"
                        clickable
                        @click="lokasiStore.selectSuggestion(item)"
                    >
                        <q-item-section>{{ item }}</q-item-section>
                    </q-item>
                </q-list>
            </div>

            <div v-if="lokasiStore.isLoading" class="text-center q-pa-lg">
                <q-spinner-hourglass color="primary" size="3em" />
                <div class="q-mt-md">Memuat lokasi outlet...</div>
            </div>

            <div v-else-if="lokasiStore.error" class="text-center q-pa-lg text-negative">
                Error: {{ lokasiStore.error }}
            </div>

            <div v-else-if="lokasiStore.filteredRegions.length === 0 && lokasiStore.search" class="text-center q-mt-lg">
                <q-icon name="search_off" size="48px" color="grey-5" />
                <div class="text-h6 text-grey-7 q-mt-md">Tidak ada hasil ditemukan</div>
                <div class="text-caption text-grey-6">
                    Coba ubah kata kunci pencarianmu.
                </div>
            </div>
            
            <div v-else-if="!lokasiStore.isLoading && lokasiStore.filteredRegions.length === 0" class="text-center q-mt-lg">
                <div class="text-h6 text-grey-7 q-mt-md">Tidak ada data lokasi yang tersedia.</div>
            </div>

            <div
                v-else
                class="region-section"
                v-for="(region, i) in lokasiStore.filteredRegions"
                :key="i"
            >
                <h2 class="region-title">{{ region.name }}</h2>

                <div class="card-container">
                    <div
                        v-for="(outlet, j) in region.outlets"
                        :key="j"
                    >
                        <q-card class="text-black lokasi-card">
                            <q-card-section class="column full-height justify-between">
                                <div>
                                    <div class="text-subtitle1 nama-outlet">{{ outlet.name }}</div>
                                </div>

                                <div>
                                    <q-space />
                                    <a
                                        :href="outlet.mapUrl"
                                        target="_blank"
                                        class="lihat-maps text-caption text-bold flex items-center"
                                    >
                                        <q-icon name="location_on" size="16px" class="q-mr-xs" />
                                        Lihat Maps
                                    </a>
                                    <div
                                        class="lihat-alamat text-caption text-bold flex items-center q-mt-sm cursor-pointer"
                                        @click="lokasiStore.toggleAddressVisibility(outlet.name, region.name)"
                                    >
                                        <q-icon :name="outlet.showAddress ? 'visibility_off' : 'visibility'" size="16px" class="q-mr-xs" />
                                        {{ outlet.showAddress ? 'Sembunyikan' : 'Lihat Alamat' }}
                                    </div>
                                    <div v-if="outlet.showAddress" class="text-caption q-mt-xs">
                                        {{ outlet.address }}
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
        <FooterLayout />
    </q-page>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import FooterLayout from 'layouts/FooterLayout.vue';
    import { useLokasiStore } from 'src/stores/LokasiStore';
    import { QSpinnerHourglass } from 'quasar';

    const lokasiStore = useLokasiStore();

    onMounted(() => {
        void lokasiStore.fetchLokasiData();
    });
</script>

<style scoped>
    .lokasi-page {
        max-width: 1200px;
        margin: 0 auto;
        margin-bottom: 50px;
    }

    .text-h5 {
        font-weight: 700;
        color: #000;
        font-size: 40px;
    }

    .text-caption-tittle {
        font-size: 32px;
        color: #000;
        margin-top: 8px;
    }

    .search-bar {
        max-width: 600px;
        position: relative;
    }

    .search-box.active input {
        border-bottom: 2px solid #fdd835 !important;
    }

    .autocomplete-list {
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        margin-top: 4px;
        position: absolute;
        width: 100%;
        z-index: 2;
        max-height: 200px;
        overflow-y: auto;
    }

    .region-title {
        margin-top: 40px;
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        display: inline-block;
        padding-bottom: 4px;
        color: #CD2F29;
    }

    .lokasi-card {
        border-radius: 10px;
        background-color: #FFD400;
        width: 280px;
        height: 240px;
    }

    .region-section {
        text-align: center;
        margin-top: 40px;
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .lokasi-card .text-subtitle1 {
        color: #CD2F29;
        font-size: 20px;
        font-weight: 600;
    }

    .lokasi-card .text-caption {
        font-size: 13px;
    }

    .lihat-maps {
        color: #000000 !important;
        text-decoration: none;
    }

    .lihat-alamat {
        color: #000000 !important;
        text-decoration: none;
    }

    .search-btn {
        background-color: #fdd835;
        color: #CD2F29;
        font-weight: 600;
        border-radius: 20px;
        padding: 6px 12px;
        width: 80px;
    }

    .search-btn:hover {
        background-color: #CD2F29;
        color: white;
        transition: 0.3s ease-in-out;
    }

    .search-box.underline-only {
        border-bottom: 2px solid #ccc;
        transition: border-color 0.2s;
    }

    .search-box.underline-only:focus-within {
        border-bottom: 2px solid #fdd835;
    }
</style>