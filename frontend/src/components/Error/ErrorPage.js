import React from 'react';
import PropTypes from 'prop-types';

function ErrorPage({ error }) {
  const styleErr = {
    color: '#f00',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  };
  const { message } = error;
  return (
    <React.Fragment>
      <div style={styleErr}>
        <h1>{message}</h1>
        <p style={{ color: '#fff' }}>попробуйте зайти позже</p>
      </div>
    </React.Fragment>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.object,
  message: PropTypes.string,
};

export default ErrorPage;
