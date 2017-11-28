import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './sync.scss';
import * as actionCreators from './SyncActions';

class Save extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.save, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  save() {
    // build xml dom and make server request
    console.log('Building DOM and saving...');
    console.log(this.props.documentId);
    this.props.save(this.props.document, this.props.documentId, this.props.userId, this.props.email);
    this.setState({ saving: true });
  }

  render() {
    return (
      <div className={styles.save}>
        <span>{this.props.data}</span>
      </div>
    );
  }
}

Save.propTypes = {
  data: PropTypes.string,
  save: PropTypes.func.isRequired,
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  documentId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { syncReducer } = state;
  // return what we want available in the props
  const { data, response } = syncReducer;
  return {
    data, response,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Save);
