import React from 'react';
import PropTypes from 'prop-types';

import apiWrapper from '../../../utils/apiWrapper';
import Tiles from './Tiles';

// import apiWrapper from '../../../utils/apiWrapper';

class UnsortableTilesContainer extends React.Component {
  state = { words: [], loading: true }

  componentDidMount() {
    apiWrapper.getTokens({ data: this.props.text }).then((res) => {
      this.setState({
        loading: false,
        words: res.data.tokens,
      });
    });
  }

  render() {
    return (
      <Tiles
        words={this.state.words}
        sortable={false}
        setDragging={this.props.setDragging}
        dragging={this.props.dragging}
        loading={this.state.loading} />
    );
  }
}

UnsortableTilesContainer.propTypes = {
  text: PropTypes.string.isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default UnsortableTilesContainer;
