import React from 'react';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import api from '../utils/api';
import Main from './Main';
import Login from './Login';
import NotFound from './NotFound/NotFound';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader/Loader';
import Register from './Register';
import ErrorPage from './Error/ErrorPage';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import AddPlacePopup from './AddPlacePopup';
import ErrorBoundary from './Error/ErrorBoundary';
import ProtectedRoute from './ProtectedRoute';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../context/CurrentUserContext';
import Navbar from './Navbar';
import Page from './Page';

function App() {
  const history = useHistory();
  const [isCard, setIsCard] = React.useState({});
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopup] = React.useState(false);
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    _id: '',
    avatar: '',
    email: '',
  }); // тут информация обо мне с сервера
  const [cards, setCards] = React.useState([]); // тут информация о карточках
  const [statusOk, setIsOk] = React.useState(true); // флаг для ошибки сервера
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // лоадер при загрузке страницы

  const [statusError, setError] = React.useState({}); // флаг для ошибки сервера
  const [isOpenCard, setOpenCard] = React.useState(false); // значение для попапа с картинкой
  const [isOpenCheck, setOpenCheck] = React.useState(true); // окно информации регистрации
  const [isTooltip, setTooltip] = React.useState({
    isOpenTool: false,
    status: false,
    message: '',
  });
  const [selectedCard, setSelectedCard] = React.useState({}); // объект для попапа с картинкой
  const [buttonLoading, setButtonLoading] = React.useState(false); // Лоадер для кнопки сохранить.
  const [userAuthInfo, setUserAuthInfo] = React.useState({
    link: '/sign-up',
    info: '',
  });

  function infoMessage(text, bool) {
    setTooltip({
      ...isTooltip,
      isOpenTool: true,
      status: bool,
      message: text,
    });
  }

  function closeAllPopups() {
    // закрытие всех попапов
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setConfirmDeletePopup(false);
    setOpenCard(false);
    setButtonLoading(false);
    setOpenCheck(true);
    setTooltip({
      ...isTooltip,
      isOpenTool: false,
      message: '',
    });
  }

  function handleLogin(evt) {
    evt.preventDefault();
    setUserAuthInfo({ ...userAuthInfo, link: '/sign-in' });
    setLoggedIn(true);
    setLoading(true);
    return history.push('/');
  }

  function start() {
    setLoading(true);
    Promise.all([api.getInfoForUser(), api.getInfoForCards()])
      .then(([dataUser, dataCards]) => {
        if (!(dataUser && dataCards) || (dataUser.error && dataCards.error)) {
          setError({ ...statusError, message: 'ошибка данных' });
          Promise.reject(new Error('ошибка данных'));
        }
        setCurrentUser({ ...dataUser });
        setCards([...dataCards]);
        setUserAuthInfo({
          info: '',
          link: '/sign-in',
        });
        setError(null);
        setIsOk(true);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error('Информация сервера с ошибкой', err.message);
        setError(err);
        setIsOk(false);
        localStorage.removeItem('email');
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onLogin(evt, emailAndPassword) {
    setButtonLoading(true);
    api
      .authorizationPost({
        ...emailAndPassword,
      })
      .then((data) => {
        setButtonLoading(false);
        if (data.email) {
          localStorage.setItem('email', data.email);
          localStorage.setItem('status', 'true');
          handleLogin(evt);
          start();
          setOpenCheck(false);
          infoMessage('Добро пожаловать на проект Mesto', true);
        } else if (data.message) {
          infoMessage(data.message, false);
        }
      })
      .catch((err) => {
        infoMessage('', false);
        console.error(err);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  }

  function onRegister(arg) {
    setButtonLoading(true);
    api
      .register(arg)
      .then((res) => {
        if (res.data) {
          setButtonLoading(false);
          infoMessage('', true);
          localStorage.setItem('email', res.data.email);
          history.push('/sign-in');
          setUserAuthInfo({ ...userAuthInfo, link: '/sign-up' });
        } else if (res.error) {
          infoMessage(res.error, false);
        } else if (res.message) {
          infoMessage(res.message, false);
        } else {
          console.error('другая ошибка: res');
        }
      })
      .catch((err) => {
        infoMessage('', false);
        console.error(err);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  }

  function handleLogOut(evt) {
    evt.preventDefault();
    setLoggedIn(false);
  }

  function signOut(evt) {
    if (evt.target.text === 'Выйти') {
      if (localStorage.getItem('email')) {
        localStorage.removeItem('email');
        localStorage.removeItem('status');
        setCurrentUser({
          name: '',
          about: '',
          _id: '',
          avatar: '',
          email: '',
        });
        setError(null);
        handleLogOut(evt);
        history.push('/sign-in');
        setUserAuthInfo({ ...userAuthInfo, link: '/sign-up' });
      } else {
        localStorage.clear();
        handleLogOut(evt);
        history.push('/sign-in');
        setUserAuthInfo({ ...userAuthInfo, link: '/sign-up' });
      }
    } else if (evt.target.text === 'Регистрация') {
      history.push('/sign-up');
      setUserAuthInfo({ ...userAuthInfo, link: '/sign-in' });
    } else if (evt.target.text === 'Войти') {
      history.push('/sign-in');
      setUserAuthInfo({ ...userAuthInfo, link: '/sign-up' });
    }
  }

  function toggleNavbar(evt) {
    if (evt.target.checked) {
      setNavbarOpen(true);
    } else {
      setNavbarOpen(false);
    }
  }

  function handleUpdateUser({ name, about }) {
    // получаем новую информацию пользователя  с сервера
    setButtonLoading(true);

    api
      .updateUserInfo({ name, about })
      .then((infoUser) => {
        if (!infoUser || infoUser.error) {
          setError({ ...statusError, message: 'ошибка данных' });
          return Promise.reject(new Error('ошибка данных'));
        }
        setError(null);
        return setCurrentUser({
          ...currentUser,
          name: infoUser.name,
          about: infoUser.about,
        });
      })
      .catch((err) => console.error('Информация обновления пользователя с ошибкой', err))
      .finally(() => {
        setButtonLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonLoading(true);
    // получаем обновленный аватар с сервера
    api
      .updateUserAvatar({ avatar })
      .then((infoAvatar) => {
        if (!infoAvatar || infoAvatar.error) {
          setError({ ...statusError, message: 'ошибка данных' });
          return Promise.reject(new Error('ошибка данных'));
        }
        setError(null);
        return setCurrentUser({ ...currentUser, avatar: infoAvatar.avatar });
      })
      .catch((err) => console.error('Информация обновления пользователя с ошибкой', err))
      .finally(() => {
        setButtonLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlace({ name, link }) {
    setButtonLoading(true);
    // получаем новую карточку с сервера и вставляем в начало
    api
      .addCard({ name, link })
      .then((newCard) => {
        if (!newCard || newCard.error) {
          setError({ ...statusError, message: 'ошибка данных' });
          return Promise.reject(new Error('ошибка данных'));
        }
        setError(null);
        return setCards([newCard, ...cards]);
      })
      .catch((err) => console.error('Информация обновления карточки с ошибкой', err))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }
  function handleConfirmDeleteClick(card) {
    setConfirmDeletePopup(true);
    setIsCard(card);
  }
  function handleCardClick({ ...props }) {
    // для открытия попапа с картинкой
    setSelectedCard({ ...props });
    setOpenCard(true);
  }

  function handleCardLike({ likes, _id }) {
    // получаем лайки с сервера
    const isLiked = likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(_id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === _id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error('Информация по карточкам с ошибкой', err.message));
  }

  function handleCardDelete({ _id }) {
    // удаляем карточку
    const idCard = _id;
    setButtonLoading(true);
    api
      .deleteCard(_id)
      .then((res) => {
        if (res.error) {
          setError({ ...statusError, message: 'ошибка данных' });
          return Promise.reject(new Error('ошибка данных'));
        }
        setError(null);
        return setCards(cards.filter((card) => card._id !== idCard));
      })
      .catch((err) => console.error('Информация по карточкам с ошибкой', err.message))
      .finally(() => {
        setButtonLoading(false);
        closeAllPopups();
      });
  }

  function closeAllPopupsEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  async function toggleEventListenerWindow(bool) {
    if (bool) {
      window.addEventListener('keydown', closeAllPopupsEsc);
    } else {
      window.removeEventListener('keydown', closeAllPopupsEsc);
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('status')) {
      start();
    } else {
      setLoggedIn(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  return (
    <React.Fragment>
      <Page>
        <CurrentUserContext.Provider value={currentUser}>
          <ErrorBoundary>
          {isNavbarOpen && (
            <Navbar
              selectorPlace={'page'}
              link={userAuthInfo.link}
              signOut={signOut}
            />
          )}
            <Header
              selectorPlace={'header'}
              link={userAuthInfo.link}
              isNavbarOpen={isNavbarOpen}
              signOut={signOut}
              toggleNavbar={toggleNavbar}
            />
            {statusError && <ErrorPage error={statusError} />}
            <InfoTooltip
              isOpen={isTooltip}
              onClose={closeAllPopups}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            {loading && <Loader />}
            <Switch>
              <ProtectedRoute
                exact path='/'
                loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  handleCardLike={handleCardLike}
                  onAddPlace={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  handleCardDelete={handleConfirmDeleteClick}
                />
              </ProtectedRoute>
              <Route path='/sign-in' exact>
                <Login
                  loggedIn={loggedIn}
                  isOpen={isOpenCheck}
                  isLoadingButton={buttonLoading}
                  onLogin={onLogin}
                  handleLogin={handleLogin}
                />
              </Route>
              <Route path='/sign-up' exact>
                <Register
                  loggedIn={loggedIn}
                  isOpen={isOpenCheck}
                  isLoadingButton={buttonLoading}
                  signOut={signOut}
                  onRegister={onRegister}
                  />
              </Route>
              <Route path='*' component={NotFound} />
            </Switch>
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              isLoadingButton={buttonLoading}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              isLoadingButton={buttonLoading}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              isLoadingButton={buttonLoading}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            <DeleteCardPopup
              isCard={isCard}
              isLoadingButton={buttonLoading}
              isOpen={isConfirmDeletePopupOpen}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            <ImagePopup
              isOpen={isOpenCard}
              selectedCard={selectedCard}
              onClose={closeAllPopups}
              toggleEventListenerWindow={toggleEventListenerWindow}
            />
            {loggedIn && <Footer />}
            {!statusOk && (
              <div className='page__elements'>
                <ErrorPage error={statusError} message={'попробуйте позже'} />
              </div>
            )}
          </ErrorBoundary>
        </CurrentUserContext.Provider>
      </Page>
    </React.Fragment>
  );
}

export default App;
