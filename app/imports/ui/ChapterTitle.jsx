import React from 'react';

import { InputText } from './base_components.jsx';

export const ChapterTitle = (props) => {
  return (
    <InputText label="Chapter title"
              value={props.title}
              onChange={props.onChange}
    />
  );
}
