import React from 'react';
import PropTypes from 'prop-types';

import Document from '../Presentation/Document';

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { document: {} };
  }

  componentDidMount() {
    this.props.requestDocument('machines.xlf').then(() => {
      console.log('here');
      console.log(this);
    });

    this.props.requestDocument('en-jpExample.xlf').then(() => {
      console.log('here');
      console.log(this);
    });
  }

  render() {
    return (
      <Document {...this.props} />
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
};

export default DocumentContainer;
