import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../Authentication/AuthActions';
import NavPill from '../Presentation/NavPill';

require('../navbar.scss');

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadUser();
  }

  render() {
    return (
      <nav>
        <NavPill to={'/'} label={'Kanjingo'} >
          <img src={'/assets/kanj.png'} alt="kanjingo logo" className="img-responsive" />
        </NavPill>
        <NavPill to={'/documents'} label={'Documents'} />
        { this.props.isLoggedIn ?
          <NavPill to={'/logout'} label={'Logout'} logout={this.props.logout} /> :
          <NavPill to={'/login'} label={'Login'} />
        }
      </nav>
    );
  }
}

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { authenticationReducer } = state;
  // return what we want available in the props
  const { userId, name, email, isLoggedIn } = authenticationReducer;
  return {
    userId, name, email, isLoggedIn,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
