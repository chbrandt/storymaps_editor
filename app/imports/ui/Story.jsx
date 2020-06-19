import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { StoryTitle } from './StoryTitle.jsx';
import { StoryChapter } from './StoryChapter.jsx';

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
    const position = [53, 8]
    return (
      <div>
        <TheTitle />
        <button onClick={this.handleAddChapter}>Add Chapter</button>

        {this.state.chapters.map((Chapter,i) => {
          return <Chapter key={i.toString()} />
        })}

        <Map center={position} zoom={13}>
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
};
