<template>
  <div class="fullscreen bg-white text-white text-center q-pa-md flex flex-center">
    <div>

      <div class="q-mt-xl gambar">
        <q-img src="/images/Frame.svg" alt="Error 404"/>
      </div>

      <q-btn
        class="q-mt-xl button-home"
        unelevated
        to="/"
        label="Kembali ke Beranda"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'ErrorNotFound'
});
</script>

<style scoped>
  .button-home {
    background-color: #CC2E29 ;
    width: 200px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
  }
  .button-home:hover {
    background-color: #FFD400;
    color: #CC2E29;
    transition: 0.3s ease;
  }
  .gambar {
    display: flex;
    justify-content: center;
    width: 500px;
  }
</style>