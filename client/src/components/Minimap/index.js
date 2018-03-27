import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Minimap extends React.Component {
  renderSegment = (segment, index) => {
    let style = styles.segment;
    if (index === this.props.selectedSegment) style = styles.selected;
    return (
      <button className={style} key={index} value={index} onClick={() => this.props.updateSelectedSegment(this.props.savedName, index)}>
        <p>{segment.source}</p>
        <p>{segment.target}</p>
      </button>
    );
  }

  render() {
    return (
      <div className={`fifth ${styles.container}`}>
        <div className={styles.fixed}>
          {this.props.segments.map(this.renderSegment)}
        </div>
      </div>
    );
  }
}

Minimap.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSegment: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  savedName: PropTypes.string.isRequired,
};
