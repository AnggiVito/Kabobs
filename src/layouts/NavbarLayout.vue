<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar-custom">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="q-visible-xs"
          @click="navbarStore.toggleDrawer()"
        />
        <div class="row items-center q-gutter-lg">
          <a href="/" class="q-visible-xs q-ml-auto">
            <q-img src="/images/LogoKabobs.png" style="width: 80px;" />
          </a>

          <div class="row items-center q-gutter-lg q-hidden-xs">
            <div class="nav-hover" @click="goToMenu"
              @mouseenter="handleMenuEnter" @mouseleave="closeMenuDropdownWrapper()">
              Menu
                <q-icon name="expand_more" size="20px" class="q-ml-xs" />
                <q-menu v-model="navbarStore.menuDropdown" anchor="bottom left" self="top left"
                  @mouseenter="handleMenuEnter" @mouseleave="closeMenuDropdownWrapper()">
                  <div class="row no-wrap q-pa-md items-start" style="min-width: 550px">
                    <q-list class="col-8">
                      <div class="row">
                        <div class="col">
                          <div class="dropdown-item" @click="navigateToMenuPage('Seasonal Menu')">Seasonal Menu</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Kebab')">Kebab</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Drinks')">Drinks</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Snacks')">Snack</div>
                          <div class="dropdown-item highlight" @click="navigateToMenuPage('Semua Menu')">Lihat Semua Menu›</div>
                        </div>
                        
                        <div class="col">
                          <div class="dropdown-item" @click="navigateToMenuPage('Fun Box')">Funbox</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Combobs')">Combobs</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Combo Seru')">Paket Combo Seru</div>
                          <div class="dropdown-item" @click="navigateToMenuPage('Fun Set')">Paket Funset Seru</div>
                        </div>
                      </div>
                    </q-list>

                    <div class="col-4 q-ml-md flex flex-center" style="min-height: 200px;">
                      <q-img
                        :src="navbarStore.getCurrentMenuImage"
                        style="width: 150px; height: 150px; border-radius: 8px;"
                      />
                    </div>
                  </div>
                </q-menu>
            </div>

            <div class="nav-hover" @click="goToPromo">Promo</div>

            <div class="nav-hover"  
            @mouseenter="handleTentangEnter" @mouseleave="closeTentangDropdownWrapper()"
            @click="goToAboutUs">
              Tentang Kabobs
              <q-icon name="expand_more" size="20px" class="q-ml-xs" />
              <q-menu v-model="navbarStore.tentangDropdown" anchor="bottom left" self="top left"
                      @mouseenter="handleTentangEnter" @mouseleave="closeTentangDropdownWrapper()">
                <q-list style="min-width: 240px">
                  <div class="dropdown-item" @click="goToLokasi">Lokasi</div>
                  <div class="dropdown-item" @click="goToKarier">Karier</div>
                  <div class="dropdown-item" @click="goToFAQ">FAQ</div>
                </q-list>
              </q-menu>
            </div>

            <div class="nav-hover" @click="goToContactUs">Contact Us</div>
          </div>
        </div>
        <BeliButton class="q-hidden-xs"/>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="navbarStore.drawer" side="left" class="bg-white" bordered>
      <q-list>
        <q-expansion-item label="Menu" expand-separator>
          <q-item clickable @click="navigateToMenuPage('Seasonal Menu')"><q-item-section>Seasonal Menu</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Kebab')"><q-item-section>Kebab</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Drinks')"><q-item-section>Drinks</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Snacks')"><q-item-section>Snack</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Fun Box')"><q-item-section>Funbox</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Combo Seru')"><q-item-section>Paket Combo Seru</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Fun Set')"><q-item-section>Paket Funset Seru</q-item-section></q-item>
          <q-item clickable @click="navigateToMenuPage('Semua Menu')"><q-item-section>Semua Menu</q-item-section></q-item>
        </q-expansion-item>

        <q-item clickable @click="goToPromo">
          <q-item-section>Promo</q-item-section>
        </q-item>

        <q-expansion-item label="Tentang Kabobs" expand-separator>
          <q-item clickable @click="goToAboutUs"><q-item-section>Tentang Kami</q-item-section></q-item>
          <q-item clickable @click="goToLokasi"><q-item-section>Lokasi</q-item-section></q-item>
          <q-item clickable @click="goToKarier"><q-item-section>Karier</q-item-section></q-item>
          <q-item clickable @click="goToFAQ"><q-item-section>FAQ</q-item-section></q-item>
        </q-expansion-item>

        <q-item clickable @click="goToContactUs">
          <q-item-section>Contact Us</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import BeliButton from 'components/BeliButton.vue'
  import { onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNavbarStore } from 'src/stores/NavbarStore';

  const router = useRouter()
  const navbarStore = useNavbarStore();

  let menuTimeout: ReturnType<typeof setTimeout> | null = null;
  let tentangTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleMenuEnter() {
    if (menuTimeout) clearTimeout(menuTimeout);
    navbarStore.setMenuDropdown(true);
  }

  function handleTentangEnter() {
    if (tentangTimeout) clearTimeout(tentangTimeout);
    navbarStore.setTentangDropdown(true);
  }

  function closeMenuDropdownWrapper() {
    if (menuTimeout) clearTimeout(menuTimeout);
    menuTimeout = setTimeout(() => {
      navbarStore.setMenuDropdown(false);
    }, 200);
  }

  function closeTentangDropdownWrapper() {
    if (tentangTimeout) clearTimeout(tentangTimeout);
    tentangTimeout = setTimeout(() => navbarStore.setTentangDropdown(false), 200);
  }

  function goToMenu() {
    void router.push({ path: '/Menu' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToFAQ() {
    void router.push({ path: '/FAQ' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToAboutUs() {
    void router.push({ path: '/AboutUs' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToKarier() {
    void router.push({ path: '/Karier' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToLokasi() {
    void router.push({ path: '/Lokasi' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToPromo() {
    void router.push({ path: '/Promo' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function goToContactUs () {
    void router.push({ path: '/ContactUs' });
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  function navigateToMenuPage(category: string) {
    void router.push({ path: '/Menu', query: { category: category === 'Semua Menu' ? undefined : category } });
    navbarStore.setMenuDropdown(false);
    if (navbarStore.getDrawer) {
        navbarStore.toggleDrawer();
    }
  }

  onBeforeUnmount(() => {
    navbarStore.stopImageCycle();
    if (menuTimeout) clearTimeout(menuTimeout);
    if (tentangTimeout) clearTimeout(tentangTimeout);
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