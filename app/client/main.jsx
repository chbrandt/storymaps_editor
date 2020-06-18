import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('react-target'));
});
