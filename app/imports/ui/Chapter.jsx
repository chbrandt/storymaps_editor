import React from 'react';

import { ChapterTitle } from './components_chapters.jsx';
import { ChapterText } from './components_chapters.jsx';
import { ChapterMedia } from './components_chapters.jsx';
import { ChapterView } from './components_chapters.jsx';
import { ChapterLayers } from './components_chapters.jsx';

import { chapter as chapter_template } from '../api/templates.js';



export class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.keys(props.value).length == 0 ? chapter_template : props.value;
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
    const state = Object.assign({}, this.state, {[field]: value});
    this.setState(state);
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
