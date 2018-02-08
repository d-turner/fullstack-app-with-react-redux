import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, getDefaultKeyBinding, Modifier, ContentState } from 'draft-js';

import { setSpacing, getWordAt } from '../../utils/stringParser';
import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.scss';
import main from '../../constants/main.scss';

class CustomEditor extends React.Component {
  state = { hasFocus: false, renderStyles: false, clipboard: '' };

  componentDidMount() {
    this.Editor.focus();
    this.props.keyLogger.setTimer('editStart');
  }
  componentWillUnmount() {
    this.props.keyLogger.setEditTotal();
  }

  myKeyBindingFn = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      return 'next-segment';
    }
    return getDefaultKeyBinding(e);
  }

  nextWord = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const plainText = contentState.getPlainText();
    const charArray = plainText.split('');
    const index = charArray.indexOf(' ', anchorOffset);
    const updatedSelection = selection.merge({
      focusOffset: index + 1,
      anchorOffset: index + 1,
    });
    this.props.handleChange(EditorState.forceSelection(this.props.editorState, updatedSelection));
  }

  previousWord = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    let anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const plainText = contentState.getPlainText();
    const charArray = plainText.split('');
    if (charArray[anchorOffset - 1] === ' ') anchorOffset -= 2;
    const index = charArray.lastIndexOf(' ', anchorOffset);
    const updatedSelection = selection.merge({
      focusOffset: index + 1,
      anchorOffset: index + 1,
    });
    this.props.handleChange(EditorState.forceSelection(this.props.editorState, updatedSelection));
  }

  selectWord = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const plainText = contentState.getPlainText();
    const charArray = plainText.split('');
    const index = charArray.indexOf(' ', anchorOffset);
    const updatedSelection = selection.merge({
      focusOffset: index,
      anchorOffset,
    });
    this.props.handleChange(EditorState.forceSelection(this.props.editorState, updatedSelection));
  }

  copyWord = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const lower = (anchorOffset <= focusOffset ? anchorOffset : focusOffset);
    const upper = (anchorOffset > focusOffset ? anchorOffset : focusOffset);
    const plainText = contentState.getPlainText();
    const selected = plainText.slice(lower, upper);
    this.setState({ clipboard: selected });
  }

  cutWord = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const lower = (anchorOffset <= focusOffset ? anchorOffset : focusOffset);
    const upper = (anchorOffset > focusOffset ? anchorOffset : focusOffset);
    const plainText = contentState.getPlainText();
    const selected = plainText.slice(lower, upper);
    this.setState({ clipboard: selected });
    const newText = plainText.substring(0, lower) + plainText.substring(upper);
    const updatedSelection = selection.merge({
      focusOffset: anchorOffset,
      anchorOffset,
    });
    const newEditorState = EditorState.push(this.props.editorState, ContentState.createFromText(newText), 'delete-character');
    this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
  }

  pasteWord = () => {
    this.endValue(this.state.clipboard);
  }

  clearText = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const updatedSelection = selection.merge({
      focusOffset: 0,
      anchorOffset: 0,
    });
    const newEditorState = EditorState.push(this.props.editorState, ContentState.createFromText(''), 'remove-range');
    this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
  }

  endValue = (value) => {
    if (value === undefined || value === '') return;
    // TODO: Capitalize // decap next letter
    this.props.keyLogger.voiceInput(value);
    // selection holds the cursor position
    const selection = this.props.editorState.getSelection();
    // content state holds EditorState without undo/redo history
    const contentState = this.props.editorState.getCurrentContent();
    const newValue = setSpacing(contentState.getPlainText(), value, selection.getAnchorOffset());
    const newContentState = Modifier.replaceText(contentState, selection, newValue);
    const newEditorState = EditorState.push(this.props.editorState, newContentState, 'insert-characters');
    const updatedSelection = selection.merge({
      focusOffset: selection.getAnchorOffset() + newValue.length,
      anchorOffset: selection.getAnchorOffset() + newValue.length,
    });
    this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
  }

  render() {
    let style = main['underline-from-center'];
    if (this.state.hasFocus) {
      style = `${styles.focus} ${main['underline-center']} ${main.animate}`;
    }
    return (
      <div className={styles['RichEditor-root']} id="editorWrapper"
        onClick={() => { this.Editor.focus(); }}
        aria-label="Editor"
        tabIndex={0}
        role="textbox">
        {this.state.renderStyles ?
          <Styles
            editorState={this.props.editorState}
            toggleBlockType={this.props.toggleBlockType}
            toggleInlineStyle={this.props.toggleInlineStyle} /> :
          null
        }
        <div className={`${styles['RichEditor-editor']} ${style}`} >
          <Editor
            autoCapitalize="sentences"
            autoComplete="off"
            autoCorrect="on"
            ariaLabel="Draft JS Editor"
            editorState={this.props.editorState}
            handleKeyCommand={this.props.handleKeyCommand}
            keyBindingFn={this.myKeyBindingFn}
            onFocus={(e) => { e.preventDefault(); this.setState({ hasFocus: true }); }}
            onBlur={(e) => { e.preventDefault(); this.setState({ hasFocus: false }); }}
            onChange={this.props.handleChange}
            ref={(ref) => { this.Editor = ref; this.props.setRef('Editor', ref); }}
          />
        </div>
      </div>
    );
  }
}

CustomEditor.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
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
