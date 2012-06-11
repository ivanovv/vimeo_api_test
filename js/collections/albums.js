define([
  'Underscore',
  'Backbone',
  'models/album'
], function(_, Backbone, Album){

	var Albums = Backbone.Collection.extend({
		model: Album,
		url: "albums.getAll",
		
		initialize: function(){
			_.bindAll(this, "parse");
		},
		
		parse: function(response) {
			var albums = response.albums;
		
			this.on_this_page =  albums.on_this_page;
			this.page = albums.page;
			this.perpage = albums.perpage;
			this.total = albums.total;
			return albums.album;
		}	
	});
	return Albums;
});