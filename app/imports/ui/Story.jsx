import React from 'react';

import { StoryTitle, StoryIntro, StoryPlanet, StoryChapters } from './components_story.jsx';
import { Map as MapCanvas } from './Map.jsx';

import { downloadText as download } from '../api/fileIO.js';
// import { story as story_template } from '../api/templates.js';

const basemaps = {mars:"url-mars",moon:"url-moon"};

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

  downloadStory = () => {
    //TODO: eventually, make a package (zip) with json+media in it.
    const story = this.state;
    // It's a JSON; nevertheless, a text file.
    // Use '.txt' to simplify users reading (recognized by any system)
    const filename = `${this.props.label}.txt`;
    download(filename, JSON.stringify(story, null, 2));
  }

  render() {
    console.log(this.state);
    return (
      <div id="story">
        <button onClick={this.downloadStory}>Download Story</button>

        <div id="story-header">
          <StoryTitle onChange={this.handleTitleChange}/>
          <StoryPlanet onChange={this.handlePlanetSelect}
            bodies={Object.keys(basemaps)}/>
          <StoryIntro onChange={this.handleIntroChange}/>
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
