import React from 'react';

import { StoryTitle, StoryIntro, StoryPlanet, StoryChapters } from './components_story.jsx';
import { Map as MapCanvas } from './Map.jsx';

import { downloadText as download } from '../api/fileIO.js';
import { stringify } from '../api/utils.js';
import { story as STORY_TEMPLATE } from '../api/templates.js';

const BASEMAPS = {mars:"url-mars",moon:"url-moon"};


export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value || STORY_TEMPLATE;
  }

  handleChange = (field, value) => {
    console.log(`[Story] ${field}:${value}`);
    console.assert(this.state.hasOwnProperty(field),
                    `Story has no '${field}' data field`);

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
          <StoryTitle value={this.state.title}
                      onChange={(value) => this.handleChange("title", value)}
          />
          <br/>
          <StoryPlanet value={Object.keys(BASEMAPS)}
                        onChange={(value) => this.handleChange("bodies", value)}
          />
          <br/>
          <StoryIntro value={this.state.intro}
                      onChange={(value) => this.handleChange("bodies", value)}
          />
        </div>

        <div id="story-body">
          <StoryChapters value={this.state.chapters}
                          onChange={(value) => this.handleChange("chapters", value)}
          />
        </div>

        <div id="story-map">
          <MapCanvas body={this.state.body}/>
        </div>
      </div>
    );
  }
};
