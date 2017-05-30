import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import CustomEditor from '../../Editor/CustomEditor';

class Segment extends React.Component {
  render() {
    return (
      <div className={styles.format}>
        <div>Segment: {this.props.segmentId}</div>

        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div className={styles.wrapper}>{this.props.segment.source}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div className={styles.wrapper} dangerouslySetInnerHTML={{ __html: this.props.segment.target }} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div className={styles.wrapper} onClick={this.props.focus} tabIndex={0} role={'textbox'} >
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
  segmentId: PropTypes.string.isRequired,
};

export default Segment;
