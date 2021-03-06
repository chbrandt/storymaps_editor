import React from 'react';

import { Story } from './Story.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null,
      label: null
    }
  }

  createStory = (label) => {
    //TODO: make 'label' a 'state' parameter.
    //TODO: bring 'download-story' action to here.
    //TODO: don't pass 'label' to Story (the Story holds the content only).
    console.log(`Creating story '${label}'`);
    this.setState({
      story: <Story label={label}/>,
      label: label
    });
  }

  deleteStory = () => {
    console.log(`Delete story.`);
    this.setState({story: null});
  }

  render() {
    const story = this.state.story;
    return (
      <div id="app">
        <h1>Storymaps editor</h1>
        {
          !story
          ? <CreateStoryForm onSubmit={this.createStory}>
              Create Story
            </CreateStoryForm>
          : <div>
              <h2>"{this.state.label}"</h2>
              <button onClick={this.deleteStory}>Delete Story</button>
              {story}
            </div>
        }
      </div>
    )
  }
}

class CreateStoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value.toLowerCase().replace(" ","-")
    this.setState({value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value.trim();
    // console.log(`A name was submitted: '${value}'`);
    const pattern = new RegExp('^[a-z][a-z\-]*[a-z]$');
    if (pattern.test(value) && value.split(" ").length == 1) {
      this.props.onSubmit(value);
    } else {
      alert("Give me a (valid) label: two characters or more,"+
            " start/end with a character ([a-z]), and no whitespaces.")
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Label:
          <input type="text" value={this.state.value} required
            placeholder="A single-word name"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
