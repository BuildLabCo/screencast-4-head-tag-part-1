So today we're starting off with a basic HR application. I can see all of my employees or filter by department and gender. When we look at our tab title, we can see that our App's document title is always "An Ember App" or whatever we called our application when we started it.

So let's change our application title in our index.html and get started.

Ok great. So now we can see we've changed our document title. But obviously we don't want to do this in the index.html file. The only thing we really want to do there is set the base application name.

Let's update our application route to change our document title to AcmeCo HR when it enters the route. We know from the ember routes screencast that the activate hook is called when the route is fully enterd, so let's use that.

So back in the browser we can see that the document title has been updated by our route successfully. But now when I click on a person, I want the document title to contain information about the person we're looking at. Almost like bread crumbs.

So let's get back in the code and add the activate hook to our person route.

Great. So back in our browser, we can see the document title update when we enter our person route. But as we click through different people, our document title is not updating. That;s because the activate hook is not fired when the underlying route model changes. So this is obviously not way to implement this functionality. So let's refactor.

We'll start by removing our document title code. Now let's set up an action handler for the didTransition action in our application route. The didTransition action is fired from our target route when it's fully entered. As with all ember actions, it bubbles up through all of the parent routes ending in the application route. So by implementing this here, we can catch all of our active routes didTransition events in one place.

So in our browser, we can see that when we enter the people route our console logs out "I have completed a transition", and then again in our person route. But it does not fire when we filter people -- this is because we are using query parameters and not opting for a full route transition. We'll get to this later.

So back in our code, let's take our first step. First, let's add a title property to our application route. When the application route is the active route, this is what we want the document title to contain. The router keeps track of all route handlers for the active route tree. It stores this is a property called currentHandlerInfos. So here, let's grab the tree of current routes, and then we're going to pluck our title attribute from each handler, remove any undefineds and then get the value.

So let's just console log out our handlers as well as our path variable.


We can see here an array with three C's. There are current 3 routes -- or leaves-- in our active route tree. Our application route, our people route and our people index route. If we open up the first leaf, we can see the handler property. This is an instance of the route handler for the application route.

We also console logged our path variable, which is properly reading AcmeCo HR as that's what we set our application route's title to be.

To show how our path variable looks with nested routes, let's add a title property to our people route. Now back in the browser, we can see that our path array has the title of the application route and then the title of our people route.

So let's go back to our application route and complete our path variable. Right now we have an array of route titles, so let's join them with a space-slash-space and set document title equal to the path variable string.

So now back in our browser, we can see this is working. Great!

So let's add our title breadcrumb to the person route. Now here we need to compute the current person's name, so this can just be a simple string. We'll need to return a function that then returns the person's name.

Back in our browser, we can see that we've missed a step. The value in our path variable for the user route is a function, and not the result of the function. That makes sense because our path code is just plucking out the value of the title key from each of our route handler. Let's refactor.

Let's rename our handlers variable to leafs. Now let's update our path chain to determine whether the current leaf's handler is a string or a function. If it;s a string, simply return. If it's a function, call it and return the functions return value.

Now we can see this is working. Great! Screencast over. Just kidding. There's one nice thing we should add. In many cases, I might want the document title to resemble the breadcrumb style that is has now -- a each route's title. But sometimes, I might want to have a route that overridees the document title completely. So let's refactor our code so that when I enter a person route, the document title is completely overriden but then resumes it's current breadcrumb-like style once I return to my people route.

We'll start by renaming all of our title properties to titleToken. Now let's update our path chain to look for the titleToken property on each leaf.

Now let's just make sure we didn't break anything and checkout the app in the browser. Nope, looks like everything's working.

So now, to make things a little easier to reason about, let's pull our our handlerTitle logic into a separate method called getHandlerTitle. So the idea with our final solution here is to assume that the only route that can override the title completely, can only be the active most leaf. If the active most leaf has a title property, use that for our complete document title, otherwise chain together all of the titleToken properties as we are here and use it's concatenated value as our document title.

So let's first store our activeMostLeaf in a local variable of the same name. Now let's update the map step in our path chain to call our abstracted getHandlerTitle method.

Finally let's update our person route to have a title property instead of titleToken.

So in the browser, we can see that it's sort of working. The application and people route is working but our person route is not overriding the value -- in fact, we're not seeing the person's name at all. Let's get back and finish our refactor.

Our getHandlerTitle method takes a leaf and looks for the titleToken property here. It's not looking for the title property at all -- and as a refresher, if the current leaf is the active most leaf and has a title property it should act as a document title override. So let's update our getHandlerTitle method to accept a second argument. Prop. This will be the property on the handler that the method should look for. If none is passed, it will default to titleToken.

Now let's create a new variable in our didTransition handler: activeLeafHasTitle -- if this is true, the our path variable should be equal to it's title, otherwise our path variable should function like normal. 

So if the activeLeafHasTitle we'll call the getHandlerTitle with the activeMostLeaf and title as the property -- this will tell our getHandlerTitle method to return the value of the passed leaf's title and not it's titleToken.

Now back in the browser, when we navigate to a person, we can see the document title is just the person's name. Exactly as expected. And when we navigate back to the people route, it resumes normal concatenated functionality.

Awesome -- but it would be great if you didn't have to do all the plumbing here and could just create your title and titleToken properties and everything just works. Well it can now with the ember-cli-document-title addon. Let's refactor our app to use this addon

We'll start by installing it.

Now let's remove all our logic from the application route leaving. Now the document-title addon functions slightly differently than our original code. In our application route, we'll create a title method. It takes a single argument. tokens. So let's log the tokens out. 

So after clicking around a bit, when we inspec the console we can see an array with a single element, "People". The document-title addon takes the titleToken from all of the active leafs in the route tree, merges them into an array and then calls the title method on the applicaton route with that array of titleTokens. -- so that's what we're seeing here.

So back in our application route, we'll set our base to be AcmeCo.  If tokens were passed we'll join them with the same space-slash-space and add that to the base, otherwise we'll just return the base.

And we can see it working here. And our override still works. The document-title addon allows you to override your document title with the same setup we had before. If the active route has a title property, the addon will use that as the document title otherwise, it will collect all of the titleTokens and send them to the title method on the application route.

So this is part 1 of a 2 part series looking at how to manage the head tag efficiently in an ember app.

I want to thank Kim and all of the other contributors for making this such an easy to use add-on.

Make sure to signup at the top for email updates on new screencasts releases. 

Happy Building. This is Kyle. From buildlab.



