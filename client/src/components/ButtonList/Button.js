import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../../constants/main.scss';


function Button({ classNames, label, icon, func, id, direction }) {
  return (
    <button
      className={classNames}
      data-tip data-for={id}
      aria-label={label}
      onClick={func}>
      <i className={`small material-icons ${styles.fixFont}`}>{icon}</i>
      <ReactToolTip place={direction} id={id} effect="solid">
        <span>{id}</span>
      </ReactToolTip>
    </button>
  );
}

Button.defaultProps = {
  direction: 'left',
};

Button.propTypes = {
  classNames: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  direction: PropTypes.string,
};

export default Button;
