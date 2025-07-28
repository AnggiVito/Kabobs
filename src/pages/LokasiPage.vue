<template>
  <q-page class="q-pa-md">
    <div class="lokasi-page">
      <div class="text-center q-mt-xl">
        <h1 class="text-h5">Lokasi Outlet</h1>
        <div class="text-caption-tittle">
          Temukan outlet Kabobs terdekatmu!
        </div>
      </div>

      <div class="search-bar q-mt-lg q-mx-auto">
        <q-input
          :model-value="lokasiStore.search"
          @update:model-value="lokasiStore.setSearch"
          placeholder="Cari lokasi"
          borderless
          dense
          debounce="300"
          @focus="lokasiStore.setShowSuggestions(true)"
          @blur="lokasiStore.handleBlur"
          class="search-box underline-only"
          :class="{ 'active': lokasiStore.search }"
        >
          <template #prepend>
            <q-icon name="place" class="text-black" />
          </template>
          <template #append>
            <q-btn class="search-btn" flat label="Cari" no-caps @click="lokasiStore.doSearch" />
          </template>
        </q-input>
        <q-list
          v-if="lokasiStore.showSuggestions && lokasiStore.filteredSuggestions.length"
          class="autocomplete-list"
        >
          <q-item
            v-for="(item, idx) in lokasiStore.filteredSuggestions"
            :key="idx"
            clickable
            @click="lokasiStore.selectSuggestion(item)"
          >
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="map-container q-mt-lg q-mx-auto">
        <LMap
          ref="map"
          :zoom="mapZoom"
          :center="mapCenter"
          :use-global-leaflet="false"
          style="height: 500px; width: 100%;"
        >
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          <LMarker
            v-for="(outlet) in allOutlets"
            :key="outlet.id || outlet.name"
            :lat-lng="outlet.coords"
            :icon="getMarkerIcon(outlet.id)"
          >
            <LPopup>
              <div>
                <strong>{{ outlet.name }}</strong><br>
                {{ outlet.address }}<br>
                <a :href="outlet.mapUrl" target="_blank">Lihat di Google Maps</a>
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>

      <div v-if="lokasiStore.isLoading" class="text-center q-pa-lg">
        <q-spinner-hourglass color="primary" size="3em" />
        <div class="q-mt-md">Memuat lokasi outlet...</div>
      </div>

      <div v-else-if="lokasiStore.error" class="text-center q-pa-lg text-negative">
        Error: {{ lokasiStore.error }}
      </div>

      <div v-else-if="lokasiStore.filteredRegions.length === 0 && lokasiStore.search" class="text-center q-mt-lg">
        <q-icon name="search_off" size="48px" color="grey-5" />
        <div class="text-h6 text-grey-7 q-mt-md">Tidak ada hasil ditemukan</div>
        <div class="text-caption text-grey-6">
          Coba ubah kata kunci pencarianmu.
        </div>
      </div>
      
      <div v-else-if="!lokasiStore.isLoading && lokasiStore.filteredRegions.length === 0" class="text-center q-mt-lg">
        <div class="text-h6 text-grey-7 q-mt-md">Tidak ada data lokasi yang tersedia.</div>
      </div>

      <div
        v-else
        class="region-section"
        v-for="(region) in lokasiStore.filteredRegions"
        :key="region.name"
      >
        <h2 class="region-title">{{ region.name }}</h2>

        <div class="card-container">
          <div
            v-for="(outlet) in region.outlets"
            :key="outlet.id || outlet.name"
          >
            <q-card class="text-black lokasi-card">
              <q-card-section class="column full-height justify-between">
                <div>
                  <div class="text-subtitle1 nama-outlet">{{ outlet.name }}</div>
                </div>

                <div>
                  <q-space />
                  <a
                    :href="outlet.mapUrl"
                    target="_blank"
                    class="lihat-maps text-caption text-bold flex items-center"
                  >
                    <q-icon name="location_on" size="16px" class="q-mr-xs" />
                    Lihat Maps
                  </a>
                  <div
                    class="lihat-alamat text-caption text-bold flex items-center q-mt-sm cursor-pointer"
                    @click="handleToggleAddressVisibility(outlet.name, region.name, outlet.coords)"
                  >
                    <q-icon :name="outlet.showAddress ? 'visibility_off' : 'visibility'" size="16px" class="q-mr-xs" />
                    {{ outlet.showAddress ? 'Sembunyikan' : 'Lihat Alamat' }}
                  </div>
                  <div v-if="outlet.showAddress" class="text-caption q-mt-xs">
                    {{ outlet.address }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <FooterLayout />
</template>

<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import FooterLayout from 'layouts/FooterLayout.vue';
  import { useLokasiStore } from 'src/stores/LokasiStore';
  import { QSpinnerHourglass } from 'quasar';
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
  import { Icon } from 'leaflet';
  import type { Map } from 'leaflet';

  type LatLngCoords = [number, number];

  const lokasiStore = useLokasiStore();

  const map = ref<{ leafletObject: Map | null } | null>(null);
  const mapZoom = ref(6);
  const mapCenter = ref<LatLngCoords>([-6.917464, 107.619122]);

  const defaultMarkerIcon = new Icon({
    iconUrl: 'icons/Marker.png',
    iconRetinaUrl: 'icons/Marker.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const activeMarkerIcon = new Icon({
    iconUrl: '/marker-icon-red.png',
    iconRetinaUrl: '/marker-icon-red-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [35, 55],
    iconAnchor: [17, 55],
    popupAnchor: [1, -50],
  });

  function getMarkerIcon(outletId: number) {
    return lokasiStore.activeOutletId === outletId ? activeMarkerIcon : defaultMarkerIcon;
  }

  function handleToggleAddressVisibility(outletName: string, regionName: string, coords: LatLngCoords) {
    const targetOutlet = lokasiStore.lokasiData
      .find(r => r.name === regionName)?.outlets
      .find(o => o.name === outletName);

    if (targetOutlet) {
      const isCurrentlyActive = lokasiStore.activeOutletId === targetOutlet.id;

      lokasiStore.toggleAddressVisibility(outletName, regionName);

      if (map.value && map.value.leafletObject) {
        if (!isCurrentlyActive) {
          map.value.leafletObject.setView(coords, 15);
        } else {
          const anyOtherOutletActive = lokasiStore.lokasiData.some(r => 
              r.outlets.some(o => o.showAddress && o.id !== targetOutlet.id)
          );
          if (!anyOtherOutletActive) {
              map.value.leafletObject.setView(mapCenter.value, mapZoom.value);
          }
        }
      }
    }
  }

  const allOutlets = computed(() => {
    const outlets: (typeof lokasiStore.lokasiData[0]['outlets'][0] & { coords: LatLngCoords })[] = [];
    
    lokasiStore.lokasiData.forEach(region => {
      region.outlets.forEach(outlet => {
        const lat = outlet.lat !== null ? outlet.lat : -6.917464;
        const lng = outlet.lng !== null ? outlet.lng : 107.619122;

        outlets.push({ 
          ...outlet, 
          lat, 
          lng, 
          coords: [lat, lng],
          showAddress: outlet.showAddress || false
        });
      });
    });
    return outlets;
  });

  watch(() => lokasiStore.activeOutletId, (newId) => {
      if (newId !== null && map.value && map.value.leafletObject) {
          const activeOutlet = allOutlets.value.find(o => o.id === newId);
          if (activeOutlet) {
              map.value.leafletObject.setView(activeOutlet.coords, 15);
          }
      } else if (map.value && map.value.leafletObject && !lokasiStore.lokasiData.some(r => r.outlets.some(o => o.showAddress))) {
          map.value.leafletObject.setView(mapCenter.value, mapZoom.value);
      }
  });


  onMounted(() => {
    void lokasiStore.fetchLokasiData().then(() => {
      setTimeout(() => { 
        if (map.value && map.value.leafletObject) { 
          map.value.leafletObject.invalidateSize();

          if (allOutlets.value.length > 0 && allOutlets.value[0]) {
            const firstOutletCoords = allOutlets.value[0].coords; 
            mapCenter.value = firstOutletCoords;
            mapZoom.value = 6;
          }
        }
      }, 500);
    });
  });
</script>

<style scoped>
  .lokasi-page {
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .text-h5 {
    font-weight: 700;
    color: #000;
    font-size: 40px;
  }

  .text-caption-tittle {
    font-size: 32px;
    color: #000;
    margin-top: 8px;
  }

  .search-bar {
    max-width: 600px;
    position: relative;
  }

  .search-box.active input {
    border-bottom: 2px solid #fdd835 !important;
  }

  .autocomplete-list {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin-top: 4px;
    position: absolute;
    width: 100%;
    z-index: 10000;
    max-height: 200px;
    overflow-y: auto;
  }

  .map-container {
    max-width: 1000px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: 400px;
    margin-top: 50px;
  }

  .region-title {
    margin-top: 40px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    display: inline-block;
    padding-bottom: 4px;
    color: #CD2F29;
  }

  .lokasi-card {
    border-radius: 10px;
    background-color: #FFD400;
    width: 280px;
    height: 240px;
  }

  .region-section {
    text-align: center;
    margin-top: 40px;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .lokasi-card .text-subtitle1 {
    color: #CD2F29;
    font-size: 20px;
    font-weight: 600;
  }

  .lokasi-card .text-caption {
    font-size: 13px;
  }

  .lihat-maps {
    color: #000000 !important;
    text-decoration: none;
  }

  .lihat-alamat {
    color: #000000 !important;
    text-decoration: none;
  }

  .search-btn {
    background-color: #fdd835;
    color: #CD2F29;
    font-weight: 600;
    border-radius: 20px;
    padding: 6px 12px;
    width: 80px;
  }

  .search-btn:hover {
    background-color: #CD2F29;
    color: white;
    transition: 0.3s ease-in-out;
  }

  .search-box.underline-only {
    border-bottom: 2px solid #ccc;
    transition: border-color 0.2s;
  }

  .search-box.underline-only:focus-within {
    border-bottom: 2px solid #fdd835;
  }

  @media (max-width: 991px) {
    .lokasi-page {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  @media (max-width: 768px) {
    .text-h5 {
      font-size: 32px;
    }
    .text-caption-tittle {
      font-size: 24px;
    }
    .lokasi-card {
      width: 100%;
      max-width: 300px;
      height: auto;
    }
  }

  @media (max-width: 480px) {
    .text-h5 {
      font-size: 28px;
    }
    .text-caption-tittle {
      font-size: 20px;
    }
    .lokasi-card .text-subtitle1 {
      font-size: 18px;
    }
    .lokasi-card .text-caption {
      font-size: 12px;
    }
    .search-bar {
      max-width: 100%;
    }
  }
</style>