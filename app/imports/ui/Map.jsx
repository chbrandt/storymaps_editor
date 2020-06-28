import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


export class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("PROPS MAP:", this.props);
    const view = this.props.view || undefined;
    const bounds = view ? view2bounds(view) : [[-30,-60],[30,60]];
    const position = [53, 8];
    console.log("VIEW/bounds:",view,bounds);
    return (
      <LeafletMap bounds={bounds}>
        <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* FIXME: Marker not showing out */}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    )
  }
}

function view2bounds(view) {
  /*
  "bounds" has the following structure:
  > bounds = [bottom-left-corner,top-right-corner],
  where the corners are:
  > bottom-left-corner = [latitude-min, longitude-min]
  > top-right-corner = [latitude-max, longitude-max]

  "view" has the following structure:
  > view = {lat: {min, max}, lng:{min,max}}
  */
  const bottom_left = [view.lat.min, view.lng.min];
  const top_right = [view.lat.max, view.lng.max];
  return [bottom_left, top_right];
}

function bounds2view(bounds) {
  /*
  "bounds" has the following structure:
  > bounds = [bottom-left-corner,top-right-corner],
  where the corners are:
  > bottom-left-corner = [latitude-min, longitude-min]
  > top-right-corner = [latitude-max, longitude-max]

  "view" has the following structure:
  > view = {lat: {min, max}, lng:{min,max}}
  */
  const lat = {min: bounds[0][0], max: bounds[1][0]};
  const lng = {min: bounds[0][1], max: bounds[1][1]};
  return {lat, lng};
}
