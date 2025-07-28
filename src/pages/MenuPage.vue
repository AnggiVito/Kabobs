<template>
    <q-page class="q-pa-md">
        <div class="menu-page">
            <div class="text-center q-mt-xl">
                <h1 class="text-h5">{{ menuStore.getPageTitle }}</h1>
            </div>

            <div class="q-mb-lg flex flex-center q-gutter-sm">
                <q-btn
                    v-for="category in menuStore.getCategoryButtons.slice(0, 4)"
                    :key="category"
                    :label="category"
                    v-bind="getBtnProps(category)"
                    @click="goToCategory(category)"
                />
            </div>

            <div class="q-gutter-sm row justify-center q-mb-md category-buttons">
                <q-btn
                    v-for="category in menuStore.getCategoryButtons.slice(4)"
                    :key="category"
                    :label="category"
                    v-bind="getBtnProps(category)"
                    @click="goToCategory(category)"
                />
            </div>

            <div v-if="menuStore.isLoading" class="text-center q-pa-lg">
                <q-spinner-hourglass color="primary" size="3em" />
                <div class="q-mt-md">Memuat menu...</div>
            </div>

            <div v-else-if="menuStore.error" class="text-center q-pa-lg text-negative">
                Error: {{ menuStore.error }}
            </div>

            <div v-else>
                <div v-for="(items, category) in menuStore.getFilteredMenuGroups" :key="category">
                    <template v-if="items.length > 0">
                        <div class="text-h6 text-bold q-mb-md category-title">{{ category }}</div>
                        <div class="row q-col-gutter-xl menu-grid">
                            <div
                                v-for="(item, index) in items"
                                :key="item.id || index"
                                class="col-xs-6 col-sm-4 col-md-3"
                            >
                                <q-card class="menu-card">
                                    <q-img :src="item.fullImageUrl" style="height: 240px;" />
                                    <div class="menu-name">{{ item.name }}</div>
                                </q-card>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="menuStore.selectedCategory === category && category !== 'Semua Menu'">
                        <div class="text-h7 text-bold text-center q-mt-lg">Menu tidak ditemukan untuk kategori "{{ category }}".</div>
                    </template>
                </div>
                <div v-if="!menuStore.isLoading && !menuStore.error && Object.keys(menuStore.getFilteredMenuGroups).length === 0" class="text-center q-mt-lg text-grey-7">
                    Tidak ada menu yang tersedia.
                </div>
            </div>
        </div>
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import { onMounted, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import FooterLayout from 'src/layouts/FooterLayout.vue';
    import { useMenuStore } from 'src/stores/MenuStore';
    import { QSpinnerHourglass } from 'quasar';

    const router = useRouter();
    const route = useRoute();
    const menuStore = useMenuStore();

    const getBtnProps = (label: string) => {
        return {
            flat: menuStore.selectedCategory !== label,
            outline: menuStore.selectedCategory !== label,
            class: ['q-px-md category-btn', { active: menuStore.selectedCategory === label }],
            noCaps: true,
            dense: true,
        };
    };

    watch(() => route.query.category, (newCategory) => {
        let category: string | string[] | null | undefined = null;
        if (Array.isArray(newCategory)) {
            category = newCategory.map(val => val === null ? '' : String(val));
        } else if (typeof newCategory === 'string' || newCategory === null || newCategory === undefined) {
            category = newCategory;
        } else {
            category = String(newCategory);
        }
        menuStore.initializeCategoryFromQuery(category);
    }, { immediate: true });

    const goToCategory = (category: string) => {
        if (category === 'Semua Menu') {
            if (route.query.category) {
                void router.push({ path: '/Menu' });
            } else {
                menuStore.setSelectedCategory('Semua Menu');
            }
        } else {
            if (menuStore.selectedCategory !== category) {
                void router.push({ path: '/Menu', query: { category: category } });
            }
            menuStore.setSelectedCategory(category);
        }
    };

    onMounted(() => {
        void menuStore.fetchMenus();
    });
</script>

<style scoped>
    .text-h7 {
        font-weight: 300;
        margin-top: 0px;
        font-size: 20px;
        text-align: center;
        color: grey;
        margin: 30px 0px;
    }

    .text-h5 {
        font-weight: 600;
        font-size: 50px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 50px;
    }

    .text-h6 {
        font-weight: 600;
        margin-top: 0px;
        font-size: 40px;
        text-align: center;
        margin-top: 50px;
    }

    .menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        padding: 10px 180px;
        gap: 40px;
        row-gap: 0px;
        justify-content: center;
        margin-bottom: 30px;
    }

    .menu-card {
        width: 240px;
        height: 332px;
        color: white;
        background-color: #CC2E29;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 5px rgba(0,0,0,0.1);
        margin-top: 30px;
    }

    .menu-img {
        width: 240px;
        height: 240px;
        object-fit: cover;
    }

    .menu-name {
        flex: 1;
        padding: 12px;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .category-btn {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        font-weight: 400;
        border: 1px solid black;
        transition: 0.3s;
        background-color: white;
        color: black;
        margin-bottom: -15px;
    }

    .category-btn:hover {
        border: 2px solid #FFD400;
        color: #CC2E29 !important;
    }

    .category-btn.active {
        background-color: #FFD400 !important;
        color: #CC2E29 !important;
        border: none;
    }

    @media (max-width: 1200px) {
        .menu-grid {
            padding: 10px 80px;
            gap: 30px;
        }
        .text-h5 {
            font-size: 45px;
        }
        .text-h6 {
            font-size: 35px;
        }
    }

    @media (max-width: 900px) {
        .menu-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            padding: 10px 40px;
            gap: 20px;
        }
        .menu-card {
            width: 220px;
            height: 312px;
        }
        .q-img {
            height: 220px !important;
        }
        .menu-name {
            font-size: 18px;
        }
        .text-h5 {
            font-size: 40px;
        }
        .text-h6 {
            font-size: 30px;
        }
        .category-btn {
            width: 130px;
        }
    }

    @media (max-width: 600px) {
        .text-h5 {
            font-size: 35px;
            margin-top: 20px;
            margin-bottom: 30px;
        }
        .q-mb-sm.category-buttons, .q-mb-md.category-buttons {
            padding: 0 10px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .category-btn {
            width: auto;
            min-width: 80px;
            font-size: 12px;
            padding: 0 8px;
            width: 110px;
            height: 35px;
            margin: 4px;
        }
        .text-h6 {
            font-size: 28px;
            margin-top: 30px;
            margin-bottom: 40px;
            text-align: center;
            padding-left: 0;
        }
        .menu-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            padding: 10px 10px;
            gap: 0px;
        }
        .menu-card {
            width: 160px;
            height: 200px;
            margin-left: auto;
            margin-right: auto;
            margin-top: -20px;
            box-shadow: 0 5px 3px rgba(0,0,0,0.1);
        }
        .q-img {
            height: 140px !important;
            width: 100%;
            object-fit: cover;
        }
        .menu-name {
            font-size: 14px;
            padding: 6px;
            line-height: 1.2;
        }
    }

    @media (max-width: 400px) {
        .text-h5 {
            font-size: 28px;
        }
        .text-h6 {
            font-size: 22px;
        }
        .menu-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px;
        }
        .menu-card {
            max-width: 130px;
        }
        .q-img {
            height: 120px !important;
        }
        .menu-name {
            font-size: 13px;
            padding: 5px;
        }
        .category-btn {
            font-size: 11px;
            min-width: 70px;
            padding: 0 6px;
            height: 30px;
        }
    }
</style>