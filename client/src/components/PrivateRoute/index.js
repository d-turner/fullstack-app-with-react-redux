import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isLoggedIn, loading, ...rest } = this.props;
    console.log(this.props);
    if (loading) return null;
    return (
      <Route {...rest} render={(props) => {
        return (
          isLoggedIn || loading ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location },
            }} />
          )
        );
      }} />
    );
  }
}
// const PrivateRoute = ({ component: Component, isLoggedIn, loading, ...rest }) => (
//   <Route {...rest} render={(props) => {
//     return (
//       isLoggedIn || loading ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location },
//         }} />
//       )
//     );
//   }} />
// );


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { authenticationReducer } = state;
  const { email, isLoggedIn, name, userId, loading } = authenticationReducer;
  // return what we want available in the props
  return {
    email, isLoggedIn, name, userId, loading,
  };
};


export default connect(mapStateToProps)(PrivateRoute);
