<template>
    <q-btn
        label="Order Now"
        class="order-now-fixed"
        unelevated
        no-caps
        to="/order-now"
    />
</template>

<script setup lang="ts">
</script>

<style scoped>
    .order-now-fixed {
        position: fixed;
        right: 24px;
        bottom: 24px;
        background-color: #ffd400;
        color: #cd2f29;
        border-radius: 10px;
        padding: 10px 20px;
        font-weight: bold;
        z-index: 999;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .order-now-fixed:hover {
        background-color: #cd2f29;
        color: white;
    }

    @media (max-width: 768px) {
        .order-now-fixed {
            width: 100px;
            height: 35px;
            font-size: 11px;
        }
        
    }
</style>
