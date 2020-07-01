/**
 * React Components around basic HTML input elements
 *
 * @module
 */
import React from 'react';

import { capitalize } from '../api/utils.js';

/**
 *
 * @callback onChange
 * @param {*} value Value returned to pattern component
 */


/**
 * Render a `select` (dropdown) element from a list of 'options'
 *
 * @param {object} props - Props of our component
 * @param {onChange} props.onChange - Callback when an item is selected, function gets the selected 'value'.
 * @param {string[]|object} props.items - Option (values) to select from.
 *                                            If an Object `{}`, keys will be used for selection 'value'
 *                                            while values will be used to label the options.
 * @param {string} [props.placeholder="Options"] - Expression to indicate content (a tip).
 * @param {number} [props.selected] - An active option
 *                                    (must be one of the values from 'options' array
 *                                      or -- if an `{}` Object -- one of the keys 'options').
 * @returns {object} Select (React) element/Component.
 */
const Select = (props) => {
  let options = props.items;
  console.assert(typeof options === 'object' && options != null,
                  `Expecting non-null object-like "options", instead got '${options}'`);

  // If the items/options given are a single array, make an Object out of it
  // (mapping array values to 'key' and 'value') just to homogeneize the handling later
  if (Array.isArray(options)) {
    options = options.reduce((result, opt) => {result[opt]=opt; return result}, {});
  }

  const placeholder = props.placeholder || "Options";
  // const selected = Math.max(0, Math.min(props.selected, Object.keys(options).length-1));
  const selected = props.selected;

  const handleChange = (e) => {
    if(e.target.value){
      props.onChange(e.target.value)
    }
  }

  return (
    <select name="selector"
            required
            value={selected}
            onChange={handleChange}>
      <option value="">{placeholder}</option>
      {Object.entries(options).map( ([key,opt]) => {
        return (
          <option key={opt} value={key}>
            {capitalize(opt)}
          </option>
        );
      })}
    </select>
  );
}


/**
 * Render an `input` element with options/suggestions to select
 *
 * @param {object} props - Props of our component
 * @param {onChange} props.onChange - Callback when value is changed (when looses focus or user hits Enter).
 * @param {string[]} [props.suggestions=[]] - Suggestion (values) to possibly pick from.
 * @param {string} [props.label=null] - Label in front on the `input` element
 * @param {string} [props.placeholder=null] Expression to indicate content (a tip)
 * @returns {string} Input value
 */
const InputSelect = (props) => {
  const suggestions = props.suggestions || [];

  const handleChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <label>
      {props.label}
      <input type="text"
              placeholder={props.placeholder}
              defaultValue={props.value}
              onKeyDown={(e) => {if(e.keyCode == 13){handleChange(e)}}}
              onBlur={(e) => {handleChange(e)}}
              list="suggestions"
      />
      <datalist id="suggestions">
        {suggestions.map((opt) => {
          return <option value={opt} label={opt}/>;
        })}
      </datalist>
    </label>
  );
}


/**
 * Render an `input` element for numerical values
 *
 * @param {object} props Props of our component
 * @param {onChange} props.onChange - Callback when value is changed (when looses focus or user hits Enter).
 * @param {number} [props.value=null] - Used as `input` (default) value
 * @param {number} [props.min=null] - Used as input `min` value boundary
 * @param {number} [props.max=null] - Used as input `max` value boundary
 * @param {string} [props.label=null] - Used as input label
 * @param {string|number} [props.placeholder=null] - Expression to indicate content (a tip)
 * @returns {string} Input value
 */
const InputNumber = (props) => {

  const handleChange = (e) => {
    props.onChange(Number(e.target.value));
  };

  return (
    <label>
      {props.label}
      <input type="number"
              placeholder={props.placeholder}
              defaultValue={props.value}
              min={props.min}
              max={props.max}
              onKeyDown={(e) => {if(e.keyCode == 13){handleChange(e)}}}
              onBlur={(e) => {handleChange(e)}}
      />
    </label>
  );
}


/**
 * Render an `input` element with "spell-check" enabled
 *
 * @param {object} props - Props of our component
 * @param {onChange} props.onChange - Callback when value is changed (when looses focus or user hits Enter).
 * @param {number} [props.value=null] - Used as `input` (default) value
 * @param {string} [props.label=null] - Used as input label
 * @param {string} [props.placeholder=null] - Expression to indicate content (a tip)
 * @returns {string} Input value
 */
const InputText = (props) => {
  return (
    <label>
      {props.label}
      <input type="text" spellCheck="true"
        placeholder={props.placeholder}
        defaultValue={props.value}
        onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
        onBlur={(e) => {props.onChange(e.target.value)}}
      />
    </label>
  );
}


/**
 * Render a `textarea` element
 *
 * @param {object} props - Props of our component
 * @param {onChange} props.onChange - Callback when value is changed (when looses focus or user hits Enter).
 * @param {number} [props.value=null] - Used as `input` (default) value
 * @param {number} [props.min=0] - Minimum size (characters) of the text
 * @param {number} [props.max=500] - Maximum size (characters) of the text
 * @param {number} [props.rows=5] - Number of (text) rows
 * @param {number} [props.cols=40] - Number of (text) columns
 * @param {string} [props.label=null] - Used as input label
 * @returns {string} Input value
 */
const TextArea = (props) => {
  const min = props.min || 0;
  const max = props.max || 500;
  const placeholder = `text (min:${min},max:${max})..`;
  const rows = props.rows || 5;
  const cols = props.cols || 40;
  return (
    <label>
      {props.label}
      <br/>
        <textarea rows={rows} cols={cols} wrap="soft" spellCheck="true"
          placeholder={placeholder}
          minLength={min} maxLength={max}
          defaultValue={props.value}
          onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
          onBlur={(e) => {props.onChange(e.target.value)}}
        />
    </label>
  );
}

export {Select, InputSelect, InputNumber, InputText, TextArea};