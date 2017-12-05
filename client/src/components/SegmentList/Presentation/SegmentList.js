import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segmentList.scss';

import SelectedSegment from '../../Segment/Containers/SelectedSegment';
import PlainSegment from '../../Segment/Presentation/PlainSegment';

import Info from '../../Notifications/Info';

// general responsive view
const responsive = 'flex one five-700';
// width of a segment
const responsiveWidth = 'full three-fifth-700 off-fifth-700 half-1200 two-fifth-1500 grow';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help: true,
    };
    this.renderSegment = this.renderSegment.bind(this);
  }

  componentDidMount() {
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  componentWillUnmount() {
    this.props.updateSelectedSegment(this.props.documentId, -1);
  }

  selected(index) {
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  renderSegment(segment, index) {
    const { selectedSegment } = this.props;
    let selectedStyle = styles.normalPadding;
    if (index === selectedSegment) selectedStyle = styles.selectedPadding;
    return (
      <div className={`full ${selectedStyle}`} key={index} value={index}>
        { index === this.props.selectedSegment ?
          this.renderSelected(segment, index) :
          this.renderButton(segment, index)
        }
      </div>
    );
  }

  renderSelected(segment, index) {
    const xliff = this.props.documents[this.props.documentId].xliff;
    if (this.props.editorState === '') {
      return null;
    }
    return (
      <div className={`${responsive} ${styles.selected}`} id="selectedSegment">
        <div className={responsiveWidth}>
          <SelectedSegment
            documentId={this.props.documentId}
            segment={segment}
            segmentId={index}
            editorState={this.props.editorState}
            xliff={xliff} />
        </div>
      </div>
    );
  }

  renderButton(segment, index) {
    return (
      <button
        onClick={() => this.selected(index)}
        className={`${responsiveWidth} ${styles.block}`}
        aria-label={`Activate segment ${index}`}
        role={'textbox'}>
        <PlainSegment
          segment={segment}
          segmentId={index} />
      </button>
    );
  }

  render() {
    let message =
    "To activate voice input click the microphone icon and begin dictating\n\
    You can edit the input once you are finished\n\
    Select the position in the editor to insert the text and click the tick\n\
    Click the X to clear the input";
    if (this.state.renderTiles) {
      message =
      "Double tap a tile to edit and press 'Enter' to accept or 'Esc' to cancel.\n\
      Tiles can be dragged from the source to the target or can be rearranged in the target.\n\
      Multiple tiles can be dragged by first selecting and highlighting the desired tiles.";
    }
    return (
      <div className={`full grow ${styles.listMargin}`}>
        {this.state.help ?
          <div className={responsiveWidth}>
            <Info
              message={message}
              onClick={() => this.setState({ help: false })} />
          </div> :
          (null)
        }
        {this.props.segments.map(this.renderSegment)}
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentId: PropTypes.string.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]).isRequired,
  selectedSegment: PropTypes.number.isRequired,
  mergeSegment: PropTypes.func.isRequired,
  splitSegment: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SegmentList;
