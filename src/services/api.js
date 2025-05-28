import axios from "axios";

// import {useToast} from "vue-toastification";
// const toast = useToast();

const apiInstance = axios.create({
  baseURL: '/api/dash',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
  }
});

const unauthorized = (err) => {
  if (err.response.status === 401) {
    // toast.error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
    localStorage.removeItem('token');
    window.location.href = '/dash/login';
  }
  return Promise.reject(err);
}

const errorHandler = (err) => {
  if (err.response.data) {
    if (err.response.data.errors) {
      let errors = err.response.data.errors;
      let message = '';
      for (let key in errors) {
        message += errors[key] + '  ';
      }
      // toast.error(message);
    } else {
      // toast.error(err.response.data.message);
    }
  }
  return Promise.reject(err);
}

const api = {
  get: (url, config = {}) => {
    return apiInstance.get(url, config).catch(unauthorized).catch(errorHandler);
  },
  post: (url, data = {}, config = {}) => {
    return apiInstance.post(url, data, config).catch(unauthorized).catch(errorHandler);
  },
  put: (url, data = {}, config = {}) => {
    return apiInstance.put(url, data, config).catch(unauthorized).catch(errorHandler);
  },
  delete: (url, config = {}) => {
    return apiInstance.delete(url, config).catch(unauthorized).catch(errorHandler);
  }
}

window.api = api;

export default api;
