import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segmentList.scss';
import Segment from '../../Segment/Containers/Segment';
import PlainSegment from '../../Segment/Presentation/PlainSegment';
import CommentModal from '../../Comments/Presentation/CommentModal';
import SplitModal from '../../SplitModal/Containers/Modal';
import VoiceInput from '../../VoiceInputModal/react-speech-recognition-input';
import SidebarButtons from '../../SegmentButtons/ButtonList';
import Info from '../../Notifications/Info';

// general responsive view
const responsive = 'flex one five-700';
// width of a segment
const responsiveWidth = 'full three-fifth-700 off-fifth-700 half-1200 two-fifth-1500 grow';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    const editArray = new Array(props.segments.length).fill(false);
    editArray[0] = true;
    this.state = {
      editArray,
      renderComment: false,
      renderModal: false,
      renderTiles: false,
      renderVoice: false,
      help: true,
    };

    this.renderSegment = this.renderSegment.bind(this);
    this.renderSingle = this.renderSingle.bind(this);
    this.renderComment = this.renderComment.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
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

  mergeSegment(index) {
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

  renderSegment(segment, index) {
    const { selectedSegment } = this.props;
    let selected = styles.normalPadding;
    if (index === selectedSegment) selected = styles.selectedPadding;
    return (
      <div className={`full ${selected}`} key={index} value={index}>
        { index === selectedSegment ?
          this.renderSelected(index) :
          this.renderButton(index)
        }
      </div>
    );
  }

  renderSelected(index) {
    return (
      <div className={`${responsive} ${styles.selected}`} id="selectedSegment">
        {this.renderSingleSelected(index)}
        <SidebarButtons
          renderComment={this.renderComment}
          renderTiles={this.renderTiles}
          renderStyles={this.renderStyles}
          renderVoice={this.renderVoice} />
        
        {/*  <CommentModal
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
        removeModal={this.renderModal} /> */}
        {/* <VoiceInput
          lang={this.props.documents[this.props.documentId].xliff.targetLang}
        onEnd={endValue => this.endValue(endValue)} /> */}
      </div>
    );
  }

  renderButton(index) {
    return (
      <button
        onClick={e => this.selected(e, index)}
        className={`${responsiveWidth} ${styles.block} ${styles.clearMarginTop}`}
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
      <div className={responsiveWidth}>
        <Segment
          documentId={this.props.documentId}
          segmentId={index}
          editorState={this.props.editorState}
          renderTiles={this.state.renderTiles}
          updateSegmentState={this.updateSegmentState} />
      </div>
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
    let message =
    "To activate voice input click the microphone icon and begin dictating\n\
    You can edit the input once you are finished\n\
    Select the position in the editor to insert the text and click the tick\n\
    Click the X to clear the input";
    if (this.state.renderTiles) {
      message =
      "Double tap a tile to edit and press 'Enter' to accept or 'Esc' to cancel.\n\
      Tiles can be dragged from the source to the target or can be rearranged in the target.\n\
      Multiple tiles can be dragged by first selecting and highlighting the desired tiles.";
    }
    return (
      <div className="full grow">
        {this.state.help ?
          <div className={responsiveWidth}>
            <Info
              message={message}
              onClick={() => this.setState({ help: false })} />
          </div> :
          (null)
        }
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
