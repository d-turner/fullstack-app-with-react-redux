import React from 'react';

import Login from '../Login/LoginContainer';
import Register from '../Register/RegisterContainer';
import AuthPresentation from './AuthPresentation';

import * as authActions from './AuthActions';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ login: !this.state.login });
  }

  render() {
    if (this.state.login) {
      return (
        <AuthPresentation
          message={"Don't have an account? Create one here."}
          onClick={this.onClick}>
          <Login login={authActions.login} />
        </AuthPresentation>
      );
    }
    return (
      <AuthPresentation
        message={'Already have an account? Log in here.'}
        onClick={this.onClick}>
        <Register />
      </AuthPresentation>
    );
  }
}
