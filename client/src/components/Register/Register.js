import React from 'react';

import styles from './register.scss';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: null,
      nameValid: true,
      email: null,
      emailValid: true,
      passwordFocused: false,
      password: null,
      passwordValid: true,
      confirm: null,
      confirmValid: true,
      checked: false,
    });
  }

  sendData() {
    console.log('sending....');
    fetch(`http://localhost:3000/api/login`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  validateState() {
    this.validateName(this.state.name);
    this.validateEmail(this.state.email);
    this.validatePassword(this.state.password);
    this.validateConfirm(this.state.confirm);
    if (this.state.nameValid &&
    this.state.emailValid &&
    this.state.passwordValid &&
    this.state.confirmValid) {
      return true;
    }
    if (!this.state.nameValid) {
      this.nameInput.focus();
    } else if (!this.state.emailValid) {
      this.emailInput.focus();
    } else if (!this.state.passwordValid) {
      this.passwordInput.focus();
    } else if (!this.state.confirmValid) {
      this.passwordConfirmationInput.focus();
    }
    return false;
  }

  validateName(name) {
    const result = (name !== '' && name !== undefined && name !== null);
    this.setState({ name, nameValid: result });
  }

  validateEmail(email) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    this.setState({ email, emailValid: result });
  }

  validatePassword(password) {
    const numberReg = /\d+/g;
    const upperReg = /[A-Z]+/g;
    if (password.length >= 8 && numberReg.test(password) && upperReg.test(password)) {
      this.setState({ password, passwordValid: true });
    } else {
      this.setState({ password, passwordValid: false });
    }
  }

  validateConfirm(confirm) {
    if (confirm === this.state.password) {
      this.setState({ confirm, confirmValid: true });
    } else {
      this.setState({ confirm, confirmValid: false });
    }
  }

  passwordFocus() {
    this.setState({
      passwordFocused: true,
    });
  }

  passwordBlur() {
    this.setState({
      passwordFocused: false,
    });
  }

  submit(event) {
    event.preventDefault();
    if (this.validateState()) {
      this.sendData();
    }
  }

  renderError(error) {
    return (
      <div className={`${styles.groupItem} ${styles.error}`}>
        <i className={`material-icons ${styles.fixTop}`}>error_outline</i>
        <span>{error}</span>
      </div>
    );
  }

  render() {
    let visible = {
      display: 'none',
      transition: 3,
    };
    if (this.state.passwordFocused) {
      visible = {
        display: 'block',
        transition: 3,
      };
    }
    return (
      <form className="flex five" onSubmit={event => this.submit(event)}>
        <fieldset className="flex one">
          <h2>Create an account</h2>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="name"
              aria-label="name input"
              placeholder="Name"
              autoComplete="off"
              ref={(ref) => { this.nameInput = ref; }}
              onChange={(event) => {
                const value = event.target.value;
                this.validateName(value);
              }}
              required />
            {this.state.nameValid ?
              <div /> : this.renderError(' Name must not be empty')
            }
          </label>

          <label htmlFor="email">
            <input
              type="text"
              id="email"
              name="email"
              aria-label="email input"
              placeholder="Email"
              autoComplete="off"
              ref={(ref) => { this.emailInput = ref; }}
              onChange={(event) => {
                const value = event.target.value;
                this.validateEmail(value);
              }}
              required />
            {this.state.emailValid ?
              <div /> : this.renderError(' Please use a valid email address')
            }
          </label>

          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              aria-label="password input"
              placeholder="Password"
              autoComplete="off"
              ref={(ref) => { this.passwordInput = ref; }}
              onChange={(event) => {
                const value = event.target.value;
                this.validatePassword(value);
              }}
              onFocus={() => this.passwordFocus()}
              onBlur={() => this.passwordBlur()}
              required />
            {this.state.passwordValid ?
              <div /> : this.renderError(' Please follow the password rules')
            }
          </label>

          <label htmlFor="confirm">
            <input
              type="password"
              id="confirm"
              name="confirm"
              aria-label="confirm password"
              placeholder="Confirm Password"
              autoComplete="off"
              ref={(ref) => { this.passwordConfirmationInput = ref; }}
              onChange={(event) => {
                const value = event.target.value;
                this.validateConfirm(value);
              }}
              required />
            {this.state.confirmValid ?
              <div /> : this.renderError(' Passwords do not match')
            }
          </label>

          <label htmlFor="remember">
            <input
              type="checkbox"
              id="remember"
              aria-label="remember me"
              onChange={event => this.setState({ checked: event.target.value })}
              />
            <span className="checkable">Remember me</span>
          </label>

          <label htmlFor="submit">
            <input type="submit" id="submit" aria-label="create an account" value="CREATE ACCOUNT" />
          </label>

          <div style={visible} className={styles.password_validator}>
            <h4>
              <span>Password Rules</span>
            </h4>
            <ul>
              <li><span>8 characters minimum</span></li>
              <li><span>Contains at least 1 number</span></li>
              <li><span>Contains at least 1 capital letter</span></li>
            </ul>
          </div>

        </fieldset>
      </form>
    );
  }
}
