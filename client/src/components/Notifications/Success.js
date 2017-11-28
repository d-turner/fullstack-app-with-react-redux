import React from 'react';
import PropTypes from 'prop-types';
import main from '../../constants/main.scss';

const Success = function({ message }) {
  if (message === null || message === undefined) return null;
  return (
    <span className="label success" style={{ marginLeft: '0px' }}>
      <h2>{message}</h2>
    </span>
  );
};

Success.propTypes = {
  message: PropTypes.string,
};

export default Success;
