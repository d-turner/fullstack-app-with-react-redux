import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';
import Sidebar from '../../Sidebar';
import styles from '../styles.css';

function SegmentContainer(props) {
  const id = props.match.params.documentId;
  const i = props.documents.findIndex(doc => doc.id === parseInt(id, 10));
  const doc = props.documents[i];

  return (
    <div className={styles.mainContent}>
      <SegmentList segments={doc.xliff.segments} id={id} match={props.match} />
      <Sidebar
        sourceLang={props.documents[i].xliff.sourceLang}
        targetLang={props.documents[i].xliff.targetLang}
      />
    </div>
  );
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SegmentContainer;
