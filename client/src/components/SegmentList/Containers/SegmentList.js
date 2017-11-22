import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from '../segmentList.scss';
import main from '../../../constants/main.scss';
import Segment from '../../Segment/Containers/Segment';
import PlainSegment from '../../Segment/Presentation/PlainSegment';
import CommentModal from '../../Comments/Presentation/CommentModal';
import SplitModal from '../../SplitModal/Containers/Modal';
import VoiceInput from '../../VoiceInputModal/VoiceInput';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    const editArray = new Array(props.segments.length).fill(false);
    editArray[0] = true;
    this.state = { editArray, renderComment: false, renderModal: false, renderTiles: false, renderVoice: false, help: true};

    this.renderSegment = this.renderSegment.bind(this);
    this.renderSingle = this.renderSingle.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.updateSegmentState = this.updateSegmentState.bind(this);
  }

  componentDidMount() {
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  componentWillUnmount() {
    this.props.updateSelectedSegment(this.props.documentId, -1);
  }

  selected(e, index) {
    e.preventDefault();
    const editArray = this.state.editArray;
    editArray[index] = true;
    this.setState({ editArray });
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  updateSegmentState(index) {
    const editArray = this.state.editArray;
    editArray[index] = true;
    this.setState(editArray);
  }

  _mergeSegment(index) {
    this.props.mergeSegment(index, this.props.documentId);
  }

  renderModal() {
    this.setState({ renderModal: !this.state.renderModal });
  }

  renderComment() {
    this.setState({ renderComment: !this.state.renderComment });
  }

  renderTiles() {
    this.setState({ renderTiles: !this.state.renderTiles });
  }

  renderVoice(index) {
    this.setState({ renderVoice: !this.state.renderVoice, voiceIndex: index });
  }

  renderSidebar(index) {
    return (
      <div className={`id ${styles.clearPadding} ${main.fixedSmallWidth}`}>
        <button className={`${main.clearButtonLeft} ${main.buttonMargin} ${styles.button}`}
          data-tip data-for="Comment"
          aria-label="Add a Comment"
          onClick={() => this.renderComment()}>
          <i className={`small material-icons ${styles.fixFont}`}>chat_bubble</i>
        </button>
        <ReactToolTip place="right" id="Comment" effect="solid">
          <span>Add Comment</span>
        </ReactToolTip>
        { /*
        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Split"
          aria-label="Split Segment"
          onClick={() => this.renderModal()}>
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
        */ }
        <button className={`${main.clearButtonLeft} ${main.buttonMargin} ${styles.button}`}
          data-tip data-for="Chain"
          aria-label="Chain Words"
          onClick={() => this.renderTiles()}>
          <i className={`small material-icons ${styles.fixFont}`}>view_comfy</i>
        </button>
        <ReactToolTip place="right" id="Chain" effect="solid">
          <span>Tile View</span>
        </ReactToolTip>
        { /*
        <button className={`${styles.clearButtonLeft} ${styles.buttonMargin} ${styles.button}`}
          data-tip data-for="Voice"
          aria-label="Voice Input"
          onClick={() => this.renderVoice(index)}>
          <i className={`small material-icons ${styles.fixFont}`}>settings_voice</i>
        </button>
        <ReactToolTip place="right" id="Voice" effect="solid">
          <span>Voice Input</span>
        </ReactToolTip>
        */ }
      </div>
    );
  }

  renderSegment(segment, index) {
    const { selectedSegment } = this.props;
    let selected = styles.normalPadding;
    if (index === selectedSegment) selected = styles.selectedPadding;
    return (
      <div className={`flex one center ${selected}`} key={index} value={index}>
        { index === selectedSegment ?
          this.renderSelected(index) :
          this.renderButton(index)
        }
        {index === this.props.selectedSegment ? this.renderSidebar(index) : null}
      </div>
    );
  }

  renderSelected(index) {
    let responsive = 'three-fourth three-fifth-700 two-fifth-1400';
    let message = 
    "To activate voice input click the microphone icon and begin dictating\n\
    You can edit the input once you are finished\n\
    Select the position in the editor to insert the text and click the tick\n\
    Click the X to clear the input";
    if (this.state.renderTiles) {
      responsive = 'three-fourth four-fifth-700 three-fifth-1400';
      message = 
      "Double tap a tile to edit and press 'Enter' to accept or 'Esc' to cancel.\n\
      Tiles can be dragged from the source to the target or can be rearranged in the target.\n\
      Multiple tiles can be dragged by first selecting and highlighting the desired tiles.";
    }
    return (
      <div className={`${responsive} ${styles.selected}`} id="selectedSegment">
        {this.state.help ? (
          <div style={{ padding: '10px 5px 21px 10px', marginRight: '2px'}} className={main.message}>
            <span className={main.close}><i className="material-icons" onClick={() => this.setState({ help: false })}>close</i></span>
            <span className={main.help}>
            {message}
            </span>
          </div>
        ) : (null) }
        {this.renderSingleSelected(index)}
        <CommentModal
          documentId={this.props.documentId}
          index={index}
          unrender={this.renderComment}
          render={this.state.renderComment}
          name={this.props.email} />
        <SplitModal
          splitSegment={this.props.splitSegment}
          documentId={this.props.documentId}
          segmentId={index}
          content={this.props.segments[index].source}
          renderModal={this.state.renderModal}
          removeModal={this.renderModal} />
        <VoiceInput
          documentId={this.props.documentId}
          segmentId={index}
          lang={this.props.documents[this.props.documentId].xliff.targetLang}
          content={this.props.segments[index].source}
          renderModal={this.state.renderVoice}
          removeModal={() => this.renderVoice(this.state.voiceIndex)} />
      </div>
    );
  }

  renderButton(index) {
    return (
      <button
        onClick={e => this.selected(e, index)}
        className={`three-fourth three-fifth-700 two-fifth-1400 ${styles.block} ${styles.clearMarginTop}`}
        style={{ marginRight: '80px' }}
        aria-label="Activate the selected segment"
        role={'textbox'}>
        {this.renderSingle(index)}
      </button>
    );
  }

  renderSingleSelected(index) {
    if (this.props.editorState === '') {
      return null;
    }
    return (
      <Segment
        documentId={this.props.documentId}
        segmentId={index}
        editorState={this.props.editorState}
        renderTiles={this.state.renderTiles}
        updateSegmentState={this.updateSegmentState} />
    );
  }

  renderSingle(index) {
    return (
      <PlainSegment
        edited={this.state.editArray[index]}
        segment={this.props.segments[index]}
        segmentId={index} />
    );
  }

  render() {
    return (
      <div className="two-third three-fourth-900 four-fifth-1200 center">
        {this.props.segments.map(this.renderSegment)}
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentId: PropTypes.string.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  selectedSegment: PropTypes.number.isRequired,
  mergeSegment: PropTypes.func.isRequired,
  splitSegment: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentList;
