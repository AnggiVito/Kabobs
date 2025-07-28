<template>
    <q-page class="q-pa-md">
        <div class="row items-center q-gutter-xl tentang-kami-section">
        <div class="section-kiri">
                <div class="img-card-atas">
                    <q-img :src="aboutUsStore.getImgUtamaSrc" class="img-utama" /> <q-card class="card1">
                        <q-card-section>
                            <div class="row items-center justify-between">
                                <div class="text-subtitle2">{{ aboutUsStore.getStoreCount }}</div>
                                <q-img class="stonks-icon" src="/icons/Stonks.png" />
                            </div>
                            <div class="text-caption1 q-mt-xs">
                                {{ aboutUsStore.getStoreDescription }}
                            </div>
                        </q-card-section>
                        <div class="card-bottom-line" />
                    </q-card>
                </div>

                <div class="img-card-bawah">
                    <q-card class="card2">
                        <q-card-section>
                            <div class="text-subtitle2">{{ aboutUsStore.getRatingTitle }}</div>
                            <div class="text-caption q-mt-xs">
                                {{ aboutUsStore.getRatingDescription }}
                            </div>
                            <div class="emoji-inline q-mt-sm">
                                <span>😊</span>
                                <span>😍</span>
                                <span>🤩</span>
                                <span>😋</span>
                                <span class="big-emoji">😁</span>
                            </div>
                        </q-card-section>
                        <div class="card-bottom-line" />
                    </q-card>

                    <q-img :src="aboutUsStore.getImgSosmed1Src" class="img-sosmed1" /> </div>
            </div>

            <div class="text-wrapper">
                <div class="text-judul q-mb-sm">{{ aboutUsStore.getAboutUsTitle }}</div>
                <div class="text-body q-mb-md" v-html="aboutUsStore.getAboutUsBody1">
                </div>
                <div class="text-body" v-html="aboutUsStore.getAboutUsBody2">
                </div>
            </div>
        </div>
        <DownloadAppLayout />
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import DownloadAppLayout from 'layouts/DownloadAppLayout.vue';
    import FooterLayout from 'src/layouts/FooterLayout.vue';
    import { useAboutUsStore } from 'src/stores/TentangKamiStore';

    const aboutUsStore = useAboutUsStore();
</script>

<style scoped>
    .q-page {
        max-width: 1400px;
        margin: 0 auto;
    }

    .tentang-kami-section {
        flex-wrap: nowrap;
    }

    .section-kiri {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
    }

    .stonks-icon {
        width: 28px;
        height: 19px;
    }

    /* Baris Atas */
    .img-card-atas {
        position: relative;
        margin-bottom: 20px;
        transform: translateX(50px);
    }

    .card1 {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 240px;
        height: auto;
        border-radius: 10px;
    }

    /* Baris Bawah */
    .img-card-bawah {
        display: flex;
        align-items: flex-start;
    }

    .card2 {
        width: 240px;
        height: auto;
        margin-right: 16px;
        border-radius: 10px;
    }

    .emoji-inline {
        display: flex;
        gap: 6px;
        font-size: 24px;
        align-items: flex-end;
    }

    .big-emoji {
        font-size: 40px;
    }

    .img-utama {
        width: 360px;
        height: 360px;
        border-radius: 12px;
        object-fit: cover;
    }

    .img-sosmed1 {
        width: 360px;
        height: 360px;
        border-radius: 12px;
        object-fit: cover;
    }

    /* Kolom Kanan */
    .text-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 500px;
        margin-left: 100px;
    }


    .text-caption {
        color: grey;
        margin-top: 15px;
        font-size: 14px;
    }

    .text-caption1{
        color: grey;
        margin-top: 15px;
        font-size: 14px;
    }

    .card-bottom-line {
        height: 1px;
        background-color: #ccc;
        margin-top: auto;
        margin: 10px 20px;
    }

    .text-subtitle2 {
        font-weight: bold;
        color: #333;
        font-size: 20px;
    }

    .text-judul {
        font-weight: bold;
        font-size: 52px;
        color: #000;
        margin-bottom: 10px;
    }

    .text-body {
        font-size: 18px;
        color: #000;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .tentang-kami-section {
            margin-left: -110px;
            padding: 10px;
        }

        .text-subtitle2{
            font-size: 14px;
            margin-bottom: 7px;
        }

        .text-caption {
            display: none;
        }

        .text-caption1 {
            font-size: 11px;
        }

        .tentang-kami-section {
            flex-direction: column;
            align-items: center;
            gap: 40px;
        }

        .text-wrapper {
            margin: 0 auto;
            text-align: center;
            padding: 0 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 120px;
        }

        .text-judul {
            font-size: 28px;
        }

        .text-body {
            font-size: 16px;
        }

        .img-utama {
            width: 208px;
            height: 351px;
            margin-left: -50px;
        }

        .card1{
            width: 120px;
            height: 190px;
            margin-right: 30px;
        }

        .card2 {
            width: 105px;
            height: 200px;
        }

        .img-sosmed1 {
            width: 200px;
            height: 350px;
        }

        .emoji-inline {
            display: contents;
            gap: 6px;
            font-size: 18px;
            align-items: center;
        }

        .big-emoji {
            font-size: 30px;
        }
    }

</style>