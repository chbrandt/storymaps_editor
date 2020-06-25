import React from 'react';

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
        const props = this.props;
        const items = props.items;
        const button = props.button || "Add";
        return (
          <div>
            <button onClick={this.handleCreate}>{button}</button>
            <label>
              {this.props.label}
              {items.map((item,i) => {
                const index = i.toString();
                return (
                  <div key={item ? JSON.stringify(item) : ""}>
                    <ItemComponent value={item}
                                    onChange={(value) => this.handleChange(index, value)}
                    />
                    <button onClick={() => this.handleDelete(index)}>"Delete"</button>
                  </div>
                );
              })}
            </label>
          </div>
        );
      }
    }
  );
}
