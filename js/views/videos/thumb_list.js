define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/videos/list',
  'views/videos/search_preview'
], function($, _, Backbone, VideosView, SearchPreviewView){

	var VideoThumbsView = VideosView.extend({
	
		addOne: function(video){
			this.$el.append(new SearchPreviewView({model: video, mode: this.options.mode}).render().el);
		},	
		
		addAll: function(){
			this.$el.empty();
			if (this.collection.length == 0) {
				if (!this.modalAlert){
					this.modalAlert = $('<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>'+
	    		      	'Ни одного видео ролика не найдено, измените свой запрос.</div>');
	    		    this.$el.before(this.modalAlert);
	    		    self = this;
                    this.modalAlert.bind('closed', function () {
                        self.modalAlert = null;
                    });
	    	    }
	    	} else {
		    	if (this.modalAlert){
			    	this.modalAlert.remove(); 
			    	this.modalAlert = null;
		    	}
	    	}
			this.collection.each(this.addOne);  
		}	
	});
	return VideoThumbsView;
});