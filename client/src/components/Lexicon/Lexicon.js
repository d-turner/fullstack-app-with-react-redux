import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';

function findFirstSense(lang, array) {
  for (let x = 0; x < array.length; x++) {
    if (array[x].language === lang) return array[x].lemma;
  }
  return '';
}

class Lexicon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      const word = findFirstSense(nextProps.data.filterLangs[0], nextProps.data.senses);
      const translation = findFirstSense(nextProps.data.filterLangs[1], nextProps.data.senses);
      this.setState({ word, translation });
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <h3>Lexicon</h3>
          <div><Loader /></div>
        </div>
      );
    } else if (this.props.data) {
      return (
        <div>
          <h3>Lexicon</h3>
          <div>
            <div style={{ display: 'inline-block' }}>
              <div>{this.props.data.filterLangs[0]}</div>
              <div>{this.state.word}</div>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '60px' }}>
              <div>{this.props.data.filterLangs[1]}</div>
              <div>{this.state.translation}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>Lexicon</h3>
      </div>
    );
  }
}

Lexicon.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

export default Lexicon;
