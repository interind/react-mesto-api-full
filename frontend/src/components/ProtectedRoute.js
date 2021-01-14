import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, loggedIn }) => {
  return (
    <Route>
      {() =>
        loggedIn ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <Redirect to='/sign-in' />
        )
      }
    </Route>
  );
};

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool,
  children: PropTypes.array
}
export default ProtectedRoute;
