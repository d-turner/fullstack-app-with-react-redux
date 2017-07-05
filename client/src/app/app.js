// npm packages
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// common imports (also available in react-router-native)
// react-router does not have BrowserRouter/HashRouter/MemoryRouter
// need to look at react-router-native for mobile routing
import { Route, Switch, Redirect } from 'react-router';

// our packages

// our components
import NavBar from '../components/NavBar/Containers/NavBar';
import Home from '../components/Home/Home';
import NotFound from '../components/Error/NotFound';
import Register from '../components/Register/Register';
import ProjectContainer from '../components/Project/Containers';
import Segments from '../components/SegmentList/Containers';
import Segment from '../components/Segment/Containers/Segment';
import DocumentContainer from '../components/Document/Containers';

// testing scss
import styles from '../constants/main.scss';

// import default styles (body, p, div, etc)
require('../constants/main.scss');

const Other = function() {
  return (
    <div>
      <h2>Others Here</h2>
    </div>
  );
};

const Single = function() {
  return (
    <div>
      <h1>Single page</h1>
    </div>
  );
};

// render on page
export default (
  <Router>
    <div>
      <NavBar to={'/'} label={'Kanjingo'} />
      <main id="home">
        <section className={`flex ${styles.content}`}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route path="/other" component={Other} />
            <Redirect from="/old-other" to="/other" />
            <Route exact path="/view/:postId" component={Single} />
            <Route path="/projects" component={ProjectContainer} />
            <Route exact path="/documents" component={DocumentContainer} />
            <Route exact path="/documents/:documentId" component={Segments} />
            <Route exact path="/documents/:documentId/segments" component={Segments} />
            <Route exact path="/documents/:documentId/segments/:segmentId" component={Segment} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
    </div>
  </Router>
);
