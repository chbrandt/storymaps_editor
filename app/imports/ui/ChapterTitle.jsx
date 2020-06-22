import React from 'react';

import { InputText } from './Components.jsx';

export const ChapterTitle = (props) => {
  return (
    <InputText label="Chapter title"
              value={props.title}
              onChange={props.onChange}
    />
  );
}

// export const ChapterTitle = (props) => {
//   return (
//     <label>
//       Chapter title:
//       <input type="text" placeholder="Chapter title"
//              key="chapter_title" name="chapter_title"
//              spellCheck="true"
//              defaultValue={props.value}
//              onKeyDown={props.onKeyDown}
//              onBlur={props.onBlur}
//       />
//     </label>
//   );
// }
