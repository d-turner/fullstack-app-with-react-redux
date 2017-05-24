import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';

function SegmentContainer(props) {
  console.log(props);
  const id = props.match.params.documentId;
  const keys = Object.keys(props.documents);
  let doc;
  for (let i = 0; i < keys.length; i++) {
    if (props.documents[keys[i]].id === parseInt(id, 10)) {
      doc = props.documents[keys[i]];
      console.warn('This is not good code!');
      break;
    }
  }
  return (
    <div>
      <SegmentList segments={doc.xliff.segments} id={id} />
    </div>
  );
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.objectOf(PropTypes.object),
};

export default SegmentContainer;
