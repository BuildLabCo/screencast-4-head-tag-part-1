import Ember from 'ember';

export default Ember.Route.extend({
  // the title in the application route is a function
  // that receives the bubbled tokens from child routes
  title: function(tokens) {
    console.log(tokens);
    let base = 'AcmeCo';
    return base;
  },
});