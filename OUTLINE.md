Goal: Title:
AcmeCo / (Department?) / (Gender?) / Person's Name

-------

Start by doing activate / deactive and setting the title there
  -> collisions
  -> this becomes repetetive and ripe for problems (what about a route that doesn't set the title)

Then try a didTransition on your application route
  -> set a title property on each route, then iterate back from each route in the router
     looking for a title property, send to an array then split
  -> this is annoying to have in the application route and can be done much more cleanly by extending
  -> And what if we want one route to be able to explicity set the entire document title

Now re-write what the ember-head thing does
  -> create an about page
  -> we want the about page to be able to set a specific title while other routes are computed titles
  -> Extend the router via initializer
    -> add the didTransition event and show how it bubbles up each route
    -> then add a check for title token
    -> TODO: research the remaining steps

But it's a good thing that someone already did all of this work for us.
  -> Intro the addon (show github page)
  -> remove our initializer and install the addon
  -> show how everything works now