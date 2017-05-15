import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils } from 'draft-js';

import * as actionCreators from '../../actions/segmentActions';
import styles from './segment.css';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.handleChange = this.handleChange.bind(this);

    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target.value;
    this.props.updateSegment(parseInt(this.props.match.params.segmentId, 10), target);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    const id = this.props.match.params.segmentId;
    const i = this.props.segments.findIndex(segment => segment.id === parseInt(id, 10));
    const segment = this.props.segments[i];

    const wrapper = {
      backgroundColor: 'lightblue',
      marginRight: '0px',
      width: '520px',
      padding: '5px',
      marginTop: '5px',
    };
    const format = {
      fontSize: '18px',
    };

    return (
      <div className="data-list" style={format}>
        <div>Segment: {parseInt(segment.id, 10) + 1}</div>

        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{segment.source}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper} dangerouslySetInnerHTML={{__html: segment.mt }} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper} >
            <div className={styles['RichEditor-root']}>
              <BlockStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={styles['RichEditor-editor']}>
                <Editor
                  editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                  spellCheck
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
Segment.propTypes = {
  match: PropTypes.object.isRequired,
  updateSegment: PropTypes.func.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { segmentReducer } = state;
  const { segments } = segmentReducer;
  // return what we want available in the props
  return {
    segments,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};


class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let active = this.props.className;
    if (this.props.active) {
      active += ` ${styles['RichEditor-activeButton']}`;
    }
    return (
      <span className={active} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div>
      {BLOCK_TYPES.map(type =>
        <StyleButton
          className={styles['RichEditor-styleButton']}
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />,
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {INLINE_STYLES.map(type =>
        <StyleButton
          className={styles['RichEditor-styleButton']}
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />,
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
