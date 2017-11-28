import React from 'react';
import PropTypes from 'prop-types';
import main from '../../constants/main.scss';

const PasswordRules = function() {
  return (
    <article className={`card ${main.password_validator}`}>
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
  );
};


export default PasswordRules;
