/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/
import React from 'react';

import { ChapterTitle } from './ChapterTitle.jsx';
import { ChapterText } from './ChapterText.jsx';
import { ChapterMedia } from './ChapterMedia.jsx';
import { ChapterView } from './ChapterView.jsx';
import { ChapterLayers } from './ChapterLayers.jsx';

import { chapter as chapter_template } from '../api/templates.js';
import { capitalize } from '../api/utils.js';



function echo(e) {
    msg = `${e.target.name}(${e.type}): ${e.target.value}`;
    console.log(msg);
}

export class StoryTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    }
  }

  updateTitle(value) {
    this.setState({value});
    console.log(`Story title (new): ${value}`)
  }

  handleLoseFocus = (e) => {
    echo(e);
    this.updateTitle(e.target.value);
  }

  handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      echo(e);
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
               defaultValue={this.state.title}
               onKeyDown={this.handlePressEnter}
               onBlur={this.handleLoseFocus}/>
        </label>
      </div>
    );
  }
}

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

export const StoryIntro = (props) => {
  return null;
}

/*
  PLANET
*/
export const StoryPlanet = (props) => {
  const handleChange = (e) => {
    const body = e.target.value;
    const basemap = props.basemaps[body];
    props.onChange({body: basemap})
  }
  const bodies = Object.keys(props.basemaps);
  return (
    //TODO: make a <Select> component
    /*
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    */
    <select required name="planets"
            onChange={(e) => {
              if(e.target.value){
                handleChange(e)
              }}}>
      <option value="">Select a planet/body</option>
      {
        bodies.map((body) => {
          return <option key={body} value={body}>{capitalize(body)}</option>
        })
      }
    </select>
  );
}