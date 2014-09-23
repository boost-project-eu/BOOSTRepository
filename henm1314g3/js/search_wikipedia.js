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

    var data = response;
    var url = "";
    var description = "";
    var title = ""
    var imageUrl = "";

    console.log(data);
    if (data.error){
        url = "http://en.wikipedia.org/wiki/";
        imageUrl = "http://www.clipartbest.com/cliparts/aTq/erd/aTqerd4rc.jpeg";
        title = "Incorrect search query";
        description = "You have some incorrect symbols in your search qery, please check"
    }
    else{
        var markup = data.parse.text["*"];
        var resultItem = $('<div></div>').html(markup);
        var images = ($(resultItem).find('img'));
        if (!images[0]) images[0] = "";

        // remove links as they do not work
        resultItem.find('a').each(function(){
          $(this).replaceWith($(this).html());
        });
        resultItem.find('sup').remove();

        // remove cite error
        resultItem.find('.mw-ext-cite-error').remove();

        description = $(resultItem).find('p').text();
        imageUrl = images[0].src || "";
        if (images[0].src == "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Padlock-silver.svg/20px-Padlock-silver.svg.png")
            imageUrl = images[1].src;

        if(description == "Redirect to:")
        {
            description = "Sorry, nothing was found by your request, try to click on this message to find this information on Wikipedia directly.";
            imageUrl = "http://www.clipartbest.com/cliparts/aTq/erd/aTqerd4rc.jpeg";
        }
        url = "http://en.wikipedia.org/wiki/" + data.parse.title;

        title =  data.parse.title;
    }

    var documentItem = {
        name: title,
        description: description,
        type: "wikipedia",
        url: url,
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