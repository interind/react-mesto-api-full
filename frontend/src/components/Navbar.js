import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from 'classnames';
import PropTypes from 'prop-types';
import CurrentUserContext from '../context/CurrentUserContext';

function Navbar({
  info,
  link,
  signOut,
  selectorPlace,
}) {
  const history = useHistory();
  const [title, setTitle] = React.useState('');
  const { email } = React.useContext(CurrentUserContext);
  const selector = classes('navbar', {
    navbar_place_header: selectorPlace === 'header',
    navbar_place_form: selectorPlace === 'form',
    navbar_place_page: selectorPlace === 'page',
  });

  React.useEffect(() => {
    if (history.location.pathname === '/sign-up') {
      setTitle('Войти');
    } else if (history.location.pathname === '/sign-in') {
      setTitle('Регистрация');
    } else if (history.location.pathname === '/') {
      setTitle('Выйти');
    }
  }, [history.location.pathname]);
  return (
    <nav className={selector}>
      {email && <p className='navbar__info'>{email}</p>}
      {selectorPlace === 'form' && <p className='navbar__info'>{info}</p>}
      <Link
        className='navbar__link'
        to={link}
        onClick={(evt) => signOut(evt)}>
        {title}
      </Link>
    </nav>
  );
}

Navbar.propTypes = {
  info: PropTypes.string,
  link: PropTypes.string,
  signOut: PropTypes.func,
  selectorPlace: PropTypes.string,
};

Navbar.defaultProps = {
  selectorPlace: '',
  info: '',
  link: '',
};

export default Navbar;
