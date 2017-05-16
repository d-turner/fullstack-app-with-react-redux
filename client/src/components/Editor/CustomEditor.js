import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

import BlockStyleControls from '../Editor/BlockStyleControls';
import InlineStyleControls from '../Editor/InlineStyleControls';
import styles from './Editor.css';

class CustomeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles['RichEditor-root']} >
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
        <div className={styles['RichEditor-editor']} >
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.props.handleKeyCommand}
            onChange={this.props.handleChange}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

CustomeEditor.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CustomeEditor;
