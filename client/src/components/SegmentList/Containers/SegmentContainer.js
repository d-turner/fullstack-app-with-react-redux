import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';
import Sidebar from '../../Sidebar/Containers/Sidebar';
import styles from '../styles.css';

class SegmentContainer extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(props.match.params.documentId, 10);
    // const i = props.documents.findIndex(doc => doc.id === id);
    this.renderComment = this.renderComment.bind(this);
    this.renderLexicon = this.renderLexicon.bind(this);
    this.renderComment = this.renderSearch.bind(this);
    this.state = {
      id,
      renderComment: false,
      renderLexicon: false,
      renderSearch: false,
    };
  }

  renderComment() {
    this.setState({
      renderComment: true,
      renderLexicon: false,
      renderSearch: false,
    });
  }

  renderLexicon() {
    this.setState({
      renderComment: false,
      renderLexicon: true,
      renderSearch: false,
    });
  }

  renderSearch() {
    this.setState({
      renderComment: false,
      renderLexicon: false,
      renderSearch: true,
    });
  }
  render() {
    return (
      <div className={styles.mainContent}>
        <SegmentList
          segments={this.props.documents[this.state.id].xliff.segments}
          documentId={this.state.id}
          editorState={this.props.editorState}
          renderComment={this.renderComment}
          renderLexicon={this.renderLexicon}
          renderSearch={this.renderSearch}
          {...this.props} />
        <Sidebar
          documentId={this.state.id}
          renderComment={this.state.renderComment}
          renderLexicon={this.state.renderLexicon}
          renderSearch={this.state.renderSearch}
        />
      </div>
    );
  }
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentContainer;
