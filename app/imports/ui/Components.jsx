import React from 'react';

const InputNumber = (props) => {
  //TODO: make this a class component to keep a state "number" to be validated.
  const name = props.label ? props.label.replace(" ","_") : "text";
  const tip = "text..";
  const onChange = (e) => {props.onChange(e.target.name, Number(e.target.value))};
  return (
    <label>
      {props.label}
      <input type="number"
        placeholder={tip} name={name}
        defaultValue={props.value}
        min={props.min}
        max={props.max}
        onKeyDown={(e) => {if(e.keyCode == 13){onChange(e)}}}
        onBlur={(e) => {onChange(e)}}
      />
    </label>
  );
}

const InputText = (props) => {
  const name = props.label ? props.label.replace(" ","_") : "text";
  const tip = "text..";
  return (
    <label>
      {props.label}
      <input type="text" spellCheck="true"
        placeholder={tip} name={name}
        defaultValue={props.value}
        onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
        onBlur={(e) => {props.onChange(e.target.value)}}
      />
    </label>
  );
}

const TextArea = (props) => {
  const min = props.min || 10;
  const max = props.max || 500;
  const tip = `text (min:${min},max:${max})..`;
  const name = props.label ? props.label.replace(" ","_") : "text";
  return (
    <label>
      {props.label}
      <br/>
        <textarea rows={5} cols={40} wrap="soft" spellCheck="true"
          placeholder={tip} name={name}
          minLength={min} maxLength={max}
          defaultValue={props.value}
          onKeyDown={(e) => {if(e.keyCode == 13){props.onChange(e.target.value)}}}
          onBlur={(e) => {props.onChange(e.target.value)}}
        />
    </label>
  );
}

export {InputNumber, InputText, TextArea};
