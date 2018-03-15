import React from 'react';
import PropTypes from 'prop-types';

import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { label: '<i style="font-size: 1.2em" class="material-icons">format_bold</i>', style: 'BOLD' },
  { label: '<i style="font-size: 1.2em" class="material-icons">format_italic</i>', style: 'ITALIC' },
  { label: '<i style="font-size: 1.2em" class="material-icons">format_underlined</i>', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const content = editorState.getCurrentContent();
  const startBlock = content.getBlockForKey(startKey);
  let currentStyle = new Map();
  if (startBlock !== undefined) {
    currentStyle = editorState.getCurrentInlineStyle();
  }
  return (
    <div>
      {INLINE_STYLES.map((type) => {
        return (<StyleButton
          className={props.className}
          key={type.label}
          active={currentStyle.has(type.style)}
          activeClass={props.activeClass}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />);
      },
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
