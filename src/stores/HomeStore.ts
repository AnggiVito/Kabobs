import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

interface HomeItem {
  id: number;
  itemType: 'MenuFav' | 'Penawaran' | 'Gallery' | 'kStar' | 'SosmedIcon' | 'InstagramPost';
  imageUrl: string;
  title: string | null;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface DisplayHomeItem extends HomeItem {
  fullImageUrl: string;
}

interface HomeSetting {
  id: number;
  settingKey: string;
  settingValue: string | null;
}

interface HomeState {
  heroImage: string;
  menuFavoritTitle: string;
  menuCards: DisplayHomeItem[];
  lihatSemuaMenuLabel: string;
  lihatSemuaMenuRoute: string;

  penawaranSpesialTitle: string;
  penawaranFixedImage: string;
  penawaranCards: DisplayHomeItem[];
  lihatSemuaPromoLabel: string;
  lihatSemuaPromoRoute: string;

  startOrderText: string;
  startOrderButtonLabel: string;
  startOrderButtonRoute: string;

  menuKiriImageBase: string;
  menuKiriImageHover: string;
  menuKiriTextLihat: string;
  menuKiriTextMenu: string;
  menuKiriRoute: string;

  outletKananImage: string;
  outletKananTextTemukan: string;
  outletKananTextKabobs: string;
  outletKananTextCari: string;
  outletKananRoute: string;

  caraOrderImageBase: string;
  caraOrderImageHover: string;
  caraOrderTextCara: string;
  caraOrderTextOrder: string;
  caraOrderRoute: string;

  kebabMakerImageBase: string;
  kebabMakerImageOverlay: string;

  kStarsImages: DisplayHomeItem[];
  kStarsOverlayImage: string;

  socialMediaTitle: string;
  galleryImages: DisplayHomeItem[];
  socialMediaOverlayText: string;
  socialMediaIcons: { name: string; icon: string; url: string }[];
  instagramPosts: string[];

  isMenuHover: boolean;
  isPromoHover: boolean;
  isCaraOrderHover: boolean;
  isKebabMakerHover: boolean;
  
  isLoading: boolean;
  error: string | null;
  
