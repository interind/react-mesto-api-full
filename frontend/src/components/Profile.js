import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../context/CurrentUserContext';

function ProfileUser({ onAddPlace, onEditAvatar, onEditProfile }) {
  const {
    name,
    about,
    avatar,
    _id,
  } = React.useContext(CurrentUserContext);

  return (
   <section className='profile page__profile'>
     <div
       id={_id}
       style={{ backgroundImage: `url(${avatar})` }}
       onClick={onEditAvatar}
       className='profile__avatar'
     />
     <div className='profile__info'>
       <h1 className='profile__title' title={name}>
         {name}
       </h1>
       <button
         type='button'
         title='изменить данные профиля'
         className='profile__edit-button'
         onClick={onEditProfile}></button>
       <p className='profile__subtitle' title={about}>
         {about}
       </p>
     </div>
     <button
       type='button'
       title='добавить картинки'
       className='profile__add-button'
       onClick={onAddPlace}></button>
   </section>
  );
}

ProfileUser.propTypes = {
  onAddPlace: PropTypes.func,
  onEditAvatar: PropTypes.func,
  onEditProfile: PropTypes.func,
};

export default ProfileUser;
