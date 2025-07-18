<template>
    <q-btn
        flat
        :label="label"
        :to="route"
        class="lihat-semua-btn"
        no-caps
    />
</template>

<script setup lang="ts">
    defineProps<{
        label: string;
        route: string;
    }>();
</script>

<style scoped>
    .lihat-semua-btn {
        background-color: #FEDA00;
        color: #CD2F29;
        font-weight: bold;
        font-size: 20px;
        transition: 0.3s ease;
        border-radius: 10px;
        padding: 8px 16px;
        align-items: center;
        width: 200px;
        height: 50px;
        margin-bottom: 70px;
    }

    .lihat-semua-btn:hover {
    background-color: #CD2F29;
    color: white;
    }

    @media (max-width: 768px) {
        .lihat-semua-btn {
            width: 150px;
            height: 40px;
            font-size: 14px;
        }

        .lihat-semua-btn:hover {
            background-color: #CD2F29;
            color: white;
        }
    }
</style>
