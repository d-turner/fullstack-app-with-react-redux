import React from 'react';
import PropTypes from 'prop-types';
import main from '../../constants/main.scss';

const InfoMessage = function({ message, onClick }) {
  if (message === null || message === undefined) return null;
  return (
    <div className={main.message}>
      <button className={main.close}
        onClick={onClick}>
        <i className="material-icons">close</i>
      </button>
      <span className={main.help}>
        {message}
      </span>
    </div>
  );
};

InfoMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default InfoMessage;
