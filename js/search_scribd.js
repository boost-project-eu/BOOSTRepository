var ScribdSearch = {
	search: function(q, page, callback){
		numStart = 25*(page-1);
		var query = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + q +"' and api_key='3xvk4darsxk4d4a4ertlf' and num_results='25' and num_start='" + numStart + "';";
		//var query = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + q +"' and api_key='3xvk4darsxk4d4a4ertlf';";
		query = encodeURIComponent(query);
		$.get( "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json").done(function( data ) {
			callback(data.query.results);
		});
	},

	getSlideshowDetails: function(id, callback){
		var query = "use 'https://dl.dropboxusercontent.com/u/2827729/slideshare.getSlideshow.xml' as mytable; select * from mytable where slideshow_id='" + id +"' and api_key='KHyDu2OL' and shared_secret='EfxBfoCM';";
		$.get( "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json").done(function( data ) {
			callback(data.query.results);
		});
	}
}