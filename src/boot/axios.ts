import { boot } from 'quasar/wrappers'
import axios from 'axios'

const baseApi = axios.create({
    baseURL: 'http://localhost:3333/',
})

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$baseApi = baseApi
})

export { axios, baseApi }
