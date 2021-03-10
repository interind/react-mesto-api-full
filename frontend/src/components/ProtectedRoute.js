import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ loggedIn, children }) => (
    <Route>
      {() => (loggedIn ? <React.Fragment>
        {children}
        </React.Fragment> : <Redirect to='/sign-in' />)
      }
    </Route>
);

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default ProtectedRoute;
