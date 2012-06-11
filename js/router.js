define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/albums/list',
  'models/album',
  'collections/albums',
  'views/albums/details',
  'views/albums/new'
], function($, _, Backbone, AlbumsView, Album, Albums, DetailedAlbumView, NewAlbumView){
  var AppRouter = Backbone.Router.extend({
  	routes: {
      '': 'showAlbums',
      'albums': 'showAlbums',
      'newAlbum' : 'newAlbum',
      'albums/:id': 'showAlbum',
      'albums/:id/edit': 'editAlbum',
      'albums/:id/delete': 'deleteAlbum',
      'albums/:album_id/video/:video_id': 'showVideo',
      'albums/:album_id/video/:video_id/like': 'likeVideo',
      '*actions': 'defaultAction'
    },
    
    initialize: function (){
    
	},
    
    showAlbums: function(){
    	this.albums = new Albums();
    	var albumsView = new AlbumsView({el:$("#albums"), collection: this.albums});
    	this.albums.fetch();
    },
    
    showAlbum: function(id){
        var album = null;
    	if (!this.albums) {
	    	this.albums = new Albums();
	    	this.albums.fetch({async : false});
    	}
    	album = this.albums.get(id);
    	if (!album){
    		alert("Альбом с номером "+ id + " не найден. Возможно, он был удален.\n Сейчас перечитаем список альбомов с сервера Vimeo.");
    		this.navigate("/albums");
    		return;
    	}

    	$el = $(".container .row .span8");
    	$el.empty();
    	var albumView = new DetailedAlbumView({el: $el[0], model : album});
    },
    
    deleteAlbum: function(id){
    	var album = new Album({id : id});
    	album.fetch();
    	album.destroy();    
    },
    
    newAlbum : function() { 
	    var album = new Album();
	    var albumView = new NewAlbumView({model : album});
    },
    
    editAlbum: function(id){
	    
    },
    
    showVideo: function(album_id, video_id){
	    
    },
    
    likeVideo: function(album_id, video_id){
	    
    },
   
    defaultAction: function(actions){     
      console.log('No route:', actions);
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});