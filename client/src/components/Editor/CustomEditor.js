import React from 'react';
import PropTypes from 'prop-types';
import { Editor, getDefaultKeyBinding } from 'draft-js';

import VoiceInput from '../VoiceInputModal/react-speech-recognition-input';
import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.scss';

class CustomEditor extends React.Component {
  componentDidMount() {
    this.Editor.focus();
  }

  myKeyBindingFn(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      return 'next-segment';
    }
    return getDefaultKeyBinding(e);
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
        <VoiceInput onChange={(value) => { alert('Value: ', value); }} onEnd={(value) => { alert('End Value: ', value); }} />
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
};

export default CustomEditor;
