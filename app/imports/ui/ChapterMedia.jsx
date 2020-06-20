import React from 'react';

const Thumbnail = (props) => {
  return (
    <img width="100px" height="100px" src={props.media.src} />
  )
}

export class ChapterMedia extends React.Component {
  constructor(props) {
    super(props);
    // https://reactjs.org/docs/refs-and-the-dom.html
    this.fileInput = React.createRef();
    this.state = {};
  }

  onFileLoad = (e) => {
    const src = e.target.result;
    console.log(`SRC: ${src}`);
    // the file(s) in 'fileInput' reference are guaranteed to be defined
    // since 'FileLoad' is defined when 'fileInput.current' is selected ('SelectFile')
    const file = this.fileInput.current.files.item(0);
    this.setState({
      media : { src }
    })
  }

  handleSelectFile = (e) => {
    const file = this.fileInput.current.files.item(0);
    console.log(`Filename (${file.type}): ${file.name} (${Number(file.size/1024).toFixed(1)} KB)`)
    // this.setState({
    //   media: { file }
    // })

    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
    const reader = new FileReader();
    reader.onload = this.onFileLoad
    reader.readAsDataURL(file);
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
        {this.state.media ? <Thumbnail media={this.state.media}/> : null}
      </label>
    );
  }
}
