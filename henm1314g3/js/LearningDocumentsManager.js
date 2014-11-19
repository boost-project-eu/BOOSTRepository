LearningDocument.prototype = new BoostObject({});

LearningDocument.prototype.getTypeName = function(){
	return "learningDocument";
}

function LearningDocument(object){
	BoostObject.call(this, object);

	if(object.hasOwnProperty("bcnUri"))
		this.bcnUri = object.bcnUri;
	else
		this.bcnUri = "";

	if(object.hasOwnProperty("userUri"))
		this.userUri = object.userUri
	else
		this.userUri = "";

	if(object.hasOwnProperty("isPrivate"))
		this.isPrivate = object.isPrivate
	else
		this.isPrivate = false;

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
		this.name = "";

	if(object.hasOwnProperty("description"))
		this.description = object.description;
	else
		this.description = "";

	if(object.hasOwnProperty("url"))
		this.url = object.url;
	else
		this.url = "";

	if(object.hasOwnProperty("contentSpecificData"))
		this.contentSpecificData = object.contentSpecificData;
	else
		this.contentSpecificData = {};
}

function retrieveAllLearningDocuments(callback){
	retrieveBoostResources("my:ns:learningDocument", function(object){return new LearningDocument(object)}, callback);
}
