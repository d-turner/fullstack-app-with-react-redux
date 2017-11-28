import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import SegmentList from './SegmentList';
import Sidebar from '../../Sidebar/Containers/Sidebar';
import styles from '../segmentList.scss';
import Loader from '../../Loader/Loader';
import store from '../../../store';
import { requestDocument, resetEditorState } from '../../Document/ActionCreators/DocumentActions';
import Sync from '../../Sync/Save';

class SegmentContainer extends React.Component {
  constructor(props) {
    super(props);
    const id = props.match.params.documentId;

    this.state = {
      id,
    };
  }

  componentWillMount() {
    const id = this.props.match.params.documentId;
    store.dispatch(requestDocument(id));
  }

  componentWillUnmount() {
    store.dispatch(resetEditorState());
  }

  render() {
    const { documents, editorState } = this.props;
    // if the document failed to fetch direct to NotFound
    if (documents[this.state.id] && documents[this.state.id].error) {
      return (
        <Redirect to="/404" />
      );
    }
    // if the document exists and is not loading display
    if (documents[this.state.id] && (!documents[this.state.id].isFetching && !documents[this.state.id].didInvalidate)) {
      return (
        <div className="flex four">
          <div className="full">
            <Sync
              documentId={this.state.id}
              userId={this.props.userId}
              email={this.props.email}
              document={documents[this.state.id]}
            />
          </div>
          <SegmentList
            segments={documents[this.state.id].xliff.segments}
            documentId={this.state.id}
            editorState={editorState}
            {...this.props} />
          {/* <Sidebar documentId={this.state.id} /> */}
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
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default SegmentContainer;
