/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/
import React from 'react';

import { ChapterTitle, ChapterText, ChapterMedia, ChapterView, ChapterLayers } from './components_chapters.jsx';
import { Select } from './components_base.jsx';

import { chapter as chapter_template } from '../api/templates.js';



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
  CHAPTER
*/
export class StoryChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = chapter_template;
  }

  updateView(view) {
    console.log(view);
    this.setState({view})
  }

  updateTitle(value) {
    this.setState({title: value});
    console.log(`Chapter title (new): ${value}`)
  }

  updateText(value) {
    this.setState({text: value});
    console.log(`Chapter text (new): ${value}`)
  }

  updateContent(e) {
    console.log(e);
    if (e.target.name == "chapter_title") {
      this.updateTitle(e.target.value);
    }
    if (e.target.name == "chapter_text") {
      this.updateText(e.target.value);
    }
    if (e.target.name.startsWith("chapter_view")) {
      this.updateView(e.target);
    }
  }

  handleLoseFocus = (e) => {
    echo(e);
    this.updateContent(e)
  }

  handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      echo(e);
      this.updateContent(e)
    }
  }

  handleChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div>
        <ChapterTitle title={this.state.title}
                      name="title"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterText text={this.state.text}
                      name="text"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterView view={this.state.view}
                      name="view"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterMedia value={this.state.media}
                      name="media"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterLayers value={this.state.layers}
                        name="layers"
                        onChange={this.handleChange}
        />
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
