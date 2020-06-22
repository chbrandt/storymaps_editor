import React from 'react';

import { TextArea } from './base_components.jsx';

export const ChapterText = (props) => {
  return (
    <TextArea label="Chapter text" min={10} max={400}
              value={props.text}
              onChange={props.onChange}
    />
  );
}
