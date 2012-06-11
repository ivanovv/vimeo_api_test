define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/albums/edit'
], function($, _, Backbone, EditAlbumView){

	var NewAlbumView = EditAlbumView.extend({
		mode: "new",
		form_title : "Новый альбом",
		
		save: function() {
			if (!this.titleChanged()) return false;
			var main_video = this.videos.getMainVideo();
			if (!main_video) { alert("Необходимо указать ролик для альбома."); return false; }
			var secondary_videos = this.videos.getSecondaryVideos();
			
			var new_album = {
				title : this.$el.find("#title").val(), 
		  		description : this.$el.find("#description").val(),
		  		video_id : main_video.id	  		
			};
			if (secondary_videos) {
				new_album.videos = secondary_videos;
			}
		  	var saved = this.model.save(new_album, { error: function(model, error) {  alert(error); }});
			if (saved)	
				$("#modal").modal("hide"); 
		}
	});
	return NewAlbumView
});