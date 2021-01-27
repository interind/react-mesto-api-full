import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import MarkupForPopups from './MarkupForPopups';

function EditAvatarPopup({
  isLoadingButton,
  isOpen,
  onClose,
  imagesCheck,
  onUpdateAvatar,
  toggleEventListenerWindow,
}) {
  React.useEffect(() => {
    if (isOpen) {
      toggleEventListenerWindow(true);
    }
    return () => {
      toggleEventListenerWindow(false);
    };
  }, [isOpen]);

  const textButton = isLoadingButton ? 'Сохранение...' : 'Сохранить';
  const avatarPopup = {
    name: 'avatar',
    title: 'Обновить аватар',
    buttonTitle: `${textButton}`,
  };

  const [avatar, setAvatar] = React.useState('');
  const [activeButton, setActiveButton] = React.useState(true);
  const [validAvatar, setValidAvatar] = React.useState('');

  function validationAvatar(evt) {
    if (!evt.target.validity.valid) {
      return setValidAvatar(evt.target.validationMessage);
    }
    return setValidAvatar('');
  }

  function setAvatarUser(evt) {
    setAvatar(evt.target.value);
    setActiveButton(!evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    imagesCheck(avatar)
      .then(() => {
        setAvatar('');
        onUpdateAvatar({
          avatar,
        });
      })
      .catch(() => {
        setValidAvatar('ошибка ссылки');
      });
  }

  return (
    <PopupWithForm
      name={avatarPopup.name}
      title={avatarPopup.title}
      buttonTitle={avatarPopup.buttonTitle}
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Avatar
        avatar={avatar}
        editAvatar={setAvatarUser}
        avatarMessage={validAvatar}
        validationAvatar={validationAvatar}
      />
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  imagesCheck: PropTypes.func.isRequired,
  onUpdateAvatar: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

export default EditAvatarPopup;
