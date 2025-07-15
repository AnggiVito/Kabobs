<template>
  <q-layout view="hHh lpR fFf">
    <!-- Navbar -->
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar-custom">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-visible-xs"
          @click="drawer = !drawer"
        />
        <div class="row items-center q-gutter-lg">
          <a href="/" class="q-visible-xs q-ml-auto">
            <q-img src="/images/LogoKabobs.png" style="width: 80px; " />
          </a>

          <!-- Dropdown Menu: Menu -->
          <div class="row items-center q-gutter-lg q-hidden-xs">
            <div class="nav-hover"
              @mouseenter="menuDropdown = true"
              @mouseleave="menuDropdown = false">
              Menu
                <q-icon name="expand_more" size="20px" class="q-ml-xs" />
                <q-menu v-model="menuDropdown" anchor="bottom left" self="top left" @mouseenter="openMenuDropdown" @mouseleave="closeMenuDropdown">
                <div class="row no-wrap q-pa-md items-start" style="min-width: 550px">
                  <q-list class="col-8">
                    <div class="row">
                      <div class="col">
                        <div class="dropdown-item">Seasonal Menu</div>
                        <div class="dropdown-item">Semua Menu</div>
                        <div class="dropdown-item">Drinks</div>
                        <div class="dropdown-item">Snack</div>
                        <div class="dropdown-item highlight">Lihat Semua Menu›</div>
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


            <div class="nav-hover" @click="goToPromo">Promo</div>

            <div class="nav-hover"
            @mouseenter="tentangDropdown = true"
            @mouseleave="tentangDropdown = false"
            @click="goToAboutUs">
              Tentang Kabobs
              <q-icon name="expand_more" size="20px" class="q-ml-xs" />
              <q-menu v-model="tentangDropdown" anchor="bottom left" self="top left" @mouseenter="openTentangDropdown" @mouseleave="closeTentangDropdown">
                <q-list style="min-width: 240px">
                  <div class="dropdown-item" @click="goToLokasi">Lokasi</div>
                  <div class="dropdown-item" @click="goToKarier">Karir</div>
                  <div class="dropdown-item" @click="goToFAQ">FAQ</div>
                </q-list>
              </q-menu>
            </div>

            <div class="nav-hover" @click="goToContactUs">Contact Us</div>
          </div>
        </div>
        <!-- Beli Online -->
        <BeliButton class="q-hidden-xs"/>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" class="bg-white" bordered>
      <q-list>
        <!-- MENU -->
        <q-expansion-item label="Menu" expand-separator>
          <q-item clickable><q-item-section>Seasonal Menu</q-item-section></q-item>
          <q-item clickable><q-item-section>Semua Menu</q-item-section></q-item>
          <q-item clickable><q-item-section>Drinks</q-item-section></q-item>
          <q-item clickable><q-item-section>Snack</q-item-section></q-item>
          <q-item clickable><q-item-section>Funbox</q-item-section></q-item>
          <q-item clickable><q-item-section>Paket Combo Seru</q-item-section></q-item>
          <q-item clickable><q-item-section>Paket Funbox Seru</q-item-section></q-item>
        </q-expansion-item>

        <!-- PROMO -->
        <q-item clickable @click="goToPromo">
          <q-item-section>Promo</q-item-section>
        </q-item>

        <!-- TENTANG KABOBS -->
        <q-expansion-item label="Tentang Kabobs" expand-separator>
          <q-item clickable @click="goToAboutUs"><q-item-section>Tentang Kami</q-item-section></q-item>
          <q-item clickable @click="goToLokasi"><q-item-section>Lokasi</q-item-section></q-item>
          <q-item clickable @click="goToKarier"><q-item-section>Karier</q-item-section></q-item>
          <q-item clickable @click="goToFAQ"><q-item-section>FAQ</q-item-section></q-item>
        </q-expansion-item>

        <!-- CONTACT -->
        <q-item clickable @click="goToContactUs">
          <q-item-section>Contact Us</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import BeliButton from 'components/BeliButton.vue'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const menuDropdown = ref(false)
  const drawer = ref(false)
  const tentangDropdown = ref(false)
  let menuTimeout: ReturnType<typeof setTimeout>
  let tentangTimeout: ReturnType<typeof setTimeout>

  function openMenuDropdown() {
    clearTimeout(menuTimeout)
    menuDropdown.value = true
  }
  function closeMenuDropdown() {
    menuTimeout = setTimeout(() => (menuDropdown.value = false), 200)
  }

  function openTentangDropdown() {
    clearTimeout(tentangTimeout)
    tentangDropdown.value = true
  }
  function closeTentangDropdown() {
    tentangTimeout = setTimeout(() => (tentangDropdown.value = false), 200)
  }

  function goToFAQ() {
    void router.push({ path: '/FAQ' })
  }

  function goToAboutUs() {
    void router.push({ path: '/AboutUs' })
  }

  function goToKarier() {
    void router.push({ path: '/Karier' })
  }

  function goToLokasi() {
    void router.push({ path: '/Lokasi' })
  }

  function goToPromo() {
    void router.push({ path: '/Promo' })
  }

  const goToContactUs = () => {
    void router.push({ path: '/ContactUs' })
  }

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
  @media (min-width: 601px) {
    .q-btn.q-visible-xs {
      display: none !important;
    }
  }

  @media (max-width: 600px) {
    .q-hidden-xs {
      display: none !important;
    }
  }

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
