import Ember from 'ember';

export default Ember.Route.extend({

  titleToken: "AcmeCo",


  // In this commit, refactor this method to accept a property
  getHandlerTitle: function(leaf, prop) {
    if ([undefined,null].indexOf(prop) > -1) {
      prop = "titleToken";
    }
    let leafTitle = leaf.handler[prop];

    if (leafTitle !== undefined) {
      if (typeof leafTitle === 'string') {
        return leafTitle;
      } else {
        return leafTitle.call(leaf.handler);
      }
    } else {
      return undefined;
    }
  },

  actions: {

    didTransition: function() {

      let leafs               = this.router.router.currentHandlerInfos,
          activeMostLeaf      = leafs[leafs.length - 1],
          activeLeafHasTitle  = [undefined, null].indexOf(activeMostLeaf.handler.title) === -1,
          { getHandlerTitle } = this;

      let path = (activeLeafHasTitle) ? getHandlerTitle(activeMostLeaf, "title") : _.chain(leafs)
        .map((leaf) => this.getHandlerTitle(leaf)) //needed to refactor this because the map will pass the index as the second parameter
        .compact()
        .join(" / ")
        .value();

      console.log(path);

      document.title = path;
    }
  }


});