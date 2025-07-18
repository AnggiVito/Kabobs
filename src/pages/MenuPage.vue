<template>
    <q-page class="q-pa-md">
        <div class="text-center">
            <h3 class="text-h5 q-mb-md">
                Menu Kabobs
            </h3>
            <div class="q-gutter-sm row justify-center q-mb-sm category-buttons">
                <q-btn label="Semua Menu" v-bind="getBtnProps('Semua Menu')" @click="goToCategory('Semua Menu')" />
                <q-btn label="Kebab" v-bind="getBtnProps('Kebab')" @click="goToCategory('Kebab')" />
                <q-btn label="Drinks" v-bind="getBtnProps('Drinks')" @click="goToCategory('Drinks')" />
                <q-btn label="Snacks" v-bind="getBtnProps('Snacks')" @click="goToCategory('Snacks')" />
            </div>

            <div class="q-gutter-sm row justify-center q-mb-md category-buttons">
                <q-btn label="Fun Box" v-bind="getBtnProps('Fun Box')" @click="goToCategory('Fun Box')" />
                <q-btn label="Fun Set" v-bind="getBtnProps('Fun Set')" @click="goToCategory('Fun Set')" />
                <q-btn label="Combobs" v-bind="getBtnProps('Combobs')" @click="goToCategory('Combobs')" />
                <q-btn label="Combo Seru" v-bind="getBtnProps('Combo Seru')" @click="goToCategory('Combo Seru')" />
                <q-btn label="Seasonal Menu" v-bind="getBtnProps('Seasonal Menu')" @click="goToCategory('Seasonal Menu')" />
            </div>
        </div>

        <div v-for="(items, category) in filteredMenuGroups" :key="category">
            <template v-if="items.length > 0">
                <div class="text-h6 text-bold q-mb-md category-title">{{ category }}</div>
                <div class="row q-col-gutter-xl menu-grid">
                    <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="col-xs-6 col-sm-4 col-md-3"
                    >
                        <q-card class="menu-card">
                            <q-img :src="item.image" style="height: 240px;" />
                            <div class="menu-name">{{ item.name }}</div>
                        </q-card>
                    </div>
                </div>
            </template>
            <template v-else-if="category !== 'Semua Menu'">
                <div class="text-h6 text-bold text-center q-mt-lg">Menu tidak ditemukan untuk kategori "{{ category }}".</div>
            </template>
        </div>
    </q-page>
    <FooterLayout />
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import FooterLayout from 'src/layouts/FooterLayout.vue'

    const router = useRouter()
    const route = useRoute()

    interface MenuItem {
        name: string;
        image: string;
    }

    interface AllMenusMap {
        [key: string]: MenuItem[];
        'Kebab': MenuItem[];
        'Drinks': MenuItem[];
        'Snacks': MenuItem[];
        'Fun Box': MenuItem[];
        'Fun Set': MenuItem[];
        'Combobs': MenuItem[];
        'Combo Seru': MenuItem[];
        'Seasonal Menu'?: MenuItem[];
    }

    const getBtnProps = (label: string) => {
        return {
            flat: selectedCategory.value !== label,
            outline: selectedCategory.value !== label,
            class: ['q-px-md category-btn', { active: selectedCategory.value === label }],
            noCaps: true,
            dense: true,
        }
    }

    const selectedCategory = ref('Semua Menu')

    watch(() => route.query.category, (newCategory) => {
        if (typeof newCategory === 'string' && allMenus[newCategory]) {
            selectedCategory.value = newCategory;
        } else {
            selectedCategory.value = 'Semua Menu';
        }
    }, { immediate: true });

    const goToCategory = (category: string) => {
        if (category === 'Semua Menu') {
            if (route.query.category) {
                void router.push({ path: '/Menu' });
            } else {
                selectedCategory.value = 'Semua Menu';
            }
        } else {
            if (selectedCategory.value !== category) {
                void router.push({ path: '/Menu', query: { category: category } });
            }
        }
    };

    const allMenus: AllMenusMap = {
        'Kebab' : [
            { name: 'Ala Carte Classic Kebab', image: '/images/kebab/ClassicKebab.png' },
            { name: 'Ala Carte Beef Italiano Kebab', image: '/images/kebab/BeefItaliano.png' },
            { name: 'Ala Carte Full Beef Kebab', image: '/images/kebab/FullBeef.png' },
            { name: 'Ala Carte Deluxe Classic Kebab', image: '/images/kebab/DeluxeClassic.png' },
            { name: 'Ala Carte Beef Cheesy Mayo', image: '/images/kebab/BeefCheesyMayo.png' },
            { name: 'Ala Carte Beef Cheese Kebab', image: '/images/kebab/BeefCheese.png' },
            { name: 'Ala Carte Barbeque Kebab', image: '/images/kebab/BarbequeKebab.png' },
            { name: 'Ala Carte Vegetable Kebab', image: '/images/kebab/VegetableKebab.png' },
            { name: 'Ala Carte Triple Cheese Kebab', image: '/images/kebab/TripleCheese.png' },
            { name: 'Ala Carte Supreme Kebab', image: '/images/kebab/SupremeKebab.png' },
            { name: 'Ala Carte Smoke Beef Kebab', image: '/images/kebab/SmokeBeef.png' },
            { name: 'Ala Carte Meat Lovers Kebab', image: '/images/kebab/MeatLover.png' },
        ],

        'Drinks' : [
            { name: 'Ice Jasmine Tea', image: '/images/drinks/JasmineTea.png' },
            { name: 'Ice Mango Tea', image: '/images/drinks/MangoTea.png' },
            { name: 'Ice Lychee Tea', image: '/images/drinks/LycheeTea.png' },
            { name: 'Mineral Water', image: '/images/drinks/MineralWater.png' },
            { name: 'Ice Matcha Latte', image: '/images/drinks/MatchaLatte.png' },
        ],

        'Snacks' : [
            { name: 'Tortilla Chips Cheese', image: '/images/snacks/ChipsCheese.png' },
            { name: 'Tortilla Chips Spicy Lime', image: '/images/snacks/ChipsChilliLime.png' },
            { name: 'Tortilla Chips Beef BBQ', image: '/images/snacks/ChipsBarbeque.png' },
            { name: 'French Fries', image: '/images/snacks/FrenchFries.png' },
            { name: 'Kresso Vanilla Cashew', image: '/images/snacks/VanillaCashew.png' },
            { name: 'Kresso Milky Corn', image: '/images/snacks/MilkyCorn.png' },
            { name: 'Kresso Hokkaido Cheese', image: '/images/snacks/HokkaidoCheese.png' },
            { name: 'Kresso Vanilla Cookie', image: '/images/snacks/ChocoVanilla.png' },
            { name: 'Kresso Choco Banana', image: '/images/snacks/ChocoBanana.png' },
        ],

        'Fun Box' : [
            { name: 'Fun Box Classic Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Beef Italiano Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Full Beef Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Deluxe Classic Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Beef Cheesy Mayo', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Beef Cheese Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Barbeque Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Vegetable Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Triple Cheese Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Supreme Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Smoke Beef Kebab', image: '/images/funbox/FunBox.png' },
            { name: 'Fun Box Meat Lovers Kebab', image: '/images/funbox/FunBox.png' },
        ],

        'Fun Set' : [
            { name: 'Fun Set Classic Kebab', image: '/images/funset/FSClassic.png' },
            { name: 'Fun Set Beef Italiano Kebab', image: '/images/funset/FSBeefItaliano.png' },
            { name: 'Fun Set Full Beef Kebab', image: '/images/funset/FSFullBeef.png' },
            { name: 'Fun Set Deluxe Classic Kebab', image: '/images/funset/FSDeluxeClassic.png' },
            { name: 'Fun Set Beef Cheesy Mayo', image: '/images/funset/FSBeefCheesyMayo.png' },
            { name: 'Fun Set Beef Cheese Kebab', image: '/images/funset/FSBeefCheese.png' },
            { name: 'Fun Set Barbeque Kebab', image: '/images/funset/FSBarbeque.png' },
            { name: 'Fun Set Vegetable Kebab', image: '/images/funset/FSVegetable.png' },
            { name: 'Fun Set Triple Cheese Kebab', image: '/images/funset/FSTripleCheese.png' },
            { name: 'Fun Set Supreme Kebab', image: '/images/funset/FSSupreme.png' },
            { name: 'Fun Set Smoke Beef Kebab', image: '/images/funset/FSSmokeBeef.png' },
            { name: 'Fun Set Meat Lovers Kebab', image: '/images/funset/FSMeatLover.png' },
        ],

        'Combobs' : [
            { name: 'Combobs Classic Kebab', image: '/images/combobs/CBClassic.png' },
            { name: 'Combobs Beef Italiano Kebab', image: '/images/combobs/CBBeefItaliano.png' },
            { name: 'Combobs Full Beef Kebab', image: '/images/combobs/CBFullBeef.png' },
            { name: 'Combobs Deluxe Classic Kebab', image: '/images/combobs/CBDeluxeClassic.png' },
            { name: 'Combobs Beef Cheesy Mayo', image: '/images/combobs/CBBeefCheesyMayo.png' },
            { name: 'Combobs Beef Cheese Kebab', image: '/images/combobs/CBBeefCheese.png' },
            { name: 'Combobs Barbeque Kebab', image: '/images/combobs/CBBarbeque.png' },
            { name: 'Combobs Vegetable Kebab', image: '/images/combobs/CBVegetable.png' },
            { name: 'Combobs Triple Cheese Kebab', image: '/images/combobs/CBTripleCheese.png' },
            { name: 'Combobs Supreme Kebab', image: '/images/combobs/CBSupreme.png' },
            { name: 'Combobs Smoke Beef Kebab', image: '/images/combobs/CBSmokeBeef.png' },
            { name: 'Combobs Meat Lovers Kebab', image: '/images/combobs/CBMeatLover.png' },
        ],

        'Combo Seru' : [
            { name: 'Combo Berdua A', image: '/images/comboseru/BerduaA.png' },
            { name: 'Combo Berdua B', image: '/images/comboseru/BerduaB.png' },
            { name: 'Combo Berdua C', image: '/images/comboseru/BerduaC.png' },
            { name: 'Combo Bertiga D', image: '/images/comboseru/BertigaD.png' },
            { name: 'Combo Bertiga E', image: '/images/comboseru/BertigaE.png' },
            { name: 'Combo Berempat F', image: '/images/comboseru/BerempatF.png' },
        ],
        'Seasonal Menu': [
            { name: 'Seasonal Kebab Delux', image: '/images/seasonal/seasonal_delux.png' },
            { name: 'Seasonal Kebab Crispy', image: '/images/seasonal/seasonal_crispy.png' },
        ]
    }

    const filteredMenuGroups = computed<AllMenusMap | { [key: string]: MenuItem[] }>(() => {
        const menuMap = allMenus;

        if (selectedCategory.value === 'Semua Menu') {
            return menuMap;
        } else {
            const itemsForCategory = menuMap[selectedCategory.value];

            if (itemsForCategory) {
                return {
                    [selectedCategory.value]: itemsForCategory
                };
            } else {
                return {
                    [selectedCategory.value]: []
                };
            }
        }
    });
</script>

<style scoped>
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