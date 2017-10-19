import React from 'react';
import PropTypes from 'prop-types';

import styles from '../comment.scss';
import { addComment } from '../../Comments/ActionCreators/CommentActions';
import store from '../../../store';

export default class CommentModal extends React.Component {
  addComment(event, index) {
    event.preventDefault();
    const comment = event.target[0].value;
    // TODO: ADD USER NAME HERE
    console.warn('Need to insert actual username here');
    const user = this.props.name;
    const time = Date.now();
    store.dispatch(addComment(this.props.documentId, index, comment, user, time));
    this.props.unrender(index);
  }

  render() {
    if (this.props.render) {
      return (
        <div className={`fifth ${styles.modal}`}>
          <div>Add Comment</div>
          <form onSubmit={event => this.addComment(event, this.props.index)}>
            <input className={styles.commentInput} autoComplete="false"
              aria-label={`Comment input for segment ${this.props.index}`}
              required
            />
            <div className={styles.commentButtons} >
              <button className={styles.commentButton} type="submit">Add</button>
              <button className={styles.commentButton}
                onClick={() => this.props.unrender(this.props.index)}>Cancel
              </button>
            </div>
          </form>
        </div>
      );
    }
    return null;
  }
}

CommentModal.defaultProps = {
  xcoord: 0,
  ycoord: 0,
  render: false,
};

CommentModal.propTypes = {
  documentId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  unrender: PropTypes.func.isRequired,
  render: PropTypes.bool,
  name: PropTypes.string.isRequired,
};
