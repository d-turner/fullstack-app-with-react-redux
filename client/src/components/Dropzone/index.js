import React from 'react';
import Dropzone from 'react-dropzone';
import $q from 'q';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './dropActions';
import { fetchDocumentSuc, documentListSuccess } from '../Document/ActionCreators/DocumentActions';

import fileReader from '../../utils/fileReader';
import xliffParser from '../../utils/xliffTwoParser';

import Alerts from '../Notifications/Alerts';
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
  state = { messages: [], types: [] }

  onDrop = (accepted, rejected) => {
    accepted.forEach((file) => {
      const formData = new FormData();
      formData.append('document', file);
      const reader = fileReader($q);
      const parser = xliffParser(reader, $q, console);
      const func = parser.readFile(file);
      func.then((result) => {
        api.uploadDocument(formData)
          .then((response) => {
            this.setState({
              messages: this.state.messages.concat('Upload Successful'),
              types: this.state.types.concat('success'),
            });
            this.props.buildMeta(response.data.result[0], result, this.props.length);
          })
          .catch((error) => {
            this.setState({
              messages: this.state.messages.concat('Upload Failed'),
              types: this.state.types.concat('fail'),
            });
          });
      }).catch((error) => {
        this.setState({
          messages: this.state.messages.concat('Upload Failed: There was an issue parsing the document, please confirm the document is a valid xliff/xlf document'),
          types: this.state.types.concat('fail'),
        });
      });
    });
    if (rejected.length > 0) {
      this.setState({
        messages: this.state.messages.concat('Upload Failed, Only .xliff/.xlf files allowed!'),
        types: this.state.types.concat('fail'),
      });
    }
  }

  render() {
    return (
      <div>
        <Alerts messages={this.state.messages} types={this.state.types} />
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
