import Ember from 'ember';

export default Ember.Route.extend({

  // Remove this at this part in the recording
  // to show that the title is now updating as expected
  titleToken: "People",

  model: function() {
    return $.getJSON('/people.json').then((res) => {
      this.store.pushPayload('person', res);
      return this.store.all('person');
    });
  }

});