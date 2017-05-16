import React from 'react';
import PropTypes from 'prop-types';

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let active = this.props.className;
    if (this.props.active) {
      active += ` ${this.props.activeClass}`;
    }
    return (
      <span className={active} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.defaultProps = {
  className: 'styeButton',
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  activeClass: PropTypes.string.isRequired,
};

export default StyleButton;
