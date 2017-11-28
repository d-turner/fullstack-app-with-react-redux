import React from 'react';
import PropTypes from 'prop-types';
import TextError from '../Error/TextError';
import PasswordRules from '../Login/PasswordRules';
import Success from '../Notifications/Success';

export default function Form(props) {
  return (
    <form onSubmit={event => props.submit(event)}>
      <h2>Create an account</h2>

      {/* Name Input */}
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        aria-label="name input"
        placeholder="Name"
        autoComplete="off" />
      <TextError error={props.nameError} />

      {/* Email Input */}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        aria-label="email input"
        placeholder="Email"
        autoComplete="off" />
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

      {/* Confirm Input */}
      <label htmlFor="confirm">Confirm Password</label>
      <input
        type="password"
        id="confirm"
        name="confirm"
        aria-label="confirm password"
        placeholder="Confirm Password"
        autoComplete="off" />
      <TextError error={props.confirmError} />

      {/* Submit Button */}
      <input
        type="submit"
        id="submit"
        name="submit"
        aria-label="register an account"
        value="Register" />
      <Success message={props.feedbackMessage} />
      <PasswordRules />
    </form>
  );
}

Form.propTypes = {
  submit: PropTypes.func.isRequired,
  nameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  confirmError: PropTypes.string,
  feedbackMessage: PropTypes.string,
};
