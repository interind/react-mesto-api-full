import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useHistory();
  return (
    <div className='NotFound'>
    <h2 className='NotFound__title'>404</h2>
    <p className='NotFound__subtitle'>Страница не найдена</p>
    <button className='NotFound__goBack' type='button' title='Назад' onClick={() => history.goBack()}>
      Назад
    </button>
    </div>
  );
}

export default NotFound;
