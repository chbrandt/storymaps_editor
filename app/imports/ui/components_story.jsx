/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/
import React from 'react';

import { Chapter } from './Chapter.jsx';
import { Select } from './components_base.jsx';



/*
  TITLE
*/
export class StoryTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  updateTitle(value) {
    this.props.onChange(value);
  }

  handleLoseFocus = (e) => {
    this.updateTitle(e.target.value);
  }

  handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      this.updateTitle(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <label>
        Story title:
        <input type="text" placeholder="Story title"
               key="story_title" name="story_title"
               defaultValue={this.props.title}
               onKeyDown={this.handlePressEnter}
               onBlur={this.handleLoseFocus}/>
        </label>
      </div>
    );
  }
}

/*
  INTRO
*/
export const StoryIntro = (props) => {
  return null;
}

/*
  PLANET
*/
export const StoryPlanet = (props) => {
  return (
    <Select name="planets" placeholder="Select a planet/body"
            bodies={props.bodies}
            onChange={props.onChange}
    />
  );
}

/*
  CHAPTERS
*/
export class StoryChapters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: []
    }
  }

  handleCreate = (e) => {
    e.preventDefault();
    //TODO: parent components should get the 'value' only, not 'event'
    this.setState({chapters: [...this.state.chapters, {}]})
  }

  handleChange = (index, value) => {
    console.log(index, value);
    let chapters = this.state.chapters;
    chapters[index] = value;
    this.setState({chapters});
    this.props.onChange(chapters);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleCreate}>Create Chapter</button>
        {this.state.chapters.map((data,i) => {
            return <Chapter key={i.toString()}
                              index={i.toString()}
                              value={data}
                              onChange={this.handleChange}/>
        })}
      </div>
    );
  }
}
