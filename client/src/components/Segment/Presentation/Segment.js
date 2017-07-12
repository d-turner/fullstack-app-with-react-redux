import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import CustomEditor from '../../Editor/CustomEditor';

class Segment extends React.Component {
  renderEditor() {
    if (this.props.selectedSegment === this.props.segmentId) {
      return (
        <div className={styles.editorWrapper} onClick={this.props.focus} tabIndex={0} role="Main">
          <CustomEditor
            editorState={this.props.editorState}
            toggleBlockType={this.props.toggleBlockType}
            toggleInlineStyle={this.props.toggleInlineStyle}
            handleKeyCommand={this.props.handleKeyCommand}
            handleChange={this.props.handleChange}
            ref={(ref) => { this.CustomEditor = ref; }}
          />
        </div>
      );
    }
    return (
      <div className={styles.wrapper}>
        <h6>Target</h6>
        <span dangerouslySetInnerHTML={{ __html: this.props.segment.target }} />
      </div>
    );
  }

  render() {
    return (
      <div className={`${styles.format}`}>
        <div className={styles.wrapper}>
          <h6>#{this.props.segmentId} Source</h6>
          {this.props.segment.source}
        </div>

        <div style={{ marginTop: '10px' }}>
          {this.renderEditor()}
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
  segmentId: PropTypes.number.isRequired,
  selectedSegment: PropTypes.number.isRequired,
};

export default Segment;
