import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from './buttonList.scss';
import main from '../../constants/main.scss';

const ButtonList = function(props) {
  return (
    <div className={`id ${styles.clearPadding} ${main.fixedSmallWidth}`}>
      <button className={`${main.clearButtonLeft} ${main.buttonMargin} ${main.button}`}
        data-tip data-for="Comment"
        aria-label="Add a Comment"
        onClick={() => props.renderComment()}>
        <i className={`small material-icons ${styles.fixFont}`}>chat_bubble</i>
      </button>
      <ReactToolTip place="right" id="Comment" effect="solid">
        <span>Add Comment</span>
      </ReactToolTip>
      { /*
      <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
        data-tip data-for="Split"
        aria-label="Split Segment"
        onClick={() => props.renderModal()}>
        <i className={`small material-icons ${styles.fixFont}`}>call_split</i>
      </button>
      <ReactToolTip place="right" id="Split" effect="solid">
        <span>Split Segment</span>
      </ReactToolTip>

      <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
        data-tip data-for="Merge"
        aria-label="Merge With Next"
        onClick={() => props.mergeSegment(index)}>
        <i className={`small material-icons ${styles.fixFont}`}>merge_type</i>
      </button>
      <ReactToolTip place="right" id="Merge" effect="solid">
        <span>Merge With Next</span>
      </ReactToolTip>
      */ }
      <button className={`${main.clearButtonLeft} ${main.buttonMargin} ${main.button}`}
        data-tip data-for="Chain"
        aria-label="Chain Words"
        onClick={() => props.renderTiles()}>
        <i className={`small material-icons ${styles.fixFont}`}>view_comfy</i>
      </button>
      <ReactToolTip place="right" id="Chain" effect="solid">
        <span>Tile View</span>
      </ReactToolTip>
      { /*
      <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
        data-tip data-for="Voice"
        aria-label="Voice Input"
        onClick={() => props.renderVoice(index)}>
        <i className={`small material-icons ${styles.fixFont}`}>settings_voice</i>
      </button>
      <ReactToolTip place="right" id="Voice" effect="solid">
        <span>Voice Input</span>
      </ReactToolTip>
      */ }
    </div>
  );
};

ButtonList.propTypes = {
  renderComment: PropTypes.func.isRequired,
  renderTiles: PropTypes.func.isRequired,
};

export default ButtonList;
