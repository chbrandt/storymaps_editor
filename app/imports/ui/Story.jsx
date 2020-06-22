import React from 'react';
import 'leaflet/dist/leaflet.css';

import { StoryTitle } from './StoryTitle.jsx';
import { StoryChapter } from './StoryChapter.jsx';
import { Map as MapCanvas } from './Map.jsx';

export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      title: null,
      intro: null,
      planet: null,
      chapters: []
    }
  }

  handleChapterCreate = (e) => {
    //TODO: parent components should get the 'value' only, not 'event'
    this.setState({chapters: [...this.state.chapters, StoryChapter]})
  }

  handlePlanetChange = (value) => {
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

  render() {
    return (
      <div>
        <StoryTitle onChange={this.handleTitleChange}/>
        <StoryPlanet onChange={this.handlePlanetChange}/>
        <MapCanvas body={this.state.planet}/>
        <StoryIntro onChange={this.handleIntroChange}/>
        <ChaptersList chapters={this.state.chapters}
                      createChapter={this.handleChapterCreate}
                      onChange={this.handleChaptersChange}
        />
      </div>
    );
  }
};

const StoryIntro = (props) => {
  return null;
  // <TextArea onChange={(e) => {
  //   props.onChange(e.target.value)
  // }}/>
}

const StoryPlanet = (props) => {
  return (
    /*
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    */
    <select required name="planets"
            onChange={(e) => {
              if(e.target.value){
                props.onChange(e.target.value)
              }}}>
      <option value="">Select a planet/body</option>
      <option value="mars">Mars</option>
      <option value="moon">Moon</option>
      <option value="mercury">Mercury</option>
    </select>
  );
}

const ChaptersList = (props) => {
  return (
    <div>
      <button onClick={props.createChapter}>Create Chapter</button>
      {
        props.chapters.map((Chapter,i) => {
          return <Chapter key={i.toString()} />
        })
      }
    </div>
  )
}
