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
      planet: null,
      basemap: null,
      chapters: []
    }
  }

  handleCreateChapter = (e) => {
    //TODO: parent components should get the 'value' only, not 'event'
    this.setState({chapters: [...this.state.chapters, StoryChapter]})
  }

  handlePlanetSelected = (e) => {
    //TODO: parent components should get the 'value' only, not 'event'
    console.log(`Planet selected: ${e.target.value}`)
  }

  render() {
    return (
      <div>
        <StoryTitle />
        <MapPlanet onChange={this.handlePlanetSelected}/>
        <MapCanvas />
        <StoryIntro />
        <ChaptersList chapters={this.state.chapters}
                      createChapter={this.handleCreateChapter}
        />
      </div>
    );
  }
};

const StoryIntro = () => {
  return null;
}

class MapPlanet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value) {
      this.props.onChange(e);
    }
  }

  /*
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  */
  render() {
    return (
      <select required name="planets" onChange={this.handleChange}>
        <option value="">Select a planet/body</option>
        <option value="mars">Mars</option>
        <option value="moon">Moon</option>
        <option value="mercury">Mercury</option>
      </select>
    );
  }
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
