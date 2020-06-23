import React from 'react';



export function toList(ItemComponent) {
  return <ItemsList itemComponent={ItemComponent} />;
}

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.new_item = {}
    this.itemComponent = props.itemComponent;
  }

  handleAdd = (e) => {
    e.preventDefault();
    const items = [...this.state.items, this.new_item];
    this.setState({items});
  }

  handleChange = (index, value) => {
    console.log(`[ItemsBuffer(${this.props.itemComponent})] ${index}:${value}`);

    let items = this.state.items;
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
    this.setState({items});

    /*
      Instead, we are just pushing it to Parent.
      */
    this.props.onChange(items);
  }

  render() {
    const items = this.state.items;
    const ItemComponent = this.itemComponent;
    return (
      <div>
        <button onClick={this.handleAdd}>Add media</button>
        {items.map((item,i) => <ItemComponent key={i.toString()}
                                              index={i.toString()}
                                              value={item}
                                              onChange={this.handleChange}/>
        )}
      </div>
    );
  }
}
