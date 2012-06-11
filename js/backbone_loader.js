define(function(require){
  var $ = require('jQuery');
  var _ = require('Underscore');
  var Backbone = require('originalBackbone');
  
  
  var methodMap = {
		'create': 'POST',
		'update': 'PUT',
		'delete': 'DELETE',
		'read'  : 'GET'
		};

	var getUrl = function(object) {
		if (!(object && object.url)) return null;
		return _.isFunction(object.url) ? object.url() : object.url;
	};

	var urlError = function() {
		throw new Error("A 'url' property or function must be specified");
	};

	Backbone.sync = function(method, model, options) {
		var type = methodMap[method];
	
		var params = _.extend({
			type:         "POST",
			dataType:     'json',
			beforeSend: function( xhr ) {
				model.trigger('sync:start');
			}
		}, options);
		
		if (!params.url) {
			params.url = "http://new.undev.ru/vimeo/api.json";
		}

		var data = params.data || {};

		if (data.method == null)
			data.method = getUrl(model) || urlError();
			
		data.params = data.params || {}; 
		if (data.method != "videos.search")
			data.params.user_id =  "9580389";

		
		params.data = data;

		var success =  options.success;    
		params.success = function(response, textStatus, jqXHR ) {
			if ('err' in response) {
				alert(response.err.msg);
			}
			if (success) success(response, textStatus, jqXHR);
		};

		var complete = options.complete;
		params.complete = function(jqXHR, textStatus) {
			model.trigger('sync:end');
			if (complete) complete(jqXHR, textStatus);
		};

		return $.ajax(params);
	}


  return Backbone;

});