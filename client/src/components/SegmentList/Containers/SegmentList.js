import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../segmentList.scss';
import Segment from '../../Segment/Containers/Segment';
import CommentModal from '../../Comments/Presentation/CommentModal';
import SplitModal from '../../../components/SplitModal/Containers/Modal';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    const renderArray = new Array(props.segments.length).fill(false);
    this.state = { renderArray, renderTiles: false };

    this.renderSegment = this.renderSegment.bind(this);
    this.renderSingle = this.renderSingle.bind(this);
    this.unrender = this.unrender.bind(this);
    this.removeModal = () => this._removeModal();
  }

  componentWillMount() {
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  selected(index) {
    this.setState({ renderArray: new Array(this.props.segments.length).fill(false) });
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  unrender() {
    this.setState({ renderArray: new Array(this.props.segments.length).fill(false) });
  }

  _splitSegment(index) {
    this.setState({ renderModal: true, splitIndex: index });
  }
  _removeModal() {
    this.setState({ renderModal: false });
  }

  _mergeSegment(index) {
    this.props.mergeSegment(index, this.props.documentId);
  }

  renderComment(event, index) {
    const newArray = this.state.renderArray.map((value, i) => {
      if (index === i) return true;
      return false;
    });
    this.setState({ renderArray: newArray });
    this.props.renderComment();
  }

  renderTiles() {
    this.setState({ renderTiles: !this.state.renderTiles });
  }

  renderSidebar(index) {
    return (
      <div className={`id ${styles.clearPadding} ${styles.fixedSmallWidth}`}>
        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Comment"
          aria-label="Add a Comment"
          onClick={event => this.renderComment(event, index)}>
          <i className={`small material-icons ${styles.fixFont}`}>chat_bubble</i>
        </button>
        <ReactToolTip place="right" id="Comment" effect="solid">
          <span>Add Comment</span>
        </ReactToolTip>

        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Split"
          aria-label="Split Segment"
          onClick={() => this._splitSegment(index)}>
          <i className={`small material-icons ${styles.fixFont}`}>call_split</i>
        </button>
        <ReactToolTip place="right" id="Split" effect="solid">
          <span>Split Segment</span>
        </ReactToolTip>

        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Merge"
          aria-label="Merge With Next"
          onClick={() => this._mergeSegment(index)}>
          <i className={`small material-icons ${styles.fixFont}`}>merge_type</i>
        </button>
        <ReactToolTip place="right" id="Merge" effect="solid">
          <span>Merge With Next</span>
        </ReactToolTip>

        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Chain"
          aria-label="Chain Words"
          onClick={() => this.renderTiles()}>
          <svg className={styles.chain} viewBox="0 0 24 24">
            <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
          </svg>
        </button>
        <ReactToolTip place="right" id="Chain" effect="solid">
          <span>Chain Words</span>
        </ReactToolTip>
      </div>
    );
  }

  renderSegment(segment, index) {
    const { selectedSegment, documentId } = this.props;
    let selected = styles.normalPadding;
    if (index === selectedSegment) selected = styles.selectedPadding;
    return (
      <div className={`flex one center ${selected}`} key={index} value={index}>
        { index === selectedSegment ?
          this.renderSelected(index) :
          this.renderButton(index)
        }
        {this.renderSidebar(index)}
        <CommentModal
          documentId={documentId}
          index={index}
          unrender={this.unrender}
          render={this.state.renderArray[index]} />
      </div>
    );
  }

  renderSelected(index) {
    return (
      <div className={`three-fourth three-fifth-700 two-fifth-1400 ${styles.selected}`}>
        {this.renderSingle(index)}
      </div>
    );
  }

  renderButton(index) {
    return (
      <button
        onClick={() => this.selected(index)}
        className={`three-fourth three-fifth-700 two-fifth-1400 ${styles.block} ${styles.clearMarginTop}`}
        aria-label="Activate the selected segment"
        role={'textbox'}>
        {this.renderSingle(index)}
      </button>
    );
  }

  renderSingle(index) {
    if (this.props.editorState === '') {
      return null;
    }
    return (
      <Segment
        documentId={this.props.documentId}
        segmentId={index}
        editorState={this.props.editorState}
        renderTiles={this.state.renderTiles} />
    );
  }

  render() {
    return (
      <div className="two-third three-fourth-900 four-fifth-1200 center">
        {this.props.segments.map(this.renderSegment)}
        {this.state.renderModal ?
          <SplitModal
            {...this.props}
            segmentId={this.state.splitIndex}
            content={this.props.segments[this.state.splitIndex].source}
            renderModal={this.state.renderModal}
            removeModal={this.removeModal} /> :
          null}
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentId: PropTypes.number.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  selectedSegment: PropTypes.number.isRequired,
  renderComment: PropTypes.func.isRequired,
  mergeSegment: PropTypes.func.isRequired,
};

export default SegmentList;
