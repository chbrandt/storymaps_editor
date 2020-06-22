import React from 'react';

import { StoryTitle, StoryChapter, StoryIntro, StoryPlanet } from './story_components.jsx';
import { Map as MapCanvas } from './Map.jsx';

import { downloadText as download } from '../api/fileIO.js';
import { story as story_template } from '../api/templates.js';

export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = story_template;
  }

  handleChapterCreate = (e) => {
    //TODO: parent components should get the 'value' only, not 'event'
    this.setState({chapters: [...this.state.chapters, StoryChapter]})
  }

  handlePlanetSelect = (value) => {
    console.log(`Story-Planet changed: ${value}`);
    this.setState({planet: value});
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
    const story = this.state;
    // It's a JSON; nevertheless, a text file.
    // Use '.txt' to simplify users reading (recognized by any system)
    const filename = `${this.state.label}.txt`;
    download(filename, JSON.stringify(story, null, 2));
  }

  render() {
    const basemaps = {mars:"url-mars",moon:"url-moon"};
    return (
      <div id="story">
        <button onClick={this.downloadStory}>Download Story</button>

        <div id="story-header">
          <StoryTitle onChange={this.handleTitleChange}/>
          <StoryPlanet onChange={this.handlePlanetSelect}
            basemaps={basemaps}/>
          <StoryIntro onChange={this.handleIntroChange}/>
        </div>

        <div id="story-body">
          <MapCanvas body={this.state.planet}/>
          <ChapterList chapters={this.state.chapters}
            createChapter={this.handleChapterCreate}
            onChange={this.handleChaptersChange}
          />
        </div>
      </div>
    );
  }
};

const ChapterList = (props) => {
  return (
    <div>
      <button onClick={props.createChapter}>Create Chapter</button>
      {props.chapters.map((Chapter,i) => {
          return <Chapter key={i.toString()}/>
      })}
    </div>
  );
}
