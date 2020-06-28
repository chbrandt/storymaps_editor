import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const Overlay = (props) => {
  const style = {
    position:"absolute",
    zIndex: 9000,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  return (
    <div style={style} className="leaflet-container">
      <div style={{margin:"auto", color:"white", textShadow: "1px 1px 2px black"}}>
        <strong>SELECT A PLANETARY BODY</strong>
      </div>
    </div>
  );
}

export class Map extends React.Component {
  render() {
    const basemap = this.props.basemap;
    const view = this.props.view || undefined;
    const bounds = view ? view2bounds(view) : [[-30,-60],[30,60]];
    return (
      <div style={{position:"relative"}}>
        <LeafletMap style={{position:"absolute"}} bounds={bounds}>
          {basemap != null && <TileLayer {...basemap} />}
        </LeafletMap>
        {basemap == null && <Overlay />}
      </div>
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
