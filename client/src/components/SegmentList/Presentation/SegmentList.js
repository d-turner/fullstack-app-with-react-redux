import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';
import _ from 'lodash';

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
const responsiveWidth = `full three-fifth-700 off-fifth-700 half-1200 two-fifth-1500 grow ${main.clearPaddingLeft}`;

class SegmentList extends React.Component {
  state = {
    renderTiles: false,
    renderVoice: false,
    help: true,
  };

  componentDidMount() {
    this.props.updateSelectedSegment(this.props.document.saved_name, 0);
    this.props.requestSegments(this.props.document);
  }

  componentWillUnmount() {
    this.props.updateSelectedSegment(this.props.document.saved_name, -1);
  }

  selected = (index) => {
    this.Editor.blur();
    this.props.updateSelectedSegment(this.props.document.saved_name, index);
  }

  voiceComponent = (index) => {
    return (
      <VoiceInput className={this.state.renderVoice ? `${main.fadeIn} ${main.show}` : main.fadeIn}
        onEnd={value => this.CustomEditor.endValue(value)}
        segmentId={index}
        removeModal={this.renderVoice}
        documentId={this.props.document.saved_name}
        editor={this.Editor} />
    );
  }

  undoRedo = () => {
    const classNames = `${main.clearButtonLeft} ${main.button}`;
    return (
      <ButtonList>
        <Button
          classNames={`${classNames} ${main.greenButton}`}
          label="Accept Translation"
          icon="undo"
          func={() => console.error('Need to implement')}
          id="Accept Translation"
          tooltip={false} />

        <Button
          classNames={`${classNames} ${main.redButton}`}
          label="Reject Translation"
          icon="redo"
          func={() => console.error('Need to implement')}
          id="Clear Translation"
          tooltip={false} />
      </ButtonList>
    );
  }
  renderButtonList = (index) => {
    const classNames = `${main.clearButtonLeft} ${main.button}`;
    return (
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
          classNames={`${classNames} ${main.greenButton}`}
          label="Accept Translation"
          icon="done"
          func={() => {
            let data = update(this.props.document.segments[index], { mode: { $set: 'accept' } });
            data = _.mapKeys(data, (v, k) => _.camelCase(k));
            this.props.updateSegment(this.props.document, data);
            this.selected(index + 1);
          }}
          id="Accept Translation"
          direction="right" />

        <Button
          classNames={`${classNames} ${main.redButton}`}
          label="Reject Translation"
          icon="clear"
          func={() => {
            this.CustomEditor.clearText();
            let data = update(this.props.document.segments[index], { mode: { $set: 'reject' } });
            data = _.mapKeys(data, (v, k) => _.camelCase(k));
            this.props.updateSegment(this.props.document, data);
          }}
          id="Clear Translation"
          direction="right" />
      </ButtonList>
    );
  }

  renderTiles = () => {
    this.setState({ renderTiles: !this.state.renderTiles });
  }

  renderVoice = () => {
    this.setState({ renderVoice: !this.state.renderVoice });
  }

  renderSegment = (segment, index) => {
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

  renderSelected = (segment, index) => {
    const { xliff, segments } = this.props.document;
    if (this.props.editorState === '') {
      return null;
    }
    let mt = '';
    if (segments) mt = segments[index].machine_translation;
    return (
      <div id="selectedSegment" style={{ paddingTop: '62px' }}>
        <div className={`${responsive} ${styles.selected}`}>
          <div className={responsiveWidth}>
            
            <SelectedSegment
              className="four-fifth"
              documentId={this.props.document.saved_name}
              mt={mt}
              segment={segment}
              segmentId={index}
              editorState={this.props.editorState}
              renderTiles={this.state.renderTiles}
              xliff={xliff}
              ref={(ref) => { this.SelectedSegment = ref; }}
              setRef={(name, ref) => { this[name] = ref; }} />
          </div>
          {this.renderButtonList(index)}
          {this.state.renderVoice ? this.voiceComponent(index) : null }
        </div>
      </div>
    );
  }

  renderButton = (segment, index) => {
    return (
      <button
        onClick={(e) => { e.preventDefault(); this.Editor.blur(); this.selected(index); }}
        className={`${responsiveWidth} ${styles.block}`}
        aria-label={`Activate segment ${index}`}
        role="textbox">
        <PlainSegment
          segment={segment}
          segmentId={index} />
      </button>
    );
  }

  render() {
    let message =
    `To activate voice input click the microphone icon and begin dictating
    You can edit the input once you are finished
    Select the position in the editor to insert the text and click the tick
    Click the X to clear the input`;
    if (this.state.renderTiles) {
      message =
      `Double tap a tile to edit and press 'Enter' to accept or 'Esc' to cancel.
      Tiles can be dragged from the source to the target or can be rearranged in the target.
      Multiple tiles can be dragged by first selecting and highlighting the desired tiles.`;
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
        {this.props.document.xliff.segments.map(this.renderSegment)}
      </div>
    );
  }
}

SegmentList.propTypes = {
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  selectedSegment: PropTypes.number.isRequired,
  mergeSegment: PropTypes.func.isRequired,
  splitSegment: PropTypes.func.isRequired,
  document: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentList;
