import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import alert from './alert.scss';

class Alerts extends React.Component {
  state = { states: [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length > this.state.states.length) {
      this.setState({ states: this.state.states.concat(true) });
    }
  }

  onClick = (index) => {
    this.setState({
      states: this.state.states.map((state, i) => {
        if (index === i) return false;
        return state;
      }),
    });
  }

  render() {
    const { messages, types } = this.props;
    return (
      <div className={alert.wrapper}>
        {messages.map((message, index) => {
          // automatically hide notification after 3.5 seconds
          setTimeout(() => {
            this.setState({
              states: this.state.states.map((state, i) => {
                if (index === i) return false;
                return state;
              }),
            });
          }, 8500);
          return (
            <Alert
              key={`${message}${index}`}
              message={message}
              type={types[index]}
              state={this.state.states[index]}
              onClick={this.onClick}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}

Alerts.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Alerts;
