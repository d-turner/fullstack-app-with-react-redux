import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../constants/main.scss';

function ButtonList(props) {
  return (
    <div className={styles.clearPadding}>
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
