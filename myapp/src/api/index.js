// src/api/index.js
import axios from 'axios';

/**
 * =========================
 * Axios 实例
 * =========================
 */
const api = axios.create({
  baseURL: 'https://nodered.powstar.top/',
    //baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * =========================
 * Token 存取
 * =========================
 */
const TOKEN_KEY = 'ems_access_token';
const REFRESH_KEY = 'ems_refresh_token';
const USER_KEY = 'ems_user';

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
/*
function setAuthData({ access_token, refresh_token, user }) {
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(REFRESH_KEY, refresh_token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
*/
function setAuthData(res) {
  if (res?.access_token) {
    localStorage.setItem(TOKEN_KEY, res.access_token);
  }
  if (res?.refresh_token) {
    localStorage.setItem(REFRESH_KEY, res.refresh_token);
  }
  if (res?.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  }
}

export function clearAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * =========================
 * 自动带 JWT
 * =========================
 */
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * =========================
 * 统一响应处理
 * =========================
 */
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      clearAuthData();
    }
    return Promise.reject(err.response?.data || err);
  }
);

/**
 * =========================
 * Auth API（基于你 Node-RED Flow）
 * =========================
 */
export const authApi = {
  /**
   * 登录
   */
  async login(username, password) {
    const res = await api.post('/api/auth/login', {
      username,
      password
    });

    // Node-RED 返回结构完全匹配
    setAuthData(res);
    return res;
  },

  /**
   * 登出（前端行为）
   */
  logout() {
    clearAuthData();
  },

  /**
   * 是否已登录
   */
  isAuthenticated() {
    return !!getAccessToken();
  }
};

export default api;


/*
import axios from 'axios'

axios.defaults.baseURL = 'https://nodered.powstar.top/';
axios.interceptors.request.use(config=>config);

axios.interceptors.response.use(
    res=> res,
    async err => {
        if (err.response?.status === 401) {
            const r = await axios.post('/api/auth/login', {
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
*/
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