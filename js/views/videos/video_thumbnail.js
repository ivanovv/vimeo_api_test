define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/videos/thumbnail.html'
], function($, _, Backbone, template){
	var VideoThumbnailView = Backbone.View.extend({
		tagName: "li",
		className: "span3",
		template: _.template(template),
		events: {
			"click #delete_from_album" : "deleteFromAlbum",
			"click #toggle_like" : "toggleLike"
		},
		
		initialize: function() {
			_.bindAll(this, "deleteFromAlbum", "toggleLike", "render");
			this.model.on("change:is_like", this.render);
		},
		
		render: function() {
	    	this.$el.html(this.template(this.model.toJSON()));
	    	return this;
	    },
	    
	    deleteFromAlbum : function (){
	    	var self = this;
	    	this.model.destroy({
		    	success: function(){
		    		self.remove()
	    		}
	    	});
	    },
	    	    
	    toggleLike: function() {
	    	var isLiked = this.model.get("is_like") == 1;
	    	this.model.save({is_like : isLiked ? "0" : "1"});
	    }
	    
	});
	return VideoThumbnailView;
});