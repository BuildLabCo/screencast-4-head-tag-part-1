import Ember from 'ember';

export default Ember.Route.extend({

  titleToken: "AcmeCo",


  // In this commit, what if the user wants a specific route to override the title?
  // It makes sense that this would only happen on the active most leaf route
  // so let's refactor
  // rename all title properties to titleToken
  // add the title property to the person


  // Refactor the handler title to a function here
  // In the next commit we'll need to refactor this to accept a property other than titleToken
  getHandlerTitle: function(leaf) {
    let leafTitle = leaf.handler.titleToken;
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

      let path = (activeLeafHasTitle) ? getHandlerTitle(activeMostLeaf) : _.chain(leafs)
        .map(getHandlerTitle)
        .compact()
        .join(" / ")
        .value();

      console.log(path);

      document.title = path;
    }
  }


});