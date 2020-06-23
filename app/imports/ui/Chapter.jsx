import React from 'react';

import { ChapterTitle } from './components_chapter.jsx';
import { ChapterText } from './components_chapter.jsx';
import { ChapterView } from './components_chapter.jsx';
import { ChapterLayers } from './components_chapter.jsx';
import { ChapterMedia } from './components_chapter.jsx';

import { chapter as chapter_template } from '../api/templates.js';



export class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value || chapter_template;
  }

  handleChange = (field, value) => {
    console.log(`[Chapter] ${field}:${value}`);

    const state = Object.assign({}, this.state, {[field]: value});
    /*
      Component 'state' here is not really playing a role,
      we may want to use it to have a layer of internal validation before
      pushing data to parent component.
      If this was a form, for example, we could have the 'setState(state)'
      as an internal validator while the fields are being field, and push
      them all to Parent when 'submit'/'save'.
      */
    // this.setState(state);

    /*
      Instead, we are just pushing it to Parent.
      */
    this.props.onChange(this.props.index, state);
  }

  render() {
    return (
      <div>
        <ChapterTitle title={this.state.title}
                      name="title"
                      onChange={(value) => this.handleChange("title", value)}
        />
        <br/>
        <ChapterText text={this.state.text}
                      name="text"
                      onChange={(value) => this.handleChange("text", value)}
        />
        <br/>
        <ChapterView view={this.state.view}
                      name="view"
                      onChange={(value) => this.handleChange("view", value)}
        />
        <br/>
        <ChapterMedia value={this.state.media}
                      name="media"
                      label="Media:"
                      onChange={(value) => this.handleChange("media", value)}
        />
        <br/>
        <ChapterLayers value={this.state.layers}
                        name="layers"
                        label="Layers:"
                        onChange={(value) => this.handleChange("layers", value)}
        />
      </div>
    );
  }
}
