import React from 'react';

import { InputText } from './components_base';
import { validBounds } from '../api/utils';


export const LayerTMS = (props) => {
  console.log("layer tms",props);
  return (
    <InputText value={props.value.url}
      placeholder="TMS layer url"
      onChange={props.onChange}
    />
  );
}


const WMS_TEMPLATE = {url: null, layers: null};

export class LayerWMS extends React.Component {
  constructor(props) {
    super(props);

    const value = (typeof props.value === 'object' && props.value != null
                    ? Object.assign({}, {...props.value}, WMS_TEMPLATE)
                    : WMS_TEMPLATE)

    this.state = { value }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, val) {
    console.log(`Entered value (${key}): '${val}'`);
    const value = Object.assign({}, {...this.state.value}, {[key]:val});
    console.log("State-value:", value);
    this.setState((state, props) => {
      if (value.url != null && value.layers != null) {
        console.log("Push on-Change")
        this.props.onChange(value);
      }
      return { value };
      }
    );
  }

  render() {
    console.log("WMS (state,props):", this.state, this.props);
    const value = this.state.value;
    if (!value) {
      return null;
    }
    return (
      <div>
        <InputText value={value.url}
          placeholder="WMS server url"
          onChange={(value) => this.handleChange('url', value)}
        />
        <InputText value={value.layers}
          placeholder="WMS layer name"
          onChange={(value) => this.handleChange('layers', value)}
        />
      </div>
    );
  }
}


export const LayerWFS = (props) => {
  console.log("layer wfs");
  return (
    <InputText value={props.value}
      placeholder="WFS layer url"
      onchange={props.onchange}
    />
  )
}

