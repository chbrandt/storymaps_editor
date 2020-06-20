import React from 'react';
import 'leaflet/dist/leaflet.css';

import { StoryTitle } from './StoryTitle.jsx';
import { StoryChapter } from './StoryChapter.jsx';
import { Map as MapCanvas } from './Map.jsx';

export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: StoryTitle,
      planet: null,
      chapters: []
    }
  }

  handleAddChapter = (e) => {
    this.setState({chapters: [...this.state.chapters, StoryChapter]})
  }

  render() {
    const TheTitle = this.state.title;
    return (
      <div>
        <TheTitle />
        <button onClick={this.handleAddChapter}>Add Chapter</button>
        <MapCanvas />
        {
          this.state.chapters.map((Chapter,i) => {
            return <Chapter key={i.toString()} />
          })
        }
      </div>
    );
  }
};
