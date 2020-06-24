/*
Docs about <input>
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
- https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
*/
import React from 'react';

import { Chapter } from './Chapter.jsx';

import { Select } from './components_base.jsx';
import { TextArea } from './components_base.jsx';
import { InputText } from './components_base.jsx';

import { toList } from './components_collections.jsx';


/*
  CHAPTERS
*/
export const StoryChapters = toList(Chapter);

/*
  TITLE
*/
export const StoryTitle = (props) => <InputText label="Story title"
                                                value={props.value}
                                                onChange={props.onChange}
                                                />

/*
  INTRO
*/
export const StoryIntro = (props) => <TextArea label="Story intro"
                                                value={props.value}
                                                onChange={props.onChange}
                                                />

/*
  PLANET
*/
export const StoryPlanet = (props) => <Select label="Bodies"
                                              placeholder="Select a planet/body"
                                              items={props.value}
                                              onChange={props.onChange}
                                              />
