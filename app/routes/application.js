import Ember from 'ember';

export default Ember.Route.extend({

  // start here by adding a document title
  activate: function() {
    document.title = "AcmeCo.";
  }

});