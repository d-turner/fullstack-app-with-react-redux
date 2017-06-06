import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Loader from '../../Loader/Loader';
import styles from '../documents.css';

export default function Document(props) {
  if (props.document && props.document.isFetching) {
    return (
      <tr className={styles.rowWrapper} key={props.document.id} value={props.document.name}>
        <td className={styles.documentSelect}>
          <div className={styles['enforce-height']}>
            <span className="document-selected checkbox-wrapper">
              <input id={props.document.id} type="checkbox" />
              <label htmlFor="checked_45986" />
            </span>
            <span className="document-deselected">
              <span className="icon-circle" />
            </span>
          </div>
        </td>
        <td className="documentTitle">
          <div className="hint--top">
            <div className="title">
              <Loader />
            </div>
          </div>
        </td>
        <td className="document-details-meta document-details-segments">
          <span className="ng-binding"><strong /></span>
        </td>
      </tr>
    );
  }
  return (
    <tr className={styles.rowWrapper}>
      <td className={styles.documentSelect}>
        <div className={styles['enforce-height']}>
          <span className="document-selected checkbox-wrapper">
            <input id={props.document.id} type="checkbox" />
            <label htmlFor="checked_45986" />
          </span>
          <span className="document-deselected">
            <span className="icon-circle" />
          </span>
        </div>
      </td>
      <td className={styles.documentTitle}>
        <div className="hint--top">
          <div className="title">
            <Link to={`/documents/${props.document.id}`} className={styles.documentFilename}>{props.documentName}</Link>
          </div>
        </div>
      </td>
      <td className="document-details-meta document-details-segments">
        <span className="ng-binding"><strong>{props.document.xliff.segments.length}</strong></span>
      </td>
      <td className="document-details-meta document-details-segments">
        <span className="ng-binding"><strong>4</strong></span>
      </td>
      <td className="document-details-meta document-details-segments">
        <span className="ng-binding"><strong>1112</strong></span>
      </td>
    </tr>
  );
}

Document.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  documentName: PropTypes.string.isRequired,
};
