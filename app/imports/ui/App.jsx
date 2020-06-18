import React from 'react';

import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Story } from './Story.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    }
  }

  createStory = () => {
    this.setState({story: Story});
  }

  deleteStory = () => {
    this.setState({story: null});
  }

  render() {
    const TheStory = this.state.story;
    return (
      <div>
        <h1>Storymaps editor</h1>
        {
          !TheStory
          ? <button onClick={this.createStory}>Create Story</button>
          : <div>
              <button onClick={this.deleteStory}>Delete Story</button>
              <TheStory />
            </div>
        }
      </div>
    )
  }
}
