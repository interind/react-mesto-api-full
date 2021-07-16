class Api {
  constructor({
    url,
    login,
    user,
    cards,
    auth,
  }) {
    this._url = url;
    this._user = user;
    this._cards = cards;
    this.login = login;
    this.auth = auth;
  }

  _getResponse(res) {
    const status = [200, 400, 401, 409];
    if (status.includes(res.status)) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка api: ${res.status}`));
  }

  register(arg) { // регистрация
    const user = Object.fromEntries(Object.entries(arg)
      .filter(([key, value]) => [key, value][1] !== ''));
    return fetch(`${this._url}${this.auth}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ ...user }),
    }).then(this._getResponse);
  }

  authorizationPost({ password, email }) { // получение токена
    return fetch(`${this._url}${this.login}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ password, email }),
    }).then(this._getResponse);
  }

  getInfoForUser() {
    return fetch(`${this._url}${this._user}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  getInfoForCards() {
    return fetch(`${this._url}${this._cards}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._url}${this._user}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponse);
  }

  updateUserAvatar({ avatar }) {
    return fetch(`${this._url}${this._user}/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}${this._cards}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponse);
  }

  changeLikeCardStatus(infoId, isLike) {
    const toggleMethod = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._url}${this._cards}/${infoId}/likes`, {
      method: toggleMethod,
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}${this._cards}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(this._getResponse);
  }
}

const api = new Api({
  url: '/',
  user: 'users/me',
  cards: 'cards',
  login: 'signin',
  auth: 'signup',
});

export default api;
