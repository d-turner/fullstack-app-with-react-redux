import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../navbar.scss';
import store from '../../../store';
import apiWrapper from '../../../utils/apiWrapper';
import { logout } from '../../Authentication/AuthActions';

export default class NavPill extends React.Component {
  logoutUser = () => {
    apiWrapper.logout((response) => {
      console.log(response);
    });
    store.dispatch(logout());
  }

  render() {
    const location =
    (window.location.pathname === this.props.to ||
    `/${window.location.pathname.split('/')[1]}` === this.props.to);
    if (this.props.children) {
      return (
        <Link to={this.props.to} className={location ? `img ${styles.selected}` : 'img'}>
          {this.props.children}
        </Link>
      );
    }
    if (this.props.label === 'Logout') {
      return (
        <button className={styles.logout} onClick={() => this.logoutUser()}>Logout</button>
      );
    }
    if (this.props.label === 'Login') {
      return (
        <Link to={this.props.to} className={location ? styles.selected : ''} style={{ marginLeft: 'auto' }}>
          <div>{this.props.label}</div>
        </Link>
      );
    }
    return (
      <Link to={this.props.to} className={location ? styles.selected : ''}>
        <div>{this.props.label}</div>
      </Link>
    );
  }
}

NavPill.defaultProps = {
  children: undefined,
};

NavPill.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element,
};
