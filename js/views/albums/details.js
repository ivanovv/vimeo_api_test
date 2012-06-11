define([
  'jQuery',
  'Underscore',
  'Backbone',
  'collections/videos',
  'views/videos/list',
  'views/albums/edit',
  'text!templates/albums/details.html'
], function($, _, Backbone, Videos, VideosView, EditAlbumView, albumDetailsTemplate){

	var DetailedAlbumView = Backbone.View.extend({
	
	  tagName: "article",
	  className: "detailed-album",
	  template: _.template(albumDetailsTemplate),
	  
	  events: {
	    "click .btn-primary" : "edit",
	    "click .button.delete": "destroy"
	  },
	  
	  initialize: function(){
	  	_.bindAll(this, "edit", "titleChanged", "descriptionChanged");
	  	this.model.on("change:title", this.titleChanged);
	  	this.model.on("change:description", this.descriptionChanged);
	  	var videos = new Videos({album_id: this.model.id});
	  	this.render();
	  	var videosView = new VideosView({el : this.$el.find(".thumbnails"), collection : videos});
	  	videos.fetch({
	  		data: { 
	  			params : {
	  				summary_response: 1, 
	  				album_id: this.model.id
	  			} 
	  		}  
	  	});  	
	  },
	  
	  titleChanged: function(){
	  	this.$el.find("#title").text(this.model.get("title"));
		  
	  },
	  descriptionChanged: function(){
		  this.$el.find("#description").text(this.model.get("description"));
	  },
	  
	  edit : function() { 
	  	 var editView = new EditAlbumView({model: this.model});
		  
	  },
	  
	  destroy : function() {
		  this.model.remove();
	  },
	
	  render: function() {
	    $(this.el).html(this.template(this.model.toJSON()));
	    return this;    
	  }
	
	});
	
	return DetailedAlbumView;
		
});
	
