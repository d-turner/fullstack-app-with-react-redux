import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';
import CustomEditor from '../../Editor/CustomEditor';
import { splitTextIntoArray, cleanText } from '../../../utils/stringParser';
import SortableTiles from '../../DraggableTiles/Container/SortableTiles';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    const { segment } = props;
    this.state = { target: segment.target };
  }

  componentDidMount() {
    if (this.props.segmentId !== 0) {
      const node = document.getElementById('selectedSegment');
      node.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }

  renderTiles(sortable) {
    const { segment } = this.props;
    let words = splitTextIntoArray(cleanText(segment.source));
    if (sortable) words = splitTextIntoArray(cleanText(segment.target));
    return (
      <div id={sortable ? 'targetTiles' : 'sourceTiles'}>
        <SortableTiles
          words={words}
          segment={this.props.segment}
          segmentId={this.props.segmentId}
          documentId={this.props.documentId}
          sortable={sortable}
          keyLogger={this.props.keyLogger} />
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
        ref={(ref) => { this.CustomEditor = ref; }} />
    );
  }

  renderMT() {
    return (
      <div className={`${styles.wrapper} ${styles.selected}`}>
        <h5>Machine Translation</h5>
        {this.state.target}
      </div>
    );
  }

  // we want to either render the tile view or the editor view based on a prop
  // use a temporary variable for now
  render() {
    const renderTiles = true;
    return (
      <div>
        <div className={`${styles.wrapper} ${styles.selected}`}>
          <div className={styles.number}><h5># {this.props.segmentId}</h5></div>
          <h5>Source</h5>
          {renderTiles ? this.renderTiles(false) : this.renderSource()}
          <h5 className={styles.targetSpacing}>Target Window</h5>
          <div onKeyDown={e => this.props.keyLogger.record(e)} role="Main">
            {renderTiles ? this.renderTiles(true) : this.renderEditor()}
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
};

export default Segment;
