import React from 'react';

import { stringify } from '../api/utils.js';

import { Select } from './components_base.jsx';
import { MediaImage } from './components_media.jsx';

import { media as MEDIA_TEMPLATE } from '../api/templates.js';


export class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value || MEDIA_TEMPLATE;
    this.media_types = ['Image', 'Youtube', 'Sketchfab'];

    this.handleSelectType = this.handleSelectType.bind(this);
  }

  handleSelectType(value) {
    console.log("Selected Media item:", this.media_types[value]);
    this.setState({
      active_type: value,
      type: this.media_types[value]
    });
  }

  handleChange = (value) => {
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
    const selected = this.state.active_type;

    let Comp_;
    if (this.state.path != null) {
      console.assert(this.state.type != null, "Expecting non-NULL media data/type");
      Comp_ = (<div>
                {media_factory(this.state.type, this.state.path, this.state.src, this.handleChange)}
              </div>);
    } else {
      Comp_ = (<div>
                <Select items={media_types}
                        selected={selected}
                        onChange={this.handleSelectType}
                />
                {media_factory(this.state.type, this.state.path, this.state.src, this.handleChange)}
              </div>);
    }

    return Comp_;
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
      console.log("Asking for YouTube comp");
    case 'sketchfab':
      console.log("Asking for Sketchfab comp");
    default:
      console.log("Don't know what to do with '${mtype}'");
      return mtype;
  }
  console.assert(false, "You should not be hitting this line.");
}
