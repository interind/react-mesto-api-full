import React from 'react';
import PropTypes from 'prop-types';
import headerLogo from '../images/header/logoFon.svg';
import Navbar from './Navbar';

Header.propTypes = {
  toggleNavbar: PropTypes.func.isRequired,
  signOut: PropTypes.func,
  link: PropTypes.string,
  selectorPlace: PropTypes.string,
  isNavbarOpen: PropTypes.bool,
};

function Header({
  toggleNavbar,
  signOut,
  link,
  selectorPlace,
  isNavbarOpen,
}) {
  return (
    <header className='header page__header'>
      <img className='logo logo_place_header' src={headerLogo} alt='Логотип' />
      <label>
        <input
          type='checkbox'
          className='header__button-menu'
          onChange={toggleNavbar}></input>
        <span id='span' className='header__button-menu'></span>
      </label>
      {!isNavbarOpen && (<Navbar
        selectorPlace={selectorPlace}
        link={link}
        signOut={signOut}
      />)}
    </header>
  );
}

export default Header;
