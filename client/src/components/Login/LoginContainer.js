import React from 'react';
import { Redirect } from 'react-router';

import api from '../../utils/apiWrapper';
import { validateEmail, validatePassword } from '../../utils/validators';
import store from '../../store';
import Form from './Form';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      emailError: null,
      passwordError: null,
    });
    this.submit = this.submit.bind(this);
  }

  sendData(email1, password) {
    const data = {
      email: email1,
      password,
    };
    api.login(data)
      .then((response) => {
        const { user_id: userId, email, name } = response.data;
        store.dispatch(this.props.login(userId, email, name));
        this.setState({ redirectToReferrer: true });
      })
      .catch((error) => {
        this.setState({ emailError: error.response.data.error });
      });
  }

  validateState(event) {
    const email = event.target.email.value;
    const password = event.target.password.value;
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    if (validEmail && validPassword) {
      this.setState({ emailError: null, passwordError: null });
      return true;
    }
    if (!validEmail) {
      event.target.email.focus();
      this.setState({ emailError: ' Please use a valid email address' });
    } else if (!validPassword) {
      event.target.password.focus();
      this.setState({ passwordError: ' Please follow the password rules' });
    }
    return false;
  }

  // TODO: Implement checked functionality
  submit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const checked = event.target.remember.checked;
    if (this.validateState(event)) {
      this.sendData(email, password);
    }
  }

  render() {
    if (this.state.redirectToReferrer) return (<Redirect to="/documents" />);
    return (
      <Form submit={this.submit} {...this.state} />
    );
  }
}
