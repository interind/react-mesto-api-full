import React from 'react';
import PropTypes from 'prop-types';

function Page({children}) {
 return <div className='page'>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.object
}

export default Page;