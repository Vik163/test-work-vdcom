import { $api } from './api';

export class MainApi {
  getContacts() {
    return $api.get('/contacts').then((res) => res.config.contacts);
  }

  authorization(password, login) {
    return $api
      .post('/signin', {
        password: password,
        login: login,
      })
      .then((res) => res.config.authData);
  }

  signOut() {
    return $api.get('/signout').then((res) => res);
  }
}

export const mainApi = new MainApi();
