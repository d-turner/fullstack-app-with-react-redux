import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../documents.scss';

export default function Document(props) {
  const { id, documentName } = props;
  if (props.document.error) {
    return null;
  }
  return (
    <tr className={styles.tableBorder}>
      <td className={styles.tableRowHeight}>
        <div>
          <span>
            <input type="radio"
              aria-label="Select Document"
              title="Select Document" />
            <label htmlFor="checked_45986" />
          </span>
        </div>
      </td>
      <td>
        <div>
          <div>
            <Link to={`/documents/${id}`} className={styles.documentFilename}>{documentName}</Link>
          </div>
        </div>
      </td>
      <td>
        <span >
          <strong>{props.document.xliff.segments ? props.document.xliff.segments.length : null}</strong>
        </span>
      </td>
      <td>
        <span><strong /></span>
      </td>
      <td>
        <span><strong /></span>
      </td>
    </tr>
  );
}

Document.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
};
