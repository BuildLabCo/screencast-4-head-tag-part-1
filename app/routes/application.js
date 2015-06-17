import Ember from 'ember';

export default Ember.Route.extend({

  titleToken: "AcmeCo",


  // In this commit, what if the user wants a specific route to override the title?
  // It makes sense that this would only happen on the active most leaf route
  // so let's refactor
  // rename all title properties to titleToken
  // add the title property to the person
  actions: {

    didTransition: function() {

      let leafs = this.router.router.currentHandlerInfos;

      let path = _.chain(leafs)
        .map(function(leaf) {
          let leafTitle = leaf.handler.titleToken;
          if (leafTitle !== undefined) {
            if (typeof leafTitle === 'string') {
              return leafTitle;
            } else {
              return leafTitle.call(leaf.handler);
            }
          }
        })
        .compact()
        .join(" / ")
        .value();

      console.log(path);

      document.title = path;
    }
  }


});