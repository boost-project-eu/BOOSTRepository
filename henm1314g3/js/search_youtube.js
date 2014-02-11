// Needs to be called when the client library has been loaded
function onYouTubeClientLoad(){
    gapi.client.load('youtube', 'v3', function(){
        // We need to set the API key which is used for the searches
        gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    });
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