import React from 'react';
import { Redirect } from 'react-router';

import api from '../../utils/apiWrapper';
import styles from '../Register/register.scss';
import main from '../../constants/main.scss';
import store from '../../store';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: null,
      emailValid: true,
      passwordFocused: false,
      password: null,
      passwordValid: true,
      checked: false,
    });
  }

  sendData() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    api.login(data, (response) => {
      if (!response || response.onerror) {
        const errorMessage = 'Something went wrong, please try again later';
        this.setState({ errorMessage });
      } else if (response.data.error || response.status === 409) {
        // something went wrong with the login
        this.setState({ emailValid: false, emailError: response.data.error });
      } else if (response.status !== 200) {
        const errorMessage = 'Something went wrong, please try again later';
        this.setState({ errorMessage });
      } else {
        // login successful redirect to home/profile page
        const feedbackMessage = 'Login Successful';
        const { user_id, email, name } = response.data;
        store.dispatch(this.props.login(user_id, email, name));
        window.setTimeout(() => {
          this.setState({ errorMessgae: null, feedbackMessage, redirectToReferrer: true });
        }, 500);
      }
    });
  }

  validateState() {
    const validEmail = this.validateEmail(this.state.email);
    const validPassword = this.validatePassword(this.state.password);
    if (validEmail && validPassword) {
      return true;
    }
    if (!validEmail) {
      this.emailInput.focus();
    } else if (!validPassword) {
      this.passwordInput.focus();
    }
    return false;
  }

  validateEmail() {
    const { email } = this.state;
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    this.setState({ emailValid: result, emailError: null });
    return result;
  }

  validatePassword() {
    const { password } = this.state;
    const numberReg = /\d+/g;
    const upperReg = /[A-Z]+/g;
    if (password && password.length >= 8 && numberReg.test(password) && upperReg.test(password)) {
      this.setState({ passwordValid: true });
      return true;
    }
    this.setState({ passwordValid: false });
    return false;
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
      <div className={`${styles.groupItem} ${main.error}`}>
        <i className={`material-icons ${styles.fixTop}`}>error_outline</i>
        <span style={{ verticalAlign: 'super' }}>{error}</span>
      </div>
    );
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to="/documents" />);
    }
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
                this.setState({ email: value });
              }} />
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
                this.setState({ password: value });
              }}
              onFocus={() => this.passwordFocus()}
              onBlur={() => this.passwordBlur()} />
            {this.state.passwordValid ?
              null : this.renderError(' Please follow the password rules')
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
          {this.state.errorMessage ?
            <span className="label error"
              style={{ marginLeft: '0px' }}><h2>{this.state.errorMessage}</h2></span>
            : null}
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
