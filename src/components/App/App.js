import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from '../Login/Login';
import List from '../List/List';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/mainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  const loggedIn = localStorage.getItem('user');
  const [formReset, setFormReset] = useState(false);
  const [contacts, setContacts] = useState(null);

  // Перенаправление авторизованного пользователя ===
  useEffect(() => {
    loggedIn ? navigate('/list') : navigate('/signin');
  }, [loggedIn]);

  // Получение контактов авторизованным пользователем ===
  useEffect(() => {
    loggedIn &&
      mainApi.getContacts().then((contactsData) => {
        setContacts(contactsData);
      });
  }, [loggedIn]);

  // Вход пользователя по password: '1234', login: 'email@ya.ru',=========
  function handleLogin({ password, login }) {
    return mainApi.authorization(password, login).then((data) => {
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.login);
        setCurrentUser(data.user);
        setFormReset(true);

        navigate.push('/list');
      }
    });
  }

  // Выход пользователя =======================
  // Не стал делать запрос
  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='/signin'
            element={<Login handleLogin={handleLogin} formReset={formReset} />}
          />
          {contacts && (
            <Route
              path='/list'
              element={<List contacts={contacts} signOut={signOut} />}
            />
          )}
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
