import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';
import MarkupForPopups from './MarkupForPopups';
import imagesCheck from '../utils/utils';

function AddPlacePopup({
  isLoadingButton,
  isOpen,
  onClose,
  onAddPlace,
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
  const placePopup = {
    name: 'place',
    title: 'Новое место',
    buttonTitle: `${textButton}`,
  };

  const [namePlace, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');
  const [activeButton, setActiveButton] = React.useState(true);

  const [validPlace, setValidPlace] = React.useState({
    place: '',
    link: '',
  });

  function validationPlace(evt) {
    if (!evt.target.validity.valid) {
      return setValidPlace({
        [evt.target.name]: evt.target.validationMessage,
      });
    }
    return setValidPlace({ [evt.target.name]: '' });
  }

  function setPlaceName(evt) {
    setPlace(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function setLinkPlace(evt) {
    setLink(evt.target.value);
    setActiveButton(!evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    imagesCheck(link)
      .then(() => {
        setPlace('');
        setLink('');
        onAddPlace({
          name: namePlace,
          link,
        });
      })
      .catch((err) => {
        setValidPlace({ ...validPlace, link: err.message });
      });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      active={activeButton}
      name={placePopup.name}
      title={placePopup.title}
      buttonTitle={placePopup.buttonTitle}
      onSubmit={handleSubmit}>
      <MarkupForPopups.Place
        link={link}
        place={namePlace}
        placeMessage={validPlace}
        editLink={setLinkPlace}
        editPlace={setPlaceName}
        validationPlace={validationPlace}
      />
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  isLoadingButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
};

export default AddPlacePopup;
