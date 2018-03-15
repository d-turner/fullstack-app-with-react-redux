import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';
import CustomEditor from '../../Editor/CustomEditor';
import SortableTilesContainer from '../../DraggableTiles/Container/SortableTilesContainer';
import UnsortableTilesContainer from '../../DraggableTiles/Container/UnsortableTilesContainer';

class Segment extends React.Component {
  state = { dragging: false };

  componentDidMount() {
    if (this.props.segmentId !== 0 && this.props.segmentId !== -1) {
      const node = document.getElementById('selectedSegment');
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const rect = node.getClientRects()[0];
      window.scrollBy(0, rect.top);
    }
  }

  setDragging = (bool) => {
    this.setState({ dragging: bool });
  }

  renderTiles(text) {
    return (
      <div id="sourceTiles">
        <UnsortableTilesContainer
          text={text}
          setDragging={this.setDragging}
          dragging={this.state.dragging} />
      </div>
    );
  }
  renderSortableTiles(text) {
    return (
      <div id="targetTiles">
        <SortableTilesContainer
          text={text}
          segmentId={this.props.segmentId}
          documentId={this.props.documentId}
          setDragging={this.setDragging}
          dragging={this.state.dragging}
          keyLogger={this.props.keyLogger}
          insertTiles={this.props.insertTiles}
          ref={(ref) => { this.Sortable = ref; this.props.setRef('Sortable', ref); }} />
      </div>
    );
  }

  renderSource() {
    return (<div>{this.props.segment.source}</div>);
  }

  renderEditor() {
    return (
      <CustomEditor id="customEditor"
        editorState={this.props.editorState}
        toggleBlockType={this.props.toggleBlockType}
        toggleInlineStyle={this.props.toggleInlineStyle}
        handleKeyCommand={this.props.handleKeyCommand}
        handleChange={this.props.handleChange}
        keyLogger={this.props.keyLogger}
        lang={this.props.xliff.targetLang}
        setRef={this.props.setRef}
        ref={(ref) => { this.CustomEditor = ref; this.props.setRef('CustomEditor', ref); }} />
    );
  }

  renderMT() {
    return (
      <div className={`${styles.wrapper} ${styles.selected}`}>
        <h5>Machine Translation</h5>
        {this.props.mt}
      </div>
    );
  }

  render() {
    const { renderTiles, segmentId, segment, keyLogger } = this.props;
    return (
      <div>
        <div className={`${styles.wrapper} ${styles.selected}`}>
          <div className={styles.number}><h5># {segmentId}</h5></div>
          <h5>Source</h5>
          {renderTiles ? this.renderTiles(segment.source) : this.renderSource()}
          <h5 className={styles.targetSpacing}>Target Window</h5>
          <div
            aria-label="Key Logger"
            onKeyDown={e => keyLogger.record(e)} role="Main">
            {renderTiles ? this.renderSortableTiles(segment.target) : this.renderEditor()}
          </div>
        </div>
        {this.renderMT()}
      </div>
    );
  }
}

Segment.propTypes = {
  toggleBlockType: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  handleKeyCommand: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  documentId: PropTypes.string.isRequired,
  xliff: PropTypes.objectOf(PropTypes.any).isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
  renderTiles: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  insertTiles: PropTypes.bool.isRequired,
  mt: PropTypes.string,
};

Segment.defaultProps = {
  mt: '',
};

export default Segment;
