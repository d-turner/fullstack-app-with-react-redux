import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

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

  onDrop(accepted) {
    accepted.forEach((file) => {
      const formData = new FormData();
      formData.append('document', file);
      api.uploadDocument(formData, (response) => {
        if (response.status === 200) {
          alert('Upload Successful');
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          accept=".xliff, .xlif"
          activeStyle={activeStyle}
          className={`${styles.dropzone}`}
          onDrop={this.onDrop}
          ref={(node) => { this.dropzone = node; }}>
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
