import React from 'react';

import { InputNumber } from './Components.jsx';

function validBounds({lat,lon}) {
  const checkLat = (val) => {return (-90 <= val && val <= +90)}
  const checkLon = (val) => {return (-180 <= val && val <= +180)}
  if (!(checkLat(lat.min) &&
        checkLat(lat.max) &&
        checkLon(lon.min) &&
        checkLon(lon.max))
      ){return false}
  return (lat.min < lat.max && lon.min < lon.max);
}

export class ChapterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.view;
  }

  handleChange = (name, value) => {
    const [axis,limit] = name.split("/")
    let view = {...this.state, [axis]: {...this.state[axis], [limit]: value}};
    if (validBounds(view)) {
      this.setState(view);
      this.props.onChange(view);
    }
  }

  render() {
    return (
      <label>
        {this.props.label}
        <br/>
        <InputNumber min={-180} max={+180}
          label="lon/min"
          value={this.state.lon.min}
          onChange={this.handleChange}
        />
        <InputNumber min={-180} max={+180}
          label="lon/max"
          value={this.state.lon.max}
          onChange={this.handleChange}
        />
        <InputNumber min={-90} max={+90}
          label="lat/min"
          value={this.state.lat.min}
          onChange={this.handleChange}
        />
        <InputNumber min={-90} max={+90}
          label="lat/max"
          value={this.state.lat.max}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

// export class ChapterView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       view: props.defaultValue
//     }
//   }
//
//   render() {
//     const props = this.props;
//     return (
//       <label>
//         Chapter view:
//         <br/>
//         <input type="number" placeholder={-180}
//                key="chapter_view_lon_min" name="chapter_view_lon_min"
//                defaultValue={props.defaultValue.lon[0]}
//                min={-180}
//                max={180}
//                onKeyDown={props.onKeyDown}
//                onBlur={props.onBlur}
//         />
//         <input type="number" placeholder={180}
//                key="chapter_view_lon_max" name="chapter_view_lon_max"
//                defaultValue={props.defaultValue.lon[1]}
//                min={-180}
//                max={180}
//                onKeyDown={props.onKeyDown}
//                onBlur={props.onBlur}
//         />
//         <br/>
//         <input type="number" placeholder={-90}
//                key="chapter_view_lat_min" name="chapter_view_lat_min"
//                defaultValue={props.defaultValue.lat[0]}
//                min={-90}
//                max={90}
//                onKeyDown={props.onKeyDown}
//                onBlur={props.onBlur}
//         />
//         <input type="number" placeholder={90}
//                key="chapter_view_lat_max" name="chapter_view_lat_max"
//                defaultValue={props.defaultValue.lat[1]}
//                min={-90}
//                max={90}
//                onKeyDown={props.onKeyDown}
//                onBlur={props.onBlur}
//         />
//       </label>
//     );
//   }
// }
