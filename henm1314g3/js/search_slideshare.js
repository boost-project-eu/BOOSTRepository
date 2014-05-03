function SlideshareSearch(resultsPerPage){
    this.name = "Slideshare";
    this.query = null;
    this.resultsPerPage = resultsPerPage;
    this.page = 1;
}

SlideshareSearch.prototype.search = function(query, callback){
	this.page = 1;
	this.query = query;
    var q = "use 'https://dl.dropboxusercontent.com/u/2827729/slideshare.search.xml'" +
    		"as mytable; select * from mytable where q='" + query +"' and page='" + this.page + "'" +
    		"and api_key='KHyDu2OL' and shared_secret='EfxBfoCM' and items_per_page='" + this.resultsPerPage + "';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
        callback(slideshareDocumentProcessor(data.query.results));
	});
}

function slideshareDocumentProcessor(response){
	var resultDocumentsList = [];

    for(var i = 0; i < response.Slideshows.Slideshow.length; i++){
        var slideshowData = response.Slideshows.Slideshow[i];
        var description = "";
        if(slideshowData.Description != null)
            description = slideshowData.Description;
        var documentItem = {
        	name : slideshowData.Title,
        	description : description,
        	type : "slideshare",
        	url : slideshowData.URL,
        	contentSpecificData: {
        		id : slideshowData.ID,
        		embedCode : slideshowData.Embed,
        		imageUrl : slideshowData.ThumbnailURL
        	}
        };
        resultDocumentsList.push(documentItem);
    }
    return resultDocumentsList;
}

SlideshareSearch.prototype.nextResultsPage = function(callback){
    if(!this.query)
        return [];

    this.page++;
    var q = "use 'https://dl.dropboxusercontent.com/u/2827729/slideshare.search.xml'" +
    		"as mytable; select * from mytable where q='" + this.query +"' and page='" + this.page + "'" +
    		"and api_key='KHyDu2OL' and shared_secret='EfxBfoCM' and items_per_page='" + this.resultsPerPage + "';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
		callback(slideshareDocumentProcessor(data.query.results));
	});
}

SlideshareSearch.prototype.prevResultsPage = function(callback){
    if(!this.query)
        return [];

    this.page--;
    var q = "use 'https://dl.dropboxusercontent.com/u/2827729/slideshare.search.xml'" +
    		"as mytable; select * from mytable where q='" + this.query +"' and page='" + this.page + "'" +
    		"and api_key='KHyDu2OL' and shared_secret='EfxBfoCM' and items_per_page='" + this.resultsPerPage + "';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
		callback(slideshareDocumentProcessor(data.query.results));
	});
}

SlideshareSearch.prototype.hasPrevPage = function(){
    return (this.page != 1)
}

SlideshareSearch.prototype.hasNextPage = function(){
    return true;
}

var SlideShareSearch = {
	search: function(q, page, callback){
		var query = "use 'https://dl.dropboxusercontent.com/u/2827729/slideshare.search.xml' as mytable; select * from mytable where q='" + q +"' and page='" + page + "' and api_key='KHyDu2OL' and shared_secret='EfxBfoCM' and items_per_page='25';";
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