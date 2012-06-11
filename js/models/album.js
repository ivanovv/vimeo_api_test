define(['Underscore', 'Backbone'], function(_, Backbone) {

var Album = Backbone.Model.extend({

	defaults : {title : "", description : "", video_id : 0 },
	url: "albums.getAlbum",
	
	initialize: function(){
		_.bindAll(this, "preview_url", "video_label");
	},
	
	parse: function(response){
		return response;
	},
	 
	preview_url: function() { 
		var thumbnail_video = this.get("thumbnail_video");
		return thumbnail_video.thumbnails.thumbnail[1]._content; 
	},
	 
	video_label: function(){
		var count = this.get("total_videos");
		return count == 1 ? "video" : "videos";
	},
	 
	sync : function(method, model, options){
		if (method == "update") {
			var changes = options.changes;
			var lastResult = true;
		 	if (_(changes).has("title") && changes.title) {
		 		options.data = { 
			 		method : "albums.setTitle",
		 			params : {	title: model.get("title"), album_id: model.id } 
		 		};  
		 		lastResult = Backbone.sync(method, model, options);	 	
		 	}
		 	if (_(changes).has("description") && changes.description) {
		 		options.data = {
		 			method : "albums.setDescription",  
		 			params : {	description: model.get("description"), album_id: model.id } 
		 		}; 
		 		lastResult = Backbone.sync(method, model, options);
		 	}
		 	if (_(changes).has("additional_videos") && changes.additional_videos) {
			 	var videosToAdd = model.get("additional_videos");
			 	if (videosToAdd) {
				 	videosToAdd = _(videosToAdd.split(","));
				 	videosToAdd.each(function(video_id){
				 		options.data = {
				 			method : "albums.addVideo",  
				 			params : {	video_id: video_id, album_id: model.id } 
				 		}; 
				 		lastResult = Backbone.sync(method, model, options);					 	
				 	});
		 		}
		 	}

		 	return lastResult;
		 	
		} else if (method == "create") {
			options.data = {
	 		method : "albums.create",
	 		params : {
	 			title : model.get("title"),
	 			description : model.get("description"),
	 			video_id: model.get("video_id")
	 		}
			};
			if (model.has("videos"))
				options.data.params.videos = model.get("videos");
			
			return Backbone.sync(method, model, options);
	 	
		} else {
	 	return Backbone.sync(method, model, options);
		}	 
	},
	 
	toJSON: function(){
		var data = Backbone.Model.prototype.toJSON.call(this);
		if (!this.isNew()) {
			data.preview_url =  this.preview_url();
			data.video_label = this.video_label();
		}
		return data;
	},
	 
	validate: function(attrs){
		if (attrs.title == "")
			return "Название не может быть пустым.";
		if (this.isNew() && (attrs.video_id == null || attrs.video_id == 0))
	 	return "Необходимо добавить в альбом хотя бы один видео-ролик.";
	}
	
});

return Album;
});