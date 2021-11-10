import axios from 'axios'
import Vue from 'vue'

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    timeout: process.env.VUE_APP_BACKEND_TIMEOUT,
})

axiosInstance.interceptors.request.use(request => {
        request.headers = {
            ...request.headers,
            Authorization: `Bearer ${Vue.prototype.$auth.getAccessToken()}`,
        }
        return request
    },
    error => Promise.reject(error),
)

export default axiosInstance