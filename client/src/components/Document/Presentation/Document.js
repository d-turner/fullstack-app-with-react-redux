import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loader from '../../Loader/Loader';
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
          <strong>{props.document.isFetching ? (<Loader />) : props.document.xliff.segments.length}</strong>
        </span>
      </td>
      <td>
        <span><strong>4</strong></span>
      </td>
      <td>
        <span><strong>1112</strong></span>
      </td>
    </tr>
  );
}

Document.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
};
