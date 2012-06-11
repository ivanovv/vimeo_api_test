define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/videos/video_thumbnail'
], function($, _, Backbone, VideoThumbnailView){
	var VideosView = Backbone.View.extend({
	
		initialize: function(){
			_.bindAll(this, "addOne", "addAll");
			this.collection.on("reset", this.addAll);
		},
		
		addOne: function(video){
			this.$el.append(new VideoThumbnailView({model: video}).render().el);
		},
		
		addAll: function(){
			this.collection.each(this.addOne);  
		}
	});
	return VideosView;
});