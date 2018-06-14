import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Lexicon from '../../Lexicon/';
import Comments from '../../Comments/Containers';
import FindReplace from '../../FindReplace/Containers';
import styles from '../sidebar.scss';
import Button from '../../ButtonList/Button';

class Sidebar extends React.Component {
  state = { active: true };

  renderTabs = () => {
    let hide = {};
    if (!this.state.active) hide = { visibility: 'hidden' };
    return (
      <Tabs style={hide}>
        <TabList>
          <Tab>Comments</Tab>
          <Tab>Lexicon Lookup</Tab>
          {/*<Tab>Search</Tab>*/}
        </TabList>

        <TabPanel>
          <Comments documentId={this.props.documentId} />
        </TabPanel>
        <TabPanel>
          <Lexicon documentId={this.props.documentId} />
        </TabPanel>
{/*        <TabPanel>
          <FindReplace documentId={this.props.documentId} />
</TabPanel>*/}
      </Tabs>
    );
  }

  render() {
    let icon = 'arrow_back';
    if (this.state.active) icon = 'arrow_forward';
    let view = styles.menu;
    if (this.state.active) view = `${styles.active} ${styles.menu}`;
    return (
      <div className={view} style={{ marginTop: '20px'}}>
        {/*<div>
          <Button
            classNames={styles.menuButton}
            label="menu"
            icon={icon}
            func={() => this.setState({ active: !this.state.active})}
            id="menu"
            direction="left"
            tooltip={false}
          />
        </div>*/}
        {this.renderTabs()}
      </div>
    );
  }
}

Sidebar.propTypes = {
  documentId: PropTypes.string.isRequired,
};

export default Sidebar;
