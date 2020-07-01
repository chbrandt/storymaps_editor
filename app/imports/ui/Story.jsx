import React from 'react';

import { stringify } from '../api/utils.js';
import { downloadText as download } from '../api/fileIO.js';

import { Map } from './Map.jsx';
import { Chapter } from './Chapter.jsx';

// Base (HTML elements) components
import { Select } from './components_base';
import { TextArea } from './components_base';
import { InputText } from './components_base';

// List HOC
import { toList } from './components_collections';


// TEMPLATES and CONFIGS
import { story as STORY_TEMPLATE } from '../api/templates.js';

//TODO: Implement a config object
const BASEMAPS = {
  mars: {
    attribution: "&amp;<a href='https://www.openplanetary.org/'>OpenPlanetary</a>",
    url: "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png",
    tms: true
  },
  moon: {
    attribution: "&amp;<a href='https://www.openplanetary.org/'>OpenPlanetary</a>",
    url: "https://s3.amazonaws.com/opmbuilder/301_moon/tiles/w/hillshaded-albedo/{z}/{x}/{y}.png",
    tms: true
  }
};


/*
  CHAPTERS
*/
export const StoryChapters = toList(Chapter);


/*
  TITLE
*/
export const StoryTitle = (props) => <InputText label="Story title"
                                                value={props.value}
                                                onChange={props.onChange}
                                                />


/*
  INTRO
*/
export const StoryIntro = (props) => <TextArea label="Story intro"
                                                value={props.value}
                                                onChange={props.onChange}
                                                />


/*
  PLANET
*/
export const StoryPlanet = (props) => <Select label="Bodies"
                                              placeholder="Select a planet/body"
                                              items={props.value}
                                              onChange={props.onChange}
                                              />


/*
  STORY-MAP
*/
export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value || STORY_TEMPLATE;
  }

  handleChange = (field, value) => {
    console.log(`[Story] '${field}':${value}`);
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

  handleChangeChapters = (value) => {
    this.handleChange("chapters", value);
  }

  handleSelectChapter = (active_chapter) => this.setState({ active_chapter });

  componentDidUpdate(prevProps, prevState) {
    console.log("DEBUG update (PREV props/state):", prevProps, prevState);
    console.log("DEBUG update (THIS props/state):", this.props, this.state);
    if (prevState.chapters.length != this.state.chapters.length) {
      const active_chapter = this.state.chapters.length - 1;
      this.setState({active_chapter});
    } else {
      if (this.state.active_chapter == this.state.chapters.length){
        const active_chapter = this.state.chapters.length - 1;
        this.setState({active_chapter});
      }
    }
  }

  downloadStory = () => {
    //TODO: implement a make-a-package (zip) function with (json + media) in it.
    const story = this.state;
    const filext = "txt"
    const filename = `${this.props.label}.${filext}`;
    download(filename, stringify(story, 2));
  }

  render() {
    console.log(`Story\n (state):\n${stringify(this.state)}\n (procs):\n${stringify(this.props)}`);

    const active_chapter = this.state.active_chapter;
    const chapters = this.state.chapters;
    const active_view = (
      active_chapter != null && chapters[active_chapter] != null
      ? chapters[active_chapter].view
      : null);
    const body_basemap = BASEMAPS[Object.keys(BASEMAPS)[this.state.body]];

    return (
      <div id="story">
        <button onClick={this.downloadStory}>Download Story</button>

        <div id="story-header">
          <StoryTitle value={this.state.title}
                      onChange={(value) => this.handleChange("title", value)}
          />
          <br/>
          <StoryPlanet value={Object.keys(BASEMAPS)}
                        onChange={(value) => this.handleChange("body", value)}
          />
          <br/>
          <StoryIntro value={this.state.intro}
                      onChange={(value) => this.handleChange("intro", value)}
          />
        </div>

        <div id="story-body">
          {chapters.length > 0
            && <Select items={Object.keys(chapters)}
                        selected={active_chapter}
                        onChange={this.handleSelectChapter}
                />
          }
          <StoryChapters items={chapters}
                          label="Chapters list"
                          button_add="Add Chapter"
                          button_del="Delete Chapter"
                          active={active_chapter}
                          onChange={(value) => this.handleChangeChapters(value)}
          />
        </div>

        <div id="story-map">
          <Map body={this.state.body}
                view={active_view}
                basemap={body_basemap}
          />
        </div>
      </div>
    );
  }
};
