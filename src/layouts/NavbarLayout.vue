<template>
  <q-layout view="hHh lpR fFf">
    <!-- Navbar -->
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar-custom">
        <div class="row items-center q-gutter-lg">
          <q-img src="/images/LogoKabobs.png" style="width: 80px; " />

          <!-- Dropdown Menu: Menu -->
          <div class="nav-hover">
            Menu
            <q-icon name="expand_more" size="20px" class="q-ml-xs" />
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <div class="row no-wrap q-pa-md items-start" style="min-width: 550px">
                <q-list class="col-8">
                  <div class="row">
                    <div class="col">
                      <div class="dropdown-item">Seasonal Menu</div>
                      <div class="dropdown-item">Semua Menu</div>
                      <div class="dropdown-item">Drinks</div>
                      <div class="dropdown-item">Snack</div>
                      <div class="dropdown-item highlight">Lihat Semua Menu ›</div>
                    </div>

                    <div class="col">
                      <div class="dropdown-item">Funbox</div>
                      <div class="dropdown-item">Paket Combo Seru</div>
                      <div class="dropdown-item">Paket Funbox Seru</div>
                    </div>
                  </div>
                </q-list>

                <div class="col-4 q-ml-md flex flex-center" style="min-height: 200px;">
                  <q-img
                    :src="menuImages[currentImage]"
                    style="width: 150px; height: 150px; border-radius: 8px;"
                  />
                </div>
              </div>
            </q-menu>
          </div>


          <div class="nav-hover">Promo</div>

          <div class="nav-hover">
            Tentang Kabobs
            <q-icon name="expand_more" size="20px" class="q-ml-xs" />
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 240px">
                <div class="dropdown-item">Tentang Kami</div>
                <div class="dropdown-item">Karir</div>
                <div class="dropdown-item">FAQ</div>
              </q-list>
            </q-menu>
          </div>

          <div class="nav-hover">Contact Us</div>
        </div>

        <!-- Beli Online -->
        <BeliButton />

      </q-toolbar>
    </q-header>

    <!-- Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import BeliButton from 'components/BeliButton.vue'
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const menuImages = [
    '/images/Thumbnail1.png',
    '/images/Thumbnail2.png',
    '/images/Thumbnail3.png',
    '/images/Thumbnail4.png'
  ]

  const currentImage = ref(0)
  let intervalId: ReturnType<typeof setInterval>

  onMounted(() => {
    intervalId = setInterval(() => {
      currentImage.value = (currentImage.value + 1) % menuImages.length
    }, 1500)
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
</script>

<style scoped>
  .toolbar-custom {
    max-width: 1400px;
    margin: 0 auto;
    padding-left: 60px;
    padding-right: 60px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .q-page-container {
    padding: 0;
  }

  .nav-hover {
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: 500;
    margin-left: 16px;
    margin-right: 16px;
    padding-left: 30px;
    padding-right: 10px;
  }

  .nav-hover:hover {
    color: #FFD400 !important;
  }

  .dropdown-item {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: black;
    transition: color 0.2s;
  }

  .dropdown-item:hover {
    color: #FFD400;
  }

  .dropdown-item.highlight {
    font-weight: bold;
    color: #e0a800;
  }

  .btn-beli {
    transition: background-color 0.2s, color 0.2s;
    width: auto;
    height: 50px;
    border-radius: 10px;
  }

  .btn-beli:hover {
    background-color: #CD2F29 !important;
    color: white !important;
  }

  .beli-logo {
    width: auto;
    height: auto;
    padding-right: 5px;
  }

  
</style>
