import React from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import enable from '../images/check/iconOk.svg';
import disable from '../images/check/iconUnion.svg';
import MarkupForPopups from './MarkupForPopups';

function InfoTooltip({ isOpen, onClose, toggleEventListenerWindow }) {
  const { isOpenTool, status, message } = isOpen;
  const defaultTitle = status
    ? 'Вы успешно зарегистрировались.'
    : 'Что-то пошло не так! Попробуйте ещё раз.';
  const tool = {
    title: message !== '' ? message : defaultTitle,
    alt: status ? 'Регистрация пройдена' : 'Регистрация не пройдена',
    icon: status ? enable : disable,
    classTool: classes('popup', {
      'popup_opened popup__type_tool': isOpenTool,
    }),
  };

  React.useEffect(() => {
    if (isOpenTool) {
      toggleEventListenerWindow(true);
    }
    return () => {
      toggleEventListenerWindow(false);
    };
  }, [isOpenTool]);

  return (
    <MarkupForPopups.Tool
      key={tool.id}
      alt={tool.alt}
      icon={tool.icon}
      title={tool.title}
      classTool={tool.classTool}
      onClose={onClose}
    />
  );
}

InfoTooltip.propTypes = {
  isTooltip: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  toggleEventListenerWindow: PropTypes.func.isRequired,
  isOpen: PropTypes.object,
};

export default InfoTooltip;
