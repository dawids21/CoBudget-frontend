import axios from 'axios'
import Vue from 'vue'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 5000,
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