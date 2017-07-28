import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../constants/main.scss';

class FindReplace extends React.Component {
  constructor(props) {
    super(props);

    this.findNext = this.findNext.bind(this);
    this.replaceText = this.replace.bind(this);
    this.replaceAll = this.replaceAll.bind(this);
  }

  findNext(event) {
    event.preventDefault();
    const find = this.findText.value;
    if (find !== '') {
      this.props.findNext(
        this.props.documentId,
        find,
      );
      setTimeout(() => {
        const location = document.getElementById('findreplace');
        location.scrollIntoView();
      }, 150);
    }
  }

  replace(event) {
    event.preventDefault();
    const findText = this.findText.value;
    const newText = this.replaceText.value;
    this.props.replace(
      this.props.documentId,
      findText,
      newText,
    );
  }

  replaceAll() {
    console.log('Replace all');
    const text = 'text';
    const newText = 'newText';
    this.props.findNext(this.props.documentId, text, newText);
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <h3 className={styles.clearMarginLeft}>Find and Replace</h3>
        <h4>Find</h4>
        <div><input type="text" ref={(ref) => { this.findText = ref; }} required /></div>
        <h4>Replace</h4>
        <div><input type="text" ref={(ref) => { this.replaceText = ref; }} /></div>
        <button className={styles.smallMargin} onClick={event => this.findNext(event)}>Next</button>
        <button className={styles.smallMargin} onClick={event => this.replace(event)}>Replace</button>
        <button onClick={() => this.replaceAll()}>Replace All</button>
      </div>
    );
  }
}

FindReplace.propTypes = {
  documentId: PropTypes.number.isRequired,
  findNext: PropTypes.func.isRequired,
  find: PropTypes.objectOf(PropTypes.any).isRequired,
  replace: PropTypes.func.isRequired,
};

export default FindReplace;
