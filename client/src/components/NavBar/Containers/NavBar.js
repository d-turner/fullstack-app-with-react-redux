import React from 'react';
import NavPill from '../Presentation/NavPill';

require('../navbar.scss');

const NavBar = () => {
  return (
    <nav>
      <NavPill to={'/'} label={'Kanjingo'} >
        <img src={'/assets/kanj.png'} alt="kanjingo logo" className="img-responsive" />
      </NavPill>
      <NavPill to={'/other'} label={'Other'} />
      <NavPill to={'/old-other'} label={'Other Redirect'} />
      <NavPill to={'/view/123'} label={'View 123'} />
      <NavPill to={'/segments'} label={'Segments'} />
      <NavPill to={'/projects'} label={'Projects'} />
      <NavPill to={'/documents'} label={'Documents'} />
    </nav>
  );
};


export default NavBar;
