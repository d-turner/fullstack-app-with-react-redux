import React from 'react';

import NavPill from '../Presentation/NavPill';
import styles from '../../../constants/main.css';

const NavBar = () => {
  return (
    <div className={styles.heading}>
      <NavPill to={'/'} label={'Kanjingo'} className={`${styles.headingItem} ${styles.kanjingo}`} />
      <NavPill to={'/other'} label={'Other'} className={styles.headingItem} />
      <NavPill to={'/old-other'} label={'Other Redirect'} className={styles.headingItem} />
      <NavPill to={'/view/123'} label={'View 123'} className={styles.headingItem} />
      <NavPill to={'/segments'} label={'Segments'} className={styles.headingItem} />
      <NavPill to={'/projects'} label={'Projects'} className={styles.headingItem} />
      <NavPill to={'/documents'} label={'Documents'} className={styles.headingItem} />
    </div>
  );
};


export default NavBar;
