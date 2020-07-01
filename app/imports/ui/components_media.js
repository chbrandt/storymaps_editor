import React from 'react';

import { stringify } from '../api/utils.js';
import { InputText } from './components_base.js';

/* IMAGE */
export class MediaImage extends React.Component {
  /*
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
    https://reactjs.org/docs/forms.html#the-file-input-tag
    https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
    */
  constructor(props) {
    super(props);
    this.state = { media: props.value };

    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleFileSelect(event) {
    const file = this.fileInput.current.files[0];
    const name = file.name;
    console.log(`Selected file - ${file.name}`);
    const src = file ? URL.createObjectURL(file) : null;
    const media = {path: name, src: src};
    this.setState({ media: media });
  }

  handleSubmit(event) {
    // event.preventDefault();
    const file = this.fileInput.current.files[0];
    const name = file.name;
    console.log(`Selected file - ${file.name}`);
    const src = file ? URL.createObjectURL(file) : null;
    const media = {path: name, src: src};
    this.setState({ media: media });
    this.props.onChange(media);
  }

  render() {
    console.log(`MediaImage (state,props):\n${stringify(this.state)}\n${stringify(this.props)}`);
    const src = this.state.media ? this.state.media.src : null;
    return (
      <div>
        {src != null && <img width="100px" height="100px" src={src}/>}
        {src == null || this.props.value.src != this.state.media.src
          ? <form onSubmit={this.handleSubmit}>
              <label>
                <input type="file" ref={this.fileInput} onInput={this.handleFileSelect}/>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          : null
        }
      </div>
    );
  }
}


export class MediaYoutube extends React.Component {
  constructor(props) {
    super(props);
    this.state = { media: props.value };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputURL = this.handleInputURL.bind(this);
  }

  handleInputURL(value) {
    console.log(`Entered URL: ${value}`);
    const embedURL = value.includes("watch") ? value.replace('/watch?v=','/embed/') : value;
    const media = {src: embedURL};
    this.setState({ media: media });
  }

  // handleSubmit() {
  //   const file = this.fileInput.current.files[0];
  //   const name = file.name;
  //   console.log(`Selected file - ${file.name}`);
  //   const src = file ? URL.createObjectURL(file) : null;
  //   const media = {path: name, src: src};
  //   this.setState({ media: media });
  //   this.props.onChange(media);
  // }

  render() {
    console.log(`MediaImage (state,props):\n${stringify(this.state)}\n${stringify(this.props)}`);
    const src = this.state.media ? this.state.media.src : null;
    return (
      <div>
        {(src != null && src.includes('youtube'))
        && <iframe width="560" height="315" src={src} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
        <InputText onChange={this.handleInputURL}/>
      </div>
    );
  }
}
// "https://www.youtube.com/embed/zGjxPQ3EzcU?controls=0"