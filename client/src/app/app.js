// npm packages
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// common imports (also available in react-router-native)
// react-router does not have BrowserRouter/HashRouter/MemoryRouter
// need to look at react-router-native for mobile routing
import { Route, Switch, Redirect } from 'react-router';

// our packages

// our components
import Home from '../components/Home/Home';
import NotFound from '../components/Error/NotFound';
import ProjectContainer from '../components/Project/Containers/ProjectContainer';
import Segments from '../components/Segment/Containers';
import Segment from '../components/Segment/Containers/Segment';
import DocumentContainer from '../components/Document/Containers';

const Other = function() {
  return (
    <div>
      <h2>Others Here</h2>
    </div>
  );
};

const Main = function() {
  return (
    <div>
      <h1>Kanjingo</h1>
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
      <Route path="/" component={Main} />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/other">Other</Link></li>
        <li><Link to="/old-other">Other that will redirect</Link></li>
        <li><Link to="/view/123">Post 123</Link></li>
        <li><Link to="/segments">Segment List</Link></li>
        <li><Link to="/projects">Project List</Link></li>
        <li><Link to="/documents">Document List</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
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
    </div>
  </Router>
);
