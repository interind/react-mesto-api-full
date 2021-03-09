import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotFound.css';

function NotFound() {
  const history = useHistory();
  return (
    <div className='NotFound'>
    <h2 className='NotFound__title'>404</h2>
    <p className='NotFound__subtitle'>Страница не найдена</p>
    <button className='NotFound__goBack' type='button' title='Назад' onClick={history.push('/')}>
      Назад
    </button>
    </div>
  );
}

NotFound.propTypes = {
  onHeader: PropTypes.func.isRequired,
  stateHeader: PropTypes.bool.isRequired,
};

export default NotFound;
