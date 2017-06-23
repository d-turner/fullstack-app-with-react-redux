import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../styles.css';
import Segment from '../../Segment/Containers/Segment';
import CommentModal from '../../Comments/Presentation/CommentModal';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateSelectedSegment(this.props.documentId, 0);
    const renderArray = new Array(props.segments.length).fill(false);
    this.state = { renderArray };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.unrender = this.unrender.bind(this);
  }

  selected(index) {
    this.setState({ renderArray: new Array(this.props.segments.length).fill(false) });
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  unrender() {
    this.setState({ renderArray: new Array(this.props.segments.length).fill(false) });
  }

  handleCloseModal() {
    this.setState({ renderArray: new Array(this.props.segments.length).fill(false) });
  }

  renderComment(event, index) {
    const xcoord = event.currentTarget.offsetLeft - 285;
    const ycoord = event.currentTarget.offsetTop - 135;
    const newArray = this.state.renderArray.map((value, i) => {
      if (index === i) return true;
      return false;
    });
    this.setState({ renderArray: newArray, xcoord, ycoord });
    this.props.renderComment();
  }

  renderSidebar(index) {
    return (
      <div className={`${styles['sidebar-handle']}`}>
        <div className={`${styles['sidebar-fixed']}`}>
          <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
            data-tip data-for="Comment"
            aria-label="Add a Comment"
            onClick={event => this.renderComment(event, index)}>
            <i className="tiny material-icons">chat_bubble</i>
          </button>
          <ReactToolTip id="Comment">
            <span>Comments</span>
          </ReactToolTip>
          <CommentModal
            documentId={this.props.documentId}
            index={index}
            unrender={this.unrender}
            xcoord={this.state.xcoord} ycoord={this.state.ycoord}
            handleCloseModal={this.handleCloseModal}
            render={this.state.renderArray[index]} />
          <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
            data-tip data-for="Lexicon"
            onClick={() => this.props.renderLexicon()}
            aria-label="Open Lexicon Sidebar">
            <i className="small material-icons">translate</i>
          </button>
          <ReactToolTip id="Lexicon">
            <span>Lexicon</span>
          </ReactToolTip>
          <button className={`${styles['sidebar-wrapper']} ${styles['sidebar-button']}`}
            data-tip data-for="Search"
            onClick={() => this.props.renderSearch()}
            aria-label="Open Find and Replace ">
            <i className="small material-icons">search</i>
          </button>
          <ReactToolTip id="Search">
            <span>Search</span>
          </ReactToolTip>
        </div>
      </div>
    );
  }

  render() {
    const renderSegment = (segment, index) => {
      if (index === this.props.selectedSegment) {
        return (
          <div key={index} value={index} className={styles.wrap}>
            <div className={`${styles.selectedBlock} ${styles.selected} ${styles.segmentFlex}`}>
              <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
                <div className={styles.segmentId}>{index}</div>{/* segment number*/}
                <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
              </div>
            </div>
            {this.renderSidebar(index)}
          </div>
        );
      }

      return (
        <div className={styles.segmentFlex} key={index} value={index}>
          <button
            onClick={() => this.selected(index)}
            className={styles.block}
            aria-label="Activate the selected segment"
            role={'textbox'}>
            <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
              <div className={styles.segmentId}>{index}</div>{/* segment number*/}
              <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
            </div>
          </button>
          {this.renderSidebar(index)}
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
  renderComment: PropTypes.func.isRequired,
  renderLexicon: PropTypes.func.isRequired,
  renderSearch: PropTypes.func.isRequired,
};

export default SegmentList;
