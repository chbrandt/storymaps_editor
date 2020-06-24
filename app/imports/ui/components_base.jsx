import React from 'react';

import { capitalize } from '../api/utils.js';

export const Select = (props) => {
  /*
  Properties:
  - onChange :
  - items: list of values for selection dropdown/menu list
  - placeholder: dummy item in the selection list (empty/"" value associated)
  - label : (internal) "name" for (HTML) <select> element (default is 'selector')
  */
  const handleChange = (e) => {
    if(e.target.value){
      props.onChange(e.target.value)
    }
  }
  const name = props.label || "selector";
  const placeholder = props.placeholder;
  return (
    <select name={name} required onChange={handleChange}>
      <option value="">{placeholder}</option>
      {props.items.map((item) => {
          return <option key={item} value={item}>{capitalize(item)}</option>
      })}
    </select>
  );
}

export const InputSelect = (props) => {
  /*
  Properties:
  - label : (optional) label to put next to the input field
  - placeholder : (optional) placeholder for the input field
  */
  const handleChange = (e) => {
    props.onChange(e.target.value);
  }
  const placeholder = props.placeholder || "";
  return (
    <label>
      {props.label}
      <input type="text" placeholder={placeholder}
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


export const InputNumber = (props) => {
// TODO: make this a class component to keep a state "number" to be validated.
  const handleChange = (e) => {
    props.onChange(Number(e.target.value));
  };
  const placeholder = props.placeholder || "";
  return (
    <label>
      {props.label}
      <input type="number"
              placeholder={placeholder}
              defaultValue={props.value}
              min={props.min}
              max={props.max}
              onKeyDown={(e) => {if(e.keyCode == 13){handleChange(e)}}}
              onBlur={(e) => {handleChange(e)}}
      />
    </label>
  );
}


export const InputText = (props) => {
  const placeholder = props.placeholder || "";
  return (
    <label>
      {props.label}
      <input type="text" spellCheck="true"
        placeholder={placeholder}
        defaultValue={props.value}
        onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
        onBlur={(e) => {props.onChange(e.target.value)}}
      />
    </label>
  );
}


export const TextArea = (props) => {
  const min = props.min || 10;
  const max = props.max || 500;
  const placeholder = `text (min:${min},max:${max})..`;
  return (
    <label>
      {props.label}
      <br/>
        <textarea rows={5} cols={40} wrap="soft" spellCheck="true"
          placeholder={placeholder}
          minLength={min} maxLength={max}
          defaultValue={props.value}
          onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
          onBlur={(e) => {props.onChange(e.target.value)}}
        />
    </label>
  );
}
