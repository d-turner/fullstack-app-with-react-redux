import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Minimap extends React.Component {
  componentDidUpdate(prevProps) {
    const scroll = document.getElementById('minimap-scroll');
    const { selectedSegment } = this.props;
    if (selectedSegment === 0 || selectedSegment === -1) {
      scroll.scrollBy(0, 0);
    }
    else if (selectedSegment !== prevProps.selectedSegment) {
      const node = document.getElementById(`${selectedSegment}-minimap`);
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const rect = node.getClientRects()[0];
      scroll.scrollBy(0, rect.top - 96);
    }
  }
  renderSegment = (segment, index) => {
    let style = styles.segment;
    if (index === this.props.selectedSegment) style = styles.selected;
    return (
      <button
        className={style}
        key={index}
        value={index}
        id={`${index}-minimap`}
        onClick={() => this.props.updateSelectedSegment(this.props.savedName, index)}>
        <p>{segment.source}</p>
        <p>{segment.target}</p>
      </button>
    );
  }

  render() {
    return (
      <div className={`fifth ${styles.container}`}>
        <div className={styles.fixed} id="minimap-scroll">
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
