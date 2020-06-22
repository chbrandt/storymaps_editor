import React from 'react';

import { TextArea } from './Components.jsx';

export const ChapterText = (props) => {
  return (
    <TextArea label="Chapter text" min={10} max={400}
              value={props.text}
              onChange={props.onChange}
    />
  );
}

// export const ChapterText = (props) => {
//   return (
//     <label>
//       Chapter text:
//       <br/>
//       <textarea placeholder="Chapter text"
//              key="chapter_text" name="chapter_text"
//              rows={5} cols={40}
//              maxLength={400} minLength={100}
//              spellCheck="true"
//              wrap="soft"
//              defaultValue={props.value}
//              onKeyDown={props.onKeyDown}
//              onBlur={props.onBlur}
//       />
//     </label>
//   );
// }
