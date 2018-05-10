import React from 'react';
import PropTypes from 'prop-types';

class StyleButton extends React.Component {
  onToggle = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let active = this.props.className;
    if (this.props.active) {
      active += ` ${this.props.activeClass}`;
    }
    return (
      <span className={active}
        onClick={this.onToggle}
        role="button"
        aria-pressed={this.props.active}
        tabIndex={0}>
        <span dangerouslySetInnerHTML={{ __html: this.props.label }} />
      </span>
    );
  }
}

StyleButton.defaultProps = {
  className: 'styleButton',
  active: false,
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  activeClass: PropTypes.string.isRequired,
};

export default StyleButton;
