import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../actions/segmentActions';


class Segment extends React.Component {
  constructor(props) {
    super(props);
    const segmentId = this.props.match.params.segmentId;
    const segmentIndex = this.props.segments.findIndex(segment => segment.id === parseInt(segmentId, 10));
    const segment = this.props.segments[segmentIndex];
    const segmentSource = segment.source;
    const segmentMt = segment.mt;
    const segmentTarget = segment.target;
    this.onChange = event => this.setState({ segmentTarget: event.target.value });
    this.state = {
      segmentId,
      segmentSource,
      segmentMt,
      segmentTarget,
    };
  }

  render() {
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
        <div>Segment: {parseInt(this.state.segmentId, 10) + 1}</div>
        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{this.state.segmentSource}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper}>{this.state.segmentMt}</div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper}>
            <textarea
              style={{ maxWidth: '490px', width: '490px', marginLeft: '8px', fontSize: '18px' }}
              value={this.state.segmentTarget} onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Segment.propTypes = {

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