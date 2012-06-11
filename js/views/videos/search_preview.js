define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/videos/search_preview.html'
], function($, _, Backbone, searchPreviewTemplate){

	var SearchPreviewView = Backbone.View.extend({
		tagName: "li",
		className: "span3",
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
			_.bindAll(this, "addMain", "addSecondary", "addedAsSecondary");		
			this.model.on("change:added_as_secondary", this.addedAsSecondary);
		},
		
		addMain : function() { 
			this.model.set({added_as_main : true});
		},
		
		addSecondary: function() {
			var added = !!this.model.get("added_as_secondary");
			this.model.set({added_as_secondary: !added});
		}, 
		
		addedAsSecondary : function() { 
			var added = this.model.get("added_as_secondary");
			var $caption = this.$el.find(".caption");
			if (added) {
				$caption.append('<i class="icon-ok"></i>');
				$caption.find("#add_secondary").text("Не добавлять");
			} else {
				$caption.find("i").remove();
				$caption.find("#add_secondary").text("Добавить");
			}
		}
	});
	return SearchPreviewView;
});