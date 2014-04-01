// Needs to be called when the client library has been loaded
function onYouTubeClientLoad(){
    gapi.client.load('youtube', 'v3', function(){
        // We need to set the API key which is used for the searches
        gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    });
}

function YoutubeSearch(resultsPerPage){
    this.name = "Youtube";
    this.query = null;
    this.resultsPerPage = resultsPerPage;
    this.nextPageToken = null;
    this.prevPageToken = null;
}

YoutubeSearch.prototype.search = function(query, callback){
    params = {};
    params.type = 'video';
    params.part = 'snippet';
    params.q = query;
    this.query = query;
    var thisElement = this;
    params.maxResults = this.resultsPerPage;
    var request = gapi.client.youtube.search.list(params);
    // Send the request to the API server and fire the callback with the response
    request.execute(function(response){
        if(response.hasOwnProperty("nextPageToken")){
            thisElement.nextPageToken = response.nextPageToken;
        }
        else
            thisElement.nextPageToken = null;
        if(response.hasOwnProperty("prevPageToken")){
            thisElement.prevPageToken = response.prevPageToken;
        }
        else
            thisElement.prevPageToken = null;
        callback(youtubeDocumentProcessor(response));
    });
}

function youtubeDocumentProcessor(response){
    var resultDocumentsList = [];
        for(var i = 0; i < response.items.length; i++){
            var videoData = response.items[i];
            var documentItem = {
                name : videoData.snippet.title,
                description : videoData.snippet.description,
                type : "youtube",
                url : "http://www.youtube.com/watch?v=" + videoData.id.videoId,
                contentSpecificData : {
                    videoId : videoData.id.videoId,
                    imageUrl : videoData.snippet.thumbnails.medium.url,
                }
            };
            resultDocumentsList.push(documentItem);
        }
        return resultDocumentsList;
}

YoutubeSearch.prototype.nextResultsPage = function(callback){
    if(!this.query)
        return [];

    params = {};
    params.type = 'video';
    params.part = 'snippet';
    params.q = this.query;
    params.maxResults = this.resultsPerPage;
    params.pageToken = this.nextPageToken;
    var thisElement = this;
    var request = gapi.client.youtube.search.list(params);
    // Send the request to the API server and fire the callback with the response
    request.execute(function(response){
        if(response.hasOwnProperty("nextPageToken")){
            thisElement.nextPageToken = response.nextPageToken;
        }
        else
            thisElement.nextPageToken = null;
        if(response.hasOwnProperty("prevPageToken")){
            thisElement.prevPageToken = response.prevPageToken;
        }
        else
            thisElement.prevPageToken = null;
        callback(youtubeDocumentProcessor(response));
    });

}

YoutubeSearch.prototype.prevResultsPage = function(callback){
    if(!this.query)
        return [];

    params = {};
    params.type = 'video';
    params.part = 'snippet';
    params.q = this.query;
    params.maxResults = this.resultsPerPage;
    params.pageToken = this.prevPageToken;
    var thisElement = this;
    var request = gapi.client.youtube.search.list(params);
    // Send the request to the API server and fire the callback with the response
    request.execute(function(response){
        if(response.hasOwnProperty("nextPageToken")){
            thisElement.nextPageToken = response.nextPageToken;
        }
        else
            thisElement.nextPageToken = null;
        if(response.hasOwnProperty("prevPageToken")){
            thisElement.prevPageToken = response.prevPageToken;
        }
        else
            thisElement.prevPageToken = null;
        callback(youtubeDocumentProcessor(response));
    });
}

YoutubeSearch.prototype.hasPrevPage = function(){
    return (this.prevPageToken != null)
}

YoutubeSearch.prototype.hasNextPage = function(){
    return (this.nextPageToken != null)
}

var YouTubeSearch = {
    // Call this to perform a search
    search:function(q, pageToken, id, callback) {
        // Use the JavaScript client library to create a search.list() API call.

        params = {};
        params.type = 'video';
        params.part = 'snippet';
        if(q)
            params.q = q;
        params.maxResults = 25;
        if(pageToken)
            params.pageToken = pageToken;
        if(id)
            params.id = id;
        var request = gapi.client.youtube.search.list(params);
        // Send the request to the API server and fire the callback with the response
        request.execute(callback);
    },

    getVideoDetails:function(id, callback){
        params = {};
        params.part = 'snippet';
        params.id = id;

        var request = gapi.client.youtube.videos.list(params);
        // Send the request to the API server and fire the callback with the response
        request.execute(callback);
    }
}