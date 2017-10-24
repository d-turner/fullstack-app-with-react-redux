import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, getDefaultKeyBinding, Modifier } from 'draft-js';

import VoiceInput from '../VoiceInputModal/react-speech-recognition-input';
import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.scss';

class CustomEditor extends React.Component {
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
    console.log('Inserting value: ', value);
    // this.props.keyLogger.voiceInput(value);
    // const selection = this.props.editorState.getSelection();
    // const contentState = this.props.editorState.getCurrentContent();
    // const newContentState = Modifier.insertText(contentState, selection, value);
    // this.props.handleChange(EditorState.createWithContent(newContentState));
    // this.setState({ contentState });
  }

  endValue(value) {
    console.log('End Value: ', value);
    value = value + ' ';
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
    return (
      <div className={styles['RichEditor-root']} >
        <h6>Target</h6>
        <details>
          <summary className={styles.summary}>Styles</summary>
          <BlockStyleControls
            editorState={this.props.editorState}
            onToggle={this.props.toggleBlockType}
            className={styles['RichEditor-styleButton']}
            activeClass={styles['RichEditor-activeButton']}
          />
          <InlineStyleControls
            editorState={this.props.editorState}
            onToggle={this.props.toggleInlineStyle}
            className={styles['RichEditor-styleButton']}
            activeClass={styles['RichEditor-activeButton']}
        />
        </details>
        <VoiceInput lang={this.props.lang} onChange={value => this.insertIntoEditor(value)} onEnd={endValue => this.endValue(endValue)} />
        <div className={styles['RichEditor-editor']} >
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.props.handleKeyCommand}
            keyBindingFn={this.myKeyBindingFn}
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
