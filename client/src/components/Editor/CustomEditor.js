import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, getDefaultKeyBinding, Modifier } from 'draft-js';
import ReactToolTip from 'react-tooltip';

import Button from '../ButtonList/Button';
import VoiceInput from '../VoiceInputModal/react-speech-recognition-input';
import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.scss';
import main from '../../constants/main.scss';

class CustomEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasFocus: false, renderStyles: false, renderVoice: false };
  }

  componentDidMount() {
    this.Editor.focus();
    this.insertIntoEditor = this.insertIntoEditor.bind(this);
    this.endValue = this.endValue.bind(this);
  }

  myKeyBindingFn(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      return 'next-segment';
    }
    return getDefaultKeyBinding(e);
  }

  insertIntoEditor(value) {
    // console.log('Inserting value: ', value);
    // this.props.keyLogger.voiceInput(value);
    // const selection = this.props.editorState.getSelection();
    // const contentState = this.props.editorState.getCurrentContent();
    // const newContentState = Modifier.insertText(contentState, selection, value);
    // this.props.handleChange(EditorState.createWithContent(newContentState));
    // this.setState({ contentState });
  }

  endValue(value) {
    if (value !== '') {
      value = value + ' ';
    }
    this.props.keyLogger.voiceInput(value);
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const newContentState = Modifier.replaceText(contentState, selection, value);
    const newEditorState = EditorState.createWithContent(newContentState);
    const updatedSelection = selection.merge({
      focusOffset: selection.getAnchorOffset() + value.length,
      anchorOffset: selection.getAnchorOffset() + value.length,
    });
    this.props.handleChange(EditorState.acceptSelection(newEditorState, updatedSelection));
  }

  render() {
    let style = main['underline-from-center'];
    if (this.state.hasFocus) {
      style = `${styles.focus} ${main['underline-center']} ${main.animate}`;
    }
    return (
      <div className={styles['RichEditor-root']} >
        {this.state.renderStyles ?
          <Styles
            editorState={this.props.editorState}
            toggleBlockType={this.props.toggleBlockType}
            toggleInlineStyle={this.props.toggleInlineStyle} /> :
          null
        }
        {/*<div style={{ marginBottom: '-55px' }}>
          <Button
            classNames={`${styles.styles} ${main.button}`}
            label="styles" icon="format_paint" direction={'right'}
            func={() => this.setState({ renderStyles: !this.state.renderStyles, renderVoice: false })}
            id="Add Style" />
        </div>
        <div style={{ marginBottom: '-50px' }}>
          <Button
            classNames={`${styles.voice} ${main.button}`}
            label="styles" icon="settings_voice" direction={'right'}
            func={() => this.setState({ renderStyles: false, renderVoice: !this.state.renderVoice })}
            id="Open Voice Dialogue" />
      </div>*/}
        <div className={`${styles['RichEditor-editor']} ${style}`} >
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.props.handleKeyCommand}
            keyBindingFn={this.myKeyBindingFn}
            onFocus={() => this.setState({ hasFocus: true })}
            onBlur={() => this.setState({ hasFocus: false })}
            onChange={this.props.handleChange}
            ref={(ref) => { this.Editor = ref; }}
            aria-label="Translation Input"
          />
        </div>
      </div>
    );
  }
}

// <Input onChange={value => this.result(value)}
// onEnd={value => this.end(value)}
// lang={this.props.lang}
// ref={(ref) => { this.Input = ref; }} />

CustomEditor.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
  lang: PropTypes.string.isRequired,
};

export default CustomEditor;

const Styles = function(props) {
  return (
    <div className={`${styles.styleBox} `}>
      <BlockStyleControls
        editorState={props.editorState}
        onToggle={props.toggleBlockType}
        className={styles['RichEditor-styleButton']}
        activeClass={styles['RichEditor-activeButton']}
      />
      <InlineStyleControls
        editorState={props.editorState}
        onToggle={props.toggleInlineStyle}
        className={styles['RichEditor-styleButton']}
        activeClass={styles['RichEditor-activeButton']}
      />
    </div>
  );
};

Styles.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
};
