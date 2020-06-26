import React from 'react';

import { stringify } from '../api/utils.js';

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
  }

  handleSubmit(event) {
    // event.preventDefault();
    const file = this.fileInput.current.files[0];
    console.log(`Selected file - ${file.name}`);
    const src = file ? URL.createObjectURL(file) : null;
    const state = { media: src };
    this.setState(state);
    this.props.onChange(src);
  }

  render() {
    console.log(`MediaImage: ${stringify(this.state)}`);
    const src = this.state.media;
    return (
      <div>
        {
          !!src
          ? <img width="100px" height="100px" src={src}/>
          : <form onSubmit={this.handleSubmit}>
              <label>
                Upload file:
                <input type="file" ref={this.fileInput} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
        }
      </div>
    );
  }
}

class _ChapterImage extends React.Component {
  constructor(props) {
    super(props);
    // https://reactjs.org/docs/refs-and-the-dom.html
    this.fileInput = React.createRef();
    // this.state = props.value;
  }

  componentWillUnmount() {

  }

  onFileLoad = (e) => {
    const src = e.target.result;
    // console.log(`SRC: ${src}`);
    // the file(s) in 'fileInput' reference are guaranteed to be defined
    // since 'FileLoad' is defined when 'fileInput.current' is selected ('SelectFile')
    // const file = this.fileInput.current.files.item(0);
    this.setState({
      // media : { src }
      media: src
    })
  }

  handleSelectFile = (e) => {
    const file = this.fileInput.current.files.item(0);
    console.log(`Filename (${file.type}): ${file.name} (${Number(file.size/1024).toFixed(1)} KB)`)

    this.handleChange(file.name);

    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
    const reader = new FileReader();
    reader.onload = this.onFileLoad
    reader.readAsDataURL(file);
  }

  handleChange = (value) => {
    // For the time being, 'value' is the filename
    this.props.onChange(value);
  }

  render() {
    return (
      <label>
        Chapter media:
        {/*
          https://reactjs.org/docs/forms.html#the-file-input-tag
          https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
          https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
          https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
          */}
        <input type="file" accept="image/png,image/jpeg"
               key="chapter_media_image" name="chapter_media_image"
               multiple={false}
               ref={this.fileInput}
               onInput={this.handleSelectFile}
        />
        {this.state && this.state.media
          ? <img width="100px" height="100px" src={this.state.media}/>
          : null
        }
      </label>
    );
  }
}
