import Ember from 'ember';

export default Ember.Route.extend({

  title: function(tokens) {
    console.log(tokens);
    let base      = "AcmeCo.",
        hasTokens = tokens && tokens.length;
    return (hasTokens) ? base + " / " + tokens.join(" / ") : base;
  }

});