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
  const [emailAndPassword, setEmailAndPassword] = React.useState({
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

  function setPasswordUser(evt) {
    setEmailAndPassword({
      ...emailAndPassword,
      password: evt.target.value,
    });
    setActiveButton(!evt.target.value);
  }

  function setEmailUser(evt) {
    setEmailAndPassword({ ...emailAndPassword, email: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function verifiesAuthorization(evt) {
    evt.preventDefault();
    if (!emailAndPassword.password || !emailAndPassword.email) {
      return;
    }
    onLogin(evt, emailAndPassword);
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

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
            email={emailAndPassword.email}
            password={emailAndPassword.password}
            placeMessage={validCheck}
            editEmail={setEmailUser}
            editPassword={setPasswordUser}
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
