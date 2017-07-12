import React from 'react';
import PropTypes from 'prop-types';

import Lexicon from '../../Lexicon/Containers';
import Comments from '../../Comments/Containers';
import FindReplace from '../../FindReplace/Containers';
import styles from '../sidebar.scss';
import ButtonList from '../../ButtonList';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '0',
      height: '0',
      renderComment: false,
      renderLexicon: false,
      renderSearch: false,
    };
    this.renderComment = this.renderComment.bind(this);
    this.renderLexicon = this.renderLexicon.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
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

  renderSwitch() {
    if (this.state.renderComment) {
      return <Comments documentId={this.props.documentId} />;
    } else if (this.state.renderLexicon) {
      return <Lexicon documentId={this.props.documentId} />;
    } else if (this.state.renderSearch) {
      return <FindReplace documentId={this.props.documentId} />;
    }
    return (
      <div />
    );
  }
  render() {
    return (
      <div className={`third fourth-900 fifth-1200 ${styles.parent} ${styles.content}`} >
        <ButtonList
          renderComment={this.renderComment}
          renderLexicon={this.renderLexicon}
          renderSearch={this.renderSearch}
        />
        <div
          className={`${styles.fixedPosition} ${styles.paddingInlineWithNavRight}`}
          style={{ height: this.state.height - 48 }}>
          {this.renderSwitch()}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
};

export default Sidebar;
