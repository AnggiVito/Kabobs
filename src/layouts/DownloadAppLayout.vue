<template>
    <div class="download-app-section q-mt-xl">
            <div>
                <div class="download-teks">
                    Makin Hemat & Praktis dengan Aplikasi<br />
                    Order Kabobs. Download Sekarang!
                </div>
                <q-img src="/images/Barcode.png" class="download-kiri-img" />
            </div>

            <q-img src="/images/Aplikasi.png" class="download-kanan-img" />
        </div>
</template>

<style>
    .download-app-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
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
</style>