define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/videos/search_preview.html'
], function($, _, Backbone, searchPreviewTemplate){

	var SearchPreviewView = Backbone.View.extend({
		tagName: "li",
		className: "span4",
		template: _.template(searchPreviewTemplate),
		
		render: function() {
			var data = this.model.toJSON();
			data.mode = this.options.mode;
	    	this.$el.html(this.template(data));
	    	return this;
	    },
	    
	    events : {
			"click #add_main" : "addMain",
			"click #add_secondary" : "addSecondary"
		},
		
		initialize: function() {		
			_.bindAll(this, "addMain", "addSecondary", "addedAsSecondary", "addedAsMain");		
			this.model.on("change:added_as_secondary", this.addedAsSecondary);
			this.model.on("change:added_as_main", this.addedAsMain);
		},
		
		addMain : function() { 
			this.model.set({added_as_main : true});
		},
		
		addSecondary: function() {
			var added = !!this.model.get("added_as_secondary");
			this.model.set({added_as_secondary: !added});
		}, 
		
		addedAsMain : function(args) { 
			var isMain = this.model.get("added_as_main");
			var $caption = this.$el.find(".caption");
			$caption.find("i").remove();
			if (isMain) {
				$caption.append('<i class="icon-ok-sign"></i>');
			}
		},
		
		addedAsSecondary : function() { 
			var added = this.model.get("added_as_secondary");
			var $caption = this.$el.find(".caption");
			$caption.find("i").remove();
			if (added) {				
				$caption.append('<i class="icon-ok-circle"></i>');
				$caption.find("#add_secondary").text("Не добавлять");
			} else {
				$caption.find("#add_secondary").text("Добавить");
			}
		}
	});
	return SearchPreviewView;
});