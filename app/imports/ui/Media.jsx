import React from 'react';

import { stringify } from '../api/utils.js';
import { capitalize } from '../api/utils.js';

import { Select } from './components_base';
import { MediaImage, MediaYoutube } from './components_media';

import { media as MEDIA_TEMPLATE } from '../api/templates.js';

/**
 * Template object/value for Media
 * @constant MEDIA_TEMPLATE
 */

/**
 * @class
 */
export class Media extends React.Component {
  /**
   *
   * @param {Object} props
   * @param {Object} [props.value=MEDIA_TEMPLATE]
   *
   * @property {Object} state
   * @property {string|number} state.type
   */
  constructor(props) {
    super(props);
    this.state = props.value || MEDIA_TEMPLATE;
    this.media_types = ['image', 'youtube', 'sketchfab'];

    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelectType(value) {
    console.log("Selected Media item:", value);
    this.setState({
      type: value
    });
  }

  handleChange(value) {
    console.log("handleChange in Media, value:", value);
    const {path, src} = value;
    this.props.onChange({
      type: this.state.type,
      path: path,
      src: src
    })
  }

  render() {
    console.log(`Media (state,props):\n${stringify(this.state)}\n${stringify(this.props)}`);
    const media_types = this.media_types;
    const selected = this.state.type;

    if (this.state.path != null) {
      console.assert(this.state.type != null, "Expecting non-NULL media data/type");
    }

    return (
      <div>
        {this.state.path == null
         && <Select items={media_types}
                selected={selected}
                onChange={this.handleSelectType}
            />}
        {media_factory(this.state.type, this.state.path, this.state.src, this.handleChange)}
      </div>
    );
  }
}

function media_factory(mtype, path, src, onChange) {
  if (mtype == null) {
    return null;
  }
  switch(mtype.toLowerCase()) {
    case 'image':
      console.log("Asking for Image comp");
      return <MediaImage value={{path,src}} onChange={onChange}/>;
    case 'youtube':
      return <MediaYoutube value={{src}} onChange={onChange}/>;
    case 'sketchfab':
      console.log("Asking for Sketchfab comp");
    default:
      console.log("Don't know what to do with '${mtype}'");
      return mtype;
  }
  console.assert(false, "You should not be hitting this line.");
}
