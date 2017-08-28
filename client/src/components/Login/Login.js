import React from 'react';
import { Redirect } from 'react-router';

import api from '../../utils/apiWrapper';
import styles from '../Register/register.scss';

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
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    api.register(data, (response) => {
      if (response.onerror) {
        const errorMessage = 'Something went wrong, please try again later';
        console.log(errorMessage);
        this.setState({ errorMessage });
      } else if (response.data.error || response.status !== 200) {
        // something went wrong with the register
        if (response.status === 409) {
          this.setState({ emailValid: false, emailError: response.data.error });
        }
      } else {
        // registration successful redirect to login page
        const feedbackMessage = 'Registration Successful, please login to continue';
        console.log(feedbackMessage);
        this.setState({ errorMessgae: null, feedbackMessage, redirectToReferrer: true });
      }
    });
  }

  validateState() {
    this.validateEmail(this.state.email);
    this.validatePassword(this.state.password);
    if (this.state.emailValid &&
    this.state.passwordValid) {
      return true;
    }
    if (!this.state.emailValid) {
      this.emailInput.focus();
    } else if (!this.state.passwordValid) {
      this.passwordInput.focus();
    }
    return false;
  }

  validateEmail(email) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    this.setState({ email, emailValid: result, emailError: null });
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
      <form onSubmit={event => this.submit(event)}>
        <fieldset>
          <h2>Sign In</h2>

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
              null : this.renderError(this.state.emailError || ' Please use a valid email address')
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
            <input type="submit" id="submit" aria-label="sign into account" value="SIGN IN" />
          </label>
          {this.state.errorMessage ? <span className="label error"><h2>{this.state.errorMessage}</h2></span> : null}
          {this.state.feedbackMessage ? <span className="label success"><h2>{this.state.feedbackMessage}</h2></span> : null}
          <article className={`card ${styles.password_validator}`} style={visible}>
            <header>
              <h4>
                <span>Password Rules</span>
              </h4>
              <ul>
                <li><span>8 characters minimum</span></li>
                <li><span>Contains at least 1 number</span></li>
                <li><span>Contains at least 1 capital letter</span></li>
              </ul>
            </header>
          </article>

        </fieldset>
      </form>
    );
  }
}
