import axios from 'axios';
import { getToken, removeToken, removeGuid } from './auth';

const API_DOMAIN = process.env.REACT_APP_BASE_URL;
const STATUS_CODE = {
  NO_INTERNET: 0,
  REQUEST_TIMEOUT: 1,
  UNEXPECTED: 2,
};

export class ErrorHandler {
  status;
  message;

  constructor(e) {
    // Error request timeout
    if ((e.code && e.code === 'ECONNABORTED') || e?.response?.status === 408) {
      this.status = STATUS_CODE.REQUEST_TIMEOUT;
      this.message = STATUS_CODE.REQUEST_TIMEOUT;
    } else if (e?.response?.status === 401) {
      this.status = e?.response?.status;
      this.message = e?.response?.status;
      removeToken();
      removeGuid();
      window.location.href = '/auth/login';
    } else {
      this.status = STATUS_CODE.UNEXPECTED;
      this.message = STATUS_CODE.UNEXPECTED;
    }
  }
}
export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/`,
      timeout: 600000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    this.axiosInstance.interceptors.request.use((_config) => {
      return _config;
    });
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  makeRequest(method, url, moreConfigs = {}) {
    return this.axiosInstance({
      method,
      url,
      ...moreConfigs,
    });
  }
}
