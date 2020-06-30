import React from 'react';

import { capitalize } from '../api/utils.js';

/**
 *
 * @callback onChange Some desc
 * @param {*} value Value returned to pattern component
 */

/**
 * Render a select element with `items`
 *
 * @param {object} props Props of our component
 * @param {string[]} props.items Items to offer as Options
 * @param {onChange} props.onChange Callback for when new item is selected
 * @param {string} [props.label="selector"] Used as internal 'select' element name
 * @param {string} [props.placeholder="Options"] Expression to indicate content (a tip)
 * @param {number} props.selected Selected option
 * @returns {object} Select element
 */
const Select = (props) => {
  const handleChange = (e) => {
    if(e.target.value){
      props.onChange(e.target.value)
    }
  }

  const items = props.items;
  const name = props.label || "selector";
  const placeholder = props.placeholder || "Options";
  const selected = props.selected;
  // const selected = Math.max(0, Math.min(props.selected, items.length));

  return (
    <select name={name} required value={selected} onChange={handleChange}>
      <option value="">{placeholder}</option>
      {items.map((item,i) => {
          console.assert(item != null, "Select items must be non-NULL values/objects");
          // const active = selected != null && selected == i;
          return (
            <option key={item} value={i}>
              {capitalize(item)}
            </option>
      );})}
    </select>
  );
}


/**
 * Render an `input` element with options to select
 *
 * @param {object} props Props of our component
 * @param {onChange} props.onChange Callback to handle input 'e.target.value'
 * @param {string} [props.label] Used as internal 'select' element name
 * @param {string} [props.placeholder] Expression to indicate content (a tip)
 * @returns {string} Input value
 */
const InputSelect = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  }
  const placeholder = props.placeholder || "";
  return (
    <label>
      {props.label}
      <input type="text" placeholder={placeholder}
              defaultValue={props.value}
              onKeyDown={(e) => {if(e.keyCode == 13){handleChange(e)}}}
              onBlur={(e) => {handleChange(e)}}
              list="optional_URLs"
      />
      <datalist id="optional_URLs">
        <option value="https://geoserver.planmap.eu/wms/" label="PLANMAP GeoServer"/>
      </datalist>
    </label>
  );

}


/**
 * Render an `input` element for numerical values
 *
 * @param {object} props Props of our component
 * @param {onChange} props.onChange Callback to handle input 'e.target.value'
 * @param {number} [props.value] Used as `input` (default) value
 * @param {number} [props.min] Used as input `min` value boundary
 * @param {number} [props.max] Used as input `max` value boundary
 * @param {string} [props.label] Used as input label
 * @param {string|number} [props.placeholder] Expression to indicate content (a tip)
 * @returns {string} Input value
 */
const InputNumber = (props) => {
// TODO: make this a class component to keep a state "number" to be validated.
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
 * @param {object} props Props of our component
 * @param {onChange} props.onChange Callback to handle input 'e.target.value'
 * @param {number} [props.value] Used as `input` (default) value
 * @param {number} [props.min] Used as input `min` value boundary
 * @param {number} [props.max] Used as input `max` value boundary
 * @param {string} [props.label] Used as input label
 * @param {string} [props.placeholder] String for bla
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
 * @param {object} props Props of our component
 * @param {onChange} props.onChange Callback to handle input 'e.target.value'
 * @param {number} [props.value] Used as `input` (default) value
 * @param {number} [props.min=0] Used as input `min` value boundary
 * @param {number} [props.max=500] Used as input `max` value boundary
 * @param {number} [props.rows=5] Used as input `min` value boundary
 * @param {number} [props.cols=40] Used as input `max` value boundary
 * @param {string} [props.label] Used as input label
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