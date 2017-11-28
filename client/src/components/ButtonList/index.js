import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
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

export default ButtonList;
