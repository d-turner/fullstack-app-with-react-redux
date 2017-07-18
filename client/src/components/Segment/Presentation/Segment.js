import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';
import CustomEditor from '../../Editor/CustomEditor';

class Segment extends React.Component {
  dragStartHandler(event) {
    event.dataTransfer.setData("text/plain", 'Hello');
    console.log(event);
  }

  dragEndHandler(event) {
    event.preventDefault();
    console.log(event);
  }

  allowDrop(event) {
    event.preventDefault();
   // console.log('Drop: ', event);
  }

  renderTile(word, index) {
    return (
      <span className={styles.format}
        draggable
        onDragStart={event => this.dragStartHandler(event)}
        onDragEnd={event => this.dragEndHandler(event)}>{word}</span>
    );
  }

  dropHandler(event) {
    event.preventDefault();
    console.log('drop:', event);
    console.log('drop:', event.target);
  }

  renderEditor(selected) {
    if (selected) {
      return (
        <div
          onDrop={event => this.dropHandler(event)}
          onDragOver={event => this.allowDrop(event)}
          style={{ marginTop: '10px' }}
          className={styles.editorWrapper}
          onClick={this.props.focus}
          tabIndex={0}
          role="Main"
        >
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
          <div className={styles.format1}>
            {this.props.segment.source.split(' ').map((word, index) => this.renderTile(word, index))}
          </div>
        </div>
        {this.renderEditor(selected)}
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
