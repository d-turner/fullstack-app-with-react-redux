import React from 'react';
import PropTypes from 'prop-types';

import main from '../../../constants/main.scss';
import styles from '../segmentList.scss';

import SelectedSegment from '../../Segment/Containers/SelectedSegment';
import PlainSegment from '../../Segment/Presentation/PlainSegment';
import VoiceInput from '../../VoiceInput/VoiceInput';

import Info from '../../Notifications/Info';

import ButtonList from '../../ButtonList';
import Button from '../../ButtonList/Button';

// general responsive view
const responsive = 'flex one five-700';
// width of a segment
const responsiveWidth = 'full three-fifth-700 off-fifth-700 half-1200 two-fifth-1500 grow';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTiles: false,
      renderVoice: false,
      help: true,
    };
    this.renderSegment = this.renderSegment.bind(this);
  }

  componentDidMount() {
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  componentWillUnmount() {
    this.props.updateSelectedSegment(this.props.documentId, -1);
  }

  selected(index) {
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  renderTiles = () => {
    this.setState({ renderTiles: !this.state.renderTiles });
  }

  renderVoice = () => {
    this.setState({ renderVoice: !this.state.renderVoice });
  }

  renderSegment(segment, index) {
    const { selectedSegment } = this.props;
    let selectedStyle = styles.normalPadding;
    if (index === selectedSegment) selectedStyle = styles.selectedPadding;
    return (
      <div className={`full ${selectedStyle}`} key={index} value={index}>
        { index === this.props.selectedSegment ?
          this.renderSelected(segment, index) :
          this.renderButton(segment, index)
        }
      </div>
    );
  }

  renderSelected(segment, index) {
    const xliff = this.props.documents[this.props.documentId].xliff;
    if (this.props.editorState === '') {
      return null;
    }
    const classNames = `${main.clearButtonLeft} ${main.button}`;
    return (
      <div className={`${responsive} ${styles.selected}`} id="selectedSegment">
        <div className={responsiveWidth}>
          <SelectedSegment
            className="four-fifth"
            documentId={this.props.documentId}
            segment={segment}
            segmentId={index}
            editorState={this.props.editorState}
            renderTiles={this.state.renderTiles}
            xliff={xliff}
            ref={(ref) => { this.SelectedSegment = ref; }}
            setRef={(name, ref) => { this[name] = ref; }} />
        </div>
        <ButtonList>
          <Button
            classNames={classNames}
            label="Add a Comment"
            icon="chat_bubble"
            func={this.renderComment}
            id="Comments"
            direction="right" />
          {this.state.renderTiles ?
            <Button
              classNames={classNames}
              label="Edit Mode"
              icon="mode_edit"
              func={this.renderTiles}
              id="Edit Mode"
              direction="right" /> :
            <Button
              classNames={classNames}
              label="Tile Mode"
              icon="view_comfy"
              func={this.renderTiles}
              id="Tile Mode"
              direction="right" />
          }
          {this.state.renderVoice ?
            <Button
              classNames={`${classNames} ${styles.micActive}`}
              label="Voice Mode"
              icon="mic"
              func={this.renderVoice}
              id="Deactivate Voice Mode"
              direction="right" /> :
            <Button
              classNames={classNames}
              label="Voice Mode"
              icon="mic"
              func={this.renderVoice}
              id="Activate Voice Mode"
              direction="right" />
          }
          <Button
            classNames={`${classNames} ${styles.segmentAccept}`}
            label="Accept Translation"
            icon="done"
            func={() => console.error('Need to implement')}
            id="Accept Translation"
            direction="right" />

          <Button
            classNames={`${classNames} ${styles.segmentReject}`}
            label="Reject Translation"
            icon="clear"
            func={() => this.CustomEditor.clearText()}
            id="Clear Translation"
            direction="right" />
        </ButtonList>
        <VoiceInput className={this.state.renderVoice ? `${main.fadeIn} ${main.show}` : main.fadeIn}
          onEnd={value => this.CustomEditor.endValue(value)}
          segmentId={index}
          removeModal={this.renderVoice}
          documentId={this.props.documentId}
          editor={this.Editor} />
      </div>
    );
  }

  renderButton(segment, index) {
    return (
      <button
        onClick={() => this.selected(index)}
        className={`${responsiveWidth} ${styles.block}`}
        aria-label={`Activate segment ${index}`}
        role={'textbox'}>
        <PlainSegment
          segment={segment}
          segmentId={index} />
      </button>
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
      <div className={`full grow ${styles.listMargin}`}>
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
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentList;