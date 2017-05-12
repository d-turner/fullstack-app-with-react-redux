import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../actions/segmentActions';


class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target.value;
    this.props.updateSegment(parseInt(this.props.match.params.segmentId, 10), target);
  }

  render() {
    const id = this.props.match.params.segmentId;
    const i = this.props.segments.findIndex(segment => segment.id === parseInt(id, 10));
    const segment = this.props.segments[i];

    const wrapper = {
      backgroundColor: 'lightblue',
      marginRight: '0px',
      width: '520px',
      padding: '5px',
      marginTop: '5px',
    };
    const format = {
      fontSize: '18px',
    };

    return (
      <div className="data-list" style={format}>
        <div>Segment: {parseInt(segment.id, 10) + 1}</div>
        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{segment.source}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper}>{segment.mt}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper}>
            <textarea
              style={{ maxWidth: '490px', width: '490px', marginLeft: '8px', fontSize: '18px' }}
              value={segment.target} onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint react/forbid-prop-types: 0 */
Segment.propTypes = {
  match: PropTypes.object.isRequired,
  updateSegment: PropTypes.func.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { segmentReducer } = state;
  const { segments } = segmentReducer;
  // return what we want available in the props
  return {
    segments,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
