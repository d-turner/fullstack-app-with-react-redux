import React from 'react';
import PropTypes from 'prop-types';

// TODO: Implement Sidebar Structure
// import Sidebar from '../../SidebarLeft';
import Dropzone from '../../Dropzone';
import DocumentTable from '../Presentation/DocumentTable';

// import styles from '../documents.scss';
import main from '../../../constants/main.scss';

class DocumentContainer extends React.Component {
  componentWillMount() {
    this.props.requestDocumentList();
  }

  render() {
    return (
      <div className="flex one five-1000 center">
        { /* <Sidebar /> */ }

        <div className={`full four-fifth-1000 ${main.clearPaddingBottom} ${main.paddingInlineWithNavRight}`}>
          <Dropzone />
          <div className={main.responsiveTable}>
            <DocumentTable documents={this.props.documents} />
          </div>
        </div>
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocumentList: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
