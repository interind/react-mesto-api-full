import React from 'react';
import PropTypes from 'prop-types';

function ErrorPage({ error, title }) {
  const styleErr = {
    color: '#f00',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '0',
  };
  const { message } = error;
  return (
    <React.Fragment>
      <div style={styleErr}>
        <h1>{message}</h1>
        <p style={{ color: '#fff' }}>{title}</p>
      </div>
    </React.Fragment>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.object,
  message: PropTypes.string,
  title: PropTypes.string,
};

export default ErrorPage;
