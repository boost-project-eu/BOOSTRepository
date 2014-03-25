function LearningDocument(object){
	if(object.hasOwnProperty("uri"))
		this.uri = object.uri;
	else
		this.uri = "";

	if(object.hasOwnProperty("bcnUri"))
		this.bcnUri = object.bcnUri;
	else
		this.bcnUri = "";

	if(object.hasOwnProperty("liId"))
		this.liId = object.liId;
	else
		this.liId = "";

	if(object.hasOwnProperty("type"))
		this.type = object.type;
	else
		this.type = "";

	if(object.hasOwnProperty("name"))
		this.name = object.name;
	else
		this.name = "No name";

	if(object.hasOwnProperty("description"))
		this.description = object.description;
	else
		this.description = "No description available.";

	if(object.hasOwnProperty("url"))
		this.url = object.url;
	else
		this.url = "";

	if(object.hasOwnProperty("contentSpecificData"))
		this.contentSpecificData = object.contentSpecificData;
	else
		this.contentSpecificData = {};
}

LearningDocument.prototype.create = function(callback){
	var space = new openapp.oo.Resource(openapp.param.space());
	var thisLearningDocument = this;
	space.create({
		relation: openapp.ns.role + "data",
		type: "my:ns:learningDocument",
		representation: this, //The representation refers to the object
		callback: function(learningDocumentResource){
			//Now we have an URI for our Employee and we need to update the resource
			thisLearningDocument.uri = learningDocumentResource.getURI();
			learningDocumentResource.setRepresentation(thisLearningDocument, "application/json", function(){
				callback();
			});
		}
	});
}

LearningDocument.prototype.update = function(callback){
	var learningDocumentResource = new openapp.oo.Resource(this.uri);
	learningDocumentResource.setRepresentation(this, "application/json", function(){
		callback();
	});
}

LearningDocument.prototype.delete = function(callback){
	openapp.resource.del(this.uri, function(){
		callback();
	});
}

function retrieveAllLearningDocuments(callback){
	retrieveBoostResources("my:ns:learningDocument", function(object){return new LearningDocument(object)}, callback);
}
