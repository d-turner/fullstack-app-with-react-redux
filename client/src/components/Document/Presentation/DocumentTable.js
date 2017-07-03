import React from 'react';

import Document from './Document';
import styles from '../documents.scss';

export default function DocumentTable(props) {
  const renderDocument = (doc, key) =>
    (<Document documentName={doc.name} document={doc} id={key} key={key} value={key} />);

  return (
    <table id="documentList" className={styles.fullWidth}>
      <caption>
        <h3>Users Document List</h3>
      </caption>
      <thead>
        <tr>
          <th>
            <div>
              <span>
                <input id="all_selected" type="checkbox"
                  aria-label="Select All. On selection all documents will be selected."
                  title="Select All. On selection all documents will be selected." />
                <label htmlFor="all_selected" />
              </span>
            </div>
          </th>
          <th scope="col">
            <div className="document-list-utility" />
            <div className="th-document-ellipsis">Document name</div>
          </th>
          <th scope="col">
            <div className="document-list-utility" />
            <div className="th-document-ellipsis">Segment Count</div>
          </th>
          <th scope="col">
            <div className="document-list-utility" />
            <div className="th-document-ellipsis">Completed Segments</div>
          </th>
          <th scope="col">
            <div className="document-list-utility" />
            <div className="th-document-ellipsis">Word Count</div>
          </th>
        </tr>
      </thead>
      <tbody>
        { Object.keys(props.documents).map(key => renderDocument(props.documents[key], key)) }
      </tbody>
    </table>
  );
}
