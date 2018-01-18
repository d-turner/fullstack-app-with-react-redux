import React from 'react';
import PropTypes from 'prop-types';

import styles from './buttonList.scss';
import main from '../../constants/main.scss';

function ButtonList(props) {
  return (
    <div className={`${styles['tiny-1200']} ${styles.buttonList} ${main.clearPadding}`}>
      {React.Children.map(props.children, (child) => {
        return child;
      })}
    </div>
  );
}

ButtonList.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ButtonList;
