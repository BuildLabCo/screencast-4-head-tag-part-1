import Ember from 'ember';

export default Ember.Route.extend({

  // the in the application route is a function
  // that receives the bubbled tokens from child routes
  title: function(tokens) {
    let base = 'AcmeCo';
    return base;
  },

  model: function() {
    return $.getJSON('/people.json').then((res) => {
      this.store.pushPayload('person', res);
      return this.store.all('person');
    });
  }

});