import React from 'react';
import PropTypes from 'prop-types';

import CustomEditor from '../../Editor/CustomEditor';

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

class Segment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="data-list" style={format}>
        <div>Segment: {'Need to update this with id'}</div>

        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{this.props.segment.source}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper} dangerouslySetInnerHTML={{__html: this.props.segment.target }} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper} onClick={this.props.focus} tabIndex={0} role={'Form'} >
            <CustomEditor
              editorState={this.props.editorState}
              toggleBlockType={this.props.toggleBlockType}
              toggleInlineStyle={this.props.toggleInlineStyle}
              handleKeyCommand={this.props.handleKeyCommand}
              handleChange={this.props.handleChange}
              ref={(ref) => { this.CustomEditor = ref; }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Segment.propTypes = {
  focus: PropTypes.func.isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Segment;
