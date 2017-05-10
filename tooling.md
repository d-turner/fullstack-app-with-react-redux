# Tooling
1. React    => Frontend Framework
2. Redux    => React data control system
3. Webpack  => Component bundler and task runner
4. Babel    => View rules include stage-0
            => Will be using es6 syntax
5. Eslint   => Code style guide and syntax highlighter
6. Karma + Jasmine + PhantomJS 
            => Testing Framework

### Notes
Seperate data-fetching and rendering i.e. Presentational and Container 
Component should be reusable 

#### Containers
Containers fetch and store the data that is required by a Component

#### Components
Components display data
Components should state what they expect using PropTypes, this is good for Markup 
Components should break silently if the data received is not what is expected 

Example
```
class CommentListContainer extends React.Component {
  state = { comments: [] };
  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```


### Application Structure

Adding a new component:
1. add the top level directory to the components directory
2. add the actions file for the component
3. add the reducer for the component
4. add the reducer to the reducerCombiner
5. add the connect middleware
