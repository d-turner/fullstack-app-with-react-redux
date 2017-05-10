import React from 'react';

import SegmentList from './SegmentList';

function SegmentContainer(props) {
  return (
    <div>
      <SegmentList {...props} />
    </div>
  );
}

export default SegmentContainer;
