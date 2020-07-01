import React from 'react';

import { stringify } from '../api/utils.js';

import { InputSelect } from './components_base';


/* LAYERS */
export const Layer = (props) => {
  console.log(`Layer (props):\n${stringify(props)}`);
  return (
    <InputSelect label="Chapter layer"
                  placeholder="https://geo.example.org/wms/..."
                  value={props.value}
                  onChange={props.onChange}
    />
  );
};
