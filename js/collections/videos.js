define([
  'Underscore',
  'Backbone',
  'models/video'
], function(_, Backbone, Video){

	var Videos = Backbone.Collection.extend({
		url: "albums.getVideos",
		model : Video,
		
		initialize : function(options) {  
			_.bindAll(this, "getMainVideo", "getSecondaryVideos");
			if (options && options.album_id)
				this.album_id = options.album_id;
		},
		
		getMainVideo: function() {
			return this.find(function(video) { return video.has("added_as_main") && video.get("added_as_main") });  
		},
		
		getSecondaryVideos : function() { 
			var secondary_videos = this.select(function(video) { return video.get("added_as_secondary")});
			if (secondary_videos.length > 0) {
				secondary_videos =  _(secondary_videos).map(function(video) { return video.id.toString(); });
				return secondary_videos.join(",");
			}
			return null;
		},  
		
		parse: function(response) {
			return response.videos.video;
		}
		
	});

	return Videos;
	
});