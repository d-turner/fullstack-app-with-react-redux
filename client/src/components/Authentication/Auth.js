import React from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';
import styles from './auth.scss';
import * as authActions from './AuthActions';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ show: false });
  }

  render() {
    if (this.state.show) {
      return (
        <div className="flex one three-700 center">
          <div className={`flex one third-700 fourth-1200 center ${styles.card}`}>
            <Login login={authActions.login} />
            <a
              role="button"
              id="no-account"
              href="#" className={styles.link}
              onClick={() => this.setState({ show: !this.state.show })}>
                No account? Register here.
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="flex one three-700 center">
        <div className={`flex one third-700 fourth-1200 center ${styles.card}`}>
          <Register />
          <a
            role="button"
            id="has-account"
            href="#" className={styles.link}
            onClick={() => this.setState({ show: !this.state.show })}>
              Already have an account? Log in here.
          </a>
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