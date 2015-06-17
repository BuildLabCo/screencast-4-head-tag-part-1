import Ember from 'ember';

export default Ember.Route.extend({

  // First: "Add the title for this route"
  title: "AcmeCo",


  actions: {

    didTransition: function() {

      // renamed to leafs. Should do this upfront
      let leafs = this.router.router.currentHandlerInfos;

      // if the title is a function, then call it in the context of the leaf handler
      let path = _.chain(leafs)
        .map(function(leaf) {
          let leafTitle = leaf.handler.title;
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