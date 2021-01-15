import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({
  isOpen,
  isCard,
  onClose,
  onDeleteCard,
  isLoadingButton,
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

  const textButton = isLoadingButton ? 'Удаляем...' : 'Да';
  const deletePopup = {
    name: 'delete',
    title: 'Вы уверены?',
    buttonTitle: `${textButton}`,
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onDeleteCard(isCard);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={deletePopup.name}
      title={deletePopup.title}
      buttonTitle={deletePopup.buttonTitle}
      onSubmit={handleSubmit}
    />
  );
}

DeleteCardPopup.propTypes = {
  isOpen: PropTypes.bool,
  isCard: PropTypes.object,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

export default DeleteCardPopup;
