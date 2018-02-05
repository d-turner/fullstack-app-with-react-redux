import React from 'react';

import api from '../../utils/apiWrapper';
import { validateName, validateEmail, validatePassword, validateConfirm } from '../../utils/validators';
import Form from './Form';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmError: null,
    });
    this.submit = this.submit.bind(this);
  }

  sendData(name, email1, password) {
    const data = {
      name,
      email: email1,
      password,
    };
    api.register(data)
      .then((response) => {
        const feedbackMessage = 'Registration Successful, please login to continue';
        this.setState({ emailError: null, feedbackMessage });
      })
      .catch((error) => {
        this.setState({ emailError: error.response.data.error });
      });
  }

  validateState(event) {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm = event.target.confirm.value;
    const validName = validateName(name);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validConfirm = validateConfirm(password, confirm);
    if (name && validEmail && validPassword && validConfirm) {
      this.setState({ nameError: null, emailError: null, passwordError: null, confirmError: null });
      return true;
    }
    if (!validName) {
      event.target.name.focus();
      this.setState({ nameError: ' Name must not be empty' });
    } else if (!validEmail) {
      event.target.email.focus();
      this.setState({ emailError: ' Please use a valid email address' });
    } else if (!validPassword) {
      event.target.password.focus();
      this.setState({ passwordError: ' Please follow the password rules' });
    } else if (!validConfirm) {
      event.target.confirm.focus();
      this.setState({ confirmError: ' Passwords do not match' });
    }
    return false;
  }

  submit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (this.validateState(event)) {
      this.sendData(name, email, password);
    }
  }

  render() {
    return (
      <Form submit={this.submit} {...this.state} />
    );
  }
}
