import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 1000 * 60
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {

        return new Promise((resolve, reject) => {
            const res = response.data

            if (res.code !== 200) {
                let duration = 5
                if (res.code === 402) {
                    duration = 1.5
                    setTimeout(() => {

                    }, duration * 1000)
                } else {
                    $message.error(res.message || 'Error')
                    resolve(res)
                }
            } else {
                resolve(res)
            }
        })
    },
    res => {
        $message.error(res.message || 'Error')
        return Promise.reject(res)
    }
)

export default service
