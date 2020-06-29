import React from 'react';

import { stringify } from '../api/utils.js';

import { MediaImage } from './components_media.jsx';


export const Media = (props) => {
  const type = props.type;
  const media_types = ['image (PNG,JPEG)', 'Youtube', 'Sketchfab'];

  let Comp_;
  switch(type.toLowerCase()) {
    case 'image':
      console.log("Asking for Image comp");
      Comp_ = <MediaImage />;
      break;
    case 'youtube':
      console.log("Asking for YouTube comp");
      break;
    case 'sketchfab':
      console.log("Asking for Sketchfab comp");
      break;
    default:
      Comp_ = <Select label="Media types" placeholder="options"
                      items={media_types}
                      onChange={handleSelectType}
              />
      break;
  }

  return <Comp_ />;
}

media_factory(mtype) {
  return null;
}
