import React from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';
import styles from './auth.scss';
import main from '../../constants/main.scss';

import * as authActions from './AuthActions';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <div className="flex one two-600 three-1100 center">
          <div className={`flex one third-1100 fourth-1400 center ${styles.card}`}
            style={{ marginTop: '40px', padding: '16px 40px 30px 30px', borderRadius: '4px' }}>
            <Login login={authActions.login} />
            <span>
              <button
                id="has-account"
                className={`${main.removeButtonStyle} ${styles.link}`}
                onClick={() => this.setState({ show: !this.state.show })}>
                  Don&#39;t have an account? Create one here.
              </button>
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex one two-600 three-1100 center">
        <div className={`flex one third-1100 fourth-1400 center ${styles.card}`}
          style={{ marginTop: '40px', padding: '16px 40px 30px 30px', borderRadius: '4px' }}>
          <Register />
          <span>
            <button
              id="has-account"
              className={`${main.removeButtonStyle} ${styles.link}`}
              onClick={() => this.setState({ show: !this.state.show })}>
                Already have an account? Log in here.
            </button>
          </span>
        </div>
      </div>
    );
  }
}

// return (
//   <div className={`flex two grow ${styles.center}`}>
//     <div className="flex one five-700 grow">
//       <div
//         onClick={() => { this.setState({ display2: styles.back, display1: styles.front }); }}
//         className={`flex one two-fifth-700 fourth-1000 grow ${styles.card} ${this.state.display1}`}>
//         <Login />
//       </div>
//     </div>
//     <div className="flex one five-700 grow">
//       <div
//         onClick={() => { this.setState({ display2: styles.back + ' ' + styles.show, display1: styles.front + ' ' + styles.hide }); }}
//         className={`flex one two-fifth-700 fourth-1000 grow ${styles.card} ${this.state.display2}`}>
//         <Register />
//       </div>
//     </div>
//   </div>
// );