import React from 'react';
import PropTypes from 'prop-types';
import ReactHint from 'react-hint';
import 'react-hint/css/index.css';

import styles from '../styles.css';
import Segment from '../..//Segment/Containers/Segment';
import { addComment } from '../../Comments/ActionCreators/CommentActions';
import store from '../../../store.js';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  selected(index) {
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  addComment(index) {
    const comment = 'this is an action test';
    const user = 'Daniel Turner';
    const time = Date.now();
    store.dispatch(addComment(this.props.documentId, index, comment, user, time));
  }

  render() {
    const renderSegment = (segment, index) => {
      if (index === this.props.selectedSegment) {
        return (
          <div key={index} value={index} className={`${styles.block} ${styles.selected}`}>
            <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
              <div className={styles.segmentId}>{index}</div>{/* segment number*/}
              <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
            </div>
          </div>
        );
      }

      return (
        <div className={styles.segmentFlex}>
          <button
            onClick={() => this.selected(index)}
            key={index} value={index} className={styles.block}
            aria-label="Activate the selected segment"
            role={'textbox'}>
            <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
              <div className={styles.segmentId}>{index}</div>{/* segment number*/}
              <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
            </div>
          </button>
          <div className={`${styles['sidebar-handle']}`}>
            <div className={`${styles['sidebar-fixed']}`}>
              <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
                data-rh="Comment"
                data-rh-at="right"
                aria-label="Add a Comment"
                onClick={() => this.addComment(index)}>
                <i className="tiny material-icons">chat_bubble</i>
              </button>
              <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
                data-rh="Lexicon"
                data-rh-at="right"
                aria-label="">
                <i className="small material-icons">translate</i>
              </button>
              <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
                data-rh="Search"
                data-rh-at="right">
                <i className="small material-icons">search</i>
              </button>
              <ReactHint />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={styles.segmentList}>
        <div className={styles.wrapper}>
          {this.props.segments.map(renderSegment)}
        </div>
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentId: PropTypes.number.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedSegment: PropTypes.number.isRequired,
};

export default SegmentList;
