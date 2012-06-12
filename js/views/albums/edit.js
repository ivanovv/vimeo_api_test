define([
  'jQuery',
  'Underscore',
  'Backbone',
  'collections/videos',
  'views/videos/thumb_list',
  'text!templates/albums/edit.html'
  
], function($, _, Backbone, Videos, VideoThumbsView, editAlbumTemplate){
	
	var EditAlbumView = Backbone.View.extend({
		
		tagName: "article",
		className: "detailed-album",
		template: _.template(editAlbumTemplate),
		mode: "edit",
		form_title:  "Редактирование альбома",
		
	  
		events: {
			"click #save": "save",
			"click #cancel": "cancel",
			"keyup #title" : "titleChanged",
			"click #search_btn" : "search"
		},
	  
		initialize: function(){
			_.bindAll(this, "save", "render", "titleChanged", "search", "setNoteText");
			this.render(); 	
			this.videos = new Videos({album_id: this.model.id});
			this.videosView = new VideoThumbsView({el : this.$el.find(".thumbnails"), collection : this.videos, mode: this.mode});
		},
	  
		titleChanged: function(){
			if (this.$el.find("#title").val() == "") {
				$("#title_control").addClass("error");
				$("#title_control p").text("Название альбома должно быть заполнено.");
				return false;
			} else {
				$("#title_control").removeClass("error");
				this.setNoteText();
				return true;
			}	  
		},
	  
		setNoteText: function() {
			var note = this.$el.find("#title_control p");
			note.text(note.data("default_text"));
		},
	  
		save: function() {
			if (!this.titleChanged()) return false;
			var secondary_videos = this.videos.getSecondaryVideos();
			var saved = this.model.save(
				{ 
					title : this.$el.find("#title").val(), 
					description : this.$el.find("#description").val(),
					additional_videos: secondary_videos
				}, 
				{ 
					error: function(model, error) {  alert(error); }
				}
			);
			if (saved)	
				$("#modal").modal("hide"); 
		},
		
		destroy : function() {
			this.model.remove();
		},
	  
		cancel : function() { 
			/* close dialog and remove from DOM */
			$("#modal").modal("hide");
			this.undelegateEvents();
			this.$el.empty();
		},
	
		render: function() {
			var data = this.model.toJSON();
			data.form_title = this.form_title;
			data.mode = this.mode;
			$(this.el).html(this.template(data));
			this.setNoteText();
			$("#modal").html(this.el).modal();
			return this;
		},
		
		search: function() {
			var query = this.$el.find("#search_query").val();
			if (!query.length || query.length == 0) { 
				if (!this.modalAlert)  {
					this.modalAlert = $('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>' +
						'Не указано, что искать. Поиск не возможен.</div>');
					$("#add-video form").before(this.modalAlert);
					self = this;
					this.modalAlert.bind('closed', function () {
						self.modalAlert = null;
					})
				}
				return false;
			} else {
				if (this.modalAlert) {
					this.modalAlert.remove();
					this.modalAlert = null;
				}
			}
			
			this.videos.url = "videos.search";
			this.videos.fetch({
				data: { 
					params : {
						summary_response : 1,
						per_page  : 10, 
						query : this.$el.find("#search_query").val(),
						sort : "most_liked"
					} 
				}
			});
			
			return false;
		}
	
	});
	return EditAlbumView;
});