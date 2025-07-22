import { ref } from 'vue'
import { defineStore } from 'pinia'
import { baseApi } from 'boot/axios'

export interface Platform {
    logo: string
    text: string
}

export interface PromoItem {
    id?: number
    image: string
    title: string
    description: string
    expired: string
    platforms: Platform[]
}

type PromoResponse = Omit<PromoItem, 'platforms'>

export const usePromoStore = defineStore('promo', () => {
    const promos = ref<PromoItem[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const defaultPlatforms: Platform[] = [
        { logo: '/icons/DineIn.png', text: 'All Outlet' },
        { logo: '/icons/Delivery.png', text: 'All Outlet' },
        { logo: '/icons/TakeAway.png', text: 'All Outlet' },
    ]

    const fetchPromos = async () => {
        isLoading.value = true
        error.value = null
        try {
            const { data } = await baseApi.get('promos')
            promos.value = (data as PromoResponse[]).map((item) => ({
                ...item,
                platforms: defaultPlatforms,
            }))
        } catch (err) {
            error.value = 'Failed to fetch promos.'
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    return {
        promos,
        isLoading,
        error,
        fetchPromos,
    }
})
