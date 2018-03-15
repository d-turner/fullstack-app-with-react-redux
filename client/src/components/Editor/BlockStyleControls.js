import React from 'react';
import PropTypes from 'prop-types';

import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  { label: '<h1 style="font-size: 1.7em">H1</h1>', style: 'header-one' },
  { label: '<h2>H2</h2>', style: 'header-two' },
  { label: '<h3 style="margin-left: 0px">H3</h3>', style: 'header-three' },
  { label: '<h4>H4</h4>', style: 'header-four' },
  { label: '<h5>H5</h5>', style: 'header-five' },
  { label: '<h6>H6</h6>', style: 'header-six' },
  { label: '<i style="font-size: 1.2em" class="material-icons">format_quote</i>', style: 'blockquote' },
  { label: '<i style="font-size: 1.2em" class="material-icons">list</i>', style: 'unordered-list-item' },
  { label: '<i style="font-size: 1.2em" class="material-icons">format_list_numbered</i>', style: 'ordered-list-item' },
  { label: '<i style="font-size: 1.2em" class="material-icons">code</i>', style: 'code-block' },
];
const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  let blockType = null;
  if (block !== undefined) {
    blockType = block.getType();
  }
  return (
    <div style={{ marginBottom: '10px' }}>
      {BLOCK_TYPES.map((type) => {
        return (<StyleButton
          key={type.label}
          className={props.className}
          active={type.style === blockType}
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

BlockStyleControls.propTypes = {
  editorState: PropTypes.objectOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default BlockStyleControls;
