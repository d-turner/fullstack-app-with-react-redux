import React from 'react';
import PropTypes from 'prop-types';

import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  const { editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div>
      {INLINE_STYLES.map(type =>
        <StyleButton
          className={props.className}
          key={type.label}
          active={currentStyle.has(type.style)}
          activeClass={props.activeClass}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />,
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
