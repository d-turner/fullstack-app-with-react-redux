import React from 'react';
import PropTypes from 'prop-types';

import store from '../../store';
import styles from './sync.scss';
import main from '../../constants/main.scss';
import { save } from './actions';

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
    store.dispatch(save(this.props.document, this.props.documentId, this.props.userId, this.props.email));
    this.setState({ saving: true });
  }

  render() {
    return (
      <button className={styles.saveButton} onClick={() => this.save()}>
        <span><i className={`material-icons ${main.fixTop} ${styles.icon}`}>save</i> {this.props.savingResult.data}</span>
      </button>
    );
  }
}

Save.propTypes = {
  document: PropTypes.objectOf(PropTypes.any).isRequired,
  documentId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Save;
