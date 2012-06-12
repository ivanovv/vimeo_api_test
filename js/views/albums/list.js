define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/albums/item'
], function($, _, Backbone, AlbumView){
	var AlbumsView = Backbone.View.extend({
	
	tagName: "section",
	className: "albums",
	
	initialize: function(){
		_.bindAll(this, "render", "addOne");
		this.collection.on('reset', this.render);
	},
	
	addOne: function(album) {
		var view = new AlbumView({model: album, collection: this.collection});
		$(this.el).append(view.render().el);    
	},
	
	render: function() {
		$(this.el).empty();
		this.collection.each(function(element){this.addOne(element);}, this);
		window.picturefill();
		return this;
	}
	
	});
  /*var projectListView = Backbone.View.extend({
    el: $("#container"),
    initialize: function(){
      this.collection = new projectsCollection;
      this.collection.add({ name: "Ginger Kid"});
      // Compile the template using Underscores micro-templating
      var compiledTemplate = _.template( projectsListTemplate, { projects: this.collection.models } );
      this.el.html(compiledTemplate);
    }
  });*/
  // Returning instantiated views can be quite useful for having "state"
  return AlbumsView;
});