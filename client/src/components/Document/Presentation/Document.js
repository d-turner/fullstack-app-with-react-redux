import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import apiWrapper from '../../../utils/apiWrapper';
import store from '../../../store';
import { deleteDocument } from '../ActionCreators/DocumentActions';
import Button from '../../ButtonList/Button';
import main from '../../../constants/main.scss';
import styles from '../documents.scss';

export default class Document extends React.Component {
  state = { deleteConfirm: false };

  render() {
    const { id, document, index } = this.props;
    if (this.props.document.error) {
      return null;
    }
    return (
      <tr className={styles.tableBorder} data-index={index}>
        <td className={styles.tableRowHeight} data-key={id}>
          <strong>{document.id}</strong>
        </td>
        <td className={styles.tableRowHeight}>
          <Link to={`/documents/${id}`} className={styles.documentFilename}>{document.name}</Link>
        </td>
        <td>
          <span >
            <strong>{document.meta ? document.meta.segmentCount : null}</strong>
          </span>
        </td>
        <td>
          <span><strong>{document.meta ? document.meta.completedSegments : null}</strong></span>
        </td>
        <td>
          <span><strong>{document.created_at.split(' ')[0].split('-').reverse().join('/')}</strong></span>
        </td>
        <td>
          <span><strong>{document.meta ? document.meta.totalWords : null}</strong></span>
        </td>
        <td>
          {this.state.deleteConfirm ? (
            <div className="flex three" id="check">
              <Button
                classNames={`${main.clearButtonLeft} ${main.button} ${styles.inherit} ${main.redButton}`}
                label="Confirm"
                icon="done"
                func={() => store.dispatch(deleteDocument(document.id, id))}
                id="Confirm"
                tooltip={false} />
              <div className={`off-third ${main.clearPadding}`}>
                <Button
                  classNames={`${main.clearButtonLeft} ${main.button} ${styles.inherit} ${main.greenButton}`}
                  label="Cancel"
                  icon="clear"
                  func={() => this.setState({ deleteConfirm: false })}
                  id="Cancel"
                  tooltip={false} />
              </div>
            </div>
          ) : (
            <div id="remove">
              <Button
                classNames={`${main.clearButtonLeft} ${main.button} ${styles.inherit}`}
                label="Delete document"
                icon="delete"
                func={() => this.setState({ deleteConfirm: true })}
                id="Delete document"
                tooltip={false} />
            </div>
          )}
        </td>
        <td>
          <div id="download">
            <Button
              classNames={`${main.clearButtonLeft} ${main.downloadButton} ${styles.inherit}`}
              label="Download document"
              icon="file_download"
              func={() => apiWrapper.getDocument(document.saved_name, (response) => {
                // Create a new Blob object using the
                // response data of the onload object
                const blob = new Blob([response.data], { type: 'application/xml' });
                // Create a link element, hide it, direct
                // it towards the blob, and then 'click' it programatically
                const a = window.document.createElement('a');
                a.style = 'display: none';
                window.document.body.appendChild(a);
                // Create a DOMString representing the blob
                // and point the link element towards it
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = document.name;
                // programatically click the link to trigger the download
                a.click();
                // release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
              })}
              id="download"
              tooltip={false} />
          </div>
        </td>
      </tr>
    );
  }
}

Document.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};
