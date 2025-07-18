<template>
    <div class="download-app-section q-mt-xl">
        <div class="download-kiri">
            <div class="download-teks">
                Makin Hemat & Praktis dengan Aplikasi<br />
                Order Kabobs. Download Sekarang!
            </div>
            <q-img src="/images/Barcode.png" class="download-kiri-img" />
        </div>

        <q-img src="/images/Aplikasi.png" class="download-kanan-img" />
    </div>
</template>

<style scoped>
    .download-app-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
        flex-wrap: wrap;
        padding: 0 16px;
    }

    .download-kiri {
        display: flex;
        flex-direction: column;
    }

    .download-teks {
        font-size: 40px;
        line-height: 1.5;
        font-weight: bold;
        }

    .download-kiri-img {
        width: 250px;
        height: auto;
        margin-top: 16px;
    }

    .download-kanan-img {
        width: 329px;
        height: 420px;
        object-fit: contain;
        border-radius: 12px;
    }

    @media (max-width: 768px) {
        .download-app-section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .download-app-section > div {
            flex: 1;
        }

        .download-teks {
            font-size: 13px;
            text-align: left;
        }

        .download-kiri-img {
            width: 100px;
            margin-top: 12px;
        }

        .download-kanan-img {
            width: 200px;
            height: auto;
        }
    }

</style>
