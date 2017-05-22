import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Document from '../Presentation/Document';


const documentClass = {
  margin: '10px',
  padding: '10px',
  width: '520px',
  backgroundColor: 'lightcoral',
};

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestDocument('machines.xlf');
    this.props.requestDocument('en-jpExample.xlf');
  }

  render() {
    const renderDocument = (key, index) =>
    (
      <div key={key} value={key}>
        <Link to={`/documents/${this.props.documents[key].id}`}>
          <div style={documentClass}>
            Document: {index + 1}
            <Document documentName={key} document={this.props.documents[key]} />
          </div>
        </Link>
      </div>
    );

    return (
      <div>
        {Object.keys(this.props.documents).map(renderDocument)}
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
