import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import MarkupForPopups from './MarkupForPopups';

function Login({
  isOpen,
  loggedIn,
  onLogin,
  signOut,
  isLoadingButton,
}) {
  const history = useHistory();
  const localEmail = localStorage.getItem('email') ? localStorage.getItem('email') : '';
  const [activeButton, setActiveButton] = React.useState(true);
  const [login, setLogin] = React.useState({
    email: localEmail || '',
    password: '',
  });
  const [validCheck, setValidCheck] = React.useState({
    password: '',
    email: '',
  });
  const textButton = isLoadingButton ? 'Проверка...' : 'Войти';
  const checkPopup = {
    name: 'check',
    title: 'Вход',
    buttonTitle: `${textButton}`,
  };

  function validationCheck(evt) {
    if (!evt.target.validity.valid) {
      return setValidCheck({ [evt.target.name]: evt.target.validationMessage });
    }
    return setValidCheck({ [evt.target.name]: '' });
  }

  function setEditLogin(evt) {
    setLogin({ ...login, [evt.target.name]: evt.target.value });
    if (Array.from(evt.target.form).some((e) => e.validationMessage)) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }

  function verifiesAuthorization(evt) {
    evt.preventDefault();
    if (!login.password || !login.email) {
      return;
    }
    onLogin(evt, login);
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);
  React.useEffect(() => {
    if (!localStorage.getItem('email')) {
      setLogin({ email: 'guest@pochta.ru', password: '123456' });
      setActiveButton(false);
    }
  }, []);

  return (
    <React.Fragment>
      <div className='page__elements'>
        <PopupWithForm
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          isOpen={isOpen}
          active={activeButton}
          signOut={signOut}
          onSubmit={verifiesAuthorization}>
          <MarkupForPopups.Login
            email={login.email}
            password={login.password}
            placeMessage={validCheck}
            setEditLogin={setEditLogin}
            validationCheck={validationCheck}
          />
        </PopupWithForm>
      </div>
    </React.Fragment>
  );
}

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoadingButton: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  signOut: PropTypes.func,
};

export default Login;
