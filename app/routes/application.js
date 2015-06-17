import Ember from 'ember';

export default Ember.Route.extend({

  // First: "Add the title for this route"
  title: "AcmeCo",


  actions: {

    didTransition: function() {
      // Second: grab the routes for all active leafs
      let handlers = this.router.router.currentHandlerInfos;

      // Third: Show that we can get the title for this route in the console
      // by: handlers[0].handler.title

      // Fourth: Add the title to the people route
      // Fifth: Now we want to create a tokenized path
      let path = _.chain(handlers)
        .pluck('handler.title')
        .compact()
        .value()

      // Six: Console log out so the user can see
      console.log(path);  

    }
  }


});