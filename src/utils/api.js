import axios from 'axios';
import { contacts, user } from '../constants/constants';

// Перехватчик  =================

// Создаем экземпляр ===============
export const $api = axios.create({
  baseURL: 'http://localhost:3000',
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const url = error.config.url;

    // Запрос по массиву контактов --------
    if (url === '/contacts') {
      return $api.request({ contacts: contacts });
    }

    // Запрос на авторизацию --------
    const userAuth = JSON.stringify(user);

    if (url === '/signin' && error.config.data === userAuth) {
      const authData = { user: user, token: 'token' };

      return $api.request({ authData: authData });
    }
  }
);
