<template>
    <q-page class="q-pa-md order-page">
        <div class="q-mt-xl text-center">
            <h1 class="text-h5 text-dark-title">Lapar? Saatnya Nikmati Kabobs!</h1>
        </div>
        <div class="promo-section q-mt-lg q-mx-auto row items-center justify-center q-col-gutter-lg">
            <div class="col-xs-12 col-md-6 text-content">
                <p class="text-subtitle text-promo-desc">
                    Pesan sekarang dan rasakan kelezatan daging panggang berkualitas, dibalut dengan cita rasa khas Kabobs yang tiada duanya.
                </p>
                <p class="text-subtitle text-promo-desc q-mt-sm">
                    Cepat, praktis, dan dijamin bikin nagih!
                </p>
            </div>
            <div class="col-xs-12 col-md-6 image-content">
                <q-img src="images/OrderNowVector.png" alt="Kabobs Delivery" class="delivery-image" />
            </div>
        </div>

        <div class="q-mt-xl text-center">
            <h2 class="text-h5 text-dark-title">Pesan Kabobs Favoritmu di Sini!</h2>
        </div>
        <div class="order-options q-mt-lg row items-start justify-center q-col-gutter-md">
            <div
                v-for="(option, index) in orderOptions"
                :key="index"
                class="col-xs-6 col-sm-6 col-md-3 column items-center"
            >
                <q-card
                class="order-card text-center flex flex-center"
                clickable
                v-ripple
                @click="openOrderLink(option.url)"
                >
                    <q-card-section class="flex flex-center column no-padding">
                        <q-img :src="option.image" :alt="option.name" :class="option.customClass || 'order-icon'" />
                        <div class="text-subtitle1 text-black q-mt-md text-weight-bolder">{{ option.name }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <DownloadAppLayout/>
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import DownloadAppLayout from 'src/layouts/DownloadAppLayout.vue';
    import FooterLayout from 'src/layouts/FooterLayout.vue';

    interface OrderOption {
        name: string;
        image: string;
        url: string;
        customClass?: string;
    }

    const orderOptions: Ref<OrderOption[]> = ref([
        {
            name: 'Website Kabobs',
            image: 'images/order/OrderKabobs.png',
            url: 'https://order.kabobs.id/',
            customClass: 'order-icon-kabobs',
        },
        {
            name: 'GrabFood',
            image: 'images/order/Grabfood.png',
            url: 'https://food.grab.com/id/id/restaurants?search=kabobs&lng=id&support-deeplink=true&searchParameter=kabobs',
        },
        {
            name: 'GoFood',
            image: 'images/order/Gofood.png',
            url: 'https://gofood.co.id/en/search?q=kabobs',
        },
        {
            name: 'ShopeeFood',
            image: 'images/order/Shopeefood.png',
            url: 'https://shopee.co.id/shopeefood',
        },
    ]);

    const openOrderLink = (url: string) => {
    window.open(url, '_blank');
    };
</script>

<style scoped>
    .order-page {
        padding-left: 60px;
        padding-right: 60px;
        max-width: 1400px;
        margin: 0 auto;
        padding-bottom: 50px;
    }

    .text-dark-title {
        font-weight: 700;
        color: #000;
        font-size: 50px;
        margin-top: 10px;
        margin-bottom: 40px;
    }

    .promo-section {
        background-color: #CD2F29;
        border-radius: 15px;
        padding: 20px;
        color: #fff;
        margin-bottom: 80px;
        margin-left: auto;
        margin-right: auto;
    }

    .promo-section .text-content {
        padding-right: 20px;
    }

    .promo-section .text-promo-desc {
        font-size: 30px;
        line-height: normal;
    }

    .promo-section .image-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delivery-image {
        width: 420px;
        height: auto;
        border-radius: 10px;
    }

    .order-options {
        margin: 0 auto;
    }

    .col-xs-6.column.items-center,
    .col-sm-6.column.items-center,
    .col-md-3.column.items-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .order-card {
        background-color: #ffffff;
        border-radius: 15px;
        height: 300px;
        width: 300px; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
        flex-grow: 0;
        cursor: pointer;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .order-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .order-card .q-card-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0;
    }

    .order-icon {
        height: 160px;
        width: 160px; 
        object-fit: contain;
        margin-bottom: 10px;
    }

    .order-icon-kabobs {
        height: 160px;
        width: 190px; 
        object-fit: contain;
        margin-bottom: 10px;
    }

    .text-subtitle {
        color: #ffffff;
        font-size: 30px;
        margin-top: 0;
    }

    .order-card .text-subtitle1 {
        color: #000;
        font-weight: 600;
        font-size: 30px;
        margin-top: 20px;
    }

    .text-card-desc {
        color: #000;
        font-size: 14px;
        margin-top: 5px;
        line-height: 1.3;
    }

    @media (max-width: 1024px) {
        .order-page {
            padding-left: 40px;
            padding-right: 40px;
        }

        .order-card {
            width: 280px;
            height: 280px;
        }
        .order-icon, .order-icon-kabobs {
            width: 140px;
            height: 140px;
        }
        .order-card .text-subtitle1 {
            font-size: 26px;
        }
        .text-card-desc {
            font-size: 13px;
        }
    }

    @media (max-width: 767px) {
        .order-page {
            padding-left: 20px;
            padding-right: 20px;
        }

        .promo-section {
            flex-direction: row;
            flex-wrap: wrap;
            text-align: left;
            padding: 15px;
            margin-bottom: 40px;
            max-width: 100%;
        }
        .promo-section .text-content {
            width: 60%;
            padding-right: 10px;
            margin-bottom: 0;
        }
        .promo-section .image-content {
            width: 40%;
            justify-content: flex-end;
            align-items: center;
        }
        .promo-section .text-promo-desc {
            font-size: 14px;
            line-height: 1.4;
        }
        .text-dark-title {
            font-size: 32px;
            margin-bottom: 15px;
        }
        .promo-section .delivery-image {
            width: 100%;
            max-width: 120px;
            height: auto;
        }

        .order-options {
            max-width: 100%;
            margin-left: -8px;
            margin-right: -8px;
            margin-top: -8px;
        }
        .order-options > div {
            padding-left: 8px;
            padding-top: 8px;
        }

        .order-card {
            width: 100%;
            height: 180px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .order-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 5px;
        }
        .order-icon-kabobs {
            width: 97px;
            height: 80px;
            margin-bottom: 5px;
        }
        .order-card .text-subtitle1 {
            font-size: 18px;
            margin-top: 5px;
        }
        .text-card-desc {
            font-size: 11px;
            margin-top: 2px;
        }
    }

    @media (max-width: 479px) {
        .order-page {
            padding-left: 10px;
            padding-right: 10px;
        }
        .text-dark-title {
            font-size: 28px;
        }
        .text-promo-desc {
            font-size: 16px;
        }
        .promo-section .text-content {
            width: 65%;
        }
        .promo-section .image-content {
            width: 35%;
        }
        .delivery-image {
            max-width: 100px;
        }
        .order-card {
            width: 100%;
            height: 160px;
            padding: 10px;
        }
        .order-icon{
            width: 70px;
            height: 70px;
        }
        .order-card .text-subtitle1 {
            font-size: 16px;
        }
        .text-card-desc {
            font-size: 10px;
        }
        .order-icon-kabobs {
            width: 97px;
            height: 80px;
        }
    }
</style>