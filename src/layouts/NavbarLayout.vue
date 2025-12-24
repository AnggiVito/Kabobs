<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="toolbar-custom">
        <q-btn flat dense round icon="menu" class="q-visible-xs" @click="navbarStore.toggleDrawer()" />

        <div class="row items-center q-gutter-lg">
          <a href="/" class="q-visible-xs q-ml-auto">
            <q-img :src="navbarStore.logoImage" style="width: 80px;" />
          </a>

          <div class="row items-center  q-hidden-xs">
            <div v-for="link in navbarStore.getNavLinks" :key="link.label" class="nav-hover">

              <div v-if="link.label === 'Menu'" @click="goToMenu" @mouseenter="handleMenuEnter" @mouseleave="closeMenuDropdownWrapper()">
                {{ link.label }}
                <q-icon name="expand_more" size="20px" class="q-ml-xs" />
                <q-menu v-model="navbarStore.menuDropdown" anchor="bottom left" self="top left" @mouseenter="handleMenuEnter" @mouseleave="closeMenuDropdownWrapper()">
                  <div class="row no-wrap q-pa-md items-start" style="min-width: 550px">
                    <q-list class="col-8">
                      <div class="row">
                        <div class="col">
                          <div v-for="item in menuColumns.leftColumn" :key="item.label" class="dropdown-item" @click="navigateToMenuPage(item)">
                            {{ item.label }}
                          </div>
                        </div>
                        <div class="col">
                          <div v-for="item in menuColumns.rightColumn" :key="item.label" class="dropdown-item" @click="navigateToMenuPage(item)">
                            {{ item.label }}
                          </div>
                        </div>
                      </div>
                      <div class="dropdown-item highlight" @click="navigateToMenuPage({ route: '/Menu', category: 'Semua Menu', label: 'Semua Menu' })">
                            Lihat Semua Menu›
                        </div>
                    </q-list>
                    <div class="col-4 q-ml-md flex flex-center" style="min-height: 200px;">
                      <q-img :src="navbarStore.getCurrentMenuImage" style="width: 150px; height: 150px; border-radius: 8px;" />
                    </div>
                  </div>
                </q-menu>
              </div>

              <div v-else-if="link.label === 'Tentang Kabobs'" @click="goToAboutUs" @mouseenter="handleTentangEnter" @mouseleave="closeTentangDropdownWrapper()">
                {{ link.label }}
                <q-icon name="expand_more" size="20px" class="q-ml-xs" />
                <q-menu v-model="navbarStore.tentangDropdown" anchor="bottom left" self="top left" @mouseenter="handleTentangEnter" @mouseleave="closeTentangDropdownWrapper()">
                  <q-list style="min-width: 240px">
                    <div v-for="item in navbarStore.getTentangDropdownItems" :key="item.label" class="dropdown-item" @click="router.push(item.route)">
                      {{ item.label }}
                    </div>
                  </q-list>
                </q-menu>
              </div>

              <div v-else @click="router.push(link.route)">
                {{ link.label }}
              </div>

            </div>
          </div>
        </div>
        <BeliButton class="q-hidden-xs"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="navbarStore.drawer" side="left" class="bg-white" bordered>
        <q-list>
            <q-expansion-item label="Menu" expand-separator>
                <q-item v-for="item in navbarStore.getMenuDropdownItems" :key="item.label" clickable @click="navigateToMenuPage(item)">
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
                <q-item clickable @click="navigateToMenuPage({ route: '/Menu', category: 'Semua Menu', label: 'Semua Menu' })">
                    <q-item-section>Semua Menu</q-item-section>
                </q-item>
            </q-expansion-item>

            <q-item v-for="link in navbarStore.getNavLinks.filter(l => l.label !== 'Menu' && l.label !== 'Tentang Kabobs')" :key="link.label" clickable @click="router.push(link.route)">
                <q-item-section>{{link.label}}</q-item-section>
            </q-item>

            <q-expansion-item label="Tentang Kabobs" expand-separator>
                <q-item v-for="item in navbarStore.getTentangDropdownItems" :key="item.label" clickable @click="router.push(item.route)">
                    <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
            </q-expansion-item>
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import BeliButton from 'components/BeliButton.vue'
  import { onMounted, onBeforeUnmount, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNavbarStore } from 'src/stores/NavbarStore';

  const router = useRouter()
  const navbarStore = useNavbarStore();

  onMounted(() => {
      void navbarStore.fetchNavbarData();
  });

  const menuColumns = computed(() => {
    const items = navbarStore.getMenuDropdownItems;
    const middleIndex = Math.ceil(items.length / 2);
    const leftColumn = items.slice(0, middleIndex);
    const rightColumn = items.slice(middleIndex);
    return { leftColumn, rightColumn };
  });

  let menuTimeout: ReturnType<typeof setTimeout> | null = null;
  let tentangTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleMenuEnter() { if (menuTimeout) clearTimeout(menuTimeout); navbarStore.setMenuDropdown(true); }
  function handleTentangEnter() { if (tentangTimeout) clearTimeout(tentangTimeout); navbarStore.setTentangDropdown(true); }
  function closeMenuDropdownWrapper() { menuTimeout = setTimeout(() => { navbarStore.setMenuDropdown(false); }, 200); }
  function closeTentangDropdownWrapper() { tentangTimeout = setTimeout(() => navbarStore.setTentangDropdown(false), 200); }

  interface MenuDropdownItem { label: string; category: string; route: string; }
  function navigateToMenuPage(item: MenuDropdownItem) {
    const query = { category: item.category === 'Semua Menu' ? undefined : item.category };
    void router.push({ path: item.route, query: query });
    navbarStore.setMenuDropdown(false);
    if (navbarStore.getDrawer) navbarStore.toggleDrawer();
  }

  function goToMenu() { void router.push({ path: '/Menu' }); if (navbarStore.getDrawer) navbarStore.toggleDrawer(); }
  function goToAboutUs() { void router.push({ path: '/AboutUs' }); if (navbarStore.getDrawer) navbarStore.toggleDrawer(); }

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
