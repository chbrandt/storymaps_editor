import React from 'react';

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

    // https://reactjs.org/docs/refs-and-the-dom.html
    this.fileInput = React.createRef();
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
    if (e.target.name == "chapter_title") {
      this.updateTitle(e.target.value);
    }
    if (e.target.name == "chapter_text") {
      this.updateText(e.target.value);
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
        <label>
          Chapter title:
          <input type="text" placeholder="Chapter title"
                 key="chapter_title" name="chapter_title"
                 spellCheck="true"
                 defaultValue={this.state.title}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
        </label>
        <br/>
        <label>
          Chapter text:
          <br/>
          <textarea placeholder="Chapter text"
                 key="chapter_text" name="chapter_text"
                 rows={5} cols={40}
                 maxLength={400} minLength={100}
                 spellCheck="true"
                 wrap="soft"
                 defaultValue={this.state.text}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
        </label>
        <br/>
        <label>
          Chapter view:
          <br/>
          <input type="number" placeholder={-180}
                 key="chapter_view_lon_min" name="chapter_view_lon_min"
                 defaultValue={this.state.view.lon[0]}
                 min={-180}
                 max={180}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
          <input type="number" placeholder={180}
                 key="chapter_view_lon_max" name="chapter_view_lon_max"
                 defaultValue={this.state.view.lon[1]}
                 min={-180}
                 max={180}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
          <br/>
          <input type="number" placeholder={-90}
                 key="chapter_view_lat_min" name="chapter_view_lat_min"
                 defaultValue={this.state.view.lat[0]}
                 min={-90}
                 max={90}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
          <input type="number" placeholder={90}
                 key="chapter_view_lat_max" name="chapter_view_lat_max"
                 defaultValue={this.state.view.lat[1]}
                 min={-90}
                 max={90}
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
          />
        </label>
        <br/>
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
        <br/>
        <label>
          Chapter layer:
          {/*
            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
          */}
          <input type="text" placeholder="https://geo.example.org/wms/..."
                 key="chapter_layer" name="chapter_layer"
                 onKeyDown={this.handlePressEnter}
                 onBlur={this.handleLoseFocus}
                 list="example_base_URLs"
          />
          <datalist id="example_base_URLs">
            <option value="https://geoserver.planmap.eu/wms/"/>
            <option value="https://geoserver.planmap.eu/wfs/"/>
            <option value="https://bla.server.net/w?s" label="W*S dummy"/>
          </datalist>
        </label>
      </div>
    );
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
}

const Thumbnail = (props) => {
  return (
    <img width="100px" height="100px" src={props.media.src} />
  )
}

/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/
