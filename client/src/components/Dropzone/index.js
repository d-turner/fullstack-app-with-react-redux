import React from 'react';
import Dropzone from 'react-dropzone';
import $q from 'q';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './dropActions';
import { fetchDocumentSuc, documentListSuccess } from '../Document/ActionCreators/DocumentActions';

import fileReader from '../../utils/fileReader';
import xliffParser from '../../utils/xliffTwoParser';

import styles from './dropzone.scss';
import api from '../../utils/apiWrapper';

// TODO: Replace Alerts with notifications
// TODO: First try parse the file
// TODO: Then build meta
// TODO: Save document and meta
// TODO: alert the user on result

const activeStyle = {
  borderColor: '#2ecc40',
  color: '#2ecc40',
  borderStyle: 'solid',
};

class Drop extends React.Component {
  onDrop = (accepted, rejected) => {
    accepted.forEach((file) => {
      const formData = new FormData();
      formData.append('document', file);
      const reader = fileReader($q);
      const parser = xliffParser(reader, $q, console);
      const func = parser.readFile(file);
      func.then((result) => {
        api.uploadDocument(formData, (response) => {
          if (response.status === 200) {
            alert('Upload and Parse Successful');
            this.props.buildMeta(response.data.result[0], result, this.props.length);
          } else {
            alert('Upload Failed');
          }
        });
      });
        // .then((result) => {
        //   store.dispatch(fetchDocumentSuc(documentId, result));
        // })
        // .catch((error) => {
        //   store.dispatch(fetchDocumentFail(documentId, error));
        // })
        // .done(() => {
        //   //  console.log('done dispatching...');
        // });
      // api.uploadDocument(formData, (response) => {
      //   if (response.status === 200) {
      //     alert('Upload Successful');
      //     store.dispatch(documentListSuccess(response.data.result));
      //   }
      // });
    });
    if (rejected.length > 0) {
      alert('Only xliff/xlf files allowed!');
    }
  }

  render() {
    return (
      <div>
        <Dropzone
          accept=".xliff,.xlf"
          activeStyle={activeStyle}
          className={`${styles.dropzone}`}
          onDrop={this.onDrop}
          disabled={false}
          ref={(node) => { this.dropzone = node; }}
          role="Dialog"
          tabIndex={0}
          inputProps={{ 'aria-label': 'Document Upload' }}>
          <p>Upload Documents</p>
        </Dropzone>
        <button type="button" onClick={() => { this.dropzone.open(); }}>
          Open File Dialog
      </button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer } = state;
  // return what we want available in the props
  const { documents } = documentReducer;
  return {
    length: Object.keys(documents).length,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  actionCreators.fetchDocumentSuc = fetchDocumentSuc;
  actionCreators.documentListSuccess = documentListSuccess;
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Drop);
