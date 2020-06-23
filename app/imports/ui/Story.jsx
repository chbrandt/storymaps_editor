import React from 'react';

import { StoryTitle, StoryIntro, StoryPlanet, StoryChapters } from './components_story.jsx';
import { Map as MapCanvas } from './Map.jsx';

import { downloadText as download } from '../api/fileIO.js';
import { stringify } from '../api/utils.js';
// import { story as story_template } from '../api/templates.js';

const BASEMAPS = {mars:"url-mars",moon:"url-moon"};

export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      intro: "",
      body: "",
      basemap: "",
      chapters: []
    }
  }

  handlePlanetSelect = (body) => {
    console.log(`Story-Planet changed: ${body}`);
    const basemap = basemaps[body]
    this.setState({body, basemap});
  }

  handleIntroChange = (value) => {
    console.log(`Story-Intro changed: ${value}`);
    this.setState({intro: value})
  }

  handleTitleChange = (value) => {
    console.log(`Story-Title changed: ${value}`);
    this.setState({title: value})
  }

  handleChaptersChange = (value) => {
    console.log(`Story-Chapters changed: ${value}`);
    this.setState({chapters: value})
  }

  handleChange = (field, value) => {
    console.log(`[Story] ${field}:${value}`);

    const state = Object.assign({}, this.state, {[field]: value});
    /*
      Component 'state' here is not really playing a role,
      we may want to use it to have a layer of internal validation before
      pushing data to parent component.
      If this was a form, for example, we could have the 'setState(state)'
      as an internal validator while the fields are being field, and push
      them all to Parent when 'submit'/'save'.
      */
    this.setState(state);

    /*
      Instead, we are just pushing it to Parent.
      */
    // this.props.onChange(this.props.index, state);

    /*
      In this case, contrary to 'Chapter', 'Story' is the top component
      we want to have 'this.state' hosting the data and no push to parent.

      TODO: make a _base-component_ for these "data management/hub" components (Story, Chapter)
      */
  }

  downloadStory = () => {
    //TODO: implement a make-a-package (zip) function with (json + media) in it.

    const story = this.state;
    const filext = "txt"
    const filename = `${this.props.label}.${filext}`;
    download(filename, stringify(story, 2));
  }

  render() {
    console.log(`Story: ${stringify(this.state)}`);
    return (
      <div id="story">
        <button onClick={this.downloadStory}>Download Story</button>

        <div id="story-header">
          <StoryTitle onChange={this.handleChange}/>
          <StoryPlanet onChange={this.handleChange} bodies={Object.keys(BASEMAPS)}/>
          <StoryIntro onChange={this.handleChange}/>
        </div>

        <div id="story-body">
          <StoryChapters chapters={this.state.chapters}
            onChange={this.handleChaptersChange}
          />
        </div>

        <div id="story-canvas">
          <MapCanvas body={this.state.planet}/>
        </div>
      </div>
    );
  }
};
