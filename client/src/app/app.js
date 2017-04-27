// npm packages
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// common imports (also avaialble in react-router-native)
// react-router does not have BrowserRouter/HashRouter/MemoryRouter
// need to look at react-router-native for mobile routing
import { Route, Switch, Redirect } from 'react-router';


// our components
import { default as Home, Main, Other, Single } from '../components/Home';
import NotFound from '../components/NotFound';

// render on page
const app = () => (
  <Router>
    <div>
      <Route path="/" component={Main} />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/other">Other</Link></li>
        <li><Link to="/old-other">Other that will redirect</Link></li>
        <li><Link to="/view/123">Post 123</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/view/:postId" component={Single} />
        <Redirect from="/old-other" to="/other" />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default app;
