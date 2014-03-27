function ScribdSearch(resultsPerPage){
    this.name = "Scribd";
    this.query = null;
    this.resultsPerPage = resultsPerPage;
    this.page = 1;
    this.numStart = 0;
}

ScribdSearch.prototype.search = function(query, callback){
	this.query = query;
	this.page = 1;
	this.numStart = this.resultsPerPage*(this.page-1);
	var q = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + query +"' and api_key='3xvk4darsxk4d4a4ertlf' and num_results='" + this.resultsPerPage +"' and num_start='" + this.numStart + "';";
	//var query = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + q +"' and api_key='3xvk4darsxk4d4a4ertlf';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
        callback(scribdDocumentProcessor(data.query.results));
	});
}

function scribdDocumentProcessor(response){
	var resultDocumentsList = [];
    for(var i = 0; i < response.rsp.result_set[0].result.length; i++){
        var scribdData = response.rsp.result_set[0].result[i];
        var description;
        if(!scribdData.description)
            description = "No description available.";
        else
            description = scribdData.description;
        var documentItem = {
        	name : scribdData.title,
        	description : description,
        	type : "scribd",
        	url : "",
        	contentSpecificData: {
        		id : scribdData.doc_id,
        		imageUrl : scribdData.thumbnail_url,
        		accessKey : scribdData.access_key
        	}
        };
        resultDocumentsList.push(documentItem);
    }
    return resultDocumentsList;
}

ScribdSearch.prototype.nextResultsPage = function(callback){
    if(!this.query)
        return [];

    this.page++;
    this.numStart = this.resultsPerPage*(this.page-1);
    var q = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + this.query +"' and api_key='3xvk4darsxk4d4a4ertlf' and num_results='" + this.resultsPerPage +"' and num_start='" + this.numStart + "';";
	//var query = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + q +"' and api_key='3xvk4darsxk4d4a4ertlf';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
		callback(scribdDocumentProcessor(data.query.results));
	});
}

ScribdSearch.prototype.prevResultsPage = function(callback){
    if(!this.query)
        return [];

    this.page--;
    this.numStart = this.resultsPerPage*(this.page-1);
    var q = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + this.query +"' and api_key='3xvk4darsxk4d4a4ertlf' and num_results='" + this.resultsPerPage +"' and num_start='" + this.numStart + "';";
	//var query = "use 'https://dl.dropboxusercontent.com/u/2827729/scribd.docs.search.xml' as mytable; select * from mytable where query='" + q +"' and api_key='3xvk4darsxk4d4a4ertlf';";
	q = encodeURIComponent(q);
	$.get( "http://query.yahooapis.com/v1/public/yql?q=" + q + "&format=json").done(function( data ) {
		callback(scribdDocumentProcessor(data.query.results));
	});
}

ScribdSearch.prototype.hasPrevPage = function(){
    return (this.page != 1)
}

ScribdSearch.prototype.hasNextPage = function(){
    return true;
}