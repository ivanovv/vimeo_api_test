define([
  'Underscore',
  'Backbone',
  'collections/videos'
], function(_, Backbone, Videos){

	var AlbumVideos = Videos.extend({
		
		initialize : function(options) {  
			_.bindAll(this, "getMainVideo", "getSecondaryVideos");
			this.album_id = options.album_id;
		}		
		
	});

	return AlbumVideos;
	
});