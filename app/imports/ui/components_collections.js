/**
 * React Components to handle collections of other components
 *
 * @module
 */
import React from 'react';

import { stringify } from '../api/utils.js';

/**
 * Any (react) component accepting 'value' and 'onChange(value)' properties
 * @typedef ItemComponent
 */
/**
 * Callback pushing all items in `ItemsList` when some/any is changed.
 * @callback onChange
 * @param {Array.*} items
 */
/**
 * List of `ItemComponent` objects
 * @typedef ItemsList
 * @properties {Array.*} items
 * @propertirs {onChange} onChange
 * @properties {number} [active=null] If given, only the 'active' component is rendered
 * @properties {string} [label_add="Add"] Label over the button to add a new item
 * @properties {string} [label_del="Delete"] Label over the button to delete an item
 * @properties {string} label
 */

/**
 * Higher-Order Component to manage a list of components
 *
 * @class
 * @param {ItemComponent} ItemComponent
 */
export function toList(ItemComponent) {
  return (
    class ItemsList extends React.Component {
      /*
      This class is responsible for keeping a list of items.
      It handles three events: 'create', 'delete' and 'update' an items on the list.

      This class expects the following properties **from its parent**:
      - onChange() : callback _accepting_ the (whole) list of items

      The children components (items) **will be given** the following properties:
      - value : the data 'items' use to render, new items will receive an empty object
      - onChange() : callback (to this) _expecting_ one argument: 'value'

      NOTE: the "items" stored in this component's (internal) list *are not* the
      React component but (*do are*) the data/value (i.e, object, string, ...)
      the define the actual (React) children component. Consequently, what comes
      out or in this component -- though the onChange callbacks -- is such data
      (which we call 'value' on those interface functions).
      */
      constructor(props) {
        super(props);
        /*
        Properties:
        - items: []
        - new_item: new_item || null
        */
      }

      handleCreate = () => {
        const items = [...this.props.items, undefined];
        this.props.onChange(items);
      }

      handleDelete = (index) => {
        let items = this.props.items;
        const _ = items.splice(index, 1);
        this.props.onChange(items);
      }

      handleChange = (index, value) => {
        console.log(index, value);

        let items = this.props.items;
        items[index] = value;

        /*
          Component 'state' -- {items} -- is not really playing a role here (so far),
          we may want to use it to have a layer of internal validation before
          pushing data to parent component.
          In this component, for example, we could have a check on all items on the
          list before pushing it (to parent component).
          Currently, we trust the children components (media) and this component is
          just making sure that (only) the element that was updated/changed is being
          replaced in the list of items.
          An so, this component 'state' works just as a quick buffer before pushing
          to parent and between getting it (back) from parent and instantiating the
          children.
          */
        // this.setState({items});

        /*
          And we are (also) pushing it to Parent.
          */
        this.props.onChange(items);
      }

      render() {
        const msg = [`ItemsList [${this.props.label}]`,
                      `(state):\n${stringify(this.state)}`,
                      `(procs):\n${stringify(this.props)}`].join('\n');
        console.log(msg);
        const props = this.props;
        const items = props.items;
        const active = props.active;
        const label_add = props.button_add || "Add";
        const label_del = props.button_del || "Delete";
        return (
          <div>
            <button onClick={this.handleCreate}>{label_add}</button>
            <label>
              {this.props.label}
              {items.map((item,i) => {
                const index = i.toString();
                if (active == null || active == i) {
                  return (
                    <div key={item ? JSON.stringify(item) : ""}>
                      <ItemComponent value={item}
                                      onChange={(value) => this.handleChange(index, value)}
                      />
                      <button onClick={() => this.handleDelete(index)}>{label_del}</button>
                    </div>
                  );
                }
              })}
            </label>
          </div>
        );
      }
    }
  );
}
