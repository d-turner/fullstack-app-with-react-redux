import React from 'react';
import ReactDOM from 'react-dom';

class FindReplace extends React.Component {
  constructor(props) {
    super(props);

    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.replaceText = this.replaceAll.bind(this);
    this.replaceAll = this.replaceAll.bind(this);
  }

  findNext() {
    if (this.props.FindReplaceReducer.word !== '') {
      this.props.findNext(
        this.props.documentId,
        this.props.FindReplaceReducer.currentSegment,
        this.props.FindReplaceReducer.cursorPosition,
        this.props.FindReplaceReducer.word
      );
      setTimeout(() => {
        const location = document.getElementById('findreplace');
        location.scrollIntoView();
        this.props.updateCurrentLocation(location.attributes['data-location'].value);
      }, 150);
    }
  }

  findPrev() {
    console.log('Find prev');
    const text = 'text';
    const newText = 'newText';
    this.props.findNext(this.props.documentId, this.props.segmentId, this.props.segmentOffset, text);
  }

  replaceText() {
    console.log('replace text');
    const text = 'text';
    const newText = 'newText';
    this.props.findNext(this.props.documentId, this.props.segmentId, this.props.segmentOffset, text, newText);
  }

  replaceAll() {
    console.log('Replace all');
    const text = 'text';
    const newText = 'newText';
    this.props.findNext(this.props.documentId, this.props.segmentId, text, newText);
  }

  render() {
    if (this.props.FindReplaceReducer.render) {
      return (
        <div>
          Find and Replace <br />
          <button onClick={this.findNext}>Next</button>
          <button onClick={this.findPrev}>Previous</button>
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
