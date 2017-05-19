import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // this is fine for testing
    // production let the database generate this
    const id = uniqueId();
    const title = this.title.value;
    const description = this.description.value;
    const author = this.author.value;
    this.props.addProject(id, title, description, author);
    this.form.reset();
  }

  render() {
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={this.handleSubmit}>
        Title:
        <input
          ref={(t) => { this.title = t; }}
          name="title"
          type="text"
          onChange={this.handleChange}
          aria-label="Project title field"
        />
        Description:
        <input
          ref={(d) => { this.description = d; }}
          name="description"
          type="text"
          onChange={this.handleChange}
          aria-label="Project description field"
        />
        Author:
        <input
          ref={(a) => { this.author = a; }}
          name="author"
          type="text"
          onChange={this.handleChange}
          aria-label="Project author field"
        />

        <input type="submit" aria-label="Submit new project" />
      </form>
    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default AddProject;
