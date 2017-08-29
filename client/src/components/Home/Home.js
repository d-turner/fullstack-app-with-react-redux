import React from 'react';
import styles from './home.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { app: 'anjingo' };
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.home}>
          <h1>
            Welcome to &nbsp;
            <div className={styles.minTitle}>
              <img src={'/assets/kanj-white.png'} alt="kanjingo logo" className={styles.img} /> {this.state.app}!
            </div>
          </h1>
          <h2>A Post Editing Computer Assisted Translation Tool</h2>
        </div>
        <div className={styles.extend}>
          <div className={`flex one three-1200 center ${styles.description} ${styles.box}`}>
            <h3 className="flex one three-1200 center">A Smart, Unified Toolkit For Every Translation Workflow</h3>
          </div>
          <div className={'flex one three-600 four-1100 center'}>
            <div className={styles.box}>
              <img src="/assets/features.png" alt="interface logo" />
              <h4>Ergonomic Interface</h4>
              <p>Accelerates the human translator. Choose the sleek web app built to cater for the modern user</p>
            </div>
            <div className={styles.box1}>
              <img src="/assets/communication.png" alt="features logo" />
              <h4>Interactive / Adaptive Machine Translation</h4>
              <p>Learns as it&apos;s used. Integrated translation memory and terminology using XLIFF and TBX standards</p>
            </div>
            <div className={styles.box}>
              <img src="/assets/discussion.png" alt="usage logo" />
              <h4>Accessible</h4>
              <p>An expressive, standard based application with declarative components and intuitive interface</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
