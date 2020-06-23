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
    this.state = Object.keys(props.value).length !== 0 ? props.value : chapter_template;
  }

  // updateView(view) {
  //   console.log(view);
  //   this.setState({view})
  // }
  //
  // updateTitle(value) {
  //   this.setState({title: value});
  //   console.log(`Chapter title (new): ${value}`)
  // }
  //
  // updateText(value) {
  //   this.setState({text: value});
  //   console.log(`Chapter text (new): ${value}`)
  // }
  //
  // updateContent(e) {
  //   console.log(e);
  //   if (e.target.name == "chapter_title") {
  //     this.updateTitle(e.target.value);
  //   }
  //   if (e.target.name == "chapter_text") {
  //     this.updateText(e.target.value);
  //   }
  //   if (e.target.name.startsWith("chapter_view")) {
  //     this.updateView(e.target);
  //   }
  // }
  //
  // handleLoseFocus = (e) => {
  //   this.updateContent(e)
  // }
  //
  // handlePressEnter = (e) => {
  //   if (e.keyCode == 13) {
  //     this.updateContent(e)
  //   }
  // }

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
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterText text={this.state.text}
                      name="text"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterView view={this.state.view}
                      name="view"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterMedia value={this.state.media}
                      name="media"
                      onChange={this.handleChange}
        />
        <br/>
        <ChapterLayers value={this.state.layers}
                        name="layers"
                        onChange={this.handleChange}
        />
      </div>
    );
  }
}
