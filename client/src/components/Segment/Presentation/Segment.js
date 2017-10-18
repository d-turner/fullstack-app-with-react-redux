import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';
import CustomEditor from '../../Editor/CustomEditor';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    const { segment } = props;
    this.state = { target: segment.target };
  }

  componentDidMount() {
    const node = document.getElementById('selectedSegment');
    node.scrollIntoView({ behavior: 'auto', block: 'center' });
  }

  renderEditor() {
    return (
      <div
        style={{ marginTop: '10px' }}
        className={styles.editorWrapper}
        onKeyDown={e => this.props.keyLogger.record(e)}
        tabIndex={0}
        role="Main"
      >
        <CustomEditor
          id="customEditor"
          editorState={this.props.editorState}
          toggleBlockType={this.props.toggleBlockType}
          toggleInlineStyle={this.props.toggleInlineStyle}
          handleKeyCommand={this.props.handleKeyCommand}
          handleChange={this.props.handleChange}
          keyLogger={this.props.keyLogger}
          ref={(ref) => { this.CustomEditor = ref; }}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={`${styles.wrapper} ${styles.selected}`}>
          <h6>#{this.props.segmentId} Source</h6>
          {this.props.segment.source}
          <h6 style={{ marginTop: '10px' }}>Machine Translation</h6>
          {this.state.target}
        </div>
        {this.renderEditor()}
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
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Segment;
