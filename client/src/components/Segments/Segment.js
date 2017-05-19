import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RichUtils, convertToRaw } from 'draft-js';

import * as actionCreators from '../../actions/segmentActions';

import CustomEditor from '../Editor/CustomEditor';

class Segment extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.match.params.segmentId;
    const i = this.props.segments.findIndex(segment => segment.id === parseInt(id, 10));
    const segment = this.props.segments[i];
    const editorState = segment.editorState;

    this.state = {
      editorState,
      segment,
    };
    this.handleChange = this.handleChange.bind(this);

    this.focus = () => { this.CustomEditor.Editor.focus(); };
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  handleChange(editorState) {
    // We need to continue updating the local state in order
    // to get the latest selection position
    this.setState({ editorState });

    this.props.updateSegment(
      parseInt(this.props.match.params.segmentId, 10),
      convertToRaw(editorState.getCurrentContent()),
    );
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleBlockType(blockType) {
    this.handleChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
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
        <div>Segment: {parseInt(this.state.segment.id, 10) + 1}</div>

        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{this.state.segment.source}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper} dangerouslySetInnerHTML={{__html: this.state.segment.mt }} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper} onClick={this.focus} tabIndex={0} role={'Form'} >
            <CustomEditor
              editorState={this.state.editorState}
              toggleBlockType={this.toggleBlockType}
              toggleInlineStyle={this.toggleInlineStyle}
              handleKeyCommand={this.handleKeyCommand}
              handleChange={this.handleChange}
              ref={(ref) => { this.CustomEditor = ref; }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
