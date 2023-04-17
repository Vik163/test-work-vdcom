import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from '../Login/Login';
import List from '../List/List';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { auth } from '../../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = useState({
    id: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = useState(true);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [valueSubmit, setValueSubmit] = useState('Сохранить');
  const [valueSubmitDeleteCard, setValueSubmitDeleteCard] = useState('Да');
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  // Проверка авторизации ----------------------
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLogInfo({
              id: res.data._id,
              email: res.data.email,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Проверка авторизации при загрузке страницы
  // useEffect(() => {
  //   checkToken();
  // }, []);

  // Перенаправление авторизованного пользователя
  useEffect(() => {
    if (loggedIn) {
      navigate('/list');
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getInitialCards()])
  //     .then(([userData, cards]) => {
  //       setCurrentUser(userData);
  //       setCards(cards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // Вход пользователя -----------------------------
  function handleLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          checkToken();

          navigate.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  // Выход пользователя -------------------
  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setLogInfo({
      id: null,
      email: null,
    });
    navigate.push('/sign-in');
  }

  // // Удаление карты -----------------------------
  // function handleCardDelete(e) {
  //   e.preventDefault();

  //   setValueSubmitDeleteCard('Сохранение...');
  //   api
  //     .deleteCard(cardDelete)
  //     .then(() => {
  //       // Удаление выбранной карты ------------------------------------------
  //       setCards((state) => state.filter((c) => !(c._id === cardDelete._id)));
  //       // -------------------------------------------------------------------
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setValueSubmitDeleteCard('Да');
  //     });
  // }

  // Обновление данных пользователя ----------
  // function handleUpdateUser(obj) {
  //   setValueSubmit('Сохранение...');

  //   api
  //     .sendInfoProfile(obj)
  //     .then((result) => {
  //       setCurrentUser(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setValueSubmit('Сохранить');
  //     });
  // }

  // Переключение лайков ------------------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/login' element={<Login handleLogin={handleLogin} />} />
          <Route path='/list' element={<List />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
