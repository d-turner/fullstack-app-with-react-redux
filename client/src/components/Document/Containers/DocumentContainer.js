import React from 'react';
import PropTypes from 'prop-types';

import Document from '../Presentation/Document';
import styles from '../documents.css';

class DocumentContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestDocument('machines.xlf');
    this.props.requestDocument('en-jpExample.xlf');
  }

  render() {
    const renderDocument = doc =>
    (
      <Document documentName={doc.name} document={doc} key={doc.id} value={doc.name} />
    );

    return (
      <div className={styles.wrapper}>
        <table id="documentList" className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thPadding}>
                <div className={styles['enforce-height']}>
                  <span className="document-selected checkbox-wrapper">
                    <input id="all_selected" type="checkbox" />
                    <label htmlFor="all_selected" />
                  </span>
                </div>
              </th>
              <th className={`${styles.thDocumentTitle} ${styles.thPadding}`}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Document name</div>
              </th>
              <th className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Segments</div>
              </th>
              <th className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Completed</div>
              </th>
              <th className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Words</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.documents.map((doc, index) => renderDocument(doc, index))}
          </tbody>
        </table>
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
