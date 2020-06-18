import React from 'react';

function echo(e) {
    msg = `${e.target.name}(${e.type}): ${e.target.value}`;
    console.log(msg);
}

export class StoryTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    }
  }

  updateTitle(value) {
    this.setState({value});
    console.log(`Story title (new): ${value}`)
  }

  handleLoseFocus = (e) => {
    echo(e);
    this.updateTitle(e.target.value);
  }

  handlePressEnter = (e) => {
    if (e.keyCode == 13) {
      echo(e);
      this.updateTitle(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <label>
        Story title:
        <input type="text" placeholder="Story title"
               key="story_title" name="story_title"
               defaultValue={this.state.title}
               onKeyDown={this.handlePressEnter}
               onBlur={this.handleLoseFocus}/>
        </label>
      </div>
    );
  }
}
