import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, getDefaultKeyBinding, Modifier, ContentState } from 'draft-js';

import { setSpacing } from '../../utils/stringParser';
import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.scss';
import main from '../../constants/main.scss';

class CustomEditor extends React.PureComponent {
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
    if (!selection.isCollapsed()) {
      const contentState = this.props.editorState.getCurrentContent();
      const anchorOffset = selection.getAnchorOffset();
      const focusOffset = selection.getFocusOffset();
      const lower = (anchorOffset <= focusOffset ? anchorOffset : focusOffset);
      const upper = (anchorOffset > focusOffset ? anchorOffset : focusOffset);
      const plainText = contentState.getPlainText();
      const selected = plainText.slice(lower, upper);
      const newContentState = Modifier.removeRange(contentState, selection, 'forward');
      const newEditorState = EditorState.push(this.props.editorState, newContentState, 'remove-range');
      this.props.handleChange(newEditorState);
      this.setState({ clipboard: selected });
    }
  }

  pasteWord = () => {
    this.endValue(this.state.clipboard);
  }

  delete = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    if (selection.isCollapsed()) {
      const contentState = this.props.editorState.getCurrentContent();
      const anchorOffset = selection.getAnchorOffset();
      if (anchorOffset === 0) return;
      const plainText = contentState.getPlainText();
      const lower = plainText.slice(0, anchorOffset - 1);
      const upper = plainText.slice(anchorOffset);
      const newEditorState = EditorState.push(
        this.props.editorState, ContentState.createFromText(lower.concat(upper)), 'delete-character',
      );
      const newSelection = newEditorState.getSelection();
      const updatedSelection = newSelection.merge({
        focusOffset: anchorOffset - 1,
        anchorOffset: anchorOffset - 1,
      });
      this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
    }
  }

  insertWord = (word) => {
    this.endValue(word);
  }

  upperCase = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const plainText = contentState.getPlainText();
    const charArray = plainText.split('');
    charArray[anchorOffset] = charArray[anchorOffset].toUpperCase();
    const newEditorState = EditorState.push(
      this.props.editorState, ContentState.createFromText(charArray.join('')), 'change-block-data',
    );
    const newSelection = newEditorState.getSelection();
    const updatedSelection = newSelection.merge({
      focusOffset,
      anchorOffset,
    });
    this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
  }

  lowerCase = () => {
    this.Editor.focus();
    const selection = this.props.editorState.getSelection();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorOffset = selection.getAnchorOffset();
    const focusOffset = selection.getFocusOffset();
    const plainText = contentState.getPlainText();
    const charArray = plainText.split('');
    charArray[anchorOffset] = charArray[anchorOffset].toLowerCase();
    const newEditorState = EditorState.push(
      this.props.editorState, ContentState.createFromText(charArray.join('')), 'change-block-data',
    );
    const newSelection = newEditorState.getSelection();
    const updatedSelection = newSelection.merge({
      focusOffset,
      anchorOffset,
    });
    this.props.handleChange(EditorState.forceSelection(newEditorState, updatedSelection));
  }

  bold = () => {
    // TODO: set the current selection to be bold or activate it if not
    this.Editor.focus();
    this.props.toggleInlineStyle('BOLD');
  }

  italic = () => {
    // TODO: set the current formatting to be italic or word style if selected
    this.Editor.focus();
    this.props.toggleInlineStyle('ITALIC');
  }

  underline = () => {
    // TODO: set the current formatting to be underline or word style if selected
    this.Editor.focus();
    this.props.toggleInlineStyle('UNDERLINE');
  }

  undo = () => {
    const lastEditorState = EditorState.undo(this.props.editorState);
    this.props.handleChange(lastEditorState);
  }

  redo = () => {
    const nextEditorState = EditorState.redo(this.props.editorState);
    this.props.handleChange(nextEditorState);
  }

  focusEditor = () => {
    this.Editor.focus();
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
        onClick={(e) => { e.preventDefault(); this.Editor.focus(); }}
        aria-label="Editor"
        role="navigation">
        {this.state.renderStyles ?
          <Styles
            editorState={this.props.editorState}
            toggleBlockType={this.props.toggleBlockType}
            toggleInlineStyle={this.props.toggleInlineStyle} /> :
          null
        }
        <div className={`${styles['RichEditor-editor']} ${style}`}>
          <Editor
            autoCapitalize="sentences"
            autoComplete="off"
            autoCorrect="on"
            spellCheck
            ariaLabel="segment target editor"
            ariaMultiline
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
  setRef: PropTypes.func.isRequired,
};

export default CustomEditor;

export const Styles = function(props) {
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
