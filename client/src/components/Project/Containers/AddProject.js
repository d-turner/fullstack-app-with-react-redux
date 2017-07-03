import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import styles from '../projects.scss';

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
    console.warn("Need to connect this to the backend and add a on success callback");
    this.props.cancelAdd();
  }

  render() {
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={this.handleSubmit} className={`fifth ${styles.form}`}>
        <h3>Enter the project details</h3>
        <fieldset>
          <label htmlFor="title">
            <input
              ref={(t) => { this.title = t; }}
              id="title"
              name="title"
              type="text"
              onChange={this.handleChange}
              aria-label="Project title field"
              placeholder="Project Title"
            />
          </label>
          <label htmlFor="desc">
            <textarea
              className={`${styles.parentWidth} ${styles.fixedWidth}`}
              ref={(d) => { this.description = d; }}
              id="desc"
              name="description"
              type="text"
              onChange={this.handleChange}
              aria-label="Project description field"
              placeholder="Project Description"
            />
          </label>
          <label htmlFor="auth">
            <input
              ref={(a) => { this.author = a; }}
              id="auth"
              name="author"
              type="text"
              onChange={this.handleChange}
              aria-label="Project author field"
              placeholder="Project Author"
            />
          </label>
          <div className="flex">
            <button aria-label="Submit new project">Submit</button>
            <button onClick={() => this.props.cancelAdd()}>Cancel</button>
          </div>
        </fieldset>
      </form>
    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  cancelAdd: PropTypes.func.isRequired,
};

export default AddProject;
