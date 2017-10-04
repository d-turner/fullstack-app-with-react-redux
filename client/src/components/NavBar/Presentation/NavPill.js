import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../navbar.scss';
import store from '../../../store';
import apiWrapper from '../../../utils/apiWrapper';
import { logout } from '../../Authentication/AuthActions';

export default class NavPill extends React.Component {
  logoutUser() {
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
        <Link to={this.props.to} className={location ? `img ${styles.selected}` : 'img'} style={{ marginRight: '22.4px' }}>
          {this.props.children}
        </Link>
      );
    }
    if (this.props.label === 'Logout') {
      return (
        <button style={{ float: 'right', marginTop: '10px' }} onClick={() => this.logoutUser()}>Logout</button>
      );
    }
    if (this.props.label === 'Login') {
      return (
        <Link to={this.props.to} className={location ? styles.selected : ''} style={{ float: 'right', paddingBottom: '0.8em' }}>
          <div>{this.props.label}</div>
        </Link>
      );
    }
    return (
      <Link to={this.props.to} className={location ? styles.selected : ''} style={{ marginRight: '22.4px' }}>
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
