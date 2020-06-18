import React from 'react';

import { StoryTitle } from './StoryTitle.jsx';

export class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: StoryTitle,
    }
  }
  render() {
    const TheTitle = this.state.title;
    return (
      <div>
        <TheTitle />
        <button onClick={this.addChapter}>Add Chapter</button>
      </div>
    );
  }
};
