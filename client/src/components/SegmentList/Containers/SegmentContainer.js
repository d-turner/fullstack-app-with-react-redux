import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';

function SegmentContainer(props) {
  const id = props.match.params.documentId;
  const i = props.documents.findIndex(doc => doc.id === parseInt(id, 10));
  const doc = props.documents[i];

  return (
    <SegmentList segments={doc.xliff.segments} id={id} />
  );
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SegmentContainer;
