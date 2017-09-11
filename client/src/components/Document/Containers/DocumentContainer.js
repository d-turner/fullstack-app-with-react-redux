import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../../SidebarLeft';
import DocumentTable from '../Presentation/DocumentTable';

// import styles from '../documents.scss';
import main from '../../../constants/main.scss';

class DocumentContainer extends React.Component {
  componentWillMount() {
    this.props.requestDocumentList();
  }

  render() {
    return (
      <div className="flex five">
        <Sidebar />

        <div className={`four-fifth ${main.clearPaddingBottom} ${main.paddingInlineWithNavRight}`}>
          <DocumentTable documents={this.props.documents} />
        </div>
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
