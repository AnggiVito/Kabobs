<template>
    <div class="lokasi-page">
        <!-- Heading -->
        <div class="text-center q-mt-xl">
            <h1 class="text-h5">Lokasi Outlet</h1>
            <div class="text-caption-tittle">
                Temukan outlet Kabobs terdekatmu!
            </div>
        </div>

        <!-- Search Bar -->
        <div class="search-bar q-mt-lg q-mx-auto">
            <q-input
                v-model="search"
                placeholder="Cari lokasi"
                borderless
                dense
                debounce="300"
                @focus="showSuggestions = true"
                @blur="handleBlur"
                class="search-box underline-only"
                :class="{ 'active': search }"
            >
                <template #prepend>
                    <q-icon name="place" class="text-black" />
                </template>
                <template #append>
                    <q-btn class="search-btn" flat label="Cari" no-caps @click="doSearch" />
                </template>
            </q-input>
            <q-list
                v-if="showSuggestions && filteredSuggestions.length"
                class="autocomplete-list"
            >
                <q-item
                    v-for="(item, idx) in filteredSuggestions"
                    :key="idx"
                    clickable
                    @click="selectSuggestion(item)"
                >
                    <q-item-section>{{ item }}</q-item-section>
                </q-item>
            </q-list>
        </div>

        <!-- Region & Cards -->
        <div
            class="region-section"
            v-for="(region, i) in filteredRegions"
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
                                <div class="text-caption q-mt-xs">{{ outlet.address }}</div>
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
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredRegions.length === 0" class="text-center q-mt-lg">
            <q-icon name="search_off" size="48px" color="grey-5" />
            <div class="text-h6 text-grey-7 q-mt-md">Tidak ada hasil ditemukan</div>
            <div class="text-caption text-grey-6">
                Coba ubah kata kunci pencarianmu.
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'

    const search = ref('')
    const showSuggestions = ref(false)

    const suggestions = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Banten', 'Jawa Timur']

    const filteredSuggestions = computed(() => {
        return suggestions.filter((s) =>
            s.toLowerCase().includes(search.value.toLowerCase())
        )
    })

    function selectSuggestion(s: string) {
        search.value = s
        showSuggestions.value = false
    }

    function doSearch() {
        showSuggestions.value = false
    }

    function handleBlur() {
    setTimeout(() => {
            showSuggestions.value = false
        }, 200)
    }


    const lokasiData = [
    {
        name: 'DKI Jakarta',
        outlets: [
            {
                name: 'JAKARTA PURI INDAH MALL',
                address: 'Jl. Puri Agung No.1, Kembangan Sel., Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610',
                mapUrl: 'https://maps.app.goo.gl/oPJmEqF9KXHbRSmw5'
            },
            {
                name: 'JAKARTA GAJAH MADA PLAZA',
                address: 'Gajah Mada Plaza Lt. G Jl. Gajah Mada No.19, RT.2/RW.1, North Petojo, Gambir, Central Jakarta City, Jakarta 10130',
                mapUrl: 'https://maps.app.goo.gl/pzemsvBJxeAk76i67'
            },
            {
                name: 'JAKARTA SENAYAN PARK',
                address: 'Jl. Gerbang Pemuda No.3, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270',
                mapUrl: 'https://maps.app.goo.gl/gWM9CExLdpFqgeVK6'
            },
            {
                name: 'JAKARTA MALL OF INDONESIA',
                address: 'Jl. Boulevard Bar. Raya No.12, RT.18/RW.19, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240 (LG - PM -C08)',
                mapUrl: 'https://maps.app.goo.gl/8SgR4tU8URgjam6a9'
            },
            {
                name: 'JAKARTA FX SUDIRMAN',
                address: 'Lantai 5 Unit FCFX#02 Luas 13 m2 FX SUDIRMAN, Jl. Jenderal Sudirman, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270',
                mapUrl: 'https://maps.app.goo.gl/SjHv4warLGaSJpBS6'
            },
            {
                name: 'JAKARTA ITC FATMAWATI',
                address: 'Jl. RS. Fatmawati Raya No.39, RT.1/RW.5, Cipete Utara, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12150',
                mapUrl: 'https://maps.app.goo.gl/VKCzNJRF1oRzyyG16'
            },
            {
                name: 'JAKARTA KUNINGAN CITY MALL',
                address: 'Jl. Prof. DR. Satrio No.Kav. 18, Kuningan, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA GANDARIA CITY',
                address: 'Jakarta Gandaria City Lt LG - 107B Jl. Sultan Iskandar Muda, Gandaria Kec. Kebayoran Lama Kota Jakarta Selatan Daerah Khusus Ibukota Jakarta 12240',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA PLAZA FESTIVAL',
                address: 'Jl. H. R. Rasuna Said No.22 Kav. C UGK-10, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA BLOK M',
                address: 'Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, 12160, DKI Jakarta.',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA PONDOK INDAH MALL',
                address: 'Street Gallery Pondok Indah Mall Jakarta Lantai 1 No. B 103B Jalan Metro Pondok Indah Kav. IV, Daerah Khusus Ibukota Jakarta',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA THE PARK PEJATEN',
                address: 'Pejaten Village Lt.2, Jl. Warung Jati Barat No.39, RT.1/RW.5, Jati Padang, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12550',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA TAMINI SQUARE',
                address: 'Jl. Taman Mini I, RT.3/RW.2, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13560',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA PLAZA KRAMAT JATI',
                address: 'Lippo Plaza Kramat Jati Lt. GF Jl. Al Amin I No.13, RW.6, Kramat Jati, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13510',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA BASSURA MALL',
                address: 'Jl. Jend. Basuki Rachmat No.1A, RW.10, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13410',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA PGC',
                address: 'Pusat Grosir Cililitan Lt. Ground Jl. Mayjen Sutoyo No.76, RW.11, Cililitan, Kec. Kramat jati, Kota Jakarta Timur',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA CONDET',
                address: 'Jl. Condet Raya No. 1B, RT 005/03 Kel. Balekembang, Kec. Kramatjati, Jakarta Timur',
                mapUrl: 'aa'
            },
            {
                name: 'JAKARTA MAL CIJANTUNG',
                address: 'Lantai Dasar Unit No 50 Jl . Pendidikan I No 1, RT.1/RW.4, Cijantung, Kec. Ps Rebo Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13770',
                mapUrl: 'aa'
            },
            {
                name: 'CIBUBUR JUNCTION MALL',
                address: 'Jl. Jambore No.1, RW.7, Cibubur, Kec. Ciracas, Kota Jakarta Timur 13720',
                mapUrl: 'aa'
            },
        ]
    },
    {
        name: 'Jawa Barat',
        outlets: [
            {
                name: 'BANDUNG GRIYA CICALENGKA',
                address: 'Griya Cicalengka, Jl. Raya Barat Cicalengka No.315, Cicalengka Kulon, Kec. Cicalengka, Kab.Bandung, Jawa Barat 40395',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA SOREANG',
                address: 'Yogya Soreang Lantai 3 Area Foodcourt Jl. Raya Lingkar Gading Tutuka RT 01/010 Desa Cingcin Kecamatan Soreang Kabupaten Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA GRAND MAJALAYA',
                address: 'Jl. Tengah No.132, Majalaya, Kec. Majalaya, Bandung, Jawa Barat 40382',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG CIMAHI',
                address: 'Jl. Jend. H. Amir Machmud No.482, Padasuka, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40526',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG PADALARANG',
                address: 'Jl. Raya Padalarang No.108C, Kertamulya, Padalarang, Kabupaten Bandung Barat, Jawa Barat 40553',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA LEMBANG',
                address: 'Yogya Lembang, Jl. Raya Lembang No.416, Kayuambon, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391',
                mapUrl: 'aa'
            },
            {
                name: 'BEKASI LIPPO MALL CIKARANG',
                address: 'Lippo Mall Cikarang Lantai GF #29G',
                mapUrl: 'aa'
            },
            {
                name: 'BEKASI LIVING WORLD GRAND WISATA',
                address: 'Jl. Celebration Boulevard Kav. 1 Lambangjaya-Tambun selatan, Bekasi',
                mapUrl: 'aa'
            },
            {
                name: 'CIBUBUR LIVING WORLD',
                address: 'Living World Cibubur Kota Wisata Jl. Boulevard Kota Wisata, Ciangsana, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16968 (FC - 18 – Third Floor)',
                mapUrl: 'aa'
            },
            {
                name: 'CIANJUR YOGYA',
                address: 'Yogya Cianjur, Jl. Arif Rahman Hakim No.56A, Solokpandan, Kec. Cianjur, Kabupaten Cianjur, Jawa Barat 43214',
                mapUrl: 'aa'
            },
            {
                name: 'GARUT YOGYA',
                address: 'Jl. Siliwangi No.21, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat 44114',
                mapUrl: 'aa'
            },
            {
                name: 'JATIBARANG YOGYA',
                address: 'Toserba Yogya Jatibarang, Jl. Siliwangi No.N0 28, Jatibarang Baru, Kec. Jatibarang, Kabupaten Indramayu, Jawa Barat 45273',
                mapUrl: 'aa'
            },
            {
                name: 'CIKAMPEK YOGYA',
                address: 'Yogya Cikampek, Jl. A.H YANI No.108, Cikampek Kota, Cikampek, Karawang Regency, West Java 41373',
                mapUrl: 'aa'
            },
            {
                name: 'KARAWANG YOGYA GRAND',
                address: 'Jl. Kertabumi No.43, RT.1/RW.19, Karawang Kulon, Kec. Karawang Bar., Kabupaten Karawang, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'KUNINGAN YOGYA CIJOHO',
                address: 'Yogya Cijoho, Jl. RE. Martadinata No.93, Cijoho, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45512',
                mapUrl: 'aa'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'aa'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'aa'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'SUMEDANG GRIYA',
                address: 'Jl. Mayor Abdurahman No.163, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45322',
                mapUrl: 'aa'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG TENTH AVENUE',
                address: 'Lantai 1 Unit L1-12 Luas 26 m2 Jl. Soekarno-Hatta No.526, Cijaura, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286',
                mapUrl: 'aa'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG BEC ATAS',
                address: 'Jl. Purnawarman No. 13 - 15, Bandung Electronic Center, Lt. 3, Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'OUTLET EVENT BDG 1',
                address: 'BDG 1',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG DBOTANICA',
                address: 'Jl. Dr. Djundjunan No. 143 - 149, BTC Fashion Mall, Lt. LGF, Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA DERWATI',
                address: 'Jl. Raya Derwati No.45A, Derwati, Kec. Rancasari, Kota Bandung, Jawa Barat 40292',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG SINDANGLAYA',
                address: 'Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA TAMAN KOPO INDAH',
                address: 'Ruko 1B, Jl. Taman Kopo Indah No.2 no. 1, RT.03/RW.I4, Rahayu, Kec. Margaasih, Kabupaten Bandung, Jawa Barat 40218',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG CIWALK BELAKANG',
                address: 'Jl Cihampelas No. 160 Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG BIP ATAS',
                address: 'Jl. Merdeka No. 56, Bandung Indah Plaza, Lt. 3',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG IP BAWAH',
                address: 'Jl Pasir Kaliki No. 121 - 123 Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG BURANGRANG',
                address: 'Jl. Burangrang No. 36 (In & Out Eatery), Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG FESLINK BAWAH',
                address: 'Jl. Peta No. 241, Mall Festival Citylink, Lt. LG',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG MIKO MALL',
                address: 'Jl. KH. Wahid Hasyim No. 599, Miko Mall, Lt. GF, Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA SUMBERSARI',
                address: 'Yogya Cijoho, Jl. RE. Martadinata No.93, Cijoho, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45512',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG DIPATIUKUR',
                address: 'Jl. Dipatiukur No. 96, Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG JATOS',
                address: 'Jl. Raya Jatinangor No. 150, Jatinangor Town Square, Lt. FF Ext, Kec. Sumedang',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG CIWALK DEPAN',
                address: 'Jl Cihampelas No. 160 Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA BUAH BATU',
                address: 'Griya Buah Batu, Jl. Buah Batu No.183-185, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA CINUNUK',
                address: 'Griya Cinunuk, Jl. Raya Tagog Cinunuk No.187, Cimekar, Cileunyi, Bandung, Jawa Barat 40623',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA KEPATIHAN',
                address: 'Yogya Kepatihan, Jl. Kepatihan No.18, Balonggede, Kec. Regol, Kota Bandung, Jawa Barat 40251',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA SUNDA',
                address: 'Yogya Sunda, Jl. Sunda No.60, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG DAGO',
                address: 'Jl. Ir. H. Djuanda No. 310, Bandung',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA ANTAPANI',
                address: 'Griya Antapani, Jl. Purwakarta No.140, Antapani Kidul, Kec. Antapani, Kota Bandung, Jawa Barat 40291',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG GRIYA UJUNGBERUNG',
                address: 'Jl. A.H. Nasution, Pasirjati, Kec. Ujung Berung, Kota Bandung, Jawa Barat 45474',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG BRAGA CITYWALK',
                address: 'GF Jl. Braga No.99-101, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG PVJ',
                address: 'Concourse Level, unit no CL-08A Jl. Sukajadi No. 131-139 Bandung 40162',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA BOJONGSOANG',
                address: 'Jl. Terusan Buah Batu No.333, Cipagalo, Kec. Bojongsoang, Bandung, Jawa Barat 40287',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG YOGYA MEKARWANGI',
                address: 'Jl. Mekar Utama, Mekarwangi, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40237',
                mapUrl: 'aa'
            },
            {
                name: 'CIBUBUR CIPUTRA MALL',
                address: 'Jl. Alternatif Cibubur No.KM, RW.04, Jatikarya, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435',
                mapUrl: 'aa'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR PAHLAWAN',
                address: 'Jl. Pahlawan No. 84, RT 01/RW 06, Bogor.',
                mapUrl: 'aa'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR YOGYA JUNCTION',
                address: 'Jl. Sawojajar No.12b, Yogya Bogor Junction, Lt. GF, Bogor',
                mapUrl: 'aa'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR BANGBARUNG',
                address: 'Ruko Harmoni, Jl. Bangbarung Raya No.1, Bantarjati, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16153',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR CIBINONG CITY MALL',
                address: 'Jl. Tegar Beriman No.1, Pakansari, Cibinong, Bogor, Jawa Barat 16915',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR LIPPO EKALOKASARI',
                address: 'Jl. Siliwangi No. 123, Lippo Ekalokasari, Lt. GF, Bogor',
                mapUrl: 'aa'
            },
            {
                name: 'BOGOR BOTANI SQUARE',
                address: 'Jl. Padjadjaran No. 69 - 71, Botani Square, Lt. 2, Bogor',
                mapUrl: 'aa'
            },
            {
                name: 'CIREBON WAHIDIN',
                address: 'Jl. Dr. Wahidin Sudirohusodo No. 68, Cirebon',
                mapUrl: 'aa'
            },
            {
                name: 'CIREBON SUMBER YOGYA',
                address: 'Yogya Kota Sumber, Jl. Pangeran Cakra Buana No.201, Kemantren, Kec. Sumber, Cirebon, Jawa Barat 45611',
                mapUrl: 'aa'
            },
            {
                name: 'CIREBON CSB',
                address: 'Jl. Dr. Cipto Mangunkusumo No. 26, Cirebon Superblock, Lt. GF, Cirebon',
                mapUrl: 'aa'
            },
            {
                name: 'DEPOK YOGYA',
                address: 'Jl. Tole Iskandar No.124, RT.01/RW.01, Mekar Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412 (lantai 1)',
                mapUrl: 'aa'
            },
            {
                name: 'CINERE MALL',
                address: 'Cinere Mall Lt.1 , Jl. Cinere Raya No.1, Pangkalan Jati, Kec. Cinere, Kota Depok, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'DEPOK MALL',
                address: 'DMALL Lt. 3 Jl. Raya Margonda Kav.88 Margonda – Depok, Jawa Barat',
                mapUrl: 'aa'
            },
            {
                name: 'CIBUBUR TSM',
                address: 'Jl. Alternatif Cibubur No.230, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454',
                mapUrl: 'aa'
            },
            {
                name: 'SUKABUMI YOGYA',
                address: 'Toserba Yogya Sukabumi, Jl. R. E. Martadinata No.3, Gunungparang, Kec. Cikole, Kota Sukabumi, Jawa Barat 43111',
                mapUrl: 'aa'
            },
            {
                name: 'TASIK YOGYA',
                address: 'Jl. KHZ. Mustofa No.122, Yudanagara, Kec. Cihideung, Tasikmalaya, Jawa Barat 46121',
                mapUrl: 'aa'
            },
            {
                name: 'TASIK YOGYA MITRA BATIK',
                address: 'Yogya Mitra Batik, Jl. R.E. Martadinata No.81-83, Cipedes, Kec. Cipedes, Tasikmalaya, Jawa Barat 46133',
                mapUrl: 'aa'
            },
        ]
    },
    {
        name: 'DI Yogyakarta',
        outlets: [
        {
                name: 'Kabobs PVJ',
                address: 'Lt. GF, Paris Van Java Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+PVJ'
            },
            {
                name: 'Kabobs Ciputra',
                address: 'Ciputra City',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Ciputra'
            },
            {
                name: 'Kabobs Grand Indonesia',
                address: 'Grand Indonesia Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Grand+Indonesia'
            },
        ]
    },
    {
        name: 'Banten',
        outlets: [
        {
                name: 'Kabobs PVJ',
                address: 'Lt. GF, Paris Van Java Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+PVJ'
            },
            {
                name: 'Kabobs Ciputra',
                address: 'Ciputra City',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Ciputra'
            },
            {
                name: 'Kabobs Grand Indonesia',
                address: 'Grand Indonesia Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Grand+Indonesia'
            },
        ]
    },
    {
        name: 'Jawa Timur',
        outlets: [
        {
                name: 'Kabobs PVJ',
                address: 'Lt. GF, Paris Van Java Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+PVJ'
            },
            {
                name: 'Kabobs Ciputra',
                address: 'Ciputra City',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Ciputra'
            },
            {
                name: 'Kabobs Grand Indonesia',
                address: 'Grand Indonesia Mall',
                mapUrl: 'https://maps.google.com/?q=Kabobs+Grand+Indonesia'
            },
        ]
    }
    ]

    const filteredRegions = computed(() => {
    if (!search.value) return lokasiData
    return lokasiData.filter((region) =>
        region.name.toLowerCase().includes(search.value.toLowerCase())
    )
    })
</script>

<style scoped>
    .lokasi-page {
        max-width: 1200px;
        margin: 0 auto;
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
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        border-bottom: 2px solid #fdd835;
        display: inline-block;
    padding-bottom: 4px;
    }

    .lokasi-card {
        min-height: 120px;
        border-radius: 10px;
        background-color: #FFD400;
        width: 310px;
        height: 255px;
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
        font-weight: 600;
    }

    .lihat-maps {
        color: #000000 !important;
        text-decoration: none;
    }

    .lihat-maps:hover {
        text-decoration: underline;
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
        border-bottom: 2px solid #fdd835; /* warna kuning highlight saat aktif */
    }

</style>
