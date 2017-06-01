import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavPill = (props) => {
  return (
    <Link to={props.to}>
      <div className={props.className}>{props.label}</div>
    </Link>
  );
};

NavPill.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavPill;
