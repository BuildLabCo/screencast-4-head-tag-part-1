import Ember from 'ember';

export default Ember.Route.extend({
  // the title in the application route is a function
  // that receives the bubbled tokens from child routes
  title: function(tokens) {
    let base      = 'AcmeCo',
        hasTokens = tokens && tokens.length;

    return (hasTokens) ? base + " / " + tokens.join(" / ") : base;
  },
});