import React from 'react';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import main from '../../../constants/main.scss';
import styles from '../segmentList.scss';

import SelectedSegment from '../../Segment/Containers/SelectedSegment';
import PlainSegment from '../../Segment/Presentation/PlainSegment';
import VoiceInput from '../../VoiceInput/VoiceInput';

import VoiceAssistant from '../../VoiceAssistant';
import Info from '../../Notifications/Info';
import Alerts from '../../Notifications/Alerts';
import CommentModal from '../../Comments/Presentation/CommentModal';
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
    renderComment: false,
    insertTiles: false,
    messages: [],
    types: [],
    help: false,
  };

  componentDidMount() {
    window.addEventListener('keyup', this.escapeTiles);
    this.props.updateSelectedSegment(this.props.document.saved_name, 0);
    this.props.requestSegments(this.props.document);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.escapeTiles);
    this.props.updateSelectedSegment(this.props.document.saved_name, -1);
  }

  selected = (index) => {
    if (this.Editor) this.Editor.blur();
    // pop notification in here if index is bigger then segment length
    if (index >= this.props.document.xliff.segments.length) this.eof();
    this.props.updateSelectedSegment(this.props.document.saved_name, index);
  }

  eof = () => {
    this.setState({ messages: [].concat('End of segments reached'), types: [].concat('success') });
    this.props.updateSelectedSegment(this.props.document.saved_name, -1);
  }

  acceptTranslation = (index) => {
    const data = update(this.props.document.segments[index], { mode: { $set: 'accept' } });
    // data = _.mapKeys(data, (v, k) => _.camelCase(k));
    this.props.updateSegment(this.props.document, data);
    this.selected(index + 1);
  }

  rejectTranslation = (index) => {
    if (!this.state.renderTiles) {
      this.CustomEditor.clearText();
    }
    if (this.state.renderTiles) {
      this.props.clearTarget(this.props.document.saved_name, index);
    }
    const data = update(this.props.document.segments[index], { mode: { $set: 'reject' } });
    // data = _.mapKeys(data, (v, k) => _.camelCase(k));
    this.props.updateSegment(this.props.document, data);
  }

  escapeTiles = (e) => {
    if ((e.key === 'Escape' || e.keyCode === 27) && this.state.renderTiles) {
      // TODO: can add some shortcuts here
    } else if ((e.ctrlKey && e.keyCode === 13) && this.state.renderTiles) {
      console.log('Accepting');
      this.acceptTranslation(this.props.selectedSegment);
    }
  };

  undoTileAction = (index) => {
    this.Sortable.undo();
    // this.props.undoTileAction(this.props.document.saved_name, index);
  }

  redoTileAction = (index) => {
    this.Sortable.redo();
    // this.props.redoTileAction(this.props.document.saved_name, index);
  }

  voiceComponent = (index) => {
    return (
      <VoiceInput className={this.state.renderVoice ? `${main.fadeIn} ${main.show}` : main.fadeIn}
        lang={this.props.document.xliff.targetLang}
        onEnd={value => this.CustomEditor.endValue(value)}
        insertAfterTile={(tileIndex, value) => this.Sortable.insertAfter(tileIndex, value)}
        segmentId={index}
        renderTiles={this.state.renderTiles}
        removeModal={this.renderVoice}
        documentId={this.props.document.saved_name}
        editor={this.Editor} />
    );
  }

  commentComponent = (index) => {
    return (
      <CommentModal
        index={index}
        documentId={this.props.document.saved_name}
        name={this.props.email}
        render={this.state.renderComment}
        unrender={() => this.setState({ renderComment: false })} />
    );
  }

  undoRedo = (index) => {
    const classNames = `${main.clearButtonLeft} ${main.button}`;
    return (
      <div>
        {this.state.renderTiles ? (
          <div>
            <Button
              classNames={classNames}
              label="toggle"
              icon="playlist_add"
              func={() => this.setState({ insertTiles: !this.state.insertTiles })}
              id="toggle"
              tooltip={false} />
            <Button
              classNames={classNames}
              label="Undo"
              icon="undo"
              func={() => this.undoTileAction(index)}
              id="Undo"
              tooltip={false} />
            <Button
              classNames={classNames}
              label="Redo"
              icon="redo"
              func={() => this.redoTileAction(index)}
              id="Redo"
              tooltip={false} />
          </div>)
          : null}
      </div>
    );
  }

  renderButtonList = (index) => {
    const classNames = `${main.clearButtonLeft} ${main.button}`;
    return (
      <ButtonList>
        <Button
          classNames={this.state.renderVoice ? `${classNames} ${styles.micActive}` : classNames}
          label={this.state.renderVoice ? 'Deactivate Voice Mode' : 'Activate Voice Mode'}
          icon="mic"
          func={this.renderVoice}
          id={this.state.renderVoice ? 'Deactivate Voice Mode' : 'Activate Voice Mode'}
          direction="right" />
        {/* {this.state.renderTiles ?
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
        <Button
          classNames={this.state.renderComment ? `${classNames} ${styles.micActive}` : classNames}
          label="Add a Comment"
          icon="chat_bubble"
          func={this.renderComment}
          id="Comments"
        direction="right" /> */}
        {this.undoRedo(index)}
        <Button
          classNames={`${classNames} ${main.greenButton}`}
          label="Accept Translation"
          icon="done"
          func={() => this.acceptTranslation(index)}
          id="Accept Translation"
          direction="right" />
        <Button
          classNames={`${classNames} ${main.redButton}`}
          label="Reject Translation"
          icon="clear"
          func={() => this.rejectTranslation(index)}
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

  renderComment = () => {
    this.setState({ renderComment: !this.state.renderComment });
  }

  renderSegment = (segment, index) => {
    const { selectedSegment } = this.props;
    let selectedStyle = styles.normalPadding;
    if (index === selectedSegment) selectedStyle = styles.selectedPadding;
    return (
      <div className={`full ${selectedStyle} segment`} key={`${segment.source}${index}`} value={index}>
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
              insertTiles={this.state.insertTiles}
              xliff={xliff}
              eof={this.eof}
              ref={(ref) => { this.SelectedSegment = ref; }}
              setRef={(name, ref) => { this[name] = ref; }} />
          </div>
          {this.renderButtonList(index)}
          {this.state.renderVoice ? this.voiceComponent(index) : null }
          {this.state.renderComment ? this.commentComponent(index) : null}
        </div>
      </div>
    );
  }

  renderButton = (segment, index) => {
    return (
      <button
        onClick={(e) => { e.preventDefault(); this.selected(index); }}
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
    `To activate voice input click the microphone icon, this will bring up the voice menu.
    Click the large microphone to begin voice detection, you can begin dictating once the icon starts flashing.
    If you need you can make edits to the output or you can try again before inserting.
    When you are happy with the result select the position in the editor to insert the text and click the 'Accept Voice Input' button.
    Use the 'Reject Voice Input' button to clear the input.
    To accept the translation click the green tick or use the keyboard shortcut 'Ctrl + Enter'
    Undo and redo keyboard shortcuts are available with 'Ctrl + z' and 'Ctrl + y'`;
    if (this.state.renderTiles) {
      message =
      `Tap a tile once to focus and edit the tile. Press 'Enter' to accept the changes or 'Esc' to cancel and return to the
       original editor mode.
       Tiles can be dragged from the source to the target or can be rearranged in the target.
       Tiles can be removed by dragging them into the bin or by deleting the text.
       You can use the voice input to add words to any location in the tile mode, first use the voice detection and make any changes if needed,
       then click the tick, the voice menu will then ask you to select a tile to insert the text after.
       If you make a mistake there are undo and redo buttons available`;
    }
    return (
      <div className={`four-fifth ${styles.listMargin}`} id="segmentList">
        <Alerts messages={this.state.messages} types={this.state.types} />
        {this.state.help ?
          <div className={responsiveWidth}>
            <Info
              message={message}
              onClick={() => this.setState({ help: false })} />
          </div> :
          (null)
        }
        {/* <VoiceAssistant
          acceptTranslation={this.acceptTranslation}
          rejectTranslation={this.rejectTranslation}
          updateSelected={this.selected}
          Editor={this.Editor}
          CustomEditor={this.CustomEditor}
          {...this.props}
        /> */}
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
  requestSegments: PropTypes.func.isRequired,
  updateSegment: PropTypes.func.isRequired,
  undoTileAction: PropTypes.func.isRequired,
  redoTileAction: PropTypes.func.isRequired,
  document: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentList;
