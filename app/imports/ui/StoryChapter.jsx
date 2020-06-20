import React from 'react';

import { ChapterTitle } from './ChapterTitle.jsx';
import { ChapterText } from './ChapterText.jsx';
import { ChapterMedia } from './ChapterMedia.jsx';
import { ChapterView } from './ChapterView.jsx';
import { ChapterLayer } from './ChapterLayer.jsx';

/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/

const chapter_template = {
  title: null,
  text: null,
  view: {
    lon:[-180,180],
    lat:[-90,90]
  }
}

function echo(e) {
    msg = `${e.target.name}(${e.type}): ${e.target.value}`;
    console.log(msg);
}

export class StoryChapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = chapter_template;
  }

  updateView(view) {
    console.log(view);
    this.setState({view})
  }
  
  updateTitle(value) {
    this.setState({title: value});
    console.log(`Chapter title (new): ${value}`)
  }

  updateText(value) {
    this.setState({text: value});
    console.log(`Chapter text (new): ${value}`)
  }

  updateContent(e) {
    console.log(e);
    if (e.target.name == "chapter_title") {
      this.updateTitle(e.target.value);
    }
    if (e.target.name == "chapter_text") {
      this.updateText(e.target.value);
    }
    if (e.target.name.startsWith("chapter_view")) {
      this.updateView(e.target);
    }
  }

  handleLoseFocus = (e) => {
    echo(e);
    this.updateContent(e)
  }

  handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      echo(e);
      this.updateContent(e)
    }
  }

  render() {
    return (
      <div>
        <ChapterTitle defaultValue={this.state.title}
                      onKeyDown={this.handlePressEnter}
                      onBlur={this.handleLoseFocus}
        />
        <br/>
        <ChapterText defaultValue={this.state.text}
                      onKeyDown={this.handlePressEnter}
                      onBlur={this.handleLoseFocus}
        />
        <br/>
        <ChapterView defaultValue={this.state.view}
                      onKeyDown={this.handlePressEnter}
                      onBlur={this.handleLoseFocus}
        />
        <br/>
        <ChapterMedia />
        <br/>
        <ChapterLayer />
      </div>
    );
  }
}
