import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import { baseApi } from 'boot/axios';

interface BackendLocation {
  id: number;
  name: string;
  address: string;
  mapUrl: string;
  regionName: string;
  lat: number | null;
  lng: number | null;
}

interface FrontendOutlet {
  id: number;
  name: string;
  address: string;
  mapUrl: string;
  regionName: string;
  lat: number | null;
  lng: number | null;
  showAddress?: boolean;
  coords: [number, number];
}

interface Region {
  name: string;
  outlets: FrontendOutlet[];
}

interface LokasiState {
  search: string;
  showSuggestions: boolean;
  lokasiData: Region[];
  isLoading: boolean;
  error: string | null;
  activeOutletId: number | null;
}

export const useLokasiStore = defineStore('lokasi', {
  state: (): LokasiState => ({
    search: '',
    showSuggestions: false,
    lokasiData: [],
    isLoading: false,
    error: null,
    activeOutletId: null,
  }),

  getters: {
    filteredSuggestions: (state) => {
      const uniqueRegionNames = Array.from(new Set(state.lokasiData.map(region => region.name)));
      const allSuggestions = [...uniqueRegionNames];
      
      const searchTerm = state.search.toLowerCase();
      if (!searchTerm) return allSuggestions;

      return allSuggestions.filter((s) =>
        s.toLowerCase().includes(searchTerm)
      );
    },
    
    filteredRegions: (state) => {
      const searchTerm = state.search.toLowerCase();
      const groupedRegions: { [key: string]: FrontendOutlet[] } = {};

      if (state.lokasiData.length === 0 && !state.isLoading && !state.error && !searchTerm) {
        return [];
      }

      let allOutletsFlat: FrontendOutlet[] = [];
      state.lokasiData.forEach(region => {
        allOutletsFlat = allOutletsFlat.concat(region.outlets);
      });

      const filteredOutletsFlat = allOutletsFlat.filter(outlet => {
        const matchesName = outlet.name.toLowerCase().includes(searchTerm);
        const matchesAddress = outlet.address.toLowerCase().includes(searchTerm);
        const matchesRegion = outlet.regionName.toLowerCase().includes(searchTerm);
        return matchesName || matchesAddress || matchesRegion;
      });

      filteredOutletsFlat.forEach(outlet => {
        if (!groupedRegions[outlet.regionName]) {
          groupedRegions[outlet.regionName] = [];
        }
        (groupedRegions[outlet.regionName] as FrontendOutlet[]).push(outlet);
      });

      const result: Region[] = Object.keys(groupedRegions).map(regionName => ({
        name: regionName,
        outlets: groupedRegions[regionName] as FrontendOutlet[]
      }));

      if (searchTerm && result.length === 1 && result[0] && result[0].name.toLowerCase() === searchTerm) {
        return state.lokasiData.filter(r => r.name.toLowerCase() === searchTerm);
      }
      
      if (!searchTerm) {
          return state.lokasiData;
      }

      return result;
    },
  },

  actions: {
    setSearch(value: string | number | null) {
      this.search = value !== null ? String(value) : '';
    },
    setShowSuggestions(value: boolean) {
      this.showSuggestions = value;
    },
    selectSuggestion(s: string) {
      this.search = s;
      this.showSuggestions = false;
    },
    doSearch() {
      this.showSuggestions = false;
    },
    handleBlur() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
    toggleAddressVisibility(outletName: string, regionName: string) {
      const region = this.lokasiData.find(r => r.name === regionName);
      if (region) {
        const outlet = region.outlets.find(o => o.name === outletName);
        if (outlet) {
          outlet.showAddress = !outlet.showAddress;
          if (outlet.showAddress) {
            this.setActiveOutlet(outlet.id);
          } else {
            this.setActiveOutlet(null);
          }
        }
      }
    },

    setActiveOutlet(id: number | null) {
      this.activeOutletId = id;
    },

    async fetchLokasiData() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await baseApi.get<BackendLocation[]>('/locations');
        const rawLocations = response.data;

        const groupedLocations: { [key: string]: FrontendOutlet[] } = {};
        rawLocations.forEach(loc => {
          const processedOutlet: FrontendOutlet = {
            ...loc,
            showAddress: false,
            coords: [
              loc.lat !== null ? loc.lat : -6.917464, 
              loc.lng !== null ? loc.lng : 107.619122  
            ]
          };

          if (!groupedLocations[loc.regionName]) {
            groupedLocations[loc.regionName] = [];
          }
          (groupedLocations[loc.regionName] as FrontendOutlet[]).push(processedOutlet);
        });

        this.lokasiData = Object.keys(groupedLocations).map(regionName => ({
          name: regionName,
          outlets: groupedLocations[regionName] as FrontendOutlet[]
        }));
        
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          this.error = `Gagal mengambil data lokasi: ${err.response?.data?.message || err.message}`;
        } else if (err instanceof Error) {
          this.error = `Gagal mengambil data lokasi: ${err.message}`;
        } else {
          this.error = 'Gagal mengambil data lokasi: Terjadi kesalahan yang tidak diketahui.';
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});