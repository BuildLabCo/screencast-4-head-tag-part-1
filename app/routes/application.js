import Ember from 'ember';

export default Ember.Route.extend({

  // First: "Add the title for this route"
  title: "AcmeCo",


  actions: {

    // we can now see in this commit that when we make the title
    // a function, our path breaks down. So we will refactor in the next commit
    didTransition: function() {

      let handlers = this.router.router.currentHandlerInfos;

      let path = _.chain(handlers)
        .pluck('handler.title')
        .compact()
        .join(" / ")
        .value()

      console.log(path);

      document.title = path;
    }
  }


});