  autoScrollGalleryOverlayVisible: boolean;
  autoScrollAnimationId: number | undefined;
  galleryPos: number;
  gallerySpeed: number;
}

export const useHomeStore = defineStore('home', {
  state: (): HomeState => ({
    heroImage: '',
    menuFavoritTitle: '',
    menuCards: [],
    lihatSemuaMenuLabel: 'Lihat Semua',
    lihatSemuaMenuRoute: '/Menu',

    penawaranSpesialTitle: '',
    penawaranFixedImage: '',
    penawaranCards: [],
    lihatSemuaPromoLabel: 'Lihat Semua',
    lihatSemuaPromoRoute: '/Promo',

    startOrderText: '',
    startOrderButtonLabel: 'Mulai Pesan',
    startOrderButtonRoute: '/order-now',

    menuKiriImageBase: '',
    menuKiriImageHover: '',
    menuKiriTextLihat: 'LIHAT',
    menuKiriTextMenu: 'MENU',
    menuKiriRoute: '/Menu',

    outletKananImage: '',
    outletKananTextTemukan: 'Temukan',
    outletKananTextKabobs: 'Kabobs',
    outletKananTextCari: 'Cari Kabobs terdekat',
    outletKananRoute: '/Promo',

    caraOrderImageBase: '',
    caraOrderImageHover: '',
    caraOrderTextCara: 'CARA',
    caraOrderTextOrder: 'ORDER',
    caraOrderRoute: '/Cara-Order',

    kebabMakerImageBase: '',
    kebabMakerImageOverlay: '',

    kStarsImages: [],
    kStarsOverlayImage: '/images/KStars.png',

    socialMediaTitle: 'Kabobs Social Media',
    galleryImages: [],
    socialMediaOverlayText: 'Follow Kabobs.id',
    socialMediaIcons: [],
    instagramPosts: [
      'https://www.instagram.com/reel/DEWrojpS4v3/',
      'https://www.instagram.com/reel/DL1z_LAyBs5/',
      'https://www.instagram.com/reel/DKqr-wTyujk/',
      'https://www.instagram.com/reel/DJtc1qgyWFf/'
    ],

    isMenuHover: false,
    isPromoHover: false,
    isCaraOrderHover: false,
    isKebabMakerHover: false,
    
    isLoading: false,
    error: null,
    
    autoScrollGalleryOverlayVisible: false,
    autoScrollAnimationId: undefined,
    galleryPos: 0,
    gallerySpeed: 1,
  }),

  getters: {
    getHeroImage: (state) => state.heroImage,
    getMenuFavoritTitle: (state) => state.menuFavoritTitle,
    getMenuCards: (state) => state.menuCards,
    getLihatSemuaMenuLabel: (state) => state.lihatSemuaMenuLabel,
    getLihatSemuaMenuRoute: (state) => state.lihatSemuaMenuRoute,
    getPenawaranSpesialTitle: (state) => state.penawaranSpesialTitle,
    getPenawaranFixedImage: (state) => state.penawaranFixedImage,
    getPenawaranCards: (state) => state.penawaranCards,
    getLihatSemuaPromoLabel: (state) => state.lihatSemuaPromoLabel,
    getLihatSemuaPromoRoute: (state) => state.lihatSemuaPromoRoute,
    getStartOrderText: (state) => state.startOrderText,
    getStartOrderButtonLabel: (state) => state.startOrderButtonLabel,
    getStartOrderButtonRoute: (state) => state.startOrderButtonRoute,
    getMenuKiriImageBase: (state) => state.menuKiriImageBase,
    getMenuKiriImageHover: (state) => state.menuKiriImageHover,
    getMenuKiriTextLihat: (state) => state.menuKiriTextLihat,
    getMenuKiriTextMenu: (state) => state.menuKiriTextMenu,
    getMenuKiriRoute: (state) => state.menuKiriRoute,
    getOutletKananImage: (state) => state.outletKananImage,
    getOutletKananTextTemukan: (state) => state.outletKananTextTemukan,
    getOutletKananTextKabobs: (state) => state.outletKananTextKabobs,
    getOutletKananTextCari: (state) => state.outletKananTextCari,
    getOutletKananRoute: (state) => state.outletKananRoute,
    getCaraOrderImageBase: (state) => state.caraOrderImageBase,
    getCaraOrderImageHover: (state) => state.caraOrderImageHover,
    getCaraOrderTextCara: (state) => state.caraOrderTextCara,
    getCaraOrderTextOrder: (state) => state.caraOrderTextOrder,
    getCaraOrderRoute: (state) => state.caraOrderRoute,
    getKebabMakerImageBase: (state) => state.kebabMakerImageBase,
    getKebabMakerImageOverlay: (state) => state.kebabMakerImageOverlay,
    getKStarsImages: (state) => state.kStarsImages,
    getKStarsOverlayImage: (state) => state.kStarsOverlayImage,
    getSocialMediaTitle: (state) => state.socialMediaTitle,
    getGalleryImages: (state) => state.galleryImages,
    getSocialMediaOverlayText: (state) => state.socialMediaOverlayText,
    getSocialMediaIcons: (state) => state.socialMediaIcons,
    getInstagramPosts: (state) => state.instagramPosts,
    getAutoScrollGalleryOverlayVisible: (state) => state.autoScrollGalleryOverlayVisible,
    getIsMenuHover: (state) => state.isMenuHover,
    getIsPromoHover: (state) => state.isPromoHover,
    getIsCaraOrderHover: (state) => state.isCaraOrderHover,
    getIsKebabMakerHover: (state) => state.isKebabMakerHover,
  },

  actions: {
    async fetchHomeData() {
      this.isLoading = true;
      this.error = null;
      try {
        const settingsResponse = await baseApi.get<HomeSetting[]>('home-settings');
        const settingsData = settingsResponse.data;
        const findSetting = (key: string) => settingsData.find(s => s.settingKey === key)?.settingValue || '';

        this.heroImage = `http://localhost:3333/${findSetting('heroImage')}`;
        this.menuFavoritTitle = findSetting('menuFavoritTitle');
        this.penawaranSpesialTitle = findSetting('penawaranSpesialTitle');
        this.penawaranFixedImage = `http://localhost:3333/${findSetting('penawaranFixedImage')}`;
        this.startOrderText = findSetting('startOrderText');
        this.menuKiriImageBase = `http://localhost:3333/${findSetting('menuKiriImageBase')}`;
        this.menuKiriImageHover = `http://localhost:3333/${findSetting('menuKiriImageHover')}`;
        this.outletKananImage = `http://localhost:3333/${findSetting('outletKananImage')}`;
        this.caraOrderImageBase = `http://localhost:3333/${findSetting('caraOrderImageBase')}`;
        this.caraOrderImageHover = `http://localhost:3333/${findSetting('caraOrderImageHover')}`;
        this.kebabMakerImageBase = `http://localhost:3333/${findSetting('kebabMakerImageBase')}`;
        this.kebabMakerImageOverlay = `http://localhost:3333/${findSetting('kebabMakerImageOverlay')}`;

        const menuResponse = await baseApi.get<HomeItem[]>('home-items', { params: { item_type: 'MenuFav' } });
        const penawaranResponse = await baseApi.get<HomeItem[]>('home-items', { params: { item_type: 'Penawaran' } });
        const galleryResponse = await baseApi.get<HomeItem[]>('home-items', { params: { item_type: 'Gallery' } });
        const kStarResponse = await baseApi.get<HomeItem[]>('home-items', { params: { item_type: 'kStar' } });
        const socialMediaResponse = await baseApi.get<HomeItem[]>('home-items', { params: { item_type: 'SosmedIcon' } });

        this.menuCards = menuResponse.data.map(item => ({
          ...item,
          fullImageUrl: `http://localhost:3333/${item.imageUrl}`
        }));
        this.penawaranCards = penawaranResponse.data.map(item => ({
          ...item,
          fullImageUrl: `http://localhost:3333/${item.imageUrl}`
        }));
        this.galleryImages = galleryResponse.data.slice().map(item => ({
          ...item,
          fullImageUrl: item.imageUrl ? `http://localhost:3333/${item.imageUrl}` : '',
        }));
        this.kStarsImages = kStarResponse.data.map(item => ({
          ...item,
          fullImageUrl: `http://localhost:3333/${item.imageUrl}`
        }));
        this.socialMediaIcons = socialMediaResponse.data.map(item => ({
          name: item.title || '',
          icon: `http://localhost:3333/${item.imageUrl}`,
          url: item.linkUrl || ''
        }));

      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          this.error = `Gagal mengambil data home: ${err.response?.data?.message || err.message}`;
        } else {
          this.error = 'Gagal mengambil data home: Terjadi kesalahan tidak diketahui.';
        }
        console.error('Error fetching home data:', err);
      } finally {
        this.isLoading = false;
      }
    },
    setMenuHover(value: boolean) {
      this.isMenuHover = value;
    },
    setPromoHover(value: boolean) {
      this.isPromoHover = value;
    },
    setCaraOrderHover(value: boolean) {
      this.isCaraOrderHover = value;
    },
    setKebabMakerHover(value: boolean) {
      this.isKebabMakerHover = value;
    },
    setAutoScrollGalleryOverlayVisible(value: boolean) {
      this.autoScrollGalleryOverlayVisible = value;
    },
    startAutoScrollAnimation(trackElement: HTMLElement) {
      this.stopAutoScrollAnimation();
      this.galleryPos = 0;

      const animate = () => {
        this.galleryPos -= this.gallerySpeed;
        const width = trackElement.scrollWidth / 2;

        if (Math.abs(this.galleryPos) >= width) {
          this.galleryPos = 0;
        }

        trackElement.style.transform = `translateX(${this.galleryPos}px)`;
        this.autoScrollAnimationId = requestAnimationFrame(animate);
      };

      this.autoScrollAnimationId = requestAnimationFrame(animate);
    },
    stopAutoScrollAnimation() {
      if (this.autoScrollAnimationId !== undefined) {
        cancelAnimationFrame(this.autoScrollAnimationId);
        this.autoScrollAnimationId = undefined;
      }
    },
  },
});