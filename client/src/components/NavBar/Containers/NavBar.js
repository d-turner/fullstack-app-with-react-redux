import React from 'react';
import NavPill from '../Presentation/NavPill';

require('../navbar.scss');

const NavBar = () => {
  return (
    <nav>
      <NavPill to={'/'} label={'Kanjingo'} >
        <img src={'/assets/kanj.png'} alt="kanjingo logo" className="img-responsive" />
      </NavPill>

      <NavPill to={'/projects'} label={'Projects'} />
      <NavPill to={'/documents'} label={'Documents'} />
    </nav>
  );
};


export default NavBar;
