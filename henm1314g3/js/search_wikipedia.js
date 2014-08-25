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
        }
    });

}

function wikiDocumentProcessor(response){
    var resultDocumentsList = [];

    data = response;
    console.log(data);

    var markup = data.parse.text["*"];
    console.log(markup);
    console.log("resultItem:");
    var resultItem = $('<div></div>').html(markup);

    // remove links as they do not work
    resultItem.find('a').each(function(){
      $(this).replaceWith($(this).html());
    });
    resultItem.find('sup').remove();

    // remove cite error
    resultItem.find('.mw-ext-cite-error').remove();

    var documentItem = {
        name : data.parse.title,
        description : $(resultItem).find('p').text(),
        type : "wikipedia",
        url : "wikipedia.com",
        contentSpecificData: {
            imageUrl : "http://cs421729.vk.me/v421729446/a167/stklWKko7E0.jpg"
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