import React from 'react';

export default class Home extends React.Component {
  constructor() {
    super();

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
