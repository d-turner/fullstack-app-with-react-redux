import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import { addComment } from '../../Comments/ActionCreators/CommentActions';
import store from '../../../store';

export default class CommentModal extends React.Component {
  addComment(event, index) {
    event.preventDefault();
    const comment = event.target[0].value;
    const user = 'Daniel Turner';
    const time = Date.now();
    store.dispatch(addComment(this.props.documentId, index, comment, user, time));
    this.props.unrender(index);
  }

  render() {
    return (
      <div>
        <div>Add Comment</div>
        <form onSubmit={event => this.addComment(event, this.props.index)}>
          <input className={styles.commentInput} autoComplete="false"
            aria-label={`Comment input for segment ${this.props.index}`}
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
}

CommentModal.propTypes = {
  documentId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  unrender: PropTypes.func.isRequired,
};
