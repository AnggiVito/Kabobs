<template>
    <q-btn
        class="btn-beli text-capitalize"
        unelevated
        color="yellow-9"
        text-color="black"
        style="font-weight: bold;"
        @click="goToOrderPage" >
        <q-avatar class="beli-logo q-mr-sm" square>
            <img src="/images/BeliLogo.png" />
        </q-avatar>
        Beli Online
    </q-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToOrderPage = () => {
    void router.push({ path: '/Order-now' });
};
</script>

<style scoped>
    .btn-beli {
        transition: background-color 0.2s, color 0.2s;
        border-radius: 6px;
        padding-left: 12px;
        padding-right: 16px;
        background-color: #FFD400 !important;
    }

    .btn-beli:hover {
        background-color: #CD2F29 !important;
        color: white !important;
    }

    .beli-logo {
        width: 20px;
        height: 27px;
    }
</style>