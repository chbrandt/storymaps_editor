import React from 'react';

export class ChapterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: props.defaultValue
    }
  }

  render() {
    const props = this.props;
    return (
      <label>
        Chapter view:
        <br/>
        <input type="number" placeholder={-180}
               key="chapter_view_lon_min" name="chapter_view_lon_min"
               defaultValue={props.defaultValue.lon[0]}
               min={-180}
               max={180}
               onKeyDown={props.onKeyDown}
               onBlur={props.onBlur}
        />
        <input type="number" placeholder={180}
               key="chapter_view_lon_max" name="chapter_view_lon_max"
               defaultValue={props.defaultValue.lon[1]}
               min={-180}
               max={180}
               onKeyDown={props.onKeyDown}
               onBlur={props.onBlur}
        />
        <br/>
        <input type="number" placeholder={-90}
               key="chapter_view_lat_min" name="chapter_view_lat_min"
               defaultValue={props.defaultValue.lat[0]}
               min={-90}
               max={90}
               onKeyDown={props.onKeyDown}
               onBlur={props.onBlur}
        />
        <input type="number" placeholder={90}
               key="chapter_view_lat_max" name="chapter_view_lat_max"
               defaultValue={props.defaultValue.lat[1]}
               min={-90}
               max={90}
               onKeyDown={props.onKeyDown}
               onBlur={props.onBlur}
        />
      </label>
    );
  }
}
