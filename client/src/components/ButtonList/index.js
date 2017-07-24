import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../../constants/main.scss';

function ButtonList({ renderComment, renderLexicon, renderSearch }) {
  const classNames = `${styles.clearButton} ${styles.buttonMargin} ${styles.button}`;
  return (
    <div className={`id ${styles.buttonList} ${styles.fixedPosition}`}>

      <Button
        classNames={classNames}
        label="Add a Comment"
        icon="chat_bubble"
        func={renderComment}
        id="Comments"
      />

      <Button
        classNames={classNames}
        label="Lexicon Sidebar"
        icon="translate"
        func={renderLexicon}
        id="Lexicon"
      />

      <Button
        classNames={classNames}
        label="Find and Replace"
        icon="search"
        func={renderSearch}
        id="Search"
      />

    </div>
  );
}

ButtonList.propTypes = {
  renderComment: PropTypes.func.isRequired,
  renderLexicon: PropTypes.func.isRequired,
  renderSearch: PropTypes.func.isRequired,
};

function Button({ classNames, label, icon, func, id }) {
  return (
    <button
      className={classNames}
      data-tip data-for={id}
      aria-label={label}
      onClick={() => func()}
    >
      <i className={`small material-icons ${styles.fixFont}`}>{icon}</i>
      <ReactToolTip place="left" id={id} effect="solid">
        <span>{id}</span>
      </ReactToolTip>
    </button>
  );
}

Button.propTypes = {
  classNames: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonList;
