import React from 'react';
import ReactDOM from 'react-dom';

class FindReplace extends React.Component {
  constructor(props) {
    super(props);

    this.findNext = this.findNext.bind(this);
    this.replaceText = this.replaceText.bind(this);
    this.replaceAll = this.replaceAll.bind(this);
  }

  findNext() {
    if (this.props.findReplace.word !== '') {
      this.props.findNext(
        this.props.documentId,
        this.props.findReplace.currentSegment,
        this.props.findReplace.wordIndex,
        this.props.findReplace.word
      );
      setTimeout(() => {
        const location = document.getElementById('findreplace');
        location.scrollIntoView();
      }, 150);
    }
  }

  replaceText() {
    const newText = this.replaceText.value;
    this.props.replaceText(
      this.props.documentId,
      this.props.findReplace.currentSegment,
      this.props.findReplace.wordIndex,
      this.props.findReplace.word,
      newText,
    );
  }

  replaceAll() {
    console.log('Replace all');
    const text = 'text';
    const newText = 'newText';
    this.props.findNext(this.props.documentId, this.props.segmentId, text, newText);
  }

  render() {
    if (this.props.findReplace.render) {
      return (
        <div>
          Find and Replace <br />
          <div><input type="text" ref={(ref) => { this.replaceText = ref; }} /></div>
          <button onClick={this.findNext}>Next</button>
          <button onClick={this.replaceText}>Replace</button>
          <button onClick={this.replaceAll}>Replace All</button>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default FindReplace;
