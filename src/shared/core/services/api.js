import axios from 'axios';

const API_DOMAIN = process.env.REACT_APP_BASE_URL;
const STATUS_CODE = {
  NO_INTERNET: 0,
  REQUEST_TIMEOUT: 1,
  UNEXPECTED: 2,
};

export class ErrorHandler {
  data;
  status;

  constructor(e) {
    // Error request timeout
    if ((e.code && e.code === 'ECONNABORTED') || e?.response?.status === 408) {
      this.status = STATUS_CODE.REQUEST_TIMEOUT;
      this.data = {
        errors: [
          {
            code: '',
            message: STATUS_CODE.REQUEST_TIMEOUT,
          },
        ],
      };
    } else if (e?.response?.status === 0 || !navigator.onLine) {
      this.status = STATUS_CODE.NO_INTERNET;
      this.data = {
        errors: [
          {
            code: '',
            message: `${STATUS_CODE.NO_INTERNET}`,
          },
        ],
      };
    } else if (e?.response?.data?.errors) {
      // handle error message sent from API
      this.status = e?.response?.status;
      this.data = {
        errors: e?.response?.data?.errors?.map((x) => {
          let message = e?.response?.status;
          // For special cases
          if (
            (e?.response?.status === 400 && x.code === 'SYS_0013') ||
            (e?.response?.status === 400 && x.code === 'S0009')
          ) {
            message = x.code;
          }
          return {
            ...x,
            message,
          };
        }),
      };
    } else if ([400, 401, 404, 422, 500, 503].includes(e?.response?.status)) {
      this.status = e.response.status;
      this.data = {
        errors: [
          {
            code: e.response.status,
            message: e.response.status,
          },
        ],
      };
    } else {
      this.status = STATUS_CODE.UNEXPECTED;
      this.data = {
        errors: [
          {
            code: '',
            message: STATUS_CODE.UNEXPECTED,
          },
        ],
      };
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
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true
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
