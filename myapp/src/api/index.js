// src/api/index.js
import axios from 'axios';

/**
 * =========================
 * Axios 实例
 * =========================
 */
const BASE_URL = 'https://nodered.powstar.top/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * =========================
 * Token / User 本地存取
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
 * 请求拦截器：自动带 JWT
 * =========================
 */
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * =========================
 * 刷新 Token 逻辑（内部使用）
 * =========================
 */
let isRefreshing = false;
let refreshPromise = null;

// 专门用“裸” axios 调用 refresh，避免递归进 api 的拦截器
async function requestRefreshToken(refreshToken) {
  const resp = await axios.post(
    `${BASE_URL}api/auth/refresh`,
    { refresh_token: refreshToken },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
  return resp.data; // { access_token }
}

/**
 * =========================
 * 响应拦截器：
 *   - 正常 → res.data
 *   - 401 → 使用 refresh_token 换新 access_token 并重试
 * =========================
 */
api.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    const { response, config } = error || {};
    if (!response || !config) {
      // 网络错误或其它非 HTTP 错误
      return Promise.reject(error);
    }

    // 非 401，直接透传
    if (response.status !== 401) {
      return Promise.reject(response.data || error);
    }

    // 自己已经重试过一次，仍 401 → 不再循环
    if (config._retry) {
      clearAuthData();
      return Promise.reject(response.data || error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAuthData();
      return Promise.reject(response.data || error);
    }

    try {
      // 确保同一时间只发一个 refresh 请求
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = requestRefreshToken(refreshToken)
          .finally(() => {
            isRefreshing = false;
          });
      }

      const data = await refreshPromise; // { access_token }

      if (!data || !data.access_token) {
        clearAuthData();
        return Promise.reject(response.data || error);
      }

      // 更新新的 access_token
      localStorage.setItem(TOKEN_KEY, data.access_token);

      // 标记原请求为“已重试”，避免死循环
      config._retry = true;
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${data.access_token}`;

      // 使用 api 再发一次原请求
      return api(config);
    } catch (e) {
      // refresh 失败，彻底登出
      clearAuthData();
      return Promise.reject(e.response?.data || e);
    }
  }
);

/**
 * =========================
 * Auth API
 * =========================
 */
export const authApi = {
  /**
   * 登录
   */
  async login(username, password) {
    const res = await api.post('/api/auth/login', { username, password });
    // Node-RED 返回：{ access_token, refresh_token, user }
    setAuthData(res);
    return res;
  },

  /**
   * 获取当前用户（从 token 解析出来）
   * 对应 Node-RED: GET /api/auth/me
   */
  async me() {
    const res = await api.get('/api/auth/me');
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

/**
 * =========================
 * EMS API 示例
 * =========================
 */
export const emsApi = {
  /**
   * 实时数据
   */
  async getRealtime() {
    return api.get('/api/ems/realtime');
  }

  // 后续你还可以在这里增加：
  // - getHistory()
  // - getDeviceList()
  // - 等等...
};

export default api

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