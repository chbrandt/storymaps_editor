import React from 'react';

import { InputText } from './components_base.jsx';
import { InputNumber } from './components_base.jsx';
import { InputSelect } from './components_base.jsx';
import { TextArea } from './components_base.jsx';

import { validBounds } from '../api/utils.js';

import { toList } from './components_collections.jsx';


/* TITLE */
export const ChapterTitle = (props) => <InputText label="Chapter title"
                                                  value={props.value}
                                                  onChange={props.onChange}
                                        />


/* TEXT */
export const ChapterText = (props) => <TextArea label="Chapter text"
                                                min={10} max={400}
                                                value={props.value}
                                                onChange={props.onChange}
                                      />


/* IMAGE */
export class ChapterImage extends React.Component {
  constructor(props) {
    super(props);
    // https://reactjs.org/docs/refs-and-the-dom.html
    this.fileInput = React.createRef();
    // this.state = props.value;
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


/* LAYERS */
const ChapterLayer = (props) => <InputSelect label="Chapter layer"
                                              placeholder="https://geo.example.org/wms/..."
                                              onChange={props.onChange}
                                />


/* VIEW */
export class ChapterView extends React.Component {
  //TODO: adjust synchronization between data validation and component state
  //      This component will commit changes (to parent component, 'Chapter')
  //      only if the state ('view') is valid. Which is the right behaviour.
  //      What could be done better is to sync this validation with the actual
  //      value being shown by the (<input>) element, like we do in <StoryTitle>.
  constructor(props) {
    super(props);
    this.state = props.value;
  }

  handleChange = (name, value) => {
    console.log(`[ChapterView] ${name}:${value}`);

    const [axis,limit] = name.split("/")
    let view = {...this.state, [axis]: {...this.state[axis], [limit]: value}};
    if (validBounds(view)) {
      this.setState(view);
      this.props.onChange(view);
    }
  }

  render() {
    return (
      <label>
        {this.props.label}
        <br/>
        {/*TODO: make two components for coordinates (lat,lon) input*/}
        <InputNumber min={-180} max={+180}
          label="lon/min"
          value={this.state.lon.min}
          onChange={(value) => this.handleChange("lon/min", value)}
        />
        <InputNumber min={-180} max={+180}
          label="lon/max"
          value={this.state.lon.max}
          onChange={(value) => this.handleChange("lon/max", value)}
        />
        {/*TODO: make two components for coordinates (lat,lon) input*/}
        <InputNumber min={-90} max={+90}
          label="lat/min"
          value={this.state.lat.min}
          onChange={(value) => this.handleChange("lat/min", value)}
        />
        <InputNumber min={-90} max={+90}
          label="lat/max"
          value={this.state.lat.max}
          onChange={(value) => this.handleChange("lat/max", value)}
        />
      </label>
    );
  }
}

/*
List MEDIA
- 'ChapterMedia' -- the List -- get 'onChange' property for a "callback(items)".
- 'ChapterImage' -- the items -- get 'value' and 'onChange(value)' properties.
*/
export const ChapterMedia = toList(ChapterImage);

/*
List LAYERS
- 'ChapterLayers' -- the List -- get 'onChange' property for a "callback(items)".
- 'ChapterLayer' -- the items -- get 'value' and 'onChange(value)' properties.
*/
export const ChapterLayers = toList(ChapterLayer);
