import React from 'react';
import PropTypes from 'prop-types';

// import styles from '../comment.scss';
import main from '../../../constants/main.scss';

function Comment({ comment }) {
  return (
    <div className={main.format}>
      <div className={main.groupItem}>
        <h4 className={main.clearPaddingBottom}>{comment.author}</h4>
        <h5 className={main.clearPadding}>{comment.time}</h5>
      </div>
      <div className={main.groupItem}>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  index: PropTypes.number.isRequired,
};

function Avatar({ user }) {
  return (
    <img className="Avatar"
      src={user.avatarUrl}
      alt={user.name}
    />
  );
}

Avatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default Comment;
