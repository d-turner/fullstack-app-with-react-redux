import React from 'react';
import Dropzone from 'react-dropzone';
import { documentListSuccess } from '../Document/ActionCreators/DocumentActions';
import store from '../../store';
import styles from './dropzone.scss';
import api from '../../utils/apiWrapper';

const activeStyle = {
  borderColor: '#2ecc40',
  color: '#2ecc40',
  borderStyle: 'solid',
};

class Drop extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(accepted, rejected) {
    accepted.forEach((file) => {
      const formData = new FormData();
      formData.append('document', file);
      api.uploadDocument(formData, (response) => {
        if (response.status === 200) {
          alert('Upload Successful');
          store.dispatch(documentListSuccess(response.data.result));
        }
      });
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
          ref={(node) => { this.dropzone = node; }}
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

export default Drop;
