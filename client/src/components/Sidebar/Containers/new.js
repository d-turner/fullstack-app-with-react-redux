import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Lexicon from '../../Lexicon/';
import Comments from '../../Comments/Containers';
import FindReplace from '../../FindReplace/Containers';
import styles from '../sidebar.scss';
import Button from '../../ButtonList/Button';

class Sidebar extends React.Component {
  state = { active: false };

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
  renderTabs = () => {
    return (
      <Tabs>
        <TabList>
          <Tab>Comments</Tab>
          <Tab>Lexicon Lookup</Tab>
          <Tab>Search</Tab>
        </TabList>

        <TabPanel>
          <Comments documentId={this.props.documentId} />
        </TabPanel>
        <TabPanel>
          <Lexicon documentId={this.props.documentId} />
        </TabPanel>
        <TabPanel>
          <FindReplace documentId={this.props.documentId} />
        </TabPanel>
      </Tabs>
    );
  }

  renderSwitch() {
    const { documentId } = this.props;
    if (this.state.renderComment) {
      return <Comments documentId={documentId} />;
    } else if (this.state.renderLexicon) {
      return <Lexicon documentId={documentId} />;
    } else if (this.state.renderSearch) {
      return <FindReplace documentId={documentId} />;
    }
    return null;
  }
  render() {
    let view = styles.menu;
    if (this.state.active) view = `${styles.active} ${styles.menu}`;
    return (
      <div className={view}>
        <div>
          <Button
            classNames={styles.menuButton}
            label="menu"
            icon="menu"
            func={() => this.setState({ active: !this.state.active})}
            id="menu"
            direction="left"
            tooltip={false}
          />
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}

Sidebar.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default Sidebar;
