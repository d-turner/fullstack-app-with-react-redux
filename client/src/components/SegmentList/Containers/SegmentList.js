import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../segmentList.scss';
import Segment from '../../Segment/Containers/Segment';
import CommentModal from '../../Comments/Presentation/CommentModal';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    const renderArray = new Array(props.segments.length).fill(false);
    this.state = { renderArray };

    this.renderSegment = this.renderSegment.bind(this);
    this.renderSingle = this.renderSingle.bind(this);
    this.unrender = this.unrender.bind(this);
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

  renderComment(event, index) {
    const newArray = this.state.renderArray.map((value, i) => {
      if (index === i) return true;
      return false;
    });
    this.setState({ renderArray: newArray });
    this.props.renderComment();
  }

  renderSidebar(index) {
    return (
      <div className={`id ${styles.clearPadding} ${styles.fixedSmallWidth}`}>
        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin}`}
          data-tip data-for="Comment"
          aria-label="Add a Comment"
          onClick={event => this.renderComment(event, index)}>
          <i className={`small material-icons ${styles.fixFont}`}>chat_bubble</i>
        </button>
      </div>
    );
  }
  renderSegment(segment, index) {
    return (
      <div className={`flex one center ${styles.groupItem} ${styles.content}`} key={index} value={index}>
        { index === this.props.selectedSegment ?
          this.renderSelected(index) :
          this.renderButton(index)
        }
        {this.renderSidebar(index)}
        <CommentModal
          documentId={this.props.documentId}
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
        className={`full three-fifth-700 two-fifth-1400 ${styles.block} ${styles.clearMarginTop}`}
        aria-label="Activate the selected segment"
        role={'textbox'}>
        {this.renderSingle(index)}
      </button>
    );
  }

  renderSingle(index) {
    if (this.props.editorState === '') {
      return <div />;
    }
    return (
      <div> {/* another wrapper for row flex*/}
        <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
      </div>
    );
  }

  render() {
    return (
      <div className={`two-third three-fourth-900 four-fifth-1200 center`}>
        {this.props.segments.map(this.renderSegment)}
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
};

export default SegmentList;
