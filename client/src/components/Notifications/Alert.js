import React from 'react';
import PropTypes from 'prop-types';
import alert from './alert.scss';
import { upperFirstLetter } from '../../utils/stringParser';

const Alert = function({ message, type, state, onClick, index }) {
  if (!state) return null;
  if (message === null || message === undefined) return null;
  const header = upperFirstLetter(type);
  return (
    <div role="status" className={`${alert.alert} ${alert[type]}`} onClick={() => onClick(index)}>
      <h4 className={alert.message}>{header}</h4>
      <div className={alert.extra}>{message}</div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Alert;
