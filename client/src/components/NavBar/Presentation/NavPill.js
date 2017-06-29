import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../navbar.scss';

const NavPill = (props) => {
  const location =
  (window.location.pathname === props.to ||
  `/${window.location.pathname.split('/')[1]}` === props.to);
  if (props.children) {
    return (
      <Link to={props.to} className={location ? `img ${styles.selected}` : 'img'} >
        {props.children}
      </Link>
    );
  }
  return (
    <Link to={props.to} className={location ? styles.selected : ''}>
      <div>{props.label}</div>
    </Link>
  );
};

NavPill.defaultProps = {
  children: undefined,
};

NavPill.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default NavPill;
