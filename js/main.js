require.config({

	paths: {
		libs: "./libs",
		templates: "../templates",
		// Libraries
		jQuery: "libs/jquery-1.7.1",
		Underscore: "libs/underscore",
		originalBackbone: "libs/backbone",
		Bootstrap : "libs/bootstrap",
		picturefill: "libs/picturefill",
		Backbone: "backbone_loader"
	},

	shim: {
        'jQuery': {
            exports: '$'
        },
        'Underscore': {
            exports: '_'
        },
        'originalBackbone': {
            deps: ['Underscore', 'jQuery'],
            exports: 'Backbone'
        },
        'Bootstrap' : {deps:['jQuery']},
        'picturefill' : {deps:['jQuery']}
    }
});

require(['jQuery', 'Backbone', 'app', 'Bootstrap', 'picturefill' ], function($, Backbone, App){
	$(function() {
		App.initialize();
	});
});