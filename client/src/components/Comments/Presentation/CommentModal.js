import React from 'react';
import PropTypes from 'prop-types';

import styles from '../comment.scss';
import { addComment } from '../../Comments/ActionCreators/CommentActions';
import store from '../../../store';

// TODO: Save to there sever
// TODO: Build button to resolve / delete a comment
// TODO: Redesign how the comments are displayed
export default class CommentModal extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  addComment = (event, index) => {
    event.preventDefault();
    const comment = event.target[0].value;
    const user = this.props.name;
    const time = Date.now();
    store.dispatch(addComment(this.props.documentId, index, comment, user, time));
    this.props.unrender(index);
  }

  render() {
    if (this.props.render) {
      // only off none if the voice input is not rendered
      return (
        <div className="full half-500 two-fifth-700  off-fifth-700 fifth-800 off-none-800 fifth-1200 off-fifth-1200 sixth-1500">
          <div className={`flex ${styles.modal}`}>
            <div>
              <div>Add Comment</div>
              <form onSubmit={event => this.addComment(event, this.props.index)}>
                <input className={styles.commentInput}
                  autoComplete="off"
                  aria-label={`Comment input for segment ${this.props.index}`}
                  required
                  ref={(ref) => { this.textInput = ref; }}
                />
                <div className={styles.commentButtons} >
                  <button className={styles.commentButton} type="submit">Add</button>
                  <button className={styles.commentButton}
                    onClick={() => this.props.unrender(this.props.index)}>Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

CommentModal.propTypes = {
  documentId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  unrender: PropTypes.func.isRequired,
  render: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
