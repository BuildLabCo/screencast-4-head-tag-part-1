import Ember from 'ember';

export default Ember.Route.extend({


  actions: {
    didTransition: function() {
      console.log("Setting the document title!");
    }
  }


});