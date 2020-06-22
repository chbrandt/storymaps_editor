import React from 'react';

import { ChapterTitle } from './ChapterTitle.jsx';
import { ChapterText } from './ChapterText.jsx';
import { ChapterMedia } from './ChapterMedia.jsx';
import { ChapterView } from './ChapterView.jsx';
import { ChapterLayers } from './ChapterLayers.jsx';

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
    lon: {
      min:-180,
      max:180
    },
    lat: {
      min:-90,
      max:90
    }
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

  handleChange = (value) => {
    console.log(value);
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
