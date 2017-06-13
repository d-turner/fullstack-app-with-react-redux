import React from 'react';
import PropTypes from 'prop-types';

import Document from '../Presentation/Document';
import styles from '../documents.css';

class DocumentContainer extends React.Component {
  componentDidMount() {
    this.props.requestDocument('123456');
    this.props.requestDocument('123457');
  }

  render() {
    const renderDocument = (doc, key) =>
    (
      <Document documentName={doc.name} document={doc} id={key} key={key} value={key} />
    );

    return (
      <div className={styles.wrapper}>
        <table id="documentList" className={styles.table}>
          <caption>Users Document List</caption>
          <thead>
            <tr>
              <th className={styles.thPadding}>
                <div className={styles['enforce-height']}>
                  <span className="document-selected checkbox-wrapper">
                    <input id="all_selected" type="checkbox"
                      aria-label="Select All. On selection all documents will be selected."
                      title="Select All. On selection all documents will be selected." />
                    <label htmlFor="all_selected" />
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className={`${styles.thDocumentTitle} ${styles.thPadding}`}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Document name</div>
              </th>
              <th
                scope="col"
                className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Segment Count</div>
              </th>
              <th
                scope="col"
                className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Completed Segments</div>
              </th>
              <th
                scope="col"
                className={styles.thPadding}>
                <div className="document-list-utility" />
                <div className="th-document-ellipsis">Word Count</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* this.props.documents.map((doc, index) => renderDocument(doc, index)) */}
            { Object.keys(this.props.documents).map(key => renderDocument(this.props.documents[key], key))}
          </tbody>
        </table>
      </div>
    );
  }
}

DocumentContainer.propTypes = {
  requestDocument: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DocumentContainer;
