import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../../constants/main.scss';


function Button({ classNames, label, icon, func, id, direction, tooltip }) {
  if (tooltip) {
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
  return (
    <button
      className={classNames}
      aria-label={label}
      onClick={func}>
      <i className={`small material-icons ${styles.fixFont}`}>{icon}</i>
    </button>
  );
}

Button.defaultProps = {
  direction: 'left',
  tooltip: true,
};

Button.propTypes = {
  classNames: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  direction: PropTypes.string,
  tooltip: PropTypes.bool,
};

export default Button;
