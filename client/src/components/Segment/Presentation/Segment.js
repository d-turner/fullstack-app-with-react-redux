import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from '../segment.scss';
import CustomEditor from '../../Editor/CustomEditor';
import DraggableTiles from '../../DraggableTiles/Container';

import KeyLogger from '../../KeyLogger/KeyLogger';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    const { segmentId, segment, documentId, userId, email } = props;
    this.keyLogger = new KeyLogger(documentId, segmentId, segment.source, segment.target, userId, email);
  }
  componentWillUnmount() {
    if (this.props.selectedSegment === this.props.segmentId) {
      this.keyLogger.setTarget(this.props.segment.target);
      this.keyLogger.save();
      this.keyLogger.build();
    }
  }

  renderEditor(selected) {
    if (selected) {
      if (this.props.renderTiles) {
        return (
          <div className={`${styles.wrapper} ${styles.selected}`} style={{ marginTop: '4px' }}>
            <h6>Target</h6>
            <DraggableTiles
              segment={this.props.segment}
              segmentId={this.props.segmentId}
              documentId={this.props.documentId}
              onTileDrag={e => this.keyLogger.tileDrag(e)}
            />
          </div>
        );
      }
      return (
        <div
          style={{ marginTop: '10px' }}
          className={styles.editorWrapper}
          onKeyDown={e => this.keyLogger.record(e)}
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
            ref={(ref) => { this.CustomEditor = ref; }}
          />
        </div>
      );
    }
    return (
      <div className={styles.wrapper} style={{ marginTop: '4px' }}>
        <h6>Target</h6>
        <span dangerouslySetInnerHTML={{ __html: this.props.segment.target }} />
      </div>
    );
  }

  render() {
    let selected = false;
    if (this.props.selectedSegment === this.props.segmentId) {
      selected = true;
    }
    return (
      <div>
        <div className={selected ? `${styles.wrapper} ${styles.selected}` : `${styles.wrapper}`}>
          <h6>#{this.props.segmentId} Source</h6>
          {this.props.segment.source}
        </div>
        {this.renderEditor(selected)}
      </div>
    );
  }
}

Segment.propTypes = {
  renderTiles: PropTypes.bool.isRequired,
  documentId: PropTypes.string.isRequired,
  focus: PropTypes.func.isRequired,
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  selectedSegment: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Segment;
