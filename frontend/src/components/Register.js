import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import MarkupForPopups from './MarkupForPopups';

function Register({
  isOpen,
  signOut,
  onRegister,
  isLoadingButton,
}) {
  const [register, setRegister] = React.useState({
    password: '',
    email: '',
    name: '',
    about: '',
    avatar: '',
  });
  const [activeButton, setActiveButton] = React.useState(true);
  const [validCheck, setValidCheck] = React.useState({});
  const textButton = isLoadingButton ? 'Проверка...' : 'Регистрация';
  const checkPopup = {
    name: 'check',
    title: 'Регистрация',
    buttonTitle: `${textButton}`,
    linkInfo: {
      link: '/sign-in',
      info: 'Вы уже зарегистрировались?',
    },
  };

  function validationCheck(evt) {
    if (!evt.target.validity.valid) {
      return setValidCheck({ [evt.target.name]: evt.target.validationMessage });
    }
    return setValidCheck({ [evt.target.name]: '' });
  }

  function setRegisterUser(evt) {
    setRegister({ ...register, [evt.target.name]: evt.target.value });
    setActiveButton(!evt.target.value);
  }

  function clearInput() {
    setRegister({
      ...register,
      password: '',
      email: '',
      name: '',
      about: '',
      avatar: '',
    });
  }

  function verifiesRegistration(evt) {
    evt.preventDefault();

    clearInput();
    onRegister({ ...register });
  }
  return (
    <React.Fragment>
      <div className="page__elements">
        <PopupWithForm
          isOpen={isOpen}
          active={activeButton}
          name={checkPopup.name}
          title={checkPopup.title}
          buttonTitle={checkPopup.buttonTitle}
          userAuthInfo={checkPopup.linkInfo}
          signOut={signOut}
          onSubmit={verifiesRegistration}
        >
          <MarkupForPopups.Register
            about={register.about}
            email={register.email}
            name={register.name}
            avatar={register.avatar}
            password={register.password}
            placeMessage={validCheck}
            editEmail={setRegisterUser}
            editPassword={setRegisterUser}
            editAvatar={setRegisterUser}
            editName={setRegisterUser}
            editAbout={setRegisterUser}
            validationCheck={validationCheck}
          />
        </PopupWithForm>
      </div>
    </React.Fragment>
  );
}

Register.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

Register.defaultProps = {
  isOpen: false,
};

export default Register;
