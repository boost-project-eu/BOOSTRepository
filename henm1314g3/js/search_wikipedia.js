function WikiSearch(resultsPerPage){
    this.name = "Wikipedia";
    this.query = null;
    this.resultsPerPage = resultsPerPage;
    this.page = 1;
}

WikiSearch.prototype.search = function(query, callback){
    this.query = query;
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+query+"&callback=?",                        
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            callback(wikiDocumentProcessor(data));
        },
        error: function (errorMessage) {
            console.log("Wrong  Wikipedia query");
        }
    });

}

function wikiDocumentProcessor(response){
    var resultDocumentsList = [];

    data = response;
    console.log (response);

    var markup = data.parse.text["*"];
    var resultItem = $('<div></div>').html(markup);
    var images = ($(resultItem).find('img'));

    // remove links as they do not work
    resultItem.find('a').each(function(){
      $(this).replaceWith($(this).html());
    });
    resultItem.find('sup').remove();

    // remove cite error
    resultItem.find('.mw-ext-cite-error').remove();

    var description = $(resultItem).find('p').text();
    var imageUrl = images[0].src || "";
    if (images[0].src == "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Padlock-silver.svg/20px-Padlock-silver.svg.png")
        var imageUrl = images[1].src;
    console.log (imageUrl);

    if(description == "")
    {
        description = "Sorry, nothing was found by your request";
        imageUrl = "http://www.clipartbest.com/cliparts/aTq/erd/aTqerd4rc.jpeg";
    }

    var documentItem = {
        name: data.parse.title,
        description: description,
        type: "wikipedia",
        url: "http://en.wikipedia.org/wiki/" + data.parse.title,
        contentSpecificData: {
            imageUrl : imageUrl,
            wiki: true 
        }
    };
    resultDocumentsList.push(documentItem);
    return resultDocumentsList;
}

WikiSearch.prototype.hasPrevPage = function(){
    return false;
}

WikiSearch.prototype.hasNextPage = function(){
    return false;
}