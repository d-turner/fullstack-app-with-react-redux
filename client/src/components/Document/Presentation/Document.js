import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';

export default function Document(props) {
  if (props.document && props.document.isFetching) {
    return (
      <div className="data-list">
        <span>Status: <Loader /></span>
      </div>
    );
  }
  return (
    <div className="data-list">
      <span>Status: Finished Loading <br /></span>
      <span>Name: {props.documentName}</span>
      <div>
        <span>Source Language: {props.document.xliff.sourceLang} <br /></span>
        <span>Target Language: {props.document.xliff.targetLang}</span>
      </div>
    </div>
  );
}

Document.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  documentName: PropTypes.string.isRequired,
};
