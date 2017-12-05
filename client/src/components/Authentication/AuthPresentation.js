import React from 'react';
import PropTypes from 'prop-types';

import styles from './auth.scss';
import main from '../../constants/main.scss';

const outerWrapper = 'flex one two-700 three-1200 center';
const innerWrapper = '';

export default function Auth(props) {
  return (
    <div className={outerWrapper}>
      <div className={`${innerWrapper} ${styles.card}`}>
        {props.children}
        <span>
          <button
            id="has-account"
            className={`${main.removeButtonStyle} ${styles.link}`}
            onClick={props.onClick}>
            {props.message}
          </button>
        </span>
      </div>
    </div>
  );
}

Auth.propTypes = {
  children: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
