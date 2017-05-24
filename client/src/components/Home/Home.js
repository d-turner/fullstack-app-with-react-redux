import React from 'react';

import babel from '../../utils/babelnet';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    babel();
    this.state = { world: 'world' };
  }

  render() {
    return (
      <div className="home">
        <h1>Hello {this.state.world}!</h1>
      </div>
    );
  }
}
