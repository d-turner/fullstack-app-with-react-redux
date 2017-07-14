import React from 'react';
import ReactToolTip from 'react-tooltip';

import styles from '../../constants/main.scss';

class ButtonList extends React.Component {
  render() {
    return (
      <div className={`id ${styles.buttonList} ${styles.fixedPosition}`}>
        <button className={`${styles.clearButton} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="CommentSide"
          aria-label="Add a Comment"
          onClick={() => this.props.renderComment()}>
          <i className={`small material-icons ${styles.fixFont}`}>chat_bubble</i>
        </button>
        <ReactToolTip place="left" id="CommentSide" effect="solid">
          <span>Comments</span>
        </ReactToolTip>
        <button className={`${styles.clearButton} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Lexicon"
          onClick={() => this.props.renderLexicon()}
          aria-label="Open Lexicon Sidebar">
          <i className={`small material-icons ${styles.fixFont}`}>translate</i>
        </button>
        <ReactToolTip place="left" id="Lexicon" effect="solid">
          <span>Lexicon</span>
        </ReactToolTip>
        <button className={`${styles.clearButton} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Search"
          onClick={() => this.props.renderSearch()}
          aria-label="Open Find and Replace ">
          <i className={`small material-icons ${styles.fixFont} ${styles.buttonPadding}`}>search</i>
        </button>
        <ReactToolTip place="left" id="Search" effect="solid">
          <span>Search</span>
        </ReactToolTip>
      </div>
    );
  }
}

export default ButtonList;
