import React from 'react';

export const ChapterText = (props) => {
  return (
    <label>
      Chapter text:
      <br/>
      <textarea placeholder="Chapter text"
             key="chapter_text" name="chapter_text"
             rows={5} cols={40}
             maxLength={400} minLength={100}
             spellCheck="true"
             wrap="soft"
             defaultValue={props.value}
             onKeyDown={props.onKeyDown}
             onBlur={props.onBlur}
      />
    </label>
  );
}
