import { defineStore } from 'pinia';

interface HomeState {
  heroImage: string;
  menuFavoritTitle: string;
  menuCards: string[];
  lihatSemuaMenuLabel: string;
  lihatSemuaMenuRoute: string;

  penawaranSpesialTitle: string;
  penawaranFixedImage: string;
  penawaranCards: string[];
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

  kStarsImages: string[];
  kStarsOverlayImage: string;

  socialMediaTitle: string;
  galleryImages: string[];
  socialMediaOverlayText: string;
  socialMediaIcons: { name: string; icon: string; url: string }[];
  instagramPosts: string[];

  isMenuHover: boolean;
  isPromoHover: boolean;
  isCaraOrderHover: boolean;
  isKebabMakerHover: boolean;
  
  autoScrollGalleryOverlayVisible: boolean;
  autoScrollAnimationId: number | undefined;
  galleryPos: number;
  gallerySpeed: number;
}

export const useHomeStore = defineStore('home', {
  state: (): HomeState => ({
    heroImage: '/images/HomeKebab.png',
    menuFavoritTitle: 'Menu Favorit',
    menuCards: [
      '/images/Thumbnail1.png',
      '/images/Thumbnail2.png',
      '/images/Thumbnail3.png',
      '/images/Thumbnail4.png',
      '/images/Thumbnail5.png',
      '/images/Thumbnail6.png',
    ],
    lihatSemuaMenuLabel: 'Lihat Semua',
    lihatSemuaMenuRoute: '/Menu',

    penawaranSpesialTitle: 'Penawaran Spesial',
    penawaranFixedImage: '/images/Penawaran1.png',
    penawaranCards: [
      '/images/Penawaran2.png',
      '/images/Penawaran3.png',
      '/images/Penawaran4.png',
    ],
    lihatSemuaPromoLabel: 'Lihat Semua',
    lihatSemuaPromoRoute: '/Promo',

    startOrderText: 'Mau Pesan Kabobs Sekarang?',
    startOrderButtonLabel: 'Mulai Pesan',
    startOrderButtonRoute: '/order-now',

    menuKiriImageBase: '/images/KebabMenu.png',
    menuKiriImageHover: '/images/KebabMenuHover.png',
    menuKiriTextLihat: 'LIHAT',
    menuKiriTextMenu: 'MENU',
    menuKiriRoute: '/Menu',

    outletKananImage: '/images/OutletHome.png',
    outletKananTextTemukan: 'Temukan',
    outletKananTextKabobs: 'Kabobs',
    outletKananTextCari: 'Cari Kabobs terdekat',
    outletKananRoute: '/Promo',

    caraOrderImageBase: '/images/CaraOrder1.png',
    caraOrderImageHover: '/images/CaraOrder2.png',
    caraOrderTextCara: 'CARA',
    caraOrderTextOrder: 'ORDER',
    caraOrderRoute: '/Cara-Order',

    kebabMakerImageBase: '/images/KebabMaker.png',
    kebabMakerImageOverlay: '/images/TextKebabMaker.png',

    kStarsImages: [
      '/images/KStars1.png',
      '/images/KStars2.png',
      '/images/KStars3.png',
      '/images/KStars4.png',
      '/images/KStars5.png',
    ],
    kStarsOverlayImage: '/images/KStars.png',

    socialMediaTitle: 'Kabobs Social Media',
    galleryImages: [
      '/images/Sosmed1.png',
      '/images/Sosmed2.png',
      '/images/Sosmed3.png',
      '/images/Sosmed4.png',
      '/images/Sosmed5.png',
      '/images/Sosmed6.png',
      '/images/Sosmed7.png',
      '/images/Sosmed8.png',
    ],
    socialMediaOverlayText: 'Follow Kabobs.id',
    socialMediaIcons: [
      { name: 'Facebook', icon: '/icons/Facebook.png', url: 'https://www.facebook.com/kabobs.id' },
      { name: 'Instagram', icon: '/icons/Instagram.png', url: 'https://www.instagram.com/kabobs.id/' },
      { name: 'TikTok', icon: '/icons/TikTok.png', url: 'https://www.tiktok.com/@kabobs.id' },
    ],
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

      const items = trackElement.innerHTML;
      if (trackElement.children.length === this.galleryImages.length) { 
        trackElement.innerHTML = items + items;
      }
      
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