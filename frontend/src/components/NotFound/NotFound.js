import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const history = useHistory();
  function backPage() {
    return history.goBack();
  }
  return (
    <div className='NotFound'>
    <h2 className='NotFound__title'>404</h2>
    <p className='NotFound__subtitle'>Страница не найдена</p>
    <button className='NotFound__goBack' type='button' title='Назад' onClick={backPage}>
      Назад
    </button>
    </div>
  );
}

export default NotFound;
