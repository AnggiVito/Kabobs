<template>
    <div class="promo-container">
        <h1 class="text-h4 text-center q-mb-lg">Semua Promo</h1>

        <div class="row q-col-gutter-xl q-row-gutter-xl justify-center">
            <div
                v-for="(promo, index) in promos"
                :key="index"
                class="col-xs-6 col-sm-6 col-md-6" >
                <q-card class="q-pa-none shadow-2">
                    <div class="promo-image-wrapper">
                        <q-img :src="promo.image" class="promo-image" />
                    </div>
                    <q-card-section>
                        <div class="text-h6 q-mb-xs">{{ promo.title }}</div>
                        <div class="text-body2 text-grey-8 q-mb-sm">
                        {{ promo.description }}
                        </div>
                        <div class="text-caption text-grey-7 q-mb-md">
                        Expired date: <b>{{ promo.expired }}</b>
                        </div>

                        <div class="row items-center q-gutter-sm">
                            <div
                                v-for="(platform, i) in promo.platforms"
                                :key="i"
                                class="row items-center q-gutter-xs"
                            >
                                <q-img
                                :src="platform.logo"
                                style="width: 24px; height: 24px"
                                />
                                <span class="text-caption">{{ platform.text }}</span>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
    <FooterLayout />
</template>

<script setup lang="ts">
    import FooterLayout from 'src/layouts/FooterLayout.vue';
    const promos = [
        {
            image: "/images/PromoKresso.png",
            title: "Harga spesial untuk Add-On Kresso",
            description: "Harga spesial untuk Add-On Kresso senilai Rp.5.454* (harga belum termasuk pajak, harga normal Rp.9090*) disertai pembelian kebab variant apa saja. Syarat & Ketentuan berlaku.",
            expired: "31 Juli 2025",
            platforms: [
                { logo: "/icons/DineIn.png", text: "All Outlet" },
                { logo: "/icons/Delivery.png", text: "All Outlet" },
                { logo: "/icons/TakeAway.png", text: "All Outlet" },
            ],
        },
        {
            image: "/images/PromoIftar.png",
            title: "Combo Iftar",
            description: "Kebab Rendang Salero hadir dengan cita rasa rempah otentik khas Payakumbuh, dibuat dari resep turun-temurun yang kaya bumbu dan dimasak dengan teknik terbaik!",
            expired: "30 Agustus 2025",
            platforms: [
                { logo: "/icons/DineIn.png", text: "All Outlet" },
                { logo: "/icons/Delivery.png", text: "All Outlet" },
                { logo: "/icons/TakeAway.png", text: "All Outlet" },
            ],
        },
        {
            image: "/images/PromoTnT.png",
            title: "Kabobs Taste & Treats: bundling Kebab + Merch",
            description: "Official Merchandise dari KABOBS udah hadir loh! Lucu, gemesin, dan pastinya wajib kamu punya! Yup, ini dia *Kabobs Taste & Treats: bundling kebab + merch edisi spesial!*",
            expired: "31 Desember 2025",
            platforms: [
                { logo: "/icons/DineIn.png", text: "All Outlet" },
                { logo: "/icons/Delivery.png", text: "All Outlet" },
                { logo: "/icons/TakeAway.png", text: "All Outlet" },
            ],
        },
    ];
</script>

<style scoped>
    .text-h4 {
        font-weight: 600;
        margin-top: 0px;
        font-size: 40px;
    }

    .promo-container {
        padding: 40px 80px;
    }

    .q-card {
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .q-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .promo-image-wrapper {
        padding: 20px;
        box-sizing: border-box;
    }

    .promo-image {
        width: 100%;
        height: auto;
        border-radius: 12px;
        object-fit: cover;
    }

    @media (max-width: 767px) {
        .promo-container {
            padding: 20px 15px;
        }
        .row.q-col-gutter-xl.q-row-gutter-xl {
            margin-left: -10px;
            margin-right: -10px;
            margin-top: -10px;
        }
        .row.q-col-gutter-xl.q-row-gutter-xl > div {
            padding-left: 10px;
            padding-top: 10px;
        }
        .text-h4 {
            font-size: 32px;
            margin-bottom: 20px;
        }
        .q-card .text-h6 {
            font-size: 18px;
        }
        .q-card .text-body2 {
            font-size: 14px;
        }
        .q-card .text-caption {
            font-size: 12px;
        }
        .q-img[style="width: 24px; height: 24px;"] {
            width: 20px !important;
            height: 20px !important;
        }
    }
</style>