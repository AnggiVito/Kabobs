import { defineStore } from 'pinia';

interface Outlet {
    name: string;
    address: string;
    mapUrl: string;
    showAddress?: boolean;
}

interface Region {
    name: string;
    outlets: Outlet[];
}

interface LokasiState {
    search: string;
    showSuggestions: boolean;
    lokasiData: Region[];
    suggestions: string[];
    isLoading: boolean;
    error: string | null;
}

const initialLokasiData: Region[] = [
    {
        name: 'DKI JAKARTA',
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
                mapUrl: 'https://maps.app.goo.gl/LSH1bACNkha5rnGg8'
            },
            {
                name: 'JAKARTA GANDARIA CITY',
                address: 'Jakarta Gandaria City Lt LG - 107B Jl. Sultan Iskandar Muda, Gandaria Kec. Kebayoran Lama Kota Jakarta Selatan Daerah Khusus Ibukota Jakarta 12240',
                mapUrl: 'https://maps.app.goo.gl/2ZsNJZr5rigNvc9PA'
            },
            {
                name: 'JAKARTA PLAZA FESTIVAL',
                address: 'Jl. H. R. Rasuna Said No.22 Kav. C UGK-10, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940',
                mapUrl: 'https://maps.app.goo.gl/UfFryedzbQY77cpEA'
            },
            {
                name: 'JAKARTA BLOK M',
                address: 'Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, 12160, DKI Jakarta.',
                mapUrl: 'https://maps.app.goo.gl/5XGC3DtQpSaqarjb8'
            },
            {
                name: 'JAKARTA PONDOK INDAH MALL',
                address: 'Street Gallery Pondok Indah Mall Jakarta Lantai 1 No. B 103B Jalan Metro Pondok Indah Kav. IV, Daerah Khusus Ibukota Jakarta',
                mapUrl: 'https://maps.app.goo.gl/zHjnuT5AY9TatdxZ9'
            },
            {
                name: 'JAKARTA THE PARK PEJATEN',
                address: 'Pejaten Village Lt.2, Jl. Warung Jati Barat No.39, RT.1/RW.5, Jati Padang, Kec. Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12550',
                mapUrl: 'https://maps.app.goo.gl/noT4q8NXfTWQjEhF9'
            },
            {
                name: 'JAKARTA TAMINI SQUARE',
                address: 'Jl. Taman Mini I, RT.3/RW.2, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13560',
                mapUrl: 'https://maps.app.goo.gl/3cinLC2RySam3PBZA'
            },
            {
                name: 'JAKARTA PLAZA KRAMAT JATI',
                address: 'Lippo Plaza Kramat Jati Lt. GF Jl. Al Amin I No.13, RW.6, Kramat Jati, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13510',
                mapUrl: 'https://maps.app.goo.gl/tuaqqjhAPfDT5wDA6'
            },
            {
                name: 'JAKARTA BASSURA MALL',
                address: 'Jl. Jend. Basuki Rachmat No.1A, RW.10, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13410',
                mapUrl: 'https://maps.app.goo.gl/eGKtd4Er54TSHcDD6'
            },
            {
                name: 'JAKARTA PGC',
                address: 'Pusat Grosir Cililitan Lt. Ground Jl. Mayjen Sutoyo No.76, RW.11, Cililitan, Kec. Kramat jati, Kota Jakarta Timur',
                mapUrl: 'https://maps.app.goo.gl/Vbi1qqbgEAtWLppE6'
            },
            {
                name: 'JAKARTA CONDET',
                address: 'Jl. Condet Raya No. 1B, RT 005/03 Kel. Balekembang, Kec. Kramatjati, Jakarta Timur',
                mapUrl: 'https://maps.app.goo.gl/uTCjXM6JvDAVqNYv5'
            },
            {
                name: 'JAKARTA MAL CIJANTUNG',
                address: 'Lantai Dasar Unit No 50 Jl . Pendidikan I No 1, RT.1/RW.4, Cijantung, Kec. Ps Rebo Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13770',
                mapUrl: 'https://maps.app.goo.gl/Fj1U3VZqn17va73p6'
            },
            {
                name: 'CIBUBUR JUNCTION MALL',
                address: 'Jl. Jambore No.1, RW.7, Cibubur, Kec. Ciracas, Kota Jakarta Timur 13720',
                mapUrl: 'https://maps.app.goo.gl/KgB93Ux8nWANbByM6'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    },
    {
        name: 'JAWA BARAT',
        outlets: [
            {
                name: 'BANDUNG GRIYA CICALENGKA',
                address: 'Griya Cicalengka, Jl. Raya Barat Cicalengka No.315, Cicalengka Kulon, Kec. Cicalengka, Kab.Bandung, Jawa Barat 40395',
                mapUrl: 'https://maps.app.goo.gl/cenhmbpubjkdTnxG7'
            },
            {
                name: 'BANDUNG YOGYA SOREANG',
                address: 'Yogya Soreang Lantai 3 Area Foodcourt Jl. Raya Lingkar Gading Tutuka RT 01/010 Desa Cingcin Kecamatan Soreang Kabupaten Bandung',
                mapUrl: 'https://maps.app.goo.gl/B26ZEx2NfhrjNYZU8'
            },
            {
                name: 'BANDUNG GRIYA GRAND MAJALAYA',
                address: 'Jl. Tengah No.132, Majalaya, Kec. Majalaya, Bandung, Jawa Barat 40382',
                mapUrl: 'https://maps.app.goo.gl/KFj4ERcLYaHWQraQ7'
            },
            {
                name: 'BANDUNG CIMAHI',
                address: 'Jl. Jend. H. Amir Machmud No.482, Padasuka, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40526',
                mapUrl: 'https://maps.app.goo.gl/qUdJYn2ofrT6eGNY7'
            },
            {
                name: 'BANDUNG PADALARANG',
                address: 'Jl. Raya Padalarang No.108C, Kertamulya, Padalarang, Kabupaten Bandung Barat, Jawa Barat 40553',
                mapUrl: 'https://maps.app.goo.gl/ThTg5Sdxkf9YDXJT6'
            },
            {
                name: 'BANDUNG YOGYA LEMBANG',
                address: 'Yogya Lembang, Jl. Raya Lembang No.416, Kayuambon, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391',
                mapUrl: 'https://maps.app.goo.gl/xb4HJ9Xzj6Bwjfbb9'
            },
            {
                name: 'BEKASI LIPPO MALL CIKARANG',
                address: 'Lippo Mall Cikarang Lantai GF #29G',
                mapUrl: 'https://maps.app.goo.gl/3mqKvFPg49wbb1fr5'
            },
            {
                name: 'BEKASI LIVING WORLD GRAND WISATA',
                address: 'Jl. Celebration Boulevard Kav. 1 Lambangjaya-Tambun selatan, Bekasi',
                mapUrl: 'https://maps.app.goo.gl/atSSE4Mbn82TqEaD7'
            },
            {
                name: 'CIBUBUR LIVING WORLD',
                address: 'Living World Cibubur Kota Wisata Jl. Boulevard Kota Wisata, Ciangsana, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 16968 (FC - 18 – Third Floor)',
                mapUrl: 'https://maps.app.goo.gl/um1rqBiEjWi8TrAz8'
            },
            {
                name: 'CIANJUR YOGYA',
                address: 'Yogya Cianjur, Jl. Arif Rahman Hakim No.56A, Solokpandan, Kec. Cianjur, Kabupaten Cianjur, Jawa Barat 43214',
                mapUrl: 'https://maps.app.goo.gl/wGU9szm9WzkTDoz59'
            },
            {
                name: 'GARUT YOGYA',
                address: 'Jl. Siliwangi No.21, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat 44114',
                mapUrl: 'https://maps.app.goo.gl/tP7YsitQSSYw6PEj8'
            },
            {
                name: 'JATIBARANG YOGYA',
                address: 'Toserba Yogya Jatibarang, Jl. Siliwangi No.N0 28, Jatibarang Baru, Kec. Jatibarang, Kabupaten Indramayu, Jawa Barat 45273',
                mapUrl: 'https://maps.app.goo.gl/dAsnnNX9GLB3b6fp7'
            },
            {
                name: 'CIKAMPEK YOGYA',
                address: 'Yogya Cikampek, Jl. A.H YANI No.108, Cikampek Kota, Cikampek, Karawang Regency, West Java 41373',
                mapUrl: 'https://maps.app.goo.gl/Pu9V4esXej65KeTN9'
            },
            {
                name: 'KARAWANG YOGYA GRAND',
                address: 'Jl. Kertabumi No.43, RT.1/RW.19, Karawang Kulon, Kec. Karawang Bar., Kabupaten Karawang, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/UcDd4uLRN5XyhSEP9'
            },
            {
                name: 'KUNINGAN YOGYA CIJOHO',
                address: 'Yogya Cijoho, Jl. RE. Martadinata No.93, Cijoho, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45512',
                mapUrl: 'https://maps.app.goo.gl/zqD5aQqrfFACb2Yj9'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'https://maps.app.goo.gl/mWeyUQnKQtffy89B6'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'https://maps.app.goo.gl/C3KiZZVFsJZdpokR8'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/bAJ6fjtcMb9R8ART6'
            },
            {
                name: 'SUMEDANG GRIYA',
                address: 'Jl. Mayor Abdurahman No.163, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45322',
                mapUrl: 'https://maps.app.goo.gl/rSQLWBiA8Rc4XVA37'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'https://maps.app.goo.gl/C3KiZZVFsJZdpokR8'
            },
            {
                name: 'BANDUNG TENTH AVENUE',
                address: 'Lantai 1 Unit L1-12 Luas 26 m2 Jl. Soekarno-Hatta No.526, Cijaura, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286',
                mapUrl: 'https://maps.app.goo.gl/LB8VfwK6qNiEP4hK7'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'https://maps.app.goo.gl/68KGDt5TBwsK6i3H7'
            },
            {
                name: 'BANDUNG BEC ATAS',
                address: 'Jl. Purnawarman No. 13 - 15, Bandung Electronic Center, Lt. 3, Bandung',
                mapUrl: 'https://maps.app.goo.gl/TojWqHKZjXeTnHXq6'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/yM4f3Zz6bfHvuURr6'
            },
            {
                name: 'OUTLET EVENT BDG 1',
                address: 'BDG 1',
                mapUrl: 'aa'
            },
            {
                name: 'BANDUNG DBOTANICA',
                address: 'Jl. Dr. Djundjunan No. 143 - 149, BTC Fashion Mall, Lt. LGF, Bandung',
                mapUrl: 'https://maps.app.goo.gl/ymHr3gQ1v35QEUJf7'
            },
            {
                name: 'BANDUNG GRIYA DERWATI',
                address: 'Jl. Raya Derwati No.45A, Derwati, Kec. Rancasari, Kota Bandung, Jawa Barat 40292',
                mapUrl: 'https://maps.app.goo.gl/6emT7NhVDmezH1cv5'
            },
            {
                name: 'BANDUNG SINDANGLAYA',
                address: 'Gg. M.H Syarief No.26, Sukamiskin, Kec. Arcamanik, Kota Bandung, Jawa Barat 40291',
                mapUrl: 'https://maps.app.goo.gl/QBdwXnH72AtH2Vmt7'
            },
            {
                name: 'BANDUNG GRIYA TAMAN KOPO INDAH',
                address: 'Ruko 1B, Jl. Taman Kopo Indah No.2 no. 1, RT.03/RW.I4, Rahayu, Kec. Margaasih, Kabupaten Bandung, Jawa Barat 40218',
                mapUrl: 'https://maps.app.goo.gl/i1Nf4Gu195pSqDwY7'
            },
            {
                name: 'BANDUNG CIWALK BELAKANG',
                address: 'Jl Cihampelas No. 160 Bandung',
                mapUrl: 'https://maps.app.goo.gl/uoj1gi7Hd8QJbsML7'
            },
            {
                name: 'BANDUNG BIP ATAS',
                address: 'Jl. Merdeka No. 56, Bandung Indah Plaza, Lt. 3',
                mapUrl: 'https://maps.app.goo.gl/WBeDgc6N6XVmZHKz9'
            },
            {
                name: 'BANDUNG IP BAWAH',
                address: 'Jl Pasir Kaliki No. 121 - 123 Bandung',
                mapUrl: 'https://maps.app.goo.gl/yjKkhL5YC8Gbt9gq8'
            },
            {
                name: 'BANDUNG BURANGRANG',
                address: 'Jl. Burangrang No. 36 (In & Out Eatery), Bandung',
                mapUrl: 'https://maps.app.goo.gl/gyUUaj2cD3X94wT58'
            },
            {
                name: 'BANDUNG FESLINK BAWAH',
                address: 'Jl. Peta No. 241, Mall Festival Citylink, Lt. LG',
                mapUrl: 'https://maps.app.goo.gl/y7iKAX7GYzHo2Whu9'
            },
            {
                name: 'BANDUNG MIKO MALL',
                address: 'Jl. KH. Wahid Hasyim No. 599, Miko Mall, Lt. GF, Bandung',
                mapUrl: 'https://maps.app.goo.gl/frtEhdaQ8MfKC7Ps6'
            },
            {
                name: 'BANDUNG YOGYA SUMBERSARI',
                address: 'Yogya Cijoho, Jl. RE. Martadinata No.93, Cijoho, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45512',
                mapUrl: 'https://maps.app.goo.gl/SR22UjEZg3ne3rJdA'
            },
            {
                name: 'BANDUNG DIPATIUKUR',
                address: 'Jl. Dipatiukur No. 96, Bandung',
                mapUrl: 'https://maps.app.goo.gl/eEG5eDwxF6mFGVQ36'
            },
            {
                name: 'BANDUNG JATOS',
                address: 'Jl. Raya Jatinangor No. 150, Jatinangor Town Square, Lt. FF Ext, Kec. Sumedang',
                mapUrl: 'https://maps.app.goo.gl/WTKYiYWt5UKX26DT8'
            },
            {
                name: 'BANDUNG CIWALK DEPAN',
                address: 'Jl Cihampelas No. 160 Bandung',
                mapUrl: 'https://maps.app.goo.gl/aQCodwksFVeobTSx8'
            },
            {
                name: 'BANDUNG GRIYA BUAH BATU',
                address: 'Griya Buah Batu, Jl. Buah Batu No.183-185, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264',
                mapUrl: 'https://maps.app.goo.gl/CwHWMe2ETNwUTFcD7'
            },
            {
                name: 'BANDUNG GRIYA CINUNUK',
                address: 'Griya Cinunuk, Jl. Raya Tagog Cinunuk No.187, Cimekar, Cileunyi, Bandung, Jawa Barat 40623',
                mapUrl: 'https://maps.app.goo.gl/MHj3iTqabvG54KE3A'
            },
            {
                name: 'BANDUNG YOGYA KEPATIHAN',
                address: 'Yogya Kepatihan, Jl. Kepatihan No.18, Balonggede, Kec. Regol, Kota Bandung, Jawa Barat 40251',
                mapUrl: 'https://maps.app.goo.gl/Ru4goX2v19e9HzXKA'
            },
            {
                name: 'BANDUNG YOGYA SUNDA',
                address: 'Yogya Sunda, Jl. Sunda No.60, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112',
                mapUrl: 'https://maps.app.goo.gl/NTHc3cbXCHhw6jJUA'
            },
            {
                name: 'BANDUNG DAGO',
                address: 'Jl. Ir. H. Djuanda No. 310, Bandung',
                mapUrl: 'https://maps.app.goo.gl/C7DKHAqt88UFPSwq5'
            },
            {
                name: 'BANDUNG GRIYA ANTAPANI',
                address: 'Griya Antapani, Jl. Purwakarta No.140, Antapani Kidul, Kec. Antapani, Kota Bandung, Jawa Barat 40291',
                mapUrl: 'https://maps.app.goo.gl/6vHjvypm4kPdq4s27'
            },
            {
                name: 'BANDUNG GRIYA UJUNGBERUNG',
                address: 'Jl. A.H. Nasution, Pasirjati, Kec. Ujung Berung, Kota Bandung, Jawa Barat 45474',
                mapUrl: 'https://maps.app.goo.gl/EgFKv9neGkk5byF96'
            },
            {
                name: 'BANDUNG BRAGA CITYWALK',
                address: 'GF Jl. Braga No.99-101, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111',
                mapUrl: 'https://maps.app.goo.gl/TpGARjbsAHW38hM89'
            },
            {
                name: 'BANDUNG PVJ',
                address: 'Concourse Level, unit no CL-08A Jl. Sukajadi No. 131-139 Bandung 40162',
                mapUrl: 'https://maps.app.goo.gl/UymFnEssJnJaR4EU7'
            },
            {
                name: 'BANDUNG YOGYA BOJONGSOANG',
                address: 'Jl. Terusan Buah Batu No.333, Cipagalo, Kec. Bojongsoang, Bandung, Jawa Barat 40287',
                mapUrl: 'https://maps.app.goo.gl/AM5iwcG3ZyMuHBsg9'
            },
            {
                name: 'BANDUNG YOGYA MEKARWANGI',
                address: 'Jl. Mekar Utama, Mekarwangi, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40237',
                mapUrl: 'https://maps.app.goo.gl/MiFQEHDLoyYzsDbz6'
            },
            {
                name: 'CIBUBUR CIPUTRA MALL',
                address: 'Jl. Alternatif Cibubur No.KM, RW.04, Jatikarya, Kec. Jatisampurna, Kota Bekasi, Jawa Barat 17435',
                mapUrl: 'https://maps.app.goo.gl/oeRybHf7K8SW7B6L6'
            },
            {
                name: 'PURWAKARTA YOGYA',
                address: 'Yogya Purwakarta, Jl. Jend. Sudirman No. 5, Nagri Tengah, Purwakarta',
                mapUrl: 'https://maps.app.goo.gl/vTWt4a1o4u1V7xhD7'
            },
            {
                name: 'BOGOR PAHLAWAN',
                address: 'Jl. Pahlawan No. 84, RT 01/RW 06, Bogor.',
                mapUrl: 'https://maps.app.goo.gl/s7KSqm1dzaiqZA3w6'
            },
            {
                name: 'SUMEDANG ASIA PLAZA',
                address: 'Asia Plaza Sumedang Lt.GF, Jl. Mayor Abdurahman No.225, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/haFH5JYKczF7frT4A'
            },
            {
                name: 'BOGOR YOGYA JUNCTION',
                address: 'Jl. Sawojajar No.12b, Yogya Bogor Junction, Lt. GF, Bogor',
                mapUrl: 'https://maps.app.goo.gl/hFDrvG23fy5TEK1n9'
            },
            {
                name: 'SUBANG GRIYA',
                address: 'Griya Subang, Jln. OttoIskandardinata Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211',
                mapUrl: 'https://maps.app.goo.gl/gPZJSorCamkeykAs6'
            },
            {
                name: 'BOGOR BANGBARUNG',
                address: 'Ruko Harmoni, Jl. Bangbarung Raya No.1, Bantarjati, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16153',
                mapUrl: 'https://maps.app.goo.gl/YnLyDKJUfFVPh3g48'
            },
            {
                name: 'BOGOR CIBINONG CITY MALL',
                address: 'Jl. Tegar Beriman No.1, Pakansari, Cibinong, Bogor, Jawa Barat 16915',
                mapUrl: 'https://maps.app.goo.gl/3QJRrLBWJ8jokfZj8'
            },
            {
                name: 'BOGOR LIPPO EKALOKASARI',
                address: 'Jl. Siliwangi No. 123, Lippo Ekalokasari, Lt. GF, Bogor',
                mapUrl: 'https://maps.app.goo.gl/Pn96tfAxquyXnwqy8'
            },
            {
                name: 'BOGOR BOTANI SQUARE',
                address: 'Jl. Padjadjaran No. 69 - 71, Botani Square, Lt. 2, Bogor',
                mapUrl: 'https://maps.app.goo.gl/sn6C3YZ7gMmigykU8'
            },
            {
                name: 'BOGOR YOGYA DRAMAGA',
                address: 'Yogya Grand Dramaga, Jl. Raya Dramaga No.30, RT.03/RW.02, Margajaya, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16116',
                mapUrl: 'https://maps.app.goo.gl/LVJc5f864MB69sQ28'
            },
            {
                name: 'CIREBON YOGYA JUNCTION',
                address: 'Jl. Kartini No. 26, Yogya Cirebon Junction, lobby utama, Cirebon',
                mapUrl: 'https://maps.app.goo.gl/uiaebF7jhBojGSEQ9'
            },
            {
                name: 'CIREBON YOGYA GRAND',
                address: 'Yogya Grand Cirebon, Jl. Karanggetas No.64, Pekalangan, Kec. Pekalipan, Kota Cirebon, Jawa Barat 45118',
                mapUrl: 'https://maps.app.goo.gl/Eh2Jyb8GzgG9cRDu6'
            },
            {
                name: 'CIREBON WAHIDIN',
                address: 'Jl. Dr. Wahidin Sudirohusodo No. 68, Cirebon',
                mapUrl: 'https://maps.app.goo.gl/Fs9qUxPQnUu9rghi9'
            },
            {
                name: 'CIREBON SUMBER YOGYA',
                address: 'Yogya Kota Sumber, Jl. Pangeran Cakra Buana No.201, Kemantren, Kec. Sumber, Cirebon, Jawa Barat 45611',
                mapUrl: 'https://maps.app.goo.gl/fQkz82kH26t4mxWe9'
            },
            {
                name: 'CIREBON CSB',
                address: 'Jl. Dr. Cipto Mangunkusumo No. 26, Cirebon Superblock, Lt. GF, Cirebon',
                mapUrl: 'https://maps.app.goo.gl/bbHPTHEvS99q33He8'
            },
            {
                name: 'DEPOK YOGYA',
                address: 'Jl. Tole Iskandar No.124, RT.01/RW.01, Mekar Jaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412 (lantai 1)',
                mapUrl: 'https://maps.app.goo.gl/v6Bpea5Aa1q4sdqk9'
            },
            {
                name: 'CINERE MALL',
                address: 'Cinere Mall Lt.1 , Jl. Cinere Raya No.1, Pangkalan Jati, Kec. Cinere, Kota Depok, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/BaiKyB8BQqxJjJQs7'
            },
            {
                name: 'DEPOK MALL',
                address: 'DMALL Lt. 3 Jl. Raya Margonda Kav.88 Margonda – Depok, Jawa Barat',
                mapUrl: 'https://maps.app.goo.gl/hWnQm798rJ2nBgHo8'
            },
            {
                name: 'CIBUBUR TSM',
                address: 'Jl. Alternatif Cibubur No.230, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454',
                mapUrl: 'https://maps.app.goo.gl/UXPcxBzBmdunVC8R9'
            },
            {
                name: 'SUKABUMI YOGYA',
                address: 'Toserba Yogya Sukabumi, Jl. R. E. Martadinata No.3, Gunungparang, Kec. Cikole, Kota Sukabumi, Jawa Barat 43111',
                mapUrl: 'https://maps.app.goo.gl/PdFoDQ47f4tTu7D1A'
            },
            {
                name: 'TASIK YOGYA',
                address: 'Jl. KHZ. Mustofa No.122, Yudanagara, Kec. Cihideung, Tasikmalaya, Jawa Barat 46121',
                mapUrl: 'https://maps.app.goo.gl/F5swYQoJ21qoP8T46'
            },
            {
                name: 'TASIK YOGYA MITRA BATIK',
                address: 'Yogya Mitra Batik, Jl. R.E. Martadinata No.81-83, Cipedes, Kec. Cipedes, Tasikmalaya, Jawa Barat 46133',
                mapUrl: 'https://maps.app.goo.gl/KYkoRtShN3DcTRnz5'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    },
    {
        name: 'JAWA TENGAH',
        outlets: [
            {
                name: 'BREBES YOGYA',
                address: 'Toserba Yogya Brebes, Jl. Jenderal Sudirman No.109, Kaumanpasar, Brebes, Kec. Brebes, Kabupaten Brebes, Jawa Tengah 52212',
                mapUrl: 'https://maps.app.goo.gl/LRgFAUAkRX2JGxpX9'
            },
            {
                name: 'SOLO PAKUWON MALL SOLO BARU',
                address: 'Jl. Ir. Soekarno, Dusun II, Madegondo, Kec. Grogol, Kabupaten Sukoharjo, Jawa Tengah 57552 (basement 1 unit K-16)',
                mapUrl: 'https://maps.app.goo.gl/h9CgyrSuMBcC8Sxw6'
            },
            {
                name: 'PEKALONGAN YOGYA',
                address: 'Yogya Pekalongan, Jl. DR. Cipto Mangunkusumo no. 63 Poncol, Kec. Pekalongan Tim., Kota Pekalongan, Jawa Tengah 51122',
                mapUrl: 'https://maps.app.goo.gl/fE9k5BXJBL3CaJA56'
            },
            {
                name: 'SEMARANG DP MALL',
                address: 'DP Mall Semarang Jl. Pemuda No.150, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132 (Lantai Dua No Unit : 2.FC.09)',
                mapUrl: 'https://maps.app.goo.gl/9DD1wy718bkTXsvYA'
            },
            {
                name: 'SEMARANG JAVA MALL',
                address: 'Java Supermall Lt. Foodcourt, Jl. Taman Sompok, Lamper Lor, Kec. Semarang Sel., Kota Semarang, Jawa Tengah',
                mapUrl: 'https://maps.app.goo.gl/PVwRE67UNj3bj4hw5'
            },
            {
                name: 'SEMARANG PARAGON',
                address: 'Paragon Mall Semarang, Jl. Pemuda No.118, Sekayu, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah',
                mapUrl: 'https://maps.app.goo.gl/KBRWz2Kq4zGBeLEw9'
            },
            {
                name: 'SOLO PARAGON MALL',
                address: 'Jl. Yosodipuro No.133. Solo Paragon Mall Lt. RF , Surakarta, Jawa Tengah',
                mapUrl: 'https://maps.app.goo.gl/v4s3GMiFPAkT7RwT6'
            },
            {
                name: 'TEGAL YOGYA',
                address: 'Toserba Yogya Tegal, Jl. AR. Hakim No.16, Randugunting, Kec. Tegal Sel., Kota Tegal, Jawa Tengah 52131',
                mapUrl: 'https://maps.app.goo.gl/MSWtQwaZkfzXFiCe8'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    },
    {
        name: 'DI YOGYAKARTA',
        outlets: [
            {
                name: 'JOGJA GODEAN',
                address: 'Ruko Godean Jl. Godean km 1, Dusun Sumberan RT 04, Kel. Ngestiharjo, Kec. Kasihan, Kab. Bantul',
                mapUrl: 'https://maps.app.goo.gl/9gU6aS1qtHQzcxtt6'
            },
            {
                name: 'YOGYA KITCHEN KALIURANG',
                address: 'Jl. Kaliurang KM 5,6 No. 15, Manggung, Caturtunggal, Kec. Depok, Kab. Sleman, Yogyakarta 55281',
                mapUrl: 'https://maps.app.goo.gl/RQQ74rTrTQmwd2Y26'
            },
            {
                name: 'YOGYA TAMANSISWA',
                address: 'Jl. Taman Siswa No.92-86, Wirogunan, Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151, Indonesia',
                mapUrl: 'https://maps.app.goo.gl/gawiV4aJptjg57n46'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    },
    {
        name: 'Banten',
        outlets: [
            {
                name: 'TANGERANG BINTARO SEKTOR 5',
                address: 'JL. PERSIL BLOK EA. 2/57 JURANGMANGU TIMUR, PONDOK AREN – KAB. TANGERANG',
                mapUrl: 'https://maps.app.goo.gl/rbCfgNYcQZJA9vAe7'
            },
            {
                name: 'TANGERANG MALL ALAM SUTERA',
                address: 'Mall Alam Sutera Jl. Jalur Sutera Barat Kav 16, Kel. Panunggangan Timur, Kec. Pinang, Kota Tangerang 15143',
                mapUrl: 'https://maps.app.goo.gl/44tApD9meos4NJqg7'
            },
            {
                name: 'TANGERANG FRESH MARKET BINTARO',
                address: 'Jl. Taman Siswa No.92-86, Wirogunan, Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151, Indonesia',
                mapUrl: 'https://maps.app.goo.gl/b8YJqoLK5tyMzcMp9'
            },
            {
                name: 'TANGERANG ITC BSD',
                address: 'Jl. Pahlawan Seribu No.12, Lengkong Wetan, Kec. Serpong, Kota Tangerang Selatan, Banten 15310',
                mapUrl: 'https://maps.app.goo.gl/eh8i2cdM5RZRVc5H6'
            },
            {
                name: 'TANGERANG BINTARO TRANSPARK',
                address: 'Bintaro Jaya, Jl. Boulevard Bintaro Jaya, Pd. Jaya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15220',
                mapUrl: 'https://maps.app.goo.gl/eQA6GazZznPVfgzk8'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    },
    {
        name: 'Jawa Timur',
        outlets: [
            {
                name: 'GRESIK GRESSMALL',
                address: 'GressMall Lt.GF, Jl. Sumatra No.1-5, Gn. Malang, Randuagung, Kec. Kebomas, Kabupaten Gresik, Jawa Timur',
                mapUrl: 'https://maps.app.goo.gl/6oAqFJt8fLYPpUmy9'
            },
            {
                name: 'SIDOARJO LIPPO PLAZA',
                address: 'Jl. Jati Raya No.1, Jati, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61226',
                mapUrl: 'https://maps.app.goo.gl/8vAcAGPJvYbKTxZE6'
            },
            {
                name: 'MALANG TOWN SQUARE',
                address: 'Jl. Veteran No.2, Penanggungan, Kec. Klojen, Kota Malang, Jawa Timur 65111',
                mapUrl: 'https://maps.app.goo.gl/4B3sXTS3xzxCYATq5'
            },
            {
                name: 'SURABAYA PAKUWON CITY MALL',
                address: 'Pakuwon City, Jl. Raya Laguna KJW Putih Tambak No.2, Kejawaan Putih Tamba, Kec. Mulyorejo, Kota SBY, Jawa Timur',
                mapUrl: 'https://maps.app.goo.gl/SyBLFwqobWGi91pw9'
            },
            {
                name: 'SURABAYA BG JUNCTION',
                address: 'Jl. Bubutan No.1-7, Sawahan, Kec. Sawahan, Kota SBY, Jawa Timur',
                mapUrl: 'https://maps.app.goo.gl/6PuWpUKubvrMUUk87'
            },
            {
                name: 'SURABAYA PLAZA',
                address: 'Plaza Surabaya, Embong Kaliasin, Kec. Genteng, Kota SBY, Jawa Timur',
                mapUrl: 'https://maps.app.goo.gl/ngChZvQo4U1NKEnM9'
            },
            {
                name: 'SURABAYA ROYAL PLAZA',
                address: 'Jl. A. Yani No.16-18, Wonokromo, Kec. Wonokromo, Kota SBY, Jawa Timur',
                mapUrl: 'https://maps.app.goo.gl/cnM9ueF8WhYUBBLu9'
            },
        ].map(outlet => ({ ...outlet, showAddress: false })),
    }
];

export const useLokasiStore = defineStore('lokasi', {
    state: (): LokasiState => ({
        search: '',
        showSuggestions: false,
        suggestions: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Banten', 'Jawa Timur'],
        lokasiData: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        filteredSuggestions: (state) => {
            const searchTerm = state.search.toLowerCase();
            return state.suggestions.filter((s) =>
                s.toLowerCase().includes(searchTerm)
            );
        },
        filteredRegions: (state) => {
            const searchTerm = state.search.toLowerCase();
            if (!searchTerm) return state.lokasiData;

            const filtered = state.lokasiData.map(region => {
                const filteredOutlets = region.outlets.filter(outlet =>
                    outlet.name.toLowerCase().includes(searchTerm) ||
                    outlet.address.toLowerCase().includes(searchTerm)
                );

                if (region.name.toLowerCase().includes(searchTerm) || filteredOutlets.length > 0) {
                    return {
                        ...region,
                        outlets: filteredOutlets.length > 0 ? filteredOutlets : region.outlets
                    };
                }
                return null;
            }).filter((region): region is Region => region !== null);

            return filtered.map(region => {
                if (region.name.toLowerCase().includes(searchTerm)) {
                    return {
                        ...region,
                        outlets: state.lokasiData.find(r => r.name === region.name)?.outlets || []
                    };
                }
                return region;
            });
        },
    },

    actions: {
        setSearch(value: string | number | null) {
            this.search = value !== null ? String(value) : '';
        },
        setShowSuggestions(value: boolean) {
            this.showSuggestions = value;
        },
        selectSuggestion(s: string) {
            this.search = s;
            this.showSuggestions = false;
        },
        doSearch() {
            this.showSuggestions = false;
        },
        handleBlur() {
            setTimeout(() => {
                this.showSuggestions = false;
            }, 200);
        },
        toggleAddressVisibility(outletName: string, regionName: string) {
            const region = this.lokasiData.find(r => r.name === regionName);
            if (region) {
                const outlet = region.outlets.find(o => o.name === outletName);
                if (outlet) {
                    outlet.showAddress = !outlet.showAddress;
                }
            }
        },

        async fetchLokasiData() {
            this.isLoading = true;
            this.error = null;
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                this.lokasiData = initialLokasiData.map(region => ({
                    ...region,
                    outlets: region.outlets.map(outlet => ({ ...outlet, showAddress: false }))
                }));

            } catch (err: unknown) {
                if (err instanceof Error) {
                    this.error = `Gagal mengambil data lokasi: ${err.message}`;
                } else {
                    this.error = 'Gagal mengambil data lokasi: Terjadi kesalahan yang tidak diketahui.';
                }
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },
    },
});