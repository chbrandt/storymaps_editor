import React from 'react';

import { InputText } from './components_base';


export const LayerTMS = (props) => {
    console.log("Leyer TMS");
    return (
    <InputText value={props.value}
                placeholder="WMS layer URL"
                onChange={props.onChange}
    />
  )
}