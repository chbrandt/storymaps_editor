import React from 'react';

import { stringify } from '../api/utils.js';

// import { InputSelect } from './components_base';
import { Select } from './components_base';
import { layer as LAYER_TEMPLATE } from '../api/templates.js';

import { LayerTMS } from './components_layer';
import { LayerWMS } from './components_layer';

/**
 * Template object/value for Layer
 * @constant LAYER_TEMPLATE
 */

/**
 * @class
 */
export class Layer extends React.Component {
  /**
   *
   * @param {Object} props
   * @param {Object} [props.value=LAYER_TEMPLATE]
   *
   * @property {Object} state
   * @property {string|number} state.type
   */
  constructor(props) {
    super(props);
    this.state = props.value || {type: undefined};
    this.layer_types = ['TMS', 'WMS', 'WFS', 'Point', 'Linestring', 'Polygon'];

    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelectType(value) {
    console.log("Selected Layer item:", value);
    this.setState({
      type: value
    });
  }

  handleChange(val) {
    console.log("handleChange in Layer. Value:", val);
    const value = Object.assign({}, {...this.state.value}, {...val});
    this.props.onChange(value);
  }

  render() {
    console.log(`Layer (state,props):\n${stringify(this.state)}\n${stringify(this.props)}`);
    const layer_types = this.layer_types;
    const selected = this.state.type;

    return (
      <div>
        {this.state.url == null
          && <Select items={layer_types}
            selected={selected}
            onChange={this.handleSelectType}
          />}
        {layer_factory(this.state.type, this.state, this.handleChange)}
      </div>
    );
  }
}

function layer_factory(ltype, state, onChange) {
  if (ltype == null) {
    return null;
  }
  switch (ltype) {
    case 'TMS':
      console.log("Asking for TMS comp");
      return <LayerTMS value={state} onChange={onChange} />;
    case 'WMS':
      console.log("Asking for WMS comp");
      return <LayerWMS value={state} onChange={onChange} />;
    case 'WFS':
      console.log("Asking for WFS comp");
      break;
    default:
      console.log(`Don't know what to do with '${ltype}'`);
      return ltype;
  }
  console.assert(false, "You should not be hitting this line.");
}
