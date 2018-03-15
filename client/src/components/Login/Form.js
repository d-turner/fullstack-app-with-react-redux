import React from 'react';
import PropTypes from 'prop-types';
import TextError from '../Error/TextError';
import PasswordRules from './PasswordRules';
import styles from '../Register/register.scss';

export default function Form(props) {
  return (
    <form className={`flex one ${styles.form}`} onSubmit={event => props.submit(event)}>
      <h2>Sign In</h2>

      {/* Email Input */}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        aria-label="email input"
        placeholder="Email"
        autoComplete="off"
        autoFocus />
      <TextError error={props.emailError} />

      {/* Password Input */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        aria-label="password input"
        placeholder="Password"
        autoComplete="off" />
      <TextError error={props.passwordError} />

      {/* Checkbox Input */}
      <label htmlFor="remember">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          aria-label="remember me" />
        <span className="checkable">Remember me</span>
      </label>

      {/* Submit Button */}
      <input
        type="submit"
        id="submit"
        name="submit"
        aria-label="sign into account"
        value="Sign In" />
      {props.passwordError ? <PasswordRules /> : null}
    </form>
  );
}

Form.propTypes = {
  submit: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
};
