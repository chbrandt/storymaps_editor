import React from 'react';

export const ChapterLayers = (props) => {
  return (
    <label>
      Chapter layer:
      {/*
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url
      */}
      <input type="text" placeholder="https://geo.example.org/wms/..."
             key="chapter_layer" name="chapter_layer"
             onKeyDown={props.handlePressEnter}
             onBlur={props.handleLoseFocus}
             list="example_base_URLs"
      />
      <datalist id="example_base_URLs">
        <option value="https://geoserver.planmap.eu/wms/"/>
        <option value="https://geoserver.planmap.eu/wfs/"/>
        <option value="https://bla.server.net/w?s" label="W*S dummy"/>
      </datalist>
    </label>
  );
}
