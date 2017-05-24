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
    const renderDocument = (doc, index) =>
    (
      <div key={doc.id} value={doc.name}>
        <Link to={`/documents/${this.props.documents[index].id}`}>
          <div style={documentClass}>
            Document: {index + 1}
            <Document documentName={doc.name} document={doc} />
          </div>
        </Link>
      </div>
    );

    return (
      <div>
        {this.props.documents.map((doc, index) => renderDocument(doc, index))}
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
