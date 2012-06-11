define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/albums/item.html'
], function($, _, Backbone,  albumTemplate){

	var AlbumView = Backbone.View.extend({
	
		tagName: "article",
		className: "album",
		template: _.template(albumTemplate),
	
	
		events: {
			"click .button.delete": "destroy"
		},
		
		destroy : function() {
			this.model.remove();
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			window.picturefill();
			return this;    
		}
	});
	return AlbumView;
});