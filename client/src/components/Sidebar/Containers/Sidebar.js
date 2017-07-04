import React from 'react';
import PropTypes from 'prop-types';

import Lexicon from '../../Lexicon/Containers';
import Comments from '../../Comments/Containers';
import FindReplace from '../../FindReplace/Containers';
import styles from '../sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  renderSwitch() {
    if (this.props.renderComment) {
      return <Comments documentId={this.props.documentId} />;
    } else if (this.props.renderLexicon) {
      return <Lexicon documentId={this.props.documentId} />;
    } else if (this.props.renderSearch) {
      return <FindReplace documentId={this.props.documentId} />;
    }
    return (
      <div />
    );
  }
  render() {
    return (
      <div className={styles.parent}>
        <div className={styles.fixedPosition} style={{ height: this.state.height - 66 }}>
          {this.renderSwitch()}
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  renderComment: false,
  renderLexicon: false,
  renderSearch: true,
};

Sidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
  renderComment: PropTypes.bool,
  renderLexicon: PropTypes.bool,
  renderSearch: PropTypes.bool,
};

export default Sidebar;
