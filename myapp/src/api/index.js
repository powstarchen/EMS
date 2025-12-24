import axios from 'axios'

axios.defaults.baseURL = 'https://nodered.powstar.top/';
axios.interceptors.request.use(config=>config);

axios.interceptors.response.use(
    res=> res,
    async err => {
        if (err.response?.status === 401) {
            const r = await axios.post('/auth/refresh', {
                refreshToken: localStorage.getItem('refreshToken')
            });
            localStorage.setItem('token',r.data.accessToken);
            err.config.headers.Authorization = 
            'bearer' + r.data.accessToken;
            return axios(err.config);
        }
        return Promise.reject(err);
        }
    );

export default axios

/*
import axios from 'axios'

axios.defaults.baseURL = 'https://nodered.powstar.top/';
axios.interceptors.request.use(config=>config);

axios.interceptors.response.use(res=>{
    return res
},err=>{
    return Promise.reject(err)
})

export default axios
*/