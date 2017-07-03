import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../../SidebarLeft';
import DocumentTable from '../Presentation/DocumentTable';

import styles from '../documents.scss';

class DocumentContainer extends React.Component {
  componentDidMount() {
    console.warn('Need to add api call here');
    this.props.requestDocument('123456');
    this.props.requestDocument('123457');
  }

  render() {
    return (
      <div className="flex five">
        <Sidebar />
        <div className={`four-fifth ${styles.clearPaddingBottom} ${styles.paddingInlineWithNavRight}`}>

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
