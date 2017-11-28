import React from 'react';
import PropTypes from 'prop-types';
import main from '../../constants/main.scss';

const TextError = function({ error }) {
  if (error === null || error === undefined) return null;
  return (
    <div className={`${main.groupItem} ${main.error}`}>
      <i className="material-icons">error_outline</i>
      <span style={{ verticalAlign: 'super' }}>{error}</span>
    </div>
  );
};

TextError.propTypes = {
  error: PropTypes.string,
};

export default TextError;
