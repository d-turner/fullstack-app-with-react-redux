import React from 'react';
import PropTypes from 'prop-types';

import SegmentList from './SegmentList';
import Sidebar from '../../Sidebar/Containers/Sidebar';
import styles from '../segmentList.scss';
import Loader from '../../Loader/Loader';
import store from '../../../store';
import { requestDocument } from '../../Document/ActionCreators/DocumentActions';

class SegmentContainer extends React.Component {
  constructor(props) {
    super(props);
    const id = parseInt(props.match.params.documentId, 10);
    store.dispatch(requestDocument(id));
    // const i = props.documents.findIndex(doc => doc.id === id);
    this.renderComment = this.renderComment.bind(this);
    this.renderLexicon = this.renderLexicon.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
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
      <div className="flex four five-900">
        {(this.props.documents[this.state.id] && !this.props.documents[this.state.id].isFetching) ? (
          <SegmentList
            segments={this.props.documents[this.state.id].xliff.segments}
            documentId={this.state.id}
            editorState={this.props.editorState}
            renderComment={this.renderComment}
            renderLexicon={this.renderLexicon}
            renderSearch={this.renderSearch}
            {...this.props} />
        ) : (<div className={styles.setPadding}><Loader /></div>)}
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
