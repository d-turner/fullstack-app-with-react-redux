import React from 'react';
import PropTypes from 'prop-types';
import alert from './alert.scss';
import { capitalizeFirstLetter } from '../../utils/stringParser';

const Alert = function({ message, type, state, onClick, index }) {
  if (!state) return null;
  if (message === null || message === undefined) return null;
  const header = capitalizeFirstLetter(type);
  return (
    <div role="status" className={`${alert.alert} ${alert[type]}`} onClick={() => onClick(index)}>
      <h4 className={alert.message}>{header}</h4>
      <div className={alert.extra}>{message}</div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

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
          const key = `${message} ${index}`;
          return (
            <Alert
              key={key}
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
