<template>
  <div class="promo-container">
    <h1 class="text-h4 text-center q-mb-lg">Semua Promo</h1>

    <div v-if="promoStore.isLoading" class="text-center q-pa-lg">
      <q-spinner-hourglass color="primary" size="3em" />
      <div class="q-mt-md">Loading promos...</div>
    </div>

    <div v-else-if="promoStore.error" class="text-center q-pa-lg text-negative">
      Error: {{ promoStore.error }}
    </div>

    <div v-else-if="promoStore.promos.length === 0" class="text-center q-pa-lg">
      Tidak ada promo yang tersedia saat ini.
    </div>

    <div v-else class="row q-col-gutter-xl q-row-gutter-xl justify-center">
      <div
        v-for="(promo, index) in promoStore.promos"
        :key="index"
        class="col-xs-6 col-sm-6 col-md-6"
      >
        <q-card class="q-pa-none shadow-2">
          <div class="promo-image-wrapper">
            <q-img :src="`${url+promo.image}`" class="promo-image" />
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
                <q-img :src="platform.logo" style="width: 24px; height: 24px" />
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
import { onMounted } from 'vue';
import { usePromoStore } from 'src/stores/PromoStore';
import FooterLayout from 'src/layouts/FooterLayout.vue';
import { QSpinnerHourglass } from 'quasar';

const promoStore = usePromoStore();
const url = import.meta.env.VITE_IMAGE_URL;
onMounted(async () => {
  await promoStore.fetchPromos();
});
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
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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
  .q-img[style='width: 24px; height: 24px;'] {
    width: 20px !important;
    height: 20px !important;
  }
}
</style>
