import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  state = { uname: this.props.name }

  submit = (e) => {
    e.preventDefault();
    console.log('Submitting');
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div>Username: {this.state.uname}</div>
        <div>
          <div>Settings</div>
          <div>Minimap Position (Left/Right)</div>
          <div>
            <input type="radio" name="minimap" value="Left" />
            <input type="radio" name="minimap" value="Right" />
          </div>
          <div>Display Help Messages</div>
          <input type="checkbox" name="help" id="helpmsgs" />
          <div>Font Style</div>
          <datalist id="style">
            <option value="Font 1">Font 1</option>
            <option value="Font 2">Font 2</option>
          </datalist>
          <div>Source Font Size</div>
          <input type="number" name="sourceFont" id="sourceFont" /><span>px</span>
          <div>Target Font Size</div>
          <input type="number" name="targetFont" id="targetFont" /><span>px</span>
          <div>Minimap Font Size</div>
          <input type="number" name="minimapont" id="minimapFont" /><span>px</span>
          <input type="submit" value="Save" />
        </div>
      </form>
    );
  }
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Profile;
