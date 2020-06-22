import React from 'react';

import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Story } from './Story.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    }
  }

  createStory = (label) => {
    console.log(`Creating story '${label}'`);
    this.setState({story: <Story label={label}/>});
  }

  deleteStory = () => {
    this.setState({story: null});
  }

  render() {
    const story = this.state.story;
    return (
      <div>
        <h1>Storymaps editor</h1>
        {
          !story
          ? <CreateStoryForm onSubmit={this.createStory}>Create Story</CreateStoryForm>
          : <div>
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
    console.log(`A name was submitted: '${value}'`);

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
