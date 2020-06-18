import React from 'react';
import ReactDOM from 'react-dom'

import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }

  // createStory() {
  //   this.setState({title: "bla"});
  // }

  render() {
    return (
      <div>
        <h1>Welcome to Meteor!</h1>
{/*        <button onClick={this.createStory}>Create Story</button>
        {
          this.state.title
          ? <Hello/>
          : <Info/>
        */}
      </div>
    )
  }
}

export default App;
