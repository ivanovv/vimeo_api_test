define([
  'Underscore',
  'Backbone'
], function(_, Backbone){
	var Video = Backbone.Model.extend({
	
		initialize: function() {
			_.bindAll(this, "addedAsMain");
			this.on("change:added_as_main", this.addedAsMain);
		},
		
		addedAsMain : function(args) {  
			if (this.get("added_as_main")) {
				this.set({ added_as_secondary: false });
			}
		},
		
	
		sync : function(method, model, options){
			if (method == "update") {
				 if (_(options.changes).has("is_like") && options.changes.is_like) {
			 		options.data = { 
				 		method : "videos.setLike",
			 			params : {	video_id: model.id, like: model.get("is_like") } 
			 		};  
			 		return Backbone.sync(method, model, options);
				 }
				return true;	 
			} else if (method == "delete"){
				options.data = { 
				 		method : "albums.removeVideo",
			 			params : {	video_id: model.id, album_id: model.collection.album_id } 
		 		};  
		 		return Backbone.sync(method, model, options);				
			} else return Backbone.sync(method, model, options);
		} 	
	});

  return Video;
});