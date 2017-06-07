import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';
import Sidebar from '../../Sidebar';
import styles from '../styles.css';

function SegmentContainer(props) {
  const id = parseInt(props.match.params.documentId, 10);
  // const i = props.documents.findIndex(doc => doc.id === id);
  const doc = props.documents[id];

  return (
    <div className={styles.mainContent}>
      <SegmentList segments={doc.xliff.segments} documentId={id} editorState={props.editorState} {...props} />
      <Sidebar
        sourceLang={props.documents[id].xliff.sourceLang}
        targetLang={props.documents[id].xliff.targetLang}
      />
    </div>
  );
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentContainer;
