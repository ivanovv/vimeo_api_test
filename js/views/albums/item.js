define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/albums/details',
  'text!templates/albums/item.html'
], function($, _, Backbone, DetailedAlbumView,  albumTemplate){

	var AlbumView = Backbone.View.extend({
	
		tagName: "article",
		className: "album",
		template: _.template(albumTemplate),

		events : {
			"click .button.delete": "destroy",
			"show .accordion-body " : "showBody"
		},
		
		initialize : function(args) { 
			_.bindAll(this, "showBody", "render");
		},
	
		destroy : function() {
			this.model.remove();
		},
		
		showBody : function(args) { 
			if (!this.detailedAlbumView) {
				this.detailedAlbumView = new DetailedAlbumView({el: this.$el.find(".accordion-inner"), model : this.model});				
			}			
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			window.picturefill();
			return this;
		}
	});
	return AlbumView;
});