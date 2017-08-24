import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

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

    this.renderComment = this.renderComment.bind(this);
    this.state = {
      id,
      renderComment: false,
    };
  }

  renderComment() {
    this.setState({
      renderComment: true,
    });
  }

  render() {
    const { documents, editorState } = this.props;
    if (documents[this.state.id] && documents[this.state.id].error) {
      return (
        <Redirect to="/404" />
      );
    }
    if (documents[this.state.id] && !documents[this.state.id].isFetching) {
      return (
        <div className="flex four five-900 grow">
          <SegmentList
            segments={documents[this.state.id].xliff.segments}
            documentId={this.state.id}
            editorState={editorState}
            renderComment={this.renderComment}
            {...this.props} />
          <Sidebar documentId={this.state.id} />
        </div>
      );
    }
    return <div className={styles.loader}><Loader /></div>;
  }
}

SegmentContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
  editorState: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
};

export default SegmentContainer;
